package com.health_data_analysis.backend.repository;

import com.health_data_analysis.backend.model.HealthData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthDataRepository extends JpaRepository<HealthData, Long> {
    boolean existsByUserId(Long userId);
}
