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
        private readonly IEmailService _emailService;

        public AdminAuthController(AppDbContext context, IJwtTokenService jwt, IEmailService emailService)
        {
            _context = context;
            _jwt = jwt;
            _emailService = emailService;
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

            // Validate OTP before doing anything else
            var normalizedEmailForOtp = dto.Email.Trim().ToLowerInvariant();
            var latestOtpRecord = await _context.EmailVerifications
                .Where(ev => ev.Email == normalizedEmailForOtp && !ev.IsUsed)
                .OrderByDescending(ev => ev.CreatedAt)
                .FirstOrDefaultAsync();

            if (latestOtpRecord == null)
                throw new ValidationException(ValidationErrors.INVALID_FORMAT, "Invalid verification code. Please check your email and try again.", "otpCode");

            if (latestOtpRecord.ExpiresAt < DateTime.UtcNow)
                throw new ValidationException(ValidationErrors.INVALID_FORMAT, "Your verification code has expired. Please request a new one.", "otpCode");

            if (!string.Equals(latestOtpRecord.OtpCode, dto.OtpCode, StringComparison.Ordinal))
                throw new ValidationException(ValidationErrors.INVALID_FORMAT, "Invalid verification code. Please check your email and try again.", "otpCode");

            // Mark OTP as used
            latestOtpRecord.IsUsed = true;
            await _context.SaveChangesAsync();

            var baseSlug = SlugHelper.GenerateSlug(dto.CompanyName);
            if (string.IsNullOrEmpty(baseSlug)) baseSlug = "company";
            
            var slug = baseSlug;
            var counter = 1;
            while (await _context.Companies.AnyAsync(c => c.Slug == slug))
            {
                slug = $"{baseSlug}-{counter}";
                counter++;
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Create the company first
                var company = new Company
                {
                    CompanyName = dto.CompanyName,
                    Slug = slug,
                    Email = normalizedEmail,
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
                    Position = "Owner",
                    IsActive = true
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // Update company with the created UserId
                company.UserId = user.Id;
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return Ok(new
                {
                    Message = "Admin registered successfully.",
                    CompanyId = company.Id,
                    UserId = user.Id
                });
            }
            catch (DbUpdateException ex)
            {
                await transaction.RollbackAsync();
                
                // Inspect innermost exception for detail
                var innerMessage = ex.InnerException?.Message ?? ex.Message;
                
                // Handle unique constraint violations
                if (innerMessage.Contains("unique") || innerMessage.Contains("duplicate"))
                {
                    if (innerMessage.Contains("PK_"))
                        throw new ConflictException(BusinessErrors.DUPLICATE_RECORD, "System error: Database sequence out of sync. Please contact support or run maintenance.", "");
                        
                    throw new ConflictException(BusinessErrors.DUPLICATE_RECORD, 
                        "A record with this value already exists. Please check your inputs.", "");
                }
                throw;
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        /// <summary>
        /// Check if an email is already registered.
        /// </summary>
        [HttpGet("check-email")]
        public async Task<IActionResult> CheckEmail([FromQuery] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return BadRequest(new { Message = "Email is required." });

            var normalizedEmail = email.Trim().ToLowerInvariant();

            var userExists = await _context.Users.AnyAsync(u => u.Email.ToLower() == normalizedEmail);
            var companyExists = await _context.Companies.AnyAsync(c => c.Email.ToLower() == normalizedEmail);

            if (userExists || companyExists)
            {
                return Conflict(new { Message = "This email is already registered.", Field = "email" });
            }

            return Ok(new { Message = "Email is available." });
        }

        /// <summary>
        /// Send a 6-digit OTP to the given email for registration verification.
        /// </summary>
        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] SendOtpDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email))
                return BadRequest(new { Message = "Email is required.", Field = "email" });

            var normalizedEmail = dto.Email.Trim().ToLowerInvariant();

            // Check if email is already registered
            var userExists = await _context.Users.AnyAsync(u => u.Email.ToLower() == normalizedEmail);
            var companyExists = await _context.Companies.AnyAsync(c => c.Email.ToLower() == normalizedEmail);
            if (userExists || companyExists)
                return Conflict(new { Message = "This email is already registered.", Field = "email" });

            // Invalidate ANY existing OTPs for this email — mark used AND expired
            // This ensures resend immediately kills old codes on BOTH checks
            var existingOtps = await _context.EmailVerifications
                .Where(ev => ev.Email == normalizedEmail && !ev.IsUsed)
                .ToListAsync();
            foreach (var oldOtp in existingOtps)
            {
                oldOtp.IsUsed = true;
                oldOtp.ExpiresAt = DateTime.UtcNow.AddSeconds(-1); // force-expire immediately
            }
            await _context.SaveChangesAsync(); // flush invalidations before creating new OTP

            // Generate new 6-digit OTP
            var otp = new Random().Next(100000, 999999).ToString();

            var verification = new EmailVerification
            {
                Email = normalizedEmail,
                OtpCode = otp,
                ExpiresAt = DateTime.UtcNow.AddMinutes(10),
                IsUsed = false,
                CreatedAt = DateTime.UtcNow
            };
            _context.EmailVerifications.Add(verification);
            await _context.SaveChangesAsync();

            // Send OTP email via Mailgun
            var emailBody = $@"
                <div style='font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;'>
                    <div style='text-align: center; margin-bottom: 24px;'>
                        <div style='display: inline-block; background: #ede9fe; border-radius: 50%; padding: 16px;'>
                            <span style='font-size: 28px;'>📧</span>
                        </div>
                    </div>
                    <h2 style='text-align: center; color: #1f2937; font-size: 22px; margin: 0 0 8px;'>Please check your email</h2>
                    <p style='text-align: center; color: #6b7280; margin: 0 0 32px;'>We've sent a verification code to <strong>{normalizedEmail}</strong></p>
                    <div style='text-align: center; margin: 24px 0;'>
                        <span style='display: inline-block; letter-spacing: 12px; font-size: 36px; font-weight: bold; color: #4f46e5; background: #eef2ff; padding: 16px 24px; border-radius: 12px; font-family: monospace;'>{otp}</span>
                    </div>
                    <p style='text-align: center; color: #6b7280; font-size: 14px; margin-top: 24px;'>This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
                </div>";

            await _emailService.SendEmailAsync(
                normalizedEmail,
                "Your Verification Code",
                emailBody,
                "Appointment System"
            );

            return Ok(new { Message = "Verification code sent to your email." });
        }

        /// <summary>
        /// Verify a 6-digit OTP for the given email.
        /// This checks only the latest active OTP and does not consume it.
        /// </summary>
        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpDto dto)
        {
            var normalizedEmail = dto.Email.Trim().ToLowerInvariant();
            var latestOtpRecord = await _context.EmailVerifications
                .Where(ev => ev.Email == normalizedEmail && !ev.IsUsed)
                .OrderByDescending(ev => ev.CreatedAt)
                .FirstOrDefaultAsync();

            if (latestOtpRecord == null)
                throw new ValidationException(ValidationErrors.INVALID_FORMAT, "Invalid verification code. Please check your email and try again.", "otpCode");

            if (latestOtpRecord.ExpiresAt < DateTime.UtcNow)
                throw new ValidationException(ValidationErrors.INVALID_FORMAT, "Your verification code has expired. Please request a new one.", "otpCode");

            if (!string.Equals(latestOtpRecord.OtpCode, dto.OtpCode, StringComparison.Ordinal))
                throw new ValidationException(ValidationErrors.INVALID_FORMAT, "Invalid verification code. Please check your email and try again.", "otpCode");

            return Ok(new { Message = "Verification code verified successfully." });
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

        /// <summary>
        /// Maintenance: Fix database sequences
        /// Call this if you get "PK" violation errors
        /// </summary>
        [HttpPost("maintenance/fix-sequences")]
        public async Task<IActionResult> FixSequences()
        {
            try 
            {
                // Fix sequences for ALL tables to prevent future PK errors
                await _context.Database.ExecuteSqlRawAsync(@"
                    SELECT setval(pg_get_serial_sequence('""Users""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""Users"";
                    SELECT setval(pg_get_serial_sequence('""Companies""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""Companies"";
                    SELECT setval(pg_get_serial_sequence('""Customers""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""Customers"";
                    SELECT setval(pg_get_serial_sequence('""Appointments""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""Appointments"";
                    SELECT setval(pg_get_serial_sequence('""Staff""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""Staff"";
                    SELECT setval(pg_get_serial_sequence('""Services""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""Services"";
                    SELECT setval(pg_get_serial_sequence('""ServicePrices""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""ServicePrices"";
                    SELECT setval(pg_get_serial_sequence('""StaffServices""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""StaffServices"";
                    SELECT setval(pg_get_serial_sequence('""RecurrenceRules""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""RecurrenceRules"";
                    SELECT setval(pg_get_serial_sequence('""TimeOffs""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""TimeOffs"";
                    SELECT setval(pg_get_serial_sequence('""NotificationConfigs""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""NotificationConfigs"";
                    SELECT setval(pg_get_serial_sequence('""AppointmentReservations""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""AppointmentReservations"";
                    SELECT setval(pg_get_serial_sequence('""EmailLogs""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""EmailLogs"";
                    SELECT setval(pg_get_serial_sequence('""SMSLogs""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""SMSLogs"";
                    SELECT setval(pg_get_serial_sequence('""StaffInvites""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""StaffInvites"";
                    SELECT setval(pg_get_serial_sequence('""StaffGoogleCalendars""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""StaffGoogleCalendars"";
                    SELECT setval(pg_get_serial_sequence('""AppointmentCalendarSyncs""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""AppointmentCalendarSyncs"";
                    SELECT setval(pg_get_serial_sequence('""ExternalCalendarEvents""', 'Id'), COALESCE(MAX(""Id""), 0) + 1, false) FROM ""ExternalCalendarEvents"";
                ");
                
                return Ok(new { Message = "Database sequences synchronized successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Failed to fix sequences", Error = ex.Message });
            }
        }
    }
}
