package com.health_data_analysis.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.health_data_analysis.backend.model.ImportJob;
import com.health_data_analysis.backend.model.ImportStatus;

public interface ImportJobRepository extends JpaRepository<ImportJob, UUID> {

    /** Used by the drain loop — oldest PENDING job first (FIFO). */
    Optional<ImportJob> findFirstByStatusOrderByCreatedAtAsc(ImportStatus status);

    /** Used by the status endpoint — a user's recent jobs. */
    List<ImportJob> findByUserIdOrderByCreatedAtDesc(Long userId);

    /** Used for the IDOR check in the controller — fetch job only if it belongs to the user. */
    Optional<ImportJob> findByIdAndUserId(UUID id, Long userId);
}
