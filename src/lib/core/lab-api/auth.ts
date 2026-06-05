/**
 * Sesión JWT hacia lab-langgraph (localStorage).
 */

const STORAGE_KEY = "isa-doc:lab-jwt";
const STORAGE_EXP_KEY = "isa-doc:lab-jwt-exp";

export type LabTokenResponse = {
	ok: boolean;
	token?: string;
	tokenType?: string;
	expiresAt?: string;
	expiresInDays?: number;
	username?: string;
	error?: string;
};

export function getStoredLabToken(): string | null {
	if (typeof localStorage === "undefined") return null;
	const t = localStorage.getItem(STORAGE_KEY)?.trim();
	return t || null;
}

export function getStoredLabTokenExpiry(): string | null {
	if (typeof localStorage === "undefined") return null;
	return localStorage.getItem(STORAGE_EXP_KEY);
}

export function setStoredLabToken(token: string, expiresAt?: string): void {
	if (typeof localStorage === "undefined") return;
	localStorage.setItem(STORAGE_KEY, token.trim());
	if (expiresAt) localStorage.setItem(STORAGE_EXP_KEY, expiresAt);
}

export function clearStoredLabToken(): void {
	if (typeof localStorage === "undefined") return;
	localStorage.removeItem(STORAGE_KEY);
	localStorage.removeItem(STORAGE_EXP_KEY);
}

export function hasValidLabSession(): boolean {
	const token = getStoredLabToken();
	return Boolean(token && !labTokenExpired());
}

export function labTokenExpired(): boolean {
	const token = getStoredLabToken();
	if (!token) return true;
	const payload = decodeJwtPayload(token);
	if (payload?.exp) return Date.now() >= payload.exp * 1000;
	const expIso = getStoredLabTokenExpiry();
	if (expIso) return Date.now() >= new Date(expIso).getTime();
	return false;
}

function decodeJwtPayload(token: string): { exp?: number } | null {
	try {
		const part = token.split(".")[1];
		if (!part) return null;
		const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
		return JSON.parse(json) as { exp?: number };
	} catch {
		return null;
	}
}

export function labAuthHeaders(): Record<string, string> {
	const token = getStoredLabToken();
	if (!token || labTokenExpired()) return {};
	return { Authorization: `Bearer ${token}` };
}
