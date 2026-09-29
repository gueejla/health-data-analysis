package com.health_data_analysis.backend.service;


import com.health_data_analysis.backend.dto.HealthMetricResponse;
import com.health_data_analysis.backend.exception.DuplicateResourceException;
import com.health_data_analysis.backend.exception.InvalidFileException;
import com.health_data_analysis.backend.exception.NotFoundException;
import com.health_data_analysis.backend.model.HealthMetric;
import com.health_data_analysis.backend.model.ImportJob;
import com.health_data_analysis.backend.model.ImportStatus;
import com.health_data_analysis.backend.model.User;
import com.health_data_analysis.backend.repository.HealthMetricRepository;
import com.health_data_analysis.backend.repository.ImportJobRepository;
import com.health_data_analysis.backend.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.persistence.EntityManager;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Stream;


@Service
public class ImportQueueService {

    private final ImportJobRepository jobRepo;
    private final CsvMetricParser parser;
    private final EntityManager em;
    private final FileStorage storage;

    private final ExecutorService worker = Executors.newSingleThreadExecutor();

    public ImportQueueService(ImportJobRepository jobRepo,
                              CsvMetricParser parser,
                              EntityManager em,
                              FileStorage storage) {
        this.jobRepo = jobRepo;
        this.parser = parser;
        this.em = em;
        this.storage = storage;
    }

    @PostConstruct
    void start() {
        worker.submit(this::drainLoop);
    }

    @PreDestroy
    void shutdown() {
        worker.shutdownNow();
    }

    private InputStream loadFromStorage(String storageKey) throws IOException {
        return storage.load(storageKey);
    }

    private void safely(UUID jobId) {
        try {
            process(jobId);
        } catch (Exception e) {
            // never let a failed job crash the worker thread — mark it failed instead
            jobRepo.findById(jobId).ifPresent(j -> {
                j.fail("Unexpected error: " + e.getClass().getSimpleName());
                jobRepo.save(j);
            });
        }
    }

    /** Controller calls this after storing the raw file. */
    @Transactional
    public UUID enqueue(Long userId, String fileName, String storageKey) {
        ImportJob job = new ImportJob(userId, fileName, storageKey);
        jobRepo.save(job);
        worker.submit(() -> process(job.getId()));
        return job.getId();
    }

    private void drainLoop() {
        while (!Thread.currentThread().isInterrupted()) {
            boolean hadJob = jobRepo
                .findFirstByStatusOrderByCreatedAtAsc(ImportStatus.PENDING)
                .isPresent();
            if (!hadJob) {
                try { Thread.sleep(2000); } catch (InterruptedException e) { return; }
            }
            // either the enqueue() submit() will wake us, or next loop picks it up;
            // a simpler robust variant: just claim-and-process right here
            jobRepo.findFirstByStatusOrderByCreatedAtAsc(ImportStatus.PENDING)
                .ifPresent(j -> safely(j.getId()));
        }
    }

    private HealthMetric toEntity(CsvMetricRow r, ImportJob job) {
        HealthMetric m = new HealthMetric();
        m.setUserId(job.getUserId());
        m.setMetricType(r.metricType());
        m.setMeasuredAt(r.measuredAt());
        m.setValue(r.value());
        m.setAttributes(r.attributes());
        m.setImportJobId(job.getId());
        return m;
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
}
