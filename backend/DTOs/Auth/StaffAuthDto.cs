using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Auth
{
    public class StaffRegisterDto
    {
        public string? InviteToken { get; set; }

        /// <summary>
        /// CompanyId is required - inferred from Token if present
        /// </summary>
        public int? CompanyId { get; set; }

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
    }

    public class StaffLoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}