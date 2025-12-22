using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.User
{
    /// <summary>
    /// DTO for creating a new admin user
    /// </summary>
    public class CreateUserDto
    {
        [Required]
        public int CompanyId { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = null!;

        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string FirstName { get; set; } = null!;

        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string LastName { get; set; } = null!;

        [Phone]
        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(500)]
        public string? Address { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = null!;

        [MaxLength(100)]
        public string? Position { get; set; }
    }

    public class UpdateUserDto
    {
        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; }

        [MinLength(2)]
        [MaxLength(50)]
        public string? FirstName { get; set; }

        [MinLength(2)]
        [MaxLength(50)]
        public string? LastName { get; set; }

        [Phone]
        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(500)]
        public string? Address { get; set; }

        [MinLength(6)]
        public string? Password { get; set; }

        [MaxLength(100)]
        public string? Position { get; set; }

        public bool? IsActive { get; set; }
    }

    public class UserResponseDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Position { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
