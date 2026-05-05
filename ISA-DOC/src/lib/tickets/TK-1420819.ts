// TK-1420819 — Campos vacíos en grid curso (Tema / Driver).
import { code as codeI } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>En revisión del catálogo de cursos se identifica que las columnas ` +
	`<b>Tema</b> y <b>Driver</b> del grid aparecen vacías, aún cuando los registros ` +
	`fueron diligenciados correctamente desde el formulario rápido. El detalle del ` +
	`registro sí muestra los valores; sólo la celda del grid queda en blanco.</div>`;

export async function buildBodyTK1420819(): Promise<string> {
	const [h3a, h3b] = await Promise.all([
		h3Iconized("mdi:alert-circle-outline", "Síntoma"),
		h3Iconized("mdi:magnify-scan", "Hipótesis a verificar"),
	]);
	const items = await Promise.all([
		note(
			"mdi:table-eye-off",
			`En el grid las columnas ${codeI("tema")} y ${codeI("driver")} se muestran vacías ` +
			`para los cursos ${codeI("CP40MOD998")} y ${codeI("CP40MOD999")}, pese a que el ` +
			`formulario del curso (panel derecho) muestra los valores guardados.`,
		),
		note(
			"mdi:database-search",
			`Probable causa: ${codeI("TCursoServer.JData2List")} no está retornando los nodos ` +
			`anidados ${codeI("{ tema: { ntema }, driver: { ndriver } }")} que consume el grid ` +
			`vía ${codeI("GetDisplayText: (_v, o) => o.tema?.ntema")}.`,
		),
		note(
			"mdi:source-branch-sync",
			`Verificar el ${codeI("Select")} y los joins del backend a ` +
			`${codeI("CAPAC_TEMAS")} y ${codeI("CAPAC_DRIVERS")} en el listado del catálogo.`,
		),
		note(
			"mdi:bug-check-outline",
			`Confirmar si el bug se introdujo con el refactor reciente del catálogo de ` +
			`temas y del driver en el módulo de Cursos.`,
		),
	]);
	return (
		intro +
		h3a + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items[0]}</ul>` +
		h3b + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items[1]}${items[2]}${items[3]}</ul>`
	);
}

export const bodyTK1420819: Promise<string> = buildBodyTK1420819();
