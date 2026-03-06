namespace Appointmentbookingsystem.Backend.DTOs.Holiday
{
    /// <summary>Response DTO — mirrors the frontend Holiday interface.</summary>
    public class HolidayDto
    {
        public int Id { get; set; }
        /// <summary>YYYY-MM-DD</summary>
        public string Date { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public bool RepeatYearly { get; set; }
        public string Source { get; set; } = "custom";
        public string? CountryName { get; set; }
    }

    /// <summary>Create / import a single holiday.</summary>
    public class CreateHolidayDto
    {
        /// <summary>YYYY-MM-DD</summary>
        public string Date { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public bool RepeatYearly { get; set; }
        public string Source { get; set; } = "custom";
        public string? CountryName { get; set; }
    }

    /// <summary>Bulk-create many holidays at once (Import + Bulk-select).</summary>
    public class BulkCreateHolidayDto
    {
        public List<CreateHolidayDto> Holidays { get; set; } = new();
    }

    /// <summary>Update name and/or RepeatYearly of an existing holiday.</summary>
    public class UpdateHolidayDto
    {
        public string Name { get; set; } = string.Empty;
        public bool RepeatYearly { get; set; }
    }

    /// <summary>Body for bulk delete request.</summary>
    public class BulkDeleteDto
    {
        public List<int> Ids { get; set; } = new();
    }

    /// <summary>Represents a country whose holidays have been imported.</summary>
    public class ImportedCountryDto
    {
        public string Source { get; set; } = string.Empty;
        public string CountryName { get; set; } = string.Empty;
    }
}
