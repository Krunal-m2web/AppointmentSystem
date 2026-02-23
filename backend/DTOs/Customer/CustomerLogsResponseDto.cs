using System;
using System.Collections.Generic;

namespace Appointmentbookingsystem.Backend.DTOs.Customer
{
    public class CustomerLogsResponseDto
    {
        public List<LogEntryDto> Logs { get; set; } = new List<LogEntryDto>();
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public bool HasNextPage { get; set; }
    }

    public class LogEntryDto
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
        public string Subject { get; set; } // For Email
        public string Message { get; set; } // For SMS
        public string Status { get; set; }
    }
}
