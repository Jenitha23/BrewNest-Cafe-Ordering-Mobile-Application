// BrewNestApplication.java
package com.brewnest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class BrewNestApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(BrewNestApplication.class, args);
        System.out.println("🚀 BrewNest Application Started Successfully!");
        System.out.println("📱 Customer API: http://localhost:8080/api/customer/auth");
        System.out.println("👑 Admin API: http://localhost:8080/api/admin/auth");
    }
}