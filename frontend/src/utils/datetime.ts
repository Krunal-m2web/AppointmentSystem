// =======================================================
// Date & Time Utilities (UTC storage, Company TZ display)
// =======================================================

/**
 * Format date in a specific timezone
 */
export function formatDate(
  dateString: string,
  timezone: string,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: timezone,
    ...options,
  });
}

/**
 * Format time in a specific timezone
 */
export function formatTime(
  dateString: string,
  timezone: string,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: timezone,
    ...options,
  });
}

/**
 * Format full date + time
 */
export function formatDateTime(dateString: string, timezone: string): string {
  return `${formatDate(dateString, timezone)} at ${formatTime(
    dateString,
    timezone
  )}`;
}

/**
 * Get YYYY-MM-DD string in a timezone
 */
export function getDateString(date: Date, timezone: string): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const f = (type: string) => parts.find((p) => p.type === type)?.value || "";
  return `${f("year")}-${f("month")}-${f("day")}`;
}

/**
 * Get HH:mm (24h) string in a timezone
 */
export function getTimeString(date: Date, timezone: string): string {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone,
  });
}

/**
 * 🔥 CORE FUNCTION
 * Convert company-timezone date & time → UTC ISO string
 *
 * Example:
 *  date=2025-01-20
 *  time=15:33
 *  tz=America/New_York
 *  → 2025-01-20T20:33:00.000Z
 */
export function combineDateTimeToUTC(
  dateStr: string,
  timeStr: string,
  timezone: string
): string {
  // Robust parsing: extract numbers only for date
  const dateParts = dateStr.match(/\d+/g);
  if (!dateParts || dateParts.length < 3)
    throw new Error("Invalid date format");
  const [year, month, day] = dateParts.map(Number);

  // Parsing time: handle 12h (AM/PM) or 24h
  // Supports formats: "11:30am", "11:30 AM", "11:30", "14:30"
  let hour = 0;
  let minute = 0;
  const timeMatch = timeStr.match(/(\d+):(\d+)\s*(am|pm)?/i);
  if (timeMatch) {
    hour = parseInt(timeMatch[1], 10);
    minute = parseInt(timeMatch[2], 10);
    const ampm = timeMatch[3]?.toUpperCase();
    if (ampm === "PM" && hour < 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
  } else {
    // Fallback if regex fails
    const timeParts = timeStr
      .split(":")
      .map((s) => parseInt(s.replace(/\D/g, ""), 10));
    hour = timeParts[0] || 0;
    minute = timeParts[1] || 0;
  }

  // Step 1: Create a date object as if the input was UTC
  const d = new Date(Date.UTC(year, month - 1, day, hour, minute));

  if (isNaN(d.getTime())) throw new Error("Invalid date generated from inputs");

  // Step 2: Use Intl to see how this UTC moment appears in our target timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone === "UTC" ? "UTC" : timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(d);
  const findItem = (type: string) =>
    parseInt(parts.find((p) => p.type === type)?.value || "0");

  // Step 3: Map the local components back to a UTC timestamp to find the diff
  const tzDate = new Date(
    Date.UTC(
      findItem("year"),
      findItem("month") - 1,
      findItem("day"),
      findItem("hour") % 24, // handle 24:00 if it happens
      findItem("minute"),
      findItem("second")
    )
  );

  const offsetMs = tzDate.getTime() - d.getTime();

  // Step 4: UTC = Local - Offset
  return new Date(d.getTime() - offsetMs).toISOString();
}

/**
 * Check if two dates fall on the same day in a timezone
 */
export function isSameDay(d1: Date, d2: Date, timezone: string): boolean {
  return getDateString(d1, timezone) === getDateString(d2, timezone);
}

/**
 * Add days (timezone-safe for display)
 */
export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Add minutes
 */
export function addMinutes(date: Date, minutes: number): Date {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}

/**
 * Get current timezone offset string (e.g. UTC+05:30)
 */
export function getTimezoneOffset(timezone: string): string {
  const now = new Date();

  const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
  const tz = new Date(now.toLocaleString("en-US", { timeZone: timezone }));

  const diffMin = (tz.getTime() - utc.getTime()) / 60000;
  const sign = diffMin >= 0 ? "+" : "-";
  const h = Math.floor(Math.abs(diffMin) / 60);
  const m = Math.abs(diffMin) % 60;

  return `UTC${sign}${h}:${String(m).padStart(2, "0")}`;
}

/**
 * Common timezones (IANA)
 */
export const TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)" },
  { value: "Europe/Athens", label: "Athens (EET/EEST)" },
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Australia/Sydney", label: "Sydney (AEDT/AEST)" },
];
