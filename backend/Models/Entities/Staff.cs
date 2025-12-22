using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class Staff : IHasTimestamps
    {
        public int Id { get; set; }

        // FK to Company (multi-tenancy)
        [Required]
        public int CompanyId { get; set; }
        public Company Company { get; set; } = null!;

        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; } = null!;

        [Required, MinLength(2), MaxLength(50)]
        public string FirstName { get; set; } = null!;

        [Required, MinLength(2), MaxLength(50)]
        public string LastName { get; set; } = null!;

        [Phone]
        [MinLength(10), MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(255)]
        public string? Address { get; set; }

        [Required]
        public string PasswordHash { get; set; } = null!;

        public bool IsActive { get; set; } = true;

        // Optional notes about the staff member
        [MaxLength(1000)]
        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // 1:M : Staff -> StaffServices (explicit junction)
        public ICollection<StaffService> StaffServices { get; set; } = new List<StaffService>();

        // 1:M : Staff -> Appointments
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

        // 1:M : Staff -> Availabilities
        public ICollection<Availability> Availabilities { get; set; } = new List<Availability>();

        // 1:M : Staff -> TimeOffs
        public ICollection<TimeOff> TimeOffs { get; set; } = new List<TimeOff>();
    }
}
