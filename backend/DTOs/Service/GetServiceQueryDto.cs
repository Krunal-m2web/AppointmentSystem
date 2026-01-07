namespace Appointmentbookingsystem.Backend.DTOs.Service
{
    public class GetServiceQueryDto
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string SortBy { get; set; } = "name";
        public string SortDirection { get; set; } = "asc";
        public string? SearchTerm { get; set; }
        public int? CompanyId { get; set; }
        public string? Currency { get; set; }
    }
}
