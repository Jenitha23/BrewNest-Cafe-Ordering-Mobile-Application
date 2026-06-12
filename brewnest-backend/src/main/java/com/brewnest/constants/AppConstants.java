// constants/AppConstants.java
package com.brewnest.constants;

public final class AppConstants {
    
    // Role constants
    public static final String ROLE_CUSTOMER = "CUSTOMER";
    public static final String ROLE_ADMIN = "ADMIN";
    
    // JWT constants
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String AUTHORIZATION_HEADER = "Authorization";
    
    // API versioning
    public static final String API_VERSION_V1 = "/api/v1";
    
    // Response messages
    public static final String MSG_LOGIN_SUCCESS = "Login successful";
    public static final String MSG_SIGNUP_SUCCESS = "Registration successful";
    public static final String MSG_LOGOUT_SUCCESS = "Logout successful";
    public static final String MSG_ACCESS_DENIED = "Access denied";
    
    private AppConstants() {
        // Private constructor to prevent instantiation
    }
}