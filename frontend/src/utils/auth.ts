import { jwtDecode } from "jwt-decode";

export type DecodedToken = {
  // Standard JWT claims
  sub?: string; // Subject (user ID)
  exp?: number; // Expiration time
  iat?: number; // Issued at
  role?: string; // User role
  companyId?: string; // Multi-tenancy claim
  companyName?: string;
  [key: string]: any; // Other custom claims
};

export function getRoleFromToken(token: string): string | undefined {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    // In some ASP.NET JWT configurations, claims might be mapped to standard URIs
    return (
      decodedToken.role ||
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] ||
      (decodedToken as any)["Role"]
    );
  } catch (error) {
    console.error("Error decoding token:", error);
    return undefined;
  }
}

export function getUserIdFromToken(token: string): number | undefined {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    // Standard 'sub' claim usually holds the user ID
    const sub = decoded.sub;
    return sub ? parseInt(sub, 10) : undefined;
  } catch (e) {
    return undefined;
  }
}

export function getCompanyIdFromToken(token: string): number | undefined {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    // Check both camelCase and PascalCase (ASP.NET often uses PascalCase)
    const companyId =
      decodedToken.companyId ||
      decodedToken["companyId"] ||
      decodedToken["CompanyId"] ||
      (decodedToken as any).CompanyId;

    console.log("getCompanyIdFromToken: Raw token payload:", decodedToken);
    console.log("getCompanyIdFromToken: Extracted companyId:", companyId);

    return companyId ? parseInt(companyId, 10) : undefined;
  } catch (error) {
    console.error("Error decoding token:", error);
    return undefined;
  }
}

export function saveToken(token: string): void {
  localStorage.setItem("auth_token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

export function clearToken(): void {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("company_id");
  localStorage.removeItem("user_role");
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (!decoded.exp) return false;
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}
