using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class PasswordResetToken
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Email { get; set; } = null!;

        [Required]
        public string Token { get; set; } = null!;

        [Required]
        public DateTime ExpiresAt { get; set; }

        public bool IsUsed { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public string UserRole { get; set; } = null!; // "Staff" or "Admin"
    }
}
