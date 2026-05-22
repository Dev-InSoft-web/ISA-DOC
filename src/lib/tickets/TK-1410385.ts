// TK-1410385 — Ajuste de scripts de transcripción para la nueva estructura de carpetas
// del sitio de conocimiento de Paty IA.

import { h3Iconized, note } from "./tk-helpers";

export async function buildBodyTK1410385(): Promise<string> {
	const [h3Contexto, h3Necesidad, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:folder-multiple-outline", "Necesidad"),
		h3Iconized("mdi:forum-outline", "Estado"),
	]);

	const contexto =
		`<div>Ahora se contará con una carpeta principal llamada  
		<b>Ayudas transcripción de videos</b>. Dentro de esta, existirá una carpeta  
		por cada módulo y, dentro de cada módulo, una carpeta por cada video, nombrada  
		tal como aparece en el sistema de videos, incluyendo también el código de  
		YouTube.</div>`;

	const necesidad =
		`<div>Dentro de cada carpeta de video se deben almacenar los siguientes  
		archivos:</div>
		<ul>
			<li>La <b>transcripción completa</b> del video.</li>
			<li>La transcripción estructurada en formato de <b>preguntas y respuestas</b>.</li>
		</ul>
		<div>Adicionalmente, en la raíz de cada carpeta de módulo se tendrá un archivo  
		<code>vi_faq_modulo</code> que debe contener el consolidado de los FAQ de  
		todos los videos pertenecientes a ese módulo.</div>
		<div>Por lo anterior, el script debe recorrer esta nueva estructura de  
		carpetas, identificar los archivos FAQ de cada video y generar de forma  
		automática el consolidado por módulo, que posteriormente será cargado en  
		Paty IA. Como referencia se incluyó la ruta de <i>Ayudas Transcripciones  
		Videos</i> y un ejemplo con el módulo <b>AF</b>.</div>`;

	const estado = await note(
		"mdi:clock-outline",
		`<b>Abierto.</b> Se está validando la nueva estructura entregada por  
		VRESTREPO antes de ajustar los scripts de transcripción y de consolidación  
		de FAQ por módulo.`,
	);

	return h3Contexto + contexto
		+ h3Necesidad + necesidad
		+ h3Estado + estado;
}

export const bodyTK1410385: Promise<string> = buildBodyTK1410385();
