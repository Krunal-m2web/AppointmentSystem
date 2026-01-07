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
        private readonly TimeSpan _checkInterval = TimeSpan.FromMinutes(5);

        public NotificationBackgroundService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
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
                    Console.WriteLine($"[Notification Error] {ex.Message}");
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
                
                var companies = await context.Companies.Where(c => c.IsActive && c.IsEmailServiceEnabled).ToListAsync();

                foreach (var company in companies)
                {
                   await ProcessCompanyNotifications(context, emailService, company);
                }
            }
        }

        private async Task ProcessCompanyNotifications(AppDbContext context, IEmailService emailService, Company company)
        {
             // Get Configs
             var reminderConfig = await context.NotificationConfigs
                .FirstOrDefaultAsync(c => c.CompanyId == company.Id && c.Type == "appointmentReminder" && c.IsEnabled);

             var followupConfig = await context.NotificationConfigs
                .FirstOrDefaultAsync(c => c.CompanyId == company.Id && c.Type == "appointmentFollowup" && c.IsEnabled);
             
             // --- REMINDERS ---
             if (reminderConfig != null)
             {
                 var now = DateTime.UtcNow;
                 // Calculate time window. E.g. TimingValue = 24, Unit = "hours" -> window is [now, now + 24h]
                 // But typically reminder is "24 hours BEFORE". 
                 // So we check appointments where StartTime is between Now and Now + Timing.
                 // And we only want to send it once.
                 
                 double hoursBefore = reminderConfig.TimingUnit == "days" ? reminderConfig.TimingValue * 24 : reminderConfig.TimingValue;
                 // Default to 24h if invalid
                 if (hoursBefore <= 0) hoursBefore = 24; 

                 var threshold = now.AddHours(hoursBefore);
                 
                 var upcomingAppointments = await context.Appointments
                     .Include(a => a.Customer)
                     .Include(a => a.Service)
                     .Include(a => a.Staff)
                     .Where(a => a.CompanyId == company.Id 
                              && a.Status != AppointmentStatus.Cancelled 
                              && !a.ReminderSent 
                              && a.StartDateTimeUtc > now 
                              && a.StartDateTimeUtc <= threshold)
                     .ToListAsync();

                 foreach (var appt in upcomingAppointments)
                 {
                     string subject = reminderConfig.Subject ?? "Appointment Reminder";
                     string body = reminderConfig.Body ?? "Reminder for your appointment.";

                     body = ReplacePlaceholders(body, appt, company);

                     await emailService.SendEmailAsync(
                         appt.Customer.Email, 
                         subject, 
                         body, 
                         company.DefaultSenderName ?? company.CompanyName,
                         company.DefaultReplyToEmail, 
                         company.Id
                     );

                     appt.ReminderSent = true;
                 }
             }

             // --- FOLLOW-UPS ---
             if (followupConfig != null)
             {
                 var now = DateTime.UtcNow;
                 // Followup is "1 hour AFTER".
                 // So we check appointments where EndTime was Timing ago.
                 // EndTime < Now - Timing
                 
                 double hoursAfter = followupConfig.TimingUnit == "days" ? followupConfig.TimingValue * 24 : followupConfig.TimingValue;
                 // Default to 1h
                 if (hoursAfter <= 0) hoursAfter = 1;

                 var listThreshold = now.AddHours(-hoursAfter);

                 var pastAppointments = await context.Appointments
                     .Include(a => a.Customer)
                     .Include(a => a.Service)
                     .Include(a => a.Staff)
                     .Where(a => a.CompanyId == company.Id 
                              && (a.Status == AppointmentStatus.Confirmed || a.Status == AppointmentStatus.Completed)
                              && !a.FollowupSent
                              && a.EndDateTimeUtc < listThreshold)
                     .ToListAsync();

                 foreach (var appt in pastAppointments)
                 {
                     string subject = followupConfig.Subject ?? "Thank you for visiting";
                     string body = followupConfig.Body ?? "We hope to see you again.";

                     body = ReplacePlaceholders(body, appt, company);

                     await emailService.SendEmailAsync(
                         appt.Customer.Email, 
                         subject, 
                         body, 
                         company.DefaultSenderName ?? company.CompanyName,
                         company.DefaultReplyToEmail, 
                         company.Id
                     );

                     appt.FollowupSent = true;
                 }
             }

             await context.SaveChangesAsync();
        }

        private string ReplacePlaceholders(string template, Appointment appt, Company company)
        {
            return template
                .Replace("{{customerName}}", $"{appt.Customer.FirstName} {appt.Customer.LastName}")
                .Replace("{{serviceName}}", appt.Service.Name)
                .Replace("{{staffName}}", appt.Staff != null ? $"{appt.Staff.FirstName} {appt.Staff.LastName}" : "Staff")
                .Replace("{{dateTime}}", appt.StartDateTimeUtc.ToString("f"))
                .Replace("{{companyName}}", company.CompanyName);
        }
    }
}
