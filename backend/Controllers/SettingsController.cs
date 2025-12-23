using Appointmentbookingsystem.Backend.Data;
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
    }

    public class UpdateTimezoneDto
    {
        public string Timezone { get; set; } = "UTC";
    }
}
