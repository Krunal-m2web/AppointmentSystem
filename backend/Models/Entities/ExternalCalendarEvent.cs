using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    /// <summary>
    /// Stores external Google Calendar events that block availability.
    /// These are read-only in SaaS - staff cannot edit them, only view them.
    /// </summary>
    public class ExternalCalendarEvent : IHasTimestamps
    {
        public int Id { get; set; }

        // FK to Staff - which staff member's availability this blocks
        [Required]
        public int StaffId { get; set; }
        public Staff Staff { get; set; } = null!;

        // FK to Company for multi-tenancy
        [Required]
        public int CompanyId { get; set; }
        public Company Company { get; set; } = null!;

        // Google Calendar Event ID
        [Required]
        [MaxLength(500)]
        public string GoogleEventId { get; set; } = null!;

        // Event title (generic "Busy" if hidden by privacy settings)
        [MaxLength(500)]
        public string Title { get; set; } = "Busy";

        // Event timing (stored in UTC)
        [Required]
        public DateTime StartDateTimeUtc { get; set; }

        [Required]
        public DateTime EndDateTimeUtc { get; set; }

        // All-day event flag
        public bool IsAllDay { get; set; }

        // Timestamps
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
