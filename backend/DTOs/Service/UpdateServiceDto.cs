using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Service
{
    public class UpdateServiceDto
    {
        [MaxLength(100)]
        public string? Name { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        [Range(0, 100000)]
        public decimal? Price { get; set; }

        [Range(15, 480)]
        public int? ServiceDuration { get; set; }

        public bool? IsActive { get; set; }
    }
}
