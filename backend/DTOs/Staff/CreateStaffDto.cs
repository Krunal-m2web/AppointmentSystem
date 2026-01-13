using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Staff
{
    public class CreateStaffDto
    {
        // Company (for multi-tenancy)
        [Required]
        public int CompanyId { get; set; }

        // Personal Info
        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string FirstName { get; set; } = null!;

        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string LastName { get; set; } = null!;

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = null!;

        [Phone]
        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(255)]
        public string? Address { get; set; }

        // Password
        [Required]
        [MinLength(6, ErrorMessage = "Your password must be at least 6 characters long")]
        [MaxLength(100)]
        public string Password { get; set; } = null!;

        // Optional notes
        [MaxLength(1000)]
        public string? Notes { get; set; }

        // Services they can provide (assigned via StaffService junction)
        public List<int>? ServiceIds { get; set; }
    }
}