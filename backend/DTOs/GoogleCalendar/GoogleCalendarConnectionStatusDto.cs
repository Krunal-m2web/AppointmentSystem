namespace Appointmentbookingsystem.Backend.DTOs.GoogleCalendar
{
    public class GoogleCalendarConnectionStatusDto
    {
        public bool IsConnected { get; set; }
        public string? GoogleEmail { get; set; }
        public DateTime? TokenExpiresAtUtc { get; set; }
        public DateTime? LastSyncedAt { get; set; }
    }
}
