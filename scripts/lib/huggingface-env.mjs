/**
 * Carga `.env` de la raíz de ISA-DOC y expone el token de Hugging Face.
 */
import { config as loadDotenv } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

loadDotenv({ path: path.join(ROOT, ".env") });

/** @returns {string} */
export function getHuggingfaceApiKey() {
	const key = (process.env.HUGGINGFACE_API_KEY ?? process.env.HF_TOKEN ?? "").trim();
	if (!key) {
		throw new Error(
			"Falta HUGGINGFACE_API_KEY en .env (copia .env.example). " +
				"Crea un token fine-grained en https://huggingface.co/settings/tokens/new?tokenType=fineGrained",
		);
	}
	return key;
}

export const HF_ROOT = ROOT;
