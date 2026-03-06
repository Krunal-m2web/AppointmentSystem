using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs;
using Appointmentbookingsystem.Backend.Models.Entities;
using Appointmentbookingsystem.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [ApiController]
    [Route("api/staff-invites")]
    public class StaffInviteController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;

        public StaffInviteController(AppDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateInvite([FromBody] CreateStaffInviteDto dto)
        {
            // Get CompanyId from User Claims
            var companyIdClaim = User.FindFirst("companyId")?.Value;
            if (string.IsNullOrEmpty(companyIdClaim) || !int.TryParse(companyIdClaim, out int companyId))
            {
                return Unauthorized("Company ID not found in token.");
            }

            var token = Guid.NewGuid().ToString("N"); // 32 chars, no hyphens
            var invite = new StaffInvite
            {
                Token = token,
                CompanyId = companyId,
                Email = dto.Email,
                ExpiresAt = DateTime.UtcNow.AddHours(48), // 48 hours validity
                CreatedAt = DateTime.UtcNow,
                IsUsed = false
            };

            _context.StaffInvites.Add(invite);
            await _context.SaveChangesAsync();

            return Ok(new StaffInviteResponseDto
            {
                Token = token,
                ExpiresAt = invite.ExpiresAt
            });
        }

        [HttpPost("send-email")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SendInviteEmail([FromBody] SendInviteEmailDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email))
                return BadRequest("Email is required.");

            if (string.IsNullOrWhiteSpace(dto.Token))
                return BadRequest("Token is required.");

            if (string.IsNullOrWhiteSpace(dto.RegistrationLink))
                return BadRequest("Registration link is required.");

            // Validate the invite token
            var invite = await _context.StaffInvites
                .FirstOrDefaultAsync(i => i.Token == dto.Token);

            if (invite == null)
                return NotFound("Invite not found.");

            if (invite.IsUsed)
                return BadRequest("This invite has already been used.");

            if (invite.ExpiresAt < DateTime.UtcNow)
                return BadRequest("This invite has expired.");

            // Get company name for the email
            var company = await _context.Companies.FindAsync(invite.CompanyId);
            var companyName = company?.CompanyName ?? "Your Company";

            var emailBody = $@"
<div style=""font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0;"">
  <div style=""background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); border-radius: 16px 16px 0 0; padding: 32px; text-align: center;"">
    <h1 style=""color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;"">You're Invited!</h1>
    <p style=""color: #c7d2fe; margin: 8px 0 0; font-size: 14px;"">Join {companyName} as a staff member</p>
  </div>
  <div style=""background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none;"">
    <p style=""color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 20px;"">
      You have been invited to register as a staff member at <strong>{companyName}</strong>. 
      Click the button below to create your account and get started.
    </p>
    <div style=""text-align: center; margin: 28px 0;"">
      <a href=""{dto.RegistrationLink}"" 
         style=""display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);"">
        Complete Registration
      </a>
    </div>
    <p style=""color: #6b7280; font-size: 13px; line-height: 1.5; margin: 20px 0 0;"">
      This invitation link will expire in <strong>48 hours</strong>. If the button doesn't work, copy and paste this URL into your browser:
    </p>
    <p style=""color: #6366f1; font-size: 12px; word-break: break-all; background: #f5f3ff; padding: 12px; border-radius: 8px; margin: 10px 0 0;"">
      {dto.RegistrationLink}
    </p>
  </div>
  <div style=""background: #f9fafb; border-radius: 0 0 16px 16px; padding: 20px 32px; border: 1px solid #e5e7eb; border-top: none; text-align: center;"">
    <p style=""color: #9ca3af; font-size: 12px; margin: 0;"">
      This email was sent by {companyName}. If you didn't expect this, you can safely ignore it.
    </p>
  </div>
</div>";

            await _emailService.SendEmailAsync(
                dto.Email,
                $"You're invited to join {companyName}",
                emailBody,
                companyName
            );

            return Ok(new { message = "Invitation email sent successfully." });
        }

        [HttpGet("validate/{token}")]
        [AllowAnonymous]
        public async Task<IActionResult> ValidateInvite(string token)
        {
            var invite = await _context.StaffInvites
                .FirstOrDefaultAsync(i => i.Token == token);

            if (invite == null)
            {
                return Ok(new ValidateInviteResponseDto { IsValid = false });
            }

            if (invite.IsUsed)
            {
                 // Possibly return specific error? But boolean IsValid=false is safer for simple logic
                 return Ok(new ValidateInviteResponseDto { IsValid = false });
            }

            if (invite.ExpiresAt < DateTime.UtcNow)
            {
                 return Ok(new ValidateInviteResponseDto { IsValid = false });
            }

            // Get company name for display confidence
            var company = await _context.Companies.FindAsync(invite.CompanyId);

            return Ok(new ValidateInviteResponseDto
            {
                IsValid = true,
                CompanyId = invite.CompanyId,
                CompanyName = company?.CompanyName,
                Email = invite.Email
            });
        }
    }
}
