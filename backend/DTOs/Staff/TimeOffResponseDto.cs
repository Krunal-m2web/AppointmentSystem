using Appointmentbookingsystem.Backend.Models.Entities;

namespace Appointmentbookingsystem.Backend.DTOs.Staff
{
    public class TimeOffResponseDto
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public string? StaffName { get; set; }
        public DateTime StartDateTimeUtc { get; set; }
        public DateTime EndDateTimeUtc { get; set; }
        public string? Reason { get; set; }
        public string Status { get; set; } = "Pending";
        public int? ApprovedByAdminId { get; set; }
        public string? ApprovedByAdminName { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsFullDay { get; set; } = true;
    }
}
