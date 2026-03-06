using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs.Holiday;
using Appointmentbookingsystem.Backend.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [ApiController]
    [Route("api/holidays")]
    public class HolidayController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HolidayController(AppDbContext context)
        {
            _context = context;
        }

        // ─────────────────────────────────────────────────────
        // Helper: get authenticated company id
        // ─────────────────────────────────────────────────────
        private async Task<int?> GetCompanyIdAsync()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out int userId)) return null;

            var user = await _context.Users.FindAsync(userId);
            return user?.CompanyId;
        }

        // ─────────────────────────────────────────────────────
        // Mapping helpers
        // ─────────────────────────────────────────────────────
        private static HolidayDto ToDto(Holiday h)
        {
            return new HolidayDto
            {
                Id = h.Id,
                Date = h.Date.ToString("yyyy-MM-dd"),
                Name = h.Name,
                RepeatYearly = h.RepeatYearly,
                Source = h.Source,
                CountryName = h.CountryName
            };
        }

        private static DateOnly ParseDate(string dateStr)
        {
            return DateOnly.ParseExact(dateStr, "yyyy-MM-dd");
        }

        // ─────────────────────────────────────────────────────
        // GET /api/holidays?year=YYYY
        // Returns holidays for the current company for a given year,
        // expanding RepeatYearly entries to the requested year.
        // ─────────────────────────────────────────────────────
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<HolidayDto>>> GetHolidays([FromQuery] int? year)
        {
            var companyId = await GetCompanyIdAsync();
            if (companyId == null) return Unauthorized();

            var targetYear = year ?? DateTime.UtcNow.Year;

            var holidays = await _context.Holidays
                .Where(h => h.CompanyId == companyId)
                .OrderBy(h => h.Date)
                .ToListAsync();

            // Filter: include those that apply to the target year
            var applicable = holidays
                .Where(h => h.RepeatYearly || h.Date.Year == targetYear)
                .Select(h =>
                {
                    // For repeating holidays, shift the date to the target year
                    if (h.RepeatYearly && h.Date.Year != targetYear)
                    {
                        var shifted = new Holiday
                        {
                            Id = h.Id,
                            Date = new DateOnly(targetYear, h.Date.Month, h.Date.Day),
                            Name = h.Name,
                            RepeatYearly = h.RepeatYearly,
                            Source = h.Source,
                            CountryName = h.CountryName
                        };
                        return ToDto(shifted);
                    }
                    return ToDto(h);
                })
                .OrderBy(d => d.Date)
                .ToList();

            return Ok(applicable);
        }

        // ─────────────────────────────────────────────────────
        // GET /api/holidays/public/{companyId}  — public access for booking page
        // ─────────────────────────────────────────────────────
        [HttpGet("public/{companyId:int}")]
        public async Task<ActionResult<IEnumerable<HolidayDto>>> GetPublicHolidays(int companyId, [FromQuery] int? year)
        {
            var targetYear = year ?? DateTime.UtcNow.Year;

            var holidays = await _context.Holidays
                .Where(h => h.CompanyId == companyId)
                .OrderBy(h => h.Date)
                .ToListAsync();

            // Filter: include those that apply to the target year
            var applicable = holidays
                .Where(h => h.RepeatYearly || h.Date.Year == targetYear)
                .Select(h =>
                {
                    // For repeating holidays, shift the date to the target year
                    if (h.RepeatYearly && h.Date.Year != targetYear)
                    {
                        var shifted = new Holiday
                        {
                            Id = h.Id,
                            Date = new DateOnly(targetYear, h.Date.Month, h.Date.Day),
                            Name = h.Name,
                            RepeatYearly = h.RepeatYearly,
                            Source = h.Source,
                            CountryName = h.CountryName
                        };
                        return ToDto(shifted);
                    }
                    return ToDto(h);
                })
                .OrderBy(d => d.Date)
                .ToList();

            return Ok(applicable);
        }

        // ─────────────────────────────────────────────────────
        // POST /api/holidays  — create one
        // ─────────────────────────────────────────────────────
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<HolidayDto>> CreateHoliday([FromBody] CreateHolidayDto dto)
        {
            var companyId = await GetCompanyIdAsync();
            if (companyId == null) return Unauthorized();

            if (string.IsNullOrWhiteSpace(dto.Date) || string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest(new { message = "Date and Name are required." });

            DateOnly date;
            try { date = ParseDate(dto.Date); }
            catch { return BadRequest(new { message = "Invalid date format. Use YYYY-MM-DD." }); }

            // Prevent exact duplicates
            var exists = await _context.Holidays.AnyAsync(h =>
                h.CompanyId == companyId && h.Date == date);
            if (exists)
                return Conflict(new { message = $"A holiday on {dto.Date} already exists." });

            var holiday = new Holiday
            {
                CompanyId = companyId.Value,
                Date = date,
                Name = dto.Name.Trim(),
                RepeatYearly = dto.RepeatYearly,
                Source = dto.Source ?? "custom",
                CountryName = dto.CountryName
            };

            _context.Holidays.Add(holiday);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHolidays), ToDto(holiday));
        }

        // ─────────────────────────────────────────────────────
        // POST /api/holidays/bulk  — import many at once
        // ─────────────────────────────────────────────────────
        [HttpPost("bulk")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<HolidayDto>>> BulkCreateHolidays([FromBody] BulkCreateHolidayDto dto)
        {
            var companyId = await GetCompanyIdAsync();
            if (companyId == null) return Unauthorized();

            if (dto.Holidays == null || dto.Holidays.Count == 0)
                return BadRequest(new { message = "No holidays provided." });

            // Load existing dates to skip duplicates
            var existingDates = await _context.Holidays
                .Where(h => h.CompanyId == companyId)
                .Select(h => h.Date)
                .ToListAsync();

            var existingSet = new HashSet<DateOnly>(existingDates);
            var created = new List<Holiday>();

            foreach (var item in dto.Holidays)
            {
                if (string.IsNullOrWhiteSpace(item.Date) || string.IsNullOrWhiteSpace(item.Name))
                    continue;

                DateOnly date;
                try { date = ParseDate(item.Date); }
                catch { continue; }

                if (existingSet.Contains(date)) continue;

                var holiday = new Holiday
                {
                    CompanyId = companyId.Value,
                    Date = date,
                    Name = item.Name.Trim(),
                    RepeatYearly = item.RepeatYearly,
                    Source = item.Source ?? "custom",
                    CountryName = item.CountryName
                };

                _context.Holidays.Add(holiday);
                existingSet.Add(date);
                created.Add(holiday);
            }

            await _context.SaveChangesAsync();
            return Ok(created.Select(ToDto).ToList());
        }

        // ─────────────────────────────────────────────────────
        // PUT /api/holidays/{id}  — update name / repeatYearly
        // ─────────────────────────────────────────────────────
        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult<HolidayDto>> UpdateHoliday(int id, [FromBody] UpdateHolidayDto dto)
        {
            var companyId = await GetCompanyIdAsync();
            if (companyId == null) return Unauthorized();

            var holiday = await _context.Holidays
                .FirstOrDefaultAsync(h => h.Id == id && h.CompanyId == companyId);

            if (holiday == null) return NotFound();

            holiday.Name = dto.Name.Trim();
            holiday.RepeatYearly = dto.RepeatYearly;

            await _context.SaveChangesAsync();
            return Ok(ToDto(holiday));
        }

        // ─────────────────────────────────────────────────────
        // DELETE /api/holidays/{id}
        // ─────────────────────────────────────────────────────
        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteHoliday(int id)
        {
            var companyId = await GetCompanyIdAsync();
            if (companyId == null) return Unauthorized();

            var holiday = await _context.Holidays
                .FirstOrDefaultAsync(h => h.Id == id && h.CompanyId == companyId);

            if (holiday == null) return NotFound();

            _context.Holidays.Remove(holiday);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // ─────────────────────────────────────────────────────
        // DELETE /api/holidays/bulk
        // ─────────────────────────────────────────────────────
        [HttpDelete("bulk")]
        [Authorize]
        public async Task<IActionResult> DeleteHolidays([FromBody] BulkDeleteDto dto)
        {
            var companyId = await GetCompanyIdAsync();
            if (companyId == null) return Unauthorized();

            if (dto.Ids == null || dto.Ids.Count == 0)
                return BadRequest(new { message = "No IDs provided." });

            var holidays = await _context.Holidays
                .Where(h => dto.Ids.Contains(h.Id) && h.CompanyId == companyId)
                .ToListAsync();

            if (holidays.Count == 0) return NoContent();

            _context.Holidays.RemoveRange(holidays);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ─────────────────────────────────────────────────────
        // GET /api/holidays/imported-countries
        // Returns a list of country codes + names that have already been imported.
        // ─────────────────────────────────────────────────────
        [HttpGet("imported-countries")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ImportedCountryDto>>> GetImportedCountries()
        {
            var companyId = await GetCompanyIdAsync();
            if (companyId == null) return Unauthorized();

            var imported = await _context.Holidays
                .Where(h => h.CompanyId == companyId && h.Source != "custom")
                .Select(h => new { h.Source, h.CountryName })
                .Distinct()
                .ToListAsync();

            var dtos = imported
                .Select(x => new ImportedCountryDto
                {
                    Source = x.Source,
                    CountryName = x.CountryName ?? x.Source
                })
                .ToList();

            return Ok(dtos);
        }

        // ─────────────────────────────────────────────────────
        // DELETE /api/holidays/source/{source}
        // Deletes all holidays for a particular source (country code).
        // ─────────────────────────────────────────────────────
        [HttpDelete("source/{source}")]
        [Authorize]
        public async Task<IActionResult> DeleteHolidaysBySource(string source)
        {
            var companyId = await GetCompanyIdAsync();
            if (companyId == null) return Unauthorized();

            if (string.IsNullOrWhiteSpace(source) || source == "custom")
                return BadRequest(new { message = "Invalid source." });

            var holidays = await _context.Holidays
                .Where(h => h.CompanyId == companyId && h.Source == source)
                .ToListAsync();

            if (holidays.Count == 0) return NoContent();

            _context.Holidays.RemoveRange(holidays);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
