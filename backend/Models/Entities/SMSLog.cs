using System;
using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class SMSLog
    {
        public int Id { get; set; }

        public int? CompanyId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FromNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string ToNumber { get; set; } = string.Empty;

        [Required]
        public string MessageBody { get; set; } = string.Empty;

        public int? AppointmentId { get; set; }
        public int? NotificationConfigId { get; set; }
        public NotificationConfig? NotificationConfig { get; set; }

        public DateTime SentAt { get; set; } = DateTime.UtcNow;
    }
}
