package com.brewnest.repository;

import com.brewnest.entity.AvailabilityStatus;
import com.brewnest.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    List<MenuItem> findAllByOrderByCreatedAtDesc();

    List<MenuItem> findByAvailabilityStatusOrderByCreatedAtDesc(AvailabilityStatus availabilityStatus);

    List<MenuItem> findByCategoryIdAndAvailabilityStatusOrderByCreatedAtDesc(Long categoryId, AvailabilityStatus availabilityStatus);

    boolean existsByCategoryId(Long categoryId);

    @Query("""
            SELECT m FROM MenuItem m
            WHERE (:categoryId IS NULL OR m.category.id = :categoryId)
              AND (:status IS NULL OR m.availabilityStatus = :status)
              AND (:search IS NULL OR LOWER(m.name) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR LOWER(m.description) LIKE LOWER(CONCAT('%', :search, '%')))
            ORDER BY m.createdAt DESC
            """)
    List<MenuItem> searchMenuItems(
            @Param("categoryId") Long categoryId,
            @Param("status") AvailabilityStatus status,
            @Param("search") String search
    );
}
