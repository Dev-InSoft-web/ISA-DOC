// TK-1425170 — Filtro de atributos del recurso por driver al seleccionar
// un título en el árbol de contenidos del curso. Requiere diálogo de alcance.
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reporta que al seleccionar un <b>título</b> en la pestaña  
	<b>Contenido</b> del curso, los <b>atributos del título</b> que se  
	muestran en el panel derecho no cambian según el <b>driver</b>  
	asociado. La solicitud apunta a que esos atributos se ajusten al  
	driver del título seleccionado.</div>`;

export async function buildBodyTK1425170(): Promise<string> {
	const [h3Contexto, h3Acuerdo, h3Alcance, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:handshake-outline", "Acuerdo previo"),
		h3Iconized("mdi:scale-balance", "Implicaciones de alcance"),
		h3Iconized("mdi:forum-outline", "Estado"),
	]);

	const contexto = noteList(
		await note(
			"mdi:tree-outline",
			`En la pestaña <b>Contenido</b> del curso, al seleccionar un  
			nodo de tipo título, el panel derecho muestra la sección  
			<b>Atributos del título</b> con campos como <i>URL  
			diapositivas</i>, <i>Imagen del profesor</i>, <i>Driver de  
			vídeo</i>, <i>Dificultad</i>, <i>iplanpadre</i> y  
			<i>Documento</i>.`,
		),
		await note(
			"mdi:filter-variant",
			`La solicitud original plantea que ese conjunto de atributos  
			cambie en función del <b>driver</b> del título, de forma  
			análoga a como ocurre en el catálogo de <b>Recursos</b>.`,
		),
	);

	const acuerdo = noteList(
		await note(
			"mdi:lock-outline",
			`En el diseño inicial se acordó que <b>desde el curso no se  
			modifican los recursos</b>: el formulario del curso muestra el  
			título y sus atributos heredados, pero la captura/edición real  
			vive en el catálogo de <b>Recursos</b>.`,
		),
		await note(
			"mdi:alert-circle-outline",
			`Habilitar en el curso un comportamiento de <b>escritura</b>  
			sobre los atributos del recurso rompería ese acuerdo: el  
			curso pasaría a ser una segunda vía de mantenimiento de  
			recursos, con todas las implicaciones de consistencia,  
			permisos y auditoría que eso conlleva.`,
		),
	);

	const alcance = noteList(
		await note(
			"mdi:eye-outline",
			`<b>Si el requerimiento es solo lectura</b> (que el panel  
			refleje el driver actual del título y muestre los atributos  
			que corresponden, sin permitir cambiarlos desde el curso),  
			<i>no viola</i> el acuerdo inicial. Es un ajuste de  
			presentación.`,
		),
		await note(
			"mdi:pencil-off-outline",
			`<b>Si el requerimiento es escritura</b> (que desde el curso  
			se puedan cambiar atributos del recurso), <i>sí viola</i>  
			el acuerdo inicial y debe redefinirse el alcance antes de  
			implementar.`,
		),
	);

	const estado = noteList(
		await note(
			"mdi:account-question-outline",
			`Se requiere <b>diálogo con el solicitante</b> para precisar  
			el alcance: lectura (refresco visual de atributos por driver)  
			o escritura (mantenimiento del recurso desde el curso). El  
			ticket queda pendiente de esa definición antes de planear  
			cualquier ajuste técnico.`,
		),
	);

	return intro + h3Contexto + contexto + h3Acuerdo + acuerdo
		+ h3Alcance + alcance + h3Estado + estado;
}

export const bodyTK1425170: Promise<string> = buildBodyTK1425170();
