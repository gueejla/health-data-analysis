package com.health_data_analysis.backend.repository;

import com.health_data_analysis.backend.model.ImportJob;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImportJobRepository extends JpaRepository<HealthData, Long> {
    boolean existsByUserId(Long userId);
}
