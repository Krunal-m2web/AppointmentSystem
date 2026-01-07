using Appointmentbookingsystem.Backend.DTOs.Service;
using Appointmentbookingsystem.Backend.Models.Entities;
using Appointmentbookingsystem.Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [ApiController]
    [Route("api/services")]
    public class ServiceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServiceController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// GET /api/services - Get all services (paginated)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<PaginatedServiceResponseDto>> GetAll([FromQuery] GetServiceQueryDto queryDto)
        {
            var currency = (queryDto.Currency ?? "USD").ToUpperInvariant();

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
                query = query.Where(s => 
                    s.Name.ToLower().Contains(term) || 
                    (s.Description != null && s.Description.ToLower().Contains(term)));
            }

            // Sort
            query = queryDto.SortBy.ToLower() switch
            {
                "price" => queryDto.SortDirection.ToLower() == "asc"
                    ? query.OrderBy(s => s.Prices.FirstOrDefault(p => p.Currency == currency)!.Amount) // Simple sort, improves needed for robust null handling
                    : query.OrderByDescending(s => s.Prices.FirstOrDefault(p => p.Currency == currency)!.Amount),
                "duration" => queryDto.SortDirection.ToLower() == "asc"
                    ? query.OrderBy(s => s.ServiceDuration)
                    : query.OrderByDescending(s => s.ServiceDuration),
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
                var price = s.Prices.FirstOrDefault(p => p.Currency == currency);

                return new CustomerServiceDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    Currency = currency,
                    Price = price?.Amount ?? s.Price,
                    ServiceDuration = s.ServiceDuration
                };
            }).ToList();

            var result = new PaginatedServiceResponseDto
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
        /// GET /api/services/admin - Get all services with full details for admin
        /// </summary>
        [HttpGet("admin")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ServiceResponseDto>>> GetAllAdmin([FromQuery] int? companyId)
        {
            var query = _context.Services
                .Include(s => s.Prices)
                .AsQueryable();

            if (companyId.HasValue)
            {
                query = query.Where(s => s.CompanyId == companyId.Value);
            }

            var services = await query.ToListAsync();

            var result = services.Select(s => new ServiceResponseDto
            {
                Id = s.Id,
                CompanyId = s.CompanyId,
                Name = s.Name,
                Description = s.Description,
                Price = s.Price,
                ServiceDuration = s.ServiceDuration,
                IsActive = s.IsActive,
                Prices = s.Prices.Select(p => new ServicePriceDto
                {
                    Amount = p.Amount,
                    Currency = p.Currency
                }).ToList()
            });

            return Ok(result);
        }

        /// <summary>
        /// POST /api/services - Create a new service
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ServiceResponseDto>> CreateService(CreateServiceDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Verify company exists
            var company = await _context.Companies.FindAsync(dto.CompanyId);
            if (company == null)
                return BadRequest("Invalid company ID.");

            var service = new Service
            {
                CompanyId = dto.CompanyId,
                Name = dto.Name.Trim(),
                Description = dto.Description,
                Price = dto.Price,
                ServiceDuration = dto.ServiceDuration,
                IsActive = true
            };

            // Add multi-currency prices if provided
            if (dto.Prices != null && dto.Prices.Any())
            {
                service.Prices = dto.Prices.Select(p => new ServicePrice
                {
                    Amount = p.Amount,
                    Currency = p.Currency.ToUpperInvariant()
                }).ToList();
            }

            try
            {
                _context.Services.Add(service);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return BadRequest("Service name already exists for this company.");
            }


            var response = new ServiceResponseDto
            {
                Id = service.Id,
                CompanyId = service.CompanyId,
                Name = service.Name,
                Description = service.Description,
                Price = service.Price,
                ServiceDuration = service.ServiceDuration,
                IsActive = service.IsActive,
                Prices = service.Prices.Select(p => new ServicePriceDto
                {
                    Amount = p.Amount,
                    Currency = p.Currency
                }).ToList()
            };

            return CreatedAtAction(nameof(GetAll), new { id = service.Id }, response);
        }

        /// <summary>
        /// PUT /api/services/{id} - Update a service
        /// </summary>
        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateService(int id, [FromBody] UpdateServiceDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var service = await _context.Services
                .Include(s => s.Prices)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (service == null)
                return NotFound("Service not found");

            if (dto.Name != null) service.Name = dto.Name;
            if (dto.Description != null) service.Description = dto.Description;
            if (dto.IsActive.HasValue) service.IsActive = dto.IsActive.Value;
            if (dto.Price.HasValue) service.Price = dto.Price.Value;
            if (dto.ServiceDuration.HasValue) service.ServiceDuration = dto.ServiceDuration.Value;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return BadRequest("Service name already exists for this company.");
            }

            var response = new ServiceResponseDto
            {
                Id = service.Id,
                CompanyId = service.CompanyId,
                Name = service.Name,
                Description = service.Description,
                Price = service.Price,
                ServiceDuration = service.ServiceDuration,
                IsActive = service.IsActive,
                Prices = service.Prices.Select(p => new ServicePriceDto
                {
                    Amount = p.Amount,
                    Currency = p.Currency
                }).ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// DELETE /api/services/{id} - Soft delete a service
        /// </summary>
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var service = await _context.Services
                .FirstOrDefaultAsync(s => s.Id == id);

            if (service == null)
                return NotFound("Service not found");

            // Soft delete
            service.IsActive = false;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Service deactivated successfully." });
        }
    }
}