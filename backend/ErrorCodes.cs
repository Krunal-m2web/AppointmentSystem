namespace Appointmentbookingsystem.Backend
{
    /// <summary>
    /// Error codes for validation errors (HTTP 400).
    /// </summary>
    public static class ValidationErrors
    {
        public const string REQUIRED_FIELD = "REQUIRED_FIELD";
        public const string INVALID_EMAIL = "INVALID_EMAIL";
        public const string INVALID_PHONE = "INVALID_PHONE";
        public const string INVALID_FORMAT = "INVALID_FORMAT";
        public const string PASSWORD_TOO_SHORT = "PASSWORD_TOO_SHORT";
        public const string PASSWORD_TOO_WEAK = "PASSWORD_TOO_WEAK";
        public const string INVALID_DATE = "INVALID_DATE";
        public const string INVALID_TIME = "INVALID_TIME";
        public const string INVALID_DURATION = "INVALID_DURATION";
        public const string INVALID_PRICE = "INVALID_PRICE";
        public const string VALUE_OUT_OF_RANGE = "VALUE_OUT_OF_RANGE";
    }

    /// <summary>
    /// Error codes for business rule violations (HTTP 422).
    /// </summary>
    public static class BusinessErrors
    {
        public const string DUPLICATE_ENTITY = "DUPLICATE_ENTITY";
        public const string DUPLICATE_EMAIL = "DUPLICATE_EMAIL";
        public const string DUPLICATE_COMPANY_NAME = "DUPLICATE_COMPANY_NAME";
        public const string DUPLICATE_SLUG = "DUPLICATE_SLUG";
        public const string APPOINTMENT_OVERLAP = "APPOINTMENT_OVERLAP";
        public const string PAST_DATE_BOOKING = "PAST_DATE_BOOKING";
        public const string STAFF_UNAVAILABLE = "STAFF_UNAVAILABLE";
        public const string SERVICE_INACTIVE = "SERVICE_INACTIVE";
        public const string STAFF_INACTIVE = "STAFF_INACTIVE";
        public const string CUSTOMER_INACTIVE = "CUSTOMER_INACTIVE";
        public const string INVALID_INVITE = "INVALID_INVITE";
        public const string INVITE_EXPIRED = "INVITE_EXPIRED";
        public const string INVITE_ALREADY_USED = "INVITE_ALREADY_USED";
        public const string CANNOT_DELETE = "CANNOT_DELETE";
        public const string TIME_OFF_OVERLAP = "TIME_OFF_OVERLAP";
        public const string ALREADY_EXISTS = "ALREADY_EXISTS";
    }

    /// <summary>
    /// Error codes for authorization errors (HTTP 401/403).
    /// </summary>
    public static class AuthorizationErrors
    {
        public const string INVALID_CREDENTIALS = "INVALID_CREDENTIALS";
        public const string ACCOUNT_INACTIVE = "ACCOUNT_INACTIVE";
        public const string FORBIDDEN = "FORBIDDEN";
        public const string UNAUTHORIZED = "UNAUTHORIZED";
        public const string TOKEN_EXPIRED = "TOKEN_EXPIRED";
        public const string TOKEN_INVALID = "TOKEN_INVALID";
        public const string ACCESS_DENIED = "ACCESS_DENIED";
    }

    /// <summary>
    /// Error codes for not found errors (HTTP 404).
    /// </summary>
    public static class NotFoundErrors
    {
        public const string NOT_FOUND = "NOT_FOUND";
        public const string USER_NOT_FOUND = "USER_NOT_FOUND";
        public const string STAFF_NOT_FOUND = "STAFF_NOT_FOUND";
        public const string CUSTOMER_NOT_FOUND = "CUSTOMER_NOT_FOUND";
        public const string SERVICE_NOT_FOUND = "SERVICE_NOT_FOUND";
        public const string APPOINTMENT_NOT_FOUND = "APPOINTMENT_NOT_FOUND";
        public const string COMPANY_NOT_FOUND = "COMPANY_NOT_FOUND";
        public const string INVITE_NOT_FOUND = "INVITE_NOT_FOUND";
    }
}
