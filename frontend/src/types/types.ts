// Shared TypeScript interfaces for the Appointment Booking System
// Updated for multi-tenancy schema

// ==================== COMPANY ====================
export interface Company {
  id: number;
  companyName: string;
  phone?: string;
  email: string;
  address?: string;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==================== USER (Admin) ====================
export interface AdminUser {
  id: number;
  companyId: number;
  companyName: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  position?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==================== CURRENCY ====================
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  country: string;
}

// ==================== SERVICE ====================
export interface Service {
  id: number;
  companyId?: number;
  name: string;
  description?: string;
  price: number;
  serviceDuration: number; // in minutes
  currency?: string;
  isActive?: boolean;
  prices?: ServicePrice[];
}

export interface ServicePrice {
  amount: number;
  currency: string;
}

// ==================== STAFF SERVICE (Junction) ====================
export interface StaffServiceInfo {
  id: number;
  serviceId: number;
  serviceName: string;
  customPrice?: number;
  customDuration?: number;
  effectivePrice: number;
  effectiveDuration: number;
  isActive: boolean;
  createdAt?: string;
}

// ==================== STAFF ====================
export interface Staff {
  id: number;
  companyId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
  avatar?: string;
  services: StaffServiceInfo[];
  schedule?: TimeSlot[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TimeSlot {
  id: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

// ==================== CUSTOMER ====================
export interface Customer {
  id: number;
  companyId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  isActive: boolean;
  totalAppointments?: number;
  totalSpent?: number;
  currency?: string;
  lastAppointment?: string;
  createdAt: string;
}

// ==================== APPOINTMENT ====================
export type MeetingType = "InPerson" | "Phone" | "Zoom";
export type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "Cancelled"
  | "Completed";
export type PaymentStatus = "Unpaid" | "Paid" | "Refunded";
export type PaymentMethod = "Card" | "Cash" | "PayPal";

export interface Appointment {
  id: number;
  companyId?: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  staffId?: number;
  staffName: string;
  serviceId: number;
  serviceName: string;
  startDateTime: string; // ISO date string in UTC
  endDateTime: string; // ISO date string in UTC
  duration?: number; // computed from service
  meetingType: MeetingType;
  status: AppointmentStatus;
  price: number;
  currencyCode: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

export interface AppointmentFormData {
  customerId?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  staffId?: number;
  serviceId: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  meetingType: MeetingType;
  paymentMethod: PaymentMethod;
}

// ==================== RECURRENCE RULE ====================
export interface RecurrenceRule {
  id: number;
  rrule: string; // iCalendar RRULE format
  startDateUtc: string;
  endDateUtc?: string;
  timezone: string;
}

// ==================== TIME OFF ====================
export type TimeOffStatus = "Pending" | "Approved" | "Rejected";

export interface TimeOff {
  id: number;
  staffId: number;
  startDateTimeUtc: string;
  endDateTimeUtc: string;
  reason?: string;
  approvedByAdminId?: number;
  status: TimeOffStatus;
  createdAt: string;
  updatedAt: string;
}

// ==================== AUTH ====================
export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: string;
  companyId?: number;
  companyName?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AdminRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  companyPhone?: string;
  companyAddress?: string;
  currency?: string;
}

export interface StaffRegisterData {
  companyId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// ==================== DASHBOARD ====================
export interface DashboardStats {
  totalAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  revenue: { amount: number; currency: string }[];
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}
