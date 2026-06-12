-- Create trigger to automatically update updated_at
CREATE OR ALTER TRIGGER trg_users_update
ON users
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE users 
    SET updated_at = GETDATE() 
    WHERE id IN (SELECT DISTINCT id FROM inserted);
END;
GO