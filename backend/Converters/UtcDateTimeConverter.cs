using System.Text.Json;
using System.Text.Json.Serialization;

namespace Appointmentbookingsystem.Backend.Converters
{
    /// <summary>
    /// Custom JSON converter that ensures all DateTime values are serialized as UTC with Z suffix.
    /// This fixes timezone issues where JavaScript interprets datetimes without Z as local time.
    /// </summary>
    public class UtcDateTimeConverter : JsonConverter<DateTime>
    {
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var dateString = reader.GetString();
            if (string.IsNullOrEmpty(dateString))
                return DateTime.MinValue;
            
            // Parse the date and ensure it's treated as UTC
            var parsed = DateTime.Parse(dateString);
            
            // If it doesn't have a kind, assume UTC
            if (parsed.Kind == DateTimeKind.Unspecified)
                return DateTime.SpecifyKind(parsed, DateTimeKind.Utc);
            
            return parsed.ToUniversalTime();
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            // Always output as UTC with Z suffix
            var utcValue = value.Kind == DateTimeKind.Utc 
                ? value 
                : DateTime.SpecifyKind(value, DateTimeKind.Utc);
            
            writer.WriteStringValue(utcValue.ToString("yyyy-MM-ddTHH:mm:ss.fffZ"));
        }
    }
}
