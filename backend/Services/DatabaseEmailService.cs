using System;
using System.Threading.Tasks;
using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.Models.Entities;

namespace Appointmentbookingsystem.Backend.Services
{
    public class DatabaseEmailService : IEmailService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;

        public DatabaseEmailService(IServiceProvider serviceProvider, Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            _serviceProvider = serviceProvider;
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string to, string subject, string body, string? fromName = null, string? replyTo = null, int? companyId = null, int? appointmentId = null, int? notificationConfigId = null)
        {
            // Create a new scope to resolve AppDbContext
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                // Get configured From Email
                var smtpSettings = _configuration.GetSection("SmtpSettings");
                string configuredFromEmail = smtpSettings["FromEmail"] ?? smtpSettings["Username"] ?? "noreply@system.com";

                // If company override exists, use it
                if (companyId.HasValue)
                {
                    var company = await context.Companies.FindAsync(companyId);
                    if (company != null && !string.IsNullOrWhiteSpace(company.DefaultSenderEmail))
                    {
                        configuredFromEmail = company.DefaultSenderEmail;
                    }
                }

                var emailLog = new EmailLog
                {
                    CompanyId = companyId,
                    ToEmail = to,
                    FromEmail = configuredFromEmail, // Use the actual email address
                    Subject = subject,
                    // Body property removed
                    AppointmentId = appointmentId,
                    NotificationConfigId = notificationConfigId,
                    SentAt = DateTime.UtcNow
                };

                context.EmailLogs.Add(emailLog);
                await context.SaveChangesAsync();
            }
        }
    }
}
