import {
  NotificationConfig,
  TimingConfig,
  TimeUnit,
  TimingContext,
} from "../types/settings";

export const DEFAULT_NOTIFICATION_TEMPLATES: {
  [key: string]: Partial<NotificationConfig>;
} = {
  appointmentConfirmation: {
    template: {
      subject:
        "Your Appointment is Confirmed - {{appointment.date}} at {{appointment.time}}",
      body: `<p>Hi {{customer.firstName}},</p><p><br></p><p>Thank you for booking with <strong>{{company.name}}</strong>!</p><p>Your appointment has been confirmed.</p><p><br></p><p><strong>Appointment Details</strong></p><ul><li>Service: {{service.name}}</li><li>Date: {{appointment.date}}</li><li>Time: {{appointment.time}}</li><li>Duration: {{appointment.duration}}</li><li>With: {{staff.name}}</li></ul><p><br></p><p><strong>Need to make changes?</strong></p><ul><li>Reschedule: {{link.reschedule}}</li><li>Cancel: {{link.cancel}}</li></ul><p><br></p><p>We look forward to seeing you!</p><p><br></p><p>Best regards,</p><p><strong>{{company.name}}</strong></p><p>{{company.phone}}</p>`,
    },
  },
  appointmentReminder: {
    template: {
      subject: "Reminder: Your Appointment Tomorrow at {{appointment.time}}",
      body: `<p>Hi {{customer.firstName}},</p><p><br></p><p>This is a friendly reminder about your upcoming appointment with <strong>{{company.name}}</strong>.</p><p><br></p><p><strong>Appointment Details</strong></p><ul><li>Service: {{service.name}}</li><li>Date: {{appointment.date}}</li><li>Time: {{appointment.time}}</li><li>With: {{staff.name}}</li><li>Location: {{company.address}}</li></ul><p><br></p><p><strong>Need to reschedule?</strong></p><p>You can reschedule here: {{link.reschedule}}</p><p><br></p><p>See you soon!</p><p><br></p><p>Best regards,</p><p><strong>{{company.name}}</strong></p>`,
    },
  },
  appointmentFollowUp: {
    template: {
      subject: "How was your experience with {{company.name}}?",
      body: `<p>Hi {{customer.firstName}},</p><p><br></p><p>Thank you for choosing <strong>{{company.name}}</strong>!</p><p>We hope you had a great experience with <strong>{{staff.name}}</strong> on {{appointment.date}}.</p><p><br></p><p><strong>How was your experience?</strong></p><p>We'd love to hear your feedback and help you book your next appointment.</p><p><br></p><p><strong>Book your next session:</strong></p><p>Visit our website: {{company.website}}</p><p><br></p><p>Best regards,</p><p><strong>{{company.name}}</strong></p>`,
    },
  },
  appointmentCancellation: {
    template: {
      subject: "Appointment Cancellation - {{appointment.date}}",
      body: `<p>Hi {{customer.firstName}},</p><p><br></p><p>Your appointment scheduled for <strong>{{appointment.date}}</strong> at <strong>{{appointment.time}}</strong> has been cancelled.</p><p><br></p><p><strong>Cancelled Appointment Details</strong></p><ul><li>Service: {{service.name}}</li><li>Staff: {{staff.name}}</li></ul><p><br></p><p><strong>Would you like to book a new appointment?</strong></p><p>Visit: {{company.website}}</p><p><br></p><p>If you have any questions, please contact us.</p><p><br></p><p>Best regards,</p><p><strong>{{company.name}}</strong></p><p>{{company.phone}}</p>`,
    },
  },
};
