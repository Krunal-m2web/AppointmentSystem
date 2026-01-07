using System.Threading.Tasks;

namespace Appointmentbookingsystem.Backend.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body, string? fromName = null, string? replyTo = null, int? companyId = null);
    }
}
