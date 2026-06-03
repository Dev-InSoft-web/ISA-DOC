// TK-1431662 — Selección de modelo IA por tipo de consulta.

import { codeBlock, simpleTable, ticketImg } from "./snippets";
import { diagramFasesModelo } from "./ticketDiagramAssets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const SYSTEM_PROMPTS_MODELOS = `{
	"modeloOperativo": "gpt-4.1-nano",
	"modeloConversacion": "gpt-5-nano"
}`;

const OPENAI_INFOMAP_SIN_TEMP =
	`{"modelosSinTemperatura":["gpt-5","gpt-5-2025-08-07","gpt-5-mini","gpt-5-mini-2025-08-07","gpt-5-nano","gpt-5-nano-2025-08-07","gpt-5-pro","gpt-5-pro-2025-10-06","gpt-5-codex","gpt-5.5","gpt-5.5-2026-04-23","gpt-5.5-pro","gpt-5.5-pro-2026-04-23","gpt-5.4-pro","gpt-5.4-pro-2026-03-05","gpt-5.3-codex","gpt-5.2-pro","gpt-5.2-pro-2025-12-11","gpt-5.2-codex","gpt-5.1-codex","gpt-5.1-codex-max","gpt-5.1-codex-mini"]}`;

const SQL_ADD_MODELO = `IF COL_LENGTH(N'dbo.INSTRUCCION', N'MODELO') IS NULL
BEGIN
	ALTER TABLE dbo.INSTRUCCION
		ADD [MODELO] NVARCHAR(40) NOT NULL
		CONSTRAINT [DF_INSTRUCCION_MODELO] DEFAULT (N'gpt-5-nano');
