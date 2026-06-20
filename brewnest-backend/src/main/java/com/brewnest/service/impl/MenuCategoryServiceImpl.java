package com.brewnest.service.impl;

import com.brewnest.dto.request.MenuCategoryRequest;
import com.brewnest.dto.response.MenuCategoryResponse;
import com.brewnest.entity.MenuCategory;
import com.brewnest.exception.BusinessException;
import com.brewnest.exception.DuplicateResourceException;
import com.brewnest.exception.ResourceNotFoundException;
import com.brewnest.repository.MenuCategoryRepository;
import com.brewnest.repository.MenuItemRepository;
import com.brewnest.service.MenuCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class MenuCategoryServiceImpl implements MenuCategoryService {

    private final MenuCategoryRepository categoryRepository;
    private final MenuItemRepository menuItemRepository;

    @Override
    @Transactional
    public MenuCategoryResponse createCategory(MenuCategoryRequest request) {
        String name = normalizeName(request.getName());
        String slug = createSlug(name);

        if (categoryRepository.existsByNameIgnoreCase(name)) {
            throw new DuplicateResourceException("Category", "name", name);
        }
        if (categoryRepository.existsBySlug(slug)) {
            throw new DuplicateResourceException("Category", "slug", slug);
        }

        MenuCategory category = MenuCategory.builder()
                .name(name)
                .slug(slug)
                .isActive(request.getIsActive() == null || request.getIsActive())
                .build();

        return mapToResponse(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public MenuCategoryResponse updateCategory(Long id, MenuCategoryRequest request) {
        MenuCategory category = findCategory(id);
        String name = normalizeName(request.getName());
        String slug = createSlug(name);

        if (categoryRepository.existsByNameIgnoreCaseAndIdNot(name, id)) {
            throw new DuplicateResourceException("Category", "name", name);
        }
        if (categoryRepository.existsBySlugAndIdNot(slug, id)) {
            throw new DuplicateResourceException("Category", "slug", slug);
        }

        category.setName(name);
        category.setSlug(slug);
        if (request.getIsActive() != null) {
            category.setIsActive(request.getIsActive());
        }

        return mapToResponse(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        MenuCategory category = findCategory(id);

        if (menuItemRepository.existsByCategoryId(id)) {
            category.setIsActive(false);
            categoryRepository.save(category);
            return;
        }

        categoryRepository.delete(category);
    }

    @Override
    @Transactional(readOnly = true)
    public MenuCategoryResponse getCategoryById(Long id) {
        return mapToResponse(findCategory(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<MenuCategoryResponse> getAllCategories() {
        return categoryRepository.findAllByOrderByNameAsc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MenuCategoryResponse> getActiveCategories() {
        return categoryRepository.findByIsActiveTrueOrderByNameAsc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private MenuCategory findCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
    }

    private MenuCategoryResponse mapToResponse(MenuCategory category) {
        return MenuCategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .isActive(category.getIsActive())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }

    private String normalizeName(String name) {
        return name == null ? null : name.trim().replaceAll("\\s+", " ");
    }

    private String createSlug(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalized).replaceAll("")
                .toLowerCase(Locale.ENGLISH)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }
}
