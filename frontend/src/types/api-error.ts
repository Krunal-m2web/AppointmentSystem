/**
 * TypeScript interface matching backend ApiErrorResponse.
 * All API errors from the backend will use this format.
 */
export interface ApiErrorResponse {
  success: false;
  errorCode: string;
  message: string;
  field?: string | null;
  details?: string[] | null;
}

/**
 * Check if an error object matches the ApiErrorResponse structure.
 */
export function isApiErrorResponse(obj: unknown): obj is ApiErrorResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "success" in obj &&
    (obj as ApiErrorResponse).success === false &&
    "errorCode" in obj &&
    "message" in obj
  );
}

/**
 * Error code constants matching the backend.
 * Used for mapping error codes to UI behavior.
 */
export const ValidationErrors = {
  REQUIRED_FIELD: "REQUIRED_FIELD",
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_PHONE: "INVALID_PHONE",
  INVALID_FORMAT: "INVALID_FORMAT",
  PASSWORD_TOO_SHORT: "PASSWORD_TOO_SHORT",
  PASSWORD_TOO_WEAK: "PASSWORD_TOO_WEAK",
  INVALID_DATE: "INVALID_DATE",
  INVALID_TIME: "INVALID_TIME",
  INVALID_DURATION: "INVALID_DURATION",
  INVALID_PRICE: "INVALID_PRICE",
  VALUE_OUT_OF_RANGE: "VALUE_OUT_OF_RANGE",
} as const;

export const BusinessErrors = {
  DUPLICATE_ENTITY: "DUPLICATE_ENTITY",
  DUPLICATE_EMAIL: "DUPLICATE_EMAIL",
  DUPLICATE_COMPANY_NAME: "DUPLICATE_COMPANY_NAME",
  DUPLICATE_SLUG: "DUPLICATE_SLUG",
  APPOINTMENT_OVERLAP: "APPOINTMENT_OVERLAP",
  PAST_DATE_BOOKING: "PAST_DATE_BOOKING",
  STAFF_UNAVAILABLE: "STAFF_UNAVAILABLE",
  SERVICE_INACTIVE: "SERVICE_INACTIVE",
  STAFF_INACTIVE: "STAFF_INACTIVE",
  CUSTOMER_INACTIVE: "CUSTOMER_INACTIVE",
  INVALID_INVITE: "INVALID_INVITE",
  INVITE_EXPIRED: "INVITE_EXPIRED",
  INVITE_ALREADY_USED: "INVITE_ALREADY_USED",
  CANNOT_DELETE: "CANNOT_DELETE",
  TIME_OFF_OVERLAP: "TIME_OFF_OVERLAP",
  ALREADY_EXISTS: "ALREADY_EXISTS",
} as const;

export const AuthorizationErrors = {
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  ACCOUNT_INACTIVE: "ACCOUNT_INACTIVE",
  FORBIDDEN: "FORBIDDEN",
  UNAUTHORIZED: "UNAUTHORIZED",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  TOKEN_INVALID: "TOKEN_INVALID",
  ACCESS_DENIED: "ACCESS_DENIED",
} as const;

export const NotFoundErrors = {
  NOT_FOUND: "NOT_FOUND",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  STAFF_NOT_FOUND: "STAFF_NOT_FOUND",
  CUSTOMER_NOT_FOUND: "CUSTOMER_NOT_FOUND",
  SERVICE_NOT_FOUND: "SERVICE_NOT_FOUND",
  APPOINTMENT_NOT_FOUND: "APPOINTMENT_NOT_FOUND",
  COMPANY_NOT_FOUND: "COMPANY_NOT_FOUND",
  INVITE_NOT_FOUND: "INVITE_NOT_FOUND",
} as const;
