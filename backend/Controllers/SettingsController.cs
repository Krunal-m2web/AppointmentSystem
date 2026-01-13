using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs;
using Appointmentbookingsystem.Backend.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Security.Claims;
using System.Text.Json;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [ApiController]
    [Route("api/settings")]
    public class SettingsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;
        private readonly AppDbContext _context;

        public SettingsController(IConfiguration configuration, IWebHostEnvironment environment, AppDbContext context)
        {
            _configuration = configuration;
            _environment = environment;
            _context = context;
        }

        /// <summary>
        /// GET /api/settings/currency
        /// Returns the current default currency from configuration
        /// </summary>
        [HttpGet("currency")]
        public ActionResult<string> GetDefaultCurrency()
        {
            var currency = _configuration["AppSettings:DefaultCurrency"] ?? "USD";
            return Ok(currency);
        }

        /// <summary>
        /// PUT /api/settings/currency
        /// Updates the default currency in appsettings.json
        /// Admin only - requires authentication
        /// </summary>
        [HttpPut("currency")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateDefaultCurrency([FromBody] string currency)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(currency))
                {
                    return BadRequest("Currency code cannot be empty");
                }

                // Validate currency code (basic validation - 3 letter code)
                currency = currency.ToUpperInvariant().Trim();
                if (currency.Length != 3)
                {
                    return BadRequest("Currency code must be a 3-letter code (e.g., USD, EUR, INR)");
                }

                // Determine which appsettings file to update
                var fileName = _environment.IsDevelopment() 
                    ? "appsettings.Development.json" 
                    : "appsettings.json";
                
                var filePath = Path.Combine(_environment.ContentRootPath, fileName);

                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound($"Configuration file {fileName} not found");
                }

                // Read current appsettings
                var json = await System.IO.File.ReadAllTextAsync(filePath);
                var jsonDocument = JsonDocument.Parse(json);
                
                // Create a mutable dictionary from the JSON
                var settings = new Dictionary<string, object>();
                foreach (var property in jsonDocument.RootElement.EnumerateObject())
                {
                    settings[property.Name] = JsonSerializer.Deserialize<object>(property.Value.GetRawText())!;
                }

                // Update the currency value
                if (settings.ContainsKey("AppSettings"))
                {
                    var appSettings = JsonSerializer.Deserialize<Dictionary<string, object>>(
                        JsonSerializer.Serialize(settings["AppSettings"]))!;
                    appSettings["DefaultCurrency"] = currency;
                    settings["AppSettings"] = appSettings;
                }
                else
                {
                    settings["AppSettings"] = new Dictionary<string, object>
                    {
                        ["DefaultCurrency"] = currency
                    };
                }

                // Write back to file with formatting
                var options = new JsonSerializerOptions 
                { 
                    WriteIndented = true 
                };
                var updatedJson = JsonSerializer.Serialize(settings, options);
                await System.IO.File.WriteAllTextAsync(filePath, updatedJson);

                return Ok(new { message = $"Default currency updated to {currency}", currency });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to update currency: {ex.Message}");
            }
        }

        // --- Timezone Methods ---

        [HttpGet("timezone")]
        public async Task<IActionResult> GetTimezone([FromQuery] int? companyId)
        {
            // If companyId not provided, try to get from token (if logged in)
            if (!companyId.HasValue)
            {
               var claimId = User.FindFirst("CompanyId")?.Value;
               if (!string.IsNullOrEmpty(claimId))
                   companyId = int.Parse(claimId);
            }

            // Fallback for public booking if no ID (though booking usually knows companyId)
            // If literally nothing, return UTC
            if (!companyId.HasValue) 
                return Ok(new { timezone = "UTC" });

            var company = await _context.Companies.FindAsync(companyId.Value);
            if (company == null) return NotFound("Company not found");

            return Ok(new { timezone = company.Timezone });
        }

        [HttpPut("timezone")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateTimezone([FromBody] UpdateTimezoneDto dto)
        {
           var claimId = User.FindFirst("CompanyId")?.Value;
           if (string.IsNullOrEmpty(claimId)) return Unauthorized();

           var companyId = int.Parse(claimId);
           var company = await _context.Companies.FindAsync(companyId);

           if (company == null) return NotFound("Company not found");

           company.Timezone = dto.Timezone;
           await _context.SaveChangesAsync();

           return Ok(new { message = "Timezone updated", timezone = company.Timezone });
        }

    // --- General Settings (Email Defaults) ---

        [HttpGet("general")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<GeneralSettingsDto>> GetGeneralSettings()
        {
            var companyId = int.Parse(User.FindFirst("CompanyId")!.Value);
            var company = await _context.Companies.FindAsync(companyId);
            if (company == null) return NotFound();

            return Ok(new GeneralSettingsDto
            {
                DefaultSenderName = company.DefaultSenderName,
                DefaultReplyToEmail = company.DefaultReplyToEmail,
                IsEmailServiceEnabled = company.IsEmailServiceEnabled
            });
        }

        [HttpPut("general")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateGeneralSettings([FromBody] GeneralSettingsDto dto)
        {
            var companyId = int.Parse(User.FindFirst("CompanyId")!.Value);
            var company = await _context.Companies.FindAsync(companyId);
            if (company == null) return NotFound();

            company.DefaultSenderName = dto.DefaultSenderName;
            company.DefaultReplyToEmail = dto.DefaultReplyToEmail;
            company.IsEmailServiceEnabled = dto.IsEmailServiceEnabled;

            await _context.SaveChangesAsync();
            return Ok(dto);
        }

        // --- Notification Settings ---

        [HttpGet("notifications")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Dictionary<string, NotificationConfigDto>>> GetNotificationSettings()
        {
            var companyId = int.Parse(User.FindFirst("CompanyId")!.Value);
            var configs = await _context.NotificationConfigs
                .Where(c => c.CompanyId == companyId)
                .ToListAsync();

            var result = new Dictionary<string, NotificationConfigDto>();
            foreach (var config in configs)
            {
                result[config.Type] = new NotificationConfigDto
                {
                    Enabled = config.IsEnabled,
                    Trigger = "", // Static based on type in frontend
                    Description = "", // Static based on type in frontend
                    Timing = "", // Calculated in frontend
                    TimingEditable = true, // Assumed
                    TimingConfig = new TimingConfigDto
                    {
                        Value = config.TimingValue,
                        Unit = config.TimingUnit,
                        Context = config.TimingContext
                    },
                    Template = new EmailTemplateDto
                    {
                        Subject = config.Subject,
                        Body = config.Body
                    }
                };
            }

            return Ok(result);
        }

        [HttpPut("notifications")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateNotificationSettings([FromBody] Dictionary<string, NotificationConfigDto> settings)
        {
             var companyIdClaim = User.FindFirst("CompanyId");
             if (companyIdClaim == null) return Unauthorized("CompanyId claim missing");
             
             var companyId = int.Parse(companyIdClaim.Value);
             Console.WriteLine($"[Settings Debug] Updating notifications for CompanyId: {companyId}. Payload count: {settings?.Count ?? 0}");

             var existingConfigs = await _context.NotificationConfigs
                 .Where(c => c.CompanyId == companyId)
                 .ToListAsync();

             if (settings == null) return BadRequest("Settings payload is null");

             foreach (var kvp in settings)
             {
                 var type = kvp.Key;
                 var dto = kvp.Value;
                 Console.WriteLine($"[Settings Debug] Processing Config: {type}, Enabled: {dto.Enabled}");

                 var config = existingConfigs.FirstOrDefault(c => c.Type == type);
                 if (config == null)
                 {
                     Console.WriteLine($"[Settings Debug] Creating NEW config for {type}");
                     config = new NotificationConfig
                     {
                         CompanyId = companyId,
                         Type = type
                     };
                     _context.NotificationConfigs.Add(config);
                 }
                 else
                 {
                      Console.WriteLine($"[Settings Debug] Updating EXISTING config for {type} (Id: {config.Id})");
                 }

                 config.IsEnabled = dto.Enabled;
                 config.Subject = dto.Template.Subject;
                 config.Body = dto.Template.Body;
                 
                 if (dto.TimingConfig != null)
                 {
                     config.TimingValue = dto.TimingConfig.Value;
                     config.TimingUnit = dto.TimingConfig.Unit;
                     config.TimingContext = dto.TimingConfig.Context;
                 }
                 else
                 {
                     config.TimingValue = 0;
                     config.TimingUnit = "minutes";
                     config.TimingContext = "immediately";
                 }
             }

             var changes = await _context.SaveChangesAsync();
             Console.WriteLine($"[Settings Debug] SaveChanges result: {changes} records modified.");
             
             return Ok(new { message = "Notification settings updated" });
        }

        // --- Payment Settings ---

        [HttpGet("payment")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<PaymentSettingsDto>> GetPaymentSettings()
        {
            var companyId = int.Parse(User.FindFirst("CompanyId")!.Value);
            var company = await _context.Companies.FindAsync(companyId);
            if (company == null) return NotFound();

            var enabledMethods = new List<string>();
            if (!string.IsNullOrEmpty(company.EnabledPaymentMethods))
            {
                try
                {
                    enabledMethods = JsonSerializer.Deserialize<List<string>>(company.EnabledPaymentMethods) ?? new List<string>();
                }
                catch
                {
                    // Default to all methods if JSON is invalid
                    enabledMethods = new List<string> { "Credit Card", "Debit Card", "PayPal", "Bank Transfer" };
                }
            }
            else
            {
                // Default to all methods
                enabledMethods = new List<string> { "Credit Card", "Debit Card", "PayPal", "Bank Transfer" };
            }

            return Ok(new PaymentSettingsDto
            {
                EnabledPaymentMethods = enabledMethods,
                ShowPayNow = company.ShowPayNow,
                ShowPayLater = company.ShowPayLater
            });
        }

        [HttpPut("payment")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdatePaymentSettings([FromBody] PaymentSettingsDto dto)
        {
            var companyId = int.Parse(User.FindFirst("CompanyId")!.Value);
            var company = await _context.Companies.FindAsync(companyId);
            if (company == null) return NotFound();

            company.EnabledPaymentMethods = JsonSerializer.Serialize(dto.EnabledPaymentMethods);
            company.ShowPayNow = dto.ShowPayNow;
            company.ShowPayLater = dto.ShowPayLater;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Payment settings updated successfully" });
        }

        // --- Meeting Location Settings ---

        [HttpGet("meeting-locations")]
        public async Task<ActionResult<MeetingLocationSettingsDto>> GetMeetingLocationSettings([FromQuery] int? companyId)
        {
            // If companyId not provided, try to get from token (if logged in)
            if (!companyId.HasValue)
            {
               var claimId = User.FindFirst("CompanyId")?.Value;
               if (!string.IsNullOrEmpty(claimId))
                   companyId = int.Parse(claimId);
            }

            if (!companyId.HasValue) 
            {
                // Default for public booking
                return Ok(new MeetingLocationSettingsDto
                {
                    EnabledMeetingLocations = new List<string> { "InPerson", "Phone", "Zoom" }
                });
            }

            var company = await _context.Companies.FindAsync(companyId.Value);
            if (company == null) return NotFound("Company not found");

            var enabledLocations = new List<string>();
            if (!string.IsNullOrEmpty(company.EnabledMeetingLocations))
            {
                try
                {
                    enabledLocations = JsonSerializer.Deserialize<List<string>>(company.EnabledMeetingLocations) ?? new List<string>();
                }
                catch
                {
                    // Default to all locations if JSON is invalid
                    enabledLocations = new List<string> { "InPerson", "Phone", "Zoom" };
                }
            }
            else
            {
                // Default to all locations
                enabledLocations = new List<string> { "InPerson", "Phone", "Zoom" };
            }

            return Ok(new MeetingLocationSettingsDto
            {
                EnabledMeetingLocations = enabledLocations
            });
        }

        [HttpPut("meeting-locations")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateMeetingLocationSettings([FromBody] MeetingLocationSettingsDto dto)
        {
            var companyId = int.Parse(User.FindFirst("CompanyId")!.Value);
            var company = await _context.Companies.FindAsync(companyId);
            if (company == null) return NotFound();

            company.EnabledMeetingLocations = JsonSerializer.Serialize(dto.EnabledMeetingLocations);

            await _context.SaveChangesAsync();
            return Ok(new { message = "Meeting location settings updated successfully" });
        }

        // --- Time Off Settings ---

        [HttpGet("timeoff")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<TimeOffSettingsDto>> GetTimeOffSettings()
        {
            var companyId = int.Parse(User.FindFirst("CompanyId")!.Value);
            var company = await _context.Companies.FindAsync(companyId);
            if (company == null) return NotFound();

            return Ok(new TimeOffSettingsDto
            {
                RequireTimeOffApproval = company.RequireTimeOffApproval
            });
        }

        [HttpPut("timeoff")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateTimeOffSettings([FromBody] TimeOffSettingsDto dto)
        {
            var companyId = int.Parse(User.FindFirst("CompanyId")!.Value);
            var company = await _context.Companies.FindAsync(companyId);
            if (company == null) return NotFound();

            company.RequireTimeOffApproval = dto.RequireTimeOffApproval;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Time off settings updated successfully" });
        }
    }

    public class UpdateTimezoneDto
    {
        public string Timezone { get; set; } = "UTC";
    }

    public class GeneralSettingsDto
    {
        public string? DefaultSenderName { get; set; }
        public string? DefaultReplyToEmail { get; set; }
        public bool IsEmailServiceEnabled { get; set; }
    }

    public class NotificationConfigDto
    {
        public bool Enabled { get; set; }
        public string? Trigger { get; set; }
        public string? Description { get; set; }
        public string? Timing { get; set; }
        public bool TimingEditable { get; set; }
        public TimingConfigDto TimingConfig { get; set; } = new();
        public EmailTemplateDto Template { get; set; } = new();
    }

    public class TimingConfigDto
    {
        public int Value { get; set; }
        public string Unit { get; set; } = "hours";
        public string Context { get; set; } = "immediately";
    }

    public class EmailTemplateDto
    {
        public string Subject { get; set; } = "";
        public string Body { get; set; } = "";
    }

    public class PaymentSettingsDto
    {
        public List<string> EnabledPaymentMethods { get; set; } = new();
        public bool ShowPayNow { get; set; } = true;
        public bool ShowPayLater { get; set; } = true;
    }

    public class MeetingLocationSettingsDto
    {
        public List<string> EnabledMeetingLocations { get; set; } = new();
    }

    public class TimeOffSettingsDto
    {
        public bool RequireTimeOffApproval { get; set; } = true;
    }
}
