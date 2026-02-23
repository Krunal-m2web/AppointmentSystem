using Appointmentbookingsystem.Backend.Models.Entities;
using System.Text.RegularExpressions;

namespace Appointmentbookingsystem.Backend.Utils
{
    public static class PlaceholderHelper
    {
        public static string ReplacePlaceholders(string template, Appointment appointment, Company company, string frontendUrl)
        {
            if (string.IsNullOrEmpty(template)) return string.Empty;

            // 1. Determine Timezone
            string timezoneId = appointment.Timezone ?? company.Timezone ?? "UTC";
            DateTime zonedStart = ConvertToTimezone(appointment.StartDateTimeUtc, timezoneId);
            DateTime zonedEnd = ConvertToTimezone(appointment.EndDateTimeUtc, timezoneId);
            string tzAbbr = GetTimezoneAbbreviation(timezoneId);

            // 2. Calculate Duration
            TimeSpan duration = appointment.EndDateTimeUtc - appointment.StartDateTimeUtc;
            string durationStr = FormatDuration(duration);

            var replacements = new Dictionary<string, string>
            {
                // Date/Time in target timezone
                { "{{appointment.date}}", zonedStart.ToString("MMMM dd, yyyy") }, // Long date: January 30, 2026
                { "{{appointment.time}}", zonedStart.ToString("h:mm tt") }, // e.g. 2:30 PM
                { "{{appointment.dateTime}}", $"{zonedStart.ToString("MMMM dd, yyyy")} at {zonedStart.ToString("h:mm tt")}" },
                { "{{appointment.duration}}", durationStr },
                { "{{appointment.timezone}}", timezoneId },
                { "{{appointment.id}}", appointment.Id.ToString() },

                // Customer details
                { "{{customer.firstName}}", appointment.Customer?.FirstName ?? "" },
                { "{{customer.lastName}}", appointment.Customer?.LastName ?? "" },
                { "{{customer.fullName}}", $"{appointment.Customer?.FirstName} {appointment.Customer?.LastName}".Trim() },
                { "{{customer.name}}", $"{appointment.Customer?.FirstName} {appointment.Customer?.LastName}".Trim() },
                { "{{customer.email}}", appointment.Customer?.Email ?? "" },
                { "{{customer.phone}}", appointment.Customer?.Phone ?? "" },

                // Service details
                { "{{service.name}}", appointment.Service?.Name ?? "" },
                { "{{service.price}}", $"{appointment.Price:N2} {appointment.CurrencyCode ?? company.Currency}" },
                { "{{service.description}}", appointment.Service?.Description ?? "" },

                // Staff details
                { "{{staff.name}}", appointment.Staff != null ? $"{appointment.Staff.FirstName} {appointment.Staff.LastName}".Trim() : "Staff" },
                { "{{staff.email}}", appointment.Staff?.Email ?? "" },
                { "{{staff.title}}", "" }, // Place holder for future use if title is added to Staff entity

                // Company details
                { "{{company.name}}", company.CompanyName ?? "" },
                { "{{company.phone}}", company.Phone ?? "" },
                { "{{company.email}}", company.Email ?? "" },
                { "{{company.website}}", company.WebsiteUrl ?? "" },
                { "{{company.address}}", company.Address ?? "" },

                // Links
                { "{{link.cancel}}", $"{frontendUrl.TrimEnd('/')}/booking/manage/{appointment.BookingToken}" },
                { "{{link.reschedule}}", $"{frontendUrl.TrimEnd('/')}/booking/manage/{appointment.BookingToken}?reschedule=true" },

                // Legacy support
                { "{{customerName}}", $"{appointment.Customer?.FirstName} {appointment.Customer?.LastName}".Trim() },
                { "{{serviceName}}", appointment.Service?.Name ?? "" },
                { "{{staffName}}", appointment.Staff != null ? $"{appointment.Staff.FirstName} {appointment.Staff.LastName}".Trim() : "Staff" },
                { "{{dateTime}}", $"{zonedStart.ToString("MMMM dd, yyyy")} at {zonedStart.ToString("h:mm tt")}" }
            };

            string result = template;
            foreach (var replacement in replacements)
            {
                // Replace both double and single brace versions
                // e.g., {{customer.firstName}} and {customer.firstName}
                result = result.Replace(replacement.Key, replacement.Value);
                
                string singleBraceKey = replacement.Key.Replace("{{", "{").Replace("}}", "}");
                result = result.Replace(singleBraceKey, replacement.Value);
            }

            return result;
        }

