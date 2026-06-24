package com.brewnest.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brewnest.dto.request.PlaceOrderRequest;
import com.brewnest.dto.request.UpdateOrderStatusRequest;
import com.brewnest.dto.response.OrderItemResponse;
import com.brewnest.dto.response.OrderResponse;
import com.brewnest.dto.response.OrderSummaryResponse;
import com.brewnest.entity.Cart;
import com.brewnest.entity.CartItem;
import com.brewnest.entity.Order;
import com.brewnest.entity.OrderItem;
import com.brewnest.entity.OrderStatus;
import com.brewnest.entity.PaymentStatus;
import com.brewnest.entity.User;
import com.brewnest.repository.CartRepository;
import com.brewnest.repository.OrderRepository;
import com.brewnest.repository.UserRepository;
import com.brewnest.service.OrderService;
import com.brewnest.entity.PaymentMethod;

import lombok.RequiredArgsConstructor;
import com.brewnest.entity.Address;


@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @Override
    public OrderResponse placeOrder(PlaceOrderRequest request) {

        User user = getCurrentUser();

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        BigDecimal totalAmount = BigDecimal.ZERO;

        Address address = new Address();

address.setFullName(request.getFullName());
address.setPhoneNumber(request.getPhoneNumber());
address.setAddressLine1(request.getAddressLine1());
address.setAddressLine2(request.getAddressLine2());
address.setCity(request.getCity());
address.setDistrict(request.getDistrict());
address.setPostalCode(request.getPostalCode());

Order order = Order.builder()
        .customer(user)
        .paymentMethod(request.getPaymentMethod())
        .paymentStatus(
                request.getPaymentMethod() == PaymentMethod.CARD
                        ? PaymentStatus.PAID
                        : PaymentStatus.PENDING
        )
        .deliveryAddress(address)
        .status(OrderStatus.PENDING)
        .items(new ArrayList<>())
        .build();

        for (CartItem cartItem : cart.getItems()) {

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .menuItem(cartItem.getMenuItem())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getPrice())
                    .build();

            order.getItems().add(orderItem);

            totalAmount = totalAmount.add(
                    cartItem.getPrice().multiply(
                            BigDecimal.valueOf(cartItem.getQuantity())
                    )
            );
        }

        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);

        cart.getItems().clear();
        cartRepository.save(cart);

        return mapToOrderResponse(savedOrder);
    }

    @Override
    public List<OrderSummaryResponse> getMyOrders() {

        User user = getCurrentUser();

        return orderRepository
                .findByCustomerOrderByOrderedAtDesc(user)
                .stream()
                .map(order -> OrderSummaryResponse.builder()
                        .orderId(order.getId())
                        .status(order.getStatus())
                        .totalAmount(order.getTotalAmount())
                        .orderedAt(order.getOrderedAt())
                        .build())
                .toList();
    }

    @Override
    public OrderResponse getOrder(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        return mapToOrderResponse(order);
    }

    @Override
    public OrderResponse cancelOrder(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        order.setStatus(OrderStatus.CANCELLED);

        return mapToOrderResponse(
                orderRepository.save(order)
        );
    }

    @Override
    public List<OrderResponse> getAllOrders() {

        return orderRepository
                .findAllByOrderByOrderedAtDesc()
                .stream()
                .map(this::mapToOrderResponse)
                .toList();
    }

    @Override
    public OrderResponse updateStatus(
            Long orderId,
            UpdateOrderStatusRequest request
    ) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        order.setStatus(request.getStatus());

        return mapToOrderResponse(
                orderRepository.save(order)
        );
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    private OrderResponse mapToOrderResponse(Order order) {

        List<OrderItemResponse> items = new ArrayList<>();

        if (order.getItems() != null) {

            for (OrderItem item : order.getItems()) {

                items.add(
                        OrderItemResponse.builder()
                                .menuItemId(item.getMenuItem().getId())
                                .name(item.getMenuItem().getName())
                                .quantity(item.getQuantity())
                                .price(item.getPrice())
                                .subtotal(
                                        item.getPrice().multiply(
                                                BigDecimal.valueOf(
                                                        item.getQuantity()
                                                )
                                        )
                                )
                                .build()
                );
            }
        }

        return OrderResponse.builder()
        .orderId(order.getId())
        .status(order.getStatus())
        .paymentMethod(order.getPaymentMethod())
        .paymentStatus(order.getPaymentStatus())
        .totalAmount(order.getTotalAmount())
        .orderedAt(order.getOrderedAt())

        .fullName(
                order.getDeliveryAddress() != null
                        ? order.getDeliveryAddress().getFullName()
                        : null
        )
        .phoneNumber(
                order.getDeliveryAddress() != null
                        ? order.getDeliveryAddress().getPhoneNumber()
                        : null
        )
        .addressLine1(
                order.getDeliveryAddress() != null
                        ? order.getDeliveryAddress().getAddressLine1()
                        : null
        )
        .addressLine2(
                order.getDeliveryAddress() != null
                        ? order.getDeliveryAddress().getAddressLine2()
                        : null
        )
        .city(
                order.getDeliveryAddress() != null
                        ? order.getDeliveryAddress().getCity()
                        : null
        )
        .district(
                order.getDeliveryAddress() != null
                        ? order.getDeliveryAddress().getDistrict()
                        : null
        )
        .postalCode(
                order.getDeliveryAddress() != null
                        ? order.getDeliveryAddress().getPostalCode()
                        : null
        )

        .items(items)
        .build();
    }
}