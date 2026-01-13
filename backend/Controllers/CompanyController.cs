using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs.Company;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Appointmentbookingsystem.Backend.Helpers;
using Microsoft.EntityFrameworkCore;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [ApiController]
    [Route("api/companies")]
    [Authorize(Roles = "Admin,Staff")]
    public class CompanyController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CompanyController(AppDbContext context)
        {
            _context = context;
        }

    [Authorize(Roles = "Admin")]
    [HttpPost("me/logo")]
public async Task<IActionResult> UploadLogo(IFormFile file)
{
    if (file == null || file.Length == 0)
        return BadRequest("No file uploaded");

    var companyId = int.Parse(User.FindFirst("companyId")!.Value);
    var company = await _context.Companies.FindAsync(companyId);
    if (company == null) return NotFound();

    // Create uploads directory
    var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "logos");
    if (!Directory.Exists(uploadsDir))
        Directory.CreateDirectory(uploadsDir);

    var fileExt = Path.GetExtension(file.FileName);
    var fileName = $"company-{companyId}{fileExt}";
    var filePath = Path.Combine(uploadsDir, fileName);

    // Save file
    using (var stream = new FileStream(filePath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }

    // Save URL
    company.LogoUrl = $"/logos/{fileName}";
    company.UpdatedAt = DateTime.UtcNow;

    await _context.SaveChangesAsync();

    return Ok(new
    {
        logoUrl = company.LogoUrl
    });
}



        [HttpGet("me")]
        public async Task<ActionResult<CompanyResponseDto>> GetMyCompany()
        {
            var companyId = int.Parse(User.FindFirst("companyId")!.Value);

            var company = await _context.Companies.FindAsync(companyId);
            if (company == null) return NotFound();
            
            // Backfill slug for existing companies that don't have one
            if (string.IsNullOrEmpty(company.Slug))
            {
                company.Slug = await GenerateUniqueSlugAsync(company.CompanyName, company.Id);
                company.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }

            return Ok(new CompanyResponseDto
            {
                Id = company.Id,
                CompanyName = company.CompanyName,
                Email = company.Email,
                Phone = company.Phone,
                Address = company.Address,
                Currency = company.Currency,
                IsActive = company.IsActive,
                CreatedAt = company.CreatedAt,
                UpdatedAt = company.UpdatedAt,
                LogoUrl = company.LogoUrl,
                WebsiteUrl = company.WebsiteUrl,
                Slug = company.Slug
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("me")]
        public async Task<IActionResult> UpdateMyCompany(UpdateCompanyDto dto)
        {
            try
            {
                var companyId = int.Parse(User.FindFirst("companyId")!.Value);

                var company = await _context.Companies.FindAsync(companyId);
                if (company == null) return NotFound();
                
                if (dto.CompanyName != null)
                {
                    var normalizedNewName = dto.CompanyName.Trim().ToLowerInvariant();
                    var normalizedOldName = (company.CompanyName ?? "").Trim().ToLowerInvariant();

                    if (normalizedNewName != normalizedOldName)
                    {
                        // Check if name is already taken by ANOTHER company
                        if (await _context.Companies.AnyAsync(c => c.CompanyName.ToLower() == normalizedNewName && c.Id != companyId))
                        {
                            return BadRequest(new { error = "Company Name is already taken. Please choose a different name." });
                        }
                        
                        company.CompanyName = dto.CompanyName.Trim();
                        company.Slug = await GenerateUniqueSlugAsync(company.CompanyName, company.Id);
                    }
                }

                if (dto.Email != null)
                {
                    var normalizedNewEmail = dto.Email.Trim().ToLowerInvariant();
                    var normalizedOldEmail = (company.Email ?? "").Trim().ToLowerInvariant();

                    if (normalizedNewEmail != normalizedOldEmail)
                    {
                        // Check if email is already taken by ANOTHER company
                        if (await _context.Companies.AnyAsync(c => c.Email.ToLower() == normalizedNewEmail && c.Id != companyId))
                        {
                            return BadRequest(new { error = "This company email is already registered." });
                        }
                        company.Email = dto.Email.Trim();
                    }
                }

                if (dto.Phone != null) company.Phone = dto.Phone;
                if (dto.Address != null) company.Address = dto.Address;
                if (dto.Currency != null) company.Currency = dto.Currency;
                if (dto.IsActive.HasValue) company.IsActive = dto.IsActive.Value;
                if (dto.LogoUrl != null) company.LogoUrl = dto.LogoUrl;
                if (dto.WebsiteUrl != null) company.WebsiteUrl = dto.WebsiteUrl;

                company.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message, inner = ex.InnerException?.Message });
            }
        }
        [AllowAnonymous]
        [HttpGet("public/{id}")]
        public async Task<ActionResult<CompanyResponseDto>> GetPublicCompanyProfile(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null) return NotFound();

            return Ok(new CompanyResponseDto
            {
                CompanyName = company.CompanyName, // Still needed for internal logic or meta tags if used
                LogoUrl = company.LogoUrl, // Using LogoUrl field for storing Base64 for now based on context
                Phone = company.Phone,
                Email = company.Email,
                WebsiteUrl = company.WebsiteUrl
            });
        }
        [AllowAnonymous]
        [HttpGet("public/slug/{slug}")]
        public async Task<ActionResult<CompanyResponseDto>> GetPublicCompanyProfileBySlug(string slug)
        {
            var company = await _context.Companies.FirstOrDefaultAsync(c => c.Slug == slug);
            if (company == null) return NotFound();

            return Ok(new CompanyResponseDto
            {
                Id = company.Id,
                CompanyName = company.CompanyName,
                Phone = company.Phone,
                Email = company.Email,
                WebsiteUrl = company.WebsiteUrl,
                LogoUrl = company.LogoUrl,
                Slug = company.Slug
            });
        }
        private async Task<string> GenerateUniqueSlugAsync(string companyName, int? existingCompanyId = null)
        {
            var baseSlug = SlugHelper.GenerateSlug(companyName);
            
            // Fallback for empty slugs (e.g. only special chars)
            if (string.IsNullOrEmpty(baseSlug))
            {
                baseSlug = "company";
            }

            var slug = baseSlug;
            var counter = 1;

            while (await _context.Companies.AnyAsync(c => c.Slug == slug && (!existingCompanyId.HasValue || c.Id != existingCompanyId.Value)))
            {
                slug = $"{baseSlug}-{counter}";
                counter++;
            }

            return slug;
        }
    }
}
