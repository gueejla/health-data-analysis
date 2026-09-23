package com.health_data_analysis.backend.dto;

import java.time.Instant;
import java.util.Map;

public record HealthMetricResponse(
    Long id,
    String metricType,
    String source,
    Instant measuredAt,
    Double value,
    Map<String, Object> attributes,
    Instant createdAt
) {}
