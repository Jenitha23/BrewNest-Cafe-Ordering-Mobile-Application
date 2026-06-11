// dto/request/CustomerLoginRequest.java
package com.brewnest.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CustomerLoginRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Password is required")
    private String password;
}