using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs.Staff;
using Appointmentbookingsystem.Backend.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [Route("api/timeoff")]
    [ApiController]
    [Authorize] // Require login
    public class TimeOffController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TimeOffController(AppDbContext context)
        {
            _context = context;
        }

        // POST /api/timeoff
        [HttpPost]
        public async Task<ActionResult<TimeOffResponseDto>> CreateTimeOff([FromBody] CreateTimeOffDto dto)
        {
            // Validate staff exists
            var staff = await _context.Staff.FindAsync(dto.StaffId);
            if (staff == null)
                return NotFound("Staff number not found.");

            // Check for overlaps
            var hasOverlap = await _context.TimeOffs
                .AnyAsync(t => t.StaffId == dto.StaffId &&
                               t.StartDateTimeUtc < dto.EndDateTimeUtc &&
                               t.EndDateTimeUtc > dto.StartDateTimeUtc);
            
            if (hasOverlap)
            {
                return BadRequest("This time off period overlaps with an existing record for the staff member.");
            }

            // Create Entity
            var timeOff = new TimeOff
            {
                StaffId = dto.StaffId,
                StartDateTimeUtc = dto.StartDateTimeUtc,
                EndDateTimeUtc = dto.EndDateTimeUtc,
                Reason = dto.Reason,
                Status = TimeOffStatus.Approved, // Auto-approve for now, or use Pending
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.TimeOffs.Add(timeOff);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTimeOffByStaff), new { staffId = dto.StaffId }, new TimeOffResponseDto
            {
                Id = timeOff.Id,
                StaffId = timeOff.StaffId,
                StartDateTimeUtc = timeOff.StartDateTimeUtc,
                EndDateTimeUtc = timeOff.EndDateTimeUtc,
                Reason = timeOff.Reason,
                Status = timeOff.Status.ToString()
            });
        }

        // GET /api/timeoff/staff/{staffId}
        // GET /api/timeoff/staff/{staffId}
        [HttpGet("staff/{staffId}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<TimeOffResponseDto>>> GetTimeOffByStaff(int staffId)
        {
            var list = await _context.TimeOffs
                .Where(t => t.StaffId == staffId)
                .OrderByDescending(t => t.StartDateTimeUtc)
                .ToListAsync();

            var response = list.Select(t => new TimeOffResponseDto
            {
                Id = t.Id,
                StaffId = t.StaffId,
                StartDateTimeUtc = t.StartDateTimeUtc,
                EndDateTimeUtc = t.EndDateTimeUtc,
                Reason = t.Reason,
                Status = t.Status.ToString()
            });

            return Ok(response);
        }

        // DELETE /api/timeoff/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimeOff(int id)
        {
            var timeOff = await _context.TimeOffs.FindAsync(id);
            if (timeOff == null) return NotFound();

            _context.TimeOffs.Remove(timeOff);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Time off deleted." });
        }
    }
}
