import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const scriptRoot = __dirname;
export const isaRoot = path.resolve(__dirname, "..", "..");

export const baseUrl = process.env.VERIFY_API_BASE_URL || "http://localhost:7071";
export const envName = process.env.VERIFY_API_ENV || "local";

/**
 * Token JWT específico para PatyIA. NO se comparte con clientesis (cada app
 * tiene su propio secreto de firma; un token de clientesis no es válido aquí).
 *
 * Búsqueda en orden:
 *   1. process.env.PATYIA_TOKEN
 *   2. process.env.PATYIA_TOKEN_FILE (ruta absoluta a JSON `{ "token": "…" }`)
 *   3. <isaRoot>/token.patyia.json
 */
export const tokenFileCandidates: string[] = [
	process.env.PATYIA_TOKEN_FILE || "",
	path.join(isaRoot, "token.patyia.json"),
].filter(Boolean);

/** Credenciales para /api/JWT cuando no haya token pre-emitido. */
export const controlKey = process.env.PATYIA_CONTROLKEY || "5130489773";
export const iApp = Number.parseInt(process.env.PATYIA_IAPP || "20104", 10);
export const idMaquina = process.env.PATYIA_IDMAQUINA || "WebPortalTest";

/**
 * IDs y patrones de prueba seguros: usan rangos muy altos / prefijos artificiales
 * para no chocar con datos reales (idéntico criterio que clientesis: IDRIVER_TEST=200,
 * ICURSO="CURSOTEST", iplanestudio="PE_APIVERIFY").
 */
export const butilTest = (process.env.PATYIA_BUTIL ?? "true").toLowerCase() !== "false";
export const ireferenciaTest = Number.parseInt(process.env.PATYIA_IREFERENCIA || "999992", 10);
export const codigoTkTest = process.env.PATYIA_CODIGOTK || "TKV999991";
export const itiqueteOverride = process.env.PATYIA_ITIQUETE || "";
export const iconversacionOverride = process.env.PATYIA_ICONVERSACION || "";
export const contenidoTest = process.env.PATYIA_CONTENIDO || "[verify-api-patyia] mensaje de prueba (id seguro 999991)";
export const promptTest = process.env.PATYIA_PROMPT || "[verify-api-patyia] ping de prueba — responde 'pong' y termina.";
export const imoduloTest = process.env.PATYIA_IMODULO || "nomina";

export const requestMaxRetries = Math.max(
	0,
	Number.parseInt(process.env.VERIFY_API_REQUEST_RETRIES ?? "3", 10) || 0,
);
export const requestRetryBaseDelayMs = Math.max(
	50,
	Number.parseInt(process.env.VERIFY_API_REQUEST_RETRY_DELAY_MS ?? "350", 10) || 350,
);

/** Si `true`, añade `___ignoreAuth___=true` para bypass de auth en local. */
export const useIgnoreAuth = (process.env.PATYIA_IGNORE_AUTH ?? "0") === "1";
