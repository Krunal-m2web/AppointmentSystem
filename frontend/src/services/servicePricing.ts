import { getToken, getCompanyIdFromToken } from "../utils/auth";

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

export interface PaginatedServicePricingResponse {
  items: ServicePricingDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ServicePricingQueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
  searchTerm?: string;
  companyId?: number;
}

export async function fetchServicesPricing(
  params: ServicePricingQueryParams = {}
): Promise<PaginatedServicePricingResponse | any[]> {
  const token = getToken();
  const tid = params.companyId ?? getCompanyIdFromToken(token || "") ?? -1;

  const queryParams = new URLSearchParams();
  queryParams.append("companyId", tid.toString());
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.pageSize)
    queryParams.append("pageSize", params.pageSize.toString());
  if (params.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params.sortDirection)
    queryParams.append("sortDirection", params.sortDirection);
  if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm);

  const url = `${API_BASE_URL}/api/service-pricing?${queryParams.toString()}`;

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
