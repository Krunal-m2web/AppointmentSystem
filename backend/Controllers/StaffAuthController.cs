using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs.Auth;
using Appointmentbookingsystem.Backend.Models.Entities;
using Appointmentbookingsystem.Backend.Services;
using Appointmentbookingsystem.Backend.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/auth/staff")]
    public class StaffAuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtTokenService _jwt;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;

        public StaffAuthController(AppDbContext context, IJwtTokenService jwt, IEmailService emailService, IConfiguration configuration)
        {
            _context = context;
            _jwt = jwt;
            _emailService = emailService;
            _configuration = configuration;
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

        /// <summary>
        /// Admin initiates a password reset link for staff.
        /// </summary>
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Email is required.", "email");

            var staff = await _context.Staff.FirstOrDefaultAsync(s => s.Email.ToLower() == dto.Email.Trim().ToLower());
            if (staff == null)
            {
                // For security, don't reveal if user exists. 
                // However, in this specific context (admin page), we can be more explicit if needed.
                // But let's follow standard practice.
                return Ok(new { Message = "If an account exists with this email, a reset link has been sent." });
            }

            // Generate token
            var token = Guid.NewGuid().ToString("N");
            var resetToken = new PasswordResetToken
            {
                Email = staff.Email,
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddHours(1),
                UserRole = "Staff"
            };

            _context.PasswordResetTokens.Add(resetToken);
            await _context.SaveChangesAsync();

            // Send email
            var frontendUrl = _configuration["AppSettings:FrontendUrl"] ?? "http://localhost:3000"; 
            var resetLink = $"{frontendUrl}/auth/staff/reset-password?token={token}";

            var emailBody = $@"
                <div style='font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;'>
                    <h2 style='color: #1f2937; font-size: 22px; margin-bottom: 16px; font-weight: bold;'>Reset Your Password</h2>
                    <p style='color: #4b5563; line-height: 1.6; margin-bottom: 24px; font-size: 16px;'>
                        Hello {staff.FirstName},<br/><br/>
                        A password reset was requested for your staff account. Please click the button below to set a new password. This link will expire in 1 hour.
                    </p>
                    <div style='text-align: center; margin: 32px 0;'>
                        <a href='{resetLink}' style='display: inline-block; padding: 14px 28px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06);'>Reset Password</a>
                    </div>
                    <p style='color: #6b7280; font-size: 14px; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 16px; line-height: 1.4;'>
                        If the button above doesn't work, copy and paste this link into your browser:<br/>
                        <span style='color: #4f46e5; word-break: break-all;'>{resetLink}</span>
                    </p>
                    <p style='color: #9ca3af; font-size: 13px; margin-top: 24px; font-style: italic;'>
                        If you didn't request this, you can safely ignore this email.
                    </p>
                </div>";

            await _emailService.SendEmailAsync(staff.Email, "Reset Your Password", emailBody, "Appointment System");

            return Ok(new { Message = "Reset link sent successfully." });
        }

        /// <summary>
        /// Staff resets their password using a valid token.
        /// </summary>
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Token))
                throw new ValidationException(ValidationErrors.REQUIRED_FIELD, "Token is required.", "token");
            if (string.IsNullOrWhiteSpace(dto.NewPassword) || dto.NewPassword.Length < 6)
                throw new ValidationException(ValidationErrors.PASSWORD_TOO_SHORT, "Password must be at least 6 characters.", "newPassword");

            var tokenRecord = await _context.PasswordResetTokens
                .FirstOrDefaultAsync(t => t.Token == dto.Token && !t.IsUsed && t.ExpiresAt > DateTime.UtcNow);

            if (tokenRecord == null)
                throw new BusinessRuleException(BusinessErrors.INVALID_INVITE, "Invalid or expired reset token.");

            var staff = await _context.Staff.FirstOrDefaultAsync(s => s.Email == tokenRecord.Email);
            if (staff == null)
                throw new NotFoundException(NotFoundErrors.USER_NOT_FOUND, "Staff member not found.");

            // Update password
            staff.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            tokenRecord.IsUsed = true;

            await _context.SaveChangesAsync();

            return Ok(new { Message = "Password reset successfully. You can now log in with your new password." });
        }
    }
}
