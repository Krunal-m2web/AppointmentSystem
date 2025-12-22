import { WeeklyAvailability } from "./availability";

export const DEFAULT_MON_FRI_9_5: WeeklyAvailability[] = [
  {
    dayOfWeek: 1,
    startTime: "09:00:00",
    endTime: "17:00:00",
    isAvailable: true,
  },
  {
    dayOfWeek: 2,
    startTime: "09:00:00",
    endTime: "17:00:00",
    isAvailable: true,
  },
  {
    dayOfWeek: 3,
    startTime: "09:00:00",
    endTime: "17:00:00",
    isAvailable: true,
  },
  {
    dayOfWeek: 4,
    startTime: "09:00:00",
    endTime: "17:00:00",
    isAvailable: true,
  },
  {
    dayOfWeek: 5,
    startTime: "09:00:00",
    endTime: "17:00:00",
    isAvailable: true,
  },

  // Weekend off
  {
    dayOfWeek: 6,
    startTime: "00:00:00",
    endTime: "00:00:00",
    isAvailable: false,
  },
  {
    dayOfWeek: 0,
    startTime: "00:00:00",
    endTime: "00:00:00",
    isAvailable: false,
  },
];
