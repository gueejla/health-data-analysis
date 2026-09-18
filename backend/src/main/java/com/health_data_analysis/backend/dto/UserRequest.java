package com.health_data_analysis.backend.dto;

import jakarta.validation.constraints.*;

public record UserRequest(
    @NotBlank @Email String email,
    @NotBlank @Size(max = 100) String name
) {}
