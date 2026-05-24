/**
 * Cadena de pruebas PatyIA · AyudasCP-IA.
 *
 * Orden:
 *   1. POST /api/JWT          (captura `token`)
 *   2. POST /api/conversacion (captura `iconversacion`)
 *   3. GET  /api/conversaciones
 *   4. GET  /api/conversacion/:i
 *   5. GET  /api/resumen_conversacion/:i
 *   6. POST /api/mensaje
 *   7. POST /api/tiquete
 *   8. GET  /api/timer_cerrarConversaciones
 *   9. DELETE /api/conversacion/:i
 *
 * Variables de entorno relevantes:
 *   - VERIFY_API_BASE_URL: host PatyIA (default `http://localhost:7071`).
 *   - VERIFY_API_ENV: nombre del env activo (informativo).
 *   - PATYIA_CONTROLKEY: clave para el JWT (default `5130489773`).
 *   - PATYIA_IAPP: id de aplicación para el JWT (default `20104`).
 *   - PATYIA_IDMAQUINA: id de máquina para el JWT (default `WebPortalTest`).
 *   - PATYIA_BUTIL: butil del mensaje de prueba (default `0`).
 *   - PATYIA_CODIGOTK: código del tiquete de prueba (default `TKAPIVERIFY`).
 */

const BASE_URL = process.env.VERIFY_API_BASE_URL || "http://localhost:7071";
const ENV_NAME = process.env.VERIFY_API_ENV || "local";
const CONTROLKEY = process.env.PATYIA_CONTROLKEY || "5130489773";
const IAPP = Number.parseInt(process.env.PATYIA_IAPP || "20104", 10);
const IDMAQUINA = process.env.PATYIA_IDMAQUINA || "WebPortalTest";
const BUTIL = Number.parseInt(process.env.PATYIA_BUTIL || "0", 10);
const CODIGOTK = process.env.PATYIA_CODIGOTK || "TKAPIVERIFY";

interface HttpResult {
	status: number;
	data: unknown;
	error?: string;
}

interface State {
	token: string;
	iconversacion: number | null;
	ok: number;
	fail: number;
}

const state: State = { token: "", iconversacion: null, ok: 0, fail: 0 };

async function http(method: string, pathSegment: string, body: unknown = null): Promise<HttpResult> {
	const headers: Record<string, string> = { "Content-Type": "application/json" };
	if (state.token) headers.Authorization = `Bearer ${state.token}`;
	const url = `${BASE_URL}${pathSegment}`;
	const opts: RequestInit = { method, headers };
	if (body !== null && body !== undefined) opts.body = JSON.stringify(body);
	try {
		const res = await fetch(url, opts);
		const text = await res.text();
		let data: unknown = {};
		try { data = JSON.parse(text); } catch { data = { raw: text }; }
		return { status: res.status, data };
	} catch (err) {
		return { status: 0, data: {}, error: (err as Error).message };
	}
}

function header(title: string): void {
	const line = "═".repeat(Math.max(20, title.length + 4));
	console.log(`\n${line}\n  ${title}\n${line}`);
}

function reportStep(label: string, r: HttpResult, expectedStatus = 200): boolean {
	const ok = r.status === expectedStatus;
	const icon = ok ? "✅" : "❌";
	console.log(`${icon} [${label}] HTTP ${r.status}${r.error ? ` · err=${r.error}` : ""}`);
	const preview = JSON.stringify(r.data).slice(0, 600);
	console.log(`   payload: ${preview}${preview.length >= 600 ? "…" : ""}`);
	if (ok) state.ok++;
	else state.fail++;

	return ok;
}

function extractRespuesta<T = Record<string, unknown>>(data: unknown): T | null {
	if (!data || typeof data !== "object") return null;
	const d = data as Record<string, unknown>;
	if (d.respuesta && typeof d.respuesta === "object") return d.respuesta as T;

	return d as T;
}

export async function runTests(logFile: string): Promise<void> {
	header(`PATYIA · VERIFY API · env=${ENV_NAME}`);
	console.log(`Log: ${logFile}`);
	console.log(`Host: ${BASE_URL}`);

	header("1) POST /api/JWT");
	const jwt = await http("POST", "/api/JWT", { controlkey: CONTROLKEY, iapp: IAPP, idmaquina: IDMAQUINA });
	reportStep("JWT", jwt);
	const respJwt = extractRespuesta<{ token?: string }>(jwt.data);
	if (respJwt?.token) {
		state.token = respJwt.token;
		console.log(`   token capturado (${state.token.length} chars)`);
	} else {
		console.error("⛔ Sin token en respuesta; aborto cadena.");
		summary();
		return;
	}

	header("2) POST /api/conversacion");
	const conv = await http("POST", "/api/conversacion", {});
	reportStep("conversacion.create", conv);
	const respConv = extractRespuesta<{ iconversacion?: number }>(conv.data);
	if (respConv?.iconversacion != null) {
		state.iconversacion = respConv.iconversacion;
		console.log(`   iconversacion=${state.iconversacion}`);
	} else {
		console.error("⛔ Sin iconversacion; salto pasos dependientes.");
	}

	header("3) GET /api/conversaciones");
	reportStep("conversaciones.list", await http("GET", "/api/conversaciones"));

	if (state.iconversacion != null) {
		header(`4) GET /api/conversacion/${state.iconversacion}`);
		reportStep("conversacion.get", await http("GET", `/api/conversacion/${state.iconversacion}`));

		header(`5) GET /api/resumen_conversacion/${state.iconversacion}`);
		reportStep("resumen_conversacion", await http("GET", `/api/resumen_conversacion/${state.iconversacion}`));

		header("6) POST /api/mensaje");
		reportStep("mensaje.create", await http("POST", "/api/mensaje", {
			iconversacion: state.iconversacion,
			butil: BUTIL,
			contenido: "Mensaje de prueba verify-api-patyia",
			ireferencia: 0,
		}));

		header("7) POST /api/tiquete");
		reportStep("tiquete.create", await http("POST", "/api/tiquete", {
			iconversacion: state.iconversacion,
			codigotk: CODIGOTK,
			bcerrar_conversacion: 0,
			bautoriza_visualizacion: 1,
		}));
	}

	header("8) GET /api/timer_cerrarConversaciones");
	reportStep("timer_cerrarConversaciones", await http("GET", "/api/timer_cerrarConversaciones"));

	if (state.iconversacion != null) {
		header(`9) DELETE /api/conversacion/${state.iconversacion}`);
		reportStep("conversacion.delete", await http("DELETE", `/api/conversacion/${state.iconversacion}`));
	}

	summary();
}

function summary(): void {
	header("RESUMEN");
	console.log(`OK:   ${state.ok}`);
	console.log(`FAIL: ${state.fail}`);
	if (state.fail > 0) process.exitCode = 1;
}
