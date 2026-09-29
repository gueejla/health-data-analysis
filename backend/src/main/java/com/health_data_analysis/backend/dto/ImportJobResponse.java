package com.health_data_analysis.backend.dto;

import com.health_data_analysis.backend.model.ImportStatus;

import java.time.Instant;

import org.jspecify.annotations.Nullable;

public record ImportJobResponse(
    Long id,
    ImportStatus status,
    Instant uploadedAt,
    Instant processingCompletedAt,
    String errorMessage
) {

  public static @Nullable Object error(String string) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'error'");
  }}
