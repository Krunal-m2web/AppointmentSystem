using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs.Service;
using Appointmentbookingsystem.Backend.Models.Entities;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [ApiController]
    [Route("api/service-pricing")]
    public class ServicesPricingController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public ServicesPricingController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// GET /api/services/pricing - Get all services with pricing in current default currency (paginated)
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<PaginatedServicePricingResponseDto>> GetServicesPricing([FromQuery] GetServiceQueryDto queryDto)
        {
            // Get the system-wide default currency
            var defaultCurrency = _configuration["AppSettings:DefaultCurrency"] ?? "USD";
            defaultCurrency = defaultCurrency.ToUpperInvariant();

            var query = _context.Services
                .Include(s => s.Prices)
                .Where(s => s.IsActive);

            if (queryDto.CompanyId.HasValue)
            {
                query = query.Where(s => s.CompanyId == queryDto.CompanyId.Value);
            }

            // Search
            if (!string.IsNullOrWhiteSpace(queryDto.SearchTerm))
            {
                var term = queryDto.SearchTerm.ToLower();
                query = query.Where(s => s.Name.ToLower().Contains(term));
            }

             // Sort
            query = queryDto.SortBy.ToLower() switch
            {
                _ => queryDto.SortDirection.ToLower() == "asc"
                    ? query.OrderBy(s => s.Name)
                    : query.OrderByDescending(s => s.Name)
            };

            // Pagination
            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)queryDto.PageSize);
            var skip = (queryDto.Page - 1) * queryDto.PageSize;

            var services = await query
                .Skip(skip)
                .Take(queryDto.PageSize)
                .ToListAsync();

            var serviceDtos = services.Select(s =>
            {
                // Check if service has a price for the current default currency
                var priceInCurrency = s.Prices.FirstOrDefault(x => x.Currency == defaultCurrency);
                
                return new ServicePricingDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    Currency = defaultCurrency,
                    Amount = priceInCurrency?.Amount,
                    PriceMissing = priceInCurrency == null,
                    ServiceDuration = s.ServiceDuration
                };
            }).ToList();

            var result = new PaginatedServicePricingResponseDto
            {
                Items = serviceDtos,
                TotalCount = totalCount,
                Page = queryDto.Page,
                PageSize = queryDto.PageSize,
                TotalPages = totalPages,
                HasNextPage = queryDto.Page < totalPages,
                HasPreviousPage = queryDto.Page > 1
            };

            return Ok(result);
        }

        /// <summary>
        /// POST /api/services/{serviceId}/pricing - Set price for service in default currency
        /// </summary>
        [HttpPost("{serviceId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpsertPrice(int serviceId, [FromBody] UpsertPriceDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var service = await _context.Services
                .Include(s => s.Prices)
                .FirstOrDefaultAsync(s => s.Id == serviceId);

            if (service == null)
                return NotFound("Service not found.");

            var currency = dto.Currency.ToUpperInvariant();

            // Check if price already exists for this currency
            var existing = service.Prices.FirstOrDefault(p => p.Currency == currency);
            
            if (existing != null)
            {
                existing.Amount = dto.Amount;
            }
            else
            {
                service.Prices.Add(new ServicePrice
                {
                    ServiceId = serviceId,
                    Currency = currency,
                    Amount = dto.Amount
                });
            }

            // Also update the base Price field for backwards compatibility
            service.Price = dto.Amount;

            await _context.SaveChangesAsync();
            
            return Ok(new { 
                message = "Price updated successfully", 
                serviceId, 
                currency, 
                amount = dto.Amount 
            });
        }

        /// <summary>
        /// DELETE /api/services/{serviceId}/pricing - Remove price (service won't show on booking page)
        /// </summary>
        [HttpDelete("{serviceId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePrice(int serviceId, [FromQuery] string currency)
        {
            var service = await _context.Services
                .Include(s => s.Prices)
                .FirstOrDefaultAsync(s => s.Id == serviceId);

            if (service == null)
                return NotFound("Service not found.");

            var cur = currency.ToUpperInvariant();
            var priceToRemove = service.Prices.FirstOrDefault(p => p.Currency == cur);

            if (priceToRemove == null)
                return NotFound("Price not found for this currency.");

            service.Prices.Remove(priceToRemove);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Price removed successfully. Service won't appear on booking page." });
        }
    }
}