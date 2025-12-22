// Settings-related API endpoints
import { getToken } from "../utils/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export const getDefaultCurrency = async (): Promise<string> => {
  try {
    const url = `${API_BASE_URL}/api/settings/currency`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch default currency: ${response.statusText}`
      );
    }

    // Backend returns the currency code as a string
    const currency = await response.text();
    // Remove quotes if present (JSON string response)
    return currency.replace(/['"]+/g, "");
  } catch (error) {
    console.error("Error fetching default currency:", error);
    // Return USD as fallback if API fails
    return "USD";
  }
};

export const updateDefaultCurrency = async (
  currency: string
): Promise<string> => {
  const token = getToken();

  if (!token) {
    throw new Error("Not authenticated. Please log in again.");
  }

  const url = `${API_BASE_URL}/api/settings/currency`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(currency),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || `Failed to update currency: ${response.statusText}`
    );
  }

  const result = await response.json();
  return result.message || "Currency updated successfully";
};
