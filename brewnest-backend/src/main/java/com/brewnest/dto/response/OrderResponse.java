package com.brewnest.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.brewnest.entity.OrderStatus;
import com.brewnest.entity.PaymentMethod;

import lombok.Builder;
import lombok.Data;
import java.util.List;


@Data
@Builder
public class OrderResponse {

    private Long orderId;

    private OrderStatus status;

    private PaymentMethod paymentMethod;

    private BigDecimal totalAmount;

    private LocalDateTime orderedAt;

    private String fullName;

    private String phoneNumber;

    private String addressLine1;

    private String addressLine2;

    private String city;

    private String district;

    private String postalCode;

    private List<OrderItemResponse> items;
}
