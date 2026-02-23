using Appointmentbookingsystem.Backend.Models.Entities;

namespace Appointmentbookingsystem.Backend.Services
{
    public interface IGoogleCalendarService
    {
        // OAuth
        string GetAuthorizationUrl(int staffId);
        Task<StaffGoogleCalendar> ExchangeCodeForTokensAsync(string code, int staffId);
        Task<StaffGoogleCalendar> RefreshAccessTokenAsync(int staffId);
        Task DisconnectAsync(int staffId);
        Task<StaffGoogleCalendar?> GetConnectionStatusAsync(int staffId);

        // Sync Operations
        Task CreateGoogleEventAsync(Appointment appointment);
        Task UpdateGoogleEventAsync(Appointment appointment);
        Task DeleteGoogleEventAsync(Appointment appointment);
        
        // Webhooks & External Events
        Task<string> RegisterWebhookAsync(int staffId); // Returns channel ID
        Task ProcessWebhookNotificationAsync(string channelId, string resourceId);
        Task<List<ExternalCalendarEvent>> GetExternalEventsAsync(int staffId, DateTime start, DateTime end);
        Task PerformInitialSyncAsync(int staffId); // Public method to trigger initial sync
    }
}
