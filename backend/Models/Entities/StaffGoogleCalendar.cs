using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    /// <summary>
    /// Stores Google Calendar OAuth tokens and sync state for each staff member.
    /// Each staff can connect their own Google Calendar account.
    /// </summary>
    public class StaffGoogleCalendar : IHasTimestamps
    {
        public int Id { get; set; }

        // FK to Staff - each staff has at most one Google Calendar connection
        [Required]
        public int StaffId { get; set; }
        public Staff Staff { get; set; } = null!;

        // OAuth tokens (should be encrypted in production)
        [Required]
        [MaxLength(2048)]
        public string AccessToken { get; set; } = null!;

        [Required]
        [MaxLength(2048)]
        public string RefreshToken { get; set; } = null!;

        public DateTime TokenExpiresAtUtc { get; set; }

        // Email of the connected Google account for display
        [MaxLength(255)]
        public string? GoogleEmail { get; set; }

        // Calendar ID to sync with (usually "primary")
        [MaxLength(255)]
        public string CalendarId { get; set; } = "primary";

        // Sync state - used for incremental sync
        [MaxLength(512)]
        public string? SyncToken { get; set; }

        // Webhook (Push Notification) channel info
        [MaxLength(255)]
        public string? WebhookChannelId { get; set; }

        [MaxLength(255)]
        public string? WebhookResourceId { get; set; }

        public DateTime? WebhookExpiresAtUtc { get; set; }

        // Timestamps
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
