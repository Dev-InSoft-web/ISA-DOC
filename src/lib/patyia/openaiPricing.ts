// Precios estimados USD por 1.000.000 de tokens (referencia pública OpenAI).
// Si el modelo no está mapeado, el costo retornado es null.
export interface PrecioModelo {
	inputPer1M: number;
	outputPer1M: number;
}

export const PRECIOS_TEXTO: Record<string, PrecioModelo> = {
	"gpt-4o-mini": { inputPer1M: 0.15, outputPer1M: 0.60 },
	"gpt-4o": { inputPer1M: 2.50, outputPer1M: 10.00 },
	"gpt-4.1": { inputPer1M: 2.00, outputPer1M: 8.00 },
	"gpt-4.1-mini": { inputPer1M: 0.40, outputPer1M: 1.60 },
};

// Imágenes: aproximación por tamaño/calidad. Cobro real OpenAI = tokens (input texto + output imagen).
// Usamos costos típicos por imagen 1024x1024 calidad media (estimado).
export const PRECIOS_IMAGEN: Record<string, number> = {
	"gpt-image-1-mini": 0.011,
	"gpt-image-1.5": 0.025,
	"gpt-image-2": 0.042,
	"gpt-image-1": 0.042,
};

export interface UsageTexto {
	prompt_tokens?: number;
	completion_tokens?: number;
	total_tokens?: number;
}

export interface CostoTexto {
	inputUsd: number;
	outputUsd: number;
	totalUsd: number;
}

export function calcularCostoTexto(model: string, usage: UsageTexto | null | undefined): CostoTexto | null {
	if (!usage) return null;
	const precio = PRECIOS_TEXTO[model];
	if (!precio) return null;
	const inp = Number(usage.prompt_tokens) || 0;
	const out = Number(usage.completion_tokens) || 0;
	const inputUsd = (inp / 1_000_000) * precio.inputPer1M;
	const outputUsd = (out / 1_000_000) * precio.outputPer1M;
	return { inputUsd, outputUsd, totalUsd: inputUsd + outputUsd };
}

export function calcularCostoImagen(model: string, n: number): number | null {
	const precio = PRECIOS_IMAGEN[model];
	if (precio == null) return null;
	return precio * Math.max(1, n);
}

export function formatearUsd(v: number | null | undefined): string {
	if (v == null || !Number.isFinite(v)) return "—";
	if (v < 0.001) return `$${v.toExponential(2)}`;
	if (v < 1) return `$${v.toFixed(4)}`;
	return `$${v.toFixed(3)}`;
}
