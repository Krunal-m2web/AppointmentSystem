using System.ComponentModel.DataAnnotations;
using Appointmentbookingsystem.Backend.Models.Entities;

namespace Appointmentbookingsystem.Backend.DTOs.Appointment
{
    public class CreateAppointmentDto
    {
        [Required]
        public int CompanyId { get; set; }

        // Customer Info (for guest booking)
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = null!;

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = null!;

        [Required]
        [Phone]
        [MaxLength(20)]
        public string Phone { get; set; } = null!;

        // Appointment Details
        [Required]
        public int ServiceId { get; set; }

        public int? StaffId { get; set; } // Optional - auto-assign if null

        [Required]
        public DateTime StartTime { get; set; }

        public MeetingType MeetingType { get; set; }

        [Required]
        public PaymentMethod PaymentMethod { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }
    }
}
