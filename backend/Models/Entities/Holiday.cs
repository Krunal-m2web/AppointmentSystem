using System.ComponentModel.DataAnnotations;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class Holiday : IHasTimestamps
    {
        public int Id { get; set; }

        // FK to Company (company-scoped holiday)
        [Required]
        public int CompanyId { get; set; }
        public Company Company { get; set; } = null!;

        /// <summary>
        /// The calendar date of the holiday (stored as DateOnly — no time component).
        /// For repeating holidays this is the original date; Month+Day are used each year.
        /// </summary>
        [Required]
        public DateOnly Date { get; set; }

        [Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// When true, Month+Day of <see cref="Date"/> is treated as a holiday every year.
        /// </summary>
        public bool RepeatYearly { get; set; } = false;

        /// <summary>
        /// 'custom' for manually created holidays, or a country code (e.g. 'IN', 'US')
        /// for imported public holidays.
        /// </summary>
        [MaxLength(10)]
        public string Source { get; set; } = "custom";

        /// <summary>Human-readable country name when Source is a country code.</summary>
        [MaxLength(100)]
        public string? CountryName { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
