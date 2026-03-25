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

        /// <summary>Returns true if the string is a non-empty, valid e-mail address.</summary>
        private static bool IsValidEmail(string? email)
        {
            if (string.IsNullOrWhiteSpace(email)) return false;
            try { _ = new MailAddress(email); return true; }
            catch { return false; }
        }

        public async Task SendEmailAsync(string to, string subject, string body, string? fromName = null, string? replyTo = null, int? companyId = null, int? appointmentId = null, int? notificationConfigId = null)
        {
            var smtpSettings = _configuration.GetSection("SmtpSettings");
            var host = smtpSettings["Host"];
            var port = int.Parse(smtpSettings["Port"] ?? "587");
            var username = smtpSettings["Username"];
            var password = smtpSettings["Password"];
            var enableSsl = bool.Parse(smtpSettings["EnableSsl"] ?? "true");

            // Determine the From address — prefer FromEmail, fall back to Username
            var rawFrom = smtpSettings["FromEmail"];
            if (!IsValidEmail(rawFrom)) rawFrom = username;
            if (!IsValidEmail(rawFrom))
                throw new InvalidOperationException("SmtpSettings.FromEmail (or Username) is missing or not a valid e-mail address.");

            var fromAddress = new MailAddress(rawFrom!, fromName ?? "Appointment System");

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

            // Only add ReplyTo if it is a valid e-mail (guards against null / placeholder values)
            if (IsValidEmail(replyTo))
            {
                mailMessage.ReplyToList.Add(new MailAddress(replyTo!));
            }

            await client.SendMailAsync(mailMessage);
        }
    }
}
