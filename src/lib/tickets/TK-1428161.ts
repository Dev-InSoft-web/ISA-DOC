// TK-1428161 — Guardar visualización de columnas en catálogo de cursos.
// Solicitud de persistencia de la selección de columnas visibles entre
// recargas. Atendida la semana del 13/may./2026 como mejora transversal
// a todos los catálogos de ContaPyme U.
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se solicita que cuando el usuario selecciona columnas adicionales  
	para un catálogo, esa <b>personalización de columnas visibles</b> se  
	conserve al refrescar la página o volver a abrirlo. Actualmente, al  
	salir o recargar, las columnas no marcadas como predeterminadas se  
	vuelven a ocultar.</div>`;

export async function buildBodyTK1428161(): Promise<string> {
	const [h3Contexto, h3Analisis, h3Solucion, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:magnify-scan", "Análisis técnico"),
		h3Iconized("mdi:tools", "Solución aplicada"),
		h3Iconized("mdi:forum-outline", "Estado"),
	]);

	const contexto = noteList(
		await note(
			"mdi:view-column-outline",
			`En los catálogos de ContaPyme U (cursos, planes, recursos, etc.)  
			cada grilla expone un selector de columnas para mostrar u ocultar  
			campos. La configuración elegida por el usuario se pierde en cada  
			recarga porque sólo vive en memoria del componente.`,
		),
		await note(
			"mdi:account-cog-outline",
			`La solicitud aplica a <b>todos los catálogos</b>, no solo cursos,  
			pues el comportamiento del selector es transversal y se hereda del  
			wrapper común de listas.`,
		),
	);

	const analisis = noteList(
		await note(
			"mdi:source-branch",
			`El estado de columnas (<code>visible</code> y <code>orderby</code>)  
			vive en el controlador de cada catálogo, que se reinstancia en cada  
			render. Sin un almacén externo, cualquier cambio se descarta.`,
		),
		await note(
			"mdi:database-cog-outline",
			`Se opta por <b>localStorage</b> como capa de persistencia local  
			(no requiere endpoint nuevo, es por navegador y por usuario). La  
			clave debe identificar de forma única la grilla: controlador + entry  
			point, evitando colisiones entre catálogos con columnas homónimas.`,
		),
		await note(
			"mdi:sync-alert",
			`La rehidratación debe ocurrir <b>antes</b> del primer render de la  
			grilla. Aplicarla en <code>onMount</code> deja un frame con los  
			valores por defecto, por eso se mueve al <i>field initializer</i> y  
			al constructor del controlador.`,
		),
	);

	const solucion = noteList(
		await note(
			"mdi:check-decagram-outline",
			`Se introduce un <b>helper único de persistencia de columnas</b>  
			que serializa <code>visible</code> y <code>orderby</code> por  
			controlador en <code>localStorage</code>, con clave compuesta por  
			el id del controlador y el <code>entrie</code> activo.`,
		),
		await note(
			"mdi:package-variant-closed",
			`El helper se encapsula como singleton hermético y expone un  
			<i>registro global de claves</i> más una utilidad para reiniciar  
			todo el estado almacenado, útil para soporte/QA.`,
		),
		await note(
			"mdi:layers-triple-outline",
			`Se centraliza la <b>definición de columnas</b> y se unifica el  
			wrapper de lista para que todos los catálogos hereden la  
			persistencia sin código duplicado. La rehidratación se hace de  
			forma síncrona en el constructor / field initializer para que la  
			grilla pinte ya con los valores guardados.`,
		),
	);

	const estado = noteList(
		await note(
			"mdi:check-circle-outline",
			`Funcionalidad <b>ya entregada</b> en la iteración del  
			<code>13/may./2026</code>, distribuida en una serie de commits  
			(feature + ajustes sucesivos de rehidratación, clave de  
			persistencia y consolidación de columnas). Aplicada a todos los  
			catálogos de ContaPyme U que usan el wrapper común.`,
		),
		await note(
			"mdi:forum-outline",
			`Pendiente de confirmación funcional por parte del solicitante  
			sobre el catálogo de cursos específico mencionado en el ticket.`,
		),
	);

	return intro + h3Contexto + contexto + h3Analisis + analisis + h3Solucion + solucion + h3Estado + estado;
}

export const bodyTK1428161: Promise<string> = buildBodyTK1428161();
