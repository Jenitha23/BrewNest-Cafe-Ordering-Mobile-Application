package com.brewnest.Controller;

import com.brewnest.dto.request.AddToCartRequest;
import com.brewnest.dto.request.UpdateCartItemRequest;
import com.brewnest.dto.response.ApiResponse;
import com.brewnest.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<?> getCart() {
        return ResponseEntity.ok(
                ApiResponse.success(
                        cartService.getCart(),
                        "Cart retrieved"
                )
        );
    }

    @PostMapping
    public ResponseEntity<?> addToCart(
            @RequestBody AddToCartRequest request
    ) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        cartService.addToCart(request),
                        "Added to cart"
                )
        );
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<?> updateQuantity(
            @PathVariable Long cartItemId,
            @RequestBody UpdateCartItemRequest request
    ) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        cartService.updateQuantity(cartItemId, request),
                        "Quantity updated"
                )
        );
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<?> removeItem(
            @PathVariable Long cartItemId
    ) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        cartService.removeItem(cartItemId),
                        "Item removed"
                )
        );
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart() {

        cartService.clearCart();

        return ResponseEntity.ok(
                ApiResponse.success(
                        null,
                        "Cart cleared"
                )
        );
    }
}