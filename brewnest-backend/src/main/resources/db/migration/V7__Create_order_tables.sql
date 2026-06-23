CREATE TABLE orders (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,

    user_id BIGINT NOT NULL,

    status VARCHAR(30) NOT NULL,

    payment_method VARCHAR(30) NOT NULL,

    total_amount DECIMAL(10,2) NOT NULL,

    ordered_at DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);