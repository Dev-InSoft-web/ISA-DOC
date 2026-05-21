// TK-1428161 — Guardar visualización de columnas en catálogo de cursos.
// Solicitud de persistencia de la selección de columnas visibles entre
// recargas. Atendida la semana del 13/may./2026 como mejora transversal
// a todos los catálogos de ContaPyme U.
import { h3Iconized, note, noteList } from "./tk-helpers";
import { img } from "./snippets";

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
			`El estado de columnas (qué columnas son visibles y en qué orden  
			están) vive en el controlador de cada catálogo, que se reinstancia  
			en cada render. Sin un almén externo, cualquier cambio se  
			descarta al volver a entrar.`,
		),
		await note(
			"mdi:database-cog-outline",
			`Se opta por una capa de persistencia local en el navegador  
			(no requiere servicios nuevos, es por navegador y por usuario).  
			La clave de almacenamiento debe identificar de forma única la  
			grilla a la que pertenece la configuración, evitando  
			colisiones entre catálogos que tienen columnas con el mismo  
			nombre.`,
		),
		await note(
			"mdi:sync-alert",
			`La rehidratación debe ocurrir <b>antes</b> del primer render  
			de la grilla. Si se aplica después de montar el componente, la  
			grilla se pinta primero con la configuración por defecto y  
			luego salta a la guardada; por eso la carga del estado se hace  
			en la inicialización del controlador.`,
		),
	);

	const solucion = noteList(
		await note(
			"mdi:check-decagram-outline",
			`Se introduce un <b>helper único de persistencia de columnas</b>  
			que guarda, para cada grilla, qué columnas son visibles y en  
			qué orden están, identificando la grilla por el catálogo y la  
			vista activa.`,
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
			persistencia sin duplicidad. La rehidratación se hace de  
			forma síncrona durante la inicialización del controlador para  
			que la grilla pinte ya con los valores guardados.` +
			img("tk1428161-selector-columnas.png"),
		),
	);

	const estado = noteList(
		await note(
			"mdi:check-circle-outline",
			`Funcionalidad <b>ya entregada</b> en la iteración del  
			13 de mayo de 2026, distribuida en una serie de commits  
			(funcionalidad inicial más ajustes sucesivos de rehidratación,  
			clave de persistencia y consolidación de columnas). Aplicada  
			a todos los catálogos de ContaPyme U que usan el wrapper  
			común. Verificada la persistencia: al refrescar la página las  
			columnas adicionales seleccionadas se conservan visibles.` +
			img("tk1428161-persistencia-tras-recarga.png"),
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
