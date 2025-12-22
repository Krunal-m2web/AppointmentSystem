namespace Appointmentbookingsystem.Backend.DTOs.Admin
{
    public class AdminServicePriceDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        
        public decimal? Amount { get; set; }
        public string Currency { get; set; } = null!;
        public bool PriceMissing {get; set; }
    }
}