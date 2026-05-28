import { join } from "node:path";
import { STORAGE_ROOT, leerJson, escribirJson, ensureDir } from "./storage.ts";

export interface PromptEntry {
	id: string;
	version: string;
	label: string;
	description: string;
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
			id: "pmpt_69d8183f4b6c819090dca9d58280a6080f84a082bf409a6c",
			version: "",
			label: "Tipo de consulta",
			description: "Clasifica si la consulta del usuario es funcional, conversacional o fuera de alcance.",
		},
		PR_GENERAL: {
			id: "pmpt_69f9f701508c81978d82393f74030eac0fc02a771228ab14",
			version: "",
			label: "General",
			description: "Prompt base para respuestas generales del asistente.",
		},
		PR_EXTRACTOR_CONSULTAS: {
			id: "pmpt_69f9fe11dc908195ac5a1642db4408a80b866761126003a4",
			version: "",
			label: "Extractor de consultas",
			description: "Extrae estructura/intent de la consulta funcional.",
		},
		PR_CLASIFICADOR_MODULO: {
			id: "pmpt_6a03a285eb8c819694379c42ee1a6f130346f936d6203eca",
			version: "2",
			label: "Clasificador de módulo",
			description: "Asigna etiquetas / módulo al mensaje del usuario.",
		},
	},
};

const KEY_RE = /^[A-Z][A-Z0-9_]{0,63}$/;
const PMPT_RE = /^pmpt_[A-Za-z0-9]+$/;

export function validarKey(key: string): boolean {
	return KEY_RE.test(key);
}

export function validarPmptId(id: string): boolean {
	return PMPT_RE.test(id);
}

export async function leerPromptsConfig(): Promise<PromptsConfig> {
	await ensureDir(STORAGE_ROOT);
	const actual = await leerJson<PromptsConfig | null>(PROMPTS_CONFIG_PATH, null);
	if (actual && actual.prompts && typeof actual.prompts === "object") {
		// merge defaults: agrega entradas faltantes sin pisar las existentes
		let cambio = false;
		for (const [k, v] of Object.entries(DEFAULTS.prompts)) {
			if (!actual.prompts[k]) { actual.prompts[k] = v; cambio = true; }
		}
		if (cambio) {
			actual.updated = new Date().toISOString();
			await escribirJson(PROMPTS_CONFIG_PATH, actual);
		}
		return actual;
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
