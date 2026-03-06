import { getToken } from "../utils/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

/* ─────────────────────────────────────────────
   Types (mirrors backend DTOs)
───────────────────────────────────────────── */
export interface Holiday {
  id: number;
  date: string;          // "YYYY-MM-DD"
  name: string;
  repeatYearly: boolean;
  source: string;        // 'custom' | country-code e.g. 'IN'
  countryName?: string;
}

export interface ImportedCountry {
  source: string;
  countryName: string;
}

export interface CreateHolidayPayload {
  date: string;          // "YYYY-MM-DD"
  name: string;
  repeatYearly: boolean;
  source?: string;
  countryName?: string;
}

export interface UpdateHolidayPayload {
  name: string;
  repeatYearly: boolean;
}

/* ─────────────────────────────────────────────
   API Helpers
───────────────────────────────────────────── */
function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

/* ─────────────────────────────────────────────
   GET /api/holidays?year=YYYY
───────────────────────────────────────────── */
export async function fetchHolidays(year: number): Promise<Holiday[]> {
  const res = await fetch(
    `${API_BASE_URL}/api/holidays?year=${year}`,
    { headers: authHeaders() }
  );
  return handleResponse<Holiday[]>(res);
}

/* ─────────────────────────────────────────────
   GET /api/holidays/public/{companyId}?year=YYYY
───────────────────────────────────────────── */
export async function fetchPublicHolidays(companyId: number, year: number): Promise<Holiday[]> {
  const res = await fetch(
    `${API_BASE_URL}/api/holidays/public/${companyId}?year=${year}`
  );
  return handleResponse<Holiday[]>(res);
}

/* ─────────────────────────────────────────────
   POST /api/holidays  — single
───────────────────────────────────────────── */
export async function createHoliday(
  payload: CreateHolidayPayload
): Promise<Holiday> {
  const res = await fetch(`${API_BASE_URL}/api/holidays`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<Holiday>(res);
}

/* ─────────────────────────────────────────────
   POST /api/holidays/bulk  — import / bulk-add
───────────────────────────────────────────── */
export async function bulkCreateHolidays(
  holidays: CreateHolidayPayload[]
): Promise<Holiday[]> {
  const res = await fetch(`${API_BASE_URL}/api/holidays/bulk`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ holidays }),
  });
  return handleResponse<Holiday[]>(res);
}

/* ─────────────────────────────────────────────
   PUT /api/holidays/{id}
───────────────────────────────────────────── */
export async function updateHoliday(
  id: number,
  payload: UpdateHolidayPayload
): Promise<Holiday> {
  const res = await fetch(`${API_BASE_URL}/api/holidays/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<Holiday>(res);
}

/* ─────────────────────────────────────────────
   DELETE /api/holidays/{id}
───────────────────────────────────────────── */
export async function deleteHoliday(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/holidays/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse<void>(res);
}

/* ─────────────────────────────────────────────
   DELETE /api/holidays/bulk
───────────────────────────────────────────── */
export async function bulkDeleteHolidays(ids: number[]): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/holidays/bulk`, {
    method: "DELETE",
    headers: authHeaders(),
    body: JSON.stringify({ ids }),
  });
  return handleResponse<void>(res);
}

/* ─────────────────────────────────────────────
   GET /api/holidays/imported-countries
───────────────────────────────────────────── */
export async function fetchImportedCountries(): Promise<ImportedCountry[]> {
  const res = await fetch(`${API_BASE_URL}/api/holidays/imported-countries`, {
    headers: authHeaders(),
  });
  return handleResponse<ImportedCountry[]>(res);
}

/* ─────────────────────────────────────────────
   DELETE /api/holidays/source/{source}
───────────────────────────────────────────── */
export async function deleteHolidaysBySource(source: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/holidays/source/${source}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse<void>(res);
}
