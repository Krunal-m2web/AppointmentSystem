import { ApiErrorResponse, isApiErrorResponse } from "../types/api-error";

/**
 * Parse error response from API into a user-friendly message.
 * Handles both new ApiErrorResponse format and legacy formats.
 */
export function parseErrorMessage(errorText: string): string {
  if (!errorText) return "An unexpected error occurred";

  try {
    const errorObj = JSON.parse(errorText);

    // 1. Handle new ApiErrorResponse format
    if (isApiErrorResponse(errorObj)) {
      return errorObj.message;
    }

    // 2. Handle ASP.NET Core ValidationProblemDetails (legacy)
    if (errorObj.errors && typeof errorObj.errors === "object") {
      const errorList: string[] = [];

      for (const field in errorObj.errors) {
        const messages = errorObj.errors[field];
        if (Array.isArray(messages)) {
          errorList.push(...messages);
        } else if (typeof messages === "string") {
          errorList.push(messages);
        }
      }

      if (errorList.length > 0) {
        return errorList.join(" ");
      }
    }

    // 3. Handle simple { message: "..." } or { error: "..." }
    if (errorObj.message) return errorObj.message;
    if (errorObj.error) return errorObj.error;
    if (errorObj.title && errorObj.status !== 400) return errorObj.title;
  } catch {
    // Not JSON, return as is
  }

  return errorText || "An unexpected error occurred";
}

/**
 * Parse API error response and return structured error info.
 * Returns the full ApiErrorResponse if available, or a fallback.
 */
export function parseApiError(errorText: string): ApiErrorResponse {
  if (!errorText) {
    return {
      success: false,
      errorCode: "UNKNOWN_ERROR",
      message: "An unexpected error occurred",
      field: null,
      details: null,
    };
  }

  try {
    const errorObj = JSON.parse(errorText);

    // Handle new ApiErrorResponse format
    if (isApiErrorResponse(errorObj)) {
      return errorObj;
    }

    // Handle legacy formats
    const message = parseErrorMessage(errorText);
    return {
      success: false,
      errorCode: "LEGACY_ERROR",
      message,
      field: null,
      details: null,
    };
  } catch {
    return {
      success: false,
      errorCode: "UNKNOWN_ERROR",
      message: errorText,
      field: null,
      details: null,
    };
  }
}

/**
 * Determine if an error code is a field validation error.
 * Used to show errors under specific form fields.
 */
export function isFieldError(errorCode: string): boolean {
  const fieldErrors = [
    "REQUIRED_FIELD",
    "INVALID_EMAIL",
    "INVALID_PHONE",
    "INVALID_FORMAT",
    "PASSWORD_TOO_SHORT",
    "PASSWORD_TOO_WEAK",
    "INVALID_DATE",
    "INVALID_TIME",
    "INVALID_DURATION",
    "INVALID_PRICE",
    "VALUE_OUT_OF_RANGE",
    "DUPLICATE_EMAIL",
    "DUPLICATE_COMPANY_NAME",
  ];
  return fieldErrors.includes(errorCode);
}

/**
 * Determine if an error code is an authentication error.
 * Used to redirect to login or show access denied.
 */
export function isAuthError(errorCode: string): boolean {
  const authErrors = [
    "INVALID_CREDENTIALS",
    "ACCOUNT_INACTIVE",
    "FORBIDDEN",
    "UNAUTHORIZED",
    "TOKEN_EXPIRED",
    "TOKEN_INVALID",
    "ACCESS_DENIED",
  ];
  return authErrors.includes(errorCode);
}
