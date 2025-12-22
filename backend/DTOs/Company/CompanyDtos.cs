using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Company
{
    public class CreateCompanyDto
    {
        [Required]
        [MaxLength(100)]
        public string CompanyName { get; set; } = null!;

        [Phone]
        [MaxLength(20)]
        public string? Phone { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = null!;

        [MaxLength(500)]
        public string? Address { get; set; }

        [MaxLength(3)]
        public string Currency { get; set; } = "USD";
    }

    public class UpdateCompanyDto
    {
        [MaxLength(100)]
        public string? CompanyName { get; set; }

        [Phone]
        [MaxLength(20)]
        public string? Phone { get; set; }

        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; }

        [MaxLength(500)]
        public string? Address { get; set; }

        [MaxLength(3)]
        public string? Currency { get; set; }

        public bool? IsActive { get; set; }
    }

    public class CompanyResponseDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; } = null!;
        public string? Phone { get; set; }
        public string Email { get; set; } = null!;
        public string? Address { get; set; }
        public string Currency { get; set; } = null!;
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
