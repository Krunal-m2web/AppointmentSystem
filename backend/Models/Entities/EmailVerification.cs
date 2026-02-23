using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class EmailVerification
    {
        public int Id { get; set; }

        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; } = null!;

        [Required, MaxLength(6)]
        public string OtpCode { get; set; } = null!;

        public DateTime ExpiresAt { get; set; }

        public bool IsUsed { get; set; } = false;

        public DateTime CreatedAt { get; set; }
    }
}
