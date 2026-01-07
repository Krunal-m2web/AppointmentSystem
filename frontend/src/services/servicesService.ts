import { getDefaultCurrency } from "./settingsService";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

/**
 * Interface matching the backend CustomerServiceDto
 * This describes what data we'll receive from the API
 */
export interface CustomerServiceDto {
  id: number;
  name: string;
  description: string | null;
  currency: string;
  price: number | null;
  serviceDuration?: number;
}

export interface PaginatedCustomerServiceResponse {
  items: CustomerServiceDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const fetchServices = async (
  companyId: number,
  currency?: string
): Promise<PaginatedCustomerServiceResponse> => {
  try {
    // If currency not provided, fetch default from backend
    if (!currency) {
      currency = await getDefaultCurrency();
    }

    // Construct the full URL with companyId and currency query parameters
    const url = `${API_BASE_URL}/api/services?companyId=${companyId}&currency=${currency}`;

    // Make the fetch request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if request was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.statusText}`);
    }

    // Parse the JSON response and return it
    const data: PaginatedCustomerServiceResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export { getDefaultCurrency } from "./settingsService";
