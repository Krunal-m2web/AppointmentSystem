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
        public DbSet<TimeOff> TimeOffs { get; set; } = null!;
        public DbSet<AppointmentReservation> AppointmentReservations { get; set; } = null!;
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Staff> Staff { get; set; } = null!;
        public DbSet<Service> Services { get; set; } = null!;
        public DbSet<ServicePrice> ServicePrices { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ==================== COMPANY ====================
            modelBuilder.Entity<Company>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.HasIndex(c => c.Email).IsUnique();
                entity.HasIndex(c => c.CompanyName).IsUnique();

                entity.HasOne(c => c.User)
                      .WithMany()
                      .HasForeignKey(c => c.UserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.Property(c => c.CreatedAt)
                      .HasDefaultValueSql("SYSUTCDATETIME()");
                entity.Property(c => c.UpdatedAt)
                      .HasDefaultValueSql("SYSUTCDATETIME()");
            });

            // ==================== USER (Admin) ====================
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => new { u.CompanyId, u.Email }).IsUnique();

                entity.HasOne(u => u.Company)
                      .WithMany(c => c.Users)
                      .HasForeignKey(u => u.CompanyId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.Property(u => u.CreatedAt)
                      .HasDefaultValueSql("SYSUTCDATETIME()");
                entity.Property(u => u.UpdatedAt)
                      .HasDefaultValueSql("SYSUTCDATETIME()");
            });

            // ==================== STAFF ====================
            modelBuilder.Entity<Staff>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.HasIndex(s => s.Email).IsUnique();

                entity.HasOne(s => s.Company)
                      .WithMany(c => c.Staff)
                      .HasForeignKey(s => s.CompanyId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.Property(s => s.CreatedAt)
                      .HasDefaultValueSql("SYSUTCDATETIME()");
                entity.Property(s => s.UpdatedAt)
                      .HasDefaultValueSql("SYSUTCDATETIME()");
            });

            // ==================== CUSTOMER ====================
            modelBuilder.Entity<Customer>(entity =>
            {
               entity.HasIndex(c => new { c.CompanyId, c.Email })
          .IsUnique()
          .HasDatabaseName("IX_Customers_CompanyId_Email")
          .HasFilter("[IsActive] = 1");
                       

                entity.HasOne(c => c.Company)
                      .WithMany(co => co.Customers)
                      .HasForeignKey(c => c.CompanyId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.Property(c => c.CreatedAt)
                      .HasDefaultValueSql("SYSUTCDATETIME()");
                entity.Property(c => c.UpdatedAt)
                      .HasDefaultValueSql("SYSUTCDATETIME()");
            });

            // ==================== SERVICE ====================
            modelBuilder.Entity<Service>(entity =>
            {
               entity.HasIndex(s => new { s.CompanyId, s.Name })
          .IsUnique()
          .HasFilter("[IsActive] = 1")
          .HasDatabaseName("IX_Services_CompanyId_Name_Active");

                entity.HasOne(s => s.Company)
                      .WithMany(c => c.Services)
                      .HasForeignKey(s => s.CompanyId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.Property(s => s.Price)
                      .HasColumnType("decimal(10,2)");

                entity.Property(s => s.CreatedAt)
                      .HasDefaultValueSql("SYSUTCDATETIME()");
                entity.Property(s => s.UpdatedAt)
                      .HasDefaultValueSql("SYSUTCDATETIME()");
            });

            // ==================== STAFF SERVICE (Junction) ====================
            modelBuilder.Entity<StaffService>(entity =>
            {
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
                entity.HasKey(r => r.Id);
            });

            // ==================== APPOINTMENT ====================
            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(a => a.Id);

                entity.Property(a => a.Price)
                      .HasColumnType("decimal(10,2)");

                entity.Property(a => a.Version)
                      .IsRowVersion();

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
                entity.HasIndex(e => new { e.StaffId, e.DayOfWeek });

                entity.HasOne(e => e.Staff)
                      .WithMany(s => s.Availabilities)
                      .HasForeignKey(e => e.StaffId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ==================== TIME OFF ====================
            modelBuilder.Entity<TimeOff>(entity =>
            {
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