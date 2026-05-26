// TK-1429373 — Inserción en BD de Paty V3 de las instrucciones por tipo de
// consulta. Solicitud de la asesora Viviana para alinear la BD con los
// prompts específicos definidos en SharePoint.

import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>La asesora <b>Viviana Restrepo Quintero</b> solicita insertar en la  
	<b>base de datos de Paty V3</b> las instrucciones específicas por tipo de  
	consulta, alineando la BD con los <b>prompts</b> definidos en la ruta de  
	análisis y diseño y en el archivo de control de SharePoint.</div>`;

export async function buildBodyTK1429373(): Promise<string> {
	const [h3Solicitud, h3Estado] = await Promise.all([
		h3Iconized("mdi:database-plus-outline", "Solicitud"),
		h3Iconized("mdi:clock-outline", "Estado"),
	]);

	const solicitud = noteList(
		await note(
			"mdi:folder-text-outline",
			`<b>Ruta general de prompts:</b>  
			<code>P:\\ING-05 Sistema de servicio al cliente web\\ING-05-50 Ayudas ContaPyme IA\\Doc\\PATY V3\\Análisis y diseño\\prompt\\Prompts Especificos (Instrucciones)</code>.`,
		),
		await note(
			"mdi:file-document-outline",
			`<b>Archivo de control:</b> SharePoint — <i>Configuración de instrucciones</i>.`,
		),
		await note(
			"mdi:table",
			`Se recibe una <b>tabla de instrucciones por tipo de consulta</b>  
			(tipo, código de instrucción, archivo de prompt y ruta) que debe  
			cargarse en la BD de Paty V3.`,
		),
	);

	const estado = noteList(
		await note(
			"mdi:progress-clock",
			`Ticket <b>abierto</b>, pendiente de análisis del esquema de BD,  
			definición del script de inserción y validación con la asesora.`,
		),
	);

	return (
		intro +
		h3Solicitud + solicitud +
		h3Estado + estado
	);
}

export const bodyTK1429373: Promise<string> = buildBodyTK1429373();
