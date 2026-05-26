// TK-1429373 — Inserción en BD de Paty V3 de las instrucciones por tipo de
// consulta. Se aplican los prompts específicos sobre AYUDASCP_IA mediante
// un script idempotente con MERGE.

import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>La asesora <b>Viviana Restrepo Quintero</b> solicita insertar en la  
	<b>base de datos AYUDASCP_IA</b> (microservicio de Paty V3) las  
	instrucciones específicas por tipo de consulta, alineando la BD con los  
	<b>prompts</b> definidos en la ruta de análisis y diseño y en el archivo  
	de control de SharePoint.</div>`;

export async function buildBodyTK1429373(): Promise<string> {
	const [h3Solicitud, h3Solucion] = await Promise.all([
		h3Iconized("mdi:database-plus-outline", "Solicitud"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
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
			`Se entrega una <b>tabla de instrucciones por tipo de consulta</b>  
			(tipo, código de instrucción, archivo de prompt y ruta) que debe  
			cargarse en la BD de Paty V3.`,
		),
	);

	const solucion = noteList(
		await note(
			"mdi:database-cog-outline",
			`Se ejecuta un script <b>idempotente</b> sobre  
			<code>AYUDASCP_IA</code> que carga los <b>13 prompts</b>  
			(<code>PROMPT_&lt;TIPO&gt;</code>) leídos desde los archivos  
			<code>.md</code> del repositorio de análisis y diseño.`,
		),
		await note(
			"mdi:merge",
			`Se aplica <b>MERGE</b> en <code>INSTRUCCION</code> con clave  
			<code>iinstruccion = &lt;TIPO&gt;</code>: si no existe inserta el  
			registro y si existe actualiza nombre, contenido, descripción,  
			versión y estado activo.`,
		),
		await note(
			"mdi:link-variant",
			`Se aplica <b>MERGE</b> en <code>TDCONSULTAXINSTRUCCION</code>  
			enlazando <code>itdconsulta</code> con <code>iinstruccion</code> y  
			<code>orden = 1</code>, evitando duplicados en re-ejecuciones.`,
		),
		await note(
			"mdi:shield-check-outline",
			`El script se envuelve en <code>BEGIN TRAN</code> /  
			<code>COMMIT</code> con <code>SET XACT_ABORT ON</code>, de modo  
			que cualquier fallo revierte el lote completo.`,
		),
	);

	return (
		intro +
		h3Solicitud + solicitud +
		h3Solucion + solucion
	);
}

export const bodyTK1429373: Promise<string> = buildBodyTK1429373();
