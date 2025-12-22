using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Availability
{
     /// <summary>
    /// Response DTO for available time slots
    /// </summary>
    
    public class TimeSlotDto
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAvailable { get; set; }
    }

    /// <summary>
    /// Query parameters for fetching available slots
    /// </summary>
    
    public class GetAvailableSlotsQuery
    {
        [Required]
        public int StaffId { get; set; }

        [Required]
        public int ServiceId { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
