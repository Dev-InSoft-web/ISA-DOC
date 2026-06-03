// TK-1429346 — Ajuste en tipo de visualización (plan de estudio).
// Renombrar y depurar las opciones del campo "Tipo de visualización" en
// los planes de estudio.

import { h3Iconized, note, noteList } from "./tk-helpers";
import { img } from "./snippets";

const intro =
	`<div>Se solicita ajustar los <b>nombres de las opciones</b> del campo  
	<b>Tipo de visualización</b> en el plan de estudio, según lo <b>hablado y  
	acordado en reuniones</b> del equipo.</div>`;

export async function buildBodyTK1429346(): Promise<string> {
	const [h3Cambios, h3Solucion] = await Promise.all([
		h3Iconized("mdi:format-list-bulleted-type", "Cambios solicitados"),
		h3Iconized("mdi:check-circle-outline", "Solución"),
	]);

	const cambios = noteList(
		await note(
			"mdi:rename-box",
			`Renombrar la opción <code>Pestañas</code> por <code>Lista</code>.`,
		),
		await note(
			"mdi:rename-box",
			`Renombrar la opción <code>Organigrama</code> por <code>Pénsum</code>.`,
		),
		await note(
			"mdi:delete-outline",
			`Eliminar la opción <code>Árbol</code>.`,
		),
	);

	const solucion = noteList(
		await note(
			"mdi:format-list-bulleted-type",
			`Se ajustan las opciones del select <b>Tipo de visualización</b> en  
			la pestaña General del plan de estudio: ahora muestra únicamente  
			<b>Lista</b> y <b>Pénsum</b>, y la previsualización refleja la  
			etiqueta seleccionada.` +
			img("tk1429346-form-general-lista.png") +
			img("tk1429346-form-general.png"),
		),
		await note(
			"mdi:database-cog-outline",
			`Se renombran los miembros del enum a <code>LISTA = "L"</code> y  
			<code>PENSUM = "P"</code> y se elimina el miembro <code>ARBOL</code>.  
			No se requiere migración de datos: las opciones se manejan únicamente  
			con los valores <code>L</code> y <code>P</code>.`,
		),
		await note(
			"mdi:broom",
			`Se eliminan helpers no usados (<code>mapManyToMany</code> y  
			<code>updateManyToMany</code>) detectados durante el refactor.`,
		),
	);

	return intro + h3Cambios + cambios + h3Solucion + solucion;
}

export const bodyTK1429346: Promise<string> = buildBodyTK1429346();
