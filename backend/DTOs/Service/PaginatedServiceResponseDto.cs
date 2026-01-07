using Appointmentbookingsystem.Backend.DTOs.Service;

namespace Appointmentbookingsystem.Backend.DTOs.Service
{
    public class PaginatedServiceResponseDto
    {
        public List<CustomerServiceDto> Items { get; set; } = new();
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public bool HasNextPage { get; set; }
        public bool HasPreviousPage { get; set; }
    }
}
