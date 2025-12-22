using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.DTOs.Availability;
using Appointmentbookingsystem.Backend.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Appointmentbookingsystem.Backend.Controllers
{
    [Route("api/availability")]
    [ApiController]
    public class AvailabilityController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Private record to hold slot information internally
        private record BookedSlot(DateTime Start, DateTime End);

        public AvailabilityController(AppDbContext context)
        {
            _context = context;
        }

        // ===== WEEKLY SCHEDULE MANAGEMENT ENDPOINTS =====

        /// <summary>
        /// POST /api/availability - Create new availability slot
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<AvailabilityResponseDto>> CreateAvailability(
            [FromBody] SetAvailabilityDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Verify staff exists
            var staff = await _context.Staff.FindAsync(dto.StaffId);
            if (staff == null)
                return NotFound("Staff member not found.");

            // Validate time range
            if (dto.StartTime >= dto.EndTime)
                return BadRequest("Start time must be before end time.");

            // Check for overlapping availability
            var hasOverlap = await _context.Availabilities
                .AnyAsync(a =>
                    a.StaffId == dto.StaffId &&
                    a.DayOfWeek == dto.DayOfWeek &&
                    a.IsAvailable &&
                    ((dto.StartTime >= a.StartTime && dto.StartTime < a.EndTime) ||
                     (dto.EndTime > a.StartTime && dto.EndTime <= a.EndTime) ||
                     (dto.StartTime <= a.StartTime && dto.EndTime >= a.EndTime)));

            if (hasOverlap)
                return Conflict("This time slot overlaps with an existing availability.");

            var availability = new Availability
            {
                StaffId = dto.StaffId,
                DayOfWeek = dto.DayOfWeek,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                IsAvailable = dto.IsAvailable,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Availabilities.Add(availability);
            await _context.SaveChangesAsync();

            var response = new AvailabilityResponseDto
            {
                Id = availability.Id,
                StaffId = availability.StaffId,
                StaffName = $"{staff.FirstName} {staff.LastName}",
                DayOfWeek = availability.DayOfWeek,
                StartTime = availability.StartTime,
                EndTime = availability.EndTime,
                IsAvailable = availability.IsAvailable
            };

            return CreatedAtAction(nameof(GetStaffSchedule), new { staffId = dto.StaffId }, response);
        }

        /// <summary>
        /// GET /api/availability/staff/{staffId} - Get weekly schedule for a staff member
        /// </summary>
        [HttpGet("staff/{staffId}")]
        public async Task<ActionResult<List<AvailabilityResponseDto>>> GetStaffSchedule(int staffId)
        {
            var staff = await _context.Staff.FindAsync(staffId);
            if (staff == null)
                return NotFound("Staff member not found.");

            var availabilities = await _context.Availabilities
                .Where(a => a.StaffId == staffId)
                .OrderBy(a => a.DayOfWeek)
                .ThenBy(a => a.StartTime)
                .ToListAsync();

            var response = availabilities.Select(a => new AvailabilityResponseDto
            {
                Id = a.Id,
                StaffId = a.StaffId,
                StaffName = $"{staff.FirstName} {staff.LastName}",
                DayOfWeek = a.DayOfWeek,
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                IsAvailable = a.IsAvailable
            }).ToList();

            return Ok(response);
        }

        /// <summary>
        /// PUT /api/availability/{id} - Update an existing availability slot
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<AvailabilityResponseDto>> UpdateAvailability(
            int id,
            [FromBody] UpdateAvailabilityDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var availability = await _context.Availabilities
                .Include(a => a.Staff)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (availability == null)
                return NotFound("Availability slot not found.");

            // Validate time range
            if (dto.StartTime >= dto.EndTime)
                return BadRequest("Start time must be before end time.");

            // Check for overlapping availability (excluding current slot)
            var hasOverlap = await _context.Availabilities
                .AnyAsync(a =>
                    a.Id != id &&
                    a.StaffId == availability.StaffId &&
                    a.DayOfWeek == availability.DayOfWeek &&
                    a.IsAvailable &&
                    ((dto.StartTime >= a.StartTime && dto.StartTime < a.EndTime) ||
                     (dto.EndTime > a.StartTime && dto.EndTime <= a.EndTime) ||
                     (dto.StartTime <= a.StartTime && dto.EndTime >= a.EndTime)));

            if (hasOverlap)
                return Conflict("This time slot overlaps with an existing availability.");

            availability.StartTime = dto.StartTime;
            availability.EndTime = dto.EndTime;
            availability.IsAvailable = dto.IsAvailable;
            availability.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            var response = new AvailabilityResponseDto
            {
                Id = availability.Id,
                StaffId = availability.StaffId,
                StaffName = $"{availability.Staff.FirstName} {availability.Staff.LastName}",
                DayOfWeek = availability.DayOfWeek,
                StartTime = availability.StartTime,
                EndTime = availability.EndTime,
                IsAvailable = availability.IsAvailable
            };

            return Ok(response);
        }

        /// <summary>
        /// DELETE /api/availability/{id} - Delete an availability slot
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAvailability(int id)
        {
            var availability = await _context.Availabilities.FindAsync(id);

            if (availability == null)
                return NotFound("Availability slot not found.");

            _context.Availabilities.Remove(availability);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ===== SLOT AVAILABILITY ENDPOINTS =====

        /// <summary>
        /// GET /api/availability/slots?staffId=1&serviceId=2&date=2025-12-15
        /// Returns available time slots for a specific staff member, service, and date
        /// </summary>
        [HttpGet("slots")]
        public async Task<ActionResult<List<TimeSlotDto>>> GetAvailableSlots(
            [FromQuery] int staffId,
            [FromQuery] int serviceId,
            [FromQuery] DateTime date)
        {
            // STEP 1: VALIDATE INPUTS
            
            // Check if staff exists and is active
            var staff = await _context.Staff.FindAsync(staffId);
            if (staff == null || !staff.IsActive)
                return NotFound("Staff member not found or is inactive.");

            // Check if service exists and is active
            var service = await _context.Services.FindAsync(serviceId);
            if (service == null || !service.IsActive)
                return NotFound("Service not found or is inactive.");

            // Verify staff can provide this service (via StaffServices junction)
            var canProvideService = await _context.StaffServices
                .AnyAsync(ss => ss.StaffId == staffId && ss.ServiceId == serviceId && ss.IsActive);

            if (!canProvideService)
                return BadRequest("This staff member cannot provide the selected service.");

            // Don't allow booking in the past
            if (date.Date < DateTime.UtcNow.Date)
                return BadRequest("Cannot book appointments in the past.");

            
            // STEP 2: GET STAFF AVAILABILITY FOR THIS DAY
            
            DayOfWeek dayOfWeek = date.DayOfWeek;

            var availability = await _context.Availabilities
                .FirstOrDefaultAsync(a => 
                    a.StaffId == staffId && 
                    a.DayOfWeek == dayOfWeek &&
                    a.IsAvailable);

            if (availability == null)
            {
                // Staff doesn't work on this day
                return Ok(new List<TimeSlotDto>());
            }

            
            // STEP 3: GET ALL BLOCKING FACTORS
            
            // 3a. Get approved time-offs for this date
            var timeOffs = await _context.TimeOffs
                .Where(t => 
                    t.StaffId == staffId &&
                    t.Status == TimeOffStatus.Approved &&
                    t.StartDateTimeUtc.Date <= date.Date &&
                    t.EndDateTimeUtc.Date >= date.Date)
                .ToListAsync();

            // 3b. Get existing confirmed appointments
            var existingAppointments = await _context.Appointments
                .Where(a => 
                    a.StaffId == staffId &&
                    a.StartDateTimeUtc.Date == date.Date &&
                    a.Status != AppointmentStatus.Cancelled)
                .Select(a => new BookedSlot(a.StartDateTimeUtc, a.EndDateTimeUtc))
                .ToListAsync();

            // 3c. Get active reservations (not expired)
            var now = DateTime.UtcNow;
            var activeReservations = await _context.AppointmentReservations
                .Where(r => 
                    r.StaffId == staffId &&
                    r.StartDateTime.Date == date.Date &&
                    r.ExpiresAt > now)
                .Select(r => new BookedSlot(r.StartDateTime, r.EndDateTime))
                .ToListAsync();

            
            // STEP 4: GENERATE TIME SLOTS
            
            var slots = new List<TimeSlotDto>();

            // Convert availability times to UTC DateTime for the selected date
            DateTime workDayStart = DateTime.SpecifyKind(
                date.Date.Add(availability.StartTime), 
                DateTimeKind.Utc);
            
            DateTime workDayEnd = DateTime.SpecifyKind(
                date.Date.Add(availability.EndTime), 
                DateTimeKind.Utc);

            // Generate slots every 30 minutes (you can adjust this interval)
            int slotIntervalMinutes = 30;
            DateTime currentSlotStart = workDayStart;

            while (currentSlotStart.AddMinutes(service.ServiceDuration) <= workDayEnd)
            {
                DateTime currentSlotEnd = currentSlotStart.AddMinutes(service.ServiceDuration);

                // Check if this slot is available
                bool isAvailable = IsSlotAvailable(
                    currentSlotStart,
                    currentSlotEnd,
                    timeOffs,
                    existingAppointments,
                    activeReservations,
                    date);

                // Only return available slots
                if (isAvailable)
                {
                    slots.Add(new TimeSlotDto
                    {
                        StartTime = currentSlotStart,
                        EndTime = currentSlotEnd,
                        IsAvailable = true
                    });
                }

                // Move to next potential slot
                currentSlotStart = currentSlotStart.AddMinutes(slotIntervalMinutes);
            }

            return Ok(slots);
        }

        /// <summary>
        /// Helper method to check if a time slot is available
        /// Returns true if slot is free, false if there's a conflict
        /// </summary>
        private bool IsSlotAvailable(
            DateTime slotStart,
            DateTime slotEnd,
            List<TimeOff> timeOffs,
            List<BookedSlot> existingAppointments,
            List<BookedSlot> activeReservations,
            DateTime date)
        {
            // Check against time-offs (now using StartDateTimeUtc/EndDateTimeUtc)
            foreach (var timeOff in timeOffs)
            {
                // For time-offs that span the entire date
                if (slotStart < timeOff.EndDateTimeUtc && slotEnd > timeOff.StartDateTimeUtc)
                    return false;
            }

            // Check against existing appointments
            foreach (var appointment in existingAppointments)
            {
                if (slotStart < appointment.End && 
                    slotEnd > appointment.Start)
                    return false;
            }

            // Check against active reservations
            foreach (var reservation in activeReservations)
            {
                if (slotStart < reservation.End && 
                    slotEnd > reservation.Start)
                    return false;
            }

            // No conflicts found - slot is available
            return true;
        }
    }
}