package com.brewnest.service;

import com.brewnest.dto.response.CreatePaymentResponse;
import com.brewnest.dto.request.CreatePaymentRequest;

public interface PaymentService {

    CreatePaymentResponse createPayment(CreatePaymentRequest request);

}
