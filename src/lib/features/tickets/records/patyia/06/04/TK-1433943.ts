// Reforzar prompts Paty — actualizar INSTRUCCION desde Ultra.

import { h3Iconized, note, noteList } from "../../../../lib/tk-helpers";

const intro =
	`<div>En las pruebas de <b>Paty V3/V4</b> se detectó que varias instrucciones por tipo de consulta no se cumplían de forma consistente. ` +
	`Se reforzaron los trece prompts en versión <b>Ultra</b> y se desplegaron en la base de datos de ayudas en staging y en el esquema operativo de PostgreSQL.</div>`;

export async function buildBodyTK1433943(): Promise<string> {
	const [h3Solicitud, h3Despliegue, h3Cierre] = await Promise.all([
		h3Iconized("mdi:text-box-check-outline", "Solicitud"),
		h3Iconized("mdi:database-edit-outline", "Despliegue"),
		h3Iconized("mdi:check-decagram", "Cierre técnico"),
	]);

	const solicitud = noteList(
		await note(
			"mdi:file-document-multiple-outline",
			"Se actualizaron los trece registros <code>PROMPT_&lt;TIPO&gt;</code> con la versión Ultra reforzada, a partir del catálogo funcional acordado para Paty V3/V4.",
		),
	);

	const despliegue = noteList(
		await note(
			"mdi:merge",
			"Se aplicó un lote idempotente en <code>INSTRUCCION</code> y <code>TDCONSULTAXINSTRUCCION</code> sobre <b>AYUDASCP_IA_STAGING</b>, conservando el enlace por tipo con <code>orden = 1</code>.",
		),
		await note(
			"mdi:database-sync",
			"Se replicó el mismo catálogo en <code>paty.instruccion</code> y tablas de enlace en PostgreSQL.",
		),
		await note(
			"mdi:checkbox-marked-circle-outline",
			"Se verificó la carga de trece filas con prefijo <code>PROMPT_%</code> y versión <code>2.0-ultra</code>.",
		),
	);

	const cierre = noteList(
		await note(
			"mdi:chat-outline",
			"Queda por validar en conversación de Paty V3/V4 el cumplimiento de las instrucciones en los escenarios que habían fallado en pruebas previas.",
		),
	);

	return intro + h3Solicitud + solicitud + h3Despliegue + despliegue + h3Cierre + cierre;
}

export const bodyTK1433943: Promise<string> = buildBodyTK1433943();
