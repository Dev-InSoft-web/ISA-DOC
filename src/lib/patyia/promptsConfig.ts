import { join } from "node:path";
import { STORAGE_ROOT, leerJson, escribirJson, ensureDir } from "./storage.ts";

export interface PromptEntry {
	label: string;
	description: string;
	model: string;
}

export interface PromptsConfig {
	updated: string;
	prompts: Record<string, PromptEntry>;
}

export const PROMPTS_CONFIG_PATH = join(STORAGE_ROOT, "prompts-config.json");

const DEFAULTS: PromptsConfig = {
	updated: "",
	prompts: {
		PR_TIPO_CONSULTAS: {
			label: "Tipo de consulta",
			description: "Clasifica si la consulta del usuario es funcional, conversacional o fuera de alcance.",
			model: "",
		},
		PR_GENERAL: {
			label: "General",
			description: "Prompt base para respuestas generales del asistente.",
			model: "",
		},
		PR_EXTRACTOR_CONSULTAS: {
			label: "Extractor de consultas",
			description: "Extrae estructura/intent de la consulta funcional.",
			model: "",
		},
		PR_CLASIFICADOR_MODULO: {
			label: "Clasificador de módulo",
			description: "Asigna etiquetas / módulo al mensaje del usuario.",
			model: "",
		},
	},
};

const KEY_RE = /^[A-Z][A-Z0-9_]{0,63}$/;

export function validarKey(key: string): boolean {
	return KEY_RE.test(key);
}

interface LegacyEntry { label?: string; description?: string; model?: string; id?: string; version?: string }

function normalizar(raw: LegacyEntry | undefined, key: string): PromptEntry {
	return {
		label: String(raw?.label ?? key).trim(),
		description: String(raw?.description ?? "").trim(),
		model: String(raw?.model ?? "").trim(),
	};
}

export async function leerPromptsConfig(): Promise<PromptsConfig> {
	await ensureDir(STORAGE_ROOT);
	const actual = await leerJson<{ updated?: string; prompts?: Record<string, LegacyEntry> } | null>(PROMPTS_CONFIG_PATH, null);
	if (actual && actual.prompts && typeof actual.prompts === "object") {
		const cfg: PromptsConfig = { updated: actual.updated ?? "", prompts: {} };
		let cambio = false;
		for (const [k, v] of Object.entries(actual.prompts)) {
			cfg.prompts[k] = normalizar(v, k);
			if (v && ("id" in v || "version" in v)) cambio = true;
		}
		for (const [k, v] of Object.entries(DEFAULTS.prompts)) {
			if (!cfg.prompts[k]) { cfg.prompts[k] = v; cambio = true; }
		}
		if (cambio) {
			cfg.updated = new Date().toISOString();
			await escribirJson(PROMPTS_CONFIG_PATH, cfg);
		}
		return cfg;
	}
	const seed: PromptsConfig = { updated: new Date().toISOString(), prompts: { ...DEFAULTS.prompts } };
	await escribirJson(PROMPTS_CONFIG_PATH, seed);
	return seed;
}

export async function escribirPromptsConfig(cfg: PromptsConfig): Promise<void> {
	cfg.updated = new Date().toISOString();
	await escribirJson(PROMPTS_CONFIG_PATH, cfg);
}

export async function obtenerPrompt(key: string): Promise<PromptEntry | null> {
	const cfg = await leerPromptsConfig();
	return cfg.prompts[key] ?? null;
}
