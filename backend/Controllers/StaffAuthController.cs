using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs.Auth;
using Appointmentbookingsystem.Backend.Models.Entities;
using Appointmentbookingsystem.Backend.Services;
using Appointmentbookingsystem.Backend.Exceptions;
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
            // Validate required fields
            if (string.IsNullOrWhiteSpace(dto.Email))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Email is required.", "email");
            
            if (string.IsNullOrWhiteSpace(dto.Password))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Password is required.", "password");
            
            if (dto.Password.Length < 6)
                throw new ValidationException(ValidationErrors.PASSWORD_TOO_SHORT, "Password must be at least 6 characters.", "password");
            
            if (string.IsNullOrWhiteSpace(dto.FirstName))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "First name is required.", "firstName");
            
            if (string.IsNullOrWhiteSpace(dto.LastName))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Last name is required.", "lastName");

            // 1. Validate Invite Token
            if (string.IsNullOrWhiteSpace(dto.InviteToken))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Registration requires a valid invitation link.", "inviteToken");

            var invite = await _context.StaffInvites.FirstOrDefaultAsync(i => i.Token == dto.InviteToken);
            
            if (invite == null)
                throw new BusinessRuleException(BusinessErrors.INVALID_INVITE, "Invalid invitation token.");
            if (invite.IsUsed)
                throw new BusinessRuleException(BusinessErrors.INVITE_ALREADY_USED, "This invitation has already been used.");
            if (invite.ExpiresAt < DateTime.UtcNow)
                throw new BusinessRuleException(BusinessErrors.INVITE_EXPIRED, "This invitation has expired.");

            // 2. Validate Email Restriction (if set)
            if (!string.IsNullOrEmpty(invite.Email) && !dto.Email.Trim().Equals(invite.Email.Trim(), StringComparison.OrdinalIgnoreCase))
                throw new ValidationException(ValidationErrors.INVALID_EMAIL, $"This invitation is valid only for {invite.Email}.", "email");

            int companyId = invite.CompanyId;

            // 3. Verify company exists
            var company = await _context.Companies.FindAsync(companyId);
            if (company == null)
                throw new NotFoundException(NotFoundErrors.COMPANY_NOT_FOUND, "Invalid company associated with this invite.");

            if (!company.IsActive)
                throw new BusinessRuleException(AuthorizationErrors.ACCOUNT_INACTIVE, "This company is not active.");

            var normalizedEmail = dto.Email.Trim().ToLowerInvariant();

            // Check for duplicate email globally
            if (await _context.Staff.AnyAsync(s => s.Email.ToLower() == normalizedEmail))
                throw new ConflictException(BusinessErrors.DUPLICATE_EMAIL, "Email already in use.", "email");

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var staff = new Staff
            {
                CompanyId = companyId,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = normalizedEmail,
                PasswordHash = passwordHash,
                IsActive = true // Staff is active immediately upon valid invite
            };

            // 4. Consume Token
            invite.IsUsed = true;

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
            // Validate required fields
            if (string.IsNullOrWhiteSpace(dto.Email))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Email is required.", "email");
            
            if (string.IsNullOrWhiteSpace(dto.Password))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Password is required.", "password");

            var normalizedEmail = dto.Email.Trim().ToLowerInvariant();

            var staff = await _context.Staff
                .Include(s => s.Company)
                .FirstOrDefaultAsync(s => s.Email.ToLower() == normalizedEmail);

            if (staff == null || !BCrypt.Net.BCrypt.Verify(dto.Password, staff.PasswordHash))
                throw new UnauthorizedException(AuthorizationErrors.INVALID_CREDENTIALS, "Invalid email or password.");

            if (!staff.IsActive)
                throw new UnauthorizedException(AuthorizationErrors.ACCOUNT_INACTIVE, "This account has been deactivated.");

            if (!staff.Company.IsActive)
                throw new UnauthorizedException(AuthorizationErrors.ACCOUNT_INACTIVE, "This company has been deactivated.");

            var token = _jwt.GenerateToken(
                staff.Id,
                $"{staff.FirstName} {staff.LastName}",
                staff.Email,
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
