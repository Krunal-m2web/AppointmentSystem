using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Appointment
{
    public class RescheduleAppointmentByTokenDto
    {
        [Required]
        public Guid Token { get; set; }

        [Required]
        public DateTime NewStartTime { get; set; }
    }
}
