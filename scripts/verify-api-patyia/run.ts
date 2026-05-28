/**
 * Cadena de pruebas PatyIA · AyudasCP-IA.
 *
 * Endpoints expuestos por el Function App PatyIA (carpeta `clientesis/patyia` del
 * monorepo backend). Se cubre cada uno al menos una vez:
 *
 *   1. POST   /api/JWT                                (sólo si no hay token cargado)
 *   2. POST   /api/conversacion                       (captura iconversacion)
 *   3. GET    /api/conversaciones
 *   4. GET    /api/conversacion/:iconversacion
 *   5. GET    /api/resumen_conversacion/:iconversacion
 *   6. POST   /api/mensaje
 *   7. POST   /api/tiquete                            (captura itiquete)
 *   8. GET    /api/tiquete/:itiquete
 *   9. GET    /api/tiquete/por-conversacion/:iconversacion
 *  10. PATCH  /api/tiquete
 *  11. GET    /api/timer_cerrarConversaciones
 *  12. DELETE /api/tiquete/:itiquete                  (cleanup)
 *  13. DELETE /api/conversacion/:iconversacion        (cleanup)
 *
 * Datos de prueba seguros: usan IDs y códigos artificiales muy altos / con prefijo
 * verify para no chocar con datos reales (mismo criterio que clientesis con
 * `IDRIVER_TEST=200`, `CURSOTEST`, etc.).
 */
import {
	baseUrl,
	butilTest,
	codigoTkTest,
	contenidoTest,
	controlKey,
	envName,
	iApp,
	iconversacionOverride,
	idMaquina,
	imoduloTest,
	ireferenciaTest,
	itiqueteOverride,
	promptTest,
} from "./config.ts";
import { extractRespuesta, loadToken, request, type HttpResult } from "./http.ts";
import { state } from "./state.ts";

function header(title: string): void {
	const line = "═".repeat(Math.max(20, title.length + 4));
	console.log(`\n${line}\n  ${title}\n${line}`);
}

function step(label: string, r: HttpResult, expected: number | number[] = 200): boolean {
	const expectedList = Array.isArray(expected) ? expected : [expected];
	const ok = expectedList.includes(r.status);
	const icon = ok ? "✅" : "❌";
	console.log(`${icon} [${label}] HTTP ${r.status}${r.error ? ` · err=${r.error}` : ""}`);
	const preview = JSON.stringify(r.data).slice(0, 600);
	console.log(`   payload: ${preview}${preview.length >= 600 ? "…" : ""}`);
	if (ok) state.ok++;
	else state.fail++;

	return ok;
}

async function ensureToken(): Promise<boolean> {
	header("1) POST /api/JWT  (autenticación)");
	if (loadToken()) return true;
	console.log("→ Sin token preexistente; intento POST /api/JWT");
	const jwt = await request("POST", "/api/JWT", { controlkey: controlKey, iapp: iApp, idmaquina: idMaquina });
	step("JWT", jwt);
	const resp = extractRespuesta<{ token?: string }>(jwt.data);
	if (resp?.token) {
		state.token = resp.token;
		console.log(`   token capturado (${resp.token.length} chars)`);
		return true;
	}
	console.error("⛔ No fue posible obtener un token. La cadena no puede continuar.");
	console.error("   Tips:");
	console.error("    · Defina PATYIA_TOKEN=<jwt-valido-para-patyia-local>");
	console.error("    · O cree token.patyia.json en la raíz del proyecto");

	return false;
}

function extractIconversacionFromSse(data: unknown): number | undefined {
	if (!data || typeof data !== "object") return;
	const raw = (data as { raw?: unknown }).raw;
	if (typeof raw !== "string") return;
	for (const line of raw.split(/\r?\n/)) {
		if (!line.startsWith("data:")) continue;
		const json = line.slice(5).trim();
		if (!json) continue;
		try {
			const obj = JSON.parse(json) as { iconversacion?: unknown };
			if (typeof obj.iconversacion === "number") return obj.iconversacion;
		} catch { /* siguiente evento */ }
	}
}

async function createConversacion(): Promise<void> {
	header("2) POST /api/conversacion");
	const r = await request("POST", "/api/conversacion", {
		prompt: promptTest,
		imodulo: imoduloTest,
	});
	step("conversacion.create", r, [200, 201]);
	const resp = extractRespuesta<{ iconversacion?: number }>(r.data);
	const iconv = resp?.iconversacion ?? extractIconversacionFromSse(r.data);
	if (iconv != null) {
		state.iconversacion = iconv;
		state.iconversacionOwned = true;
		console.log(`   iconversacion=${state.iconversacion} (creada por el script → será eliminada en cleanup)`);
	} else if (iconversacionOverride) {
		state.iconversacion = Number.parseInt(iconversacionOverride, 10);
		state.iconversacionOwned = false;
		console.log(`   iconversacion=${state.iconversacion} (override env PATYIA_ICONVERSACION; prestada → solo lecturas)`);
	} else {
		console.error("⛔ Sin iconversacion propia; se intentará tomar prestada una de /api/conversaciones para los GET.");
	}
}

async function listConversaciones(): Promise<void> {
	header("3) GET /api/conversaciones");
	const r = await request("GET", "/api/conversaciones");
	step("conversaciones.list", r);
	if (state.iconversacion != null) return;
	const resp = extractRespuesta<{ conversaciones?: Array<{ iconversacion?: number }> }>(r.data);
	const first = resp?.conversaciones?.[0];
	if (first?.iconversacion != null) {
		state.iconversacion = first.iconversacion;
		state.iconversacionOwned = false;
		console.log(`   iconversacion=${state.iconversacion} (prestada del listado → solo lecturas, no se borra)`);
	}
}

