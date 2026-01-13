// TypeScript interfaces matching backend DTOs

// ============ ADMIN AUTH ============
export interface AdminRegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userPhone: string;
  userCountry: string;
  companyName: string;
  companyPhone: string;
  companyAddress?: string;
  companyCountry: string;
  currency: string;
}

export interface AdminLoginDto {
  email: string;
  password: string;
}

// ============ STAFF AUTH ============
export interface StaffRegisterDto {
  companyId?: number; // Optional, inferred from token
  inviteToken?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface StaffLoginDto {
  email: string;
  password: string;
}

// ============ AUTH RESPONSE ============
export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: string;
  companyId?: number;
  companyName?: string;
}
