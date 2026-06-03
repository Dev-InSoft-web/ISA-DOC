// Precios estimados USD por 1.000.000 de tokens (referencia pública OpenAI).
// Fuente principal: https://openai.com/api/pricing/  (vigencia revisada 2026-05).
// Si el modelo no está mapeado, el costo retornado es null.

export interface PrecioModelo {
	inputPer1M: number;
	cachedInputPer1M?: number;
	outputPer1M: number;
	fuente: string;
	notas?: string;
}

const FUENTE_OFICIAL = "https://openai.com/api/pricing/";
const FUENTE_DEV_DOCS = "https://developers.openai.com/api/docs/pricing";

export const PRECIOS_TEXTO: Record<string, PrecioModelo> = {
	"gpt-5.5": { inputPer1M: 5.00, cachedInputPer1M: 0.50, outputPer1M: 30.00, fuente: FUENTE_OFICIAL, notas: "Modelo insignia para tareas complejas y multi-paso." },
	"gpt-5.4": { inputPer1M: 2.50, cachedInputPer1M: 0.25, outputPer1M: 15.00, fuente: FUENTE_OFICIAL, notas: "Modelo balanceado costo/calidad." },
	"gpt-5.4-mini": { inputPer1M: 0.75, cachedInputPer1M: 0.075, outputPer1M: 4.50, fuente: FUENTE_OFICIAL, notas: "Mini más potente para programación y subagentes." },
	"gpt-4o-mini": { inputPer1M: 0.15, outputPer1M: 0.60, fuente: FUENTE_OFICIAL, notas: "Legacy multimodal económico (familia 4o)." },
	"gpt-4o": { inputPer1M: 2.50, outputPer1M: 10.00, fuente: FUENTE_OFICIAL, notas: "Legacy multimodal estándar (familia 4o)." },
	"gpt-4.1": { inputPer1M: 2.00, outputPer1M: 8.00, fuente: FUENTE_OFICIAL, notas: "Legacy 4.1." },
	"gpt-4.1-mini": { inputPer1M: 0.40, outputPer1M: 1.60, fuente: FUENTE_OFICIAL, notas: "Legacy 4.1 mini." },
};

export interface PrecioImagen {
	porImagen?: number;
	notas: string;
	fuente: string;
}

// GPT-Image-2: cobro real por tokens (texto $5/1M, imagen $30/1M).
// Estimaciones por imagen 1024x1024 calidad media son aproximadas.
// Para modelos legacy gpt-image-1* el precio se asume plano por imagen.
export const PRECIOS_IMAGEN: Record<string, PrecioImagen> = {
	"gpt-image-2": { porImagen: 0.042, fuente: FUENTE_OFICIAL, notas: "Cobro real por tokens (texto $5/1M + imagen $30/1M). 1024x1024 media ≈ $0.04." },
	"gpt-image-1.5": { porImagen: 0.025, fuente: FUENTE_DEV_DOCS, notas: "Estimado promedio por imagen 1024x1024 calidad media." },
	"gpt-image-1": { porImagen: 0.042, fuente: FUENTE_DEV_DOCS, notas: "Legacy. 1024x1024 calidad alta ≈ $0.042." },
	"gpt-image-1-mini": { porImagen: 0.011, fuente: FUENTE_DEV_DOCS, notas: "Variante económica para batch." },
};

export interface UsageTexto {
	prompt_tokens?: number;
	completion_tokens?: number;
	total_tokens?: number;
	cached_tokens?: number;
}

export interface CostoTexto {
	inputUsd: number;
	outputUsd: number;
	totalUsd: number;
}

export function calcularCostoTexto(model: string, usage: UsageTexto | null | undefined): CostoTexto | null {
	if (!usage) return null;
	const precio = PRECIOS_TEXTO[model] ?? PRECIOS_TEXTO[model.replace(/-\d{4}-\d{2}-\d{2}$/, "")];
	if (!precio) return null;
	const inp = Number(usage.prompt_tokens) || 0;
	const out = Number(usage.completion_tokens) || 0;
	const cached = Number(usage.cached_tokens) || 0;
	const inpFresh = Math.max(0, inp - cached);
	const inputUsd = (inpFresh / 1_000_000) * precio.inputPer1M + (cached / 1_000_000) * (precio.cachedInputPer1M ?? precio.inputPer1M);
	const outputUsd = (out / 1_000_000) * precio.outputPer1M;
	return { inputUsd, outputUsd, totalUsd: inputUsd + outputUsd };
}

export function calcularCostoImagen(model: string, n: number): number | null {
	const precio = PRECIOS_IMAGEN[model];
	if (precio?.porImagen == null) return null;
	return precio.porImagen * Math.max(1, n);
}

export function formatearUsd(v: number | null | undefined): string {
	if (v == null || !Number.isFinite(v)) return "—";
	if (v < 0.001) return `$${v.toExponential(2)}`;
	if (v < 1) return `$${v.toFixed(4)}`;
	return `$${v.toFixed(3)}`;
}

export interface FilaPricingTexto {
	modelo: string;
	inputPer1M: number;
	cachedInputPer1M: number | null;
	outputPer1M: number;
	fuente: string;
	notas: string;
}

export interface FilaPricingImagen {
	modelo: string;
	porImagen: number | null;
	fuente: string;
	notas: string;
}

export function filasPricingTexto(): FilaPricingTexto[] {
	return Object.entries(PRECIOS_TEXTO).map(([modelo, p]) => ({
		modelo,
		inputPer1M: p.inputPer1M,
		cachedInputPer1M: p.cachedInputPer1M ?? null,
		outputPer1M: p.outputPer1M,
		fuente: p.fuente,
		notas: p.notas ?? "",
	}));
}

export function filasPricingImagen(): FilaPricingImagen[] {
	return Object.entries(PRECIOS_IMAGEN).map(([modelo, p]) => ({
		modelo,
		porImagen: p.porImagen ?? null,
		fuente: p.fuente,
		notas: p.notas,
	}));
}
