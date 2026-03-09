using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs.Appointment;
using Appointmentbookingsystem.Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Appointmentbookingsystem.Backend.Services; // Added for IEmailService
using Appointmentbookingsystem.Backend.DTOs; // Assuming AppointmentDto is here
using System.Text; // Added for StringBuilder

namespace Appointmentbookingsystem.Backend.Controllers
{
    [Route("api/appointments")] // Changed route
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly IGoogleCalendarService _googleCalendarService;

        public AppointmentController(
            AppDbContext context,
            IEmailService emailService,
            IConfiguration configuration,
            IGoogleCalendarService googleCalendarService)
        {
            _context = context;
            _emailService = emailService;
            _configuration = configuration;
            _googleCalendarService = googleCalendarService;
        }

        /// <summary>
        /// GET /api/appointments - Get all appointments
        /// </summary>    
     [HttpGet]
[Authorize(Roles = "Admin,Staff")]
public async Task<ActionResult<PaginatedAppointmentsResponseDto>> GetAllAppointments(
    [FromQuery] GetAppointmentsQueryDto query)
{
    var companyIdClaim = User.FindFirst("companyId");
    if (companyIdClaim == null)
        return Forbid("Company context missing from token.");

    int companyId = int.Parse(companyIdClaim.Value);

    var appointmentsQuery = _context.Appointments
        .Include(a => a.Customer)
        .Include(a => a.Service)
        .Include(a => a.Staff)
        .Where(a => a.CompanyId == companyId)
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
            if (query.StaffIds != null && query.StaffIds.Any())
            {
                 appointmentsQuery = appointmentsQuery.Where(a => a.StaffId.HasValue && query.StaffIds.Contains(a.StaffId.Value));
            }
            else if (query.StaffId.HasValue)
            {
                appointmentsQuery = appointmentsQuery.Where(a => a.StaffId == query.StaffId.Value);
            }

            // Filter by SearchTerm
            if (!string.IsNullOrEmpty(query.SearchTerm))
            {
                var lowerTerm = query.SearchTerm.ToLower();
                appointmentsQuery = appointmentsQuery.Where(a => 
                    a.Customer.FirstName.ToLower().Contains(lowerTerm) || 
                    a.Customer.LastName.ToLower().Contains(lowerTerm) || 
                    (a.Customer.FirstName + " " + a.Customer.LastName).ToLower().Contains(lowerTerm) ||
                    (a.Customer.Email != null && a.Customer.Email.ToLower().Contains(lowerTerm)) ||
                    a.Service.Name.ToLower().Contains(lowerTerm)
                );
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
                    ? query.EndDate.Value
                    : DateTime.SpecifyKind(query.EndDate.Value, DateTimeKind.Utc);

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

                "staff" => query.SortDirection.ToLower() == "asc"
                    ? appointmentsQuery.OrderBy(a => a.Staff != null ? a.Staff.FirstName : string.Empty)
                    : appointmentsQuery.OrderByDescending(a => a.Staff != null ? a.Staff.FirstName : string.Empty),

                "status" => query.SortDirection.ToLower() == "asc"
                    ? appointmentsQuery.OrderBy(a => a.Status)
                    : appointmentsQuery.OrderByDescending(a => a.Status),

                "id" => query.SortDirection.ToLower() == "asc"
                    ? appointmentsQuery.OrderBy(a => a.Id)
                    : appointmentsQuery.OrderByDescending(a => a.Id),

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
                CustomerEmail = a.Customer.Email ?? "",
                CustomerPhone = a.Customer.Phone ?? "",
                ServiceId = a.ServiceId,
                ServiceName = a.Service.Name,
                StaffId = a.StaffId,
                StaffName = a.Staff != null
                    ? $"{a.Staff.FirstName} {a.Staff.LastName}"
                    : "Unassigned",
                StartDateTime = a.StartDateTimeUtc,
                EndDateTime = a.EndDateTimeUtc,
                Duration = (int)Math.Round((a.EndDateTimeUtc - a.StartDateTimeUtc).TotalMinutes),
                MeetingType = a.MeetingType,
                Status = a.Status,
                CurrencyCode = a.CurrencyCode,
                Price = a.Price,
                PaymentMethod = a.PaymentMethod,
                PaymentStatus = a.PaymentStatus,
                CreatedAt = a.CreatedAt,
                Notes = a.Notes,
                CompanyPhone = a.Company?.Phone,
                CompanySlug = a.Company?.Slug
            }).ToList();

            // MERGE EXTERNAL CALENDAR EVENTS (Google Calendar)
            // Only merge if date range is provided (typical for calendar view)
            if (query.StartDate.HasValue && query.EndDate.HasValue)
            {
                var startDateUtc = query.StartDate.Value.Kind == DateTimeKind.Utc ? query.StartDate.Value : query.StartDate.Value.ToUniversalTime();
                var endDateUtc = query.EndDate.Value.Kind == DateTimeKind.Utc ? query.EndDate.Value : query.EndDate.Value.ToUniversalTime();
                
                var externalQuery = _context.ExternalCalendarEvents
                    .Include(e => e.Staff)
                    .Where(e => 
                        e.CompanyId == companyId &&
                        e.StartDateTimeUtc < endDateUtc &&
                        e.EndDateTimeUtc > startDateUtc);

                if (query.StaffId.HasValue)
                {
                    externalQuery = externalQuery.Where(e => e.StaffId == query.StaffId.Value);
                }
                else if (query.StaffIds != null && query.StaffIds.Any())
                {
                    externalQuery = externalQuery.Where(e => query.StaffIds.Contains(e.StaffId));
                }

                var externalEvents = await externalQuery.ToListAsync();
                
                // Map to AppointmentResponseDto
                foreach (var evt in externalEvents)
                {
                    // Find staff name if possible (optimization: could join or load earlier, but this is safe)
                    // We can reuse loaded staff if available or just leave null
                    // For calendar view, we often need the StaffId
                    
                    appointmentDtos.Add(new AppointmentResponseDto
                    {
                        Id = -evt.Id, // Negative ID to indicate external
                        CompanyId = evt.CompanyId,
                        CustomerId = 0,
                        CustomerName = "External Event",
                        CustomerEmail = "",
                        CustomerPhone = "",
                        ServiceId = 0,
                        ServiceName =  evt.Title ?? "Busy",
                        StaffId = evt.StaffId,
                        StaffName = evt.Staff != null 
                            ? $"{evt.Staff.FirstName} {evt.Staff.LastName}" 
                            : "Synced Staff", 
                        StartDateTime = evt.StartDateTimeUtc,
                        EndDateTime = evt.EndDateTimeUtc,
                        MeetingType = MeetingType.InPerson, 
                        Status = AppointmentStatus.Confirmed, // Treat as confirmed/busy
                        CurrencyCode = "USD",
                        Price = 0,
                        PaymentMethod = PaymentMethod.Cash,
                        PaymentStatus = PaymentStatus.Unpaid,
                        CreatedAt = evt.CreatedAt
                    });
                }
            }

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

