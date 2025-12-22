import { getToken } from "../utils/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export interface ServicePricingDto {
  id: number;
  name: string;
  description: string | null;
  currency: string;
  amount: number | null;
  priceMissing: boolean;
  serviceDuration: number;
}

export interface UpsertPriceDto {
  currency: string;
  amount: number;
}

export async function fetchServicesPricing(
  companyId: number
): Promise<ServicePricingDto[]> {
  const token = getToken();
  const url = `${API_BASE_URL}/api/service-pricing?companyId=${companyId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch service pricing");
  }

  return res.json();
}

export async function upsertServicePrice(
  serviceId: number,
  dto: UpsertPriceDto
): Promise<void> {
  const token = getToken();
  const url = `${API_BASE_URL}/api/service-pricing/${serviceId}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update price: ${err}`);
  }
}

export async function deleteServicePrice(
  serviceId: number,
  currency: string
): Promise<void> {
  const token = getToken();
  const url = `${API_BASE_URL}/api/service-pricing/${serviceId}?currency=${currency}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to delete price: ${err}`);
  }
}
