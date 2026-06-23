package com.brewnest.service.impl;

import com.brewnest.dto.request.AddToCartRequest;
import com.brewnest.dto.request.UpdateCartItemRequest;
import com.brewnest.dto.response.CartItemResponse;
import com.brewnest.dto.response.CartResponse;
import com.brewnest.entity.Cart;
import com.brewnest.entity.CartItem;
import com.brewnest.entity.MenuItem;
import com.brewnest.entity.User;
import com.brewnest.repository.CartItemRepository;
import com.brewnest.repository.CartRepository;
import com.brewnest.repository.MenuItemRepository;
import com.brewnest.repository.UserRepository;
import com.brewnest.service.CartService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;

    @Override
    public CartResponse getCart() {

        Cart cart = getOrCreateCart();

        return mapToResponse(cart);
    }

    @Override
    public CartResponse addToCart(AddToCartRequest request) {

        Cart cart = getOrCreateCart();

        MenuItem menuItem = menuItemRepository
                .findById(request.getMenuItemId())
                .orElseThrow(() ->
                        new RuntimeException("Menu item not found"));

        CartItem existingItem = cart.getItems()
                .stream()
                .filter(item ->
                        item.getMenuItem()
                                .getId()
                                .equals(menuItem.getId()))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {

            existingItem.setQuantity(
                    existingItem.getQuantity()
                            + request.getQuantity());

            cartItemRepository.save(existingItem);

        } else {

            CartItem cartItem = CartItem.builder()
                    .cart(cart)
                    .menuItem(menuItem)
                    .quantity(request.getQuantity())
                    .price(menuItem.getPrice())
                    .build();

            cartItemRepository.save(cartItem);

            cart.getItems().add(cartItem);
        }

        return mapToResponse(cart);
    }

    @Override
    public CartResponse updateQuantity(
            Long cartItemId,
            UpdateCartItemRequest request
    ) {

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new RuntimeException("Cart item not found"));

        if (request.getQuantity() <= 0) {

            cartItemRepository.delete(item);

            return mapToResponse(item.getCart());
        }

        item.setQuantity(request.getQuantity());

        cartItemRepository.save(item);

        return mapToResponse(item.getCart());
    }

    @Override
    public CartResponse removeItem(Long cartItemId) {

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new RuntimeException("Cart item not found"));

        Cart cart = item.getCart();

        cartItemRepository.delete(item);

        return mapToResponse(cart);
    }

    @Override
    public void clearCart() {

        Cart cart = getOrCreateCart();

        cartItemRepository.deleteAll(cart.getItems());

        cart.getItems().clear();

        cartRepository.save(cart);
    }

    private Cart getOrCreateCart() {

        User user = getCurrentUser();

        return cartRepository.findByUser(user)
                .orElseGet(() -> {

                    Cart cart = Cart.builder()
                            .user(user)
                            .items(new ArrayList<>())
                            .build();

                    return cartRepository.save(cart);
                });
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

    private CartResponse mapToResponse(Cart cart) {

        List<CartItemResponse> itemResponses =
                new ArrayList<>();

        BigDecimal totalAmount = BigDecimal.ZERO;

        int totalItems = 0;

        if (cart.getItems() != null) {

            for (CartItem item : cart.getItems()) {

                BigDecimal subtotal =
                        item.getPrice()
                                .multiply(
                                        BigDecimal.valueOf(
                                                item.getQuantity()));

                totalAmount =
                        totalAmount.add(subtotal);

                totalItems += item.getQuantity();

                itemResponses.add(
                        CartItemResponse.builder()
                                .cartItemId(item.getId())
                                .menuItemId(item.getMenuItem().getId())
                                .name(item.getMenuItem().getName())
                                .imageUrl(item.getMenuItem().getImageUrl())
                                .price(item.getPrice())
                                .quantity(item.getQuantity())
                                .subtotal(subtotal)
                                .build()
                );
            }
        }

        return CartResponse.builder()
                .cartId(cart.getId())
                .totalItems(totalItems)
                .totalAmount(totalAmount)
                .items(itemResponses)
                .build();
    }
}