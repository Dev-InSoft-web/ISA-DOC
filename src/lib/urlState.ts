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
