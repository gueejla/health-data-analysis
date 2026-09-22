package com.health_data_analysis.backend.service;

import com.health_data_analysis.backend.dto.UserRequest;
import com.health_data_analysis.backend.dto.UserResponse;
import com.health_data_analysis.backend.exception.DuplicateResourceException;
import com.health_data_analysis.backend.exception.NotFoundException;
import com.health_data_analysis.backend.model.User;
import com.health_data_analysis.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    @Transactional 
    public UserResponse create(UserRequest request) {
        if (repository.existsByUsername(request.username())) {
            throw new DuplicateResourceException("Username already in use");
        }
        User user = new User();
        user.setUsername(request.username());
        user.setPassword(request.password());
        return toResponse(repository.save(user));
    }

    public UserResponse getByUsername(String username) {
        return repository.findByUsername(username)
            .map(this::toResponse)
            .orElseThrow(() -> new NotFoundException("User " + username + " not found"));
    }

    private UserResponse toResponse(User u) {
        return new UserResponse(u.getId(), u.getUsername(), u.getCreatedAt());
    }
}
