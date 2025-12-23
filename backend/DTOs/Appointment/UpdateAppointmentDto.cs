using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Appointment
{
    public class UpdateAppointmentDto
    {
        // We usually don't change CompanyId, but we might check it matches
        
        // Allow updating customer info?
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }

        public int? ServiceId { get; set; }

        public int? StaffId { get; set; } // Nullable to unassign or keep same? Usually we send the ID.

        public DateTime? StartTime { get; set; }

        public string? MeetingType { get; set; }

        public string? PaymentMethod { get; set; }

        public string? Status { get; set; } // Allow status update too

        [MaxLength(1000)]
        public string? Notes { get; set; }
    }
}
