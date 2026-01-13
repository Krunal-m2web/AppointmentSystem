using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class TimeOff : IHasTimestamps
    {
        public int Id { get; set; }

        // FK to Staff
        [Required]
        public int StaffId { get; set; }
        public Staff Staff { get; set; } = null!;

        // Combined date/time stored in UTC
        [Required]
        public DateTime StartDateTimeUtc { get; set; }

        [Required]
        public DateTime EndDateTimeUtc { get; set; }

        [MaxLength(500)]
        public string? Reason { get; set; }

        // Type of time off
        public bool IsFullDay { get; set; } = true;

        // Approval workflow
        public int? ApprovedByAdminId { get; set; }
        public User? ApprovedByAdmin { get; set; }

        [Required]
        public TimeOffStatus Status { get; set; } = TimeOffStatus.Pending;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Badge/Notification flags
        public bool IsViewedByStaff { get; set; }
        public bool IsViewedByAdmin { get; set; }
    }

    public enum TimeOffStatus
    {
        Pending,
        Approved,
        Rejected
    }
}
