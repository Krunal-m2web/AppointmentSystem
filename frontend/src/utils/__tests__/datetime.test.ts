import { describe, it, expect } from "vitest";
import {
  combineDateTimeToUTC,
  formatDate,
  formatTime,
  getDateString,
  getTimeString,
} from "../datetime";

describe("datetime utilities", () => {
  describe("combineDateTimeToUTC", () => {
    it("correctly converts IST time to UTC (24h)", () => {
      // 15:22 IST is 09:52 UTC
      const result = combineDateTimeToUTC(
        "2025-12-24",
        "15:22",
        "Asia/Kolkata"
      );
      expect(result).toBe("2025-12-24T09:52:00.000Z");
    });

    it("correctly converts IST time to UTC (12h PM)", () => {
      const result = combineDateTimeToUTC(
        "2025-12-24",
        "03:22 PM",
        "Asia/Kolkata"
      );
      expect(result).toBe("2025-12-24T09:52:00.000Z");
    });

    it("correctly converts IST time to UTC (12h AM)", () => {
      // 03:22 AM IST is 21:52 UTC Previous Day
      const result = combineDateTimeToUTC(
        "2025-12-24",
        "03:22 AM",
        "Asia/Kolkata"
      );
      expect(result).toBe("2025-12-23T21:52:00.000Z");
    });

    it("handles different date delimiters (/)", () => {
      const result = combineDateTimeToUTC(
        "2025/12/24",
        "15:22",
        "Asia/Kolkata"
      );
      expect(result).toBe("2025-12-24T09:52:00.000Z");
    });

    it("handles UTC correctly", () => {
      const result = combineDateTimeToUTC("2025-12-24", "15:22", "UTC");
      expect(result).toBe("2025-12-24T15:22:00.000Z");
    });
  });

  describe("display formatting", () => {
    const utcDate = "2025-12-24T09:52:00.000Z";

    it("formats date in Asia/Kolkata", () => {
      expect(formatDate(utcDate, "Asia/Kolkata")).toBe("Dec 24, 2025");
    });

    it("formats time in Asia/Kolkata", () => {
      expect(formatTime(utcDate, "Asia/Kolkata")).toBe("03:22 PM");
    });
  });

  describe("string extraction", () => {
    const date = new Date("2025-12-24T15:22:00Z");

    it("gets date string in Asia/Kolkata (YYYY-MM-DD)", () => {
      // 15:22 UTC is 20:52 IST
      expect(getDateString(date, "Asia/Kolkata")).toBe("2025-12-24");
    });

    it("gets time string in Asia/Kolkata (HH:mm 24h)", () => {
      expect(getTimeString(date, "Asia/Kolkata")).toBe("20:52");
    });
  });
});
