package com.health_data_analysis.backend.controller;

import com.health_data_analysis.backend.dto.UserRequest;
import com.health_data_analysis.backend.dto.UserResponse;
import com.health_data_analysis.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api-v1/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/{username}")
    public UserResponse getByUsername(@PathVariable String username) {
        return service.getByUsername(username);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse create(@Valid @RequestBody UserRequest request) {
        return service.create(request);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createWithHealthData(
        @RequestPart("username") String username,
        @RequestPart("file") MultipartFile file
    ) {
        return service.createWithHealthData(new UserRequest(username, null), file);
    }
}
