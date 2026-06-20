package com.brewnest.repository;

import com.brewnest.entity.MenuCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {
    boolean existsByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);
    boolean existsBySlug(String slug);
    boolean existsBySlugAndIdNot(String slug, Long id);
    Optional<MenuCategory> findByNameIgnoreCase(String name);
    List<MenuCategory> findByIsActiveTrueOrderByNameAsc();
    List<MenuCategory> findAllByOrderByNameAsc();
}