            // Validate start time is in future - DISABLED to allow backdating/testing
            // if (dto.StartTime <= DateTime.UtcNow)
            //     return BadRequest(new { message = "Appointment must be scheduled for a future time." });

            // Parse Enums manually
            if (!Enum.TryParse<MeetingType>(dto.MeetingType, true, out var meetingType))
            {
                return BadRequest(new { message = $"Invalid MeetingType: {dto.MeetingType}" });
            }

            if (!Enum.TryParse<PaymentMethod>(dto.PaymentMethod, true, out var paymentMethod))
            {
                return BadRequest(new { message = $"Invalid PaymentMethod: {dto.PaymentMethod}" });
            }

            // STEP 1: VERIFY SERVICE EXISTS
            var service = await _context.Services
                .Include(s => s.Prices)
                .FirstOrDefaultAsync(s => s.Id == dto.ServiceId && s.IsActive);

            if (service == null)
                return NotFound("Service not found or is not active.");

            // STEP 2: GET PRICE FOR DEFAULT CURRENCY
            int companyId = service.CompanyId;
            var company = await _context.Companies.FindAsync(companyId);
            string currencyCode = dto.CurrencyCode?.ToUpperInvariant() 
                                 ?? company?.Currency 
                                 ?? _configuration["AppSettings:DefaultCurrency"] 
                                 ?? "USD";

            var servicePrice = service.Prices
                .FirstOrDefault(p => p.Currency == currencyCode.ToUpperInvariant());

            // If no specific currency price, use base service price
            decimal finalPrice = servicePrice?.Amount ?? service.Price;

            // STEP 2.5: HOLIDAY BLOCK (highest booking priority)
            // Convert the requested start time to the company timezone date, then check holidays.
            var companyTimezone = company?.Timezone ?? "UTC";
            TimeZoneInfo tz;
            try { tz = TimeZoneInfo.FindSystemTimeZoneById(companyTimezone); }
            catch { tz = TimeZoneInfo.Utc; }
            var startInCompanyTz = TimeZoneInfo.ConvertTimeFromUtc(dto.StartTime, tz);
            var appointmentDate = DateOnly.FromDateTime(startInCompanyTz);

            if (await IsHolidayAsync(companyId, appointmentDate))
                return BadRequest(new { message = "This date is a company holiday. Appointments cannot be booked on holidays." });

            // STEP 3: FIND OR CREATE CUSTOMER

            // Enforce at least one contact method
            if (string.IsNullOrWhiteSpace(dto.Email) && string.IsNullOrWhiteSpace(dto.Phone))
            {
                return BadRequest(new { message = "Either Email or Phone number is required to book an appointment." });
            }

            Customer? customer = null;
            string? normalizedEmail = !string.IsNullOrWhiteSpace(dto.Email) ? dto.Email.Trim().ToLowerInvariant() : null;
            string? phone = !string.IsNullOrWhiteSpace(dto.Phone) ? dto.Phone.Trim() : null;

            // 3a. Search by Email if provided
            if (normalizedEmail != null)
            {
                customer = await _context.Customers
                    .FirstOrDefaultAsync(c => c.CompanyId == companyId && c.IsActive && c.Email!.ToLower() == normalizedEmail);
            }

            // 3b. Search by Phone if still not found and phone provided
            if (customer == null && phone != null)
            {
                customer = await _context.Customers
                    .FirstOrDefaultAsync(c => c.CompanyId == companyId && c.IsActive && c.Phone == phone);
            }

