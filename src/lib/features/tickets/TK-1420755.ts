// TK-1420755 — Mostrar fecha de creación de curso.
import { img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>Se incorporaron las columnas de auditoría (creación y última  
	modificación) en todos los listados del módulo de Cursos, de modo que  
	el usuario pueda activar la columna <b>Fecha de creación</b> (y los  
	demás datos del registro) desde el selector de columnas.</div>`;

export async function buildBodyTK1420755(): Promise<string> {
	const [h3a, h3b] = await Promise.all([
		h3Iconized("mdi:table-column-plus-after", "Columnas de auditor\u00eda al final de cada listado"),
		h3Iconized("mdi:autorenew", "Bonus: autocompletado del t\u00edtulo de un nodo"),
	]);
	const items = await Promise.all([
		note(
			"mdi:table-eye",
			`Se aplicó a todos los listados del módulo de Cursos el patrón  
			estándar de columnas de auditoría: fecha y usuario de creación,  
			fecha y usuario de última modificación, grupo y rol asociados.  
			Esto cubre los listados de cursos, drivers, estructura, permisos  
			y seguridad.`,
		),
		note(
			"mdi:eye-off-outline",
			`Todas las columnas de auditoría llegan ocultas por defecto  
			(siguiendo el estándar del proyecto). El usuario las activa  
			desde el selector de columnas del listado según su necesidad.`,
		),
		note(
			"mdi:format-list-bulleted-type",
			`En el listado principal de cursos, además, se ocultaron las  
			columnas internas de identificación de tema y driver, dejando  
			visibles únicamente los nombres del tema y del driver.`,
		),
		note(
			"mdi:source-branch",
			`Se verificó del lado del servidor que la consulta de cursos ya  
			estaba entregando toda la información necesaria de tema y  
			driver, por lo que no fue necesario tocar la consulta.`,
		),
		note(
			"mdi:rename-box",
			`En el formulario del árbol de contenidos, al asociar un recurso  
			a una hoja por primera vez se autocompleta el campo <i>título</i>  
			del nodo con el nombre del recurso. El autocompletado se dispara  
			una única vez por nodo para no sobrescribir ediciones manuales  
			posteriores del usuario.`,
		),
	]);
	const figListado = img("cursosListado.jpg");
	const figPicker = img("columnPickerAudit.jpg");
	return (
		intro + figListado +
		h3a + figPicker +
		`<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items[0]}${items[1]}${items[2]}${items[3]}</ul>` +
		h3b + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items[4]}</ul>`
	);
}

export const bodyTK1420755: Promise<string> = buildBodyTK1420755();


