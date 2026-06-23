package com.brewnest.dto.request;

import lombok.Data;

@Data
public class AddToCartRequest {

    private Long menuItemId;

    private Integer quantity;
}