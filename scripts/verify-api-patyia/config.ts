import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const scriptRoot = __dirname;
export const isaRoot = path.resolve(__dirname, "..", "..");

export const baseUrl = process.env.VERIFY_API_BASE_URL || "http://localhost:7071";
export const envName = process.env.VERIFY_API_ENV || "local";

/**
 * Token JWT para autorizar. Búsqueda en orden:
 *   1. process.env.PATYIA_TOKEN
 *   2. process.env.VERIFY_API_TOKEN
 *   3. process.env.VERIFY_API_TOKEN_FILE (ruta absoluta a un JSON `{ "token": "…" }`)
 *   4. <isaRoot>/token.json
 *   5. <isaRoot>/../test/token.json   (hermano del repo, igual que clientesis)
 *   6. <isaRoot>/../../test/token.json
 */
export const tokenFileCandidates: string[] = [
	process.env.VERIFY_API_TOKEN_FILE || "",
	path.join(isaRoot, "token.json"),
	path.resolve(isaRoot, "..", "test", "token.json"),
	path.resolve(isaRoot, "..", "..", "test", "token.json"),
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
export const butilTest = Number.parseInt(process.env.PATYIA_BUTIL || "999991", 10);
export const ireferenciaTest = Number.parseInt(process.env.PATYIA_IREFERENCIA || "999992", 10);
export const codigoTkTest = process.env.PATYIA_CODIGOTK || "TKVERIFY999991";
export const itiqueteOverride = process.env.PATYIA_ITIQUETE || "";
export const contenidoTest = process.env.PATYIA_CONTENIDO || "[verify-api-patyia] mensaje de prueba (id seguro 999991)";

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
