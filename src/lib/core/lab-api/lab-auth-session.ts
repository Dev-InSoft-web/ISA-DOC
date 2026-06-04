import { writable } from "svelte/store";
import { clearStoredLabToken, getStoredLabToken, labTokenExpired, setStoredLabToken, type LabTokenResponse } from "./auth.ts";
import { getLabApiBase } from "./client.ts";

export const labAuthModalOpen = writable(false);

type Pending = {
	resolve: (token: string) => void;
	reject: (err: Error) => void;
};

let pending: Pending | null = null;

export function openLabAuthModal(): Promise<string> {
	const existing = getStoredLabToken();
	if (existing && !labTokenExpired()) return Promise.resolve(existing);
	if (pending) {
		return new Promise((resolve, reject) => {
			const prev = pending!;
			pending = {
				resolve: (t) => {
					prev.resolve(t);
					resolve(t);
				},
				reject: (e) => {
					prev.reject(e);
					reject(e);
				},
			};
		});
	}
	return new Promise((resolve, reject) => {
		pending = { resolve, reject };
		labAuthModalOpen.set(true);
	});
}

export function completeLabAuth(token: string, expiresAt?: string): void {
	setStoredLabToken(token, expiresAt);
	labAuthModalOpen.set(false);
	pending?.resolve(token);
	pending = null;
}

export function cancelLabAuth(message = "Autenticación cancelada"): void {
	labAuthModalOpen.set(false);
	pending?.reject(new Error(message));
	pending = null;
}

export async function loginLabApi(username: string, password: string): Promise<LabTokenResponse> {
	const base = getLabApiBase();
	if (!base) throw new Error("PUBLIC_LAB_LANGGRAPH_URL no configurada");
	const res = await fetch(`${base}/api/auth/token`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	});
	const text = await res.text();
	let data: LabTokenResponse = { ok: false };
	try {
		data = text ? (JSON.parse(text) as LabTokenResponse) : { ok: false };
	} catch {
		data = { ok: false, error: text || res.statusText };
	}
	if (!res.ok) {
		throw new Error(data.error ?? res.statusText);
	}
	return data;
}

export async function ensureLabToken(): Promise<string> {
	const t = getStoredLabToken();
	if (t && !labTokenExpired()) return t;
	return openLabAuthModal();
}

export function invalidateLabSession(): void {
	clearStoredLabToken();
}
