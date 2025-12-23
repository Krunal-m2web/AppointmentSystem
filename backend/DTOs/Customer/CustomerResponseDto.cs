namespace Appointmentbookingsystem.Backend.DTOs.Customer
{
    public class CustomerResponseDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Name { get; set; } = null!;  // Combined FirstName + LastName
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Phone { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; }
        public DateTime? LastAppointment { get; set; }
        public int TotalAppointments { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
