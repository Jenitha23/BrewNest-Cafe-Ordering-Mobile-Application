package com.brewnest.service.impl;

import com.brewnest.dto.request.AvailabilityUpdateRequest;
import com.brewnest.dto.request.MenuItemRequest;
import com.brewnest.dto.response.MenuItemResponse;
import com.brewnest.entity.AvailabilityStatus;
import com.brewnest.entity.MenuCategory;
import com.brewnest.entity.MenuItem;
import com.brewnest.exception.BusinessException;
import com.brewnest.exception.ResourceNotFoundException;
import com.brewnest.repository.MenuCategoryRepository;
import com.brewnest.repository.MenuItemRepository;
import com.brewnest.service.FileStorageService;
import com.brewnest.service.MenuItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuItemServiceImpl implements MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;

    @Override
    @Transactional
    public MenuItemResponse createMenuItem(MenuItemRequest request) {
        MenuCategory category = findActiveCategory(request.getCategoryId());

        MenuItem menuItem = MenuItem.builder()
                .name(normalizeText(request.getName()))
                .description(normalizeText(request.getDescription()))
                .price(request.getPrice())
                .imageUrl(normalizeNullableText(request.getImageUrl()))
                .availabilityStatus(request.getAvailabilityStatus() == null
                        ? AvailabilityStatus.AVAILABLE
                        : request.getAvailabilityStatus())
                .category(category)
                .build();

        return mapToResponse(menuItemRepository.save(menuItem));
    }

    @Override
    @Transactional
    public MenuItemResponse updateMenuItem(Long id, MenuItemRequest request) {
        MenuItem menuItem = findMenuItem(id);
        MenuCategory category = findActiveCategory(request.getCategoryId());

        menuItem.setName(normalizeText(request.getName()));
        menuItem.setDescription(normalizeText(request.getDescription()));
        menuItem.setPrice(request.getPrice());
        menuItem.setCategory(category);

        if (StringUtils.hasText(request.getImageUrl())) {
            menuItem.setImageUrl(request.getImageUrl().trim());
        }
        if (request.getAvailabilityStatus() != null) {
            menuItem.setAvailabilityStatus(request.getAvailabilityStatus());
        }

        return mapToResponse(menuItemRepository.save(menuItem));
    }

    @Override
    @Transactional
    public void deleteMenuItem(Long id) {
        MenuItem menuItem = findMenuItem(id);
        fileStorageService.deleteFileByUrl(menuItem.getImageUrl());
        menuItemRepository.delete(menuItem);
    }

    @Override
    @Transactional
    public MenuItemResponse updateAvailability(Long id, AvailabilityUpdateRequest request) {
        MenuItem menuItem = findMenuItem(id);
        menuItem.setAvailabilityStatus(request.getAvailabilityStatus());
        return mapToResponse(menuItemRepository.save(menuItem));
    }

    @Override
    @Transactional
    public MenuItemResponse uploadMenuItemImage(Long id, MultipartFile image) {
        MenuItem menuItem = findMenuItem(id);

        fileStorageService.deleteFileByUrl(menuItem.getImageUrl());
        String imageUrl = fileStorageService.storeMenuItemImage(image);
        menuItem.setImageUrl(imageUrl);

        return mapToResponse(menuItemRepository.save(menuItem));
    }

    @Override
    @Transactional
    public MenuItemResponse removeMenuItemImage(Long id) {
        MenuItem menuItem = findMenuItem(id);
        fileStorageService.deleteFileByUrl(menuItem.getImageUrl());
        menuItem.setImageUrl(null);
        return mapToResponse(menuItemRepository.save(menuItem));
    }

    @Override
    @Transactional(readOnly = true)
    public MenuItemResponse getAdminMenuItemById(Long id) {
        return mapToResponse(findMenuItem(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<MenuItemResponse> getAdminMenuItems(Long categoryId, AvailabilityStatus status, String search) {
        return menuItemRepository.searchMenuItems(categoryId, status, normalizeSearch(search))
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public MenuItemResponse getCustomerMenuItemById(Long id) {
        MenuItem menuItem = findMenuItem(id);
        if (menuItem.getAvailabilityStatus() != AvailabilityStatus.AVAILABLE || !Boolean.TRUE.equals(menuItem.getCategory().getIsActive())) {
            throw new ResourceNotFoundException("Menu item", "id", id);
        }
        return mapToResponse(menuItem);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MenuItemResponse> getCustomerMenuItems(Long categoryId, String search) {
        return menuItemRepository.searchMenuItems(categoryId, AvailabilityStatus.AVAILABLE, normalizeSearch(search))
                .stream()
                .filter(item -> Boolean.TRUE.equals(item.getCategory().getIsActive()))
                .map(this::mapToResponse)
                .toList();
    }

    private MenuItem findMenuItem(Long id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item", "id", id));
    }

    private MenuCategory findActiveCategory(Long categoryId) {
        MenuCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));

        if (!Boolean.TRUE.equals(category.getIsActive())) {
            throw new BusinessException("Selected category is inactive");
        }
        return category;
    }

    private MenuItemResponse mapToResponse(MenuItem menuItem) {
        return MenuItemResponse.builder()
                .id(menuItem.getId())
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .price(menuItem.getPrice())
                .imageUrl(menuItem.getImageUrl())
                .availabilityStatus(menuItem.getAvailabilityStatus())
                .categoryId(menuItem.getCategory().getId())
                .categoryName(menuItem.getCategory().getName())
                .createdAt(menuItem.getCreatedAt())
                .updatedAt(menuItem.getUpdatedAt())
                .build();
    }

    private String normalizeText(String value) {
        return value == null ? null : value.trim().replaceAll("\\s+", " ");
    }

    private String normalizeNullableText(String value) {
        return StringUtils.hasText(value) ? value.trim() : null;
    }

    private String normalizeSearch(String value) {
        return StringUtils.hasText(value) ? value.trim() : null;
    }
}
