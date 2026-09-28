package com.health_data_analysis.backend.service;

@Component
public class CsvMetricParser {

    private static final Set<String> ALLOWED_TYPES = Set.of(
        "heart_rate", "step_count", "sleep_stage", "calorie", "weight");

    /** Streaming parse — never loads the whole file into memory. */
    public Stream<CsvMetricRow> parse(InputStream in) throws IOException {
        CSVParser parser = CSVFormat.Builder.create(CSVFormat.DEFAULT)
            .setHeader()                                   // first row = header
            .setSkipHeaderRecord(true)
            .setIgnoreEmptyLines(true)
            .setTrim(true)
            .build()
            .parse(new InputStreamReader(in, StandardCharsets.UTF_8));

        return parser.stream()
            .map(this::toRow)
            .filter(Objects::nonNull);
        // NOTE: caller must close the stream, which closes the parser
    }

    private CsvMetricRow toRow(CSVRecord rec) {
        try {
            String type = rec.get("metric_type");
            if (!ALLOWED_TYPES.contains(type)) return null;   // whitelist, not blacklist

            return new CsvMetricRow(
                type,
                Instant.parse(rec.get("measured_at")),         // ISO-8601, fails fast
                Double.parseDouble(rec.get("value")));
        } catch (Exception e) {
            // bad row → skip (or collect into a rejected-rows report for the job)
            return null;
        }
    }
}
