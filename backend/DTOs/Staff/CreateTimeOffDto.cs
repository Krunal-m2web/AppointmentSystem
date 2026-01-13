using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Staff
{
    public class CreateTimeOffDto
    {
        [Required]
        public int StaffId { get; set; }

        [Required]
        public DateTime StartDateTimeUtc { get; set; }

        [Required]
        public DateTime EndDateTimeUtc { get; set; }

        [MaxLength(500)]
        public string? Reason { get; set; }

        // True for full day, false for specific hours
        public bool IsFullDay { get; set; } = true;
    }
}
