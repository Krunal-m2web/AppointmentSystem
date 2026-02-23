using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Appointment
{
    public class CancelAppointmentByTokenDto
    {
        [Required]
        public Guid Token { get; set; }

        [MaxLength(500)]
        public string? Reason { get; set; }
    }
}