END;`;

const SQL_CALIBRATION_NANO = `UPDATE dbo.INSTRUCCION
SET [MODELO] = N'gpt-5-nano';`;

const MODEL_RULES: Array<{ flujo: string; uso: string; modelo: string }> = [
	{ flujo: "Operativo", uso: "Clasificación de tipo, módulo, títulos, resúmenes y premisas (`responses.create` a OpenAI).", modelo: "gpt-4.1-nano (`system-prompts.json`)" },
	{ flujo: "Conocimiento", uso: "Respondían con instrucción por tipo, vector stores y PR_GENERAL.", modelo: "`INSTRUCCION.MODELO` (inicial gpt-5-nano)" },
	{ flujo: "Fallback", uso: "Columna vacía, sin instrucción enlazada o error al leer BD.", modelo: "gpt-5-nano (`modeloConversacion`)" },
];

const intro =
	`<div>Se implementó la <b>selección de modelo IA por tipo de consulta</b> en Paty IA: tras clasificar el tipo vía OpenAI ` +
	`(<code>PR_TIPO_CONSULTAS</code>, modelo operativo), la respuesta final tomó el id en <code>INSTRUCCION.MODELO</code> ` +
	`(calibrado a <code>gpt-5-nano</code> en las 13 filas activas de <code>AYUDASCP_IA_STAGING</code>), ` +
	`con trazabilidad en logs y métricas por turno. No se repitió el incidente previo por <code>temperature</code> en modelos GPT-5 sin soporte.</div>`;

export async function buildBodyTK1431662(): Promise<string> {
	const [h3Objetivo, h3Incidente, h3Reglas, h3Datos, h3Solucion, h3Validacion] = await Promise.all([
		h3Iconized("mdi:brain", "Objetivo"),
		h3Iconized("mdi:alert-circle-outline", "Antecedente: temperatura y GPT-5"),
		h3Iconized("mdi:map-marker-path", "Reglas de selección"),
		h3Iconized("mdi:database-cog-outline", "Modelo de datos y calibración"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:check-decagram", "Validación"),
	]);

	const objetivo = noteList(
		await note(
			"mdi:speedometer",
			"Se separó la clasificación operativa (petición OpenAI con modelo de bajo costo) de la respuesta con contexto documental; el modelo de respuesta quedó definido por fila en <code>INSTRUCCION</code> según el <code>itdconsulta</code> devuelto en la clasificación.",
		),
	);

	const incidente = noteList(
		await note(
			"mdi:thermometer-alert",
			"La semana anterior el servicio estuvo caído ~40 min por enviar <code>temperature</code> a modelos GPT-5 sin soporte (p. ej. gpt-5-mini). " +
				"Se corrigió con catálogo <code>modelosSinTemperatura</code> en <code>openai-infomap.json</code> y validación en <code>UlPrompts</code> antes de cada llamada; " +
				"con <code>gpt-5-nano</code> en <code>MODELO</code> no se repitió el error. Catálogo:" +
				(await codeBlock(OPENAI_INFOMAP_SIN_TEMP, "json")),
		),
	);

	const reglas = noteList(
		simpleTable(
			["Flujo", "Uso", "Modelo"],
			MODEL_RULES.map((row) => [row.flujo, row.uso, row.modelo]),
			{ widths: ["18%", "54%", "28%"] },
		),
		await note(
			"mdi:file-cog-outline",
			"En <code>system-prompts.json</code> quedó <code>modeloOperativo</code> = gpt-4.1-nano y <code>modeloConversacion</code> = gpt-5-nano. " +
				"El fallback del JSON <b>sólo aplicó</b> si <code>MODELO</code> estaba vacío o no había instrucción enlazada; con valor en BD prevaleció la columna. Configuración:" +
				(await codeBlock(SYSTEM_PROMPTS_MODELOS, "json")),
		),
	);

	const columnaMode = simpleTable(
		["Columna", "Tipo", "Default", "Uso"],
		[
			[
				"MODELO",
				"NVARCHAR(40) NOT NULL",
				"gpt-5-nano",
				"Id OpenAI de respuesta por tipo; sustituye al fallback del JSON cuando tiene valor.",
			],
		],
		{ widths: ["18%", "22%", "18%", "42%"] },
	);

	const datos = noteList(
		await note(
			"mdi:chart-tree",
			"Se diseñó la columna <code>MODELO</code> en <code>AYUDASCP_IA_STAGING.INSTRUCCION</code> (SSMS):" +
				ticketImg("tk1431662-instruccion-columna-mode.png"),
		),
		await note("mdi:table-column-plus-after", "Definición de la columna:" + columnaMode),
		await note(
			"mdi:code-braces",
			"Migración inicial — solo DDL de la columna (detalle en <i>Cambios en base de datos</i>; el relleno de filas va en calibración):" +
				(await codeBlock(SQL_ADD_MODELO, "sql")),
		),
		await note(
			"mdi:database-sync",
			"Calibración en <code>AYUDASCP_IA_STAGING</code>: un único <code>UPDATE</code> sobre todas las filas. Las 13 instrucciones activas quedaron con <code>MODELO = gpt-5-nano</code> (captura SSMS):" +
				(await codeBlock(SQL_CALIBRATION_NANO, "sql")) +
				ticketImg("tk1431662-instruccion-modelo-calibracion-gpt5-nano.png"),
		),
		await note(
			"mdi:account-clock-outline",
			"La migración de columna la aplicó el <b>ing. Álvaro</b> el <b>01/jun./2026 02:50 p. m.</b> (permisos de alteración). " +
				"Eso retrasó el desarrollo unas <b>6 horas</b> por estar en reunión con la <b>ing. Andrea</b>.",
		),
		await note(
			"mdi:account-key-outline",
			"Posteriormente se solicitó al ingeniero de base de datos un perfil con permisos de <code>ALTER</code>; " +
				"se asignó el usuario correspondiente y, con ello, las migraciones y ajustes de esquema en staging " +
				"pueden ejecutarse de forma más ágil sin depender del <b>ing. Álvaro</b> para cada cambio.",
		),
	);

	const solucion = noteList(
		await note(
			"mdi:source-branch-sync",
			"Se documentó la resolución del modelo por turno:" +
				diagramFasesModelo(),
		),
		await note(
			"mdi:database-cog-outline",
			"Se expuso lectura de <code>MODELO</code> por instrucción y por tipo (<code>TDCONSULTAXINSTRUCCION</code>) antes de <code>responses.create</code>.",
		),
		await note(
			"mdi:code-braces",
			"Tras <code>clasificarConsulta</code> (<code>PR_TIPO_CONSULTAS</code> → OpenAI), la respuesta de conocimiento usó <code>model</code> de la fila enlazada en BD. Se retiró <code>OPENAI_MODEL</code> de <code>local.settings.json</code>.",
		),
		await note(
			"mdi:thermometer",
			"La temperatura se omitió automáticamente en modelos del catálogo sin soporte (incluido gpt-5-nano en <code>MODELO</code>).",
		),
		await note(
			"mdi:chart-bar",
			"Se integraron tokens y costo estimado por turno en el resumen de conversación.",
		),
	);

	const validacion = noteList(
		await note(
			"mdi:check-bold",
			"La respuesta de conocimiento usó <code>MODELO</code> de la fila enlazada al tipo, con registro en el log del turno.",
		),
		await note(
			"mdi:check-bold",
			"Tras el UPDATE, la grilla SSMS en staging mostró las 13 filas con <code>MODELO</code> unificado.",
		),
		await note(
			"mdi:check-bold",
			"<code>modeloConversacion</code> del JSON sólo aplicó como fallback; con <code>MODELO</code> definido prevaleció ese id.",
		),
		await note(
			"mdi:check-bold",
			"No se repitió el error por <code>temperature</code> con gpt-5-nano en <code>MODELO</code>.",
		),
	);

	return (
		intro +
		h3Objetivo +
		objetivo +
		h3Incidente +
		incidente +
		h3Reglas +
		reglas +
		h3Datos +
		datos +
		h3Solucion +
		solucion +
		h3Validacion +
		validacion
	);
}

export const bodyTK1431662: Promise<string> = buildBodyTK1431662();
