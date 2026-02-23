using System.ComponentModel.DataAnnotations;

using Appointmentbookingsystem.Backend.Attributes;

namespace Appointmentbookingsystem.Backend.DTOs.Company
{
    public class CreateCompanyDto
    {
        [Required]
        [MinLength(3), MaxLength(100)]
        public string CompanyName { get; set; } = null!;

        [PhoneNumber]
        public string? Phone { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = null!;

        [MaxLength(500)]
        public string? Address { get; set; }

        [MaxLength(3)]
        public string Currency { get; set; } = "USD";

        public string? WebsiteUrl { get; set; }
        public string? LogoBase64 { get; set; }
    }

    public class UpdateCompanyDto
    {
        [MinLength(3), MaxLength(100)]
        public string? CompanyName { get; set; }

        [PhoneNumber]
        public string? Phone { get; set; }

        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; }

        [MaxLength(500)]
        public string? Address { get; set; }

        [MaxLength(3)]
        public string? Currency { get; set; }

        public string? LogoUrl { get; set; }
        public string? WebsiteUrl { get; set; }

        public bool? IsActive { get; set; }

        // Booking Form Customization
        [MaxLength(7)]
        public string? BookingFormPrimaryColor { get; set; }

        [MaxLength(7)]
        public string? BookingFormSecondaryColor { get; set; }

        public string? BookingFormLabels { get; set; } // JSON object
    }

    public class CompanyResponseDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; } = null!;
        public string? Phone { get; set; }
        public string Email { get; set; } = null!;
        public string? Address { get; set; }
        public string Currency { get; set; } = null!;
        public string? LogoUrl { get; set; }
        public string? WebsiteUrl { get; set; }
        public string? Slug { get; set; }

        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Booking Form Customization
        public string? BookingFormPrimaryColor { get; set; }
        public string? BookingFormSecondaryColor { get; set; }
        public string? BookingFormLabels { get; set; }
    }
}
