using System.ComponentModel.DataAnnotations;


namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class AppointmentReservation : IHasTimestamps
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public Staff Staff { get; set; } = null!;
       
        // Stored in UTC
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }

        public int? ReservedByCustomerId { get; set; }
        public Customer? ReservedByCustomer { get; set; }

        // browser session id (for anonymous holds)
        public string? ReservedBySessionId { get; set; }

        // When the hold automatically becomes invalid
        public DateTime ExpiresAt { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
