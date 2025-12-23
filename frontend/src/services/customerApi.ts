import { getToken } from "../utils/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export interface CustomerResponse {
  id: number;
  companyId: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  notes: string | null;
  isActive: boolean;
  lastAppointment: string | null;
  totalAppointments: number;
  createdAt: string;
}

export interface CreateCustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  notes?: string;
}

export interface UpdateCustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  notes?: string;
  isActive?: boolean;
}

const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function fetchCustomers(
  search?: string
): Promise<CustomerResponse[]> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);

  const url = `${API_BASE_URL}/api/customer${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch customers: ${errorText}`);
  }

  return response.json();
}

export async function getCustomer(id: number): Promise<CustomerResponse> {
  const response = await fetch(`${API_BASE_URL}/api/customer/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch customer: ${errorText}`);
  }

  return response.json();
}

export async function createCustomer(
  data: CreateCustomerRequest
): Promise<CustomerResponse> {
  const response = await fetch(`${API_BASE_URL}/api/customer`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create customer: ${errorText}`);
  }

  return response.json();
}

export async function updateCustomer(
  id: number,
  data: UpdateCustomerRequest
): Promise<CustomerResponse> {
  const response = await fetch(`${API_BASE_URL}/api/customer/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update customer: ${errorText}`);
  }

  return response.json();
}

export async function deleteCustomer(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/customer/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete customer: ${errorText}`);
  }
}

export async function permanentDeleteCustomer(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/customer/${id}/permanent`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to permanently delete customer: ${errorText}`);
  }
}
