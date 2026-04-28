import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const agentRoot = path.join(__dirname, "..");

export const baseUrl = process.env.VERIFY_API_BASE_URL || "http://localhost:20040";

/** Por defecto reutiliza el token que vive en doc/test/token.json (un nivel arriba de ISA). */
export const tokenFile =
	process.env.VERIFY_API_TOKEN_FILE ||
	path.resolve(__dirname, "..", "..", "..", "test", "token.json");

export const requestMaxRetries = Math.max(
	0,
	Number.parseInt(process.env.VERIFY_API_REQUEST_RETRIES ?? "5", 10) || 0,
);
export const requestRetryBaseDelayMs = Math.max(
	50,
	Number.parseInt(process.env.VERIFY_API_REQUEST_RETRY_DELAY_MS ?? "350", 10) || 350,
);
export const listExtraRetries = Math.max(
	0,
	Number.parseInt(process.env.VERIFY_API_LIST_EXTRA_RETRIES ?? "3", 10) || 0,
);
