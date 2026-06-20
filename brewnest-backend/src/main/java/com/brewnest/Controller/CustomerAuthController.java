// controller/CustomerAuthController.java
package com.brewnest.Controller;

import com.brewnest.dto.request.CustomerLoginRequest;
import com.brewnest.dto.request.CustomerSignupRequest;
import com.brewnest.dto.response.ApiResponse;
import com.brewnest.dto.response.CustomerAuthResponse;
import com.brewnest.service.CustomerAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class CustomerAuthController {
    
    private final CustomerAuthService customerAuthService;
    
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<CustomerAuthResponse>> customerSignup(
            @Valid @RequestBody CustomerSignupRequest signupRequest) {
        log.info("Received customer signup request for email: {}", signupRequest.getEmail());
        
        CustomerAuthResponse response = customerAuthService.customerSignup(signupRequest);
        
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Customer registered successfully"));
    }
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<CustomerAuthResponse>> customerLogin(
            @Valid @RequestBody CustomerLoginRequest loginRequest) {
        log.info("Received customer login request for email: {}", loginRequest.getEmail());
        
        CustomerAuthResponse response = customerAuthService.customerLogin(loginRequest);
        
        return ResponseEntity
                .ok(ApiResponse.success(response, "Customer login successful"));
    }
}