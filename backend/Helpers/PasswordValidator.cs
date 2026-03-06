using System.Text.RegularExpressions;

namespace Appointmentbookingsystem.Backend.Helpers
{
    public class PasswordValidator
    {
        private static readonly string[] CommonPasswords = new[]
        {
            "password", "password123", "admin123", "welcome", "12345678", "qwertyuiop"
        };

        public static (bool IsValid, string? ErrorMessage) Validate(string password, string? email = null)
        {
            if (string.IsNullOrWhiteSpace(password))
                return (false, "Password is required.");

            if (password.Length < 8)
                return (false, "Password must be at least 8 characters long.");

            if (password.Contains(" "))
                return (false, "Password cannot contain spaces.");

            if (!Regex.IsMatch(password, @"[A-Z]"))
                return (false, "Password must contain at least one uppercase letter.");

            if (!Regex.IsMatch(password, @"[a-z]"))
                return (false, "Password must contain at least one lowercase letter.");

            if (!Regex.IsMatch(password, @"[0-9]"))
                return (false, "Password must contain at least one number.");

            if (!Regex.IsMatch(password, @"[!@#$%^&*(),.? ""':{}|<>]"))
                return (false, "Password must contain at least one special character.");

            if (CommonPasswords.Any(cp => password.ToLower().Contains(cp)))
                return (false, "Password is too common or easily guessable.");

            if (email != null && password.ToLower() == email.ToLower())
                return (false, "Password cannot be the same as your email address.");

            return (true, null);
        }
    }
}
