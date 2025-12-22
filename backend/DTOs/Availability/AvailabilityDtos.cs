using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Availability
{
    /// <summary>
    /// DTO for setting staff availability for a specific day
    /// </summary>
    public class SetAvailabilityDto
    {
        [Required]
        public int StaffId { get; set; }

        [Required]
        public DayOfWeek DayOfWeek { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        public bool IsAvailable { get; set; } = true;
    }

    /// <summary>
    /// Response DTO for availability data
    /// </summary>
    public class AvailabilityResponseDto
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public string StaffName { get; set; } = null!;
        public DayOfWeek DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool IsAvailable { get; set; }
    }

    /// <summary>
    /// DTO for updating existing availability
    /// </summary>
    public class UpdateAvailabilityDto
    {
        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        public bool IsAvailable { get; set; } = true;
    }
}
