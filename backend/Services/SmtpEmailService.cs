using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace Appointmentbookingsystem.Backend.Services
{
    public class SmtpEmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public SmtpEmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string to, string subject, string body, string? fromName = null, string? replyTo = null, int? companyId = null)
        {
            var smtpSettings = _configuration.GetSection("SmtpSettings");
            var host = smtpSettings["Host"];
            var port = int.Parse(smtpSettings["Port"] ?? "587");
            var username = smtpSettings["Username"];
            var password = smtpSettings["Password"];
            var enableSsl = bool.Parse(smtpSettings["EnableSsl"] ?? "true");
            var defaultFromEmail = smtpSettings["FromEmail"] ?? username;
            
            // Override from name if provided
            var fromAddress = new MailAddress(defaultFromEmail, fromName ?? "Appointment System");

            using var client = new SmtpClient(host, port)
            {
                Credentials = new NetworkCredential(username, password),
                EnableSsl = enableSsl
            };

            var mailMessage = new MailMessage
            {
                From = fromAddress,
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            mailMessage.To.Add(to);

            if (!string.IsNullOrEmpty(replyTo))
            {
                mailMessage.ReplyToList.Add(new MailAddress(replyTo));
            }

            await client.SendMailAsync(mailMessage);
        }
    }
}
