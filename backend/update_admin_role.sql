-- SQL Script to update admin@it.in user role to Admin
-- Run this in SQL Server Management Studio or Azure Data Studio

USE [AppointmentBookingDb]  -- Replace with your actual database name
GO

-- Update the role for admin@it.in to Admin
UPDATE Users
SET Role = 'Admin'
WHERE Email = 'admin@it.in';

-- Verify the update
SELECT Id, Username, Email, Role
FROM Users
WHERE Email = 'admin@it.in';

GO
