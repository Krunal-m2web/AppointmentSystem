using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Staff
{
    public class UpdateStaffDto
    {
        [MinLength(2)]
        [MaxLength(50)]
        public string? FirstName { get; set; }

        [MinLength(2)]
        [MaxLength(50)]
        public string? LastName { get; set; }

        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; }

        [Phone]
        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(255)]
        public string? Address { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }

        public bool? IsActive { get; set; }

        // Update services (will replace existing assignments)
        public List<int>? ServiceIds { get; set; }

        [MinLength(6, ErrorMessage = "Your password must be at least 6 characters long")]
        public string? Password { get; set; }
    }
}
