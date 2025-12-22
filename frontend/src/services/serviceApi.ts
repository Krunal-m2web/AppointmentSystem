import { getToken, getCompanyIdFromToken } from "../utils/auth";
import { Service } from "../types/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export interface ServiceListItem {
  id: number;
  name: string;
}

export async function fetchServices(companyId?: number): Promise<Service[]> {
  const tid = companyId || getCompanyIdFromToken(getToken() || "");
  const url = tid
    ? `${API_BASE_URL}/api/services?companyId=${tid}`
    : `${API_BASE_URL}/api/services`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }
  return res.json();
}

export async function createService(
  service: Partial<Service>
): Promise<Service> {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/api/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(service),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create service: ${err}`);
  }
  return res.json();
}

export async function updateService(
  id: number,
  service: Partial<Service>
): Promise<Service> {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/api/services/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(service),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update service: ${err}`);
  }
  return res.json();
}

export async function deleteService(id: number): Promise<void> {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/api/services/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to delete service: ${err}`);
  }
}
