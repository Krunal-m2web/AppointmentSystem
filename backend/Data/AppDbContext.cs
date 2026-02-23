using Appointmentbookingsystem.Backend.Models;
using Appointmentbookingsystem.Backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Appointmentbookingsystem.Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // New entities for multi-tenancy
        public DbSet<Company> Companies { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<StaffService> StaffServices { get; set; } = null!;
        public DbSet<RecurrenceRule> RecurrenceRules { get; set; } = null!;

        // Existing entities
        public DbSet<Appointment> Appointments { get; set; } = null!;
        public DbSet<Availability> Availabilities { get; set; } = null!;
        public DbSet<TimeOff> TimeOffs { get; set; }
        public DbSet<NotificationConfig> NotificationConfigs { get; set; } = null!;
        public DbSet<AppointmentReservation> AppointmentReservations { get; set; } = null!;
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Staff> Staff { get; set; } = null!;
        public DbSet<Service> Services { get; set; } = null!;
        public DbSet<ServicePrice> ServicePrices { get; set; } = null!;
        public DbSet<EmailLog> EmailLogs { get; set; } = null!;
        public DbSet<SMSLog> SMSLogs { get; set; } = null!;
        public DbSet<StaffInvite> StaffInvites { get; set; } = null!;

        // Google Calendar integration entities
        public DbSet<StaffGoogleCalendar> StaffGoogleCalendars { get; set; } = null!;
        public DbSet<AppointmentCalendarSync> AppointmentCalendarSyncs { get; set; } = null!;
        public DbSet<ExternalCalendarEvent> ExternalCalendarEvents { get; set; } = null!;

        // Email OTP Verification
        public DbSet<EmailVerification> EmailVerifications { get; set; } = null!;

        // Password Reset Tokens
        public DbSet<PasswordResetToken> PasswordResetTokens { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ==================== EMAIL VERIFICATION ====================
            modelBuilder.Entity<EmailVerification>(entity =>
            {
                entity.ToTable("emailverifications");
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP(6)");
            });

            // ==================== COMPANY ====================
            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("companies");
                entity.HasKey(c => c.Id);
                entity.HasIndex(c => c.Email).IsUnique();
                entity.HasIndex(c => c.CompanyName).IsUnique();
                entity.HasIndex(c => c.Slug).IsUnique().HasFilter("\"Slug\" IS NOT NULL");

                entity.HasOne(c => c.User)
                      .WithMany()
                      .HasForeignKey(c => c.UserId)
                      .OnDelete(DeleteBehavior.Restrict);

            });

            // ==================== USER (Admin) ====================
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => new { u.CompanyId, u.Email }).IsUnique();

                entity.HasOne(u => u.Company)
                      .WithMany(c => c.Users)
                      .HasForeignKey(u => u.CompanyId)
                      .OnDelete(DeleteBehavior.Cascade);

            });

            // ==================== STAFF ====================
            modelBuilder.Entity<Staff>(entity =>
            {
                entity.ToTable("staff");
                entity.HasKey(s => s.Id);
                entity.HasIndex(s => s.Email).IsUnique();

                entity.HasOne(s => s.Company)
                      .WithMany(c => c.Staff)
                      .HasForeignKey(s => s.CompanyId)
                      .OnDelete(DeleteBehavior.Cascade);

            });

            // ==================== CUSTOMER ====================
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("customers");
                entity.HasIndex(c => new { c.CompanyId, c.Email })
                      .IsUnique()
                      .HasDatabaseName("IX_Customers_CompanyId_Email")
                      .HasFilter("\"IsActive\" = true AND \"Email\" IS NOT NULL");

                entity.HasIndex(c => new { c.CompanyId, c.Phone })
                      .HasDatabaseName("IX_Customers_CompanyId_Phone")
                      .HasFilter("\"IsActive\" = true AND \"Phone\" IS NOT NULL");
                       

                entity.HasOne(c => c.Company)
                      .WithMany(co => co.Customers)
                      .HasForeignKey(c => c.CompanyId)
                      .OnDelete(DeleteBehavior.Cascade);

            });

            // ==================== SERVICE ====================
            modelBuilder.Entity<Service>(entity =>
            {
               entity.ToTable("services");
               entity.HasIndex(s => new { s.CompanyId, s.Name })
          .IsUnique()
          .HasFilter("\"IsActive\" = true")
          .HasDatabaseName("IX_Services_CompanyId_Name_Active");

                entity.HasOne(s => s.Company)
                      .WithMany(c => c.Services)
                      .HasForeignKey(s => s.CompanyId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.Property(s => s.Price)
                      .HasColumnType("decimal(10,2)");

            });

            // ==================== STAFF SERVICE (Junction) ====================
            modelBuilder.Entity<StaffService>(entity =>
            {
                entity.ToTable("staffservices");
                entity.HasKey(ss => ss.Id);
                entity.HasIndex(ss => new { ss.StaffId, ss.ServiceId }).IsUnique();

                entity.HasOne(ss => ss.Staff)
                      .WithMany(s => s.StaffServices)
                      .HasForeignKey(ss => ss.StaffId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(ss => ss.Service)
                      .WithMany(s => s.StaffServices)
                      .HasForeignKey(ss => ss.ServiceId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.Property(ss => ss.CustomPrice)
                      .HasColumnType("decimal(10,2)");
            });

            // ==================== SERVICE PRICE ====================
            modelBuilder.Entity<ServicePrice>(entity =>
            {
                entity.ToTable("serviceprices");
                entity.HasKey(sp => sp.Id);

                entity.Property(sp => sp.Currency)
                      .HasMaxLength(3)
                      .IsRequired();

                entity.Property(sp => sp.Amount)
                      .HasColumnType("decimal(10,2)");

                entity.HasIndex(sp => new { sp.ServiceId, sp.Currency })
                      .IsUnique()
                      .HasDatabaseName("UX_ServicePrices_ServiceId_Currency");

                entity.HasOne(sp => sp.Service)
                      .WithMany(s => s.Prices)
                      .HasForeignKey(sp => sp.ServiceId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ==================== RECURRENCE RULE ====================
            modelBuilder.Entity<RecurrenceRule>(entity =>
            {
                entity.ToTable("recurrencerules");
                entity.HasKey(r => r.Id);
            });

            // ==================== APPOINTMENT ====================
            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.ToTable("appointments");
                entity.HasKey(a => a.Id);

                entity.Property(a => a.Price)
                      .HasColumnType("decimal(10,2)");

                entity.Property(a => a.Version)
                      .IsConcurrencyToken()
                      .ValueGeneratedOnAddOrUpdate();

                entity.HasOne(a => a.Company)
                      .WithMany(c => c.Appointments)
                      .HasForeignKey(a => a.CompanyId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(a => a.Customer)
                      .WithMany(c => c.Appointments)
                      .HasForeignKey(a => a.CustomerId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(a => a.Service)
                      .WithMany()
                      .HasForeignKey(a => a.ServiceId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(a => a.Staff)
                      .WithMany(s => s.Appointments)
                      .HasForeignKey(a => a.StaffId)
                      .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(a => a.ParentAppointment)
                      .WithMany()
                      .HasForeignKey(a => a.ParentAppointmentId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(a => a.RecurrenceRule)
                      .WithMany(r => r.Appointments)
                      .HasForeignKey(a => a.RecurrenceRuleId)
                      .OnDelete(DeleteBehavior.SetNull);

                entity.HasIndex(a => new { a.CompanyId, a.StartDateTimeUtc });
            });

            // ==================== AVAILABILITY ====================
            modelBuilder.Entity<Availability>(entity =>
            {
                entity.ToTable("availabilities");
                entity.HasIndex(e => new { e.StaffId, e.DayOfWeek });

                entity.HasOne(e => e.Staff)
                      .WithMany(s => s.Availabilities)
                      .HasForeignKey(e => e.StaffId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ==================== TIME OFF ====================
            modelBuilder.Entity<TimeOff>(entity =>
            {
                entity.ToTable("timeoffs");
                entity.HasIndex(e => new { e.StaffId, e.StartDateTimeUtc, e.EndDateTimeUtc });

                entity.HasOne(e => e.Staff)
                      .WithMany(s => s.TimeOffs)
                      .HasForeignKey(e => e.StaffId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.ApprovedByAdmin)
                      .WithMany(u => u.ApprovedTimeOffs)
                      .HasForeignKey(e => e.ApprovedByAdminId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // ==================== APPOINTMENT RESERVATION ====================
            modelBuilder.Entity<AppointmentReservation>(entity =>
            {
                entity.ToTable("appointmentreservations");
                entity.HasIndex(e => new { e.StaffId, e.StartDateTime, e.EndDateTime });
                entity.HasIndex(e => e.ExpiresAt);

                entity.HasOne(e => e.Staff)
                      .WithMany()
                      .HasForeignKey(e => e.StaffId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.ReservedByCustomer)
                      .WithMany()
                      .HasForeignKey(e => e.ReservedByCustomerId)
                      .OnDelete(DeleteBehavior.SetNull);
            });

            // ==================== STAFF INVITE ====================
            modelBuilder.Entity<StaffInvite>(entity =>
            {
                 entity.ToTable("staffinvites");
                 entity.HasIndex(si => si.Token).IsUnique();
            });

            // ==================== STAFF GOOGLE CALENDAR ====================
            modelBuilder.Entity<StaffGoogleCalendar>(entity =>
            {
                entity.ToTable("staffgooglecalendars");
                entity.HasKey(e => e.Id);
                
                // Each staff can only have one Google Calendar connection
                entity.HasIndex(e => e.StaffId).IsUnique();
                
                entity.HasOne(e => e.Staff)
                      .WithOne()
                      .HasForeignKey<StaffGoogleCalendar>(e => e.StaffId)
                      .OnDelete(DeleteBehavior.Cascade);

            });

            // ==================== APPOINTMENT CALENDAR SYNC ====================
            modelBuilder.Entity<AppointmentCalendarSync>(entity =>
            {
                entity.ToTable("appointmentcalendarsyncs");
                entity.HasKey(e => e.Id);
                
                // Unique constraint: one sync record per appointment per staff
                entity.HasIndex(e => new { e.StaffId, e.GoogleEventId }).IsUnique();
                
                // Index for quick lookup by appointment
                entity.HasIndex(e => e.AppointmentId);
                
                entity.HasOne(e => e.Appointment)
                      .WithMany()
                      .HasForeignKey(e => e.AppointmentId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Staff)
                      .WithMany()
                      .HasForeignKey(e => e.StaffId)
                      .OnDelete(DeleteBehavior.Restrict);

            });

            // ==================== EXTERNAL CALENDAR EVENT ====================
            modelBuilder.Entity<ExternalCalendarEvent>(entity =>
            {
                entity.ToTable("externalcalendarevents");
                entity.HasKey(e => e.Id);
                
                // Unique constraint: one record per Google event per staff
                entity.HasIndex(e => new { e.StaffId, e.GoogleEventId }).IsUnique();
                
                // Index for availability queries
                entity.HasIndex(e => new { e.StaffId, e.StartDateTimeUtc, e.EndDateTimeUtc });

                entity.HasOne(e => e.Staff)
                      .WithMany()
                      .HasForeignKey(e => e.StaffId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Company)
                      .WithMany()
                      .HasForeignKey(e => e.CompanyId)
                      .OnDelete(DeleteBehavior.Restrict);

            });

            // ==================== EMAIL LOG ====================
            modelBuilder.Entity<EmailLog>(entity =>
            {
                entity.ToTable("emaillogs");
                entity.HasKey(e => e.Id);

                // Allow config to be deleted even if logs exist (SetNull)
                // This ensures we don't block the user from removing a notification type
                // just because it was sent in the past.
                entity.HasOne(e => e.NotificationConfig)
                      .WithMany()
                      .HasForeignKey(e => e.NotificationConfigId)
                      .OnDelete(DeleteBehavior.SetNull);
            });
            
             // ==================== SMS LOG ====================
            modelBuilder.Entity<SMSLog>(entity =>
            {
                entity.ToTable("smslogs");
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.NotificationConfig)
                      .WithMany()
                      .HasForeignKey(e => e.NotificationConfigId)
                      .OnDelete(DeleteBehavior.ClientSetNull);
            });

            // ==================== NOTIFICATION CONFIG ====================
            modelBuilder.Entity<NotificationConfig>(entity =>
            {
                entity.ToTable("notificationconfigs");
                entity.HasKey(e => e.Id);
            });

            // ==================== PASSWORD RESET TOKEN ====================
            modelBuilder.Entity<PasswordResetToken>(entity =>
            {
                entity.ToTable("passwordresettokens");
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Token).IsUnique();
                entity.HasIndex(e => e.Email);
            });
        }

        // ==================== TIMESTAMP AUTO UPDATE ====================

        public override int SaveChanges()
        {
            ApplyTimestamps();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(
            bool acceptAllChangesOnSuccess,
            CancellationToken cancellationToken = default)
        {
            ApplyTimestamps();
            return await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void ApplyTimestamps()
        {
            var utcNow = DateTime.UtcNow;

            foreach (var entry in ChangeTracker.Entries()
                .Where(e => e.Entity is IHasTimestamps &&
                       (e.State == EntityState.Added || e.State == EntityState.Modified)))
            {
                var entity = (IHasTimestamps)entry.Entity;

                if (entry.State == EntityState.Added)
                    entity.CreatedAt = utcNow;

                entity.UpdatedAt = utcNow;
            }
        }
    }
}