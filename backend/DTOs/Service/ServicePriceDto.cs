// ServicePriceDto.cs - Simple price entry for multi-currency
using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Service
{
    // Used for listing prices in service responses
    public class ServicePriceDto
    {
        public string Currency { get; set; } = null!;
        public decimal Amount { get; set; }
    }

    // Used for detailed pricing view in admin
    public class ServicePricingDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string Currency { get; set; } = null!;
        public decimal? Amount { get; set; }
        public bool PriceMissing { get; set; }
        public int ServiceDuration { get; set; }
    }

    // Used for upserting prices
    public class UpsertPriceDto
    {
        [Required, MaxLength(3)]
        public string Currency { get; set; } = null!;
        
        [Range(0.01, 999999999)]
        public decimal Amount { get; set; }
    }
}