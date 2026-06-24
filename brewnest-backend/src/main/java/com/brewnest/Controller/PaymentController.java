package com.brewnest.Controller;

import org.springframework.web.bind.annotation.*;

import com.brewnest.dto.response.PaymentResponse;
import com.brewnest.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create")
    public PaymentResponse createPayment(
            @RequestParam Double amount
    ) {
        return paymentService.createPayment(amount);
    }

    @GetMapping("/verify/{paymentId}")
    public boolean verifyPayment(
            @PathVariable String paymentId
    ) {
        return paymentService.verifyPayment(paymentId);
    }
}