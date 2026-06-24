package com.brewnest.dto.request;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CreatePaymentRequest {

    private BigDecimal amount;
    private String orderId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
}