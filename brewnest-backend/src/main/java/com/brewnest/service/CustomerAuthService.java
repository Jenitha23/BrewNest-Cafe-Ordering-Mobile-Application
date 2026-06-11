// service/CustomerAuthService.java
package com.brewnest.service;

import com.brewnest.dto.request.CustomerSignupRequest;
import com.brewnest.dto.request.CustomerLoginRequest;
import com.brewnest.dto.response.CustomerAuthResponse;

public interface CustomerAuthService {
    CustomerAuthResponse customerSignup(CustomerSignupRequest signupRequest);
    CustomerAuthResponse customerLogin(CustomerLoginRequest loginRequest);
    void validateCustomerEmail(String email);
}