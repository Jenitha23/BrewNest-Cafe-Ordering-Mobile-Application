package com.brewnest.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.brewnest.entity.OrderStatus;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class OrderSummaryResponse {

    private Long orderId;

    private OrderStatus status;

    private BigDecimal totalAmount;

    private LocalDateTime orderedAt;

}    

