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

        [Range(1, 480)]
        public int? ServiceDuration { get; set; }

        [Range(0, 120)]
        public int? BufferTimeMinutes { get; set; }


        [MaxLength(3)]
        public string? Currency { get; set; }

        public bool? IsActive { get; set; }
    }
}
