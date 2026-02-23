using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    /// <summary>
    /// Maps SaaS appointments to Google Calendar events for sync loop prevention.
    /// Tracks which events were created by SaaS vs imported from Google.
    /// </summary>
    public class AppointmentCalendarSync : IHasTimestamps
    {
        public int Id { get; set; }

        // FK to Appointment - nullable for external Google events that don't have a SaaS appointment
        public int? AppointmentId { get; set; }
        public Appointment? Appointment { get; set; }

        // FK to Staff - which staff member's calendar this sync belongs to
        [Required]
        public int StaffId { get; set; }
        public Staff Staff { get; set; } = null!;

        // Google Calendar Event ID for this sync
        [Required]
        [MaxLength(500)]
        public string GoogleEventId { get; set; } = null!;

        // Source of the event: "saas" = created in SaaS and pushed to Google
        //                      "google" = created in Google and imported to SaaS
        [Required]
        [MaxLength(10)]
        public string Source { get; set; } = null!;

        // Google ETag for change detection and optimistic concurrency
        [MaxLength(255)]
        public string? GoogleEtag { get; set; }

        // Timestamps
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
