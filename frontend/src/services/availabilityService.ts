const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export interface TimeSlotDto {
  startTime: string; // ISO string
  endTime: string; // ISO string
  isAvailable: boolean;
}

export interface TimeOffResponseDto {
  id: number;
  staffId: number;
  startDateTimeUtc: string; // ISO string
  endDateTimeUtc: string; // ISO string
  reason: string;
  status: string;
}

export const fetchAvailableSlots = async (
  staffId: number,
  serviceId: number,
  date: string, // YYYY-MM-DD
  duration?: number
): Promise<TimeSlotDto[]> => {
  let url = `${API_BASE_URL}/api/availability/slots?staffId=${staffId}&serviceId=${serviceId}&date=${date}`;
  if (duration) {
    url += `&duration=${duration}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || "Failed to fetch available slots");
  }
  return response.json();
};

export const fetchAnyStaffSlots = async (
  serviceId: number,
  date: string, // YYYY-MM-DD
  duration?: number
): Promise<TimeSlotDto[]> => {
  let url = `${API_BASE_URL}/api/availability/service/${serviceId}/slots?date=${date}`;
  if (duration) {
    url += `&duration=${duration}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch available slots");
  }
  return response.json();
};

export const fetchStaffTimeOffs = async (
  staffId: number,
  token?: string
): Promise<TimeOffResponseDto[]> => {
  const url = `${API_BASE_URL}/api/timeoff/staff/${staffId}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch time offs");
  }
  return response.json();
};

export interface StaffAvailabilityResponse {
  id: number;
  staffId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export const fetchStaffSchedule = async (
  staffId: number,
  token?: string
): Promise<StaffAvailabilityResponse[]> => {
  const url = `${API_BASE_URL}/api/availability/staff/${staffId}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch staff schedule");
  }
  return response.json();
};
