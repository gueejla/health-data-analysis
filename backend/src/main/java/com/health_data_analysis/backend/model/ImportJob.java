package com.health_data_analysis.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "import_jobs")
@Getter
@Setter
@NoArgsConstructor                      // JPA requires this
public class ImportJob {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "storage_key", nullable = false)
    private String storageKey;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ImportStatus status = ImportStatus.PENDING;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    private long rowsParsed;
    private long rowsRejected;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "completed_at")
    private Instant completedAt;

    /** Convenience constructor used by ImportQueueService.enqueue(). */
    public ImportJob(Long userId, String fileName, String storageKey) {
        this.userId = userId;
        this.fileName = fileName;
        this.storageKey = storageKey;
        // status/createdAt set via field initializers
    }

    public void complete(long parsed, long rejected) {
        this.status = ImportStatus.COMPLETED;
        this.rowsParsed = parsed;
        this.rowsRejected = rejected;
        this.completedAt = Instant.now();
    }

    public void fail(String message) {
        this.status = ImportStatus.FAILED;
        this.errorMessage = message;
        this.completedAt = Instant.now();
    }
}