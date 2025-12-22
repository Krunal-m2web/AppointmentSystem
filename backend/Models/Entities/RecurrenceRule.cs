using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    /// <summary>
    /// Stores recurrence rules for repeating appointments.
    /// Uses iCalendar RRULE format (RFC 5545).
    /// </summary>
    public class RecurrenceRule
    {
        public int Id { get; set; }

        // iCalendar RRULE string (e.g., "FREQ=WEEKLY;BYDAY=MO,WE,FR")
        [Required, MaxLength(500)]
        public string RRuleString { get; set; } = null!;

        // When the recurrence pattern starts
        [Required]
        public DateTime StartDateUtc { get; set; }

        // When the recurrence pattern ends (null = no end)
        public DateTime? EndDateUtc { get; set; }

        // IANA timezone for interpreting the recurrence
        [MaxLength(64)]
        public string? Timezone { get; set; }

        // Navigation: Appointments following this rule
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}
