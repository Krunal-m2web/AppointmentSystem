using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Service
{
    public class CreateServiceDto
    {
        [Required]
        public int CompanyId { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = null!;

        [MaxLength(500)]
        public string? Description { get; set; }

        // Base price for the service
        [Required]
        [Range(0, 100000)]
        public decimal Price { get; set; }

        [Range(1, 480)]
        public int ServiceDuration { get; set; } = 60;

        [Range(0, 120)]
        public int BufferTimeMinutes { get; set; } = 0;


        [MaxLength(3)]
        public string? Currency { get; set; }

        // Optional: Multi-currency prices
        public List<ServicePriceDto>? Prices { get; set; }
    }
}
