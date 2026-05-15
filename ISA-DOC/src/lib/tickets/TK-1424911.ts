// TK-1424911 — Error botón "Agregar" en pestaña "Contenido" al crear curso.
// Resuelto.
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reportó que, al crear un nuevo curso e ir a la pestaña  
	<b>Contenido</b>, al pulsar <b>Agregar</b> se abría el formulario del  
	nodo, se diligenciaban los datos y se pulsaba <b>Aceptar</b>: la  
	aplicación mostraba el mensaje <i>“Procedimiento finalizado”</i>, pero  
	el árbol quedaba vacío y el nodo no quedaba persistido.</div>`;

export async function buildBodyTK1424911(): Promise<string> {
	const [h3Causa, h3Fix, h3Verif] = await Promise.all([
		h3Iconized("mdi:bug-outline", "Causa"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:eye-check-outline", "Verificación"),
	]);

	const causa = noteList(
		await note(
			"mdi:share-variant-outline",
			`Al estar la URL en <code>?itdform=create</code>, el componente de  
			acciones genérico interpretaba el envío del nodo como acción  
			<code>Crear</code> (no <code>Modificar</code>).`,
		),
		await note(
			"mdi:source-branch",
			`El <code>postSubmit</code> del controlador de árbol sólo manejaba  
			las acciones <code>Modificar</code> y <code>Eliminar</code>. Con  
			acción <code>Crear</code>, el indicador interno  
			<code>_pendingInsertFlatPath</code> nunca se limpiaba.`,
		),
		await note(
			"mdi:undo-variant",
			`Al cerrar el drawer, el flujo de <code>closeEditForm</code>  
			detectaba el pending y ejecutaba el rollback del nodo recién  
			insertado, dejando el árbol vacío.`,
		),
	);

	const fix = noteList(
		await note(
			"mdi:plus-circle-outline",
			`Se ajustó el <code>postSubmit</code> del controlador del árbol para  
			que la acción <code>Crear</code> se consolide igual que  
			<code>Modificar</code>: se limpia el <code>_pendingInsertFlatPath</code>,  
			se refresca el árbol y se sincronizan los adaptadores antes de cerrar  
			el drawer.`,
		),
	);

	const verif = noteList(
		await note(
			"mdi:check-bold",
			`Probado en ${`<code>/capacitacion/cursos/crear?itdform=create</code>`}  
			con árbol inicialmente vacío: se agregan dos nodos consecutivos y  
			ambos quedan persistidos en el árbol (<i>PRIMER_NODO_FIX_OK (1|1)</i>  
			y <i>NODO_TRAS_FIX (2|2)</i>), sin rollback.`,
		),
	);

	return intro + h3Causa + causa + h3Fix + fix + h3Verif + verif;
}

export const bodyTK1424911: Promise<string> = buildBodyTK1424911();
