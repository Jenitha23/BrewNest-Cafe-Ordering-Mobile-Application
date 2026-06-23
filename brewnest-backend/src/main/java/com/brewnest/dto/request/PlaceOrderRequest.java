package com.brewnest.dto.request;

import com.brewnest.entity.PaymentMethod;

import lombok.Data;

@Data
public class PlaceOrderRequest {

    private PaymentMethod paymentMethod;

}

