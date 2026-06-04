// Obsolescencia de objetos Prompt en OpenAI (pmpt_*).

import { h3Iconized, note, noteList } from "../../../../lib/tk-helpers";

const intro =
	`<div>En el panel de OpenAI se reportó el aviso <b>«Los objetos Prompt están quedando obsoletos»</b>. ` +
	`El motor Paty IA utilizaba identificadores <code>pmpt_…</code> en macros, clasificadores y variables dinámicas. ` +
	`Se analizó el impacto y se documentó la dependencia de instrucciones persistidas en base de datos frente a objetos alojados en el proveedor.</div>`;

export async function buildBodyTK1433968(): Promise<string> {
	const [h3Contexto, h3Riesgo, h3Linea] = await Promise.all([
		h3Iconized("mdi:open-in-new", "Contexto"),
		h3Iconized("mdi:alert-outline", "Riesgo"),
		h3Iconized("mdi:map-marker-path", "Línea de trabajo"),
	]);

	const contexto = noteList(
		await note(
			"mdi:identifier",
			"Se constató que los identificadores <code>pmpt_…</code> podían quedar sin soporte, mientras la respuesta por tipo ya se servía desde <code>INSTRUCCION</code> en la base de datos de ayudas.",
		),
		await note(
			"mdi:source-branch",
			"Se alineó la actualización de textos Ultra en base de datos con este análisis; el seguimiento cubre el inventario de macros aún ligadas al proveedor.",
		),
	);

	const riesgo = noteList(
		await note(
			"mdi:clock-alert-outline",
			"Se identificó riesgo de interrupción en clasificación o macros si se deprecaban <code>pmpt_*</code> sin equivalente en base de datos o configuración local.",
		),
		await note(
			"mdi:history",
			"Se recomendó centralizar versionado y trazabilidad de instrucciones en staging y producción, acorde al despliegue por lotes idempotentes.",
		),
	);

	const linea = noteList(
		await note(
			"mdi:format-list-checks",
			"Se documentó el inventario de usos de <code>pmpt_*</code> en clasificación, flujos operativos y respuesta.",
		),
		await note(
			"mdi:database",
			"Se priorizó <code>INSTRUCCION</code> y configuración local como fuente única de textos por tipo de consulta.",
		),
	);

	return intro + h3Contexto + contexto + h3Riesgo + riesgo + h3Linea + linea;
}

export const bodyTK1433968: Promise<string> = buildBodyTK1433968();
