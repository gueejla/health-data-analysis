package com.health_data_analysis.backend.dto;

import jakarta.validation.constraints.*;

public record UserRequest(
    @NotBlank @Size(max = 100) String username,
    @Size(max = 255) String password
) {}
