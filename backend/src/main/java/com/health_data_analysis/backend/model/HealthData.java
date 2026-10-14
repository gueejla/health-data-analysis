package com.health_data_analysis.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "health_data")
@Getter
@Setter
@NoArgsConstructor
public class HealthData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "raw_csv", nullable = false, columnDefinition = "bytea")
    private byte[] rawCsv;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private HealthDataStatus status = HealthDataStatus.PENDING;

    @Column(name = "processing_completed_at")
    private Instant processingCompletedAt;

    @Column(name = "error_message", columnDefinition = "text")
    private String errorMessage;

    @Column(name = "uploaded_at", nullable = false)
    private Instant uploadedAt;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @OneToMany(mappedBy = "healthData", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HealthMetric> metrics = new ArrayList<>();

    @PrePersist
    void setUploadedAtIfMissing() {
        if (uploadedAt == null) {
            uploadedAt = Instant.now();
        }
    }

    public void addMetric(HealthMetric metric) {
        metrics.add(metric);
        metric.setHealthData(this);
    }

    public void removeMetric(HealthMetric metric) {
        metrics.remove(metric);
        metric.setHealthData(null);
    }
}
