package com.brewnest.Controller;

import com.brewnest.dto.response.ApiResponse;
import com.brewnest.dto.response.MenuCategoryResponse;
import com.brewnest.dto.response.MenuItemResponse;
import com.brewnest.service.MenuCategoryService;
import com.brewnest.service.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer/menu")
@RequiredArgsConstructor
public class CustomerMenuController {

    private final MenuCategoryService categoryService;
    private final MenuItemService menuItemService;

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<MenuCategoryResponse>>> getActiveCategories() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getActiveCategories(), "Categories retrieved successfully"));
    }

    @GetMapping("/items")
    public ResponseEntity<ApiResponse<List<MenuItemResponse>>> getAvailableMenuItems(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String search
    ) {
        List<MenuItemResponse> response = menuItemService.getCustomerMenuItems(categoryId, search);
        return ResponseEntity.ok(ApiResponse.success(response, "Menu items retrieved successfully"));
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> getMenuItemDetails(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(menuItemService.getCustomerMenuItemById(id), "Menu item retrieved successfully"));
    }
}
