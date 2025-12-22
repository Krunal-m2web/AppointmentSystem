export interface WeeklyAvailability {
  dayOfWeek: number; // 0 = Sunday ... 6 = Saturday
  startTime: string; // "09:00:00"
  endTime: string; // "17:00:00"
  isAvailable: boolean;
}
