package com.brewnest.Controller;

import org.springframework.web.bind.annotation.*;

import com.brewnest.dto.response.CreatePaymentResponse;
import com.brewnest.dto.request.CreatePaymentRequest;
import com.brewnest.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create")
    public CreatePaymentResponse createPayment(
            @RequestBody CreatePaymentRequest request
    ) {
        return paymentService.createPayment(request);
    }

    @PostMapping("/notify")
    public String notifyPayment() {
        System.out.println("PayHere Notification Received");
        return "OK";
    }

    
}