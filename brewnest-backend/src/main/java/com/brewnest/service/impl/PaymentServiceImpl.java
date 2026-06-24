package com.brewnest.service.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.brewnest.dto.response.PaymentResponse;
import com.brewnest.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Override
    public PaymentResponse createPayment(Double amount) {

        return PaymentResponse.builder()
                .paymentId(UUID.randomUUID().toString())
                .paymentUrl("PAYHERE_SANDBOX_URL")
                .status("PENDING")
                .build();
    }

    @Override
    public boolean verifyPayment(String paymentId) {

        return true;
    }
}