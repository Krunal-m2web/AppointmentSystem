using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    /// <summary>
    /// Customer entity - customers do NOT need to authenticate to book appointments.
    /// They provide their details during booking.
    /// </summary>
    public class Customer : IHasTimestamps
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

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // 1:M : Customer -> Appointments
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}
