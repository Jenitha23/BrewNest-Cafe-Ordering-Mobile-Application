package com.brewnest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {

    private Long cartItemId;

    private Long menuItemId;

    private String name;

    private String imageUrl;

    private BigDecimal price;

    private Integer quantity;

    private BigDecimal subtotal;
}