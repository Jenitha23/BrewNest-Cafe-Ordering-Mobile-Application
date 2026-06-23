package com.brewnest.service;

import com.brewnest.dto.request.PlaceOrderRequest;
import com.brewnest.dto.request.UpdateOrderStatusRequest;
import com.brewnest.dto.response.OrderResponse;
import com.brewnest.dto.response.OrderSummaryResponse;
import java.util.List;


public interface OrderService {

    OrderResponse placeOrder(
            PlaceOrderRequest request
    );

    List<OrderSummaryResponse> getMyOrders();

    OrderResponse getOrder(
            Long orderId
    );

    OrderResponse cancelOrder(
            Long orderId
    );

    List<OrderResponse> getAllOrders();

    OrderResponse updateStatus(
            Long orderId,
            UpdateOrderStatusRequest request
    );

}   

