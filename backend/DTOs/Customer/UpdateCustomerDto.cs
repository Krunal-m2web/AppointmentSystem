using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Customer
{
    public class UpdateCustomerDto
    {
        [Required, MinLength(3), MaxLength(50)]
        public string FirstName { get; set; } = null!;

        [Required, MinLength(3), MaxLength(50)]
        public string LastName { get; set; } = null!;

        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; } = null!;

        [Phone]
        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
