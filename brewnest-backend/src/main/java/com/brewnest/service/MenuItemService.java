package com.brewnest.service;

import com.brewnest.dto.request.AvailabilityUpdateRequest;
import com.brewnest.dto.request.MenuItemRequest;
import com.brewnest.dto.response.MenuItemResponse;
import com.brewnest.entity.AvailabilityStatus;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MenuItemService {
    MenuItemResponse createMenuItem(MenuItemRequest request);
    MenuItemResponse updateMenuItem(Long id, MenuItemRequest request);
    void deleteMenuItem(Long id);
    MenuItemResponse updateAvailability(Long id, AvailabilityUpdateRequest request);
    MenuItemResponse uploadMenuItemImage(Long id, MultipartFile image);
    MenuItemResponse removeMenuItemImage(Long id);
    MenuItemResponse getAdminMenuItemById(Long id);
    List<MenuItemResponse> getAdminMenuItems(Long categoryId, AvailabilityStatus status, String search);
    MenuItemResponse getCustomerMenuItemById(Long id);
    List<MenuItemResponse> getCustomerMenuItems(Long categoryId, String search);
}
