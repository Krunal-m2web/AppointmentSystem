CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
    `ProductVersion` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
) CHARACTER SET=utf8mb4;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    ALTER DATABASE CHARACTER SET utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `recurrencerules` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `RRuleString` varchar(500) CHARACTER SET utf8mb4 NOT NULL,
        `StartDateUtc` datetime(6) NOT NULL,
        `EndDateUtc` datetime(6) NULL,
        `Timezone` varchar(64) CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_recurrencerules` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `staffinvites` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `Token` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `CompanyId` int NOT NULL,
        `Email` longtext CHARACTER SET utf8mb4 NULL,
        `ExpiresAt` datetime(6) NOT NULL,
        `IsUsed` tinyint(1) NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_staffinvites` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `appointmentcalendarsyncs` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `AppointmentId` int NULL,
        `StaffId` int NOT NULL,
        `GoogleEventId` varchar(500) CHARACTER SET utf8mb4 NOT NULL,
        `Source` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
        `GoogleEtag` varchar(255) CHARACTER SET utf8mb4 NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_appointmentcalendarsyncs` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `appointmentreservations` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `StaffId` int NOT NULL,
        `StartDateTime` datetime(6) NOT NULL,
        `EndDateTime` datetime(6) NOT NULL,
        `ReservedByCustomerId` int NULL,
        `ReservedBySessionId` longtext CHARACTER SET utf8mb4 NULL,
        `ExpiresAt` datetime(6) NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_appointmentreservations` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `appointments` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `CompanyId` int NOT NULL,
        `CustomerId` int NOT NULL,
        `ServiceId` int NOT NULL,
        `StaffId` int NULL,
        `StartDateTimeUtc` datetime(6) NOT NULL,
        `EndDateTimeUtc` datetime(6) NOT NULL,
        `MeetingType` int NOT NULL,
        `Status` int NOT NULL,
        `RecurrenceRuleId` int NULL,
        `ParentAppointmentId` int NULL,
        `CurrencyCode` varchar(3) CHARACTER SET utf8mb4 NOT NULL,
        `Price` decimal(10,2) NOT NULL,
        `PaymentMethod` int NOT NULL,
        `PaymentStatus` int NOT NULL,
        `Version` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        `Notes` varchar(1000) CHARACTER SET utf8mb4 NULL,
        `BookingToken` char(36) COLLATE ascii_general_ci NOT NULL,
        `CancellationReason` varchar(500) CHARACTER SET utf8mb4 NULL,
        `CancelledAt` datetime(6) NULL,
        `Timezone` varchar(50) CHARACTER SET utf8mb4 NULL,
        `ReminderSent` tinyint(1) NOT NULL,
        `FollowupSent` tinyint(1) NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_appointments` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_appointments_appointments_ParentAppointmentId` FOREIGN KEY (`ParentAppointmentId`) REFERENCES `appointments` (`Id`) ON DELETE RESTRICT,
        CONSTRAINT `FK_appointments_recurrencerules_RecurrenceRuleId` FOREIGN KEY (`RecurrenceRuleId`) REFERENCES `recurrencerules` (`Id`) ON DELETE SET NULL
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `availabilities` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `StaffId` int NOT NULL,
        `DayOfWeek` int NOT NULL,
        `StartTime` time(6) NOT NULL,
        `EndTime` time(6) NOT NULL,
        `IsAvailable` tinyint(1) NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_availabilities` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `companies` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `UserId` int NULL,
        `CompanyName` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
        `Slug` varchar(100) CHARACTER SET utf8mb4 NULL,
        `Phone` varchar(20) CHARACTER SET utf8mb4 NOT NULL,
        `Email` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `Address` varchar(500) CHARACTER SET utf8mb4 NULL,
        `Country` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
        `Currency` varchar(3) CHARACTER SET utf8mb4 NOT NULL,
        `Timezone` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
        `WebsiteUrl` longtext CHARACTER SET utf8mb4 NULL,
        `LogoUrl` longtext CHARACTER SET utf8mb4 NULL,
        `IsActive` tinyint(1) NOT NULL,
        `DefaultSenderName` varchar(100) CHARACTER SET utf8mb4 NULL,
        `DefaultSenderEmail` varchar(255) CHARACTER SET utf8mb4 NULL,
        `DefaultReplyToEmail` varchar(255) CHARACTER SET utf8mb4 NULL,
        `IsEmailServiceEnabled` tinyint(1) NOT NULL,
        `IsSmsServiceEnabled` tinyint(1) NOT NULL,
        `EnabledPaymentMethods` longtext CHARACTER SET utf8mb4 NULL,
        `ShowPayNow` tinyint(1) NOT NULL,
        `ShowPayLater` tinyint(1) NOT NULL,
        `EnabledMeetingLocations` longtext CHARACTER SET utf8mb4 NULL,
        `RequireTimeOffApproval` tinyint(1) NOT NULL,
        `AllowCustomerRescheduling` tinyint(1) NOT NULL,
        `ReschedulingMinLeadTime` int NOT NULL,
        `AllowCustomerCanceling` tinyint(1) NOT NULL,
        `CancelingMinLeadTime` int NOT NULL,
        `BookingFormPrimaryColor` varchar(7) CHARACTER SET utf8mb4 NULL,
        `BookingFormSecondaryColor` varchar(7) CHARACTER SET utf8mb4 NULL,
        `BookingFormLabels` longtext CHARACTER SET utf8mb4 NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_companies` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `customers` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `CompanyId` int NOT NULL,
        `Email` varchar(255) CHARACTER SET utf8mb4 NULL,
        `FirstName` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
        `LastName` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
        `Phone` varchar(20) CHARACTER SET utf8mb4 NULL,
        `Notes` varchar(1000) CHARACTER SET utf8mb4 NULL,
        `IsActive` tinyint(1) NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_customers` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_customers_companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `notificationconfigs` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `CompanyId` int NOT NULL,
        `Type` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
        `IsEnabled` tinyint(1) NOT NULL,
        `IsPushEnabled` tinyint(1) NOT NULL,
        `Subject` longtext CHARACTER SET utf8mb4 NOT NULL,
        `Body` longtext CHARACTER SET utf8mb4 NOT NULL,
        `TimingValue` int NOT NULL,
        `TimingUnit` longtext CHARACTER SET utf8mb4 NOT NULL,
        `TimingContext` longtext CHARACTER SET utf8mb4 NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_notificationconfigs` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_notificationconfigs_companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `services` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `CompanyId` int NOT NULL,
        `Name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
        `Description` varchar(500) CHARACTER SET utf8mb4 NULL,
        `Price` decimal(10,2) NOT NULL,
        `ServiceDuration` int NOT NULL,
        `IsActive` tinyint(1) NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_services` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_services_companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `staff` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `CompanyId` int NOT NULL,
        `Email` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `FirstName` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
        `LastName` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
        `Phone` varchar(20) CHARACTER SET utf8mb4 NULL,
        `Address` varchar(255) CHARACTER SET utf8mb4 NULL,
        `PasswordHash` longtext CHARACTER SET utf8mb4 NOT NULL,
        `IsActive` tinyint(1) NOT NULL,
        `Notes` varchar(1000) CHARACTER SET utf8mb4 NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_staff` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_staff_companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `users` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `CompanyId` int NOT NULL,
        `Email` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `FirstName` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
        `LastName` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
        `Phone` varchar(20) CHARACTER SET utf8mb4 NOT NULL,
        `Country` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
        `PasswordHash` longtext CHARACTER SET utf8mb4 NOT NULL,
        `IsActive` tinyint(1) NOT NULL,
        `Position` varchar(100) CHARACTER SET utf8mb4 NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_users` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_users_companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `emaillogs` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `CompanyId` int NULL,
        `FromEmail` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `ToEmail` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `Subject` longtext CHARACTER SET utf8mb4 NOT NULL,
        `AppointmentId` int NULL,
        `NotificationConfigId` int NULL,
        `SentAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_emaillogs` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_emaillogs_notificationconfigs_NotificationConfigId` FOREIGN KEY (`NotificationConfigId`) REFERENCES `notificationconfigs` (`Id`) ON DELETE SET NULL
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `smslogs` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `CompanyId` int NULL,
        `FromNumber` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
        `ToNumber` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
        `MessageBody` longtext CHARACTER SET utf8mb4 NOT NULL,
        `AppointmentId` int NULL,
        `NotificationConfigId` int NULL,
        `SentAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_smslogs` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_smslogs_notificationconfigs_NotificationConfigId` FOREIGN KEY (`NotificationConfigId`) REFERENCES `notificationconfigs` (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `serviceprices` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `ServiceId` int NOT NULL,
        `Currency` varchar(3) CHARACTER SET utf8mb4 NOT NULL,
        `Amount` decimal(10,2) NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_serviceprices` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_serviceprices_services_ServiceId` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `externalcalendarevents` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `StaffId` int NOT NULL,
        `CompanyId` int NOT NULL,
        `GoogleEventId` varchar(500) CHARACTER SET utf8mb4 NOT NULL,
        `Title` varchar(500) CHARACTER SET utf8mb4 NOT NULL,
        `StartDateTimeUtc` datetime(6) NOT NULL,
        `EndDateTimeUtc` datetime(6) NOT NULL,
        `IsAllDay` tinyint(1) NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_externalcalendarevents` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_externalcalendarevents_companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`Id`) ON DELETE RESTRICT,
        CONSTRAINT `FK_externalcalendarevents_staff_StaffId` FOREIGN KEY (`StaffId`) REFERENCES `staff` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `staffgooglecalendars` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `StaffId` int NOT NULL,
        `AccessToken` varchar(2048) CHARACTER SET utf8mb4 NOT NULL,
        `RefreshToken` varchar(2048) CHARACTER SET utf8mb4 NOT NULL,
        `TokenExpiresAtUtc` datetime(6) NOT NULL,
        `GoogleEmail` varchar(255) CHARACTER SET utf8mb4 NULL,
        `CalendarId` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `SyncToken` varchar(512) CHARACTER SET utf8mb4 NULL,
        `WebhookChannelId` varchar(255) CHARACTER SET utf8mb4 NULL,
        `WebhookResourceId` varchar(255) CHARACTER SET utf8mb4 NULL,
        `WebhookExpiresAtUtc` datetime(6) NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_staffgooglecalendars` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_staffgooglecalendars_staff_StaffId` FOREIGN KEY (`StaffId`) REFERENCES `staff` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `staffservices` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `StaffId` int NOT NULL,
        `ServiceId` int NOT NULL,
        `CustomPrice` decimal(10,2) NULL,
        `CustomDuration` int NULL,
        `IsActive` tinyint(1) NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        CONSTRAINT `PK_staffservices` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_staffservices_services_ServiceId` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`Id`) ON DELETE RESTRICT,
        CONSTRAINT `FK_staffservices_staff_StaffId` FOREIGN KEY (`StaffId`) REFERENCES `staff` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE TABLE `timeoffs` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `StaffId` int NOT NULL,
        `StartDateTimeUtc` datetime(6) NOT NULL,
        `EndDateTimeUtc` datetime(6) NOT NULL,
        `Reason` varchar(500) CHARACTER SET utf8mb4 NULL,
        `IsFullDay` tinyint(1) NOT NULL,
        `ApprovedByAdminId` int NULL,
        `Status` int NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UpdatedAt` datetime(6) NOT NULL,
        `IsViewedByStaff` tinyint(1) NOT NULL,
        `IsViewedByAdmin` tinyint(1) NOT NULL,
        CONSTRAINT `PK_timeoffs` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_timeoffs_staff_StaffId` FOREIGN KEY (`StaffId`) REFERENCES `staff` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_timeoffs_users_ApprovedByAdminId` FOREIGN KEY (`ApprovedByAdminId`) REFERENCES `users` (`Id`) ON DELETE RESTRICT
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_appointmentcalendarsyncs_AppointmentId` ON `appointmentcalendarsyncs` (`AppointmentId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE UNIQUE INDEX `IX_appointmentcalendarsyncs_StaffId_GoogleEventId` ON `appointmentcalendarsyncs` (`StaffId`, `GoogleEventId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_appointmentreservations_ExpiresAt` ON `appointmentreservations` (`ExpiresAt`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_appointmentreservations_ReservedByCustomerId` ON `appointmentreservations` (`ReservedByCustomerId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_appointmentreservations_StaffId_StartDateTime_EndDateTime` ON `appointmentreservations` (`StaffId`, `StartDateTime`, `EndDateTime`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_appointments_CompanyId_StartDateTimeUtc` ON `appointments` (`CompanyId`, `StartDateTimeUtc`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_appointments_CustomerId` ON `appointments` (`CustomerId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_appointments_ParentAppointmentId` ON `appointments` (`ParentAppointmentId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_appointments_RecurrenceRuleId` ON `appointments` (`RecurrenceRuleId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_appointments_ServiceId` ON `appointments` (`ServiceId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_appointments_StaffId` ON `appointments` (`StaffId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_availabilities_StaffId_DayOfWeek` ON `availabilities` (`StaffId`, `DayOfWeek`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE UNIQUE INDEX `IX_companies_CompanyName` ON `companies` (`CompanyName`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE UNIQUE INDEX `IX_companies_Email` ON `companies` (`Email`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE UNIQUE INDEX `IX_companies_Slug` ON `companies` (`Slug`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_companies_UserId` ON `companies` (`UserId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE UNIQUE INDEX `IX_Customers_CompanyId_Email` ON `customers` (`CompanyId`, `Email`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_Customers_CompanyId_Phone` ON `customers` (`CompanyId`, `Phone`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_emaillogs_NotificationConfigId` ON `emaillogs` (`NotificationConfigId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_externalcalendarevents_CompanyId` ON `externalcalendarevents` (`CompanyId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE UNIQUE INDEX `IX_externalcalendarevents_StaffId_GoogleEventId` ON `externalcalendarevents` (`StaffId`, `GoogleEventId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_externalcalendarevents_StaffId_StartDateTimeUtc_EndDateTimeU~` ON `externalcalendarevents` (`StaffId`, `StartDateTimeUtc`, `EndDateTimeUtc`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_notificationconfigs_CompanyId` ON `notificationconfigs` (`CompanyId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE UNIQUE INDEX `UX_ServicePrices_ServiceId_Currency` ON `serviceprices` (`ServiceId`, `Currency`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE UNIQUE INDEX `IX_Services_CompanyId_Name_Active` ON `services` (`CompanyId`, `Name`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_smslogs_NotificationConfigId` ON `smslogs` (`NotificationConfigId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_staff_CompanyId` ON `staff` (`CompanyId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE UNIQUE INDEX `IX_staff_Email` ON `staff` (`Email`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE UNIQUE INDEX `IX_staffgooglecalendars_StaffId` ON `staffgooglecalendars` (`StaffId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE UNIQUE INDEX `IX_staffinvites_Token` ON `staffinvites` (`Token`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_staffservices_ServiceId` ON `staffservices` (`ServiceId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE UNIQUE INDEX `IX_staffservices_StaffId_ServiceId` ON `staffservices` (`StaffId`, `ServiceId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_timeoffs_ApprovedByAdminId` ON `timeoffs` (`ApprovedByAdminId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE INDEX `IX_timeoffs_StaffId_StartDateTimeUtc_EndDateTimeUtc` ON `timeoffs` (`StaffId`, `StartDateTimeUtc`, `EndDateTimeUtc`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    CREATE UNIQUE INDEX `IX_users_CompanyId_Email` ON `users` (`CompanyId`, `Email`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    ALTER TABLE `appointmentcalendarsyncs` ADD CONSTRAINT `FK_appointmentcalendarsyncs_appointments_AppointmentId` FOREIGN KEY (`AppointmentId`) REFERENCES `appointments` (`Id`) ON DELETE CASCADE;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    ALTER TABLE `appointmentcalendarsyncs` ADD CONSTRAINT `FK_appointmentcalendarsyncs_staff_StaffId` FOREIGN KEY (`StaffId`) REFERENCES `staff` (`Id`) ON DELETE RESTRICT;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    ALTER TABLE `appointmentreservations` ADD CONSTRAINT `FK_appointmentreservations_customers_ReservedByCustomerId` FOREIGN KEY (`ReservedByCustomerId`) REFERENCES `customers` (`Id`) ON DELETE SET NULL;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    ALTER TABLE `appointmentreservations` ADD CONSTRAINT `FK_appointmentreservations_staff_StaffId` FOREIGN KEY (`StaffId`) REFERENCES `staff` (`Id`) ON DELETE RESTRICT;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    ALTER TABLE `appointments` ADD CONSTRAINT `FK_appointments_companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`Id`) ON DELETE RESTRICT;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    ALTER TABLE `appointments` ADD CONSTRAINT `FK_appointments_customers_CustomerId` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`Id`) ON DELETE RESTRICT;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    ALTER TABLE `appointments` ADD CONSTRAINT `FK_appointments_services_ServiceId` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`Id`) ON DELETE RESTRICT;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    ALTER TABLE `appointments` ADD CONSTRAINT `FK_appointments_staff_StaffId` FOREIGN KEY (`StaffId`) REFERENCES `staff` (`Id`) ON DELETE SET NULL;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    ALTER TABLE `availabilities` ADD CONSTRAINT `FK_availabilities_staff_StaffId` FOREIGN KEY (`StaffId`) REFERENCES `staff` (`Id`) ON DELETE CASCADE;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    ALTER TABLE `companies` ADD CONSTRAINT `FK_companies_users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE RESTRICT;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260206044751_InitialCreate') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20260206044751_InitialCreate', '8.0.0');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220095842_RemoveUserFieldsAndMakeCompanyFieldsOptional') THEN

    ALTER TABLE `users` DROP COLUMN `Country`;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220095842_RemoveUserFieldsAndMakeCompanyFieldsOptional') THEN

    ALTER TABLE `users` DROP COLUMN `Phone`;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220095842_RemoveUserFieldsAndMakeCompanyFieldsOptional') THEN

    ALTER TABLE `companies` MODIFY COLUMN `Phone` varchar(20) CHARACTER SET utf8mb4 NULL;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220095842_RemoveUserFieldsAndMakeCompanyFieldsOptional') THEN

    ALTER TABLE `companies` MODIFY COLUMN `Country` varchar(100) CHARACTER SET utf8mb4 NULL;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220095842_RemoveUserFieldsAndMakeCompanyFieldsOptional') THEN

    ALTER TABLE `appointments` MODIFY COLUMN `Version` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220095842_RemoveUserFieldsAndMakeCompanyFieldsOptional') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20260220095842_RemoveUserFieldsAndMakeCompanyFieldsOptional', '8.0.0');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220100912_MakeCountryRequiredInCompany') THEN

    UPDATE `companies` SET `Country` = ''
    WHERE `Country` IS NULL;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220100912_MakeCountryRequiredInCompany') THEN

    ALTER TABLE `companies` MODIFY COLUMN `Country` varchar(100) CHARACTER SET utf8mb4 NOT NULL;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220100912_MakeCountryRequiredInCompany') THEN

    ALTER TABLE `appointments` MODIFY COLUMN `Version` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220100912_MakeCountryRequiredInCompany') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20260220100912_MakeCountryRequiredInCompany', '8.0.0');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220110911_AddEmailVerificationTable') THEN

    ALTER TABLE `appointments` MODIFY COLUMN `Version` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220110911_AddEmailVerificationTable') THEN

    CREATE TABLE `emailverifications` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `Email` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `OtpCode` varchar(6) CHARACTER SET utf8mb4 NOT NULL,
        `ExpiresAt` datetime(6) NOT NULL,
        `IsUsed` tinyint(1) NOT NULL,
        `CreatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        CONSTRAINT `PK_emailverifications` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220110911_AddEmailVerificationTable') THEN

    CREATE INDEX `IX_emailverifications_Email` ON `emailverifications` (`Email`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260220110911_AddEmailVerificationTable') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20260220110911_AddEmailVerificationTable', '8.0.0');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260223052645_AddPasswordResetToken') THEN

    ALTER TABLE `appointments` MODIFY COLUMN `Version` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260223052645_AddPasswordResetToken') THEN

    CREATE TABLE `passwordresettokens` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `Email` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `Token` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `ExpiresAt` datetime(6) NOT NULL,
        `IsUsed` tinyint(1) NOT NULL,
        `CreatedAt` datetime(6) NOT NULL,
        `UserRole` longtext CHARACTER SET utf8mb4 NOT NULL,
        CONSTRAINT `PK_passwordresettokens` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260223052645_AddPasswordResetToken') THEN

    CREATE INDEX `IX_passwordresettokens_Email` ON `passwordresettokens` (`Email`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260223052645_AddPasswordResetToken') THEN

    CREATE UNIQUE INDEX `IX_passwordresettokens_Token` ON `passwordresettokens` (`Token`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20260223052645_AddPasswordResetToken') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20260223052645_AddPasswordResetToken', '8.0.0');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

