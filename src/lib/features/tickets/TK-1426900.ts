// TK-1426900 — Acción "Modificar" en "Cursos integrados" del plan de estudio
// no permite editar: el campo aparece en modo visualización.
import { h3Iconized, note, noteList } from "./tk-helpers";
import { img } from "./snippets";

const intro =
	`<div>Se reporta que al dar clic en la acción <b>Modificar</b> de  
	la pestaña <b>Cursos integrados</b> dentro de un plan de estudio, el  
	campo del curso aparece en <b>modo visualización</b> y no permite  
	modificar ni reemplazar el curso actual.</div>`;

export async function buildBodyTK1426900(): Promise<string> {
	const [h3Contexto, h3Replica, h3Analisis, h3Solucion, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:camera-outline", "Réplica"),
		h3Iconized("mdi:magnify-scan", "Análisis técnico"),
		h3Iconized("mdi:tools", "Solución aplicada"),
		h3Iconized("mdi:forum-outline", "Estado"),
	]);

	const contexto = noteList(
		await note(
			"mdi:book-open-page-variant-outline",
			`En el catálogo de <b>Planes de estudio</b>, pestaña  
			<b>Cursos integrados</b>, se selecciona un registro y se  
			activa la acción <b>Modificar</b>.`,
		),
		await note(
			"mdi:lock-outline",
			`El formulario abierto muestra el campo <b>Curso</b> como  
			solo lectura, impidiendo seleccionar otro curso o reemplazar  
			el actual.`,
		),
	);

	const replica = noteList(
		await note(
			"mdi:image-outline",
			`Replicado sobre el plan <b>PLAN_REC1</b> en  
			<i>Cursos integrados</i>. Al abrir <b>Modificar</b> sobre la  
			fila <b>ACT-TRIB24</b>, el campo <b>Curso *</b> y su  
			botón de selección aparecen deshabilitados (modo lectura).` +
			img("tk1426900-cursos-integrados-modificar.png"),
		),
	);

	const analisis = noteList(
		await note(
			"mdi:source-branch",
			`La causa se localiza en el catálogo de cursos del plan, donde  
			el selector del campo <b>Curso</b> recibe el formulario del  
			detalle en modo lectura cuando el registro existe.`,
		),
		await note(
			"mdi:key-variant",
			`El detalle de cursos del plan de estudio se identifica por la  
			combinación de plan de estudio y curso (llave compuesta);  
			por convención, los campos que conforman la llave se bloquean  
			en modo modificar para preservar la integridad referencial,  
			lo que fuerza el selector de curso a quedar en solo lectura.`,
		),
		await note(
			"mdi:lightbulb-on-outline",
			`Opciones de solución bajo evaluación: (a) permitir que la  
			acción <b>Modificar</b> reasigne el curso, omitiendo el  
			bloqueo sobre ese campo y asumiendo que el servidor maneje  
			el cambio como reemplazo; (b) restringir la acción  
			<b>Modificar</b> a los campos no llave del detalle y  
			canalizar el reemplazo de curso por <b>Eliminar + Crear</b>.`,
		),
	);

	const solucion = noteList(
		await note(
			"mdi:check-decagram-outline",
			`Se mantiene el bloqueo del selector de curso por integridad  
			referencial (la llave del detalle se conserva). Para guiar al  
			usuario se añade un <b>aviso informativo</b> bajo el campo  
			Curso cuando el formulario está en modo <b>Modificar</b> y el  
			campo es llave: explica que para reemplazar el curso debe  
			eliminar la fila y crearla de nuevo, y que el orden y los  
			prerrequisitos sí son editables desde aquí.` +
			img("tk1426900-fix-aviso.png"),
		),
	);

	const estado = noteList(
		await note(
			"mdi:check-circle-outline",
			`Ticket atendido. Bug replicado, causa raíz documentada y  
			corrección de UX aplicada. Pendiente de validación funcional  
			con el solicitante.`,
		),
	);

	return intro + h3Contexto + contexto + h3Replica + replica + h3Analisis + analisis + h3Solucion + solucion + h3Estado + estado;
}

export const bodyTK1426900: Promise<string> = buildBodyTK1426900();
