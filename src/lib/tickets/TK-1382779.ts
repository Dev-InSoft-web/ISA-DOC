// TK-1382779 — Estructura jerárquica para archivos AD usados como insumo del asistente IA.
// Se define un estándar de encabezados (Nivel 1 a Nivel 4) para los archivos ad_*.md
// con el fin de que Paty IA interprete el contenido, relacione módulo → ventana → campo
// y responda de forma más precisa.

import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>Requerimiento abierto por <b>VRESTREPO</b> el 10/feb./2026: se necesita  
	que los archivos <code>ad_</code>, que contienen el conocimiento suministrado al  
	asistente IA, cuenten con una <b>estructura jerárquica clara y estandarizada</b>,  
	con el fin de facilitar que la IA interprete correctamente la información del  
	contenido, relacione <b>módulo → ventana → campo</b> y responda de forma más  
	precisa y contextualizada a los usuarios.</div>`;

export async function buildBodyTK1382779(): Promise<string> {
	const [h3Contexto, h3Propuesta, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto actual"),
		h3Iconized("mdi:file-tree-outline", "Propuesta de estructura"),
		h3Iconized("mdi:forum-outline", "Estado"),
	]);

	const contexto =
		`<div>Actualmente se manejan archivos <code>ad_</code> por módulo, donde cada  
		archivo incluye información relacionada con <b>Acerca del módulo</b>,  
		<b>Acerca de la ventana</b> y <b>Más info</b>. Cada archivo contiene distintas  
		clases para estructurar su contenido, pero no todos siguen un orden  
		jerárquico homogéneo, lo que dificulta el procesamiento del conocimiento por  
		parte de la IA.</div>`;

	const propuesta =
		`<div>Dado que los archivos se gestionan en formato Markdown (<code>.md</code>)  
		y que el sistema permite hasta 6 niveles de encabezados, se define la  
		siguiente estructura jerárquica estándar, la cual debe aplicarse a todos los  
		archivos <code>ad_</code>:</div>
		<ul>
			<li><b>Nivel 1 — Módulo:</b> <code># Nombre del módulo</code>.</li>
			<li><b>Nivel 2 — Acerca del módulo:</b> <code>## Acerca del módulo [Nombre]</code>.</li>
			<li><b>Nivel 3 — Acerca de la ventana:</b> <code>### Acerca de la ventana [Nombre]</code>.</li>
			<li><b>Nivel 4 — Más info / Campos de la ventana:</b> <code>#### Campos de la ventana [H1 + H2 del "Acerca de"]</code>.</li>
		</ul>
		<div>Según lo acordado, los archivos AD se ubican por fuera de la carpeta que  
		contiene los archivos "Más info" de los campos. A estos archivos AD se les  
		agregó el nombre de la carpeta correspondiente a los campos, para que al  
		generar el archivo MD la información quede organizada debajo del AD respectivo  
		y se conserve la jerarquía. La estructura fue presentada al ingeniero y se  
		continuará con el proceso aplicado al módulo de <b>Inventarios</b>, el cual ya  
		se encuentra listo para iniciar esta actividad.</div>`;

	const estado = await note(
		"mdi:progress-clock",
		`<b>En proceso.</b> Se realizó ajuste sobre el script que procesa los archivos  
		HTML de ayuda para convertirlos a Markdown y se entregaron resultados  
		preliminares para revisión. Se continúa con la aplicación del estándar al  
		módulo de Inventarios como piloto antes de extenderlo a los demás módulos.`,
	);

	return intro
		+ h3Contexto + contexto
		+ h3Propuesta + propuesta
		+ h3Estado + estado;
}

export const bodyTK1382779: Promise<string> = buildBodyTK1382779();
