package com.health_data_analysis.backend.dto;

import java.time.Instant;

public record UserResponse(Long id, String email, String name, Instant createdAt) {}
