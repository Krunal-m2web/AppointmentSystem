namespace Appointmentbookingsystem.Backend.DTOs
{
    public class CreateStaffInviteDto
    {
        public string? Email { get; set; }
    }

    public class ValidateInviteResponseDto
    {
        public bool IsValid { get; set; }
        public int? CompanyId { get; set; }
        public string? CompanyName { get; set; }
        public string? Email { get; set; }
    }

    public class StaffInviteResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string InviteLink { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
    }
}
