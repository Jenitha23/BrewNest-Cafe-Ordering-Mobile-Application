ALTER TABLE orders
ADD payment_status VARCHAR(20);
GO

UPDATE orders
SET payment_status = 'PENDING';
GO