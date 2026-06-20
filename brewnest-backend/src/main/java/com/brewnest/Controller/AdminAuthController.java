// controller/AdminAuthController.java
package com.brewnest.Controller;

import com.brewnest.dto.request.AdminLoginRequest;
import com.brewnest.dto.response.AdminAuthResponse;
import com.brewnest.dto.response.ApiResponse;
import com.brewnest.service.AdminAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminAuthController {
    
    private final AdminAuthService adminAuthService;
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AdminAuthResponse>> adminLogin(
            @Valid @RequestBody AdminLoginRequest loginRequest) {
        log.info("Received admin login request for email: {}", loginRequest.getEmail());
        
        AdminAuthResponse response = adminAuthService.adminLogin(loginRequest);
        
        return ResponseEntity
                .ok(ApiResponse.success(response, "Admin login successful"));
    }
    
    @GetMapping("/check")
    public ResponseEntity<ApiResponse<Boolean>> checkAdminExists() {
        log.info("Checking if admin exists in system");
        
        boolean exists = adminAuthService.isAdminExists();
        
        return ResponseEntity
                .ok(ApiResponse.success(exists, "Admin existence check completed"));
    }
}