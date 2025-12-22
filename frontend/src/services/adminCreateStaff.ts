const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export interface CreateStaffDto {
  FirstName: string;
  LastName: string;
  Email: string;
  Username: string;
  Phone: string;
  Address: string;
  StaffRole: string;
  Position: string;
  Password: string;
  ServiceIds: number[];
}

export interface setAvailabilityDto {
  staffId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface TimeSlotDto {
  startTime: string; // ISO UTC string
  endTime: string; // ISO UTC string
  isAvailable: boolean;
}

export const createStaff = async (staffDto: CreateStaffDto) => {
  const response = await fetch(`${API_BASE_URL}/api/staff`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staffDto),
  });

  if (!response.ok) {
    throw new Error("Failed to create staff member");
  }

  return await response.json();
};
