using System.ComponentModel.DataAnnotations;

using Appointmentbookingsystem.Backend.Attributes;

namespace Appointmentbookingsystem.Backend.DTOs.Customer
{
    public class CreateCustomerDto
    {
        [Required, MinLength(3), MaxLength(50)]
        public string FirstName { get; set; } = null!;

        [Required, MinLength(3), MaxLength(50)]
        public string LastName { get; set; } = null!;

        [EmailAddress, MaxLength(255)]
        public string? Email { get; set; }

        [PhoneNumber]
        public string? Phone { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }
    }
}
