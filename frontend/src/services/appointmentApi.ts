// Appointment API service for booking appointments
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

// ==================== Types ====================

export interface CreateAppointmentRequest {
  companyId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceId: number;
  staffId?: number | null;
  startTime: string; // ISO format UTC
  meetingType: "InPerson" | "Phone" | "Zoom";
  paymentMethod: "Card" | "Cash" | "PayPal";
  notes?: string;
}

export interface UpdateAppointmentRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  serviceId?: number;
  staffId?: number | null;
  startTime?: string;
  meetingType?: string;
  paymentMethod?: string;
  status?: string;
  notes?: string;
}

export interface AppointmentResponse {
  id: number;
  companyId: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: number;
  serviceName: string;
  staffId?: number;
  staffName?: string;
  startDateTime: string;
  endDateTime: string;
  meetingType: "InPerson" | "Phone" | "Zoom";
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  currencyCode: string;
  price: number;
  paymentMethod: "Card" | "Cash" | "PayPal";
  paymentStatus: "Unpaid" | "Paid" | "Refunded";
  createdAt: string;
}

export interface GetAppointmentsQuery {
  status?: string;
  staffId?: number;
  staffIds?: number[];
  searchTerm?: string;
  customerId?: number;
  serviceId?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortDirection?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedAppointmentsResponse {
  appointments: AppointmentResponse[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// ==================== API Functions ====================

/**
 * Create a new appointment (customer booking)
 * No authentication required
 */
export async function createAppointment(
  data: CreateAppointmentRequest
): Promise<AppointmentResponse> {
  console.log("Creating appointment with data:", JSON.stringify(data, null, 2));

  const response = await fetch(`${API_BASE_URL}/api/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Appointment creation failed:", response.status, errorData);

    // Handle ASP.NET validation errors format
    let errorMessage = errorData.message || errorData.title;
    if (errorData.errors) {
      errorMessage = Object.entries(errorData.errors)
        .map(([key, val]) => `${key}: ${(val as string[]).join(", ")}`)
        .join("; ");
    }
    throw new Error(
      errorMessage || `Failed to create appointment: ${response.status}`
    );
  }

  return response.json();
}

/**
 * Update an existing appointment
 * Requires authentication token
 */
export async function updateAppointment(
  id: number,
  data: UpdateAppointmentRequest,
  token: string
): Promise<AppointmentResponse> {
  const response = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    let errorMessage = errorData.message || errorData.title;
    if (errorData.errors) {
      errorMessage = Object.entries(errorData.errors)
        .map(([key, val]) => `${(val as string[]).join(", ")}`)
        .join("; ");
    }
    throw new Error(
      errorMessage || `Failed to update appointment: ${response.status}`
    );
  }

  return response.json();
}

/**
 * Get appointments (admin/staff only)
 * Requires authentication token
 */
export async function getAppointments(
  query: GetAppointmentsQuery = {},
  token: string
): Promise<PaginatedAppointmentsResponse> {
  const params = new URLSearchParams();

  if (query.status) params.append("Status", query.status);
  if (query.staffId) params.append("StaffId", query.staffId.toString());
  if (query.staffIds && query.staffIds.length > 0) {
    query.staffIds.forEach((id) => params.append("StaffIds", id.toString()));
  }
  if (query.searchTerm) params.append("SearchTerm", query.searchTerm);
  if (query.customerId)
    params.append("CustomerId", query.customerId.toString());
  if (query.serviceId) params.append("ServiceId", query.serviceId.toString());
  if (query.startDate) params.append("StartDate", query.startDate);
  if (query.endDate) params.append("EndDate", query.endDate);
  if (query.sortBy) params.append("SortBy", query.sortBy);
  if (query.sortDirection) params.append("SortDirection", query.sortDirection);
  if (query.page) params.append("Page", query.page.toString());
  if (query.pageSize) params.append("PageSize", query.pageSize.toString());

  const url = `${API_BASE_URL}/api/appointments${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch appointments: ${response.status}`
    );
  }

  return response.json();
}

/**
 * Delete an appointment
 * Requires authentication token
 */
export async function deleteAppointment(
  id: number,
  token: string
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to delete appointment: ${response.status}`
    );
  }
}
