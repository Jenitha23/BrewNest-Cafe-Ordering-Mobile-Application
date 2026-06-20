package com.brewnest.service;

import com.brewnest.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class FileStorageService {

    private static final List<String> ALLOWED_CONTENT_TYPES = List.of(
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
    );

    @Value("${app.upload-dir:uploads}")
    private String uploadDir;

    public String storeMenuItemImage(MultipartFile file) {
        validateImage(file);

        try {
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() == null ? "image" : file.getOriginalFilename());
            String extension = extractExtension(originalFilename);
            String filename = UUID.randomUUID() + extension;

            Path directory = Paths.get(uploadDir, "menu-items").toAbsolutePath().normalize();
            Files.createDirectories(directory);

            Path targetPath = directory.resolve(filename).normalize();
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/menu-items/" + filename;
        } catch (IOException ex) {
            log.error("Failed to store menu item image", ex);
            throw new BusinessException("Could not upload image. Please try again.");
        }
    }

    public void deleteFileByUrl(String fileUrl) {
        if (fileUrl == null || fileUrl.isBlank() || !fileUrl.startsWith("/uploads/menu-items/")) {
            return;
        }

        String filename = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
        Path path = Paths.get(uploadDir, "menu-items", filename).toAbsolutePath().normalize();

        try {
            Files.deleteIfExists(path);
        } catch (IOException ex) {
            log.warn("Failed to delete image file: {}", path, ex);
        }
    }

    private void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BusinessException("Image file is required");
        }

        if (!ALLOWED_CONTENT_TYPES.contains(file.getContentType())) {
            throw new BusinessException("Only JPG, JPEG, PNG, and WEBP images are allowed");
        }

        long maxSize = 5L * 1024 * 1024;
        if (file.getSize() > maxSize) {
            throw new BusinessException("Image size must be less than 5MB");
        }
    }

    private String extractExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex == -1) {
            return ".jpg";
        }
        return filename.substring(dotIndex).toLowerCase();
    }
}
