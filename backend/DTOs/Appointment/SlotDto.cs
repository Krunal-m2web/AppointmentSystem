using System.ComponentModel.DataAnnotations;

namespace AppointmentReservationSystem.Backend.DTOs.Appointments
{
    public class SlotDto
    {
        public DateTime StartUtc { get; set; }
        public DateTime EndUtc { get; set; }
    }
}
