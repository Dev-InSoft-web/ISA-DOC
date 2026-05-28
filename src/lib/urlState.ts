/**
 * Estado de UI persistido en query string del URL.
 *
 * Patrón:
 *   ?tab=resumen              → tab activo del panel actual.
 *   ?<key>=<valor>            → cualquier estado serializable a string.
 *
 * Reglas:
 *  - Mutaciones usan `history.replaceState` (no push) para no inundar el back.
 *  - SSR safe: si `typeof window === "undefined"` cae al fallback.
 *  - Listener `onUrlStateChange` permite reaccionar a back/forward.
 */

const PARAM_CHANGED = "isa-doc:url-state-changed";

export function getUrlParam(name: string, fallback: string | null = null): string | null {
	if (typeof window === "undefined") return fallback;
	const v = new URL(window.location.href).searchParams.get(name);
	return v ?? fallback;
}

export function setUrlParam(name: string, value: string | null | undefined): void {
	if (typeof window === "undefined") return;
	const url = new URL(window.location.href);
	const current = url.searchParams.get(name);
	const next = value == null || value === "" ? null : String(value);
	if (current === next) return;
	if (next == null) url.searchParams.delete(name);
	else url.searchParams.set(name, next);
	window.history.replaceState(window.history.state, "", url.toString());
	window.dispatchEvent(new CustomEvent(PARAM_CHANGED, { detail: { name, value: next } }));
}

export function onUrlStateChange(cb: () => void): () => void {
	if (typeof window === "undefined") return () => {};
	const handler = () => cb();
	window.addEventListener("popstate", handler);
	window.addEventListener(PARAM_CHANGED, handler);
	return () => {
		window.removeEventListener("popstate", handler);
		window.removeEventListener(PARAM_CHANGED, handler);
	};
}

/**
 * Helper para conectar el estado de un grupo de pestañas con el URL.
 *
 * Uso típico:
 *   const { selected, isOpen, onOpened } = createUrlTabs("tab", ["editor","resumen","pruebas"]);
 *
 *   let selectedKey = selected();        // valor inicial leído de URL (con fallback al primero).
 *   $: openEditor   = isOpen(selectedKey, "editor");
 *   $: if (openEditor && selectedKey !== "editor") selectedKey = onOpened("editor");
 *
 * Nota: el patrón `bind:open` de flowbite-svelte exige una variable booleana por
 * cada `TabItem`; este helper solo encapsula la conversión `selectedKey ⇄ booleans`
 * y la escritura en el URL, no oculta esa estructura.
 */
export function createUrlTabs(paramName: string, keys: readonly string[]) {
	const fallback = keys[0] ?? "";

	const selected = (): string => {
		const raw = getUrlParam(paramName, fallback);
		if (raw && keys.includes(raw)) return raw;
		return fallback;
	};

	const isOpen = (current: string, key: string): boolean => current === key;

	const onOpened = (key: string): string => {
		if (!keys.includes(key)) return selected();
		setUrlParam(paramName, key === fallback ? null : key);
		return key;
	};

	return { selected, isOpen, onOpened };
}

/**
 * Lee el objeto codificado en base64 dentro del query param `?state=<b64>`.
 * Devuelve `{}` si no hay state, no es base64 válido o no es JSON.
 */
export function readStateB64<T extends Record<string, unknown> = Record<string, unknown>>(paramName: string = "state"): T {
	if (typeof window === "undefined") return {} as T;
	const raw = new URL(window.location.href).searchParams.get(paramName);
	if (!raw) return {} as T;
	try {
		const decoded = JSON.parse(atob(raw));
		if (decoded && typeof decoded === "object") return decoded as T;
	} catch { /* ignore */ }
	return {} as T;
}

/**
 * Mezcla `patch` con el state existente y reescribe `?state=<b64>` (replaceState).
 * Si tras la mezcla el objeto queda vacío, elimina el parámetro.
 */
export function patchStateB64(patch: Record<string, unknown>, paramName: string = "state"): void {
	if (typeof window === "undefined") return;
	const current = readStateB64(paramName);
	const next: Record<string, unknown> = { ...current };
	for (const [k, v] of Object.entries(patch)) {
		if (v == null || v === "") delete next[k];
		else next[k] = v;
	}
	const url = new URL(window.location.href);
	if (Object.keys(next).length === 0) {
		if (!url.searchParams.has(paramName)) return;
		url.searchParams.delete(paramName);
	} else {
		const encoded = btoa(JSON.stringify(next));
		if (url.searchParams.get(paramName) === encoded) return;
		url.searchParams.set(paramName, encoded);
	}
	window.history.replaceState(window.history.state, "", url.toString());
	window.dispatchEvent(new CustomEvent(PARAM_CHANGED, { detail: { name: paramName, value: url.searchParams.get(paramName) } }));
}

/**
 * Igual que `createUrlTabs` pero persiste el tab dentro de `?state=<b64>`
 * bajo la clave `key` (default `"tab"`), no como query param plano.
 */
export function createUrlB64Tabs(key: string, keys: readonly string[], paramName: string = "state") {
	const fallback = keys[0] ?? "";

	const selected = (): string => {
		const st = readStateB64<Record<string, string>>(paramName);
		const raw = st[key];
		if (raw && keys.includes(raw)) return raw;
		return fallback;
	};

	const isOpen = (current: string, k: string): boolean => current === k;

	const onOpened = (k: string): string => {
		if (!keys.includes(k)) return selected();
		patchStateB64({ [key]: k === fallback ? null : k }, paramName);
		return k;
	};

	return { selected, isOpen, onOpened };
}
