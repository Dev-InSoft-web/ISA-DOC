// TK-1426728 — Información vacía del curso en pestaña "Contenido" del curso
// al agregar un nuevo nodo bajo un capítulo.
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reporta que al agregar un nuevo nodo bajo un <b>capítulo</b>  
	en la pestaña <b>Contenido</b> del catálogo de cursos, el registro  
	aparece insertado en el árbol, pero no carga la información del  
	recurso asociado (por ejemplo el <b>nombre/título</b> aparece  
	vacío).</div>`;

export async function buildBodyTK1426728(): Promise<string> {
	const [h3Contexto, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
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
			`El nodo se persiste pero la columna de <b>Título</b> queda  
			en blanco; tampoco se hidratan los demás atributos del  
			recurso al seleccionarlo.`,
		),
	);

	const estado = noteList(
		await note(
			"mdi:progress-wrench",
			`Ticket abierto. Pendiente verificar la hidratación del  
			recurso al insertar nodos hoja en el árbol del curso.`,
		),
	);

	return intro + h3Contexto + contexto + h3Estado + estado;
}

export const bodyTK1426728: Promise<string> = buildBodyTK1426728();
