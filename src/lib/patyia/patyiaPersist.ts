// Persistencia local en JSON via localStorage para historiales del panel PatyIA.
// Patrón: una clave por dataset, valor JSON.stringify. Carga tolerante a JSON corrupto.

export function loadJson<T>(key: string, fallback: T): T {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = window.localStorage.getItem(key);
		if (raw == null) return fallback;
		return JSON.parse(raw) as T;
	} catch {
		return fallback;
	}
}

export function saveJson<T>(key: string, value: T): void {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// quota/serialize errors silently ignored
	}
}

export function clearKey(key: string): void {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.removeItem(key);
	} catch {
		// ignore
	}
}

// Claves PatyIA actions panel
export const STORAGE_KEYS = {
	txtHistorial: "patyia.actions.txtHistorial",
	chatHistorial: "patyia.actions.chatHistorial",
	imgHistorial: "patyia.actions.imgHistorial",
} as const;
