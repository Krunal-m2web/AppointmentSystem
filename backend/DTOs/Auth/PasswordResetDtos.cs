using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Auth
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
    }

    public class ResetPasswordDto
    {
        [Required]
        public string Token { get; set; } = null!;

        [Required]
        [MinLength(6)]
        public string NewPassword { get; set; } = null!;
    }
}
