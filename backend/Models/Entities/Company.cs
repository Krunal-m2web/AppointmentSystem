using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class Company : IHasTimestamps
    {
        public int Id { get; set; }

        public int? UserId { get; set; }
        public User? User { get; set; }

        [Required, MaxLength(100)]
        public string CompanyName { get; set; } = null!;

        [MaxLength(100)]
        public string? Slug { get; set; }

        [Phone, MaxLength(20)]
        public string? Phone { get; set; }

        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; } = null!;

        [MaxLength(500)]
        public string? Address { get; set; }

        [Required]
        [MaxLength(100)]
        public string Country { get; set; } = null!;

        // Default currency for the company (ISO 4217 code)
        [Required, MaxLength(3)]
        public string Currency { get; set; } = "USD";

        [Required, MaxLength(50)]
        public string Timezone { get; set; } = "UTC";

        public string? WebsiteUrl { get; set; }

        // Branding
        public string? LogoUrl { get; set; }

        public bool IsActive { get; set; } = true;

        // Email Settings
        [MaxLength(100)]
        public string? DefaultSenderName { get; set; }

        [EmailAddress]
        [MaxLength(255)]
        public string? DefaultSenderEmail { get; set; }

        [MaxLength(255)]
        public string? DefaultReplyToEmail { get; set; }

        public bool IsEmailServiceEnabled { get; set; } = true;

        public bool IsSmsServiceEnabled { get; set; } = true;

        // Payment Settings
        public string? EnabledPaymentMethods { get; set; } // JSON array of enabled payment methods
        public bool ShowPayNow { get; set; } = true;
        public bool ShowPayLater { get; set; } = true;

        // Meeting Location Settings
        public string? EnabledMeetingLocations { get; set; } // JSON array of enabled meeting locations

        // Time Off Settings
        public bool RequireTimeOffApproval { get; set; } = true; // When true, staff time off needs admin approval

        // Rescheduling & Cancellation Settings
        public bool AllowCustomerRescheduling { get; set; } = true;
        public int ReschedulingMinLeadTime { get; set; } = 24; // Minimum hours before appointment to allow rescheduling
        
        public bool AllowCustomerCanceling { get; set; } = true;
        public int CancelingMinLeadTime { get; set; } = 24; // Minimum hours before appointment to allow cancellation

        // Booking Form Customization
        [MaxLength(7)]
        public string? BookingFormPrimaryColor { get; set; } // Hex color e.g. #6366f1

        [MaxLength(7)]
        public string? BookingFormSecondaryColor { get; set; } // Hex color e.g. #10b981

        public string? BookingFormLabels { get; set; } // JSON object with custom labels

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation properties
        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<Staff> Staff { get; set; } = new List<Staff>();
        public ICollection<Customer> Customers { get; set; } = new List<Customer>();
        public ICollection<Service> Services { get; set; } = new List<Service>();
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public ICollection<Holiday> Holidays { get; set; } = new List<Holiday>();
    }
}