            if (customer == null)
            {
                // Create new customer (guest booking)
                customer = new Customer
                {
                    CompanyId = companyId,
                    Email = normalizedEmail,
                    FirstName = dto.FirstName,
                    LastName = dto.LastName,
                    Phone = phone,
                    IsActive = true
                };

                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();
            }
            else
            {
                // Optional: Update customer details if they've changed (e.g. name or adding phone if missing)
                bool changed = false;
                if (string.IsNullOrWhiteSpace(customer.FirstName) || customer.FirstName != dto.FirstName) { customer.FirstName = dto.FirstName; changed = true; }
                if (string.IsNullOrWhiteSpace(customer.LastName) || customer.LastName != dto.LastName) { customer.LastName = dto.LastName; changed = true; }
                if (phone != null && customer.Phone != phone) { customer.Phone = phone; changed = true; }
                if (normalizedEmail != null && customer.Email != normalizedEmail) { customer.Email = normalizedEmail; changed = true; }
                
                if (changed)
                {
                    await _context.SaveChangesAsync();
                }
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
                    return BadRequest(new { message = "Selected staff member cannot provide this service." });
            }
            else
            {
                // Auto-assign: Find available staff using LOAD BALANCING strategy
                // 1. Get all staff who can provide this service
                var candidates = await _context.Staff
                    .Include(s => s.StaffServices)
                    .Where(s => s.CompanyId == companyId && 
                                s.IsActive && 
                                s.StaffServices.Any(ss => ss.ServiceId == dto.ServiceId && ss.IsActive))
                    .ToListAsync();

                if (!candidates.Any())
                    return Conflict(new { message = "No staff members are available for this service." });

                // 2. Filter candidates who are actually available at this time
                var availableCandidates = new List<Staff>();
                DateTime appointmentEnd = dto.StartTime.AddMinutes(service.ServiceDuration);

                foreach (var candidate in candidates)
                {
                    if (await IsSlotAvailableForBooking(candidate.Id, dto.StartTime, appointmentEnd))
                    {
                        availableCandidates.Add(candidate);
                    }
                }

                if (!availableCandidates.Any())
                {
                    return Conflict(new
                    {
                        message = "No staff members are available at this time.",
                        suggestion = "Please select a different time slot."
                    });
                }

                // 3. LOAD BALANCING: Pick the candidate with the FEWEST appointments on this day
                var candidateIds = availableCandidates.Select(s => s.Id).ToList();
                
                var appointmentCounts = await _context.Appointments
                    .Where(a => a.StaffId.HasValue && candidateIds.Contains(a.StaffId.Value) && // StaffId is nullable in Appointment
                                a.StartDateTimeUtc.Date == dto.StartTime.Date &&
                                a.Status != AppointmentStatus.Cancelled)
                    .GroupBy(a => a.StaffId)
                    .Select(g => new { StaffId = g.Key, Count = g.Count() })
                    .ToListAsync();

                // Join counts with candidates
                var candidatesWithCounts = availableCandidates.Select(staff => new 
                { 
                    Staff = staff, 
                    Count = appointmentCounts.FirstOrDefault(ac => ac.StaffId == staff.Id)?.Count ?? 0 
                })
                .OrderBy(x => x.Count) // Prioritize fewest appointments
                .ThenBy(x => Guid.NewGuid()) // Random tie-breaker
                .ToList();

                // Pick the winner
                assignedStaff = candidatesWithCounts.First().Staff;
            }

            // STEP 5: CALCULATE END TIME
            int effectiveDuration = dto.Duration ?? service.ServiceDuration;
            DateTime endTime = dto.StartTime.AddMinutes(effectiveDuration);

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
            var status = AppointmentStatus.Confirmed; // Default to Confirmed for Admin/Internal creation
            if (!string.IsNullOrEmpty(dto.Status))
            {
                if (!Enum.TryParse<AppointmentStatus>(dto.Status, true, out status))
                {
                    return BadRequest(new { message = $"Invalid AppointmentStatus: {dto.Status}" });
                }
            }

            var appointment = new Appointment
            {
                CompanyId = companyId,
                CustomerId = customer.Id,
                ServiceId = dto.ServiceId,
                StaffId = assignedStaff?.Id,
                StartDateTimeUtc = dto.StartTime,
                EndDateTimeUtc = endTime,
                MeetingType = meetingType,
                Status = status,
                RecurrenceRuleId = null,
                ParentAppointmentId = null,
                CurrencyCode = currencyCode,
                Price = dto.Price ?? finalPrice,
                PaymentStatus = PaymentStatus.Unpaid,
                PaymentMethod = paymentMethod,
                Timezone = dto.Timezone,
                Notes = dto.Notes
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

            // STEP 9: SEND EMAIL NOTIFICATIONS
            // We already have the company object from Step 2

            try 
            {
                // Only process notifications if company exists and status is Confirmed
                if (company != null && appointment.Status == AppointmentStatus.Confirmed) {
                     // Fetch configuration
                     var confirmationConfig = await _context.NotificationConfigs
                         .FirstOrDefaultAsync(c => c.CompanyId == companyId && c.Type == "appointmentConfirmation");
                     
                     bool timingImmedidate = confirmationConfig == null || 
                        (confirmationConfig.TimingContext == "immediately" || string.IsNullOrEmpty(confirmationConfig.TimingContext));

                     if (timingImmedidate)
                     {
                          string emailSubject = confirmationConfig?.Subject ?? $"Appointment Confirmation - {service.Name}";
                          string emailBody = confirmationConfig?.Body ?? $@"
                              <h2>Appointment Confirmed</h2>
                              <p>Dear {{{{customer.firstName}}}},</p>
                              <p>Your appointment for <strong>{{{{service.name}}}}</strong> has been confirmed.</p>
                              <ul>
                                  <li><strong>Date:</strong> {{{{appointment.date}}}}</li>
                                  <li><strong>Time:</strong> {{{{appointment.time}}}}</li>
                                  <li><strong>Staff:</strong> {{{{staff.name}}}}</li>
                              </ul>
                              <p>Thank you,<br/>{{{{company.name}}}}</p>
                          ";
                          
                          string frontendUrl = _configuration["AppSettings:FrontendUrl"] ?? "http://localhost:3000";

                          // Apply unified placeholder replacement
                          emailSubject = Appointmentbookingsystem.Backend.Utils.PlaceholderHelper.ReplacePlaceholders(emailSubject, appointment, company, frontendUrl);
                          emailBody = Appointmentbookingsystem.Backend.Utils.PlaceholderHelper.ReplacePlaceholders(emailBody, appointment, company, frontendUrl);

                          // --- SEND EMAIL ---
                          if (company.IsEmailServiceEnabled && (confirmationConfig?.IsEnabled ?? true) && !string.IsNullOrWhiteSpace(customer.Email))
                          {
                              try
                              {
                                 await _emailService.SendEmailAsync(
                                     customer.Email, 
                                     emailSubject, 
                                     emailBody, 
                                     company.DefaultSenderName ?? company.CompanyName,
                                     company.DefaultReplyToEmail,
                                     companyId,
                                     appointment.Id,
                                     confirmationConfig?.Id 
                                 );
                              }
                              catch (Exception ex)
                              {
                              }
                          }
                          else
                          {
                          }
                     }
                     else
                     {
                     }
                }
                else
                {
                }
            }
            catch (Exception ex)
            {
                // Log error but don't fail the request
            }

            // STEP 10: SYNC TO GOOGLE CALENDAR
            if (appointment.StaffId.HasValue)
            {
                // Await to ensure DbContext is not disposed before sync completes
                await _googleCalendarService.CreateGoogleEventAsync(appointment);
            }

            // STEP 9: BUILD AND RETURN RESPONSE
            var response = new AppointmentResponseDto
            {
                Id = appointment.Id,
                CustomerId = customer.Id,
                CustomerName = $"{customer.FirstName} {customer.LastName}",
                CustomerEmail = customer.Email ?? "",
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
                CreatedAt = appointment.CreatedAt,
                Notes = appointment.Notes,
                CompanyPhone = company?.Phone,
                CompanySlug = company?.Slug
            };

            return CreatedAtAction(
                nameof(CreateAppointment),
                new { id = appointment.Id },
                response
            );
        }

