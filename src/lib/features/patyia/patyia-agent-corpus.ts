import type { PatyPromptTipo } from "./050-prompts/prompt-files";

/** Corpus RAG por tipo (alineado con lab-langgraph agents/config). */
export const PATY_AGENT_RAG_CORPUS: Partial<Record<PatyPromptTipo, string[]>> = {
	PASO_A_PASO: ["contapyme"],
	INTERPRETACION_RESULTADO: ["contapyme"],
	CONSULTA_NORMATIVA_NEGOCIO: ["dian", "minhacienda", "legal", "supersociedades"],
	ERROR_DIAN: ["dian", "contapyme"],
	ERROR_CONFIGURACION: ["contapyme"],
	ERROR_TECNICO: ["contapyme"],
	ERROR_ACCESO: ["contapyme"],
	ASESORIA_PERSONALIZADA: ["contapyme"],
	COMERCIAL: [],
	SALUDO_OTRO: [],
	REQUIERE_CONTEXTO: ["contapyme"],
	SOLICITUD_NO_PERMITIDA: [],
	FUERA_DE_ALCANCE_TECNICO: [],
};
