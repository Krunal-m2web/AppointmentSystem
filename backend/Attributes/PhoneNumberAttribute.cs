using System.ComponentModel.DataAnnotations;
using PhoneNumbers;

namespace Appointmentbookingsystem.Backend.Attributes
{
    public class PhoneNumberAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
            {
                return ValidationResult.Success; // Allow nulls, use [Required] for mandatory fields
            }

            var phoneNumberStr = value as string;
            if (string.IsNullOrWhiteSpace(phoneNumberStr))
            {
                 return ValidationResult.Success; // Allow empty strings if not required
            }

            try
            {
                var phoneUtil = PhoneNumberUtil.GetInstance();
                // Parse the number. The frontend sends E.164 (+1234567890), so we don't strictly need a default region.
                // However, passing a default region (e.g. "US") handles cases where the + is missing better, 
                // though strictly we expect international format.
                // We'll use "ZZ" or null as default region to force international format if possible, 
                // but "US" is a safer fallback if we want to be lenient.
                // Given the requirement is strict E.164 from frontend, we expect it to start with +.
                
                var phoneNumber = phoneUtil.Parse(phoneNumberStr, null);

                if (!phoneUtil.IsValidNumber(phoneNumber))
                {
                    return new ValidationResult("Invalid phone number format.");
                }
                
                // Optional: Check if it matches E.164 format strictly if needed, 
                // but IsValidNumber checks if it's a real possible number.
                
                return ValidationResult.Success;
            }
            catch (NumberParseException)
            {
                return new ValidationResult("Invalid phone number format.");
            }
        }
    }
}
