using System;
using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class EmailLog
    {
        public int Id { get; set; }

        public int? CompanyId { get; set; }

        [Required]
        [MaxLength(255)]
        public string FromEmail { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string ToEmail { get; set; } = string.Empty;

        [Required]
        public string Subject { get; set; } = string.Empty;



        public int? AppointmentId { get; set; }
        public int? NotificationConfigId { get; set; }
        public NotificationConfig? NotificationConfig { get; set; }

        public DateTime SentAt { get; set; } = DateTime.UtcNow;
    }
}
