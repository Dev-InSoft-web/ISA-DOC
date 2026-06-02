// TK-1431662 — Selección de modelo IA por tipo de consulta.

import { codeBlock, simpleTable, ticketImg } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const MODEL_RULES: Array<{ flujo: string; uso: string; modelo: string }> = [
	{ flujo: "Operativo", uso: "Clasificación de tipo, módulo, títulos, resúmenes, sí/no y extracción corta.", modelo: "gpt-4.1-nano (<code>modeloOperativo</code>)" },
	{ flujo: "Conocimiento", uso: "Respuesta final con documentación, instrucciones por tipo y vector stores.", modelo: "<code>INSTRUCCION.MODELO</code> (default <code>gpt-5-mini</code>)" },
	{ flujo: "Fallback", uso: "Sin instrucción activa o error de lectura en BD.", modelo: "<code>modeloConversacion</code> en <code>system-prompts.json</code>" },
];

const SQL_MODELO = `IF COL_LENGTH(N'dbo.INSTRUCCION', N'MODELO') IS NULL
BEGIN
	ALTER TABLE dbo.INSTRUCCION
		ADD [MODELO] NVARCHAR(40) NOT NULL
		CONSTRAINT [DF_INSTRUCCION_MODELO] DEFAULT (N'gpt-5-mini');
END;

UPDATE dbo.INSTRUCCION
SET [MODELO] = N'gpt-5-mini'
WHERE [MODELO] IS NULL OR LTRIM(RTRIM([MODELO])) = N'';`;

const intro =
	`<div>Se implementó la <b>selección de modelo IA por tipo de consulta</b> en Paty IA: ` +
	`tareas operativas con modelo económico fijo y respuesta final con el valor persistido en ` +
	`<code>INSTRUCCION.MODELO</code>, con trazabilidad en logs y métricas.</div>`;

export async function buildBodyTK1431662(): Promise<string> {
	const [h3Objetivo, h3Reglas, h3Datos, h3Solucion, h3Validacion] = await Promise.all([
		h3Iconized("mdi:brain", "Objetivo"),
		h3Iconized("mdi:map-marker-path", "Reglas de selección"),
		h3Iconized("mdi:database-cog-outline", "Modelo de datos"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:check-decagram", "Validación"),
	]);

	const objetivo = noteList(
		await note(
			"mdi:speedometer",
			"Se separaron tareas operativas (bajo costo y latencia) de la respuesta final con contexto documental, configurando el modelo de respuesta por fila de instrucción en base de datos.",
		),
	);

	const reglas = simpleTable(
		["Flujo", "Uso", "Modelo"],
		MODEL_RULES.map((row) => [row.flujo, row.uso, row.modelo]),
		{ widths: ["18%", "54%", "28%"] },
	);

	const columnaMode = simpleTable(
		["Columna", "Tipo", "Default", "Uso"],
		[
			["<code>MODELO</code>", "<code>NVARCHAR(40)</code> NOT NULL", "<code>gpt-5-mini</code>", "Modelo OpenAI para la respuesta final del tipo de consulta enlazado."],
		],
		{ widths: ["18%", "22%", "18%", "42%"] },
	);

	const datos = noteList(
		await note(
			"mdi:chart-tree",
			"Relación persistida entre catálogo y columna nueva:" +
				ticketImg("tk1431662-instruccion-modelo.jpg"),
		),
		await note("mdi:table-column-plus-after", "Definición de la columna nueva:" + columnaMode),
		await note(
			"mdi:code-braces",
			"Script idempotente aplicado en <code>AYUDASCP_IA</code>:" + (await codeBlock(SQL_MODELO, "sql")),
		),
	);

	const solucion = noteList(
		await note(
			"mdi:source-branch-sync",
			"Fases de selección de modelo en el backend:" + ticketImg("tk1431662-fases-modelo.jpg"),
		),
		await note(
			"mdi:database-cog-outline",
			"Se expusieron <code>TInstruccion.modelo</code>, <code>GetModelo</code> y <code>GetModeloPorTdConsulta</code> para resolver <code>tipo_consulta → TDCONSULTAXINSTRUCCION → INSTRUCCION.MODELO</code> antes de <code>responses.create</code>.",
		),
		await note(
			"mdi:code-braces",
			"En <code>OpenIAServer</code> el modelo de respuesta final se tomó de la instrucción clasificada; los flujos operativos usaron <code>getOperativeModel()</code>. Se retiró <code>OPENAI_MODEL</code> de la configuración local.",
		),
		await note(
			"mdi:thermometer",
			"Se envió <code>temperature</code> sólo cuando <code>modelAllowsTemperature</code> lo permitió según <code>openai-infomap.json</code> (familias <code>gpt-5-*</code> excluidas).",
		),
		await note(
			"mdi:chart-bar",
			"En <code>GET-ResumenConversacion</code> se integraron tokens y costo vía <code>summarizeUsage</code> en <code>UlMetrics</code>.",
		),
	);

	const validacion = noteList(
		await note(
			"mdi:check-bold",
			"La clasificación y extracción operativa se ejecutó con <code>gpt-4.1-nano</code> independiente del modelo de respuesta.",
		),
		await note(
			"mdi:check-bold",
			"La respuesta de conocimiento usó <code>MODELO</code> de la fila <code>INSTRUCCION</code> ligada al <code>tipo_consulta</code> clasificado, con registro de modelo y tokens en el turno.",
		),
		await note(
			"mdi:check-bold",
			"Ante configuración ausente o error de lectura, se aplicó fallback <code>gpt-5-mini</code> desde <code>system-prompts.json</code>.",
		),
	);

	return intro + h3Objetivo + objetivo + h3Reglas + reglas + h3Datos + datos + h3Solucion + solucion + h3Validacion + validacion;
}

export const bodyTK1431662: Promise<string> = buildBodyTK1431662();
