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

        [Range(15, 480)]
        public int ServiceDuration { get; set; } = 60;

        // Optional: Multi-currency prices
        public List<ServicePriceDto>? Prices { get; set; }
    }
}