        /// <summary>
        /// PUT /api/appointments/{id} - Update an existing appointment
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<AppointmentResponseDto>> UpdateAppointment(int id, [FromBody] UpdateAppointmentDto dto)
        {
            var companyIdClaim = User.FindFirst("companyId");
            if (companyIdClaim == null) return Forbid("Company context missing.");
            int companyId = int.Parse(companyIdClaim.Value);

            var appointment = await _context.Appointments
                .Include(a => a.Customer)
                .Include(a => a.Service)
                .Include(a => a.Staff)
                .FirstOrDefaultAsync(a => a.Id == id && a.CompanyId == companyId);

            if (appointment == null) return NotFound("Appointment not found.");

            // Update basic fields
            if (dto.Notes != null) appointment.Notes = dto.Notes;
            if (dto.Timezone != null) appointment.Timezone = dto.Timezone;
            if (dto.CurrencyCode != null) appointment.CurrencyCode = dto.CurrencyCode;
            if (dto.Price.HasValue) appointment.Price = dto.Price.Value;
            
            // Update Status if provided
            if (!string.IsNullOrEmpty(dto.Status))
            {
                 if (Enum.TryParse<AppointmentStatus>(dto.Status, true, out var status))
                 {
                      // Detect Cancellation
                      if (status == AppointmentStatus.Cancelled && appointment.Status != AppointmentStatus.Cancelled)
                      {
                        // Set CancelledAt timestamp for delayed cancellation emails
                        appointment.CancelledAt = DateTime.UtcNow;
                        
                        // Check if cancellation notification is enabled
                        // Check if cancellation notification is enabled
                        // Note: We remove && c.IsEnabled to check Push separately
                        var config = await _context.NotificationConfigs
                            .FirstOrDefaultAsync(c => c.CompanyId == companyId && c.Type == "appointmentCancellation");
                            
                        // ONLY SEND IF TIMING CONTEXT IS "IMMEDIATELY" (or null/default)
                        if (config != null)
                        {
                             // Default to true/false based on config presence? If config present but IsEnabled=false, Email is disabled.
                             // But we already fetched it.
                             
                             if (config.TimingContext == "immediately" || string.IsNullOrEmpty(config.TimingContext))
                             {
                                 var company = await _context.Companies.FindAsync(companyId);

                                 string subject = config.Subject ?? "Appointment Cancelled";
                                 string body = config.Body ?? "Your appointment has been cancelled.";
                                 
                                 string frontendUrl = _configuration["AppSettings:FrontendUrl"] ?? "http://localhost:3000";

                                 // Apply unified placeholder replacement
                                 subject = Appointmentbookingsystem.Backend.Utils.PlaceholderHelper.ReplacePlaceholders(subject, appointment, company!, frontendUrl);
                                 body = Appointmentbookingsystem.Backend.Utils.PlaceholderHelper.ReplacePlaceholders(body, appointment, company!, frontendUrl);

                                 if (company!.IsEmailServiceEnabled && config.IsEnabled && !string.IsNullOrWhiteSpace(appointment.Customer.Email))
                                 {
                                     try 
                                     {
                                         await _emailService.SendEmailAsync(
                                             appointment.Customer.Email,
                                             subject,
                                             body,
                                             company?.DefaultSenderName ?? company?.CompanyName ?? "System",
                                             company?.DefaultReplyToEmail,
                                             companyId,
                                             appointment.Id,
                                             config.Id
                                         );
                                     }
                                     catch(Exception ex)
                                     {
                                     }
                                 }
                                 else
                                 {
                                 }
                             }
                             else
                             {
                             }
                        }
                        else
                        {
                        }
                      }
                      // Detect Confirmation (typically moving from Pending -> Confirmed)
                      else if (status == AppointmentStatus.Confirmed && appointment.Status != AppointmentStatus.Confirmed)
                      {
                           var config = await _context.NotificationConfigs
                               .FirstOrDefaultAsync(c => c.CompanyId == companyId && c.Type == "appointmentConfirmation");

                           // ONLY SEND IF TIMING CONTEXT IS "IMMEDIATELY" (or null/default)
                           if (config != null)
                           {
                               if (config.TimingContext == "immediately" || string.IsNullOrEmpty(config.TimingContext))
                               {
                                    var company = await _context.Companies.FindAsync(companyId);

                                    string subject = config.Subject ?? $"Appointment Confirmation - {appointment.Service.Name}";
                                    string body = config.Body ?? $@"
                                        <h2>Appointment Confirmed</h2>
                                        <p>Dear {{{{customer.firstName}}}},</p>
                                        <p>Your appointment for <strong>{{{{service.name}}}}</strong> has been confirmed.</p>
                                        <ul>
                                            <li><strong>Date:</strong> {{{{appointment.date}}}}</li>
                                            <li><strong>Time:</strong> {{{{appointment.time}}}}</li>
                                            <li><strong>Staff:</strong> {{{{staff.name}}}}</li>
                                        </ul>
                                        <p>Thank you,<br/>{{{{company.name}}}}</p>
                                    ";

                                    string frontendUrl = _configuration["AppSettings:FrontendUrl"] ?? "http://localhost:3000";

                                    // Apply unified placeholder replacement
                                    subject = Appointmentbookingsystem.Backend.Utils.PlaceholderHelper.ReplacePlaceholders(subject, appointment, company!, frontendUrl);
                                    body = Appointmentbookingsystem.Backend.Utils.PlaceholderHelper.ReplacePlaceholders(body, appointment, company!, frontendUrl);

                                    if (company!.IsEmailServiceEnabled && config.IsEnabled && !string.IsNullOrWhiteSpace(appointment.Customer.Email))
                                    {
                                        try
                                        {
                                            await _emailService.SendEmailAsync(
                                                appointment.Customer.Email,
                                                subject,
                                                body,
                                                company?.DefaultSenderName ?? company?.CompanyName ?? "System",
                                                company?.DefaultReplyToEmail,
                                                companyId,
                                                appointment.Id,
                                                config.Id
                                            );
                                        }
                                        catch (Exception ex)
                                        {
                                        }
                                    }
                                    else
                                    {
                                    }
                               }
                               else
                               {
                               }
                           }
                           else
                           {
                           }
                      }
                      appointment.Status = status;
                 }
                 else
                 {
                     return BadRequest(new { message = $"Invalid Status: {dto.Status}" });
                 }
            }

            // Update MeetingType
            if (!string.IsNullOrEmpty(dto.MeetingType))
            {
                if (Enum.TryParse<MeetingType>(dto.MeetingType, true, out var meetingType))
                    appointment.MeetingType = meetingType;
                else
                    return BadRequest(new { message = $"Invalid MeetingType: {dto.MeetingType}" });
            }

            // Update PaymentMethod
            if (!string.IsNullOrEmpty(dto.PaymentMethod))
            {
                if (Enum.TryParse<PaymentMethod>(dto.PaymentMethod, true, out var paymentMethod))
                    appointment.PaymentMethod = paymentMethod;
                 else
                    return BadRequest(new { message = $"Invalid PaymentMethod: {dto.PaymentMethod}" });
            }

            // Check if rescheduling needed (Service, Staff, or Time changed)
            bool rescheduling = false;
            int newServiceId = dto.ServiceId ?? appointment.ServiceId;
            int? newStaffId = dto.StaffId ?? appointment.StaffId; // Note: dto.StaffId might be explicit null if allowed, but DTO is nullable int
            DateTime newStartTime = dto.StartTime ?? appointment.StartDateTimeUtc;

            if (dto.ServiceId.HasValue && dto.ServiceId.Value != appointment.ServiceId) rescheduling = true;
            if (dto.StaffId.HasValue && dto.StaffId.Value != appointment.StaffId) rescheduling = true;
            if (dto.StartTime.HasValue && dto.StartTime.Value != appointment.StartDateTimeUtc) rescheduling = true;

            if (rescheduling)
            {
                 // Get Service Duration
                 var service = await _context.Services.FindAsync(newServiceId);
                 if (service == null) return BadRequest(new { message = "Service not found." });
                 
                 DateTime newEndTime = newStartTime.AddMinutes(service.ServiceDuration);

                 // Check conflict using comprehensive availability check (includes appointments, reservations, and Google Calendar events)
                 if (newStaffId.HasValue && newStaffId.Value != 0)
                 {
                     // Use IsSlotAvailableForBooking but we need to exclude the current appointment
                     // First check if slot is available in general
                     var isAvailable = await IsSlotAvailableForBooking(newStaffId.Value, newStartTime, newEndTime);
                     
                     if (!isAvailable)
                     {
                         // Slot is blocked - but we need to check if it's only blocked by the current appointment
                         var onlyBlockedByCurrentAppointment = await _context.Appointments
                             .Where(a => a.Id == id && // Only current appointment
                                        a.StaffId == newStaffId &&
                                        a.Status != AppointmentStatus.Cancelled &&
                                        a.StartDateTimeUtc < newEndTime &&
                                        a.EndDateTimeUtc > newStartTime)
                             .AnyAsync();
                         
                         // If NOT only blocked by current appointment, then there's a real conflict
                         if (!onlyBlockedByCurrentAppointment)
                         {
                             return Conflict(new { message = "This time slot is no longer available." });
                         }
                     }
                 }

                 appointment.ServiceId = newServiceId;
                 appointment.StaffId = newStaffId;
                 appointment.StartDateTimeUtc = newStartTime;
                 appointment.EndDateTimeUtc = newEndTime;
                 
                 // If service changed, maybe update price? 
                 // For now, keep original price unless logic defined, to avoid accidental price jumps.
                 // Ideally we'd re-fetch price.
            }

            // Update Price if provided
            if (dto.Price.HasValue)
            {
                appointment.Price = dto.Price.Value;
            }

            // Update Customer info if provided
            if (!string.IsNullOrEmpty(dto.Email) || !string.IsNullOrEmpty(dto.FirstName) || !string.IsNullOrEmpty(dto.LastName) || !string.IsNullOrEmpty(dto.Phone))
            {
                string? newEmail = !string.IsNullOrEmpty(dto.Email) ? dto.Email.Trim().ToLowerInvariant() : appointment.Customer.Email;
                string? currentEmail = appointment.Customer.Email;

                // Case 1: Email Changed
                if (newEmail != currentEmail)
                {
                    // Check if another customer exists with this new email
                    var existingCustomer = await _context.Customers
                        .FirstOrDefaultAsync(c => c.CompanyId == companyId && c.Email == newEmail);

                    if (existingCustomer != null)
                    {
                        // 1A: Switch to EXISTING customer
                        // Reassign appointment
                        appointment.CustomerId = existingCustomer.Id;
                        appointment.Customer = existingCustomer; // Update reference for subsequent logic

                        // Optionally update that existing customer's details if provided
                        if (!string.IsNullOrEmpty(dto.FirstName)) existingCustomer.FirstName = dto.FirstName;
                        if (!string.IsNullOrEmpty(dto.LastName))  existingCustomer.LastName = dto.LastName;
                        if (!string.IsNullOrEmpty(dto.Phone))     existingCustomer.Phone = dto.Phone;
                    }
                    else
                    {
                        // 1B: New Email (No existing customer) - Check History
                        // Does the CURRENT customer have OTHER appointments?
                        bool hasOtherAppointments = await _context.Appointments
                            .AnyAsync(a => a.CustomerId == appointment.CustomerId && a.Id != id);

                        if (hasOtherAppointments)
                        {
                            // 1B-i: Preserve History -> Create NEW Customer
                            var newCustomer = new Customer
                            {
                                CompanyId = companyId,
                                Email = newEmail,
                                FirstName = !string.IsNullOrEmpty(dto.FirstName) ? dto.FirstName : appointment.Customer.FirstName,
                                LastName = !string.IsNullOrEmpty(dto.LastName) ? dto.LastName : appointment.Customer.LastName,
                                Phone = !string.IsNullOrEmpty(dto.Phone) ? dto.Phone : appointment.Customer.Phone,
                                IsActive = true
                            };
                            _context.Customers.Add(newCustomer);
                            await _context.SaveChangesAsync(); // Save to get ID

                            appointment.CustomerId = newCustomer.Id;
                            appointment.Customer = newCustomer;
                        }
                        else
                        {
                            // 1B-ii: No History -> Safe to Rename (Fix Typo)
                            // Update current customer entity directly
                            appointment.Customer.Email = newEmail;
                            if (!string.IsNullOrEmpty(dto.FirstName)) appointment.Customer.FirstName = dto.FirstName;
                            if (!string.IsNullOrEmpty(dto.LastName))  appointment.Customer.LastName = dto.LastName;
                            if (!string.IsNullOrEmpty(dto.Phone))     appointment.Customer.Phone = dto.Phone;
                        }
                    }
                }
                else
                {
                    // Case 2: Email Unchanged (Just updating Name/Phone)
                    // Safe to update current customer as it's the same identity
                    if (!string.IsNullOrEmpty(dto.FirstName)) appointment.Customer.FirstName = dto.FirstName;
                    if (!string.IsNullOrEmpty(dto.LastName))  appointment.Customer.LastName = dto.LastName;
                    if (!string.IsNullOrEmpty(dto.Phone))     appointment.Customer.Phone = dto.Phone;
                }
            }

            await _context.SaveChangesAsync();

            // Refresh loaded data
            await _context.Entry(appointment).Reference(a => a.Staff).LoadAsync();
            await _context.Entry(appointment).Reference(a => a.Service).LoadAsync();
            await _context.Entry(appointment).Reference(a => a.Customer).LoadAsync();

            // SYNC TO GOOGLE CALENDAR
            if (appointment.StaffId.HasValue)
            {
                if (appointment.Status == AppointmentStatus.Cancelled)
                {
                    _ = _googleCalendarService.DeleteGoogleEventAsync(appointment);
                }
                else
                {
                    _ = _googleCalendarService.UpdateGoogleEventAsync(appointment);
                }
            }

            return Ok(new AppointmentResponseDto
            {
                Id = appointment.Id,
                CustomerId = appointment.CustomerId,
                CustomerName = $"{appointment.Customer.FirstName} {appointment.Customer.LastName}",
                CustomerEmail = appointment.Customer.Email ?? "",
                ServiceId = appointment.ServiceId,
                ServiceName = appointment.Service.Name,
                StaffId = appointment.StaffId,
                StaffName = appointment.Staff?.FirstName + " " + appointment.Staff?.LastName ?? "Unassigned",
                StartDateTime = appointment.StartDateTimeUtc,
                EndDateTime = appointment.EndDateTimeUtc,
                Status = appointment.Status,
                MeetingType = appointment.MeetingType,
                PaymentMethod = appointment.PaymentMethod,
                Price = appointment.Price,
                CreatedAt = appointment.CreatedAt,
                Notes = appointment.Notes,
                CompanyPhone = appointment.Company?.Phone,
                CompanySlug = appointment.Company?.Slug
            });
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

            // Check existing appointments (including their buffer time)
            var appointmentsWithBuffer = await _context.Appointments
                .Include(a => a.Service)
                .Where(a => a.StaffId == staffId && a.Status != AppointmentStatus.Cancelled)
                .ToListAsync();

            foreach (var a in appointmentsWithBuffer)
            {
                int buffer = a.Service?.BufferTimeMinutes ?? 0;
                DateTime blockedEnd = a.EndDateTimeUtc.AddMinutes(buffer);

                // Check if the new appointment overlaps with the existing appointment OR its buffer
                if (startTime < blockedEnd && endTime > a.StartDateTimeUtc)
                {
                    return false;
                }
            }


            // Check active reservations
            var now = DateTime.UtcNow;
            var hasReservationConflict = await _context.AppointmentReservations
                .AnyAsync(r =>
                    r.StaffId == staffId &&
                    r.ExpiresAt > now &&
                    r.StartDateTime < endTime &&
                    r.EndDateTime > startTime);

            if (hasReservationConflict) return false;

            // Check external calendar events (Google Calendar)
            var hasExternalConflict = await _context.ExternalCalendarEvents
                .AnyAsync(e =>
                    e.StaffId == staffId &&
                    e.StartDateTimeUtc < endTime &&
                    e.EndDateTimeUtc > startTime);

            if (hasExternalConflict) return false;

            // Check if it's a holiday (highest priority)
            // Resolve companyId from staff
            var staff = await _context.Staff.FindAsync(staffId);
            if (staff != null)
            {
                var appointmentDate = DateOnly.FromDateTime(startTime);
                if (await IsHolidayAsync(staff.CompanyId, appointmentDate))
                    return false;
            }

            return true;
        }

