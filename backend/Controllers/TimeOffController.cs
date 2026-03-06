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

        private int GetCurrentCompanyId()
        {
            var claim = User.FindFirst("companyId");
            if (claim != null && int.TryParse(claim.Value, out int id))
                return id;
            return 0; // Should handle this appropriately, maybe throw exception if strict
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
            var companyId = GetCurrentCompanyId();

            // Verify staff belongs to the company
            if (staff.CompanyId != companyId && companyId != 0)
            {
                return Forbid();
            }

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
                return BadRequest("You have one or more appointments booked on these dates. Please resolve them before adding time off.");
            }

            // Get company settings for approval requirement
            var company = await _context.Companies.FindAsync(staff.CompanyId);

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

            var dtoList = await MapListToDtoAsync(new[] { created! });
            return CreatedAtAction(nameof(GetTimeOffByStaff), new { staffId = dto.StaffId }, dtoList.First());
        }

        // GET /api/timeoff/staff/{staffId} - Get time-offs for specific staff
        [HttpGet("staff/{staffId}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<TimeOffResponseDto>>> GetTimeOffByStaff(int staffId)
        {
            // Authorization: Staff can only view their own
            var userRole = GetCurrentUserRole();
            var userId = GetCurrentUserId();
            var companyId = GetCurrentCompanyId();

            if (userRole == "Staff" && userId.HasValue && userId.Value != staffId)
            {
                return Forbid();
            }

            // If Admin, verify staff belongs to company
            if (userRole == "Admin")
            {
                 var staff = await _context.Staff.FindAsync(staffId);
                 if (staff == null) return NotFound();
                 if (staff.CompanyId != companyId && companyId != 0) return Forbid();
            }

            var list = await _context.TimeOffs
                .Include(t => t.Staff)
                .Include(t => t.ApprovedByAdmin)
                .Where(t => t.StaffId == staffId)
                .OrderByDescending(t => t.StartDateTimeUtc)
                .ToListAsync();

            return Ok(await MapListToDtoAsync(list));
        }

        // GET /api/timeoff/all - Get all time-offs (Admin only)
        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<TimeOffResponseDto>>> GetAllTimeOffs()
        {
            var companyId = GetCurrentCompanyId();
            if (companyId == 0) return Forbid();

            var list = await _context.TimeOffs
                .Include(t => t.Staff)
                .Include(t => t.ApprovedByAdmin)
                .Where(t => t.Staff.CompanyId == companyId)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return Ok(await MapListToDtoAsync(list));
        }

        // GET /api/timeoff/pending - Get pending requests (Admin only)
        [HttpGet("pending")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<TimeOffResponseDto>>> GetPendingTimeOffs()
        {
            var companyId = GetCurrentCompanyId();
            if (companyId == 0) return Forbid();

            var list = await _context.TimeOffs
                .Include(t => t.Staff)
                .Where(t => t.Status == TimeOffStatus.Pending && t.Staff.CompanyId == companyId)
                .OrderByDescending(t => t.CreatedAt) // Newest first
                .ToListAsync();

            return Ok(await MapListToDtoAsync(list));
        }

        // GET /api/timeoff/pending/count - Get count of pending requests (Admin only)
        [HttpGet("pending/count")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<int>> GetPendingTimeOffCount()
        {
            var companyId = GetCurrentCompanyId();
            if (companyId == 0) return Forbid();

            var count = await _context.TimeOffs
                .CountAsync(t => t.Status == TimeOffStatus.Pending && t.Staff.CompanyId == companyId);

            return Ok(count);
        }

        // PUT /api/timeoff/{id}/approve - Approve request (Admin only)
        [HttpPut("{id}/approve")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ApproveTimeOff(int id)
        {
            var companyId = GetCurrentCompanyId();
            
            var timeOff = await _context.TimeOffs
                .Include(t => t.Staff)
                .FirstOrDefaultAsync(t => t.Id == id);
                
            if (timeOff == null)
                return NotFound("Time off request not found.");
                
            if (timeOff.Staff.CompanyId != companyId && companyId != 0)
                return Forbid();

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
            var companyId = GetCurrentCompanyId();

            var timeOff = await _context.TimeOffs
                .Include(t => t.Staff)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (timeOff == null)
                return NotFound("Time off request not found.");

            if (timeOff.Staff.CompanyId != companyId && companyId != 0)
                return Forbid();

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
            var timeOff = await _context.TimeOffs
                .Include(t => t.Staff)
                .FirstOrDefaultAsync(t => t.Id == id);
                
            if (timeOff == null) return NotFound();

            // Authorization: Staff can only delete their own pending requests
            var userRole = GetCurrentUserRole();
            var userId = GetCurrentUserId();
            var companyId = GetCurrentCompanyId();

            if (userRole == "Staff")
            {
                if (!userId.HasValue || userId.Value != timeOff.StaffId)
                    return Forbid();

                if (timeOff.Status != TimeOffStatus.Pending)
                    return BadRequest("Staff can only delete pending requests.");
            }
            else if (userRole == "Admin")
            {
                // Admin can only delete from their company
                 if (timeOff.Staff.CompanyId != companyId && companyId != 0)
                    return Forbid();
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
            var companyId = GetCurrentCompanyId();

            if (userRole == "Staff" && userId.HasValue && userId.Value != timeOff.StaffId)
            {
                return Forbid();
            }
            
            if (userRole == "Admin" && timeOff.Staff.CompanyId != companyId && companyId != 0)
            {
                return Forbid();
            }
            
            // Note: We should technically verify that the new StaffId (dto.StaffId) also belongs to the company if it's changing,
            // but typical UI doesn't allow changing staffId on edit.

            // Check for overlaps (excluding this time off)
            var hasOverlap = await _context.TimeOffs
                .AnyAsync(t => t.Id != id &&
                               t.StaffId == dto.StaffId &&
                               t.Status != TimeOffStatus.Rejected &&
                               t.StartDateTimeUtc < dto.EndDateTimeUtc &&
                               t.EndDateTimeUtc > dto.StartDateTimeUtc);
            
            if (hasOverlap)
            {
                return BadRequest("You have one or more appointments booked on these dates. Please resolve them before adding time off.");
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

            var dtoList = await MapListToDtoAsync(new[] { updated! });
            return Ok(dtoList.First());
        }

        // GET /api/timeoff/check-conflicts - Check for appointment conflicts
        [HttpGet("check-conflicts")]
        public async Task<ActionResult<object>> CheckConflicts(
            [FromQuery] int staffId,
            [FromQuery] DateTime startDateTimeUtc,
            [FromQuery] DateTime endDateTimeUtc)
        {
            var companyId = GetCurrentCompanyId();
            
            // Verify staff belongs to company
            var staff = await _context.Staff.FindAsync(staffId);
            if (staff == null) return NotFound("Staff not found");
            if (staff.CompanyId != companyId && companyId != 0) return Forbid();

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
            var companyId = GetCurrentCompanyId();
            
            int staffBadgeCount = 0;
            int adminBadgeCount = 0;

            if (userId.HasValue)
            {
                // Staff Badge: Count updates not viewed by staff
                staffBadgeCount = await _context.TimeOffs
                    .CountAsync(t => t.StaffId == userId.Value && !t.IsViewedByStaff);
            }

            if (userRole == "Admin" && companyId != 0)
            {
                 // Admin Badge: Count ALL requests (Pending, Approved, Rejected) that haven't been viewed by admin yet
                 // Filtered by company
                 adminBadgeCount = await _context.TimeOffs
                    .Include(t => t.Staff)
                    .Where(t => t.Staff.CompanyId == companyId)
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
            var companyId = GetCurrentCompanyId();
            
            if (!userId.HasValue) return Unauthorized();

            if (userRole == "Admin" && companyId != 0)
            {
                // Mark all as viewed by admin, FILTERED BY COMPANY
                var unseen = await _context.TimeOffs
                    .Include(t => t.Staff)
                    .Where(t => !t.IsViewedByAdmin && t.Staff.CompanyId == companyId)
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

        // Helper method to bulk map list and compute conflict status dynamically
        private async Task<IEnumerable<TimeOffResponseDto>> MapListToDtoAsync(IEnumerable<TimeOff> timeOffs)
        {
            var timeOffsList = timeOffs.ToList();
            if (!timeOffsList.Any()) return Enumerable.Empty<TimeOffResponseDto>();

            var dtos = timeOffsList.Select(MapToDto).ToList();

            // Only compute conflicts for pending or approved time offs (not rejected ones)
            var activeTimeOffs = timeOffsList.Where(t => t.Status != TimeOffStatus.Rejected).ToList();
            if (!activeTimeOffs.Any()) return dtos;

            // Get all staff IDs involved
            var staffIds = activeTimeOffs.Select(t => t.StaffId).Distinct().ToList();

            // Find min start and max end to optimize querying appointments
            var minStart = activeTimeOffs.Min(t => t.StartDateTimeUtc);
            var maxEnd = activeTimeOffs.Max(t => t.EndDateTimeUtc);

            // Fetch potentially overlapping appointments for these staff in this range
            var potentialConflicts = await _context.Appointments
                .Where(a => a.StaffId != null && staffIds.Contains(a.StaffId.Value) &&
                            a.Status != AppointmentStatus.Cancelled &&
                            a.StartDateTimeUtc < maxEnd &&
                            a.EndDateTimeUtc > minStart)
                .Select(a => new { a.Id, a.StaffId, a.StartDateTimeUtc, a.EndDateTimeUtc })
                .ToListAsync();

            // Map conflicts per time off
            foreach (var dto in dtos)
            {
                var timeOff = activeTimeOffs.FirstOrDefault(t => t.Id == dto.Id);
                if (timeOff != null)
                {
                    dto.HasConflicts = potentialConflicts.Any(a => 
                        a.StaffId == dto.StaffId && 
                        a.StartDateTimeUtc < dto.EndDateTimeUtc && 
                        a.EndDateTimeUtc > dto.StartDateTimeUtc);
                }
            }

            return dtos;
        }
    }
}
