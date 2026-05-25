// TK-1429342 — Visualización de recurso desde "contenido" de un curso.
// Solicitud de UX: separar las acciones de previsualización y visualización
// dentro de la pestaña Contenido de un curso, alineando los íconos con los
// del catálogo de recursos.

import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se solicita que, dentro de la pestaña <b>Contenido</b> de un curso,  
	las acciones asociadas a un recurso permitan <b>visualizar la configuración  
	del recurso</b> además de previsualizarlo. Hoy el ícono del ojo lleva a la  
	previsualización, y se requiere homologar los íconos con los del catálogo  
	de recursos.</div>`;

export async function buildBodyTK1429342(): Promise<string> {
	const [h3Contexto, h3Solicitud, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:tools", "Solicitud"),
		h3Iconized("mdi:clock-outline", "Estado"),
	]);

	const contexto = noteList(
		await note(
			"mdi:view-list-outline",
			`En la pestaña <b>Contenido</b> de un curso, cada recurso del árbol  
			expone un conjunto de acciones rápidas. Actualmente el ícono del  
			ojo dispara la <b>previsualización</b> del recurso.`,
		),
		await note(
			"mdi:swap-horizontal",
			`En el <b>catálogo de recursos</b> existe la separación clara entre  
			el ícono de <b>previsualizar</b> (catálogo) y el ícono del ojo para  
			<b>visualizar la configuración</b> del recurso. Se solicita  
			replicar esa convención en la pestaña Contenido.`,
		),
	);

	const solicitud = noteList(
		await note(
			"mdi:eye-outline",
			`Reservar el <b>ícono del ojo</b> para <b>visualizar la información  
			del recurso</b> (lectura del formulario con los campos del recurso,  
			tal como aparece en el catálogo de recursos).`,
		),
		await note(
			"mdi:image-search-outline",
			`Usar el <b>ícono de previsualizar</b> del catálogo de recursos  
			para la acción de previsualización del recurso dentro del árbol  
			de contenido del curso.`,
		),
	);

	const estado = await note(
		"mdi:clock-outline",
		`<b>Abierto.</b> Pendiente de análisis y estimación.`,
	);

	return intro + h3Contexto + contexto + h3Solicitud + solicitud + h3Estado + estado;
}

export const bodyTK1429342: Promise<string> = buildBodyTK1429342();
