// dto/response/CustomerAuthResponse.java
package com.brewnest.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerAuthResponse {
    private String token;
    private String type;
    private Long id;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String role;
    private String message;
}