// TK-1424892 — Acciones en catálogo de pestaña "Seguridad" de cursos. Resuelto.
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reportó que el listado de la pestaña <b>Seguridad</b> de  
	cursos no mostraba las mismas opciones que los demás listados de  
	consulta del sistema (refrescar, filtro, búsqueda y selección). Se  
	adjuntó captura con el aspecto esperado: una barra de herramientas  
	compacta arriba y, al costado, las pestañas para elegir columnas y  
	aplicar filtros.</div>`;

export async function buildBodyTK1424892(): Promise<string> {
	const [h3Causa, h3Fix, h3Verif, h3Config] = await Promise.all([
		h3Iconized("mdi:bug-outline", "Causa"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:eye-check-outline", "Verificación"),
		h3Iconized("mdi:database-cog-outline", "Mejora adicional en la definición de campos"),
	]);

	const causa = noteList(
		await note(
			"mdi:layers-outline",
			`El listado de <b>Seguridad</b> se estaba dibujando dentro de  
			contenedores propios que no respetaban las medidas de los listados  
			estándar del sistema. Por eso la barra superior y sus opciones  
			aparecían desalineadas o recortadas según el tamaño de la ventana.`,
		),
		await note(
			"mdi:source-branch",
			`Además, el formulario que contiene esa pestaña agregaba un  
			contenedor extra alrededor de cada campo, lo que duplicaba  
			espacios y generaba diferencias visuales frente a los demás  
			listados.`,
		),
	);

	const fix = noteList(
		await note(
			"mdi:view-grid-outline",
			`Se reemplazaron los contenedores propios por los contenedores  
			estándar de la librería de componentes. Con esto la barra de  
			herramientas del listado recupera el mismo aspecto que en el  
			resto del sistema.`,
		),
		await note(
			"mdi:swap-horizontal",
			`Se ajustó el formulario para que las opciones de presentación  
			(tamaño, separación, orientación) lleguen directamente al  
			contenedor principal, eliminando ese envoltorio extra que estaba  
			deformando la presentación.`,
		),
	);

	const verif = noteList(
		await note(
			"mdi:check-bold",
			`Se valida abriendo el listado de <b>Seguridad</b> sobre un curso  
			existente: la barra superior muestra las opciones <i>Refrescar</i>,  
			<i>Filtro</i> y <i>Buscar…</i> con el mismo aspecto que los demás  
			listados, y las pestañas laterales para elegir columnas y aplicar  
			filtros quedan correctamente alineadas.`,
		),
	);

	const configNotes = noteList(
		await note(
			"mdi:database-outline",
			`Aprovechando este ticket se avanzó en un cambio más amplio: los  
			campos de los formularios pasan a definirse directamente en la  
			base de datos, indicando para cada campo qué tipo de control  
			(texto, selector, listado de referencia, editor enriquecido, etc.)  
			se debe mostrar y, cuando corresponde, de qué catálogo toma sus  
			valores.`,
		),
		await note(
			"mdi:application-cog-outline",
			`Esto significa que en adelante se pueden agregar o modificar  
			atributos de los formularios desde la configuración del sistema,  
			sin necesidad de tocar el código de la aplicación. El sistema  
			lee esa definición y arma el formulario con los controles  
			adecuados de forma automática.`,
		),
	);

	return intro + h3Causa + causa + h3Fix + fix + h3Verif + verif + h3Config + configNotes;
}

export const bodyTK1424892: Promise<string> = buildBodyTK1424892();

