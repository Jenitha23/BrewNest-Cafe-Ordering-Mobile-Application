package com.brewnest.service.impl;

import java.math.BigDecimal; 
import java.security.MessageDigest; 
import java.util.Formatter;

import org.springframework.beans.factory.annotation.Value; 
import org.springframework.stereotype.Service;

import com.brewnest.dto.request.CreatePaymentRequest; 
import com.brewnest.dto.response.CreatePaymentResponse; 
import com.brewnest.service.PaymentService;

@Service 
public class PaymentServiceImpl implements PaymentService {

    @Value("${payhere.merchant-id}")
    private String merchantId;

    @Value("${payhere.merchant-secret}")
    private String merchantSecret;

    @Override
    public CreatePaymentResponse createPayment(CreatePaymentRequest request) {

        String amount = request.getAmount()
                .setScale(2, BigDecimal.ROUND_HALF_UP)
                .toString();

        String hash = generateHash(
            merchantId,
            request.getOrderId(),
            amount,
            "LKR"
        );
        return CreatePaymentResponse.builder() 
        .merchantId(merchantId) 
        .returnUrl("https://www.google.com") 
        .cancelUrl("https://www.google.com") 
        .notifyUrl("http://YOUR_PC_IP:8080/api/payments/notify") 
        .orderId(request.getOrderId()) 
        .items("BrewNest Order") 
        .currency("LKR") 
        .amount(amount) 
        .firstName(request.getFirstName()) 
        .lastName(request.getLastName()) 
        .email(request.getEmail()) 
        .phone(request.getPhone()) 
        .address("Jaffna") 
        .city("Jaffna") 
        .country("Sri Lanka") 
        .hash(hash) 
        .build(); 
    }

    private String generateHash( 
        String merchantId, 
        String orderId, 
        String amount, 
        String currency 
    ) {

        String md5Secret = md5(merchantSecret).toUpperCase();
        String raw = merchantId + orderId + amount + currency + md5Secret;
        return md5(raw).toUpperCase();
    }
    private String md5(String data) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5"); 
            byte[] digest = md.digest(data.getBytes()); 
            
            Formatter formatter = new Formatter(); 
            
            for (byte b : digest) { 
                formatter.format("%02x", b); 
            }

            String result = formatter.toString(); 
            formatter.close(); 
            
            return result; 
        
        } catch (Exception e) { 
            throw new RuntimeException(e); 
        } 
    } 
}