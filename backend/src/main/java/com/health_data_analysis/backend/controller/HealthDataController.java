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
@RequestMapping("/api-v1/users/{username}/health-data")
public class HealthDataController {

    private final HealthDataService service;

    public HealthDataController(HealthDataService service) {
        this.service = service;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public HealthDataResponse upload(
        @PathVariable String username,
        @RequestPart("file") MultipartFile file
    ) {
        return service.upload(username, file);
    }

    @GetMapping("/metrics")
    public List<HealthMetricResponse> getMetrics(@PathVariable String username) {
        return service.getMetrics(username);
    }
}
