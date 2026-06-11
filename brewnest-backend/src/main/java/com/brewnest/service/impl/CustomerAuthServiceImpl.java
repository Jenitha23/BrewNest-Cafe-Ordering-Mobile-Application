// service/impl/CustomerAuthServiceImpl.java
package com.brewnest.service.impl;

import com.brewnest.dto.request.CustomerLoginRequest;
import com.brewnest.dto.request.CustomerSignupRequest;
import com.brewnest.dto.response.CustomerAuthResponse;
import com.brewnest.entity.User;
import com.brewnest.exception.BusinessException;
import com.brewnest.security.JwtTokenProvider;
import com.brewnest.service.CustomerAuthService;
import com.brewnest.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerAuthServiceImpl implements CustomerAuthService {
    
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    
    @Override
    @Transactional
    public CustomerAuthResponse customerSignup(CustomerSignupRequest signupRequest) {
        log.info("Customer signup request for email: {}", signupRequest.getEmail());
        
        // Validate email uniqueness
        validateCustomerEmail(signupRequest.getEmail());
        
        // Create customer account
        User customer = userService.createCustomer(signupRequest);
        
        // Generate JWT token
        String jwt = tokenProvider.generateToken(customer.getEmail());
        
        log.info("Customer registered successfully: {}", customer.getEmail());
        
        return CustomerAuthResponse.builder()
                .token(jwt)
                .type("Bearer")
                .id(customer.getId())
                .email(customer.getEmail())
                .fullName(customer.getFullName())
                .phoneNumber(customer.getPhoneNumber())
                .role(customer.getRole().name())
                .message("Customer account created successfully")
                .build();
    }
    
    @Override
    public CustomerAuthResponse customerLogin(CustomerLoginRequest loginRequest) {
        log.info("Customer login attempt for email: {}", loginRequest.getEmail());
        
        // Authenticate customer
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), 
                loginRequest.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Generate token
        String jwt = tokenProvider.generateToken(loginRequest.getEmail());
        
        // Get customer details
        User customer = userService.findByEmailAndRole(loginRequest.getEmail(), "CUSTOMER");
        
        // Update last login
        userService.updateLastLogin(customer.getEmail());
        
        log.info("Customer logged in successfully: {}", customer.getEmail());
        
        return CustomerAuthResponse.builder()
                .token(jwt)
                .type("Bearer")
                .id(customer.getId())
                .email(customer.getEmail())
                .fullName(customer.getFullName())
                .phoneNumber(customer.getPhoneNumber())
                .role(customer.getRole().name())
                .message("Login successful")
                .build();
    }
    
    @Override
    public void validateCustomerEmail(String email) {
        if (userService.existsByEmail(email)) {
            throw new BusinessException("Email already registered. Please use a different email or login.");
        }
    }
}