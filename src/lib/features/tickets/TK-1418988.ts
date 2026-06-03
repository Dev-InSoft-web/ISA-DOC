// TK-1418988 — Problemas al cargar imagen en Paty IA.
// Una imagen referenciada desde un archivo de documentación no carga
// correctamente al consultarla desde el asistente.

import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>Se recibe un <b>feedback negativo</b> desde Paty IA, en el cual se informa  
	que una imagen asociada a la respuesta <b>no está cargando correctamente</b>.</div>`;

export async function buildBodyTK1418988(): Promise<string> {
	const [h3Recurso, h3Ubicacion, h3Conversacion, h3Tecnica, h3Estado] = await Promise.all([
		h3Iconized("mdi:image-broken-variant", "Recurso reportado"),
		h3Iconized("mdi:file-document-outline", "Ubicación del contenido"),
		h3Iconized("mdi:forum-outline", "Conversación relacionada"),
		h3Iconized("mdi:bug-outline", "Observación técnica"),
		h3Iconized("mdi:clock-outline", "Estado"),
	]);

	const recurso =
		`<div>La imagen reportada corresponde al siguiente recurso:</div>
		<div><code>https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/090%20IP/Oprs/ORD4%20-%20Cotizaci%C2%BEn/%5B14410%5D%20FrmOprOrd4/694%20cargar%20cotizacion.png</code></div>`;

	const ubicacion =
		`<div>La referencia a esta imagen se encuentra en el archivo de documentación  
		<code>ad_inventarios_plus.md</code>.</div>`;

	const conversacion =
		`<div>El caso fue identificado en la siguiente conversación de Paty IA:</div>
		<div><code>https://www.contapyme.com/soporte/?seccion=conversacion&amp;id=2864</code></div>`;

	const tecnica =
		`<div>Se requiere validar si la URL de la imagen está correctamente escrita y  
		codificada, ya que en la ruta se observa una posible inconsistencia en el  
		nombre de la carpeta:</div>
		<div><code>ORD4%20-%20Cotizaci%C2%BEn</code></div>
		<div>Esta codificación podría estar afectando la carga del recurso,  
		especialmente si el nombre esperado de la carpeta corresponde a  
		<b>Cotización</b>.</div>`;

	const estado = await note(
		"mdi:magnify",
		`<b>En análisis.</b> Se está validando la codificación de la URL y el nombre  
		real de la carpeta en el repositorio de ayudas para confirmar si se requiere  
		regenerar el enlace en <code>ad_inventarios_plus.md</code>.`,
	);

	return intro
		+ h3Recurso + recurso
		+ h3Ubicacion + ubicacion
		+ h3Conversacion + conversacion
		+ h3Tecnica + tecnica
		+ h3Estado + estado;
}

export const bodyTK1418988: Promise<string> = buildBodyTK1418988();
