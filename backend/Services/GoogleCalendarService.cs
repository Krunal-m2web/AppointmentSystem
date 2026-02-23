using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.Models.Entities;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Appointmentbookingsystem.Backend.Services
{
    public class GoogleCalendarService : IGoogleCalendarService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<GoogleCalendarService> _logger;
        private readonly string _clientId;
        private readonly string _clientSecret;
        private readonly string _redirectUri;
        private readonly string _webhookBaseUrl;

        public GoogleCalendarService(
            AppDbContext context,
            IConfiguration configuration,
            ILogger<GoogleCalendarService> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;

            var googleConfig = _configuration.GetSection("GoogleCalendar");
            _clientId = googleConfig["ClientId"]!;
            _clientSecret = googleConfig["ClientSecret"]!;
            _redirectUri = googleConfig["RedirectUri"]!;
            _webhookBaseUrl = googleConfig["WebhookBaseUrl"]!;
        }

        private GoogleAuthorizationCodeFlow GetCodeFlow()
        {
            return new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = _clientId,
                    ClientSecret = _clientSecret
                },
                Scopes = new[] { CalendarService.Scope.CalendarEvents },
                DataStore = null // We manage storage manually
            });
        }

        public string GetAuthorizationUrl(int staffId)
        {
            var flow = GetCodeFlow();
            // Pass staffId in state so we know who authorized on callback
            var request = flow.CreateAuthorizationCodeRequest(_redirectUri);
            request.State = staffId.ToString();
            
            // Build base URL and add access_type=offline & prompt=consent to ensure refresh token is returned
            var baseUri = request.Build();
            var uriBuilder = new UriBuilder(baseUri);
            var queryParams = System.Web.HttpUtility.ParseQueryString(uriBuilder.Query);
            queryParams["access_type"] = "offline";
            queryParams["prompt"] = "consent"; // Force consent to always get refresh token
            uriBuilder.Query = queryParams.ToString();
            return uriBuilder.Uri.AbsoluteUri;
        }

        public async Task<StaffGoogleCalendar> ExchangeCodeForTokensAsync(string code, int staffId)
        {
            var flow = GetCodeFlow();
            var tokenResponse = await flow.ExchangeCodeForTokenAsync(
                userId: staffId.ToString(),
                code: code,
                redirectUri: _redirectUri,
                taskCancellationToken: CancellationToken.None
            );

            var existing = await _context.StaffGoogleCalendars
                .FirstOrDefaultAsync(x => x.StaffId == staffId);

            if (existing == null)
            {
                existing = new StaffGoogleCalendar
                {
                    StaffId = staffId,
                    AccessToken = tokenResponse.AccessToken,
                    RefreshToken = tokenResponse.RefreshToken, // Important: usually only returned on first auth
                    TokenExpiresAtUtc = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresInSeconds ?? 3599),
                    CalendarId = "primary"
                };
                _context.StaffGoogleCalendars.Add(existing);
            }
            else
            {
                existing.AccessToken = tokenResponse.AccessToken;
                if (!string.IsNullOrEmpty(tokenResponse.RefreshToken))
                {
                    existing.RefreshToken = tokenResponse.RefreshToken;
                }
                existing.TokenExpiresAtUtc = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresInSeconds ?? 3599);
            }

            // Get Google Email
            try
            {
                var credential = new UserCredential(flow, staffId.ToString(), tokenResponse);
                var service = new CalendarService(new BaseClientService.Initializer { HttpClientInitializer = credential });
                var calendar = await service.Calendars.Get("primary").ExecuteAsync();
                existing.GoogleEmail = calendar.Id; // Often email for primary
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Could not fetch Google Calendar email for display");
            }

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<StaffGoogleCalendar> RefreshAccessTokenAsync(int staffId)
        {
            var staffCalendar = await _context.StaffGoogleCalendars
                .FirstOrDefaultAsync(x => x.StaffId == staffId);

            if (staffCalendar == null) throw new Exception("Staff not connected to Google Calendar");

            var flow = GetCodeFlow();
            var tokenResponse = await flow.RefreshTokenAsync(
                userId: staffId.ToString(),
                refreshToken: staffCalendar.RefreshToken,
                taskCancellationToken: CancellationToken.None
            );

            staffCalendar.AccessToken = tokenResponse.AccessToken;
            staffCalendar.TokenExpiresAtUtc = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresInSeconds ?? 3599);
            
            await _context.SaveChangesAsync();
            return staffCalendar;
        }

        public async Task DisconnectAsync(int staffId)
        {
            var connection = await _context.StaffGoogleCalendars
                .FirstOrDefaultAsync(x => x.StaffId == staffId);
            
            if (connection != null)
            {
                // TODO: Stop webhook?
                _context.StaffGoogleCalendars.Remove(connection);
                
                // Also remove all sync records and external events for this staff
                var syncs = _context.AppointmentCalendarSyncs.Where(s => s.StaffId == staffId);
                _context.AppointmentCalendarSyncs.RemoveRange(syncs);
                
                var external = _context.ExternalCalendarEvents.Where(e => e.StaffId == staffId);
                _context.ExternalCalendarEvents.RemoveRange(external);

                await _context.SaveChangesAsync();
            }
        }

        public async Task<StaffGoogleCalendar?> GetConnectionStatusAsync(int staffId)
        {
            return await _context.StaffGoogleCalendars
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.StaffId == staffId);
        }

        // --- Future Implementation Stubs ---

        public async Task CreateGoogleEventAsync(Appointment appointment)
        {
            if (!appointment.StaffId.HasValue) return;

            var staffId = appointment.StaffId.Value;
            var staffCalendar = await _context.StaffGoogleCalendars.FirstOrDefaultAsync(x => x.StaffId == staffId);
            if (staffCalendar == null) return; // Not connected

            try
            {
                // Refresh token if needed
                if (staffCalendar.TokenExpiresAtUtc < DateTime.UtcNow.AddMinutes(5))
                {
                    staffCalendar = await RefreshAccessTokenAsync(staffId);
                }

                var credential = GoogleCredential.FromAccessToken(staffCalendar.AccessToken);
                var service = new CalendarService(new BaseClientService.Initializer { HttpClientInitializer = credential });

                var ev = MapToGoogleEvent(appointment);

                var request = service.Events.Insert(ev, staffCalendar.CalendarId);
                var createdEvent = await request.ExecuteAsync();

                // Save sync record
                var sync = new AppointmentCalendarSync
                {
                    AppointmentId = appointment.Id,
                    StaffId = staffId,
                    GoogleEventId = createdEvent.Id,
                    GoogleEtag = createdEvent.ETag,
                    Source = "saas"
                };

                _context.AppointmentCalendarSyncs.Add(sync);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to sync appointment {InternalId} to Google Calendar", appointment.Id);
                // We don't throw here to avoid failing the appointment creation itself
            }
        }

        public async Task UpdateGoogleEventAsync(Appointment appointment)
        {
            if (!appointment.StaffId.HasValue) return;
            var staffId = appointment.StaffId.Value;

            var sync = await _context.AppointmentCalendarSyncs
                .FirstOrDefaultAsync(x => x.AppointmentId == appointment.Id);

            if (sync == null) 
            {
                // Try to create if missing (e.g. connected after booking)
                await CreateGoogleEventAsync(appointment);
                return;
            }

            var staffCalendar = await _context.StaffGoogleCalendars.FirstOrDefaultAsync(x => x.StaffId == staffId);
            if (staffCalendar == null) return;

            try
            {
                if (staffCalendar.TokenExpiresAtUtc < DateTime.UtcNow.AddMinutes(5))
                {
                    staffCalendar = await RefreshAccessTokenAsync(staffId);
                }

                var credential = GoogleCredential.FromAccessToken(staffCalendar.AccessToken);
                var service = new CalendarService(new BaseClientService.Initializer { HttpClientInitializer = credential });

                var ev = MapToGoogleEvent(appointment);
                
                var request = service.Events.Update(ev, staffCalendar.CalendarId, sync.GoogleEventId);
                var updatedEvent = await request.ExecuteAsync();

                sync.GoogleEtag = updatedEvent.ETag;
                sync.Source = "saas"; // Reinforce ownership
                sync.UpdatedAt = DateTime.UtcNow;
                
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update Google Calendar event {GoogleEventId}", sync.GoogleEventId);
            }
        }

        public async Task DeleteGoogleEventAsync(Appointment appointment)
        {
            var sync = await _context.AppointmentCalendarSyncs
                .FirstOrDefaultAsync(x => x.AppointmentId == appointment.Id);

            if (sync == null) return;

            var staffCalendar = await _context.StaffGoogleCalendars.FirstOrDefaultAsync(x => x.StaffId == sync.StaffId);
            if (staffCalendar == null) return;

            try
            {
                if (staffCalendar.TokenExpiresAtUtc < DateTime.UtcNow.AddMinutes(5))
                {
                    staffCalendar = await RefreshAccessTokenAsync(sync.StaffId);
                }

                var credential = GoogleCredential.FromAccessToken(staffCalendar.AccessToken);
                var service = new CalendarService(new BaseClientService.Initializer { HttpClientInitializer = credential });

                await service.Events.Delete(staffCalendar.CalendarId, sync.GoogleEventId).ExecuteAsync();

                _context.AppointmentCalendarSyncs.Remove(sync);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to delete Google Calendar event {GoogleEventId}", sync.GoogleEventId);
                // Clean up sync record anyway if it's 404
                if (ex.Message.Contains("404") || ex.Message.Contains("Not Found")) 
                {
                    _context.AppointmentCalendarSyncs.Remove(sync);
                    await _context.SaveChangesAsync();
                }
            }
        }

        private Event MapToGoogleEvent(Appointment appointment)
        {
            var staffName = appointment.Staff != null 
                ? $"{appointment.Staff.FirstName} {appointment.Staff.LastName}" 
                : "Unassigned";

            return new Event
            {
                Summary = $"{appointment.Service.Name} - {appointment.Customer.FirstName} {appointment.Customer.LastName} ({staffName})",
                Description = $"Service: {appointment.Service.Name}\nStaff: {staffName}\nClient: {appointment.Customer.FirstName} {appointment.Customer.LastName}\nPhone: {appointment.Customer.Phone}\nEmail: {appointment.Customer.Email}\n\nSynced from MySaaS (Appt #{appointment.Id})",
                Start = new EventDateTime { DateTimeRaw = appointment.StartDateTimeUtc.ToString("yyyy-MM-dd'T'HH:mm:ss'Z'") },
                End = new EventDateTime { DateTimeRaw = appointment.EndDateTimeUtc.ToString("yyyy-MM-dd'T'HH:mm:ss'Z'") },
                // Add reminders or color if desired
            };
        }

        public async Task<string> RegisterWebhookAsync(int staffId)
        {
            var staffCalendar = await _context.StaffGoogleCalendars.FirstOrDefaultAsync(x => x.StaffId == staffId);
            if (staffCalendar == null) throw new Exception("Calendar not connected");

            if (staffCalendar.TokenExpiresAtUtc < DateTime.UtcNow.AddMinutes(5))
            {
                staffCalendar = await RefreshAccessTokenAsync(staffId);
            }

            var credential = GoogleCredential.FromAccessToken(staffCalendar.AccessToken);
            var service = new CalendarService(new BaseClientService.Initializer { HttpClientInitializer = credential });

            var channelId = Guid.NewGuid().ToString();
            var webhookUrl = _webhookBaseUrl;
            if (!webhookUrl.EndsWith("/api/google-calendar/webhook"))
            {
                webhookUrl = $"{webhookUrl.TrimEnd('/')}/api/google-calendar/webhook";
            }

            var channel = new Channel
            {
                Id = channelId,
                Type = "web_hook",
                Address = webhookUrl
            };

            var result = await service.Events.Watch(channel, staffCalendar.CalendarId).ExecuteAsync();

            staffCalendar.WebhookChannelId = result.Id;
            staffCalendar.WebhookResourceId = result.ResourceId;
            staffCalendar.WebhookExpiresAtUtc = DateTime.UtcNow.AddDays(7).AddMinutes(-10); // Expire slightly before Google does
            
            await _context.SaveChangesAsync();
            return result.Id;
        }

        public async Task ProcessWebhookNotificationAsync(string channelId, string resourceId)
        {
            // Find staff by channel ID
            var staffCalendar = await _context.StaffGoogleCalendars
                .FirstOrDefaultAsync(x => x.WebhookChannelId == channelId && x.WebhookResourceId == resourceId);

            if (staffCalendar == null) 
            {
                _logger.LogWarning("Received webhook for unknown channel {ChannelId}", channelId);
                return;
            }

            // Sync Logic
            await IncrementalSyncAsync(staffCalendar.StaffId);
        }

        private async Task IncrementalSyncAsync(int staffId)
        {
            var staffCalendar = await _context.StaffGoogleCalendars.FirstOrDefaultAsync(x => x.StaffId == staffId);
            if (staffCalendar == null) return;

            try
            {
                 if (staffCalendar.TokenExpiresAtUtc < DateTime.UtcNow.AddMinutes(5))
                {
                    staffCalendar = await RefreshAccessTokenAsync(staffId);
                }

                var credential = GoogleCredential.FromAccessToken(staffCalendar.AccessToken);
                var service = new CalendarService(new BaseClientService.Initializer { HttpClientInitializer = credential });

                var request = service.Events.List(staffCalendar.CalendarId);
                request.SyncToken = staffCalendar.SyncToken;

                if (string.IsNullOrEmpty(request.SyncToken))
                {
                    // Full sync for last 30 days if no token (first time)
                    request.TimeMin = DateTime.UtcNow.AddDays(-30); 
                }

                Events eventsResult;
                try 
                {
                    eventsResult = await request.ExecuteAsync();
                }
                catch (Google.GoogleApiException ex) when (ex.HttpStatusCode == System.Net.HttpStatusCode.Gone)
                {
                    // Sync token invalid, clear it and retry full sync
                    staffCalendar.SyncToken = null;
                    await _context.SaveChangesAsync();
                    await IncrementalSyncAsync(staffId); // Recursive retry once
                    return;
                }

                // Process items
                if (eventsResult.Items != null)
                {
                    foreach (var googleEvent in eventsResult.Items)
                    {
                        await ProcessSingleGoogleEventAsync(googleEvent, staffId);
                    }
                }

                // Save next sync token
                staffCalendar.SyncToken = eventsResult.NextSyncToken;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during incremental sync for staff {StaffId}", staffId);
            }
        }

        private async Task ProcessSingleGoogleEventAsync(Event googleEvent, int staffId)
        {
            // check if we already have this event mapped
            var sync = await _context.AppointmentCalendarSyncs
                .FirstOrDefaultAsync(x => x.GoogleEventId == googleEvent.Id && x.StaffId == staffId);

            if (sync != null)
            {
                // Previously synced event
                if (sync.Source == "saas")
                {
                    // If it was created by us, ignore echo (unless description changed implying user edit?)
                    // For now, strict: if we own it, we ignore external changes to prevent loops/conflicts
                    // OR: we could allow 2-way sync of time here
                }
                
                if (googleEvent.Status == "cancelled")
                {
                     // Remove external blocking event if exists
                     var external = await _context.ExternalCalendarEvents
                        .FirstOrDefaultAsync(x => x.GoogleEventId == googleEvent.Id && x.StaffId == staffId);
                     if (external != null) _context.ExternalCalendarEvents.Remove(external);
                }
                else
                {
                    // Update external event details
                    var external = await _context.ExternalCalendarEvents
                        .FirstOrDefaultAsync(x => x.GoogleEventId == googleEvent.Id && x.StaffId == staffId);
                    
                    if (external != null)
                    {
                        UpdateExternalEventFromGoogle(external, googleEvent);
                    }
                }
            }
            else
            {
                // New event from Google
                if (googleEvent.Status == "cancelled") return;

                // Check if it's one of ours that we just haven't synced yet? 
                // Description check for "Synced from MySaaS" to avoid re-importing our own events if DB was wiped
                if (googleEvent.Description != null && googleEvent.Description.Contains("Synced from MySaaS"))
                {
                    // It's ours, but we lost the sync record. Re-create link? 
                    // TODO: Extract ID from description if possible
                    return;
                }

                // It is truly an external event
                // Fetch company ID
                var companyId = await _context.Staff.Where(s => s.Id == staffId).Select(s => s.CompanyId).FirstOrDefaultAsync();

                var external = new ExternalCalendarEvent
                {
                    StaffId = staffId,
                    CompanyId = companyId,
                    GoogleEventId = googleEvent.Id,
                    Title = "Busy (Google Calendar)" // Privacy: don't import actual title
                };
                UpdateExternalEventFromGoogle(external, googleEvent);
                _context.ExternalCalendarEvents.Add(external);
                
                // Add sync record to track it
                 var newSync = new AppointmentCalendarSync
                {
                    StaffId = staffId,
                    GoogleEventId = googleEvent.Id,
                    GoogleEtag = googleEvent.ETag,
                    Source = "google"
                };
                _context.AppointmentCalendarSyncs.Add(newSync);
            }
             await _context.SaveChangesAsync();
        }

        private void UpdateExternalEventFromGoogle(ExternalCalendarEvent external, Event googleEvent)
        {
             if (googleEvent.Start.DateTimeDateTimeOffset.HasValue)
            {
                external.StartDateTimeUtc = googleEvent.Start.DateTimeDateTimeOffset.Value.UtcDateTime;
                external.IsAllDay = false;
            }
            else if (!string.IsNullOrEmpty(googleEvent.Start.Date))
            {
                // All day
                 external.StartDateTimeUtc = DateTime.Parse(googleEvent.Start.Date).ToUniversalTime();
                 external.IsAllDay = true;
            }

             if (googleEvent.End.DateTimeDateTimeOffset.HasValue)
            {
                external.EndDateTimeUtc = googleEvent.End.DateTimeDateTimeOffset.Value.UtcDateTime;
            }
            else if (!string.IsNullOrEmpty(googleEvent.End.Date))
            {
                 external.EndDateTimeUtc = DateTime.Parse(googleEvent.End.Date).ToUniversalTime();
            }
            
            external.UpdatedAt = DateTime.UtcNow;
        }

        public async Task<List<ExternalCalendarEvent>> GetExternalEventsAsync(int staffId, DateTime start, DateTime end)
        {
             return await _context.ExternalCalendarEvents
                .AsNoTracking()
                .Where(e => e.StaffId == staffId 
                         && e.StartDateTimeUtc < end 
                         && e.EndDateTimeUtc > start)
                .ToListAsync();
        }

        /// <summary>
        /// Public method to trigger initial sync after OAuth connection.
        /// Pulls existing Google Calendar events into SaaS as blocking events.
        /// </summary>
        public async Task PerformInitialSyncAsync(int staffId)
        {
            _logger.LogInformation("Performing initial Google Calendar sync for staff {StaffId}", staffId);
            await IncrementalSyncAsync(staffId);
        }
    }
}
