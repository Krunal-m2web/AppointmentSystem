import { getToken } from '../utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export interface GoogleCalendarConnectionStatus {
  isConnected: boolean;
  googleEmail?: string;
  tokenExpiresAtUtc?: string;
  lastSyncedAt?: string;
}

export const googleCalendarApi = {
  // Get connection status
  getStatus: async (): Promise<GoogleCalendarConnectionStatus> => {
    const token = getToken();
    const url = `${API_BASE_URL}/api/google-calendar/status`;
    
    // Debug log just in case, can remove later

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
          throw new Error('Unauthorized: Please log in again.');
      }
      throw new Error('Failed to fetch Google Calendar status');
    }

    return response.json();
  },

  // Initiate OAuth flow
  connect: async (): Promise<{ url: string }> => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/api/google-calendar/connect`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to initiate Google Calendar connection');
    }

    return response.json();
  },

  // Disconnect
  disconnect: async (): Promise<void> => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/api/google-calendar/disconnect`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to disconnect Google Calendar');
    }
  },

  // Manual sync - pull events from Google Calendar to SaaS
  sync: async (): Promise<{ message: string }> => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/api/google-calendar/sync`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to sync Google Calendar');
    }

    return response.json();
  },
};
