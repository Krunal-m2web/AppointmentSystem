namespace Appointmentbookingsystem.Backend.DTOs.Service
{
    public class CustomerServiceDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string ? Description { get; set; }   
        public string Currency { get; set; } = null!;
        public decimal? Price { get; set; }
        public int ServiceDuration { get; set; }
    }
}
