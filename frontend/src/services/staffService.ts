// Booking / Service selection
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export interface StaffMemberDto {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  position: string | null;
}

export const fetchStaffByService = async (
  serviceId: number
): Promise<StaffMemberDto[]> => {
  try {
    const url = `${API_BASE_URL}/api/staff/by-service/${serviceId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch staff: ${response.statusText}`);
    }

    const staff: StaffMemberDto[] = await response.json();
    return staff;
  } catch (error) {
    console.error("Error fetching staff by service:", error);
    throw error;
  }
};
