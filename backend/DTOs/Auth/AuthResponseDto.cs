namespace Appointmentbookingsystem.Backend.DTOs.Auth
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Role { get; set; } = null!;
        public int? CompanyId { get; set; }
        public string? CompanyName { get; set; }
    }
}