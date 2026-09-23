package com.health_data_analysis.backend.service;

import com.health_data_analysis.backend.dto.HealthDataResponse;
import com.health_data_analysis.backend.dto.HealthMetricResponse;
import com.health_data_analysis.backend.exception.DuplicateResourceException;
import com.health_data_analysis.backend.exception.InvalidFileException;
import com.health_data_analysis.backend.exception.NotFoundException;
import com.health_data_analysis.backend.model.HealthData;
import com.health_data_analysis.backend.model.HealthDataStatus;
import com.health_data_analysis.backend.model.HealthMetric;
import com.health_data_analysis.backend.model.User;
import com.health_data_analysis.backend.repository.HealthDataRepository;
import com.health_data_analysis.backend.repository.HealthMetricRepository;
import com.health_data_analysis.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class HealthDataService {

    private final UserRepository userRepository;
    private final HealthDataRepository healthDataRepository;
    private final HealthMetricRepository healthMetricRepository;

    public HealthDataService(
        UserRepository userRepository,
        HealthDataRepository healthDataRepository,
        HealthMetricRepository healthMetricRepository
    ) {
        this.userRepository = userRepository;
        this.healthDataRepository = healthDataRepository;
        this.healthMetricRepository = healthMetricRepository;
    }

    @Transactional
    public HealthDataResponse upload(String username, MultipartFile file) {
        User user = findUser(username);
        validateCsv(file);

        if (healthDataRepository.existsByUserId(user.getId())) {
            throw new DuplicateResourceException("Health data already exists for user " + username);
        }

        HealthData healthData = new HealthData();
        healthData.setRawCsv(readBytes(file));
        healthData.setStatus(HealthDataStatus.PENDING);
        healthData.setUser(user);
        return toResponse(healthDataRepository.save(healthData));
    }

    public List<HealthMetricResponse> getMetrics(String username) {
        findUser(username);
        return healthMetricRepository.findByHealthDataUserUsernameOrderByMeasuredAtAsc(username)
            .stream()
            .map(this::toResponse)
            .toList();
    }

    private User findUser(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new NotFoundException("User " + username + " not found"));
    }

    private void validateCsv(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileException("A non-empty CSV file is required");
        }

        String filename = file.getOriginalFilename();
        if (filename == null || !filename.toLowerCase().endsWith(".csv")) {
            throw new InvalidFileException("Only files with a .csv extension are accepted");
        }
    }

    private byte[] readBytes(MultipartFile file) {
        try {
            return file.getBytes();
        } catch (IOException ex) {
            throw new InvalidFileException("The CSV file could not be read", ex);
        }
    }

    private HealthDataResponse toResponse(HealthData healthData) {
        return new HealthDataResponse(
            healthData.getId(),
            healthData.getStatus(),
            healthData.getUploadedAt(),
            healthData.getProcessingCompletedAt(),
            healthData.getErrorMessage()
        );
    }

    private HealthMetricResponse toResponse(HealthMetric metric) {
        return new HealthMetricResponse(
            metric.getId(),
            metric.getMetricType(),
            metric.getSource(),
            metric.getMeasuredAt(),
            metric.getValue(),
            metric.getAttributes(),
            metric.getCreatedAt()
        );
    }
}