        private static DateTime ConvertToTimezone(DateTime utcDateTime, string timezoneId)
        {
            if (string.IsNullOrEmpty(timezoneId) || timezoneId == "UTC" || timezoneId == "GMT") return utcDateTime;

            try
            {
                var ianaToWindows = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
                     { "Asia/Kolkata", "India Standard Time" },
                     { "Asia/Calcutta", "India Standard Time" },
                     { "America/New_York", "Eastern Standard Time" },
                     { "America/Chicago", "Central Standard Time" },
                     { "America/Denver", "Mountain Standard Time" },
                     { "America/Los_Angeles", "Pacific Standard Time" },
                     { "Europe/London", "GMT Standard Time" },
                     { "Europe/Paris", "Central European Standard Time" },
                     { "Europe/Berlin", "Central European Standard Time" },
                     { "Australia/Sydney", "AUS Eastern Standard Time" }
                 };

                string winId = ianaToWindows.TryGetValue(timezoneId, out var mapped) ? mapped : timezoneId;

                TimeZoneInfo tz;
                try {
                    tz = TimeZoneInfo.FindSystemTimeZoneById(winId);
                } catch {
                    tz = TimeZoneInfo.FindSystemTimeZoneById(timezoneId);
                }

                return TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, tz);
            }
            catch
            {
                // Fallback to UTC if timezone not found
                return utcDateTime;
            }
        }

        private static string GetTimezoneAbbreviation(string timezoneId)
        {
            if (string.IsNullOrEmpty(timezoneId) || timezoneId == "UTC" || timezoneId == "GMT") return "GMT";
            
            try 
            {
                 // Handle IANA IDs to Windows IDs mapping for Windows hosting
                 // Common IANA -> Windows mappings
                 var ianaToWindows = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
                     { "Asia/Kolkata", "India Standard Time" },
                     { "Asia/Calcutta", "India Standard Time" },
                     { "America/New_York", "Eastern Standard Time" },
                     { "America/Chicago", "Central Standard Time" },
                     { "America/Denver", "Mountain Standard Time" },
                     { "America/Los_Angeles", "Pacific Standard Time" },
                     { "Europe/London", "GMT Standard Time" },
                     { "Europe/Paris", "Central European Standard Time" },
                     { "Europe/Berlin", "Central European Standard Time" },
                     { "Australia/Sydney", "AUS Eastern Standard Time" }
                 };

                 string winId = ianaToWindows.TryGetValue(timezoneId, out var mapped) ? mapped : timezoneId;
                 
                 TimeZoneInfo tz;
                 try {
                    tz = TimeZoneInfo.FindSystemTimeZoneById(winId);
                 } catch {
                    // If winId fails, try original timezoneId just in case
                    tz = TimeZoneInfo.FindSystemTimeZoneById(timezoneId);
                 }

                 string standardName = tz.StandardName;
                 
                 // Mapping common names to short codes
                 var mapping = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
                     { "India Standard Time", "IST" },
                     { "Eastern Standard Time", "EST" },
                     { "Pacific Standard Time", "PST" },
                     { "Mountain Standard Time", "MST" },
                     { "Central Standard Time", "CST" },
                     { "GMT Standard Time", "GMT" },
                     { "W. Europe Standard Time", "CET" },
                     { "Central Europe Standard Time", "CET" },
                     { "Romance Standard Time", "CET" }
                 };

                 if (mapping.TryGetValue(standardName, out var abbr)) return abbr;

                 // Check if the name itself is a short code (e.g. "IST" returned by some systems)
                 if (standardName.Length <= 4 && !standardName.Contains(" ")) return standardName;

                 // Fallback: GMT offset
                 TimeSpan offset = tz.GetUtcOffset(DateTime.UtcNow);
                 string sign = offset.Ticks >= 0 ? "+" : "-";
                 return $"GMT{sign}{Math.Abs(offset.Hours):00}:{Math.Abs(offset.Minutes):00}";
            }
            catch 
            { 
                // Final fallback: if timezoneId looks like an offset, use it
                if (timezoneId.StartsWith("GMT") || timezoneId.StartsWith("UTC")) return "GMT";
                return "GMT"; 
            }
        }

        private static string FormatDuration(TimeSpan duration)
        {
            if (duration.TotalMinutes < 60)
                return $"{duration.TotalMinutes} mins";
            
            if (duration.TotalMinutes == 60)
                return "1 hour";

            return $"{duration.Hours}h {duration.Minutes}m"; 
        }
    }
}