        /// <summary>
        /// Returns true if <paramref name="date"/> is a holiday for <paramref name="companyId"/>.
        /// Handles both exact-date holidays and RepeatYearly (same month+day every year).
        /// </summary>
        private async Task<bool> IsHolidayAsync(int companyId, DateOnly date)
        {
            return await _context.Holidays.AnyAsync(h =>
                h.CompanyId == companyId &&
                (
                    // Exact date (non-repeating)
                    (!h.RepeatYearly && h.Date == date) ||
                    // Repeating: same month and day, any year
                    (h.RepeatYearly && h.Date.Month == date.Month && h.Date.Day == date.Day)
                ));
        }

        // --- Token-Based Access (Public/Manage Booking) ---

        [HttpGet("by-token/{token}")]
        [AllowAnonymous]
        public async Task<ActionResult<AppointmentResponseDto>> GetAppointmentByToken(Guid token)
        {
            var appointment = await _context.Appointments
                .Include(a => a.Customer)
                .Include(a => a.Service)
                .Include(a => a.Staff)
                .Include(a => a.Company)
                .FirstOrDefaultAsync(a => a.BookingToken == token);

            if (appointment == null) return NotFound("Appointment not found or invalid token.");

            // Fetch customer stats for today and upcoming appointments
            var upcomingAppointments = await _context.Appointments
                .Include(a => a.Service)
                .Where(a => a.CustomerId == appointment.CustomerId && a.StartDateTimeUtc >= DateTime.UtcNow.Date)
                .OrderByDescending(a => a.StartDateTimeUtc)
                .ToListAsync();

            // Calculate total upcoming bookings
            var totalAppointments = upcomingAppointments.Count;
            
            // Calculate unpaid balance from ALL appointments (past, present, future)
            var unpaidAmount = await _context.Appointments
                .Where(a => a.CustomerId == appointment.CustomerId && 
                           a.PaymentStatus == PaymentStatus.Unpaid && 
                           a.Status != AppointmentStatus.Cancelled)
                .SumAsync(a => a.Price);


            var otherAppointments = upcomingAppointments
                .Where(a => a.Id != appointment.Id) // Exclude current one from "Other" list
                .Take(5) // Just show a few
                .Select(a => new SimpleAppointmentDto
                {
                    Id = a.Id,
                    ServiceName = a.Service?.Name ?? "Unknown Service",
                    StartDateTime = a.StartDateTimeUtc,
                    Status = a.Status,
                    PaymentStatus = a.PaymentStatus,
                    Price = a.Price,
                    CurrencyCode = a.CurrencyCode
                })
                .ToList();

            // Return DTO
            return Ok(new AppointmentResponseDto
            {
                Id = appointment.Id,
                CustomerId = appointment.CustomerId,
                CustomerName = $"{appointment.Customer.FirstName} {appointment.Customer.LastName}",
                CustomerEmail = appointment.Customer.Email ?? "",
                CustomerPhone = appointment.Customer.Phone ?? "",
                ServiceId = appointment.ServiceId,
                ServiceName = appointment.Service.Name,
                StaffId = appointment.StaffId,
                StaffName = appointment.Staff?.FirstName + " " + appointment.Staff?.LastName ?? "Unassigned",
                StartDateTime = appointment.StartDateTimeUtc,
                EndDateTime = appointment.EndDateTimeUtc,
                Status = appointment.Status,
                MeetingType = appointment.MeetingType,
                PaymentMethod = appointment.PaymentMethod,
                Price = appointment.Price,
                CreatedAt = appointment.CreatedAt,
                Notes = appointment.Notes,
                CurrencyCode = appointment.CurrencyCode,
                PaymentStatus = appointment.PaymentStatus,
                CompanyPhone = appointment.Company?.Phone,
                CompanySlug = appointment.Company?.Slug,
                AllowCustomerRescheduling = appointment.Company?.AllowCustomerRescheduling ?? true,
                ReschedulingMinLeadTime = appointment.Company?.ReschedulingMinLeadTime ?? 24,
                AllowCustomerCanceling = appointment.Company?.AllowCustomerCanceling ?? true,
                CancelingMinLeadTime = appointment.Company?.CancelingMinLeadTime ?? 24,
                
                // Add Stats
                CustomerTotalAppointments = totalAppointments,
                CustomerTotalUnpaidAmount = unpaidAmount,
                CustomerOtherAppointments = otherAppointments
            });

        }

