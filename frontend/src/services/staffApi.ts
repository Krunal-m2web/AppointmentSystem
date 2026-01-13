import { getToken, getCompanyIdFromToken } from "../utils/auth";
import type { Staff } from "../types/types";

export interface TimeOff {
  id: number;
  staffId: number;
  staffName?: string;
  startDateTimeUtc: string;
  endDateTimeUtc: string;
  reason?: string;
  status: string;
  isFullDay: boolean;
  approvedByAdminId?: number;
  approvedByAdminName?: string;
  createdAt: string;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

const parseApiError = async (
  response: Response,
  defaultMessage: string
): Promise<never> => {
  let errorMessage = defaultMessage;

  // Clone the response so we can read it multiple times if needed
  const clonedResponse = response.clone();

  try {
    const data = await response.json();
    if (data.errors) {
      // Validation errors: {"errors": {"Password": ["Too short"]}}
      const details = Object.entries(data.errors)
        .map(([_, msgs]) => (msgs as string[]).join(", "))
        .join("; ");
      errorMessage = details || data.title || defaultMessage;
    } else if (data.message) {
      errorMessage = data.message;
    } else if (data.title) {
      errorMessage = data.title;
    }
  } catch (e) {
    // If JSON parse fails, try text on the cloned response
    try {
      const text = await clonedResponse.text();
      if (text) errorMessage = text;
    } catch (textError) {
      // If both fail, use default message
      errorMessage = defaultMessage;
    }
  }
  throw new Error(errorMessage);
};

export const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function fetchStaff(companyId?: number): Promise<Staff[]> {
  // Use provided companyId or try to get from token
  const tid = companyId || getCompanyIdFromToken(getToken() || "");
  const url = tid
    ? `${API_BASE_URL}/api/staff?companyId=${tid}`
    : `${API_BASE_URL}/api/staff`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch staff");
  return response.json();
}

export async function createStaff(data: {
  companyId: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  notes?: string;
  serviceIds?: number[];
}): Promise<Staff> {
  const response = await fetch(`${API_BASE_URL}/api/staff`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await parseApiError(response, "Failed to create staff");
  }

  return response.json();
}

export async function updateStaff(staff: Staff): Promise<Staff> {
  const password =
    typeof (staff as any).password === "string" &&
    (staff as any).password.trim().length >= 6
      ? (staff as any).password.trim()
      : undefined;

  const payload = {
    firstName: staff.firstName,
    lastName: staff.lastName,
    email: staff.email,
    phone: staff.phone || "",
    address: staff.address || "",
    notes: staff.notes || "",
    isActive: staff.isActive,
    serviceIds: staff.services
      ? staff.services.map((s: any) =>
          typeof s === "object" ? s.serviceId : s
        )
      : [],
    ...(password ? { password } : {}), // ✅ only send when valid
  };

  const response = await fetch(`${API_BASE_URL}/api/staff/${staff.id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await parseApiError(response, "Failed to update staff");
  }

  return response.json();
}

export async function deleteStaff(staffId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/staff/${staffId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    await parseApiError(response, "Failed to delete staff");
  }
}

export async function permanentDeleteStaff(staffId: number): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/staff/${staffId}/permanent`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    await parseApiError(response, "Failed to permanently delete staff");
  }
}

export async function fetchStaffAvailability(staffId: number): Promise<any[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/availability/staff/${staffId}`,
    {
      headers: getAuthHeaders(),
      cache: "no-store",
    }
  );
  if (!response.ok) throw new Error("Failed to fetch availability");
  return response.json();
}

export async function createAvailability(data: {
  staffId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/availability`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await parseApiError(response, "Failed to create availability");
  }
}

