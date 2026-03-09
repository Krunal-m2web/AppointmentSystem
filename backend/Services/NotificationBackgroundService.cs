using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.Services;
using Appointmentbookingsystem.Backend.Models.Entities;

namespace Appointmentbookingsystem.Backend.Services
{
    public class NotificationBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;
        private readonly TimeSpan _checkInterval = TimeSpan.FromSeconds(30);

        public NotificationBackgroundService(IServiceProvider serviceProvider, Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            _serviceProvider = serviceProvider;
            _configuration = configuration;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await CheckAndSendNotifications();
                }
                catch (Exception ex)
                {
                }

                await Task.Delay(_checkInterval, stoppingToken);
            }
        }

        private async Task CheckAndSendNotifications()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                var emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();

                // 1. Process REMINDERS
                // Logic: Find appointments starting within the next X hours (e.g. 24h) that haven't been reminded.
                // Note: We need to know per-company config for timing.
                // For efficiency, we will fetch companies with enabled reminders first, or iterate active companies.
                
                // Fetch companies where EITHER Email OR Push is enabled generally
                // Note: Company.IsEmailServiceEnabled is a master switch for EMAIL service. 
                // We might need a Company.IsPushServiceEnabled later, but for now we assume Push is allowed if feature is on.
                var companies = await context.Companies.Where(c => c.IsActive).ToListAsync();

                foreach (var company in companies)
                {
                   await ProcessCompanyNotifications(context, emailService, company);
                }
            }
        }

        private async Task ProcessCompanyNotifications(AppDbContext context, IEmailService emailService, Company company)
        {
            // Get all configs where IsEnabled is true
            var configs = await context.NotificationConfigs
                .Where(c => c.CompanyId == company.Id && c.IsEnabled && 
                           (c.Type.StartsWith("appointmentReminder") || 
                            c.Type.StartsWith("appointmentFollowUp") ||
                            c.Type == "appointmentConfirmation" || 
                            c.Type == "appointmentCancellation"))
                .ToListAsync();

            var now = DateTime.UtcNow;

            foreach (var config in configs)
            {
                // Helper bools
                bool isReminder = config.Type.StartsWith("appointmentReminder");
                bool isFollowup = config.Type.StartsWith("appointmentFollowUp");
                bool isConfirmation = config.Type == "appointmentConfirmation";
                bool isCancellation = config.Type == "appointmentCancellation";

                // Timing Context Handling:
                string effectiveContext = config.TimingContext;
                int effectiveValue = config.TimingValue;
                
                // Convert "immediately" for follow-ups to "after_appointment" with 0 offset
                if (isFollowup && config.TimingContext == "immediately")
                {
                    effectiveContext = "after_appointment";
                    effectiveValue = 0;
                }
                
                // Skip "immediately" for confirmation/cancellation (handled by Controller)
                if ((isConfirmation || isCancellation) && config.TimingContext == "immediately") continue;
                
                // Skip "immediately" for reminders (doesn't make sense)
                if (isReminder && config.TimingContext == "immediately") continue;
                

                // Convert timing value to hours
                double hoursOffset;
                if (config.TimingUnit == "minutes")
                    hoursOffset = effectiveValue / 60.0;
                else if (config.TimingUnit == "days")
                    hoursOffset = effectiveValue * 24;
                else // hours
                    hoursOffset = effectiveValue;

                if (hoursOffset < 0) hoursOffset = 0;
                

                IQueryable<Appointment> query;

                if (isReminder && effectiveContext == "before_appointment")
                {
                    var threshold = now.AddHours(hoursOffset);
                    query = context.Appointments
                        .Include(a => a.Customer)
                        .Include(a => a.Service)
                        .Include(a => a.Staff)
                        .Where(a => a.CompanyId == company.Id 
                                 && a.Status == AppointmentStatus.Confirmed 
                                 && a.StartDateTimeUtc > now 
                                 && a.StartDateTimeUtc <= threshold);
                    
                }
                else if (isConfirmation && effectiveContext == "after_booking")
                {
                    var threshold = now.AddHours(-hoursOffset);
                    query = context.Appointments
                        .Include(a => a.Customer)
                        .Include(a => a.Service)
                        .Include(a => a.Staff)
                        .Where(a => a.CompanyId == company.Id 
                               && a.Status == AppointmentStatus.Confirmed
                               && a.CreatedAt <= threshold);
                    
                }
                else if (isFollowup && effectiveContext == "after_appointment")
                {
                    var threshold = now.AddHours(-hoursOffset);
                    query = context.Appointments
                        .Include(a => a.Customer)
                        .Include(a => a.Service)
                        .Include(a => a.Staff)
                        .Where(a => a.CompanyId == company.Id 
                               && a.EndDateTimeUtc <= threshold
                               && (a.Status == AppointmentStatus.Confirmed || a.Status == AppointmentStatus.Completed));
                    
                }
                else if (isCancellation && effectiveContext == "after_booking")
                {
                    var threshold = now.AddHours(-hoursOffset);
                    query = context.Appointments
                        .Include(a => a.Customer)
                        .Include(a => a.Service)
                        .Include(a => a.Staff)
                        .Where(a => a.CompanyId == company.Id 
                               && a.Status == AppointmentStatus.Cancelled
                               && a.CancelledAt.HasValue
                               && a.CancelledAt.Value <= threshold);
                    
                }
                else 
                {
                    continue;
                }

                var eligibleAppointments = await query.ToListAsync();
                if (eligibleAppointments.Count > 0)

                foreach (var appt in eligibleAppointments)
                {
                    var alreadySent = await context.EmailLogs.AnyAsync(l => 
                        l.AppointmentId == appt.Id && l.NotificationConfigId == config.Id);

                    if (alreadySent) 
                    {
                        continue;
                    }

                    string subject = config.Subject ?? (isReminder ? "Appointment Reminder" : "Thank you for visiting");
                    string body = config.Body ?? (isReminder ? "Reminder for your appointment." : "We hope to see you again.");

                    string frontendUrl = _configuration["AppSettings:FrontendUrl"] ?? "http://localhost:5173";

                    subject = Appointmentbookingsystem.Backend.Utils.PlaceholderHelper.ReplacePlaceholders(subject, appt, company, frontendUrl);
                    body = Appointmentbookingsystem.Backend.Utils.PlaceholderHelper.ReplacePlaceholders(body, appt, company, frontendUrl);
                    
                    // --- SEND EMAIL ---
                    // Only if: Company Email Service Enabled AND Config Email Enabled (IsEnabled)
                    if (company.IsEmailServiceEnabled && config.IsEnabled)
                    {
                        try 
                        {
                            await emailService.SendEmailAsync(
                                appt.Customer.Email, 
                                subject, 
                                body, 
                                company.DefaultSenderName ?? company.CompanyName,
                                company.DefaultReplyToEmail, 
                                company.Id,
                                appt.Id,
                                config.Id
                            );
                        }
                        catch (Exception ex)
                        {
                        }
                    }
                    else
                    {
                    }
                }
            }

            await context.SaveChangesAsync();
        }
    }
}
