using System;
using System.Threading.Tasks;
using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.Models.Entities;

namespace Appointmentbookingsystem.Backend.Services
{
    public class DatabaseEmailService : IEmailService
    {
        private readonly IServiceProvider _serviceProvider;

        public DatabaseEmailService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task SendEmailAsync(string to, string subject, string body, string? fromName = null, string? replyTo = null, int? companyId = null)
        {
            // Create a new scope to resolve AppDbContext
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                var emailLog = new EmailLog
                {
                    CompanyId = companyId,
                    ToEmail = to,
                    FromEmail = fromName ?? "System", // Or some default from config if needed
                    Subject = subject,
                    Body = body,
                    SentAt = DateTime.UtcNow
                };

                context.EmailLogs.Add(emailLog);
                await context.SaveChangesAsync();
            }
        }
    }
}
