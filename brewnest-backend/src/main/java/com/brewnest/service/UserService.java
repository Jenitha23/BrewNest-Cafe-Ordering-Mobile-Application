// service/UserService.java
package com.brewnest.service;

import com.brewnest.entity.User;
import com.brewnest.dto.request.CustomerSignupRequest;

public interface UserService {
    User createCustomer(CustomerSignupRequest signupRequest);
    User findByEmail(String email);
    User findByEmailAndRole(String email, String role);
    boolean existsByEmail(String email);
    void updateLastLogin(String email);
}