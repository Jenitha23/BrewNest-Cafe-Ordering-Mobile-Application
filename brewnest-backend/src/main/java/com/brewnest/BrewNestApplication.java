// BrewNestApplication.java
package com.brewnest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class BrewNestApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(BrewNestApplication.class, args);
        System.out.println("╔═══════════════════════════════════════════════════╗");
        System.out.println("║     🚀 BrewNest Application Started Successfully   ║");
        System.out.println("╠═══════════════════════════════════════════════════╣");
        System.out.println("║  📱 Customer API: /api/customer/auth/*            ║");
        System.out.println("║  👑 Admin API:    /api/admin/auth/*               ║");
        System.out.println("║  🔐 Swagger UI:   /swagger-ui.html (if enabled)   ║");
        System.out.println("╚═══════════════════════════════════════════════════╝");
    }
}