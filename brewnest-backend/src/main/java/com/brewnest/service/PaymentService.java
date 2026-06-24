package com.brewnest.service;

import com.brewnest.dto.response.PaymentResponse;

public interface PaymentService {

    PaymentResponse createPayment(Double amount);

    boolean verifyPayment(String paymentId);

}