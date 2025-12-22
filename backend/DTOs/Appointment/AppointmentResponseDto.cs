using Appointmentbookingsystem.Backend.Models.Entities;

namespace Appointmentbookingsystem.Backend.DTOs.Appointment
{
    public class AppointmentResponseDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }

        // Customer Info
        public int CustomerId { get; set; }
        public string CustomerName { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;
        public string CustomerPhone { get; set; } = null!;

        // Service Info
        public int ServiceId { get; set; }
        public string ServiceName { get; set; } = null!;

        // Staff Info
        public int? StaffId { get; set; }
        public string? StaffName { get; set; }

        // Appointment Details (renamed to match entity)
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public MeetingType MeetingType { get; set; }
        public AppointmentStatus Status { get; set; }

        // Payment Details
        public string CurrencyCode { get; set; } = null!;
        public decimal Price { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public PaymentStatus PaymentStatus { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
