// TK-1425173 — Asociación del recurso básico a los recursos medio y avanzado.
// En análisis.
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se solicitó que el campo <code>iplanpadre</code> del ` +
	`recurso solo apareciera disponible cuando la dificultad del recurso fuera ` +
	`<b>Medio</b> o <b>Avanzado</b>, y que su captura no fuera un número libre, ` +
	`sino la selección desde un catálogo de recursos con dificultad ` +
	`<b>Básico</b> pertenecientes al mismo capítulo.</div>`;

export async function buildBodyTK1425173(): Promise<string> {
	const [h3Req, h3Plan] = await Promise.all([
		h3Iconized("mdi:format-list-checks", "Requerimientos"),
		h3Iconized("mdi:progress-clock", "Estado"),
	]);

	const req = noteList(
		await note(
			"mdi:eye-off-outline",
			`Ocultar el campo <code>iplanpadre</code> cuando la dificultad del ` +
			`recurso es <b>Básico</b>.`,
		),
		await note(
			"mdi:eye-outline",
			`Mostrar el campo <code>iplanpadre</code> sólo cuando la dificultad ` +
			`del recurso es <b>Medio</b> o <b>Avanzado</b>.`,
		),
		await note(
			"mdi:book-search-outline",
			`Reemplazar la captura libre numérica por un BtnRef que abra un ` +
			`catálogo filtrado por dificultad <b>Básico</b> y mismo capítulo del ` +
			`recurso actual.`,
		),
	);

	const plan = noteList(
		await note(
			"mdi:timer-sand",
			`En análisis. Se evaluará el flujo del formulario de plan y el ` +
			`catálogo de selección con la restricción de dificultad y capítulo.`,
		),
	);

	return intro + h3Req + req + h3Plan + plan;
}

export const bodyTK1425173: Promise<string> = buildBodyTK1425173();
