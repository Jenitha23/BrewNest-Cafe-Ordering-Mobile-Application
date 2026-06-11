// service/AdminAuthService.java
package com.brewnest.service;

import com.brewnest.dto.request.AdminLoginRequest;
import com.brewnest.dto.response.AdminAuthResponse;

public interface AdminAuthService {
    AdminAuthResponse adminLogin(AdminLoginRequest loginRequest);
    boolean isAdminExists();
}