using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.DTOs.StaffService
{
    /// <summary>
    /// DTO for assigning services to staff with optional custom pricing
    /// </summary>
    public class AssignServiceToStaffDto
    {
        [Required]
        public int StaffId { get; set; }

        [Required]
        public int ServiceId { get; set; }

        /// <summary>
        /// Optional custom price for this staff member (overrides service base price)
        /// </summary>
        public decimal? CustomPrice { get; set; }

        /// <summary>
        /// Optional custom duration in minutes (overrides service duration)
        /// </summary>
        public int? CustomDuration { get; set; }
    }

    public class UpdateStaffServiceDto
    {
        public decimal? CustomPrice { get; set; }
        public int? CustomDuration { get; set; }
        public bool? IsActive { get; set; }
    }

    public class StaffServiceResponseDto
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public string StaffName { get; set; } = null!;
        public int ServiceId { get; set; }
        public string ServiceName { get; set; } = null!;
        
        /// <summary>
        /// Custom price if set, otherwise null (use service base price)
        /// </summary>
        public decimal? CustomPrice { get; set; }
        
        /// <summary>
        /// Custom duration if set, otherwise null (use service duration)
        /// </summary>
        public int? CustomDuration { get; set; }
        
        /// <summary>
        /// Effective price - CustomPrice if set, otherwise service base price
        /// </summary>
        public decimal EffectivePrice { get; set; }
        
        /// <summary>
        /// Effective duration - CustomDuration if set, otherwise service duration
        /// </summary>
        public int EffectiveDuration { get; set; }
        
        public bool IsActive { get; set; }
    }
}
