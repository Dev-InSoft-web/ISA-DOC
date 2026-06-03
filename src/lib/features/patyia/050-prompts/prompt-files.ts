/** Catálogo de 13 instrucciones por tipo (archivos PROMPT_<TIPO>.md). */
export const PATY_PROMPT_TIPOS = [
	"SALUDO_OTRO",
	"FUERA_DE_ALCANCE_TECNICO",
	"SOLICITUD_NO_PERMITIDA",
	"REQUIERE_CONTEXTO",
	"PASO_A_PASO",
	"INTERPRETACION_RESULTADO",
	"CONSULTA_NORMATIVA_NEGOCIO",
	"ASESORIA_PERSONALIZADA",
	"ERROR_TECNICO",
	"ERROR_CONFIGURACION",
	"ERROR_ACCESO",
	"ERROR_DIAN",
	"COMERCIAL",
] as const;

export type PatyPromptTipo = (typeof PATY_PROMPT_TIPOS)[number];

export function promptMdFilename(tipo: string): string {
	return `PROMPT_${tipo}.md`;
}

export function promptBaseRel(tipo: string): string {
	return `050-prompts/catalog/${promptMdFilename(tipo)}`;
}

export function promptUltraRel(tipo: string): string {
	return `050-prompts/catalog/Ultra/${promptMdFilename(tipo)}`;
}

/** Wenyan aún usa nombres numerados en wenyan-ultra/ */
export const WENYAN_LEGACY_BY_TIPO: Record<PatyPromptTipo, string> = {
	SALUDO_OTRO: "01-saludo-otro.md",
	FUERA_DE_ALCANCE_TECNICO: "02-fuera-de-alcance-tecnico.md",
	SOLICITUD_NO_PERMITIDA: "03-solicitud-no-permitida.md",
	REQUIERE_CONTEXTO: "04-requiere-contexto.md",
	PASO_A_PASO: "05-paso-a-paso.md",
	INTERPRETACION_RESULTADO: "06-interpretacion-resultado.md",
	CONSULTA_NORMATIVA_NEGOCIO: "07-consulta-normativa-negocio.md",
	ASESORIA_PERSONALIZADA: "08-asesoria-personalizada.md",
	ERROR_TECNICO: "09-error-tecnico.md",
	ERROR_CONFIGURACION: "10-error-configuracion.md",
	ERROR_ACCESO: "11-error-acceso.md",
	ERROR_DIAN: "12-error-dian.md",
	COMERCIAL: "13-comercial.md",
};