        [HttpPost("cancel-by-token")]
        [AllowAnonymous]
        public async Task<IActionResult> CancelAppointmentByToken([FromBody] CancelAppointmentByTokenDto dto)
        {
            var appointment = await _context.Appointments
                .Include(a => a.Customer)
                .Include(a => a.Service)
                .Include(a => a.Staff)
                .FirstOrDefaultAsync(a => a.BookingToken == dto.Token);

            if (appointment == null) return NotFound("Appointment not found or invalid token.");

            if (appointment.Status == AppointmentStatus.Cancelled)
                return BadRequest("Appointment is already cancelled.");

            // Business Rules: Check if company allows customer cancellation and lead time
            var company = await _context.Companies.FindAsync(appointment.CompanyId);
            if (company == null) return NotFound("Company not found.");

            if (!company.AllowCustomerCanceling)
            {
                return BadRequest("Online cancellation is disabled for this business. Please contact them directly.");
            }

            var now = DateTime.UtcNow;
            var cancelDeadline = appointment.StartDateTimeUtc.AddHours(-company.CancelingMinLeadTime);
            if (now > cancelDeadline)
            {
                return BadRequest($"Cancellations are only allowed at least {company.CancelingMinLeadTime} hours before the appointment. Please contact the business directly.");
            }

            // Basic check: If start time is in the past, block.
            if (appointment.StartDateTimeUtc <= DateTime.UtcNow)
                return BadRequest("Cannot cancel past appointments.");

            // Update status
            appointment.Status = AppointmentStatus.Cancelled;
            appointment.CancellationReason = dto.Reason;
            appointment.UpdatedAt = DateTime.UtcNow;

            // SEND EMAIL
            try 
            {
                if (company.IsEmailServiceEnabled)
                {
                    var config = await _context.NotificationConfigs
                        .FirstOrDefaultAsync(c => c.CompanyId == company.Id && c.Type == "appointmentCancellation" && c.IsEnabled);
                    
                    if (config != null)
                    {
                        string subject = config.Subject ?? "Appointment Cancelled";
                        string body = config.Body ?? "Your appointment has been cancelled.";
                        
                        string frontendUrl = _configuration["AppSettings:FrontendUrl"] ?? "http://localhost:3000";

                        // Apply unified placeholder replacement
                        subject = Appointmentbookingsystem.Backend.Utils.PlaceholderHelper.ReplacePlaceholders(subject, appointment, company, frontendUrl);
                        body = Appointmentbookingsystem.Backend.Utils.PlaceholderHelper.ReplacePlaceholders(body, appointment, company, frontendUrl);

                        if (!string.IsNullOrWhiteSpace(appointment.Customer.Email))
                        {
                            await _emailService.SendEmailAsync(
                                appointment.Customer.Email,
                            subject,
                            body,
                            company.DefaultSenderName ?? company.CompanyName,
                            company.DefaultReplyToEmail,
                            company.Id,
                            appointment.Id,
                            config.Id
                        );
                    }
                }
                }
            }
            catch(Exception ex)
            {
            }

            await _context.SaveChangesAsync();

            // SYNC GOOGLE CALENDAR
            if (appointment.StaffId.HasValue)
            {
                try 
                {
                    await _googleCalendarService.DeleteGoogleEventAsync(appointment);
                }
                catch (Exception ex)
                {
                }
            }

            return Ok(new { message = "Appointment cancelled successfully." });
        }

