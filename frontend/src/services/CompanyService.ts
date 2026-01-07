import { getAuthHeaders } from "./staffApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CompanyResponse {
  companyName: string;
  email: string;
  phone?: string;
  websiteUrl?: string;
  logoUrl?: string;
  slug?: string;
}

export async function getMyCompany() {
  const res = await fetch(`${API_BASE_URL}/api/companies/me`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to load company");
  return res.json();
}

export async function updateMyCompany(payload: Partial<CompanyResponse>) {
  const res = await fetch(`${API_BASE_URL}/api/companies/me`, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      errorData?.error || errorData?.inner || "Failed to update company"
    );
  }
}

export async function getPublicCompanyProfile(id: number) {
  const res = await fetch(`${API_BASE_URL}/api/companies/public/${id}`);
  if (!res.ok) throw new Error("Failed to load company profile");
  return res.json();
}

export async function getPublicCompanyProfileBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}/api/companies/public/slug/${slug}`);
  if (!res.ok) throw new Error("Failed to load company profile");
  return res.json();
}

export async function uploadCompanyLogo(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/api/companies/me/logo`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeaders().Authorization,
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to upload logo");
  }

  return res.json();
}
