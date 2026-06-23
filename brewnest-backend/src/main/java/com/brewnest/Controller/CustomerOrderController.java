package com.brewnest.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brewnest.dto.request.PlaceOrderRequest;
import com.brewnest.dto.response.ApiResponse;
import com.brewnest.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/customer/orders")
@RequiredArgsConstructor
public class CustomerOrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<?> placeOrder(
            @RequestBody PlaceOrderRequest request
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        orderService.placeOrder(request),
                        "Order placed successfully"
                )
        );
    }

    @GetMapping
    public ResponseEntity<?> getMyOrders() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        orderService.getMyOrders(),
                        "Orders retrieved"
                )
        );
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrder(
            @PathVariable Long orderId
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        orderService.getOrder(orderId),
                        "Order retrieved"
                )
        );
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<?> cancelOrder(
            @PathVariable Long orderId
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        orderService.cancelOrder(orderId),
                        "Order cancelled"
                )
        );
    }
}  