async function getConversacion(): Promise<void> {
	if (state.iconversacion == null) return;
	header(`4) GET /api/conversacion/${state.iconversacion}`);
	step("conversacion.get", await request("GET", `/api/conversacion/${state.iconversacion}`));
}

async function getResumen(): Promise<void> {
	if (state.iconversacion == null) return;
	header(`5) GET /api/resumen_conversacion/${state.iconversacion}`);
	step("resumen_conversacion", await request("GET", `/api/resumen_conversacion/${state.iconversacion}`));
}

async function postMensaje(): Promise<void> {
	if (state.iconversacion == null) return;
	if (!state.iconversacionOwned) { console.log("⏭ [mensaje.create] omitido (iconversacion prestada, sin DELETE disponible para limpiar)"); return; }
	header("6) POST /api/mensaje");
	step("mensaje.create", await request("POST", "/api/mensaje", {
		iconversacion: state.iconversacion,
		butil: butilTest,
		contenido: contenidoTest,
		ireferencia: ireferenciaTest,
	}), [200, 201]);
}

async function createTiquete(): Promise<void> {
	if (state.iconversacion == null) return;
	header("7) POST /api/tiquete");
	if (!state.iconversacionOwned) {
		console.log(`   iconversacion=${state.iconversacion} prestada → se crea tiquete test (codigotk=${codigoTkTest}) y se elimina en cleanup`);
	}
	const r = await request("POST", "/api/tiquete", {
		iconversacion: state.iconversacion,
		codigotk: codigoTkTest,
		bcerrar_conversacion: false,
		bautoriza_visualizacion: false,
	});
	step("tiquete.create", r, [200, 201]);
	const resp = extractRespuesta<{ itiquete?: number }>(r.data);
	if (resp?.itiquete != null) {
		state.itiquete = resp.itiquete;
		state.itiqueteOwned = true;
		console.log(`   itiquete=${state.itiquete} (creado por el script → será eliminado en cleanup)`);
	} else if (itiqueteOverride) {
		state.itiquete = Number.parseInt(itiqueteOverride, 10);
		state.itiqueteOwned = false;
		console.log(`   itiquete (override env) = ${state.itiquete}`);
	}
}

async function getTiquete(): Promise<void> {
	if (state.itiquete == null) return;
	header(`8) GET /api/tiquete/${state.itiquete}`);
	step("tiquete.get", await request("GET", `/api/tiquete/${state.itiquete}`));
}

async function getTiquetePorConversacion(): Promise<void> {
	if (state.iconversacion == null) return;
	header(`9) GET /api/tiquete/por-conversacion/${state.iconversacion}`);
	step("tiquete.porConversacion", await request("GET", `/api/tiquete/por-conversacion/${state.iconversacion}`));
}

async function patchTiquete(): Promise<void> {
	if (state.itiquete == null) return;
	if (!state.itiqueteOwned) { console.log("⏭ [tiquete.patch] omitido (itiquete prestado, no se modifican datos reales)"); return; }
	header("10) PATCH /api/tiquete");
	step("tiquete.patch", await request("PATCH", "/api/tiquete", {
		itiquete: state.itiquete,
		bautoriza_visualizacion: true,
	}));
}

async function timerCerrar(): Promise<void> {
	header("11) GET /api/timer_cerrarConversaciones");
	step("timer_cerrarConversaciones", await request("GET", "/api/timer_cerrarConversaciones"));
}

async function cleanup(): Promise<void> {
	header("CLEANUP");
	if (state.itiquete != null && state.itiqueteOwned) {
		console.log(`→ DELETE /api/tiquete/${state.itiquete}`);
		step("tiquete.delete", await request("DELETE", `/api/tiquete/${state.itiquete}`), [200, 204]);
	} else if (state.itiquete != null) {
		console.log(`⏭ [tiquete.delete] omitido (itiquete=${state.itiquete} prestado)`);
	}
	if (state.iconversacion != null && state.iconversacionOwned) {
		console.log(`→ DELETE /api/conversacion/${state.iconversacion}`);
		step("conversacion.delete", await request("DELETE", `/api/conversacion/${state.iconversacion}`), [200, 204]);
	} else if (state.iconversacion != null) {
		console.log(`⏭ [conversacion.delete] omitido (iconversacion=${state.iconversacion} prestada, no se borra data real)`);
	}
}

function summary(): void {
	header("RESUMEN");
	console.log(`OK:   ${state.ok}`);
	console.log(`FAIL: ${state.fail}`);
	if (state.fail > 0) process.exitCode = 1;
}

export async function runTests(logFile: string): Promise<void> {
	header(`PATYIA · VERIFY API · env=${envName}`);
	console.log(`Log:  ${logFile}`);
	console.log(`Host: ${baseUrl}`);
	console.log(`IDs:  butil=${butilTest} · ireferencia=${ireferenciaTest} · codigotk=${codigoTkTest}`);

	if (!(await ensureToken())) { summary(); return; }
	await createConversacion();
	await listConversaciones();
	await getConversacion();
	await getResumen();
	await postMensaje();
	await createTiquete();
	await getTiquete();
	await getTiquetePorConversacion();
	await patchTiquete();
	await timerCerrar();
	await cleanup();
	summary();
}
