namespace Appointmentbookingsystem.Backend.DTOs
{
    /// <summary>
    /// Unified API error response model.
    /// All errors from the API will use this format.
    /// </summary>
    public class ApiErrorResponse
    {
        public bool Success { get; set; } = false;
        public string ErrorCode { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string? Field { get; set; }
        public List<string>? Details { get; set; }

        public static ApiErrorResponse Create(string errorCode, string message, string? field = null, List<string>? details = null)
        {
            return new ApiErrorResponse
            {
                Success = false,
                ErrorCode = errorCode,
                Message = message,
                Field = field,
                Details = details
            };
        }
    }
}
