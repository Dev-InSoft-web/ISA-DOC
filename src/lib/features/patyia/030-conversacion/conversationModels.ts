import pricingRows from "../040-openai/openai-models-pricing.json";
import systemPromptsDefaults from "../010-config/system-prompts-defaults.json";

export type PricingRow = {
	familia: string;
	modelo: string;
	costoEntrada: string;
	costoSalida: string;
};

const rows = pricingRows as PricingRow[];

const FECHA_SNAPSHOT = /-\d{4}-\d{2}-\d{2}$/;

const modeloConversacionCfg = String(
	(systemPromptsDefaults as { modeloConversacion?: string }).modeloConversacion ?? "",
).trim();

function parseCost(s: string): number {
	const m = s.match(/\$(\d+(?:\.\d+)?)/);
	return m ? parseFloat(m[1]) : 0;
}

export function promedioCosto1M(row: PricingRow): number | null {
	const inCost = parseCost(row.costoEntrada);
	const outCost = parseCost(row.costoSalida);
	if (!inCost && !outCost) return null;
	return (inCost + outCost) / 2;
}

function fmtPromedioUsd(v: number | null): string {
	if (v == null || !Number.isFinite(v)) return "—";
	if (v < 1) return `$${v.toFixed(3)}`;
	return `$${v.toFixed(2)}`;
}

function incluirModeloApi(modelo: string): boolean {
	if (!/^gpt-[45]/.test(modelo)) return false;
	if (/chat-latest/i.test(modelo)) return false;
	if (FECHA_SNAPSHOT.test(modelo)) return false;
	return true;
}

const byModelo = new Map(rows.map((r) => [r.modelo, r]));

export const MODELOS_GPT_4_5 = rows
	.filter((r) => incluirModeloApi(r.modelo))
	.map((r) => r.modelo) as readonly string[];

const valoresCatalogo = new Set<string>(MODELOS_GPT_4_5);

export type ModeloConversacionId = (typeof MODELOS_GPT_4_5)[number];

export const MODELO_CONVERSACION_DEFAULT: string =
	modeloConversacionCfg && valoresCatalogo.has(modeloConversacionCfg)
		? modeloConversacionCfg
		: valoresCatalogo.has("gpt-5-nano")
			? "gpt-5-nano"
			: (MODELOS_GPT_4_5[0] ?? "gpt-5-nano");

export function normalizarModeloConversacion(stored: string | null | undefined): string {
	const m = (stored ?? "").trim();
	if (m && valoresCatalogo.has(m)) return m;
	const sinFecha = m.replace(FECHA_SNAPSHOT, "");
	if (sinFecha && valoresCatalogo.has(sinFecha)) return sinFecha;
	return MODELO_CONVERSACION_DEFAULT;
}

export function labelModeloConversacion(modelId: string): string {
	const row = byModelo.get(modelId);
	const prom = row ? promedioCosto1M(row) : null;
	const promTxt = fmtPromedioUsd(prom);
	return prom != null ? `${modelId} · ${promTxt}` : modelId;
}

export const TModeloConversacion: Record<string, string> = Object.fromEntries(
	MODELOS_GPT_4_5.map((m) => [labelModeloConversacion(m), m]),
);
