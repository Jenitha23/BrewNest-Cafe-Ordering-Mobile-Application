package com.brewnest.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brewnest.dto.request.UpdateOrderStatusRequest;
import com.brewnest.dto.response.ApiResponse;
import com.brewnest.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<?> getAllOrders() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        orderService.getAllOrders(),
                        "Orders retrieved"
                )
        );
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long orderId,
            @RequestBody UpdateOrderStatusRequest request
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        orderService.updateStatus(orderId, request),
                        "Status updated"
                )
        );
    }
}

