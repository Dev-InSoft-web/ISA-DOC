// TK-1424806 — Permisos de modificación con la acción "Visualizar" en el
// catálogo de cursos. Resuelto.
import { img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>Se reportó que, al ingresar al catálogo de cursos por la  
	acción <b>Visualizar</b>, en las pestañas <i>Estructura</i> y  
	<i>Seguridad</i> las tablas internas seguían permitiendo crear, modificar  
	y eliminar registros. Se solicitó que la acción “Visualizar” fuera estrictamente de  
	lectura, sin opciones de edición en ninguna pestaña.</div>`;

export async function buildBodyTK1424806(): Promise<string> {
	const [h3Causa, h3Fix, h3Verif] = await Promise.all([
		h3Iconized("mdi:bug-outline", "Causa"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:eye-check-outline", "Verificación"),
	]);

	const causaNotes = await Promise.all([
		note(
			"mdi:share-variant-outline",
			`Las tablas internas de las pestañas <i>Estructura</i> (niveles) y  
			<i>Seguridad</i> (permisos) no heredaban el modo de solo lectura  
			del formulario que las contiene. Aunque el formulario principal  
			entraba correctamente en consulta por la opción “Visualizar”, las  
			tablas anidadas mantenían habilitadas sus opciones de edición  
			como si se estuviera modificando el curso.`,
		),
	]);

	const fixNotes = await Promise.all([
		note(
			"mdi:lock-outline",
			`Se propaga el modo del formulario principal a las tablas internas  
			de niveles y permisos. Cuando el curso se abre con “Visualizar”, las  
			tablas anidadas también entran en consulta y ocultan o desactivan las  
			opciones de crear, modificar y eliminar, dejando únicamente refrescar  
			y aplicar filtros.`,
		),
		note(
			"mdi:eye-outline",
			`Las acciones de visualización (consultar el detalle de cada fila)  
			siguen disponibles, manteniendo la coherencia con el resto del  
			sistema: <i>Visualizar</i> permite navegar y leer, nunca escribir.`,
		),
	]);

	const verifNotes = await Promise.all([
		note(
			"mdi:check-bold",
			`Al ingresar a un curso existente por la acción <i>Visualizar</i>, las  
			pestañas <b>Estructura</b> y <b>Seguridad</b> dejan de permitir crear,  
			modificar o eliminar registros y solo habilitan refrescar, filtrar y  
			consultar el detalle de cada fila. Al ingresar al mismo curso por la  
			acción <i>Modificar</i>, todas las acciones vuelven a estar  
			disponibles, confirmando que el cambio solo afecta el modo de solo  
			lectura.`,
		),
	]);

	const ulOpen = `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">`;
	const figEstructura = img("visualizarEstructura.jpg");
	const figSeguridad = img("visualizarSeguridad.jpg");
	return (
		intro + figEstructura +
		h3Causa + ulOpen + causaNotes.join("") + `</ul>` +
		h3Fix + ulOpen + fixNotes.join("") + `</ul>` +
		h3Verif + ulOpen + verifNotes.join("") + `</ul>` + figSeguridad
	);
}

export const bodyTK1424806: Promise<string> = buildBodyTK1424806();
