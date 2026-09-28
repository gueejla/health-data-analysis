package com.health_data_analysis.backend.service;

@Service
public class ImportQueueService {

    private final ImportJobRepository jobRepo;
    private final CsvMetricParser parser;
    private final EntityManager em;
    private final MeterRegistry metrics;   // optional observability

    private final ExecutorService worker =
        Executors.newSingleThreadExecutor();   // serialize imports; bump for concurrency

    @PostConstruct void start() { worker.submit(this::drainLoop); }

    /** Controller calls this after storing the raw file. */
    @Transactional
    public UUID enqueue(Long userId, String storageKey) {
        ImportJob job = new ImportJob(userId, storageKey);   // status = PENDING
        jobRepo.save(job);
        worker.submit(() -> process(job.getId()));          // wake the loop early
        return job.getId();
    }

    private void drainLoop() {
        while (!Thread.currentThread().isInterrupted()) {
            jobRepo.findFirstByStatusOrderByCreatedAsc(ImportStatus.PENDING)
                .ifPresentOrElse(j -> safely(j.getId()),
                                 () -> { try { Thread.sleep(2000); } catch (InterruptedException e) { return; } });
        }
    }

    void process(UUID jobId) {
        ImportJob job = jobRepo.findById(jobId).orElseThrow();
        job.setStatus(ImportStatus.PARSING); jobRepo.save(job);
        long parsed = 0, rejected = 0;

        try (InputStream in = loadFromStorage(job.getStorageKey());
             Stream<CsvMetricRow> rows = parser.parse(in)) {

            // *** Batch inserts via JDBC batching — the key efficiency win ***
            var it = rows.iterator();
            int flushCount = 0;
            while (it.hasNext()) {
                CsvMetricRow r = it.next();
                em.persist(toEntity(r, job));
                if (++flushCount % 500 == 0) { em.flush(); em.clear(); }  // keep persistence ctx tiny
                parsed++;
            }
            job.complete(parsed, rejected);
        } catch (Exception e) {
            job.fail(e.getMessage());
        }
        jobRepo.save(job);
    }

    private HealthMetric toEntity(CsvMetricRow r, ImportJob job) {
        HealthMetric m = new HealthMetric();
        m.setUserId(job.getUserId());
        m.setMetricType(r.metricType());
        m.setMeasuredAt(r.measuredAt());
        m.setValue(r.value());
        m.setImportJobId(job.getId());
        return m;
    }
}
