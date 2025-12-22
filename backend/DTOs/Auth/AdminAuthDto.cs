using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Auth
{
    public class AdminRegisterDto
    {
        [Required]
        [MinLength(2), MaxLength(50)]
        public string FirstName { get; set; } = null!;

        [Required]
        [MinLength(2), MaxLength(50)]
        public string LastName { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = null!;

        // Company info for new company creation
        [Required]
        [MaxLength(100)]
        public string CompanyName { get; set; } = null!;

        [Required]
        [Phone]
        [MaxLength(20)]
        public string CompanyPhone { get; set; } = null!;

        [MaxLength(500)]
        public string? CompanyAddress { get; set; }

        [MaxLength(3)]
        public string Currency { get; set; } = "USD";

        [Required]
        [MaxLength(100)]
        public string CompanyCountry { get; set; } = null!;

        [Required]
        [Phone]
        [MaxLength(20)]
        public string UserPhone { get; set; } = null!;

        [Required]
        [MaxLength(100)]
        public string UserCountry { get; set; } = null!;
    }

    public class AdminLoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}
