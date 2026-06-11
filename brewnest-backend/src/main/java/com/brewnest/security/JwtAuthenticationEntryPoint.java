// security/JwtAuthenticationEntryPoint.java
package com.brewnest.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.brewnest.dto.response.ApiResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, 
                        HttpServletResponse response,
                        AuthenticationException authException) throws IOException, ServletException {
        
        log.error("Unauthorized error: {}", authException.getMessage());
        
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        
        ApiResponse<Void> apiResponse = ApiResponse.error("Unauthorized: " + authException.getMessage());
        
        ObjectMapper mapper = new ObjectMapper();
        response.getWriter().write(mapper.writeValueAsString(apiResponse));
    }
}