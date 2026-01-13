import { getToken } from "../utils/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

export interface CreateInviteResponse {
  token: string;
  expiresAt: string;
}

export interface ValidateInviteResponse {
  isValid: boolean;
  companyId?: number;
  companyName?: string;
  email?: string;
}

export const createInvite = async (email?: string) => {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/api/staff-invites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Failed to create invite");
  return res.json() as Promise<CreateInviteResponse>;
};

export const validateInvite = async (token: string) => {
  const res = await fetch(
    `${API_BASE_URL}/api/staff-invites/validate/${token}`
  );
  if (!res.ok) return { isValid: false };
  return res.json() as Promise<ValidateInviteResponse>;
};
