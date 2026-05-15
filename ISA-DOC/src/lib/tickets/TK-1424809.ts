// TK-1424809 — Menú de acciones incompleto en el catálogo de Cursos.
// Resuelto.
import { img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>Se reportó que el menú de acciones de los catálogos  
	<b>Cursos</b> y <b>Planes de estudio</b> mostraba solo cinco acciones  
	(Crear, Visualizar, Modificar, Eliminar y Refrescar) cuando el resto de  
	catálogos maestros expone también <i>Verificar</i>, <i>Duplicar</i>,  
	<i>Recodificar</i> y <i>Consolidar</i>. El menú contextual (botón derecho)  
	también quedaba recortado a tres opciones.</div>`;

export async function buildBodyTK1424809(): Promise<string> {
	const [h3Causa, h3Fix, h3Verif] = await Promise.all([
		h3Iconized("mdi:bug-outline", "Causa"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:eye-check-outline", "Verificación"),
	]);

	const causaNotes = await Promise.all([
		note(
			"mdi:filter-remove-outline",
			`En el registro de los catálogos maestros en el servidor se estaba  
			omitiendo el conjunto de acciones extendido (Verificar, Duplicar,  
			Recodificar y Consolidar) en <b>Curso</b> y <b>Plan de estudio</b>,  
			por lo que el cliente solo recibía el subconjunto básico de acciones  
			y no podía pintarlas en la toolbar ni en el menú contextual.`,
		),
	]);

	const fixNotes = await Promise.all([
		note(
			"mdi:format-list-checks",
			`Se retiró la omisión de acciones en el registro de los catálogos  
			<b>Curso</b> y <b>Plan de estudio</b> de la Function App. Ahora  
			ambos exponen las ocho acciones estándar del maestro: <i>Crear</i>,  
			<i>Modificar</i>, <i>Visualizar</i> (Obtener), <i>Listar</i>,  
			<i>Eliminar</i>, <i>Verificar</i>, <i>Duplicar</i>,  
			<i>Recodificar</i> y <i>Consolidar</i>.`,
		),
		note(
			"mdi:menu-open",
			`La toolbar y el menú contextual del grid construyen las opciones  
			disponibles a partir de las acciones reportadas por el servidor, por  
			lo que con el cambio anterior ambos quedan completos sin tocar el  
			cliente.`,
		),
		note(
			"mdi:server-network",
			`Para que el cambio quede activo en el ambiente productivo debe  
			publicarse la Function App de servicios de ContaPyme U. Mientras  
			tanto los nuevos endpoints están disponibles en local y  
			preproducción.`,
		),
	]);

	const verifNotes = await Promise.all([
		note(
			"mdi:check-bold",
			`Probado sobre los catálogos <i>Recursos</i> (referencia con las 8  
			acciones) y <i>Cursos</i> y <i>Planes de estudio</i> (corregidos).  
			En los tres se muestran las acciones extendidas en la toolbar y en  
			el menú contextual.`,
		),
	]);

	const ulOpen = `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">`;
	const figToolbar = img("cursosAccionesCompletas.jpg");
	const figContexto = img("cursosMenuContextual.jpg");
	return (
		intro + figToolbar +
		h3Causa + ulOpen + causaNotes.join("") + `</ul>` +
		h3Fix + ulOpen + fixNotes.join("") + `</ul>` +
		h3Verif + ulOpen + verifNotes.join("") + `</ul>` + figContexto
	);
}

export const bodyTK1424809: Promise<string> = buildBodyTK1424809();
