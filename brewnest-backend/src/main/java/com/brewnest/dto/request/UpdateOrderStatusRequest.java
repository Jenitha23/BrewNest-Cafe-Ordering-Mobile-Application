package com.brewnest.dto.request;

import lombok.Data;
import com.brewnest.entity.OrderStatus;

@Data
public class UpdateOrderStatusRequest {

    private OrderStatus status;

}
