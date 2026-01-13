using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    /// <summary>
    /// Junction table between Staff and Service.
    /// Allows staff-specific pricing and duration for services.
    /// </summary>
    public class StaffService
    {
        public int Id { get; set; }

        // FK to Staff
        [Required]
        public int StaffId { get; set; }
        public Staff Staff { get; set; } = null!;

        // FK to Service
        [Required]
        public int ServiceId { get; set; }
        public Service Service { get; set; } = null!;

        // Optional: Staff-specific price (overrides service base price)
        [Column(TypeName = "decimal(10,2)")]
        public decimal? CustomPrice { get; set; }

        // Optional: Staff-specific duration (overrides service duration)
        public int? CustomDuration { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
