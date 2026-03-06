import { NotificationConfig } from "../components/admin/types/settings";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export interface GeneralSettingsData {
  companyName?: string;
  domain?: string;
  defaultSenderName: string;
  defaultSenderEmail: string;
  defaultReplyToEmail: string;
  isEmailServiceEnabled: boolean;
  isSmsServiceEnabled: boolean;
  allowCustomerRescheduling: boolean;
  reschedulingMinLeadTime: number;
  allowCustomerCanceling: boolean;
  cancelingMinLeadTime: number;
}

export async function getGeneralSettings(
  token: string,
): Promise<GeneralSettingsData> {
  const response = await fetch(`${API_BASE_URL}/api/settings/general`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch general settings");
  }

  return response.json();
}

export async function updateGeneralSettings(
  data: GeneralSettingsData,
  token: string,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/settings/general`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update general settings");
  }
}

export async function getNotificationSettings(
  token: string,
): Promise<{ [key: string]: NotificationConfig }> {
  const response = await fetch(`${API_BASE_URL}/api/settings/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notification settings");
  }

  return response.json();
}

export async function updateNotificationSettings(
  settings: { [key: string]: NotificationConfig },
  token: string,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/settings/notifications`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    throw new Error("Failed to update notification settings");
  }
}

export async function sendTestEmail(
  toEmail: string,
  type: string,
  token: string,
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/settings/notifications/test`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ toEmail, type }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to send test email");
  }
}
