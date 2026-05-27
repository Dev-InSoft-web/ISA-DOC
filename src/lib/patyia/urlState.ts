type AppState = Record<string, unknown>;

const QUERY_KEY = "state";
const LEGACY_KEYS: ReadonlyArray<string> = ["tab", "tab2"];

function decodeB64Json(raw: string): AppState {
	const json = decodeURIComponent(escape(atob(raw)));
	const obj: unknown = JSON.parse(json);
	return obj && typeof obj === "object" && !Array.isArray(obj) ? (obj as AppState) : {};
}

function encodeB64Json(obj: AppState): string {
	return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
}

export function leerState(): AppState {
	if (typeof window === "undefined") return {};
	const params = new URLSearchParams(window.location.search);
	const raw = params.get(QUERY_KEY);
	if (!raw) return {};
	try {
		return decodeB64Json(raw);
	} catch {
		return {};
	}
}

export function leerStateCampo<T>(campo: string, defecto: T): T {
	const v = leerState()[campo];
	return v === undefined ? defecto : (v as T);
}

export function escribirState(patch: AppState): void {
	if (typeof window === "undefined") return;
	const cur = leerState();
	const next: AppState = { ...cur, ...patch };
	for (const k of Object.keys(next)) {
		const v = next[k];
		if (v === undefined || v === null || v === "") delete next[k];
	}
	const url = new URL(window.location.href);
	for (const k of LEGACY_KEYS) url.searchParams.delete(k);
	if (Object.keys(next).length === 0) {
		url.searchParams.delete(QUERY_KEY);
	} else {
		url.searchParams.set(QUERY_KEY, encodeB64Json(next));
	}
	window.history.replaceState(null, "", url.toString());
}

export function migrarLegacy(map: Record<string, string>): AppState {
	if (typeof window === "undefined") return {};
	const params = new URLSearchParams(window.location.search);
	const out: AppState = {};
	for (const [legacy, nuevo] of Object.entries(map)) {
		const v = params.get(legacy);
		if (v) out[nuevo] = v;
	}
	return out;
}
