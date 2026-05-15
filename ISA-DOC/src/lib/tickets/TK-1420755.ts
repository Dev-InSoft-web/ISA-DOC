// TK-1420755 — Mostrar fecha de creación de curso.
import { code as codeI, img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>Se incorporaron las columnas de auditoría (creación / última modificación) en todos  
	los grids del módulo de Cursos, de modo que el usuario pueda activar la columna  
	<b>Fecha de creación</b> (y los demás datos del registro) desde el selector de columnas.</div>`;

export async function buildBodyTK1420755(): Promise<string> {
	const [h3a, h3b] = await Promise.all([
		h3Iconized("mdi:table-column-plus-after", "Columnas de auditor\u00eda al final de cada grid"),
		h3Iconized("mdi:autorenew", "Bonus: autocompletado del t\u00edtulo de un nodo"),
	]);
	const items = await Promise.all([
		note(
			"mdi:table-eye",
			`Se aplic\u00f3 a todos los grids de Capacitaci\u00f3n de Cursos el patr\u00f3n est\u00e1ndar  
			de columnas de auditor\u00eda: fecha y usuario de creaci\u00f3n, fecha y usuario de \u00faltima  
			modificaci\u00f3n, grupo y rol asociados. Esto cubre los controladores de cursos,  
			drivers, estructura, permisos y seguridad.`,
		),
		note(
			"mdi:eye-off-outline",
			`Todas las columnas de auditor\u00eda llegan ocultas por defecto (siguiendo el  
			est\u00e1ndar del proyecto). El usuario las activa desde el selector de columnas  
			del grid seg\u00fan necesidad.`,
		),
		note(
			"mdi:format-list-bulleted-type",
			`En el listado principal de cursos adicionalmente se ocultaron las claves for\u00e1neas  
			${codeI("itema")} e ${codeI("idriver")} dejando visibles solo los nombres del tema y  
			del driver.`,
		),
		note(
			"mdi:source-branch",
			`En backend se confirm\u00f3 que la carga del listado de cursos ya retornaba los objetos  
			anidados de tema y driver necesarios para alimentar el grid.`,
		),
		note(
			"mdi:rename-box",
			`En el formulario de \u00e1rbol de contenidos, al asociar un recurso a una hoja por  
			primera vez se autocompleta el campo <i>t\u00edtulo</i> del nodo con el nombre del  
			recurso. El autocompletado se dispara una \u00fanica vez por ruta del nodo para no  
			sobrescribir ediciones manuales posteriores del usuario.`,
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

