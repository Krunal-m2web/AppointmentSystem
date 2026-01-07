import { NotificationConfig } from "../components/admin/types/settings";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export interface GeneralSettingsData {
  defaultSenderName: string;
  defaultReplyToEmail: string;
  isEmailServiceEnabled: boolean;
}

export async function getGeneralSettings(
  token: string
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
  token: string
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
  token: string
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
  token: string
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
