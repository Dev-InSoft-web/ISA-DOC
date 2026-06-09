// TK-1433179 — Análisis de imágenes en Paty IA V4.

import { getVisionReasoningMatrixHtml } from "../../../../../patyia/060-bitacora/share/vision-reasoning-matrix-html";
import { h3Iconized, note, noteList } from "../../../../lib/tk-helpers";

const intro =
	`<div>Se implementó y evaluó el <b>análisis de imágenes</b> en Paty IA (Responses API): ` +
	`estrategia de envío, <code>vision_detail</code> y <code>reasoning_effort</code> sobre infografía real.</div>`;

export async function buildBodyTK1433179(): Promise<string> {
	const [h3Conclusion, h3Parametros, h3Referencia] = await Promise.all([
		h3Iconized("mdi:check-decagram", "Conclusión y matrices"),
		h3Iconized("mdi:tune-variant", "Parámetros evaluados"),
		h3Iconized("mdi:book-open-outline", "Referencia"),
	]);

	const matriz = getVisionReasoningMatrixHtml();

	const parametros = noteList(
		await note(
			"mdi:image-multiple-outline",
			"<code>vision_strategy</code>: <code>auto</code> (umbral ~1,5 MB), <code>data_url</code> (inline), <code>file_upload</code> (Files API).",
		),
		await note(
			"mdi:aspect-ratio",
			"<code>vision_detail</code>: <code>low</code> → API <code>low</code>; <code>medium</code> → <code>auto</code>; <code>high</code> → <code>high</code>.",
		),
		await note(
			"mdi:brain",
			"<code>reasoning_effort</code>: <code>low</code> | <code>medium</code> | <code>high</code> (27 celdas por bloque = 3×3×3).",
		),
	);

	const referencia = noteList(
		await note(
			"mdi:file-document-outline",
			"Bitácora completa: <code>patyia/060-bitacora/daily/2026-06/09/01-vision-reasoning-estrategias.md</code>.",
		),
		await note(
			"mdi:console",
			"Reproducir: <code>node scripts/test-vision-reasoning-matrix.mjs</code> (PatyIA en <code>:7071</code>).",
		),
	);

	return intro + h3Conclusion + matriz + h3Parametros + parametros + h3Referencia + referencia;
}

export const bodyTK1433179: Promise<string> = buildBodyTK1433179();
