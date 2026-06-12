// service/impl/AdminAuthServiceImpl.java
package com.brewnest.service.impl;

import com.brewnest.dto.request.AdminLoginRequest;
import com.brewnest.dto.response.AdminAuthResponse;
import com.brewnest.entity.Role;
import com.brewnest.entity.User;
import com.brewnest.exception.BusinessException;
import com.brewnest.exception.UnauthorizedException;
import com.brewnest.repository.UserRepository;
import com.brewnest.security.JwtTokenProvider;
import com.brewnest.service.AdminAuthService;
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
public class AdminAuthServiceImpl implements AdminAuthService {
    
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    
    @Override
    @Transactional
    public AdminAuthResponse adminLogin(AdminLoginRequest loginRequest) {
        log.info("Admin login attempt for email: {}", loginRequest.getEmail());
        
        // Check if admin exists
        User admin = userRepository.findByEmailAndRole(loginRequest.getEmail(), Role.ADMIN)
                .orElseThrow(() -> new UnauthorizedException("Invalid admin credentials"));
        
        // Verify admin account is active
        if (!admin.getIsActive()) {
            throw new BusinessException("Admin account is deactivated. Contact system administrator.");
        }
        
        try {
            // Authenticate admin
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), 
                    loginRequest.getPassword()
                )
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            // Verify role is ADMIN
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
            
            if (!isAdmin) {
                throw new UnauthorizedException("Access denied. Admin privileges required.");
            }
            
            // Generate JWT token
            String jwt = tokenProvider.generateToken(loginRequest.getEmail());
            
            // Update last login
            userRepository.updateLastLogin(admin.getEmail(), java.time.LocalDateTime.now());
            
            log.info("Admin logged in successfully: {}", admin.getEmail());
            
            return AdminAuthResponse.builder()
                    .token(jwt)
                    .type("Bearer")
                    .id(admin.getId())
                    .email(admin.getEmail())
                    .fullName(admin.getFullName())
                    .role(admin.getRole().name())
                    .message("Admin login successful")
                    .adminCode("ADMIN_" + admin.getId())
                    .build();
                    
        } catch (Exception e) {
            log.error("Admin login failed for {}: {}", loginRequest.getEmail(), e.getMessage());
            throw new UnauthorizedException("Invalid admin credentials");
        }
    }
    
    @Override
    public boolean isAdminExists() {
        return userRepository.countByRole(Role.ADMIN) > 0;
    }
}