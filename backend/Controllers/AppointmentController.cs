using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs.Appointment;
using Appointmentbookingsystem.Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [Route("api/appointments")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AppointmentController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// GET /api/appointments - Get all appointments
        /// </summary>    
        [HttpGet]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<PaginatedAppointmentsResponseDto>> GetAllAppointments(
            [FromQuery] GetAppointmentsQueryDto query)
        {
            var appointmentsQuery = _context.Appointments
                .Include(a => a.Customer)
                .Include(a => a.Service)
                .Include(a => a.Staff)
                .AsQueryable();

            // Filter by status if not "all"
            if (!string.IsNullOrEmpty(query.Status) && query.Status.ToLower() != "all")
            {
                if (Enum.TryParse<AppointmentStatus>(query.Status, true, out var status))
                {
                    appointmentsQuery = appointmentsQuery.Where(a => a.Status == status);
                }
                else
                {
                    return BadRequest($"Invalid status: {query.Status}");
                }
            }

            // Filter by staff if provided
            if (query.StaffId.HasValue)
            {
                appointmentsQuery = appointmentsQuery.Where(a => a.StaffId == query.StaffId.Value);
            }

            // Filter by customer if provided
            if (query.CustomerId.HasValue)
            {
                appointmentsQuery = appointmentsQuery.Where(a => a.CustomerId == query.CustomerId.Value);
            }

            // Filter by service if provided
            if (query.ServiceId.HasValue)
            {
                appointmentsQuery = appointmentsQuery.Where(a => a.ServiceId == query.ServiceId.Value);
            }

            // Filter by date range
            if (query.StartDate.HasValue)
            {
                var startDateUtc = query.StartDate.Value.Kind == DateTimeKind.Utc
                    ? query.StartDate.Value
                    : DateTime.SpecifyKind(query.StartDate.Value, DateTimeKind.Utc);

                appointmentsQuery = appointmentsQuery.Where(a => a.StartDateTimeUtc >= startDateUtc);
            }

            if (query.EndDate.HasValue)
            {
                var endDateUtc = query.EndDate.Value.Kind == DateTimeKind.Utc
                    ? query.EndDate.Value.AddDays(1).AddTicks(-1)
                    : DateTime.SpecifyKind(query.EndDate.Value.AddDays(1).AddTicks(-1), DateTimeKind.Utc);

                appointmentsQuery = appointmentsQuery.Where(a => a.StartDateTimeUtc <= endDateUtc);
            }

            // Sort the results
            appointmentsQuery = query.SortBy.ToLower() switch
            {
                "customer" => query.SortDirection.ToLower() == "asc"
                    ? appointmentsQuery.OrderBy(a => a.Customer.FirstName)
                    : appointmentsQuery.OrderByDescending(a => a.Customer.FirstName),

                "service" => query.SortDirection.ToLower() == "asc"
                    ? appointmentsQuery.OrderBy(a => a.Service.Name)
                    : appointmentsQuery.OrderByDescending(a => a.Service.Name),

                "status" => query.SortDirection.ToLower() == "asc"
                    ? appointmentsQuery.OrderBy(a => a.Status)
                    : appointmentsQuery.OrderByDescending(a => a.Status),

                _ => query.SortDirection.ToLower() == "asc"
                    ? appointmentsQuery.OrderBy(a => a.StartDateTimeUtc)
                    : appointmentsQuery.OrderByDescending(a => a.StartDateTimeUtc)
            };

            // Get total count
            var totalCount = await appointmentsQuery.CountAsync();

            // Calculate pagination
            var totalPages = (int)Math.Ceiling(totalCount / (double)query.PageSize);
            var skip = (query.Page - 1) * query.PageSize;

            // Get the current page of results
            var appointments = await appointmentsQuery
                .Skip(skip)
                .Take(query.PageSize)
                .ToListAsync();

            // Convert to response DTOs
            var appointmentDtos = appointments.Select(a => new AppointmentResponseDto
            {
                Id = a.Id,
                CustomerId = a.CustomerId,
                CustomerName = $"{a.Customer.FirstName} {a.Customer.LastName}",
                CustomerEmail = a.Customer.Email,
                CustomerPhone = a.Customer.Phone ?? "",
                ServiceId = a.ServiceId,
                ServiceName = a.Service.Name,
                StaffId = a.StaffId,
                StaffName = a.Staff != null
                    ? $"{a.Staff.FirstName} {a.Staff.LastName}"
                    : "Unassigned",
                StartDateTime = a.StartDateTimeUtc,
                EndDateTime = a.EndDateTimeUtc,
                MeetingType = a.MeetingType,
                Status = a.Status,
                CurrencyCode = a.CurrencyCode,
                Price = a.Price,
                PaymentMethod = a.PaymentMethod,
                PaymentStatus = a.PaymentStatus,
                CreatedAt = a.CreatedAt
            }).ToList();

            // Return the paginated response
            var response = new PaginatedAppointmentsResponseDto
            {
                Appointments = appointmentDtos,
                TotalCount = totalCount,
                Page = query.Page,
                PageSize = query.PageSize,
                TotalPages = totalPages,
                HasNextPage = query.Page < totalPages,
                HasPreviousPage = query.Page > 1
            };

            return Ok(response);
        }

        /// <summary>
        /// POST /api/appointments - Create a new appointment
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<AppointmentResponseDto>> CreateAppointment(
            [FromBody] CreateAppointmentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Validate start time is in future
            if (dto.StartTime <= DateTime.UtcNow)
                return BadRequest("Appointment must be scheduled for a future time.");

            // STEP 1: VERIFY SERVICE EXISTS
            var service = await _context.Services
                .Include(s => s.Prices)
                .FirstOrDefaultAsync(s => s.Id == dto.ServiceId && s.IsActive);

            if (service == null)
                return NotFound("Service not found or is not active.");

            // STEP 2: GET PRICE FOR DEFAULT CURRENCY
            string defaultCurrency = _configuration["AppSettings:DefaultCurrency"] ?? "USD";

            var servicePrice = service.Prices
                .FirstOrDefault(p => p.Currency == defaultCurrency.ToUpperInvariant());

            // If no specific currency price, use base service price
            decimal finalPrice = servicePrice?.Amount ?? service.Price;

            // STEP 3: FIND OR CREATE CUSTOMER
            // Get companyId from service
            int companyId = service.CompanyId;

            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.CompanyId == companyId && c.Email.ToLower() == dto.Email.ToLower());

            if (customer == null)
            {
                // Create new customer (guest booking)
                customer = new Customer
                {
                    CompanyId = companyId,
                    Email = dto.Email.ToLowerInvariant(),
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    Phone = dto.Phone,
                    IsActive = true
                };

                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();
            }

            // STEP 4: HANDLE STAFF ASSIGNMENT
            Staff? assignedStaff = null;

            if (dto.StaffId.HasValue)
            {
                // Customer selected specific staff
                assignedStaff = await _context.Staff
                    .Include(s => s.StaffServices)
                    .FirstOrDefaultAsync(s => s.Id == dto.StaffId.Value && s.IsActive);

                if (assignedStaff == null)
                    return NotFound("Staff member not found or is not active.");

                // Verify staff can provide this service
                if (!assignedStaff.StaffServices.Any(ss => ss.ServiceId == dto.ServiceId && ss.IsActive))
                    return BadRequest("Selected staff member cannot provide this service.");
            }
            else
            {
                // Auto-assign: Find any available staff for this service
                assignedStaff = await _context.Staff
                    .Include(s => s.StaffServices)
                    .Where(s => s.CompanyId == companyId && 
                                s.IsActive && 
                                s.StaffServices.Any(ss => ss.ServiceId == dto.ServiceId && ss.IsActive))
                    .FirstOrDefaultAsync();
            }

            // STEP 5: CALCULATE END TIME
            DateTime endTime = dto.StartTime.AddMinutes(service.ServiceDuration);

            bool isSlotStillAvailable = await IsSlotAvailableForBooking(
                assignedStaff?.Id ?? 0,
                dto.StartTime,
                endTime);

            if (!isSlotStillAvailable)
            {
                return Conflict(new
                {
                    message = "This time slot is no longer available.",
                    suggestion = "Please select a different time slot."
                });
            }

            // STEP 6: CHECK FOR SCHEDULING CONFLICTS
            if (assignedStaff != null)
            {
                bool hasConflict = await _context.Appointments
                    .AnyAsync(a =>
                        a.StaffId == assignedStaff.Id &&
                        a.Status != AppointmentStatus.Cancelled &&
                        (
                            (dto.StartTime >= a.StartDateTimeUtc && dto.StartTime < a.EndDateTimeUtc) ||
                            (endTime > a.StartDateTimeUtc && endTime <= a.EndDateTimeUtc) ||
                            (dto.StartTime <= a.StartDateTimeUtc && endTime >= a.EndDateTimeUtc)
                        )
                    );

                if (hasConflict)
                {
                    return Conflict(new
                    {
                        message = "Staff member is not available at this time.",
                        suggestion = "Please choose a different time slot or staff member."
                    });
                }
            }

            // STEP 7: CREATE THE APPOINTMENT
            var appointment = new Appointment
            {
                CompanyId = companyId,
                CustomerId = customer.Id,
                ServiceId = dto.ServiceId,
                StaffId = assignedStaff?.Id,
                StartDateTimeUtc = dto.StartTime,
                EndDateTimeUtc = endTime,
                MeetingType = dto.MeetingType,
                Status = AppointmentStatus.Pending,
                RecurrenceRuleId = null,
                ParentAppointmentId = null,
                CurrencyCode = defaultCurrency,
                Price = finalPrice,
                PaymentStatus = PaymentStatus.Unpaid,
                PaymentMethod = dto.PaymentMethod
            };

            _context.Appointments.Add(appointment);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("Another booking was made at the same time. Please try again.");
            }

            // STEP 8: LOAD NAVIGATION PROPERTIES
            await _context.Entry(appointment).Reference(a => a.Customer).LoadAsync();
            await _context.Entry(appointment).Reference(a => a.Service).LoadAsync();
            if (appointment.StaffId.HasValue)
            {
                await _context.Entry(appointment).Reference(a => a.Staff).LoadAsync();
            }

            // STEP 9: BUILD AND RETURN RESPONSE
            var response = new AppointmentResponseDto
            {
                Id = appointment.Id,
                CustomerId = customer.Id,
                CustomerName = $"{customer.FirstName} {customer.LastName}",
                CustomerEmail = customer.Email,
                CustomerPhone = customer.Phone ?? "",
                ServiceId = service.Id,
                ServiceName = service.Name,
                StaffId = assignedStaff?.Id,
                StaffName = assignedStaff != null
                    ? $"{assignedStaff.FirstName} {assignedStaff.LastName}"
                    : "To be assigned",
                StartDateTime = appointment.StartDateTimeUtc,
                EndDateTime = appointment.EndDateTimeUtc,
                MeetingType = appointment.MeetingType,
                Status = appointment.Status,
                CurrencyCode = appointment.CurrencyCode,
                Price = appointment.Price,
                PaymentMethod = appointment.PaymentMethod,
                PaymentStatus = appointment.PaymentStatus,
                CreatedAt = appointment.CreatedAt
            };

            return CreatedAtAction(
                nameof(CreateAppointment),
                new { id = appointment.Id },
                response
            );
        }

        /// <summary>
        /// Checks if a slot is available at booking time (final validation)
        /// </summary> 
        private async Task<bool> IsSlotAvailableForBooking(
            int staffId,
            DateTime startTime,
            DateTime endTime)
        {
            if (staffId == 0) return true;

            // Check existing appointments
            var hasAppointmentConflict = await _context.Appointments
                .AnyAsync(a =>
                    a.StaffId == staffId &&
                    a.Status != AppointmentStatus.Cancelled &&
                    a.StartDateTimeUtc < endTime &&
                    a.EndDateTimeUtc > startTime);

            if (hasAppointmentConflict) return false;

            // Check active reservations
            var now = DateTime.UtcNow;
            var hasReservationConflict = await _context.AppointmentReservations
                .AnyAsync(r =>
                    r.StaffId == staffId &&
                    r.ExpiresAt > now &&
                    r.StartDateTime < endTime &&
                    r.EndDateTime > startTime);

            return !hasReservationConflict;
        }
    }
}
