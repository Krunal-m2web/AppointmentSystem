using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    /// <summary>
    /// User represents an Admin who manages a company.
    /// Admins can manage staff, services, and view all appointments.
    /// </summary>
    public class User : IHasTimestamps
    {
        public int Id { get; set; }

        // FK to Company
        [Required]
        public int CompanyId { get; set; }
        public Company Company { get; set; } = null!;

        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; } = null!;

        [Required, MinLength(2), MaxLength(50)]
        public string FirstName { get; set; } = null!;

        [Required, MinLength(2), MaxLength(50)]
        public string LastName { get; set; } = null!;

        [Required]
        [Phone, MaxLength(20)]
        public string Phone { get; set; } = null!;

      

        [Required]
        [MaxLength(100)]
        public string Country { get; set; } = null!;

        // Password for admin login
        [Required]
        public string PasswordHash { get; set; } = null!;

        public bool IsActive { get; set; } = true;

        // Business position/title (e.g., "Owner", "Manager")
        [MaxLength(100)]
        public string? Position { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation: TimeOffs approved by this admin
        public ICollection<TimeOff> ApprovedTimeOffs { get; set; } = new List<TimeOff>();
    }
}
