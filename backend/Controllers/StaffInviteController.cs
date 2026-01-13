using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs;
using Appointmentbookingsystem.Backend.Models.Entities;
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

        public StaffInviteController(AppDbContext context)
        {
            _context = context;
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
