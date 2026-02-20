import type {
  AdminRegisterDto,
  AdminLoginDto,
  StaffRegisterDto,
  StaffLoginDto,
  AuthResponse,
} from "../types/auth.types";
import { parseErrorMessage } from "../utils/error";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

// ============ ADMIN AUTH ============

export const adminRegister = async (
  data: AdminRegisterDto
): Promise<{ message: string; companyId: number; userId: number }> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/admin/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(parseErrorMessage(text) || "Admin registration failed");
  }

  return await response.json();
};

export const checkEmailAvailability = async (email: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/admin/check-email?email=${encodeURIComponent(email)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(parseErrorMessage(text) || "Email check failed");
  }
};

export const sendOtp = async (email: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/admin/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(parseErrorMessage(text) || "Failed to send verification code");
  }
  return response.json();
};

export const verifyOtp = async (
  email: string,
  otpCode: string
): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/admin/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otpCode }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(parseErrorMessage(text) || "Invalid verification code");
  }
  return response.json();
};

export const adminLogin = async (
  data: AdminLoginDto
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(parseErrorMessage(text) || "Admin login failed");
  }

  return await response.json();
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ message: string }> => {
  const token = getToken();
  const response = await fetch(
    `${API_BASE_URL}/api/auth/admin/change-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(parseErrorMessage(text) || "Failed to change password");
  }

  return await response.json();
};

// ============ STAFF AUTH ============

export const staffRegister = async (
  data: StaffRegisterDto
): Promise<{ message: string; staffId: number; companyId: number }> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/staff/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(parseErrorMessage(text) || "Staff registration failed");
  }

  return await response.json();
};

export const staffLogin = async (
  data: StaffLoginDto
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/staff/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(parseErrorMessage(text) || "Staff login failed");
  }

  return await response.json();
};

// ============ TOKEN MANAGEMENT ============

export const saveToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

export const clearToken = (): void => {
  localStorage.removeItem("auth_token");
};

export const saveCompanyId = (companyId: number): void => {
  localStorage.setItem("company_id", companyId.toString());
};

export const getCompanyId = (): number | null => {
  const id = localStorage.getItem("company_id");
  return id ? parseInt(id, 10) : null;
};

export const saveUserRole = (role: string): void => {
  localStorage.setItem("user_role", role);
};

export const getUserRole = (): string | null => {
  return localStorage.getItem("user_role");
};

export const logout = (): void => {
  clearToken();
  localStorage.removeItem("company_id");
  localStorage.removeItem("user_role");
  window.location.href = "/";
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
