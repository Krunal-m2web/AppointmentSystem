using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class Company : IHasTimestamps
    {
        public int Id { get; set; }

        public int? UserId { get; set; }
        public User? User { get; set; }

        [Required, MaxLength(100)]
        public string CompanyName { get; set; } = null!;

        [Required]
        [Phone, MaxLength(20)]
        public string Phone { get; set; } = null!;

        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; } = null!;

        [MaxLength(500)]
        public string? Address { get; set; }

        [Required]
        [MaxLength(100)]
        public string Country { get; set; } = null!;

        // Default currency for the company (ISO 4217 code)
        [Required, MaxLength(3)]
        public string Currency { get; set; } = "USD";

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation properties
        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<Staff> Staff { get; set; } = new List<Staff>();
        public ICollection<Customer> Customers { get; set; } = new List<Customer>();
        public ICollection<Service> Services { get; set; } = new List<Service>();
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}
