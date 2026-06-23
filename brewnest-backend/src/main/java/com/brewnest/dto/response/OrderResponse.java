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

    private List<OrderItemResponse> items;

}   

