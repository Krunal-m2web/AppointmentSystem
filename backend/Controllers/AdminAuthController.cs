using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs.Auth;
using Appointmentbookingsystem.Backend.Models.Entities;
using Appointmentbookingsystem.Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [ApiController]
    [Route("api/auth/admin")]
    public class AdminAuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtTokenService _jwt;

        public AdminAuthController(AppDbContext context, IJwtTokenService jwt)
        {
            _context = context;
            _jwt = jwt;
        }

        /// <summary>
        /// Register a new admin with a new company.
        /// This creates both the company and the first admin user.
        /// </summary>
        [HttpPost("register")]
        public async Task<IActionResult> Register(AdminRegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var normalizedEmail = dto.Email.Trim().ToLowerInvariant();
            var normalizedCompanyName = dto.CompanyName.Trim().ToLowerInvariant();

            // Check if company name already exists
            if (await _context.Companies.AnyAsync(c => c.CompanyName.ToLower() == normalizedCompanyName))
                return BadRequest("Company already exists");

            // Check if email already exists in Users
            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == normalizedEmail))
                return BadRequest("This email is used by other company");

            // Check if company email already exists
            var normalizedCompanyEmail = normalizedEmail; // Using same email for company
            if (await _context.Companies.AnyAsync(c => c.Email.ToLower() == normalizedCompanyEmail))
                return BadRequest("This email is used by other company");

            // Create the company first
            var company = new Company
            {
                CompanyName = dto.CompanyName,
                Email = normalizedEmail,
                Phone = dto.CompanyPhone,
                Address = dto.CompanyAddress,
                Country = dto.CompanyCountry,
                Currency = dto.Currency,
                IsActive = true
            };

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            // Create the admin user
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                CompanyId = company.Id,
                Email = normalizedEmail,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                PasswordHash = passwordHash,
                Phone = dto.UserPhone,
                Country = dto.UserCountry,
                Position = "Owner",
                IsActive = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Update company with the created UserId
            company.UserId = user.Id;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Admin registered successfully.",
                CompanyId = company.Id,
                UserId = user.Id
            });
        }

        /// <summary>
        /// Admin login - returns JWT token
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login(AdminLoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var normalizedEmail = dto.Email.Trim().ToLowerInvariant();

            var user = await _context.Users
                .Include(u => u.Company)
                .FirstOrDefaultAsync(u => u.Email.ToLower() == normalizedEmail);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Invalid email or password.");

            if (!user.IsActive)
                return Unauthorized("This account has been deactivated.");

            if (!user.Company.IsActive)
                return Unauthorized("This company has been deactivated.");

            var token = _jwt.GenerateToken(
                user.Id,
                $"{user.FirstName} {user.LastName}",
                "Admin",
                user.CompanyId
            );

            return Ok(new AuthResponseDto
            {
                Token = token,
                Email = user.Email,
                Name = $"{user.FirstName} {user.LastName}",
                Role = "admin",
                CompanyId = user.CompanyId,
                CompanyName = user.Company.CompanyName
            });
        }
    }
}
