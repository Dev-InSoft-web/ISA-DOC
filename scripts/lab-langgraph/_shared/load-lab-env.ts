import { existsSync } from "node:fs";
import { config as loadDotenv } from "dotenv";
import { join } from "node:path";
import { ISA_DOC_ROOT } from "./isa-doc-root.ts";

let loaded = false;

const PROVIDER_KEY_PREFIXES = [
	"GROQ_",
	"CEREBRAS_",
	"GEMINI_",
	"MINIMAX_",
	"HUGGINGFACE_",
	"OPENAI_",
	"paty_groq",
	"paty_openai",
	"paty_huggingface",
];

function stripProviderKeysFromEnv(): void {
	for (const key of Object.keys(process.env)) {
		if (
			PROVIDER_KEY_PREFIXES.some((p) => key.startsWith(p) || key.includes(p)) ||
			key === "OPENAI_API_KEY"
		) {
			delete process.env[key];
		}
	}
}

/**
 * ISA-DOC: solo URL del servidor lab. Las API keys no deben quedar en process.env.
 */
export function loadLabEnv(): void {
	if (loaded) return;
	const clientEnv = join(ISA_DOC_ROOT, "secrets/patyia/lab-client.env");
	if (existsSync(clientEnv)) {
		loadDotenv({ path: clientEnv, override: true });
	}
	stripProviderKeysFromEnv();
	loaded = true;
}
