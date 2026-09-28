package com.health_data_analysis.backend.controller;

import com.health_data_analysis.backend.dto.HealthDataResponse;
import com.health_data_analysis.backend.dto.HealthMetricResponse;
import com.health_data_analysis.backend.service.HealthDataService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@RestController
@RequestMapping("/api/imports")
public class ImportController {

    private final ImportQueueService queue;
    private final FileStorage storage;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<ImportJobResponse> upload(
            @AuthenticationPrincipal UserPrincipal user,
            @RequestParam("file") MultipartFile file) throws IOException {

        String storageKey = storage.store(file);            // UUID-named, virus-scan ideally
        UUID jobId = queue.enqueue(user.getId(), storageKey);
        return ResponseEntity.accepted().body(new ImportJobResponse(jobId, "PENDING"));
    }

    @GetMapping("/{id}")
    public ImportJobResponse status(@AuthenticationPrincipal UserPrincipal user,
                                    @PathVariable UUID id) {
        // must check job.getUserId().equals(user.getId()) — IDOR guard
        ...
    }
}
