package com.health_data_analysis.backend.service;

public record CsvMetricRow(String metricType, Instant measuredAt, Double value) {}
