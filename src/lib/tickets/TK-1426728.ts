// TK-1426728 — Información vacía del curso en pestaña "Contenido" del curso
// al agregar un nuevo nodo bajo un capítulo.
//
// Diligencia: el problema reportado no logró reproducirse en el entorno
// de pruebas. Se aprovechó la revisión para optimizar la reactividad de
// la pestaña de contenido sin alterar la lógica funcional.
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reporta que al agregar un nuevo nodo bajo un <b>capítulo</b>  
	en la pestaña <b>Contenido</b> del catálogo de cursos, el registro  
	aparece insertado en el árbol, pero <b>no carga la información</b>  
	del recurso asociado (por ejemplo el <b>nombre/título</b> queda  
	vacío).</div>`;

export async function buildBodyTK1426728(): Promise<string> {
	const [h3Contexto, h3Replica, h3Optimizacion, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:bug-check-outline", "Intento de replicación"),
		h3Iconized("mdi:speedometer", "Optimización aplicada"),
		h3Iconized("mdi:forum-outline", "Estado"),
	]);

	const contexto = noteList(
		await note(
			"mdi:tree-outline",
			`En la pestaña <b>Contenido</b> del curso se agrega un nuevo  
			nodo hijo bajo un capítulo existente.`,
		),
		await note(
			"mdi:text-box-remove-outline",
			`Según el reporte, el nodo se persiste pero la columna de  
			<b>Título</b> queda en blanco; tampoco se hidratarían los  
			demás atributos del recurso al seleccionarlo.`,
		),
	);

	const replica = noteList(
		await note(
			"mdi:flask-empty-outline",
			`Se intentó reproducir el caso siguiendo los pasos del  
			reporte sobre cursos de prueba (capítulos vacíos y con  
			hijos previos, distintos drivers, modos crear/modificar).  
			En todos los escenarios probados el nodo se insertó y los  
			atributos del recurso se hidrataron correctamente.  
			<br/><br/>  
			<img src="/imgs/tickets/TK-1426728/contenido-curso-edit.png"  
			alt="Pestaña Contenido del curso en modo edición con nodos  
			hidratados correctamente"  
			style="max-width:100%;border:1px solid #80808055;border-radius:4px;margin-top:0.5rem;" />`,
		),
		await note(
			"mdi:alert-circle-outline",
			`<b>No se logró replicar el problema reportado.</b> Por  
			ello no fue posible identificar una causa raíz concreta a  
			partir de la evidencia recibida.`,
		),
	);

	const optimizacion = noteList(
		await note(
			"mdi:tune-vertical",
			`Aprovechando la revisión, se realizó una pasada de  
			optimización sobre la <b>reactividad</b> del árbol de  
			contenido y de la hidratación del recurso al seleccionar  
			un nodo, manteniendo el comportamiento funcional.`,
		),
		await note(
			"mdi:shield-check-outline",
			`El objetivo del ajuste es <i>preventivo</i>: reduce la  
			probabilidad de que un timing de actualización del árbol  
			deje un nodo con datos sin renderizar bajo escenarios  
			menos frecuentes.`,
		),
	);

	const estado = noteList(
		await note(
			"mdi:account-question-outline",
			`<b>El error reportado no se pudo replicar.</b> Se queda a  
			la espera de pasos más detallados, video o sesión guiada  
			con el solicitante para reproducir el caso exacto y, de  
			ser necesario, abordar una corrección dirigida.`,
		),
	);

	return intro + h3Contexto + contexto + h3Replica + replica
		+ h3Optimizacion + optimizacion + h3Estado + estado;
}

export const bodyTK1426728: Promise<string> = buildBodyTK1426728();
