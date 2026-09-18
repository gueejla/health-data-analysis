package com.health_data_analysis.backend.service;

import com.health_data_analysis.backend.dto.UserRequest;
import com.health_data_analysis.backend.dto.UserResponse;
import com.health_data_analysis.backend.exception.DuplicateResourceException;
import com.health_data_analysis.backend.exception.NotFoundException;
import com.health_data_analysis.backend.model.User;
import com.health_data_analysis.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<UserResponse> findAll() {
        return repository.findAll().stream()
            .map(this::toResponse).toList();
    }

    @Transactional 
    public UserResponse create(UserRequest request) {
        if (repository.existsByEmail(request.email())) {
            throw new DuplicateResourceException("Email already in use");
        }
        User user = new User();
        user.setEmail(request.email());
        user.setName(request.name());
        return toResponse(repository.save(user));
    }

    public UserResponse getById(Long id) {
        return repository.findById(id)
            .map(this::toResponse)
            .orElseThrow(() -> new NotFoundException("User " + id + " not found"));
    }

    private UserResponse toResponse(User u) {
        return new UserResponse(u.getId(), u.getEmail(), u.getName(), u.getCreatedAt());
    }
}
