using System.Net;
using System.Text.Json;
using Appointmentbookingsystem.Backend.DTOs;
using Appointmentbookingsystem.Backend.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Appointmentbookingsystem.Backend.Middleware
{
    /// <summary>
    /// Global exception handling middleware.
    /// Catches all exceptions and returns consistent ApiErrorResponse.
    /// </summary>
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var response = context.Response;
            response.ContentType = "application/json";

            ApiErrorResponse errorResponse;
            HttpStatusCode statusCode;

            switch (exception)
            {
                case ValidationException validationEx:
                    statusCode = HttpStatusCode.BadRequest;
                    errorResponse = ApiErrorResponse.Create(
                        validationEx.ErrorCode,
                        validationEx.Message,
                        validationEx.Field
                    );
                    break;

                case BusinessRuleException businessEx:
                    statusCode = HttpStatusCode.UnprocessableEntity;
                    errorResponse = ApiErrorResponse.Create(
                        businessEx.ErrorCode,
                        businessEx.Message,
                        details: businessEx.Details
                    );
                    break;

                case ConflictException conflictEx:
                    statusCode = HttpStatusCode.Conflict;
                    errorResponse = ApiErrorResponse.Create(
                        conflictEx.ErrorCode,
                        conflictEx.Message,
                        conflictEx.Field
                    );
                    break;

                case NotFoundException notFoundEx:
                    statusCode = HttpStatusCode.NotFound;
                    errorResponse = ApiErrorResponse.Create(
                        notFoundEx.ErrorCode,
                        notFoundEx.Message
                    );
                    break;

                case ForbiddenException forbiddenEx:
                    statusCode = HttpStatusCode.Forbidden;
                    errorResponse = ApiErrorResponse.Create(
                        forbiddenEx.ErrorCode,
                        forbiddenEx.Message
                    );
                    break;

                case UnauthorizedException unauthorizedEx:
                    statusCode = HttpStatusCode.Unauthorized;
                    errorResponse = ApiErrorResponse.Create(
                        unauthorizedEx.ErrorCode,
                        unauthorizedEx.Message
                    );
                    break;

                case DbUpdateException dbEx:
                    statusCode = HttpStatusCode.Conflict;
                    var innerMessage = dbEx.InnerException?.Message ?? dbEx.Message;
                    
                    // Check for unique constraint violations
                    if (innerMessage.Contains("UNIQUE") || innerMessage.Contains("duplicate"))
                    {
                        errorResponse = ApiErrorResponse.Create(
                            BusinessErrors.DUPLICATE_ENTITY,
                            "A record with this value already exists."
                        );
                    }
                    else
                    {
                        _logger.LogError(dbEx, "Database error occurred");
                        errorResponse = ApiErrorResponse.Create(
                            "DATABASE_ERROR",
                            "A database error occurred. Please try again."
                        );
                    }
                    break;

                default:
                    statusCode = HttpStatusCode.InternalServerError;
                    _logger.LogError(exception, "Unhandled exception occurred");
                    
                    // Never expose stack traces in production
                    errorResponse = ApiErrorResponse.Create(
                        "INTERNAL_ERROR",
                        _env.IsDevelopment() 
                            ? exception.Message 
                            : "An unexpected error occurred. Please try again later."
                    );
                    break;
            }

            response.StatusCode = (int)statusCode;

            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var result = JsonSerializer.Serialize(errorResponse, jsonOptions);
            await response.WriteAsync(result);
        }
    }

    /// <summary>
    /// Extension method for registering the exception middleware.
    /// </summary>
    public static class ExceptionMiddlewareExtensions
    {
        public static IApplicationBuilder UseExceptionMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
