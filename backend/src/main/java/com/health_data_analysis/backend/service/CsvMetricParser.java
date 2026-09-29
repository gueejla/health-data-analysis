package com.health_data_analysis.backend.service;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Stream;


@Component
public class CsvMetricParser {

    private static final Set<String> ALLOWED_TYPES = Set.of(
        "heart_rate", "step_count", "sleep_stage", "calorie", "weight");

    private static final Set<String> BASE_COLUMNS =
        Set.of("metric_type", "measured_at", "value");

    // Columns you want to capture as attributes; extend as you learn the data
    private static final Set<String> ATTRIBUTE_COLUMNS =
        Set.of("device", "live_data_type", "sleep_stage", "duration", "unit");


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
            if (!ALLOWED_TYPES.contains(type)) return null;

            Map<String, String> attrs = parseAttributes(rec);
            if (attrs.isEmpty()) attrs = null;      // store NULL, not '{}' — smaller rows

            return new CsvMetricRow(
                type,
                Instant.parse(rec.get("measured_at")),
                Double.parseDouble(rec.get("value")),
                attrs);
        } catch (Exception e) {
            return null;
        }
    }

    private Map<String, String> parseAttributes(CSVRecord rec) {
        Map<String, String> attrs = new LinkedHashMap<>();
        for (String col : ATTRIBUTE_COLUMNS) {
            String v = rec.isSet(col) ? rec.get(col) : null;   // column may not exist in this file
            if (v != null && !v.isBlank()) {
                attrs.put(col, v.trim());                     // reject blanks, don't store noise
            }
        }
        return attrs;
    }

}
