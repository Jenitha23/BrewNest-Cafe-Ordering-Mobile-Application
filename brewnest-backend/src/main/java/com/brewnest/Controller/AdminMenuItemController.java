package com.brewnest.Controller;

import com.brewnest.dto.request.AvailabilityUpdateRequest;
import com.brewnest.dto.request.MenuItemRequest;
import com.brewnest.dto.response.ApiResponse;
import com.brewnest.dto.response.MenuItemResponse;
import com.brewnest.entity.AvailabilityStatus;
import com.brewnest.service.MenuItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/admin/menu-items")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminMenuItemController {

    private final MenuItemService menuItemService;

    @PostMapping
    public ResponseEntity<ApiResponse<MenuItemResponse>> createMenuItem(@Valid @RequestBody MenuItemRequest request) {
        MenuItemResponse response = menuItemService.createMenuItem(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Menu item created successfully"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MenuItemResponse>>> getMenuItems(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) AvailabilityStatus status,
            @RequestParam(required = false) String search
    ) {
        List<MenuItemResponse> response = menuItemService.getAdminMenuItems(categoryId, status, search);
        return ResponseEntity.ok(ApiResponse.success(response, "Menu items retrieved successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> getMenuItemById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(menuItemService.getAdminMenuItemById(id), "Menu item retrieved successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> updateMenuItem(
            @PathVariable Long id,
            @Valid @RequestBody MenuItemRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success(menuItemService.updateMenuItem(id, request), "Menu item updated successfully"));
    }

    @PatchMapping("/{id}/availability")
    public ResponseEntity<ApiResponse<MenuItemResponse>> updateAvailability(
            @PathVariable Long id,
            @Valid @RequestBody AvailabilityUpdateRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success(menuItemService.updateAvailability(id, request), "Availability updated successfully"));
    }

    @PostMapping(value = "/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<MenuItemResponse>> uploadImage(
            @PathVariable Long id,
            @RequestParam("image") MultipartFile image
    ) {
        return ResponseEntity.ok(ApiResponse.success(menuItemService.uploadMenuItemImage(id, image), "Image uploaded successfully"));
    }

    @DeleteMapping("/{id}/image")
    public ResponseEntity<ApiResponse<MenuItemResponse>> removeImage(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(menuItemService.removeMenuItemImage(id), "Image removed successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Menu item deleted successfully"));
    }
}
