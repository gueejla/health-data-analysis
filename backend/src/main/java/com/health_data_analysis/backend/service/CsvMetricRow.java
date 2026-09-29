package com.health_data_analysis.backend.service;

import java.time.Instant;
import java.util.Map;

public record CsvMetricRow(
  String metricType,
  Instant measuredAt,
  Double value,
  Map<String, String> attributes   // nullable; null when no extras
) {}
