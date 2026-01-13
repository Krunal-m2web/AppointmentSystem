namespace Appointmentbookingsystem.Backend.DTOs.Staff
{
    public class StaffResponseDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }

        // Personal Info
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Phone { get; set; }
        public string? Address { get; set; }

        // Status
        public bool IsActive { get; set; }

        // Notes
        public string? Notes { get; set; }

        // Services assigned (via StaffService junction)
        public List<StaffServiceInfoDto> Services { get; set; } = new();

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    // Nested DTO for service info with custom pricing
    public class StaffServiceInfoDto
    {
        public int Id { get; set; }
        public int ServiceId { get; set; }
        public string ServiceName { get; set; } = null!;
        public decimal? CustomPrice { get; set; }
        public int? CustomDuration { get; set; }
        public decimal EffectivePrice { get; set; }
        public int EffectiveDuration { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}