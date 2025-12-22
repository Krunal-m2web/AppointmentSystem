using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class Service : IHasTimestamps
    {
        public int Id { get; set; }

        // FK to Company (multi-tenancy)
        [Required]
        public int CompanyId { get; set; }
        public Company Company { get; set; } = null!;

        [Required, MaxLength(100)]
        public string Name { get; set; } = null!;

        [MaxLength(500)]
        public string? Description { get; set; }

        // Base price for the service (can be overridden per staff in StaffService)
        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        // Duration in minutes
        [Required]
        [Range(15, 480, ErrorMessage = "Duration must be between 15 minutes and 8 hours")]
        public int ServiceDuration { get; set; } = 60;

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation: one service can have many prices (multi-currency)
        public ICollection<ServicePrice> Prices { get; set; } = new List<ServicePrice>();

        // 1:M : Service -> StaffServices (explicit junction)
        public ICollection<StaffService> StaffServices { get; set; } = new List<StaffService>();
    }
}
