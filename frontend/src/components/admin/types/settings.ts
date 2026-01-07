export type SettingsTab =
  | "general"
  | "company"
  | "notifications"
  | "payment"
  | "locations"
  | "global";

export interface EmailTemplate {
  subject: string;
  body: string;
}

export type TimeUnit = "minutes" | "hours" | "days";
export type TimingContext =
  | "immediately"
  | "before_appointment"
  | "after_appointment";

export interface TimingConfig {
  value: number;
  unit: TimeUnit;
  context: TimingContext;
}

export interface NotificationConfig {
  enabled: boolean;
  timing: string;
  timingConfig?: TimingConfig;
  timingEditable?: boolean;
  template: EmailTemplate;
  description: string;
  trigger: string;
}
