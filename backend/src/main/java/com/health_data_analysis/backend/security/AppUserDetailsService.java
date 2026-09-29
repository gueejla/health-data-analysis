package com.health_data_analysis.backend.security;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import com.health_data_analysis.backend.model.User;
import com.health_data_analysis.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException(email));
        return new UserPrincipal(user.getId(), user.getEmail(), user.getPasswordHash());
    }
}
