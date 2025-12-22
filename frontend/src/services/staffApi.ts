import { getToken, getCompanyIdFromToken } from "../utils/auth";
import type { Staff } from "../types/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

const getAuthHeaders = () => {
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
    const errorText = await response.text();
    throw new Error(`Failed to create staff: ${errorText}`);
  }

  return response.json();
}

export async function updateStaff(staff: Staff): Promise<Staff> {
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
  };

  const response = await fetch(`${API_BASE_URL}/api/staff/${staff.id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update staff: ${errorText}`);
  }

  return response.json();
}

export async function deleteStaff(staffId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/staff/${staffId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete staff: ${errorText}`);
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
    const errorText = await response.text();
    throw new Error(`Failed to permanently delete staff: ${errorText}`);
  }
}

export async function fetchStaffAvailability(staffId: number): Promise<any[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/availability/staff/${staffId}`
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
    const errorText = await response.text();
    throw new Error(`Failed to create availability: ${errorText}`);
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

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete availability: ${errorText}`);
  }
}
