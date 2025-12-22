using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs.Auth;
using Appointmentbookingsystem.Backend.Models.Entities;
using Appointmentbookingsystem.Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [ApiController]
    [Route("api/auth/staff")]
    public class StaffAuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtTokenService _jwt;

        public StaffAuthController(AppDbContext context, IJwtTokenService jwt)
        {
            _context = context;
            _jwt = jwt;
        }

        /// <summary>
        /// Register a new staff member for an existing company.
        /// Staff registration requires a valid CompanyId.
        /// </summary>
        [HttpPost("register")]
        public async Task<IActionResult> Register(StaffRegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Verify company exists
            var company = await _context.Companies.FindAsync(dto.CompanyId);
            if (company == null)
                return BadRequest("Invalid company ID.");

            if (!company.IsActive)
                return BadRequest("This company is not active.");

            var normalizedEmail = dto.Email.Trim().ToLowerInvariant();

            // Check for duplicate email globally
            if (await _context.Staff.AnyAsync(s => s.Email.ToLower() == normalizedEmail))
                return BadRequest("Email already in use.");

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var staff = new Staff
            {
                CompanyId = dto.CompanyId,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = normalizedEmail,
                PasswordHash = passwordHash,
                IsActive = true
            };

            _context.Staff.Add(staff);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Staff registered successfully.",
                StaffId = staff.Id,
                CompanyId = staff.CompanyId
            });
        }

        /// <summary>
        /// Staff login - returns JWT token with company context
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login(StaffLoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var normalizedEmail = dto.Email.Trim().ToLowerInvariant();

            var staff = await _context.Staff
                .Include(s => s.Company)
                .FirstOrDefaultAsync(s => s.Email.ToLower() == normalizedEmail);

            if (staff == null || !BCrypt.Net.BCrypt.Verify(dto.Password, staff.PasswordHash))
                return Unauthorized("Invalid email or password.");

            if (!staff.IsActive)
                return Unauthorized("This account has been deactivated.");

            if (!staff.Company.IsActive)
                return Unauthorized("This company has been deactivated.");

            var token = _jwt.GenerateToken(
                staff.Id,
                $"{staff.FirstName} {staff.LastName}",
                "Staff",
                staff.CompanyId
            );

            return Ok(new AuthResponseDto
            {
                Token = token,
                Email = staff.Email,
                Name = $"{staff.FirstName} {staff.LastName}",
                Role = "staff",
                CompanyId = staff.CompanyId,
                CompanyName = staff.Company.CompanyName
            });
        }
    }
}
