package com.brewnest.dto.response;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class OrderItemResponse {

    private Long menuItemId;

    private String name;

    private Integer quantity;

    private BigDecimal price;

    private BigDecimal subtotal;

}

