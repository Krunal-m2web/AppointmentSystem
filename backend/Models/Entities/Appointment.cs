using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class Appointment : IHasTimestamps
    {
        public int Id { get; set; }

        // FK to Company (multi-tenancy)
        [Required]
        public int CompanyId { get; set; }
        public Company Company { get; set; } = null!;

        // Foreign Keys
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int ServiceId { get; set; }
        public int? StaffId { get; set; } // Staff can be assigned later

        // Navigation Properties
        public Customer Customer { get; set; } = null!;
        public Service Service { get; set; } = null!;
        public Staff? Staff { get; set; }
        public Appointment? ParentAppointment { get; set; }
        public RecurrenceRule? RecurrenceRule { get; set; }

        // Appointment Date/Time (stored in UTC)
        [Required]
        public DateTime StartDateTimeUtc { get; set; }

        [Required]
        public DateTime EndDateTimeUtc { get; set; }

        // Meeting Details
        [Required]
        public MeetingType MeetingType { get; set; }

        [Required]
        public AppointmentStatus Status { get; set; } = AppointmentStatus.Pending;

        // Recurrence (for repeating appointments)
        public int? RecurrenceRuleId { get; set; }
        public int? ParentAppointmentId { get; set; }

        // Payment Details
        [Required]
        [MaxLength(3)]
        public string CurrencyCode { get; set; } = "USD";

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        [Required]
        public PaymentMethod PaymentMethod { get; set; }

        [Required]
        public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Unpaid;

        // Optimistic Locking (prevents double-booking conflicts)
        [Timestamp]
        public byte[]? Version { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }

        public bool ReminderSent { get; set; }
        public bool FollowupSent { get; set; }

        // Timestamps
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public enum MeetingType
    {
        InPerson,
        Zoom,
        Phone
    }

    public enum AppointmentStatus
    {
        Pending,
        Confirmed,
        Cancelled,
        Completed
    }

    public enum PaymentStatus
    {
        Unpaid,
        Paid,
        Refunded
    }

    public enum PaymentMethod
    {
        Card,
        Cash,
        PayPal
    }
}
