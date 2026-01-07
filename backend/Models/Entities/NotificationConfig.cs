using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class NotificationConfig : IHasTimestamps
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }
        public Company Company { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = null!; // appointmentConfirmation, appointmentReminder, etc.

        public bool IsEnabled { get; set; } = true;

        public string Subject { get; set; } = "";
        public string Body { get; set; } = "";

        // Timing Configuration
        public int TimingValue { get; set; }
        public string TimingUnit { get; set; } = "hours"; // minutes, hours, days
        public string TimingContext { get; set; } = "immediately"; // immediately, before_appointment, after_appointment

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
