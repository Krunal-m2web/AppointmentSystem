using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs.Auth;
using Appointmentbookingsystem.Backend.Models.Entities;
using Appointmentbookingsystem.Backend.Services;
using Appointmentbookingsystem.Backend.Helpers;
using Appointmentbookingsystem.Backend.Exceptions;
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
            // Validate required fields
            if (string.IsNullOrWhiteSpace(dto.Email))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Email is required.", "email");
            
            if (string.IsNullOrWhiteSpace(dto.Password))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Password is required.", "password");
            
            if (dto.Password.Length < 6)
                throw new ValidationException(ValidationErrors.PASSWORD_TOO_SHORT, "Password must be at least 6 characters.", "password");
            
            if (string.IsNullOrWhiteSpace(dto.CompanyName))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Company name is required.", "companyName");

            if (string.IsNullOrWhiteSpace(dto.FirstName))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "First name is required.", "firstName");
            if (dto.FirstName.Length < 3)
                throw new ValidationException(ValidationErrors.INVALID_FORMAT, "First name must be at least 3 characters.", "firstName");

            if (string.IsNullOrWhiteSpace(dto.LastName))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Last name is required.", "lastName");
            if (dto.LastName.Length < 3)
                throw new ValidationException(ValidationErrors.INVALID_FORMAT, "Last name must be at least 3 characters.", "lastName");

            var normalizedEmail = dto.Email.Trim().ToLowerInvariant();
            var normalizedCompanyName = dto.CompanyName.Trim().ToLowerInvariant();

            // Check if company name already exists
            if (await _context.Companies.AnyAsync(c => c.CompanyName.ToLower() == normalizedCompanyName))
                throw new ConflictException(BusinessErrors.DUPLICATE_COMPANY_NAME, "Company name already exists. Please choose a different name.", "companyName");

            // Check if email already exists in Users
            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == normalizedEmail))
                throw new ConflictException(BusinessErrors.DUPLICATE_EMAIL, "This email is already registered.", "email");

            // Check if company email already exists
            if (await _context.Companies.AnyAsync(c => c.Email.ToLower() == normalizedEmail))
                throw new ConflictException(BusinessErrors.DUPLICATE_EMAIL, "This company email is already registered.", "email");

            // Generate unique slug
            var baseSlug = SlugHelper.GenerateSlug(dto.CompanyName);
            if (string.IsNullOrEmpty(baseSlug)) baseSlug = "company";
            
            var slug = baseSlug;
            var counter = 1;
            while (await _context.Companies.AnyAsync(c => c.Slug == slug))
            {
                slug = $"{baseSlug}-{counter}";
                counter++;
            }

            // Create the company first
            var company = new Company
            {
                CompanyName = dto.CompanyName,
                Slug = slug,
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
            // Validate required fields
            if (string.IsNullOrWhiteSpace(dto.Email))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Email is required.", "email");
            
            if (string.IsNullOrWhiteSpace(dto.Password))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Password is required.", "password");

            var normalizedEmail = dto.Email.Trim().ToLowerInvariant();

            var user = await _context.Users
                .Include(u => u.Company)
                .FirstOrDefaultAsync(u => u.Email.ToLower() == normalizedEmail);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                throw new UnauthorizedException(AuthorizationErrors.INVALID_CREDENTIALS, "Invalid email or password.");

            if (!user.IsActive)
                throw new UnauthorizedException(AuthorizationErrors.ACCOUNT_INACTIVE, "This account has been deactivated.");

            if (!user.Company.IsActive)
                throw new UnauthorizedException(AuthorizationErrors.ACCOUNT_INACTIVE, "This company has been deactivated.");

            var token = _jwt.GenerateToken(
                user.Id,
                $"{user.FirstName} {user.LastName}",
                user.Email,
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

        /// <summary>
        /// Change admin password
        /// </summary>
        [HttpPost("change-password")]
        [Microsoft.AspNetCore.Authorization.Authorize]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.CurrentPassword))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Current password is required.", "currentPassword");
            
            if (string.IsNullOrWhiteSpace(dto.NewPassword))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "New password is required.", "newPassword");
            
            if (dto.NewPassword.Length < 6)
                throw new ValidationException(ValidationErrors.PASSWORD_TOO_SHORT, "Password must be at least 6 characters.", "newPassword");

            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                throw new UnauthorizedException(AuthorizationErrors.TOKEN_INVALID, "Invalid user token.");

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new NotFoundException(NotFoundErrors.USER_NOT_FOUND, "User not found.");

            if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
                throw new ValidationException(ValidationErrors.INVALID_FORMAT, "Incorrect current password.", "currentPassword");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Password changed successfully." });
        }
    }
}
