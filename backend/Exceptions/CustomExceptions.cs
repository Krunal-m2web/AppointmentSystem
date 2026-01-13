namespace Appointmentbookingsystem.Backend.Exceptions
{
    /// <summary>
    /// Thrown when a validation error occurs (e.g., required field missing, invalid format).
    /// Maps to HTTP 400 Bad Request.
    /// </summary>
    public class ValidationException : Exception
    {
        public string ErrorCode { get; }
        public string? Field { get; }

        public ValidationException(string errorCode, string message, string? field = null)
            : base(message)
        {
            ErrorCode = errorCode;
            Field = field;
        }
    }

    /// <summary>
    /// Thrown when a business rule is violated (e.g., appointment overlap, past date booking).
    /// Maps to HTTP 422 Unprocessable Entity.
    /// </summary>
    public class BusinessRuleException : Exception
    {
        public string ErrorCode { get; }
        public List<string>? Details { get; }

        public BusinessRuleException(string errorCode, string message, List<string>? details = null)
            : base(message)
        {
            ErrorCode = errorCode;
            Details = details;
        }
    }

    /// <summary>
    /// Thrown when a resource is not found.
    /// Maps to HTTP 404 Not Found.
    /// </summary>
    public class NotFoundException : Exception
    {
        public string ErrorCode { get; }

        public NotFoundException(string errorCode, string message)
            : base(message)
        {
            ErrorCode = errorCode;
        }

        public NotFoundException(string message) : base(message)
        {
            ErrorCode = "NOT_FOUND";
        }
    }

    /// <summary>
    /// Thrown when the user doesn't have permission to access a resource.
    /// Maps to HTTP 403 Forbidden.
    /// </summary>
    public class ForbiddenException : Exception
    {
        public string ErrorCode { get; }

        public ForbiddenException(string errorCode, string message)
            : base(message)
        {
            ErrorCode = errorCode;
        }

        public ForbiddenException(string message) : base(message)
        {
            ErrorCode = "FORBIDDEN";
        }
    }

    /// <summary>
    /// Thrown when a duplicate entity is detected.
    /// Maps to HTTP 409 Conflict.
    /// </summary>
    public class ConflictException : Exception
    {
        public string ErrorCode { get; }
        public string? Field { get; }

        public ConflictException(string errorCode, string message, string? field = null)
            : base(message)
        {
            ErrorCode = errorCode;
            Field = field;
        }
    }

    /// <summary>
    /// Thrown when authentication fails.
    /// Maps to HTTP 401 Unauthorized.
    /// </summary>
    public class UnauthorizedException : Exception
    {
        public string ErrorCode { get; }

        public UnauthorizedException(string errorCode, string message)
            : base(message)
        {
            ErrorCode = errorCode;
        }

        public UnauthorizedException(string message) : base(message)
        {
            ErrorCode = "UNAUTHORIZED";
        }
    }
}
