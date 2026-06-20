package com.brewnest.service;

import com.brewnest.dto.request.MenuCategoryRequest;
import com.brewnest.dto.response.MenuCategoryResponse;

import java.util.List;

public interface MenuCategoryService {
    MenuCategoryResponse createCategory(MenuCategoryRequest request);
    MenuCategoryResponse updateCategory(Long id, MenuCategoryRequest request);
    void deleteCategory(Long id);
    MenuCategoryResponse getCategoryById(Long id);
    List<MenuCategoryResponse> getAllCategories();
    List<MenuCategoryResponse> getActiveCategories();
}
