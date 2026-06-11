// security/CustomUserDetailsService.java
package com.brewnest.security;

import com.brewnest.entity.User;
import com.brewnest.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.debug("Loading user by email: {}", email);
        
        User user = userRepository.findByEmailAndIsActiveTrue(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        log.debug("User found: {} with role: {}", user.getEmail(), user.getRole());
        
        return user;
    }
}