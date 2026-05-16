/**
 * Runtime helpers para soportar despliegues estaticos (gh-pages) del proyecto
 * ISA-DOC. En modo estatico no hay servidor Astro/Node ni servidor de sockets;
 * por lo tanto:
 *
 * - Toda llamada a `/api/...` GET intenta primero un snapshot estatico bajo
 *   `${BASE_URL}static-api/<ruta>.json`; si no existe, se devuelve un default
 *   razonable segun la forma esperada del endpoint.
 * - Toda llamada de escritura (PUT/POST/PATCH/DELETE) se responde con
 *   `{ ok: true, static: true }` para que la UI siga operando como si la
 *   edicion local hubiese persistido, pero sin enviar nada al server.
 * - Toda conexion `socket.io-client` queda inhibida via `STATIC_MODE`.
 * - Los enlaces internos deben prefijarse con `withBase(...)` para respetar
 *   `base: "/ISA-DOC"`.
 */

const RAW_BASE = import.meta.env.BASE_URL || "/";

export const STATIC_MODE = RAW_BASE !== "/";
export const BASE_URL = RAW_BASE;

const BASE_NO_SLASH = RAW_BASE.endsWith("/") ? RAW_BASE.slice(0, -1) : RAW_BASE;

export function withBase(path: string): string {
	if (!path) return RAW_BASE;
	if (/^[a-z]+:/i.test(path)) return path;
	if (!path.startsWith("/")) return path;
	return BASE_NO_SLASH + path;
}

let shimInstalled = false;

function defaultForPath(apiPath: string): unknown {
	if (apiPath === "tables") return { ok: true, version: 1, tables: [] };
	if (apiPath === "revisado") return {};
	if (apiPath === "sql/fragments") return { fragments: [], full: "" };
	if (apiPath === "ts/fragments") return { ok: true, map: {} };
	if (apiPath === "codegen/state") return { ok: true, state: {} };
	if (apiPath === "source") return "";
	return { ok: true, static: true };
}

export function installStaticFetchShim(): void {
	if (!STATIC_MODE) return;
	if (typeof window === "undefined") return;
	if (shimInstalled) return;
	shimInstalled = true;

	const origFetch = window.fetch.bind(window);

	const writeOkResponse = (): Response =>
		new Response(JSON.stringify({ ok: true, static: true }), {
			status: 200,
			headers: { "content-type": "application/json" },
		});

	const defaultResponse = (apiPath: string): Response => {
		const data = defaultForPath(apiPath);
		const body = typeof data === "string" ? data : JSON.stringify(data);
		const ct = typeof data === "string" ? "text/plain; charset=utf-8" : "application/json";
		return new Response(body, { status: 200, headers: { "content-type": ct } });
	};

	window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
		const url = typeof input === "string"
			? input
			: input instanceof URL ? input.href : (input as Request).url;

		// Reescritura de assets servidos como absolutos sin prefijo (paquetes externos:
		// `/icons/iconify/...`, `/imgs/...`, `/docs/...`, `/bd/...`, `/db/...`).
		// En produccion bajo `/ISA-DOC/`, estos requests pegan a la raiz del dominio
		// y devuelven 404; aqui los corregimos al prefijo base.
		const ASSET_PREFIXES = ["/icons/", "/imgs/", "/docs/", "/bd/", "/db/", "/static-api/"];
		for (const p of ASSET_PREFIXES) {
			if (url.startsWith(p)) {
				const fixed = BASE_NO_SLASH + url;
				return origFetch(fixed, init);
			}
		}

		const isApi = url.startsWith("/api/") || url.startsWith(BASE_NO_SLASH + "/api/");
		if (!isApi) return origFetch(input, init);

		const method = (init?.method ?? (input instanceof Request ? input.method : "GET")).toUpperCase();

		const apiIdx = url.indexOf("/api/");
		const apiPath = url.slice(apiIdx + "/api/".length).replace(/\?.*$/, "").replace(/\/$/, "");

		// Escrituras: no se contacta nada; se finge exito para que la UI mantenga
		// el estado local sin enviar nada al server (modo "estado congelado").
		if (method !== "GET") return writeOkResponse();

		// Lecturas: intenta snapshot estatico; si no, default segun la forma del endpoint.
		const target = `${BASE_NO_SLASH}/static-api/${apiPath}.json`;
		try {
			const r = await origFetch(target, { cache: "no-cache" });
			if (r.ok) return r;
		} catch { /* fall through */ }
		return defaultResponse(apiPath);
	};
}
