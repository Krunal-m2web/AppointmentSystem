namespace Appointmentbookingsystem.Backend.DTOs.Appointment
{
    // This class wraps appointments data with pagination info
    public class PaginatedAppointmentsResponseDto
    {
        // The actual list of appointments
        public List<AppointmentResponseDto> Appointments { get; set; } = new List<AppointmentResponseDto>();

        // Total number of appointments (across all pages)
        public int TotalCount { get; set; }

        // Current page number
        public int Page { get; set; }

        // Number of items per page
        public int PageSize { get; set; }

        // Total number of pages
        public int TotalPages { get; set; }

        // Has next page
        public bool HasNextPage { get; set; }

        // Has previous page
        public bool HasPreviousPage { get; set; }
     
    }
}
