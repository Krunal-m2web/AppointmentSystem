using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs.Staff;
using Appointmentbookingsystem.Backend.Models.Entities;
using Appointmentbookingsystem.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [Route("api/staff")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StaffController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// POST /api/staff - Create a new staff member (Admin only)
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<StaffResponseDto>> CreateStaff([FromBody] CreateStaffDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Verify company exists
            var company = await _context.Companies.FindAsync(dto.CompanyId);
            if (company == null)
                return BadRequest("Invalid company ID.");

            // Check for duplicate email globally (across all companies)
            bool emailExists = await _context.Staff
                .AnyAsync(s => s.Email.ToLower() == dto.Email.ToLower());

            if (emailExists)
                return BadRequest("Email already exists in the system.");

            // Hash Password
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            // Create staff object
            var staff = new Staff
            {
                CompanyId = dto.CompanyId,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email.ToLowerInvariant(),
                Phone = dto.Phone,
                Address = dto.Address,
                PasswordHash = hashedPassword,
                Notes = dto.Notes,
                IsActive = true
            };

            _context.Staff.Add(staff);
            await _context.SaveChangesAsync();

            // Assign services if provided
            if (dto.ServiceIds != null && dto.ServiceIds.Any())
            {
                var services = await _context.Services
                    .Where(s => s.CompanyId == dto.CompanyId && dto.ServiceIds.Contains(s.Id) && s.IsActive)
                    .ToListAsync();

                foreach (var service in services)
                {
                    var staffService = new StaffService
                    {
                        StaffId = staff.Id,
                        ServiceId = service.Id,
                        IsActive = true
                    };
                    _context.StaffServices.Add(staffService);
                }
                await _context.SaveChangesAsync();
            }

            

            return CreatedAtAction(
                nameof(GetStaffById),
                new { id = staff.Id },
                await BuildStaffResponseDto(staff.Id)
            );
        }

        /// <summary>
        /// GET /api/staff - Get all staff members for a company
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StaffResponseDto>>> GetAllStaff([FromQuery] int? companyId)
        {
            var query = _context.Staff
                .Include(s => s.StaffServices)
                    .ThenInclude(ss => ss.Service)
                .AsQueryable();

            if (companyId.HasValue)
            {
                query = query.Where(s => s.CompanyId == companyId.Value);
            }

            var staffMembers = await query.ToListAsync();

            var response = staffMembers.Select(s => new StaffResponseDto
            {
                Id = s.Id,
                CompanyId = s.CompanyId,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Email = s.Email,
                Phone = s.Phone,
                Address = s.Address,
                IsActive = s.IsActive,
                Notes = s.Notes,
                Services = s.StaffServices.Select(ss => new StaffServiceInfoDto
                {
                    Id = ss.Id,
                    ServiceId = ss.ServiceId,
                    ServiceName = ss.Service.Name,
                    CustomPrice = ss.CustomPrice,
                    CustomDuration = ss.CustomDuration,
                    EffectivePrice = ss.CustomPrice ?? ss.Service.Price,
                    EffectiveDuration = ss.CustomDuration ?? ss.Service.ServiceDuration,
                    IsActive = ss.IsActive,
                    CreatedAt = ss.CreatedAt
                }).ToList(),
                CreatedAt = s.CreatedAt,
                UpdatedAt = s.UpdatedAt
            }).ToList();

            return Ok(response);
        }

        /// <summary>
        /// GET /api/staff/{id} - Get a specific staff member
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<StaffResponseDto>> GetStaffById(int id)
        {
            var response = await BuildStaffResponseDto(id);
            if (response == null)
                return NotFound($"Staff with ID {id} not found.");

            return Ok(response);
        }

        /// <summary>
        /// GET /api/staff/by-service/{serviceId} - Get staff members for a specific service
        /// </summary>
        [HttpGet("by-service/{serviceId:int}")]
        public async Task<ActionResult<IEnumerable<StaffMemberDto>>> GetStaffByService(int serviceId)
        {
            var serviceExists = await _context.Services
                .AnyAsync(s => s.Id == serviceId && s.IsActive);

            if (!serviceExists)
                return NotFound($"Service with ID {serviceId} not found or is inactive.");

            var staffMembers = await _context.StaffServices
                .Where(ss => ss.ServiceId == serviceId && ss.IsActive && ss.Staff.IsActive)
                .Select(ss => new StaffMemberDto
                {
                    Id = ss.Staff.Id,
                    FirstName = ss.Staff.FirstName,
                    LastName = ss.Staff.LastName,
                    FullName = ss.Staff.FirstName + " " + ss.Staff.LastName
                })
                .Distinct()
                .ToListAsync();

            return Ok(staffMembers);
        }

        /// <summary>
        /// PUT /api/staff/{id} - Update a staff member
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<IActionResult> UpdateStaff(int id, [FromBody] UpdateStaffDto dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
               return BadRequest(ModelState);

            }

            var staff = await _context.Staff
                .Include(s => s.StaffServices)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (staff == null)
                return NotFound($"Staff with ID {id} not found.");

            // Check authorization: Staff can only update their own profile
            var userRole = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value;
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;

            if (userRole == "Staff" && userId != null && int.Parse(userId) != id)
            {
                return Forbid(); // Staff can only update their own profile
            }

            // Update fields if provided
            if (dto.FirstName != null) staff.FirstName = dto.FirstName;
            if (dto.LastName != null) staff.LastName = dto.LastName;
            if (dto.Phone != null) staff.Phone = dto.Phone;
            if (dto.Address != null) staff.Address = dto.Address;
            if (dto.Notes != null) staff.Notes = dto.Notes;
            if (dto.IsActive.HasValue) staff.IsActive = dto.IsActive.Value;

            // Update Password if provided
            if (!string.IsNullOrEmpty(dto.Password))
            {
                staff.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            }

            // Update email with duplicate check
            if (dto.Email != null && staff.Email != dto.Email.ToLowerInvariant())
            {
                // Check for duplicate email globally
                bool emailExists = await _context.Staff
                    .AnyAsync(s => s.Email.ToLower() == dto.Email.ToLower() && 
                                   s.Id != id);

                if (emailExists)
                    return BadRequest("Email already exists in the system.");

                staff.Email = dto.Email.ToLowerInvariant();
            }

            // Update Services if provided
            if (dto.ServiceIds != null)
            {
                // Remove existing staff services
                _context.StaffServices.RemoveRange(staff.StaffServices);

                // Add new staff services
                if (dto.ServiceIds.Any())
                {
                    var services = await _context.Services
                        .Where(s => s.CompanyId == staff.CompanyId && dto.ServiceIds.Contains(s.Id) && s.IsActive)
                        .ToListAsync();

                    foreach (var service in services)
                    {
                        var staffService = new StaffService
                        {
                            StaffId = staff.Id,
                            ServiceId = service.Id,
                            IsActive = true
                        };
                        _context.StaffServices.Add(staffService);
                    }
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Database error: {ex.InnerException?.Message ?? ex.Message}");
            }

            return Ok(await BuildStaffResponseDto(id));
        }

        /// <summary>
        /// DELETE /api/staff/{id} - Soft delete a staff member
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteStaff(int id)
        {
            var staff = await _context.Staff
                .Include(s => s.Appointments)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (staff == null)
                return NotFound($"Staff with ID {id} not found.");

            // Check if staff has future appointments
            var hasFutureAppointments = staff.Appointments
                .Any(a => a.StartDateTimeUtc > DateTime.UtcNow && a.Status != AppointmentStatus.Cancelled);

            if (hasFutureAppointments)
            {
                return BadRequest("Cannot delete staff member with future appointments. Please reassign or cancel their appointments first.");
            }

            // Soft delete
            staff.IsActive = false;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Staff member deactivated successfully." });
        }

        /// <summary>
        /// DELETE /api/staff/{id}/permanent - Permanently delete a staff member
        /// </summary>
        [HttpDelete("{id}/permanent")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PermanentDeleteStaff(int id)
        {
            var staff = await _context.Staff
                .Include(s => s.Appointments)
                .Include(s => s.StaffServices)
                .Include(s => s.Availabilities)
                .Include(s => s.TimeOffs)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (staff == null)
                return NotFound($"Staff with ID {id} not found.");

            if (staff.Appointments.Any())
            {
                return BadRequest("Cannot permanently delete staff member with appointment history. Use soft delete instead.");
            }

            // Remove all relationships
            _context.StaffServices.RemoveRange(staff.StaffServices);
            _context.Availabilities.RemoveRange(staff.Availabilities);
            _context.TimeOffs.RemoveRange(staff.TimeOffs);
            _context.Staff.Remove(staff);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Staff member permanently deleted." });
        }

        // Helper method to build StaffResponseDto
        private async Task<StaffResponseDto?> BuildStaffResponseDto(int staffId)
        {
            var staff = await _context.Staff
                .Include(s => s.StaffServices)
                    .ThenInclude(ss => ss.Service)
                .FirstOrDefaultAsync(s => s.Id == staffId);

            if (staff == null) return null;

            return new StaffResponseDto
            {
                Id = staff.Id,
                CompanyId = staff.CompanyId,
                FirstName = staff.FirstName,
                LastName = staff.LastName,
                Email = staff.Email,
                Phone = staff.Phone,
                Address = staff.Address,
                IsActive = staff.IsActive,
                Notes = staff.Notes,
                Services = staff.StaffServices.Select(ss => new StaffServiceInfoDto
                {
                    Id = ss.Id,
                    ServiceId = ss.ServiceId,
                    ServiceName = ss.Service.Name,
                    CustomPrice = ss.CustomPrice,
                    CustomDuration = ss.CustomDuration,
                    EffectivePrice = ss.CustomPrice ?? ss.Service.Price,
                    EffectiveDuration = ss.CustomDuration ?? ss.Service.ServiceDuration,
                    IsActive = ss.IsActive,
                    CreatedAt = ss.CreatedAt
                }).ToList(),
                CreatedAt = staff.CreatedAt,
                UpdatedAt = staff.UpdatedAt
            };
        }
    }
}