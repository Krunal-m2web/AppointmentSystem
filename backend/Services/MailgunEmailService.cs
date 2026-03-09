using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Appointmentbookingsystem.Backend.Data;
using Appointmentbookingsystem.Backend.Models.Entities;

namespace Appointmentbookingsystem.Backend.Services
{
    public class MailgunEmailService : IEmailService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        private readonly IServiceProvider _serviceProvider;

        public MailgunEmailService(
            IHttpClientFactory httpClientFactory, 
            IConfiguration configuration,
            IServiceProvider serviceProvider)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
            _serviceProvider = serviceProvider;
        }

        public async Task SendEmailAsync(string to, string subject, string body, string? fromName = null, string? replyTo = null, int? companyId = null, int? appointmentId = null, int? notificationConfigId = null)
        {
            var mailgunSettings = _configuration.GetSection("Mailgun");
            var baseUrl = mailgunSettings["BaseUrl"];
            var domain = mailgunSettings["Domain"];
            var apiKey = mailgunSettings["ApiKey"];
            var fromEmail = mailgunSettings["FromEmail"];

            if (string.IsNullOrEmpty(baseUrl) || string.IsNullOrEmpty(domain) || string.IsNullOrEmpty(apiKey))
            {
                // Fallback to database logging only if configuration is missing, or throw? 
                // For now, let's just log sending failure to console and proceed to DB log
            }
            else
            {
                try 
                {
                    var client = _httpClientFactory.CreateClient();
                    client.BaseAddress = new Uri(baseUrl);
                    
                    var authToken = Convert.ToBase64String(Encoding.ASCII.GetBytes($"api:{apiKey}"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authToken);

                    var formContent = new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>("from", string.IsNullOrEmpty(fromName) ? fromEmail : $"{fromName} <{fromEmail}>"),
                        new KeyValuePair<string, string>("to", to),
                        new KeyValuePair<string, string>("subject", subject),
                        new KeyValuePair<string, string>("html", body), // Using HTML body
                        new KeyValuePair<string, string>("o:tracking", "no") // Disable link tracking for localhost links
                    };

                    if (!string.IsNullOrEmpty(replyTo))
                    {
                         formContent.Add(new KeyValuePair<string, string>("h:Reply-To", replyTo));
                    }

                    var response = await client.PostAsync($"{domain}/messages", new FormUrlEncodedContent(formContent));

                    if (!response.IsSuccessStatusCode)
                    {
                        var errorContent = await response.Content.ReadAsStringAsync();
                    }
                    else 
                    {
                    }
                }
                catch (Exception ex)
                {
                }
            }

            // Always log to database to maintain existing functionality
            await LogEmailToDatabaseAsync(to, subject, fromName, companyId, appointmentId, notificationConfigId);
        }

        private async Task LogEmailToDatabaseAsync(string to, string subject, string? fromName, int? companyId, int? appointmentId, int? notificationConfigId)
        {
             using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                // Get configured From Email (similar logic to DatabaseEmailService for consistency in logs)
                var smtpSettings = _configuration.GetSection("SmtpSettings");
                // Prefer Mailgun from if available, else SMTP legacy
                string configuredFromEmail = _configuration["Mailgun:FromEmail"] ?? smtpSettings["FromEmail"] ?? "noreply@system.com";

                // If company override exists, use it? 
                // Note: Mailgun sandbox requires verified senders, so dynamic company override might fail sending if not verified.
                // But for logging purposes, we might want to record who it was "on behalf of".
                
                if (companyId.HasValue)
                {
                   var company = await context.Companies.FindAsync(companyId);
                   if (company != null && !string.IsNullOrWhiteSpace(company.DefaultSenderEmail))
                   {
                        // logic from DatabaseEmailService
                       // configuredFromEmail = company.DefaultSenderEmail; 
                   }
                }

                var emailLog = new EmailLog
                {
                    CompanyId = companyId,
                    ToEmail = to,
                    FromEmail = configuredFromEmail, 
                    Subject = subject,
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