        [HttpPost("reschedule-by-token")]
        [AllowAnonymous]
        public async Task<IActionResult> RescheduleAppointmentByToken([FromBody] RescheduleAppointmentByTokenDto dto)
        {
            
            var appointment = await _context.Appointments
                .Include(a => a.Customer)
                .Include(a => a.Service)
                .Include(a => a.Staff)
                .Include(a => a.Company)
                .FirstOrDefaultAsync(a => a.BookingToken == dto.Token);

            if (appointment == null) return NotFound("Appointment not found or invalid token.");

            if (appointment.Status == AppointmentStatus.Cancelled)
                return BadRequest("Cannot reschedule a cancelled appointment.");

            // Basic check: If original start time is in the past, block.
            if (appointment.StartDateTimeUtc <= DateTime.UtcNow)
                return BadRequest("Cannot reschedule past appointments.");

            // Validate new start time is in the future
            if (dto.NewStartTime <= DateTime.UtcNow)
                return BadRequest("The new appointment time must be in the future.");

            var company = appointment.Company;
            if (company == null) return NotFound("Company not found.");

            // ADMIN RULES
            if (!company.AllowCustomerRescheduling)
                return BadRequest("Rescheduling is currently disabled by the business administrator.");

            if (appointment.StartDateTimeUtc.AddHours(-company.ReschedulingMinLeadTime) < DateTime.UtcNow)
                return BadRequest($"Appointments must be rescheduled at least {company.ReschedulingMinLeadTime} hours in advance.");

            if (appointment.PaymentStatus == PaymentStatus.Unpaid)
            {
                // Re-fetch current service price (could have changed)
                appointment.Price = appointment.Service.Price;
            }

            // Calculate new end time based on service duration
            DateTime newEndTime = dto.NewStartTime.AddMinutes(appointment.Service.ServiceDuration);

            // Check availability for assigned staff
            if (appointment.StaffId.HasValue)
            {
                // Note: We need to EXCLUDE the current appointment to avoid self-conflict
                var hasConflict = await _context.Appointments
                    .AnyAsync(a => a.Id != appointment.Id &&
                                 a.StaffId == appointment.StaffId &&
                                 a.Status != AppointmentStatus.Cancelled &&
                                 a.StartDateTimeUtc < newEndTime &&
                                 a.EndDateTimeUtc > dto.NewStartTime);

                if (hasConflict)
                {
                    return Conflict(new { message = "Selected staff member is not available at this new time." });
                }
            }

            // Update appointment
            appointment.StartDateTimeUtc = dto.NewStartTime;
            appointment.EndDateTimeUtc = newEndTime;
            appointment.UpdatedAt = DateTime.UtcNow;

            // SEND EMAIL
            try 
            {
                if (company.IsEmailServiceEnabled)
                {
                    // Look for reschedule notification config, or fallback to confirmation
                    var config = await _context.NotificationConfigs
                        .FirstOrDefaultAsync(c => c.CompanyId == company.Id && c.Type == "appointmentReschedule" && c.IsEnabled)
                        ?? await _context.NotificationConfigs
                        .FirstOrDefaultAsync(c => c.CompanyId == company.Id && c.Type == "appointmentConfirmation" && c.IsEnabled);
                    
                    if (config != null)
                    {
                        string subject = config.Subject ?? "Appointment Rescheduled";
                        string body = config.Body ?? "Your appointment has been successfully rescheduled.";
                        
                        string frontendUrl = _configuration["AppSettings:FrontendUrl"] ?? "http://localhost:3000";

                        subject = Appointmentbookingsystem.Backend.Utils.PlaceholderHelper.ReplacePlaceholders(subject, appointment, company, frontendUrl);
                        body = Appointmentbookingsystem.Backend.Utils.PlaceholderHelper.ReplacePlaceholders(body, appointment, company, frontendUrl);

                        if (!string.IsNullOrWhiteSpace(appointment.Customer.Email))
                        {
                            await _emailService.SendEmailAsync(
                                appointment.Customer.Email,
                            subject,
                            body,
                            company.DefaultSenderName ?? company.CompanyName,
                            company.DefaultReplyToEmail,
                            company.Id,
                            appointment.Id,
                            config.Id
                        );
                    }
                }
                }
            }
            catch(Exception ex)
            {
            }

            await _context.SaveChangesAsync();

            // SYNC GOOGLE CALENDAR
            if (appointment.StaffId.HasValue)
            {
                try 
                {
                    await _googleCalendarService.UpdateGoogleEventAsync(appointment);
                }
                catch (Exception ex)
                {
                }
            }

            return Ok(new { message = "Appointment rescheduled successfully." });
        }
    }
}
