package com.brewnest.dto.request;

import com.brewnest.entity.AvailabilityStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AvailabilityUpdateRequest {

    @NotNull(message = "Availability status is required")
    private AvailabilityStatus availabilityStatus;
}
