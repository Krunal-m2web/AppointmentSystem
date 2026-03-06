import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../utils/auth";

interface TimezoneContextType {
  timezone: string;
  setTimezone: (tz: string) => void;
  refreshTimezone: (companyId?: number) => Promise<string>;
}

const TimezoneContext = createContext<TimezoneContextType | undefined>(undefined);

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

/**
 * ✅ SINGLE SOURCE OF TRUTH FOR TIMEZONE
 * - Admin panel → token
 * - Public booking → companyId param
 */
// Default to UTC
function getDefaultTimezone(): string {
  return "UTC";
}

export const TimezoneProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timezone, setTimezone] = useState<string>(getDefaultTimezone());

  const refreshTimezone = async (explicitCompanyId?: number) => {
    try {
      const token = getToken();
      let companyId = explicitCompanyId;

      // 🔐 Admin panel flow: extract companyId from JWT
      if (!companyId && token) {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const payload = JSON.parse(window.atob(base64));
          
          console.log("TimezoneContext: Token payload:", payload);

          // Check standard and custom claim keys
          companyId = Number(payload.companyId || payload.CompanyId || payload.cid);
        } catch (err) {
          console.error("TimezoneContext: Failed to parse token payload", err);
        }
      }

      // 💾 Fallback: Check localStorage
      if (!companyId || isNaN(companyId)) {
        const storedCid = localStorage.getItem("company_id");
        if (storedCid) {
          companyId = Number(storedCid);
          console.log("TimezoneContext: Found companyId in localStorage:", companyId);
        }
      }

      // ❌ No company → use default timezone
      if (!companyId || isNaN(companyId)) {
        const defaultTz = getDefaultTimezone();
        console.warn(`TimezoneContext: No valid companyId found, defaulting to: ${defaultTz}`);
        setTimezone(defaultTz);
        return defaultTz;
      }

      console.log(`TimezoneContext: Fetching timezone for company ${companyId}...`);

      const res = await fetch(
        `${API_BASE_URL}/api/settings/timezone?companyId=${companyId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );

      if (!res.ok) {
        console.error(`TimezoneContext: Backend error ${res.status} fetching timezone`);
        return timezone; // Return current value
      }

      const data = await res.json();
      console.log("TimezoneContext: Fetched data:", data);

      if (data?.timezone && data.timezone !== "undefined") {
        setTimezone(data.timezone);
        console.log(`TimezoneContext: Updated to ${data.timezone}`);
        return data.timezone; // Return the new timezone value
      }
      return timezone; // Return current value
    } catch (err) {
      console.error("TimezoneContext: Error during refresh:", err);
      const defaultTz = getDefaultTimezone();
      setTimezone(defaultTz);
      return defaultTz;
    }
  };

  useEffect(() => {
    refreshTimezone();
  }, []);

  return (
    <TimezoneContext.Provider
      value={{ timezone, setTimezone, refreshTimezone }}
    >
      {children}
    </TimezoneContext.Provider>
  );
};

export const useTimezone = () => {
  const ctx = useContext(TimezoneContext);
  if (!ctx) {
    throw new Error("useTimezone must be used inside TimezoneProvider");
  }
  return ctx;
};
