/**
 * Cliente HTTP hacia lab-langgraph (backend).
 * En gh-pages/static: definir PUBLIC_LAB_LANGGRAPH_URL en el build.
 */

import { labAuthHeaders, labTokenExpired, getStoredLabToken } from "./auth.ts";
import { ensureLabToken, invalidateLabSession, openLabAuthModal } from "./lab-auth-session.ts";

const RAW =
	(typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_LAB_LANGGRAPH_URL) ||
	"";

const PUBLIC_PATHS = new Set(["/auth/token"]);

export function getLabApiBase(): string {
	const v = String(RAW).trim().replace(/\/$/, "");
	return v || "";
}

export function labApiEnabled(): boolean {
	return Boolean(getLabApiBase());
}

function normalizePath(path: string): string {
	const p = path.startsWith("/") ? path : `/${path}`;
	return p.split("?")[0] ?? p;
}

async function authHeadersForPath(path: string): Promise<Record<string, string>> {
	const p = normalizePath(path);
	if (PUBLIC_PATHS.has(p)) return {};
	if (!getStoredLabToken() || labTokenExpired()) {
		await ensureLabToken();
	}
	return labAuthHeaders();
}

export async function labFetch<T = unknown>(
	path: string,
	init?: RequestInit,
	retryOn401 = true,
): Promise<T> {
	const base = getLabApiBase();
	if (!base) throw new Error("PUBLIC_LAB_LANGGRAPH_URL no configurada");
	const url = `${base}/api${path.startsWith("/") ? path : `/${path}`}`;
	const auth = await authHeadersForPath(path);
	const res = await fetch(url, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...auth,
			...(init?.headers ?? {}),
		},
	});
	const text = await res.text();
	let data: unknown = {};
	try {
		data = text ? JSON.parse(text) : {};
	} catch {
		data = { raw: text };
	}
	if (res.status === 401 && retryOn401 && !PUBLIC_PATHS.has(normalizePath(path))) {
		invalidateLabSession();
		await openLabAuthModal();
		return labFetch<T>(path, init, false);
	}
	if (!res.ok) {
		const err = (data as { error?: string })?.error ?? res.statusText;
		throw new Error(err);
	}
	return data as T;
}
