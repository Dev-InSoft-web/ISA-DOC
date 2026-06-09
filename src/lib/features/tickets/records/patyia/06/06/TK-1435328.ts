// Refuerzo instrucciones Paty V3 — catálogo mejorado en INSTRUCCION.

import { h3Iconized, note, noteList } from "../../../../lib/tk-helpers";

const intro =
	`<div>En las pruebas de <b>Paty V3</b> se detectó que varias instrucciones por tipo de consulta no se cumplían de forma consistente. ` +
	`Se reforzaron los trece textos del catálogo de prompts específicos y se desplegaron en la base de datos de ayudas en staging.</div>`;

export async function buildBodyTK1435328(): Promise<string> {
	const [h3Solicitud, h3Despliegue, h3Cierre] = await Promise.all([
		h3Iconized("mdi:text-box-check-outline", "Solicitud"),
		h3Iconized("mdi:database-edit-outline", "Despliegue"),
		h3Iconized("mdi:check-decagram", "Cierre técnico"),
	]);

	const solicitud = noteList(
		await note(
			"mdi:file-document-multiple-outline",
			"Se actualizaron los trece registros de instrucción por tipo con la versión reforzada del catálogo de prompts específicos, a partir del material acordado para Paty V3.",
		),
	);

	const despliegue = noteList(
		await note(
			"mdi:merge",
			"Se aplicó un lote idempotente en <code>INSTRUCCION</code> y <code>TDCONSULTAXINSTRUCCION</code> sobre <b>AYUDASCP_IA_STAGING</b>, conservando el enlace por tipo con <code>orden = 1</code> y versión <code>1.0</code>.",
		),
		await note(
			"mdi:database-sync",
			"Se sincronizó el mismo catálogo en el esquema operativo de PostgreSQL para mantener coherencia entre entornos.",
		),
		await note(
			"mdi:checkbox-marked-circle-outline",
			"Se verificó la carga de trece filas con los trece tipos de consulta y longitud de texto acorde al catálogo vigente.",
		),
	);

	const cierre = noteList(
		await note(
			"mdi:chat-outline",
			"Queda por validar en conversación de Paty V3 el cumplimiento de las instrucciones en los escenarios que habían fallado en pruebas previas.",
		),
	);

	return intro + h3Solicitud + solicitud + h3Despliegue + despliegue + h3Cierre + cierre;
}

export const bodyTK1435328: Promise<string> = buildBodyTK1435328();
