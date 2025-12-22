namespace Appointmentbookingsystem.Backend.DTOs.Staff
{
    /// <summary>
    /// Simplified DTO for staff member - used in dropdowns or lists
    /// </summary>
    public class StaffMemberDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string? Position { get; set; }
    }
}
