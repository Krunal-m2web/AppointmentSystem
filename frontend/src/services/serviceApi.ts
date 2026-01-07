import { getToken, getCompanyIdFromToken } from "../utils/auth";
import { Service } from "../types/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export interface ServiceListItem {
  id: number;
  name: string;
}

export interface PaginatedServiceResponse {
  items: Service[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ServiceQueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
  searchTerm?: string;
  companyId?: number;
}

export async function fetchServices(
  params: ServiceQueryParams = {}
): Promise<PaginatedServiceResponse | any[]> {
  const tid = params.companyId || getCompanyIdFromToken(getToken() || "");

  const queryParams = new URLSearchParams();
  if (tid) queryParams.append("companyId", tid.toString());
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.pageSize)
    queryParams.append("pageSize", params.pageSize.toString());
  if (params.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params.sortDirection)
    queryParams.append("sortDirection", params.sortDirection);
  if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm);

  const url = `${API_BASE_URL}/api/services?${queryParams.toString()}`;

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