export async function deleteAllAvailabilityForStaff(
  staffId: number
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/availability/staff/${staffId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  // Accept both 200 OK and 204 No Content as success
  if (!response.ok && response.status !== 204) {
    await parseApiError(response, "Failed to clear existing availability");
  }

  // Don't try to parse JSON if status is 204 No Content
  if (response.status === 204) {
    return;
  }
}

export async function deleteAvailability(
  availabilityId: number
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/availability/${availabilityId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  // Accept both 200 OK and 204 No Content as success
  if (!response.ok && response.status !== 204) {
    await parseApiError(response, "Failed to delete availability");
  }
}

export async function fetchTimeOff(staffId: number): Promise<TimeOff[]> {
  const response = await fetch(`${API_BASE_URL}/api/timeoff/staff/${staffId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch time off");
  return response.json();
}

export async function createTimeOff(data: {
  staffId: number;
  startDateTimeUtc: string;
  endDateTimeUtc: string;
  reason?: string;
  isFullDay?: boolean;
}): Promise<TimeOff> {
  const response = await fetch(`${API_BASE_URL}/api/timeoff`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ ...data, isFullDay: data.isFullDay ?? true }),
  });

  if (!response.ok) {
    await parseApiError(response, "Failed to create time off");
  }

  return response.json();
}

export async function updateTimeOff(
  id: number,
  data: {
    staffId: number;
    startDateTimeUtc: string;
    endDateTimeUtc: string;
    reason?: string;
    isFullDay?: boolean;
  }
): Promise<TimeOff> {
  const response = await fetch(`${API_BASE_URL}/api/timeoff/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ ...data, isFullDay: data.isFullDay ?? true }),
  });

  if (!response.ok) {
    await parseApiError(response, "Failed to update time off");
  }

  return response.json();
}

export interface ConflictInfo {
  hasConflicts: boolean;
  conflictCount: number;
  conflicts: Array<{
    id: number;
    startDateTimeUtc: string;
    endDateTimeUtc: string;
    customerName: string;
    serviceName: string;
  }>;
}

export async function checkTimeOffConflicts(
  staffId: number,
  startDateTimeUtc: string,
  endDateTimeUtc: string
): Promise<ConflictInfo> {
  const params = new URLSearchParams({
    staffId: staffId.toString(),
    startDateTimeUtc,
    endDateTimeUtc,
  });
  const response = await fetch(
    `${API_BASE_URL}/api/timeoff/check-conflicts?${params}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to check conflicts");
  }

  return response.json();
}

export interface TimeOffSettings {
  requireTimeOffApproval: boolean;
}

export async function getTimeOffSettings(): Promise<TimeOffSettings> {
  const response = await fetch(`${API_BASE_URL}/api/settings/timeoff`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch time off settings");
  return response.json();
}

export async function updateTimeOffSettings(
  settings: TimeOffSettings
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/settings/timeoff`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    await parseApiError(response, "Failed to update time off settings");
  }
}

export async function deleteTimeOff(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/timeoff/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) await parseApiError(response, "Failed to delete time off");
}

// Get all time-offs across company (Admin only)
export async function fetchAllTimeOffs(): Promise<TimeOff[]> {
  const response = await fetch(`${API_BASE_URL}/api/timeoff/all`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch all time-offs");
  return response.json();
}

// Get pending time-off requests (Admin only)
export async function fetchPendingTimeOffs(): Promise<TimeOff[]> {
  const response = await fetch(`${API_BASE_URL}/api/timeoff/pending`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch pending time-offs");
  return response.json();
}

// Get count of pending time-off requests (Admin only)
export async function fetchPendingTimeOffCount(): Promise<number> {
  const response = await fetch(`${API_BASE_URL}/api/timeoff/pending/count`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch pending count");
  return response.json();
}

// Approve time-off request (Admin only)
export async function approveTimeOff(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/timeoff/${id}/approve`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    await parseApiError(response, "Failed to approve time-off");
  }
}

// Reject time-off request (Admin only)
export async function rejectTimeOff(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/timeoff/${id}/reject`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    await parseApiError(response, "Failed to reject time-off");
  }
}

// Get time-offs for specific staff
export async function fetchTimeOffByStaff(staffId: number): Promise<TimeOff[]> {
  const response = await fetch(`${API_BASE_URL}/api/timeoff/staff/${staffId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch staff time-offs");
  return response.json();
}

export async function fetchBadgeCounts(): Promise<{
  staffBadgeCount: number;
  adminBadgeCount: number;
}> {
  const response = await fetch(`${API_BASE_URL}/api/timeoff/counts`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch badge counts");
  return response.json();
}

export async function markTimeOffSeen(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/timeoff/mark-seen`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to mark time off as seen");
}
