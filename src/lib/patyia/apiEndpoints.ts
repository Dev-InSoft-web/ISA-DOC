/**
 * Catálogo de endpoints expuestos por el server local de Azure Functions
 * (http://localhost:7071/api/...). Permite decidir dinámicamente si una
 * acción se procesa en local o cae al server de origin.
 */

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface LocalEndpointRoute {
	name: string;
	method: ApiMethod;
	internalPattern: RegExp;
	buildLocalUrl: (m: RegExpMatchArray) => string;
}

const LOCAL_BASE = "http://localhost:7071";

export const LOCAL_ENDPOINT_ROUTES: LocalEndpointRoute[] = [
	{
		name: "API_GET_ConversacionesTercero",
		method: "GET",
		internalPattern: /^\/api\/patyia\/conversaciones(\?.*)?$/,
		buildLocalUrl: (m) => `${LOCAL_BASE}/api/conversaciones${m[1] ?? ""}`,
	},
	{
		name: "API_GET_ObtenerConversacion",
		method: "GET",
		internalPattern: /^\/api\/patyia\/conversacion\/([^/?]+)(?:\?.*)?$/,
		buildLocalUrl: (m) => `${LOCAL_BASE}/api/conversacion/${m[1]}`,
	},
	{
		name: "API_POST_InsertarConversacion",
		method: "POST",
		internalPattern: /^\/api\/patyia\/staging\/conversacion\/new$/,
		buildLocalUrl: () => `${LOCAL_BASE}/api/conversacion`,
	},
	{
		name: "API_POST_InsertarMensajeCalificado",
		method: "POST",
		internalPattern: /^\/api\/patyia\/staging\/conversacion\/([^/]+)\/send-stream$/,
		buildLocalUrl: () => `${LOCAL_BASE}/api/mensaje`,
	},
];

export interface LocalEndpointDoc {
	name: string;
	method: ApiMethod;
	path: string;
	description?: string;
}

export const ALL_LOCAL_ENDPOINTS: LocalEndpointDoc[] = [
	{ name: "API_DELETE_ObtenerConversacion", method: "DELETE", path: "/api/conversacion/{iconversacion}" },
	{ name: "API_DELETE_Tiquete", method: "DELETE", path: "/api/tiquete/{itiquete}" },
	{ name: "API_GET_ConversacionesTercero", method: "GET", path: "/api/conversaciones" },
	{ name: "API_GET_ObtenerConversacion", method: "GET", path: "/api/conversacion/{iconversacion}" },
	{ name: "API_GET_ObtenerResumenConversacion", method: "GET", path: "/api/resumen_conversacion/{iconversacion}" },
	{ name: "API_GET_Tiquete", method: "GET", path: "/api/tiquete/{itiquete}" },
	{ name: "API_GET_TiquetePorConversacion", method: "GET", path: "/api/tiquete/por-conversacion/{iconversacion}" },
	{ name: "API_HTTP_Timer_CerrarConversaciones", method: "GET", path: "/api/timer_cerrarConversaciones" },
	{ name: "API_PATCH_Tiquete", method: "PATCH", path: "/api/tiquete" },
	{ name: "API_POST_Authorization", method: "POST", path: "/api/jwt" },
	{ name: "API_POST_InsertarConversacion", method: "POST", path: "/api/conversacion" },
	{ name: "API_POST_InsertarMensajeCalificado", method: "POST", path: "/api/mensaje" },
	{ name: "API_POST_Tiquete", method: "POST", path: "/api/tiquete" },
];

export interface ResolvedLocalEndpoint {
	name: string;
	localUrl: string;
}

export function resolveLocalEndpoint(internalPath: string, method: ApiMethod = "GET"): ResolvedLocalEndpoint | null {
	const up = method.toUpperCase() as ApiMethod;
	for (const ep of LOCAL_ENDPOINT_ROUTES) {
		if (ep.method !== up) continue;
		const m = internalPath.match(ep.internalPattern);
		if (m) return { name: ep.name, localUrl: ep.buildLocalUrl(m) };
	}
	return null;
}
