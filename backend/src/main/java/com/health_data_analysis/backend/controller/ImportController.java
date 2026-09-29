package com.health_data_analysis.backend.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.health_data_analysis.backend.dto.ImportJobResponse;
import com.health_data_analysis.backend.security.UserPrincipal;
import com.health_data_analysis.backend.service.FileStorage;
import com.health_data_analysis.backend.service.ImportQueueService;

@RestController
@RequestMapping("/api/imports")
public class ImportController {

    private static final long MAX_FILE_SIZE = 200L * 1024 * 1024;   // 200 MB
    private static final String ALLOWED_EXT = ".csv";

    private final ImportQueueService queue;
    private final FileStorage storage;

    public ImportController(ImportQueueService queue, FileStorage storage) {
        this.queue = queue;
        this.storage = storage;
    }

    /** Upload a CSV → enqueue an async import job. Returns 202 + job ID. */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<ImportJobResponse> upload(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestParam("file") MultipartFile file) throws IOException {

        // --- validation (UX; real limits also enforced server-side via multipart config) ---
        if (file.isEmpty()) {
            return ResponseEntity.badRequest()
                .body(ImportJobResponse.error("File is empty"));
        }
        String fileName = sanitize(file.getOriginalFilename());
        if (!fileName.toLowerCase().endsWith(ALLOWED_EXT)) {
            return ResponseEntity.badRequest()
                .body(ImportJobResponse.error("Only .csv files are supported"));
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body(ImportJobResponse.error("File exceeds 200 MB limit"));
        }

        // --- store raw file + enqueue ---
        String storageKey = storage.store(file);          // UUID-named, path never touched
        UUID jobId = queue.enqueue(user.getId(), fileName, storageKey);

        return ResponseEntity.accepted()
            .body(new ImportJobResponse(jobId, "PENDING", fileName));
    }

    /** Poll job status — IDOR-guarded: job must belong to the caller. */
    @GetMapping("/{id}")
    public ResponseEntity<ImportJobResponse> status(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable UUID id) {

        return queue.getJobForUser(id, user.getId())
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    /** Job history for the signed-in user. */
    @GetMapping
    public List<ImportJobResponse> history(
            @AuthenticationPrincipal UserPrincipal user) {
        return queue.getHistory(user.getId());
    }

    // ------------------------------------------------------------------

    /** Strip path components + whitelist chars; attacker-controlled input. */
    private String sanitize(String raw) {
        if (raw == null) return "upload.csv";
        String name = raw.substring(raw.lastIndexOf('/') + 1)
                          .substring(raw.lastIndexOf('\\') + 1)
                          .replaceAll("[^\\w.\\- ()]", "_")
                          .trim();
        return name.isBlank() ? "upload.csv" : name;
    }
}
