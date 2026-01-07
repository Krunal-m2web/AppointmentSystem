using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.Models.Entities;
using Appointmentbookingsystem.Backend.DTOs.Customer;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CustomerController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/customer
        // Get all customers for the company (multi-tenant)
        // GET: api/customer
        // Get all customers for the company (multi-tenant)
        [HttpGet]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<PaginatedCustomerResponseDto>> GetAllCustomers([FromQuery] GetCustomersQueryDto query)
        {
            var companyIdClaim = User.FindFirst("companyId");
            if (companyIdClaim == null)
                return Forbid("Company context missing from token.");

            int companyId = int.Parse(companyIdClaim.Value);

            var customersQuery = _context.Customers
                .Include(c => c.Appointments)
                .Where(c => c.CompanyId == companyId && c.IsActive)
                .AsQueryable();

            // Apply search filter
            if (!string.IsNullOrWhiteSpace(query.SearchTerm))
            {
                var searchLower = query.SearchTerm.ToLower();
                customersQuery = customersQuery.Where(c =>
                    c.FirstName.ToLower().Contains(searchLower) ||
                    c.LastName.ToLower().Contains(searchLower) ||
                    c.Email.ToLower().Contains(searchLower) ||
                    (c.Phone != null && c.Phone.Contains(query.SearchTerm)) ||
                    (c.Notes != null && c.Notes.ToLower().Contains(searchLower))
                );
            }

            // Sort
            customersQuery = query.SortBy.ToLower() switch
            {
                "email" => query.SortDirection.ToLower() == "asc"
                    ? customersQuery.OrderBy(c => c.Email)
                    : customersQuery.OrderByDescending(c => c.Email),

                "phone" => query.SortDirection.ToLower() == "asc"
                    ? customersQuery.OrderBy(c => c.Phone)
                    : customersQuery.OrderByDescending(c => c.Phone),

                "totalappointments" => query.SortDirection.ToLower() == "asc"
                    ? customersQuery.OrderBy(c => c.Appointments.Count)
                    : customersQuery.OrderByDescending(c => c.Appointments.Count),

                "lastappointment" => query.SortDirection.ToLower() == "asc"
                    ? customersQuery.OrderBy(c => c.Appointments.Max(a => a.StartDateTimeUtc))
                    : customersQuery.OrderByDescending(c => c.Appointments.Max(a => a.StartDateTimeUtc)),

                "createdat" => query.SortDirection.ToLower() == "asc"
                    ? customersQuery.OrderBy(c => c.CreatedAt)
                    : customersQuery.OrderByDescending(c => c.CreatedAt),

                // Default to Name (FirstName then LastName)
                _ => query.SortDirection.ToLower() == "asc"
                    ? customersQuery.OrderBy(c => c.FirstName).ThenBy(c => c.LastName)
                    : customersQuery.OrderByDescending(c => c.FirstName).ThenByDescending(c => c.LastName)
            };

            // Count
            var totalCount = await customersQuery.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)query.PageSize);
            var skip = (query.Page - 1) * query.PageSize;

            // Fetch
            var customers = await customersQuery
                .Skip(skip)
                .Take(query.PageSize)
                .ToListAsync();

            var customerDtos = customers.Select(c => new CustomerResponseDto
            {
                Id = c.Id,
                CompanyId = c.CompanyId,
                Name = $"{c.FirstName} {c.LastName}".Trim(),
                FirstName = c.FirstName,
                LastName = c.LastName,
                Email = c.Email,
                Phone = c.Phone,
                Notes = c.Notes,
                IsActive = c.IsActive,
                TotalAppointments = c.Appointments.Count,
                LastAppointment = c.Appointments
                    .OrderByDescending(a => a.StartDateTimeUtc)
                    .FirstOrDefault()?.StartDateTimeUtc,
                CreatedAt = c.CreatedAt
            }).ToList();

            var response = new PaginatedCustomerResponseDto
            {
                Customers = customerDtos,
                TotalCount = totalCount,
                Page = query.Page,
                PageSize = query.PageSize,
                TotalPages = totalPages,
                HasNextPage = query.Page < totalPages,
                HasPreviousPage = query.Page > 1
            };

            return Ok(response);
        }

        // GET: api/customer/{id}
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<CustomerResponseDto>> GetCustomer(int id)
        {
            var companyIdClaim = User.FindFirst("companyId");
            if (companyIdClaim == null)
                return Forbid("Company context missing from token.");

            int companyId = int.Parse(companyIdClaim.Value);

            var customer = await _context.Customers
                .Include(c => c.Appointments)
                .FirstOrDefaultAsync(c => c.Id == id && c.CompanyId == companyId);

            if (customer == null)
                return NotFound("Customer not found.");

            var response = new CustomerResponseDto
            {
                Id = customer.Id,
                CompanyId = customer.CompanyId,
                Name = $"{customer.FirstName} {customer.LastName}".Trim(),
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Email = customer.Email,
                Phone = customer.Phone,
                Notes = customer.Notes,
                IsActive = customer.IsActive,
                TotalAppointments = customer.Appointments.Count,
                LastAppointment = customer.Appointments
                    .OrderByDescending(a => a.StartDateTimeUtc)
                    .FirstOrDefault()?.StartDateTimeUtc,
                CreatedAt = customer.CreatedAt
            };

            return Ok(response);
        }

        // POST: api/customer
        [HttpPost]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<CustomerResponseDto>> CreateCustomer([FromBody] CreateCustomerDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var companyIdClaim = User.FindFirst("companyId");
            if (companyIdClaim == null)
                return Forbid("Company context missing from token.");

            int companyId = int.Parse(companyIdClaim.Value);

            // Check if email already exists for this company
            var existingCustomer = await _context.Customers
                .FirstOrDefaultAsync(c => c.CompanyId == companyId && c.Email == dto.Email);

            if (existingCustomer != null)
                return BadRequest("A customer with this email already exists.");

            var customer = new Customer
            {
                CompanyId = companyId,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Phone = dto.Phone,
                Notes = dto.Notes,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            var response = new CustomerResponseDto
            {
                Id = customer.Id,
                CompanyId = customer.CompanyId,
                Name = $"{customer.FirstName} {customer.LastName}".Trim(),
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Email = customer.Email,
                Phone = customer.Phone,
                Notes = customer.Notes,
                IsActive = customer.IsActive,
                TotalAppointments = 0,
                LastAppointment = null,
                CreatedAt = customer.CreatedAt
            };

            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, response);
        }

        // PUT: api/customer/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<CustomerResponseDto>> UpdateCustomer(int id, [FromBody] UpdateCustomerDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var companyIdClaim = User.FindFirst("companyId");
            if (companyIdClaim == null)
                return Forbid("Company context missing from token.");

            int companyId = int.Parse(companyIdClaim.Value);

            var customer = await _context.Customers
                .Include(c => c.Appointments)
                .FirstOrDefaultAsync(c => c.Id == id && c.CompanyId == companyId);

            if (customer == null)
                return NotFound("Customer not found.");

            // Check if new email conflicts with another customer
            if (customer.Email != dto.Email)
            {
                var existingCustomer = await _context.Customers
                    .FirstOrDefaultAsync(c => c.CompanyId == companyId && c.Email == dto.Email && c.Id != id);

                if (existingCustomer != null)
                    return BadRequest("A customer with this email already exists.");
            }

            customer.FirstName = dto.FirstName;
            customer.LastName = dto.LastName;
            customer.Email = dto.Email;
            customer.Phone = dto.Phone;
            customer.Notes = dto.Notes;
            customer.IsActive = dto.IsActive;
            customer.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            var response = new CustomerResponseDto
            {
                Id = customer.Id,
                CompanyId = customer.CompanyId,
                Name = $"{customer.FirstName} {customer.LastName}".Trim(),
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Email = customer.Email,
                Phone = customer.Phone,
                Notes = customer.Notes,
                IsActive = customer.IsActive,
                TotalAppointments = customer.Appointments.Count,
                LastAppointment = customer.Appointments
                    .OrderByDescending(a => a.StartDateTimeUtc)
                    .FirstOrDefault()?.StartDateTimeUtc,
                CreatedAt = customer.CreatedAt
            };

            return Ok(response);
        }

        // DELETE: api/customer/{id}
        // Soft delete - sets IsActive to false
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteCustomer(int id)
        {
            var companyIdClaim = User.FindFirst("companyId");
            if (companyIdClaim == null)
                return Forbid("Company context missing from token.");

            int companyId = int.Parse(companyIdClaim.Value);

            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.Id == id && c.CompanyId == companyId);

            if (customer == null)
                return NotFound("Customer not found.");

            // Soft delete
            customer.IsActive = false;
            customer.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/customer/{id}/permanent
        // Hard delete - permanently removes customer (Admin only)
        [HttpDelete("{id}/permanent")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> PermanentDeleteCustomer(int id)
        {
            var companyIdClaim = User.FindFirst("companyId");
            if (companyIdClaim == null)
                return Forbid("Company context missing from token.");

            int companyId = int.Parse(companyIdClaim.Value);

            var customer = await _context.Customers
                .Include(c => c.Appointments)
                .FirstOrDefaultAsync(c => c.Id == id && c.CompanyId == companyId);

            if (customer == null)
                return NotFound("Customer not found.");

            // Check if customer has appointments
            if (customer.Appointments.Any())
                return BadRequest("Cannot permanently delete a customer with appointments. Use soft delete instead.");

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
