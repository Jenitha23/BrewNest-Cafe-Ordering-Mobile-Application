-- Create users table for SQL Server
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
BEGIN
    CREATE TABLE users (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        phone_number VARCHAR(20),
        role VARCHAR(20) NOT NULL CHECK (role IN ('CUSTOMER', 'ADMIN')) DEFAULT 'CUSTOMER',
        is_active BIT DEFAULT 1,
        last_login DATETIME NULL,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
    );
END
GO