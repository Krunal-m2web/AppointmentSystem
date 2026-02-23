using System;

namespace Appointmentbookingsystem.Backend.DTOs.Customer
{
    public class LogQueryDto
    {
        public int Days { get; set; } = 30;
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string? Type { get; set; } // "email" or "sms"
    }
}
