package com.health_data_analysis.backend;

import com.health_data_analysis.backend.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired MockMvc mockMvc;
    @Autowired UserRepository repository;

    @AfterEach
    void cleanup() { repository.deleteAll(); }

    @Test
    void createUser_returns201() throws Exception {
        mockMvc.perform(post("/api-v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"username":"alice","password":"secret"}
                    """))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.username").value("alice"))
            .andExpect(jsonPath("$.password").doesNotExist());
    }

    @Test
    void createInvalidUsername_returns400() throws Exception {
        mockMvc.perform(post("/api-v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"username":"","password":"secret"}
                    """))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.fieldErrors.username").exists());
    }
}
