using Appointmentbookingsystem.Backend.DTOs.GoogleCalendar;
using Appointmentbookingsystem.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [ApiController]
    [Route("api/google-calendar")]
    public class GoogleCalendarController : ControllerBase
    {
        private readonly IGoogleCalendarService _googleCalendarService;
        private readonly ILogger<GoogleCalendarController> _logger;
        private readonly IConfiguration _configuration;

        public GoogleCalendarController(
            IGoogleCalendarService googleCalendarService,
            ILogger<GoogleCalendarController> logger,
            IConfiguration configuration)
        {
            _googleCalendarService = googleCalendarService;
            _logger = logger;
            _configuration = configuration;
        }

        [HttpGet("ping")]
        [AllowAnonymous]
        public IActionResult Ping()
        {
            return Ok("pong");
        }

        private int GetCurrentStaffId()
        {
            var identity = User.Identity as ClaimsIdentity;
            _logger.LogInformation("Auth Debug: IsAuthenticated={IsAuth}, Name={Name}", 
                User.Identity?.IsAuthenticated, User.Identity?.Name);
            
            foreach (var claim in User.Claims)
            {
                _logger.LogInformation("Claim: {Type} = {Value}", claim.Type, claim.Value);
            }

            // Assuming the JWT contains a claim "id" or similar for the staff ID
            // Adjust claim type based on your Auth implementation (e.g. "sub", "StaffId")
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                          ?? User.FindFirst("id")?.Value
                          ?? User.FindFirst("sub")?.Value;

            _logger.LogInformation("Extracted ID Claim Value: {IdClaim}", idClaim);

            if (int.TryParse(idClaim, out int staffId))
            {
                return staffId;
            }
            throw new UnauthorizedAccessException("Could not determine Staff ID from token");
        }

        [HttpPost("connect")]
        [Authorize(Roles = "Staff")]
        public IActionResult Connect()
        {
            try
            {
                var staffId = GetCurrentStaffId();
                var authUrl = _googleCalendarService.GetAuthorizationUrl(staffId);
                return Ok(new { url = authUrl });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating Google auth URL");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("callback")]
        public async Task<IActionResult> Callback([FromQuery] string code, [FromQuery] string state)
        {
            try
            {
                if (string.IsNullOrEmpty(code)) return BadRequest("Missing authorization code");

                // 'state' parameter contains the staffId from GetAuthorizationUrl
                if (!int.TryParse(state, out int staffId))
                {
                    return BadRequest("Invalid state parameter");
                }

                await _googleCalendarService.ExchangeCodeForTokensAsync(code, staffId);

                // Register webhook for Google→SaaS sync (push notifications)
                try
                {
                    await _googleCalendarService.RegisterWebhookAsync(staffId);
                    _logger.LogInformation("Webhook registered for staff {StaffId}", staffId);
                }
                catch (Exception webhookEx)
                {
                    // Webhook may fail if running locally without public URL, log but don't fail
                    _logger.LogWarning(webhookEx, "Failed to register webhook for staff {StaffId}. Google→SaaS push sync won't work until this is fixed.", staffId);
                }

                // Perform initial sync to pull existing Google Calendar events (fire and forget)
                _ = _googleCalendarService.PerformInitialSyncAsync(staffId);
                
                // Redirect to frontend - use query param that works for both admin and staff
                string frontendUrl = _configuration["AppSettings:FrontendUrl"]?.TrimEnd('/') ?? "http://localhost:3000";
                return Redirect($"{frontendUrl}/appointment/staff?calendarConnected=success&tab=google-calendar");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in Google OAuth callback");
                string frontendUrl = _configuration["AppSettings:FrontendUrl"]?.TrimEnd('/') ?? "http://localhost:3000";
                return Redirect($"{frontendUrl}/appointment/staff?calendarConnected=error&tab=google-calendar");
            }
        }

        [HttpPost("disconnect")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> Disconnect()
        {
            try
            {
                var staffId = GetCurrentStaffId();
                await _googleCalendarService.DisconnectAsync(staffId);
                return Ok(new { message = "Disconnected successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error disconnecting Google Calendar");
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// Manual sync endpoint - allows staff to trigger a sync from Google Calendar on demand.
        /// Useful when webhooks are not working or for immediate sync after making changes in Google.
        /// </summary>
        [HttpPost("sync")]
        [Authorize(Roles = "Staff")]
        public async Task<IActionResult> ManualSync()
        {
            try
            {
                var staffId = GetCurrentStaffId();
                _logger.LogInformation("Manual sync triggered for staff {StaffId}", staffId);
                
                await _googleCalendarService.PerformInitialSyncAsync(staffId);
                
                return Ok(new { message = "Sync completed successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during manual sync");
                return StatusCode(500, new { message = "Sync failed", error = ex.Message });
            }
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> Webhook()
        {
            // Google sends these headers
            // X-Goog-Channel-ID: <channel-id>
            // X-Goog-Resource-ID: <resource-id>
            // X-Goog-Resource-State: exists | sync | not_exists
            
            var channelId = Request.Headers["X-Goog-Channel-ID"].ToString();
            var resourceId = Request.Headers["X-Goog-Resource-ID"].ToString();
            var resourceState = Request.Headers["X-Goog-Resource-State"].ToString();

            _logger.LogInformation("Received Google Webhook: Channel={ChannelId}, Resource={ResourceId}, State={State}", 
                channelId, resourceId, resourceState);

            if (resourceState == "sync")
            {
                // Initial sync confirmation
                return Ok();
            }

            if (!string.IsNullOrEmpty(channelId) && !string.IsNullOrEmpty(resourceId))
            {
                // Fire and forget processing to return 200 OK quickly to Google
                // In production, queue this or use a background service
                _ = _googleCalendarService.ProcessWebhookNotificationAsync(channelId, resourceId);
            }

            return Ok();
        }

        [HttpGet("status")]
        [Authorize] // Testing if Role is the issue
        public async Task<ActionResult<GoogleCalendarConnectionStatusDto>> GetStatus()
        {
            try
            {
                var staffId = GetCurrentStaffId();
                // var staffId = 1; // DEBUG: Hardcoded
                var connection = await _googleCalendarService.GetConnectionStatusAsync(staffId);

                return Ok(new GoogleCalendarConnectionStatusDto
                {
                    IsConnected = connection != null,
                    GoogleEmail = connection?.GoogleEmail,
                    TokenExpiresAtUtc = connection?.TokenExpiresAtUtc,
                    LastSyncedAt = connection?.UpdatedAt // Just using UpdatedAt for now
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching connection status");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
