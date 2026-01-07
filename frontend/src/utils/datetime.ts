// =======================================================
// Date & Time Utilities (UTC storage, Company TZ display)
// =======================================================
import { fromZonedTime } from "date-fns-tz";

/**
 * Format date in a specific timezone
 */
export function formatDate(
  dateString: string,
  timezone: string,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
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
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
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
 * 🔥 CORE FUNCTION REFACTORED
 * Convert company-timezone date & time → UTC ISO string
 * Uses date-fns-tz for robust DST handling
 *
 * dateStr: YYYY-MM-DD
 * timeStr: HH:mm or h:mm am/pm
 */
export function combineDateTimeToUTC(
  dateStr: string,
  timeStr: string,
  timezone: string
): string {
  let hour = 0;
  let minute = 0;

  // Parse time string (supports "15:30" or "3:30 pm")
  const match = timeStr.match(/(\d+):(\d+)\s*(am|pm)?/i);
  if (!match) throw new Error("Invalid time format");

  hour = parseInt(match[1], 10);
  minute = parseInt(match[2], 10);
  const ampm = match[3]?.toLowerCase();

  if (ampm === "pm" && hour < 12) hour += 12;
  if (ampm === "am" && hour === 12) hour = 0;

  // Create a string that Date.parse or date-fns can understand as "local time in that zone"
  // Format: "YYYY-MM-DD HH:mm:ss"
  const localDateTimeStr = `${dateStr} ${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;

  // Convert this "local" time in the specific timezone to a true UTC Date object
  // fromZonedTime takes the string and the timezone it belongs to, and returns the UTC Date
  const utcDate = fromZonedTime(localDateTimeStr, timezone);

  return utcDate.toISOString();
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
  try {
    const now = new Date();
    const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
    const tz = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
    const diffMin = (tz.getTime() - utc.getTime()) / 60000;
    const sign = diffMin >= 0 ? "+" : "-";
    const h = Math.floor(Math.abs(diffMin) / 60);
    const m = Math.abs(diffMin) % 60;
    return `UTC${sign}${h}:${String(m).padStart(2, "0")}`;
  } catch (e) {
    return "UTC+0:00";
  }
}

/**
 * Helper to get keywords for search
 */
function getTimezoneKeywords(tz: string): string {
  const t = tz.toLowerCase();
  const keywords: string[] = [];

  if (t.includes("asia/kolkata")) keywords.push("india", "ist");
  if (t.includes("europe/london"))
    keywords.push("uk", "england", "great britain", "gmt", "bst");
  if (
    t.includes("america/new_york") ||
    t.includes("america/chicago") ||
    t.includes("america/denver") ||
    t.includes("america/los_angeles") ||
    t.includes("america/phoenix")
  ) {
    keywords.push("usa", "united states", "america");
  }
  if (t.includes("asia/tokyo")) keywords.push("japan", "jst");
  if (t.includes("australia")) keywords.push("australia");
  if (t.includes("europe/paris")) keywords.push("france", "cet", "cest");
  if (t.includes("europe/berlin")) keywords.push("germany", "cet", "cest");
  if (t.includes("asia/dubai")) keywords.push("uae", "united arab emirates");

  return keywords.join(" ");
}

/**
 * Common timezones - Generated dynamically from browser support
 */
export const TIMEZONES = Intl.supportedValuesOf("timeZone").map((tz) => ({
  value: tz,
  label: tz.replace(/_/g, " "), // Simple formatting
  offset: getTimezoneOffset(tz),
  keywords: getTimezoneKeywords(tz),
}));
