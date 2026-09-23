package com.health_data_analysis.backend.repository;

import com.health_data_analysis.backend.model.HealthMetric;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HealthMetricRepository extends JpaRepository<HealthMetric, Long> {
    List<HealthMetric> findByHealthDataUserUsernameOrderByMeasuredAtAsc(String username);
}
