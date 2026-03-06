using System.ComponentModel.DataAnnotations;
using Appointmentbookingsystem.Backend.Models.Entities;

using Appointmentbookingsystem.Backend.Attributes;

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

        [MaxLength(255)]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")] // Allowed to be null/empty, but if provided must be valid
        public string? Email { get; set; }

        [PhoneNumber]
        public string? Phone { get; set; }

        // Appointment Details
        [Required]
        public int ServiceId { get; set; }

        public int? StaffId { get; set; } // Optional - auto-assign if null

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public string MeetingType { get; set; } = "Zoom";

        [Required]
        public string PaymentMethod { get; set; } = "Card";

        public string? Timezone { get; set; }
        
        public string? Status { get; set; }

        public decimal? Price { get; set; }
        
        public int? Duration { get; set; }
        
        [MaxLength(3)]
        public string? CurrencyCode { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }
    }
}
