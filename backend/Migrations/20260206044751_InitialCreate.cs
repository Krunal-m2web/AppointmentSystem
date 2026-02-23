using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "recurrencerules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RRuleString = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StartDateUtc = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDateUtc = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Timezone = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recurrencerules", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "staffinvites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Token = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsUsed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_staffinvites", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "appointmentcalendarsyncs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AppointmentId = table.Column<int>(type: "int", nullable: true),
                    StaffId = table.Column<int>(type: "int", nullable: false),
                    GoogleEventId = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Source = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GoogleEtag = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_appointmentcalendarsyncs", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "appointmentreservations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    StaffId = table.Column<int>(type: "int", nullable: false),
                    StartDateTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDateTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ReservedByCustomerId = table.Column<int>(type: "int", nullable: true),
                    ReservedBySessionId = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_appointmentreservations", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "appointments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    StaffId = table.Column<int>(type: "int", nullable: true),
                    StartDateTimeUtc = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDateTimeUtc = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    MeetingType = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    RecurrenceRuleId = table.Column<int>(type: "int", nullable: true),
                    ParentAppointmentId = table.Column<int>(type: "int", nullable: true),
                    CurrencyCode = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    PaymentMethod = table.Column<int>(type: "int", nullable: false),
                    PaymentStatus = table.Column<int>(type: "int", nullable: false),
                    Version = table.Column<DateTime>(type: "timestamp(6)", rowVersion: true, nullable: true)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.ComputedColumn),
                    Notes = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BookingToken = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CancellationReason = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CancelledAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Timezone = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ReminderSent = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FollowupSent = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_appointments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_appointments_appointments_ParentAppointmentId",
                        column: x => x.ParentAppointmentId,
                        principalTable: "appointments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_appointments_recurrencerules_RecurrenceRuleId",
                        column: x => x.RecurrenceRuleId,
                        principalTable: "recurrencerules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "availabilities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    StaffId = table.Column<int>(type: "int", nullable: false),
                    DayOfWeek = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time(6)", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time(6)", nullable: false),
                    IsAvailable = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_availabilities", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    CompanyName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Slug = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Phone = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Address = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Country = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Timezone = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WebsiteUrl = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LogoUrl = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    DefaultSenderName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DefaultSenderEmail = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DefaultReplyToEmail = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsEmailServiceEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsSmsServiceEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    EnabledPaymentMethods = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ShowPayNow = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ShowPayLater = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    EnabledMeetingLocations = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RequireTimeOffApproval = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    AllowCustomerRescheduling = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ReschedulingMinLeadTime = table.Column<int>(type: "int", nullable: false),
                    AllowCustomerCanceling = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CancelingMinLeadTime = table.Column<int>(type: "int", nullable: false),
                    BookingFormPrimaryColor = table.Column<string>(type: "varchar(7)", maxLength: 7, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BookingFormSecondaryColor = table.Column<string>(type: "varchar(7)", maxLength: 7, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BookingFormLabels = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_companies", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "customers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FirstName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Phone = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Notes = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_customers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_customers_companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "notificationconfigs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsPushEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Subject = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Body = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TimingValue = table.Column<int>(type: "int", nullable: false),
                    TimingUnit = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TimingContext = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_notificationconfigs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_notificationconfigs_companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    ServiceDuration = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_services", x => x.Id);
                    table.ForeignKey(
                        name: "FK_services_companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "staff",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FirstName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Phone = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Address = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PasswordHash = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Notes = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_staff", x => x.Id);
                    table.ForeignKey(
                        name: "FK_staff_companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FirstName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Phone = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Country = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PasswordHash = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Position = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_users_companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "emaillogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: true),
                    FromEmail = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ToEmail = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Subject = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AppointmentId = table.Column<int>(type: "int", nullable: true),
                    NotificationConfigId = table.Column<int>(type: "int", nullable: true),
                    SentAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_emaillogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_emaillogs_notificationconfigs_NotificationConfigId",
                        column: x => x.NotificationConfigId,
                        principalTable: "notificationconfigs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "smslogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: true),
                    FromNumber = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ToNumber = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MessageBody = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AppointmentId = table.Column<int>(type: "int", nullable: true),
                    NotificationConfigId = table.Column<int>(type: "int", nullable: true),
                    SentAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_smslogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_smslogs_notificationconfigs_NotificationConfigId",
                        column: x => x.NotificationConfigId,
                        principalTable: "notificationconfigs",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "serviceprices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Amount = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_serviceprices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_serviceprices_services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "externalcalendarevents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    StaffId = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    GoogleEventId = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Title = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StartDateTimeUtc = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDateTimeUtc = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsAllDay = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_externalcalendarevents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_externalcalendarevents_companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_externalcalendarevents_staff_StaffId",
                        column: x => x.StaffId,
                        principalTable: "staff",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "staffgooglecalendars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    StaffId = table.Column<int>(type: "int", nullable: false),
                    AccessToken = table.Column<string>(type: "varchar(2048)", maxLength: 2048, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RefreshToken = table.Column<string>(type: "varchar(2048)", maxLength: 2048, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TokenExpiresAtUtc = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    GoogleEmail = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CalendarId = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SyncToken = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WebhookChannelId = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WebhookResourceId = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WebhookExpiresAtUtc = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_staffgooglecalendars", x => x.Id);
                    table.ForeignKey(
                        name: "FK_staffgooglecalendars_staff_StaffId",
                        column: x => x.StaffId,
                        principalTable: "staff",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "staffservices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    StaffId = table.Column<int>(type: "int", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    CustomPrice = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    CustomDuration = table.Column<int>(type: "int", nullable: true),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_staffservices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_staffservices_services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_staffservices_staff_StaffId",
                        column: x => x.StaffId,
                        principalTable: "staff",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "timeoffs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    StaffId = table.Column<int>(type: "int", nullable: false),
                    StartDateTimeUtc = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDateTimeUtc = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Reason = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsFullDay = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ApprovedByAdminId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsViewedByStaff = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsViewedByAdmin = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_timeoffs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_timeoffs_staff_StaffId",
                        column: x => x.StaffId,
                        principalTable: "staff",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_timeoffs_users_ApprovedByAdminId",
                        column: x => x.ApprovedByAdminId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_appointmentcalendarsyncs_AppointmentId",
                table: "appointmentcalendarsyncs",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_appointmentcalendarsyncs_StaffId_GoogleEventId",
                table: "appointmentcalendarsyncs",
                columns: new[] { "StaffId", "GoogleEventId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_appointmentreservations_ExpiresAt",
                table: "appointmentreservations",
                column: "ExpiresAt");

            migrationBuilder.CreateIndex(
                name: "IX_appointmentreservations_ReservedByCustomerId",
                table: "appointmentreservations",
                column: "ReservedByCustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_appointmentreservations_StaffId_StartDateTime_EndDateTime",
                table: "appointmentreservations",
                columns: new[] { "StaffId", "StartDateTime", "EndDateTime" });

            migrationBuilder.CreateIndex(
                name: "IX_appointments_CompanyId_StartDateTimeUtc",
                table: "appointments",
                columns: new[] { "CompanyId", "StartDateTimeUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_appointments_CustomerId",
                table: "appointments",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_appointments_ParentAppointmentId",
                table: "appointments",
                column: "ParentAppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_appointments_RecurrenceRuleId",
                table: "appointments",
                column: "RecurrenceRuleId");

            migrationBuilder.CreateIndex(
                name: "IX_appointments_ServiceId",
                table: "appointments",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_appointments_StaffId",
                table: "appointments",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_availabilities_StaffId_DayOfWeek",
                table: "availabilities",
                columns: new[] { "StaffId", "DayOfWeek" });

            migrationBuilder.CreateIndex(
                name: "IX_companies_CompanyName",
                table: "companies",
                column: "CompanyName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_companies_Email",
                table: "companies",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_companies_Slug",
                table: "companies",
                column: "Slug",
                unique: true,
                filter: "\"Slug\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_companies_UserId",
                table: "companies",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_CompanyId_Email",
                table: "customers",
                columns: new[] { "CompanyId", "Email" },
                unique: true,
                filter: "\"IsActive\" = true AND \"Email\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_CompanyId_Phone",
                table: "customers",
                columns: new[] { "CompanyId", "Phone" },
                filter: "\"IsActive\" = true AND \"Phone\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_emaillogs_NotificationConfigId",
                table: "emaillogs",
                column: "NotificationConfigId");

            migrationBuilder.CreateIndex(
                name: "IX_externalcalendarevents_CompanyId",
                table: "externalcalendarevents",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_externalcalendarevents_StaffId_GoogleEventId",
                table: "externalcalendarevents",
                columns: new[] { "StaffId", "GoogleEventId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_externalcalendarevents_StaffId_StartDateTimeUtc_EndDateTimeU~",
                table: "externalcalendarevents",
                columns: new[] { "StaffId", "StartDateTimeUtc", "EndDateTimeUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_notificationconfigs_CompanyId",
                table: "notificationconfigs",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "UX_ServicePrices_ServiceId_Currency",
                table: "serviceprices",
                columns: new[] { "ServiceId", "Currency" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Services_CompanyId_Name_Active",
                table: "services",
                columns: new[] { "CompanyId", "Name" },
                unique: true,
                filter: "\"IsActive\" = true");

            migrationBuilder.CreateIndex(
                name: "IX_smslogs_NotificationConfigId",
                table: "smslogs",
                column: "NotificationConfigId");

            migrationBuilder.CreateIndex(
                name: "IX_staff_CompanyId",
                table: "staff",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_staff_Email",
                table: "staff",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_staffgooglecalendars_StaffId",
                table: "staffgooglecalendars",
                column: "StaffId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_staffinvites_Token",
                table: "staffinvites",
                column: "Token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_staffservices_ServiceId",
                table: "staffservices",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_staffservices_StaffId_ServiceId",
                table: "staffservices",
                columns: new[] { "StaffId", "ServiceId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_timeoffs_ApprovedByAdminId",
                table: "timeoffs",
                column: "ApprovedByAdminId");

            migrationBuilder.CreateIndex(
                name: "IX_timeoffs_StaffId_StartDateTimeUtc_EndDateTimeUtc",
                table: "timeoffs",
                columns: new[] { "StaffId", "StartDateTimeUtc", "EndDateTimeUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_users_CompanyId_Email",
                table: "users",
                columns: new[] { "CompanyId", "Email" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_appointmentcalendarsyncs_appointments_AppointmentId",
                table: "appointmentcalendarsyncs",
                column: "AppointmentId",
                principalTable: "appointments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_appointmentcalendarsyncs_staff_StaffId",
                table: "appointmentcalendarsyncs",
                column: "StaffId",
                principalTable: "staff",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_appointmentreservations_customers_ReservedByCustomerId",
                table: "appointmentreservations",
                column: "ReservedByCustomerId",
                principalTable: "customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_appointmentreservations_staff_StaffId",
                table: "appointmentreservations",
                column: "StaffId",
                principalTable: "staff",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_appointments_companies_CompanyId",
                table: "appointments",
                column: "CompanyId",
                principalTable: "companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_appointments_customers_CustomerId",
                table: "appointments",
                column: "CustomerId",
                principalTable: "customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_appointments_services_ServiceId",
                table: "appointments",
                column: "ServiceId",
                principalTable: "services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_appointments_staff_StaffId",
                table: "appointments",
                column: "StaffId",
                principalTable: "staff",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_availabilities_staff_StaffId",
                table: "availabilities",
                column: "StaffId",
                principalTable: "staff",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_companies_users_UserId",
                table: "companies",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_users_companies_CompanyId",
                table: "users");

            migrationBuilder.DropTable(
                name: "appointmentcalendarsyncs");

            migrationBuilder.DropTable(
                name: "appointmentreservations");

            migrationBuilder.DropTable(
                name: "availabilities");

            migrationBuilder.DropTable(
                name: "emaillogs");

            migrationBuilder.DropTable(
                name: "externalcalendarevents");

            migrationBuilder.DropTable(
                name: "serviceprices");

            migrationBuilder.DropTable(
                name: "smslogs");

            migrationBuilder.DropTable(
                name: "staffgooglecalendars");

            migrationBuilder.DropTable(
                name: "staffinvites");

            migrationBuilder.DropTable(
                name: "staffservices");

            migrationBuilder.DropTable(
                name: "timeoffs");

            migrationBuilder.DropTable(
                name: "appointments");

            migrationBuilder.DropTable(
                name: "notificationconfigs");

            migrationBuilder.DropTable(
                name: "customers");

            migrationBuilder.DropTable(
                name: "recurrencerules");

            migrationBuilder.DropTable(
                name: "services");

            migrationBuilder.DropTable(
                name: "staff");

            migrationBuilder.DropTable(
                name: "companies");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
