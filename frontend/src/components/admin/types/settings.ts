export type SettingsTab =
  | "general"
  | "company"
  | "notifications"
  | "payment"
  | "locations"
  | "bookingForm"
  | "global"
  | "google-calendar";

export interface EmailTemplate {
  subject: string;
  body: string;
}

export type TimeUnit = "minutes" | "hours" | "days";
export type TimingContext =
  | "immediately"
  | "before_appointment"
  | "after_appointment"
  | "after_booking";

export interface TimingConfig {
  value: number;
  unit: TimeUnit;
  context: TimingContext;
}

export interface NotificationConfig {
  enabled: boolean;
  pushEnabled?: boolean;
  timing: string;
  timingConfig?: TimingConfig;
  timingEditable?: boolean;
  template: EmailTemplate;
  description: string;
  trigger: string;
}

export interface SmsTemplate {
  body: string;
}

export interface SmsNotificationConfig {
  enabled: boolean;
  timing: string;
  timingConfig?: TimingConfig;
  template: SmsTemplate;
  description: string;
  trigger: string;
}
