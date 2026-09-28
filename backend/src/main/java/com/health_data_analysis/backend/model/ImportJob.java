package com.health_data_analysis.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "import_job")
@Getter
@Setter
@NoArgsConstructor
public class ImportJob {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ImportStatus status = ImportStatus.PENDING;

    @Column(name = "processing_completed_at")
    private Instant processingCompletedAt;

    @Column(name = "error_message", columnDefinition = "text")
    private String errorMessage;

    @Column(name = "uploaded_at", nullable = false)
    private Instant uploadedAt;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @OneToMany(mappedBy = "importJob", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HealthMetric> metrics = new ArrayList<>();

    @PrePersist
    void setUploadedAtIfMissing() {
        if (uploadedAt == null) {
            uploadedAt = Instant.now();
        }
    }

    public void addMetric(HealthMetric metric) {
        metrics.add(metric);
        metric.setImportJob(this);
    }

    public void removeMetric(HealthMetric metric) {
        metrics.remove(metric);
        metric.setImportJob(null);
    }
}
