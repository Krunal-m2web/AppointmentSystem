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

        private int? GetCurrentUserId()
        {
            var claim = User.Claims.FirstOrDefault(c => c.Type == "UserId") 
                     ?? User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier") // ClaimTypes.NameIdentifier
                     ?? User.Claims.FirstOrDefault(c => c.Type == "sub");
            
            if (claim != null && int.TryParse(claim.Value, out int id))
                return id;
                
            return null;
        }

        private string? GetCurrentUserRole()
        {
            return User.Claims.FirstOrDefault(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value // ClaimTypes.Role
                ?? User.Claims.FirstOrDefault(c => c.Type == "role")?.Value;
        }

        // POST /api/timeoff - Create time off request/entry
        [HttpPost]
        public async Task<ActionResult<TimeOffResponseDto>> CreateTimeOff([FromBody] CreateTimeOffDto dto)
        {
            // Validate staff exists
            var staff = await _context.Staff.FindAsync(dto.StaffId);
            if (staff == null)
                return NotFound("Staff member not found.");

            // Get current user info
            var userRole = GetCurrentUserRole();
            var userId = GetCurrentUserId();

            // Authorization: Staff can only create for themselves
            if (userRole == "Staff" && userId.HasValue && userId.Value != dto.StaffId)
            {
                return Forbid(); // Staff can only create time-off for themselves
            }

            // Check for overlaps
            var hasOverlap = await _context.TimeOffs
                .AnyAsync(t => t.StaffId == dto.StaffId &&
                               t.Status != TimeOffStatus.Rejected &&
                               t.StartDateTimeUtc < dto.EndDateTimeUtc &&
                               t.EndDateTimeUtc > dto.StartDateTimeUtc);
            
            if (hasOverlap)
            {
                return BadRequest("This time off period overlaps with an existing record for the staff member.");
            }

            // Get company settings for approval requirement
            var company = await _context.Staff
                .Where(s => s.Id == dto.StaffId)
                .Select(s => s.Company)
                .FirstOrDefaultAsync();

            // Determine status based on who creates it and company settings
            TimeOffStatus status;
            int? approvedByAdminId = null;
            
            if (userRole == "Admin")
            {
                status = TimeOffStatus.Approved;
                approvedByAdminId = userId;
            }
            else if (company != null && !company.RequireTimeOffApproval)
            {
                // Auto-approve if company doesn't require approval
                status = TimeOffStatus.Approved;
            }
            else
            {
                status = TimeOffStatus.Pending;
            }

            // Determine if created by self (for Viewed flags)
            bool isSelf = userId.HasValue && userId.Value == dto.StaffId;

            // Create Entity
            var timeOff = new TimeOff
            {
                StaffId = dto.StaffId,
                StartDateTimeUtc = dto.StartDateTimeUtc,
                EndDateTimeUtc = dto.EndDateTimeUtc,
                Reason = dto.Reason,
                IsFullDay = dto.IsFullDay,
                Status = status,
                ApprovedByAdminId = approvedByAdminId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsViewedByStaff = isSelf,
                IsViewedByAdmin = userRole == "Admin"
            };

            _context.TimeOffs.Add(timeOff);
            await _context.SaveChangesAsync();

            // Reload with staff info
            var created = await _context.TimeOffs
                .Include(t => t.Staff)
                .Include(t => t.ApprovedByAdmin)
                .FirstOrDefaultAsync(t => t.Id == timeOff.Id);

            return CreatedAtAction(nameof(GetTimeOffByStaff), new { staffId = dto.StaffId }, MapToDto(created!));
        }

        // GET /api/timeoff/staff/{staffId} - Get time-offs for specific staff
        [HttpGet("staff/{staffId}")]
        public async Task<ActionResult<IEnumerable<TimeOffResponseDto>>> GetTimeOffByStaff(int staffId)
        {
            // Authorization: Staff can only view their own
            var userRole = GetCurrentUserRole();
            var userId = GetCurrentUserId();

            if (userRole == "Staff" && userId.HasValue && userId.Value != staffId)
            {
                return Forbid();
            }

            var list = await _context.TimeOffs
                .Include(t => t.Staff)
                .Include(t => t.ApprovedByAdmin)
                .Where(t => t.StaffId == staffId)
                .OrderByDescending(t => t.StartDateTimeUtc)
                .ToListAsync();

            return Ok(list.Select(MapToDto));
        }

        // GET /api/timeoff/all - Get all time-offs (Admin only)
        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<TimeOffResponseDto>>> GetAllTimeOffs()
        {
            var list = await _context.TimeOffs
                .Include(t => t.Staff)
                .Include(t => t.ApprovedByAdmin)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return Ok(list.Select(MapToDto));
        }

        // GET /api/timeoff/pending - Get pending requests (Admin only)
        [HttpGet("pending")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<TimeOffResponseDto>>> GetPendingTimeOffs()
        {
            var list = await _context.TimeOffs
                .Include(t => t.Staff)
                .Where(t => t.Status == TimeOffStatus.Pending)
                .OrderByDescending(t => t.CreatedAt) // Newest first
                .ToListAsync();

            return Ok(list.Select(MapToDto));
        }

        // GET /api/timeoff/pending/count - Get count of pending requests (Admin only)
        [HttpGet("pending/count")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<int>> GetPendingTimeOffCount()
        {
            var count = await _context.TimeOffs
                .CountAsync(t => t.Status == TimeOffStatus.Pending);

            return Ok(count);
        }

        // PUT /api/timeoff/{id}/approve - Approve request (Admin only)
        [HttpPut("{id}/approve")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ApproveTimeOff(int id)
        {
            var timeOff = await _context.TimeOffs.FindAsync(id);
            if (timeOff == null)
                return NotFound("Time off request not found.");

            if (timeOff.Status != TimeOffStatus.Pending)
                return BadRequest("Only pending requests can be approved.");

            var userId = GetCurrentUserId();
            
            timeOff.Status = TimeOffStatus.Approved;
            timeOff.ApprovedByAdminId = userId;
            timeOff.UpdatedAt = DateTime.UtcNow;
            timeOff.IsViewedByStaff = false; // Notify staff

            await _context.SaveChangesAsync();

            return Ok(new { message = "Time off request approved successfully." });
        }

        // PUT /api/timeoff/{id}/reject - Reject request (Admin only)
        [HttpPut("{id}/reject")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RejectTimeOff(int id)
        {
            var timeOff = await _context.TimeOffs.FindAsync(id);
            if (timeOff == null)
                return NotFound("Time off request not found.");

            if (timeOff.Status != TimeOffStatus.Pending)
                return BadRequest("Only pending requests can be rejected.");

            var userId = GetCurrentUserId();
            
            timeOff.Status = TimeOffStatus.Rejected;
            timeOff.ApprovedByAdminId = userId;
            timeOff.UpdatedAt = DateTime.UtcNow;
            timeOff.IsViewedByStaff = false; // Notify staff

            await _context.SaveChangesAsync();

            return Ok(new { message = "Time off request rejected." });
        }

        // DELETE /api/timeoff/{id} - Delete time off
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimeOff(int id)
        {
            var timeOff = await _context.TimeOffs.FindAsync(id);
            if (timeOff == null) return NotFound();

            // Authorization: Staff can only delete their own pending requests
            var userRole = GetCurrentUserRole();
            var userId = GetCurrentUserId();

            if (userRole == "Staff")
            {
                if (!userId.HasValue || userId.Value != timeOff.StaffId)
                    return Forbid();

                if (timeOff.Status != TimeOffStatus.Pending)
                    return BadRequest("Staff can only delete pending requests.");
            }

            _context.TimeOffs.Remove(timeOff);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Time off deleted." });
        }

        // PUT /api/timeoff/{id} - Update time off
        [HttpPut("{id}")]
        public async Task<ActionResult<TimeOffResponseDto>> UpdateTimeOff(int id, [FromBody] CreateTimeOffDto dto)
        {
            var timeOff = await _context.TimeOffs
                .Include(t => t.Staff)
                .FirstOrDefaultAsync(t => t.Id == id);
                
            if (timeOff == null)
                return NotFound("Time off not found.");

            // Authorization
            var userRole = GetCurrentUserRole();
            var userId = GetCurrentUserId();

            if (userRole == "Staff" && userId.HasValue && userId.Value != timeOff.StaffId)
            {
                return Forbid();
            }

            // Check for overlaps (excluding this time off)
            var hasOverlap = await _context.TimeOffs
                .AnyAsync(t => t.Id != id &&
                               t.StaffId == dto.StaffId &&
                               t.Status != TimeOffStatus.Rejected &&
                               t.StartDateTimeUtc < dto.EndDateTimeUtc &&
                               t.EndDateTimeUtc > dto.StartDateTimeUtc);
            
            if (hasOverlap)
            {
                return BadRequest("This time off period overlaps with an existing record for the staff member.");
            }

            // Update fields
            timeOff.StartDateTimeUtc = dto.StartDateTimeUtc;
            timeOff.EndDateTimeUtc = dto.EndDateTimeUtc;
            timeOff.Reason = dto.Reason;
            timeOff.IsFullDay = dto.IsFullDay;
            timeOff.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Reload with navigation properties
            var updated = await _context.TimeOffs
                .Include(t => t.Staff)
                .Include(t => t.ApprovedByAdmin)
                .FirstOrDefaultAsync(t => t.Id == id);

            return Ok(MapToDto(updated!));
        }

        // GET /api/timeoff/check-conflicts - Check for appointment conflicts
        [HttpGet("check-conflicts")]
        public async Task<ActionResult<object>> CheckConflicts(
            [FromQuery] int staffId,
            [FromQuery] DateTime startDateTimeUtc,
            [FromQuery] DateTime endDateTimeUtc)
        {
            // Find appointments that overlap with the time off period
            var conflictingAppointments = await _context.Appointments
                .Include(a => a.Customer)
                .Include(a => a.Service)
                .Where(a => a.StaffId == staffId &&
                           a.Status != AppointmentStatus.Cancelled &&
                           a.StartDateTimeUtc < endDateTimeUtc &&
                           a.EndDateTimeUtc > startDateTimeUtc)
                .Select(a => new
                {
                    a.Id,
                    StartDateTimeUtc = a.StartDateTimeUtc,
                    EndDateTimeUtc = a.EndDateTimeUtc,
                    CustomerName = a.Customer != null ? $"{a.Customer.FirstName} {a.Customer.LastName}" : "Unknown",
                    ServiceName = a.Service != null ? a.Service.Name : "Unknown"
                })
                .ToListAsync();

            return Ok(new
            {
                hasConflicts = conflictingAppointments.Any(),
                conflictCount = conflictingAppointments.Count,
                conflicts = conflictingAppointments
            });
        }

        // GET /api/timeoff/counts - Get badge counts
        [HttpGet("counts")]
        public async Task<ActionResult<object>> GetBadgeCounts()
        {
            var userRole = GetCurrentUserRole();
            var userId = GetCurrentUserId();
            
            int staffBadgeCount = 0;
            int adminBadgeCount = 0;

            if (userId.HasValue)
            {
                // Staff Badge: Count updates not viewed by staff
                staffBadgeCount = await _context.TimeOffs
                    .CountAsync(t => t.StaffId == userId.Value && !t.IsViewedByStaff);
            }

            if (userRole == "Admin")
            {
                 // Admin Badge: Count ALL requests (Pending, Approved, Rejected) that haven't been viewed by admin yet
                 adminBadgeCount = await _context.TimeOffs
                    .CountAsync(t => !t.IsViewedByAdmin);
            }

            return Ok(new { staffBadgeCount, adminBadgeCount });
        }

        // POST /api/timeoff/mark-seen - Mark requests as seen
        [HttpPost("mark-seen")]
        public async Task<IActionResult> MarkSeen()
        {
            var userRole = GetCurrentUserRole();
            var userId = GetCurrentUserId();
            if (!userId.HasValue) return Unauthorized();

            if (userRole == "Admin")
            {
                // Mark all as viewed by admin
                var unseen = await _context.TimeOffs
                    .Where(t => !t.IsViewedByAdmin)
                    .ToListAsync();
                
                foreach (var t in unseen)
                {
                    t.IsViewedByAdmin = true;
                }
            }
            
            // Also mark staff notifications as seen for this user
            var unseenStaff = await _context.TimeOffs
                .Where(t => t.StaffId == userId.Value && !t.IsViewedByStaff)
                .ToListAsync();

            foreach (var t in unseenStaff)
            {
                t.IsViewedByStaff = true;
            }

            if (unseenStaff.Any() || (userRole == "Admin")) // Optimization: Only save if changed
            {
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        // Helper method to map entity to DTO
        private TimeOffResponseDto MapToDto(TimeOff timeOff)
        {
            return new TimeOffResponseDto
            {
                Id = timeOff.Id,
                StaffId = timeOff.StaffId,
                StaffName = timeOff.Staff != null ? $"{timeOff.Staff.FirstName} {timeOff.Staff.LastName}" : null,
                StartDateTimeUtc = timeOff.StartDateTimeUtc,
                EndDateTimeUtc = timeOff.EndDateTimeUtc,
                Reason = timeOff.Reason,
                IsFullDay = timeOff.IsFullDay,
                Status = timeOff.Status.ToString(),
                ApprovedByAdminId = timeOff.ApprovedByAdminId,
                ApprovedByAdminName = timeOff.ApprovedByAdmin != null ? $"{timeOff.ApprovedByAdmin.FirstName} {timeOff.ApprovedByAdmin.LastName}" : null,
                CreatedAt = timeOff.CreatedAt
            };
        }
    }
}
