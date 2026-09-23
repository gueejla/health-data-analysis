package com.health_data_analysis.backend.dto;

import com.health_data_analysis.backend.model.HealthDataStatus;

import java.time.Instant;

public record HealthDataResponse(
    Long id,
    HealthDataStatus status,
    Instant uploadedAt,
    Instant processingCompletedAt,
    String errorMessage
) {}
