package com.brewnest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brewnest.entity.Order;
import com.brewnest.entity.OrderStatus;
import com.brewnest.entity.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCustomerOrderByOrderedAtDesc(
            User customer
    );

    List<Order> findByStatusOrderByOrderedAtDesc(
            OrderStatus status
    );

    List<Order> findAllByOrderByOrderedAtDesc();

}