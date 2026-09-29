package com.health_data_analysis.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "health_metrics")
@Getter
@Setter
@NoArgsConstructor
public class HealthMetric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "import_job_id", nullable = false)
    private UUID importJobId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "metric_type", nullable = false, length = 64)
    private String metricType;

    @Column(length = 64)
    private String source;

    @Column(name = "measured_at", nullable = false)
    private Instant measuredAt;

    @Column(name = "value")
    private Double value;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String, String> attributes;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    void setCreatedAtIfMissing() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }
}
