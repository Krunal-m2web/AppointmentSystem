using Appointmentbookingsystem.Backend.Models.Entities;

namespace Appointmentbookingsystem.Backend.DTOs.Appointment
{
    public class SimpleAppointmentDto
    {
        public int Id { get; set; }
        public string ServiceName { get; set; } = null!;
        public DateTime StartDateTime { get; set; }
        public AppointmentStatus Status { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public decimal Price { get; set; }
        public string CurrencyCode { get; set; } = null!;
    }
}
