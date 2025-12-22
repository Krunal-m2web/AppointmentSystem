namespace Appointmentbookingsystem.Backend.DTOs.Service
{
    public class ServiceResponseDto
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        // Base price
        public decimal Price { get; set; }

        public int ServiceDuration { get; set; }

        public bool IsActive { get; set; } = true;

        // Multi-currency prices
        public List<ServicePriceDto> Prices { get; set; } = new();
    }
}
