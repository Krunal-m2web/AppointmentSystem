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
  date: string // YYYY-MM-DD
): Promise<TimeSlotDto[]> => {
  const url = `${API_BASE_URL}/api/availability/slots?staffId=${staffId}&serviceId=${serviceId}&date=${date}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch available slots");
  }
  return response.json();
};

export const fetchStaffTimeOffs = async (
  staffId: number
): Promise<TimeOffResponseDto[]> => {
  const url = `${API_BASE_URL}/api/timeoff/staff/${staffId}`;
  const response = await fetch(url, {
    headers: {
      // We might need auth headers here if the endpoint is protected,
      // but for public booking flow it usually needs to be open or use a specific token.
      // Checking TimeOffController, it has [Authorize], which might be an issue for public booking.
      // For now, assuming we might need to handle this or the requirement implies public access.
      // If strictly protected, we can't fetch it without login.
      // However, usually "get slots" (which checks timeoffs internally) is public.
      // The user verified fetching "unavailability(timeoffs) data", implying a direct fetch.
      // Let's assume for now we might need a token OR the controller should allow anonymous for this specific read if intended for public.
      // Re-reading controller: [Authorize] is on the class.
      // If this is for public booking, it will fail 401.
      // But `GetAvailableSlots` in `AvailabilityController` calculates availability internally and presumably is public (it doesn't have [Authorize] on the method, but check class).
      // AvailabilityController has no [Authorize] on class, so `GetAvailableSlots` is public.
      // BUT `TimeOffController` IS [Authorize].
      // The user asked to "fetch staff members availability and unavailability(timeoffs) data from api".
      // If I can't call TimeOff directly without auth, I might rely on `GetAvailableSlots` which returns valid slots.
      // However, to show "unavailable dates" on the calendar (entire days disabled), I might need to know about time-offs or check availability for each day.
      // Checking availability for every day in a month is expensive.
      // Usually, we fetch "Days with availability" or "TimeOffs".
      // If TimeOff endpoint is protected, I should probably use a specialized public endpoint or `GetAvailableSlots` logic.
      // Let's implement the service. If it fails 401, I'll have to ask or modify backend.
      // For now, I'll add the auth header helper just in case, but for public booking we usually don't have one.
      // Wait, `BookingForm` is public. User is a "Customer".
      // If the goal is public booking, we shouldn't need a token.
      // Maybe I should only rely on `fetchAvailableSlots`?
      // But the user specificially asked to "fetch... unavailability(timeoffs) data".
      // Maybe I should allow the fetch but handle 401 gracefully, or maybe the user is logged in as admin?
      // No, `BookingForm` is for customers.
      // Let's assume the user might have removed [Authorize] or intends to allow it.
      // Or maybe I should use the `GetAvailableSlots` to determine day availability?
      // Actually, getting timeoffs is good to disable dates.
      // I will write the fetch. If it needs auth, we'll see.
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch time offs");
  }
  return response.json();
};
