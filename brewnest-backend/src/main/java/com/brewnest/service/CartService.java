package com.brewnest.service;

import com.brewnest.dto.request.AddToCartRequest;
import com.brewnest.dto.request.UpdateCartItemRequest;
import com.brewnest.dto.response.CartResponse;

public interface CartService {

    CartResponse getCart();

    CartResponse addToCart(AddToCartRequest request);

    CartResponse updateQuantity(
            Long cartItemId,
            UpdateCartItemRequest request
    );

    CartResponse removeItem(Long cartItemId);

    void clearCart();
}