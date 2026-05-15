// TK-1424806 — Permisos de modificación con la acción "Visualizar" en el
// catálogo de cursos. Resuelto.
import { img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>Se reportó que, al ingresar al catálogo de cursos por la  
	acción <b>Visualizar</b>, en las pestañas <i>Estructura</i> y  
	<i>Seguridad</i> los grids embebidos seguían permitiendo crear, modificar  
	y eliminar registros. Se solicitó que la acción “Visualizar” fuera estrictamente de  
	lectura, sin acciones de escritura en ninguna pestaña.</div>`;

export async function buildBodyTK1424806(): Promise<string> {
	const [h3Causa, h3Fix, h3Verif] = await Promise.all([
		h3Iconized("mdi:bug-outline", "Causa"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:eye-check-outline", "Verificación"),
	]);

	const causaNotes = await Promise.all([
		note(
			"mdi:share-variant-outline",
			`Los grids embebidos de las pestañas <i>Estructura</i> (niveles) y  
			<i>Seguridad</i> (permisos) no recibían el modo <b>readOnly</b> del  
			formulario contenedor. Aunque el formulario principal entraba en modo  
			solo lectura por “Visualizar”, los list-slaves anidados conservaban  
			sus acciones de escritura habilitadas por defecto.`,
		),
	]);

	const fixNotes = await Promise.all([
		note(
			"mdi:lock-outline",
			`Se propaga el modo de operación del formulario a los list-slaves de  
			niveles y permisos. Cuando el contenedor está en “Visualizar”, los  
			grids embebidos quedan en solo lectura y ocultan o deshabilitan las  
			acciones de Crear, Modificar y Eliminar, dejando solo refrescar y  
			modo filtro.`,
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
			`Probado sobre el curso <i>CP40MOD998 — Curso Prueba CRAMIREZ FR</i>:  
			al ingresar por “Visualizar”, las pestañas <b>Estructura</b> y  
			<b>Seguridad</b> ya no permiten crear ni modificar registros. Al  
			ingresar por “Modificar” todas las acciones vuelven a estar  
			disponibles.`,
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
