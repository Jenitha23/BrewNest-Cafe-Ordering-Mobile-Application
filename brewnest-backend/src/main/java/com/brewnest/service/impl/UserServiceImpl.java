// service/impl/UserServiceImpl.java
package com.brewnest.service.impl;

import com.brewnest.dto.request.CustomerSignupRequest;
import com.brewnest.entity.Role;
import com.brewnest.entity.User;
import com.brewnest.exception.ResourceNotFoundException;
import com.brewnest.repository.UserRepository;
import com.brewnest.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    @Transactional
    public User createCustomer(CustomerSignupRequest signupRequest) {
        log.debug("Creating customer account for email: {}", signupRequest.getEmail());
        
        User customer = User.builder()
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .fullName(signupRequest.getFullName())
                .phoneNumber(signupRequest.getPhoneNumber())
                .role(Role.CUSTOMER)
                .isActive(true)
                .build();
        
        return userRepository.save(customer);
    }
    
    @Override
    public User findByEmail(String email) {
        log.debug("Finding user by email: {}", email);
        return userRepository.findByEmailAndIsActiveTrue(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
    
    @Override
    public User findByEmailAndRole(String email, String role) {
        log.debug("Finding user by email: {} and role: {}", email, role);
        Role userRole = Role.valueOf(role.toUpperCase());
        return userRepository.findByEmailAndRoleAndIsActiveTrue(email, userRole)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email + " and role: " + role));
    }
    
    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    @Override
    @Transactional
    public void updateLastLogin(String email) {
        userRepository.updateLastLogin(email, LocalDateTime.now());
        log.debug("Updated last login for user: {}", email);
    }
}