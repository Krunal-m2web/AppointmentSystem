using System.ComponentModel.DataAnnotations;

namespace AppointmentReservationSystem.Backend.DTOs.Appointments
{
    public class CreateReservationDto
    {
        public int StaffId { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public int ServiceId { get; set; }

        
    }
}
