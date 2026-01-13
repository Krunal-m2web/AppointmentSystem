using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.Appointment // Defines what filters users can send 
{
    public class GetAppointmentsQueryDto      
    {
         // Filter by status: "all", "pending", "confirmed", "cancelled", "completed"
         public string? Status { get; set; } = "all";

         // Filter by specific staff member
         public int? StaffId { get; set;}
         public List<int>? StaffIds { get; set; }

         // Search Term
         public string? SearchTerm { get; set; }

         // Filter by Customer
         public int? CustomerId { get; set;}

         // Filter by Service
         public int? ServiceId { get; set;}

         // Filter by date range
         public DateTime? StartDate { get; set;}
         public DateTime? EndDate { get; set;}

         
        // Pagination - which page to show (default: page 1)
        [Range(1, int.MaxValue)]
        public int Page { get; set; } = 1;

        // Pagination - number of items per page (default: 25, MAX: 100000)
        [Range(1, 100000)]
        public int PageSize { get; set; } = 25;

        
        // Sort by: "date", "customer", "service", "status"
        public string SortBy { get; set; } = "date";

        public string SortDirection { get; set; } = "asc";
 

    }
}
