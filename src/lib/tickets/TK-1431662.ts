// TK-1431662 — Selección de modelo IA por tipo de consulta.

import { codeBlock, simpleTable, ticketImg } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const SYSTEM_PROMPTS_MODELOS = `{
	"modeloOperativo": "gpt-4.1-nano",
	"modeloConversacion": "gpt-5-mini"
}`;

const OPENAI_INFOMAP_SIN_TEMP =
	`{"modelosSinTemperatura":["gpt-5","gpt-5-2025-08-07","gpt-5-mini","gpt-5-mini-2025-08-07","gpt-5-nano","gpt-5-nano-2025-08-07","gpt-5-pro","gpt-5-pro-2025-10-06","gpt-5-codex","gpt-5.5","gpt-5.5-2026-04-23","gpt-5.5-pro","gpt-5.5-pro-2026-04-23","gpt-5.4-pro","gpt-5.4-pro-2026-03-05","gpt-5.3-codex","gpt-5.2-pro","gpt-5.2-pro-2025-12-11","gpt-5.2-codex","gpt-5.1-codex","gpt-5.1-codex-max","gpt-5.1-codex-mini"]}`;

const SQL_MODELO = `IF COL_LENGTH(N'dbo.INSTRUCCION', N'MODELO') IS NULL
BEGIN
	ALTER TABLE dbo.INSTRUCCION
		ADD [MODELO] NVARCHAR(40) NOT NULL
		CONSTRAINT [DF_INSTRUCCION_MODELO] DEFAULT (N'gpt-5-mini');
END;

UPDATE dbo.INSTRUCCION
SET [MODELO] = N'gpt-5-mini'
WHERE [MODELO] IS NULL OR LTRIM(RTRIM([MODELO])) = N'';`;

const MODEL_RULES: Array<{ flujo: string; uso: string; modelo: string }> = [
	{ flujo: "Operativo", uso: "Clasificación de tipo, módulo, títulos, resúmenes, sí/no y extracción corta.", modelo: "gpt-4.1-nano (configuración operativa)" },
	{ flujo: "Conocimiento", uso: "Respuesta final con documentación, instrucciones por tipo y vector stores.", modelo: "Valor en columna MODELO de INSTRUCCION" },
	{ flujo: "Fallback", uso: "Columna MODELO vacía, sin instrucción enlazada al tipo o error al leer BD.", modelo: "gpt-5-mini (modelo de conversación en system-prompts.json)" },
];

const intro =
	`<div>Se implementó la <b>selección de modelo IA por tipo de consulta</b> en Paty IA: ` +
	`tareas operativas con modelo económico fijo y respuesta final con el valor persistido en ` +
	`la columna MODELO de INSTRUCCION, con trazabilidad en logs y métricas. ` +
	`También se cerró el incidente de la semana anterior (~40 min de indisponibilidad por enviar ` +
	`temperatura a modelos GPT-5 sin soporte, en particular gpt-5-mini).</div>`;

export async function buildBodyTK1431662(): Promise<string> {
	const [h3Objetivo, h3Incidente, h3Reglas, h3Datos, h3Solucion, h3Validacion] = await Promise.all([
		h3Iconized("mdi:brain", "Objetivo"),
		h3Iconized("mdi:alert-circle-outline", "Antecedente: temperatura y GPT-5"),
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

	const incidente = noteList(
		await note(
			"mdi:thermometer-alert",
			"La semana anterior el servicio estuvo caído ~40 min por enviar temperatura a gpt-5-mini y otros GPT-5 sin soporte. " +
				"Se corrigió con un catálogo central de modelos sin temperatura en openai-infomap.json y validación en UlPrompts " +
				"antes de cada llamada, omitiendo el parámetro en conversación y métricas; al calibrar MODELO en BD con un id de esa lista " +
				"(familia GPT-5 completa, incluidas variantes con fecha), tampoco se envía aunque exista temperatura de conversación en system-prompts.json. Catálogo:" +
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
			"En system-prompts.json quedaron los modelos acordados en reunión: gpt-4.1-nano para operativo y gpt-5-mini como modelo de conversación. " +
				"Este último <b>sólo aplica como fallback</b>: no sustituye un valor ya guardado en MODELO; se usa cuando la columna quedó vacía, " +
				"no hay instrucción enlazada al tipo clasificado o falla la lectura en BD. El default SQL gpt-5-mini en la columna es independiente " +
				"(rellena filas en migración); la calibración manual en MODELO prevalece sobre el JSON. Valores acordados en reunión:" +
				(await codeBlock(SYSTEM_PROMPTS_MODELOS, "json")),
		),
	);

	const columnaMode = simpleTable(
		["Columna", "Tipo", "Default", "Uso"],
		[
			[
				"MODELO",
				"NVARCHAR(40) NOT NULL",
				"gpt-5-mini",
				"Modelo OpenAI por tipo de consulta; si tiene valor, reemplaza al fallback del JSON.",
			],
		],
		{ widths: ["18%", "22%", "18%", "42%"] },
	);

	const datos = noteList(
		await note(
			"mdi:chart-tree",
			"Columna nueva MODELO en AYUDASCP_IA_STAGING.INSTRUCCION (diseño en SSMS):" +
				ticketImg("tk1431662-instruccion-columna-mode.png"),
		),
		await note(
			"mdi:table-eye",
			"Tras el script, las 13 instrucciones activas quedaron calibradas con gpt-5-mini en MODELO:" +
				ticketImg("tk1431662-instruccion-modelo-calibracion.png"),
		),
		await note("mdi:table-column-plus-after", "Definición de la columna nueva:" + columnaMode),
		await note(
			"mdi:code-braces",
			"Script idempotente aplicado en AYUDASCP_IA (resumen; el lote completo está en Cambios en base de datos al pie):" +
				(await codeBlock(SQL_MODELO, "sql")),
		),
		await note(
			"mdi:account-clock-outline",
			"Parte de la ejecución en BD la realizó el <b>ing. Álvaro</b> el <b>01/jun./2026 02:50 p. m.</b>, " +
				"porque no cuento con permisos de alteración en ese entorno. " +
				"Eso retrasó el desarrollo unas <b>6 horas</b>: en la mañana hubo reunión con la <b>ing. Andrea</b> " +
				"y fue necesario esperar a que el ing. Álvaro regresara del almuerzo para aplicar los ajustes en BD.",
		),
	);

	const solucion = noteList(
		await note(
			"mdi:source-branch-sync",
			"Fases de selección de modelo en el backend:" + ticketImg("tk1431662-fases-modelo.jpg"),
		),
		await note(
			"mdi:database-cog-outline",
			"Se expusieron lectura de modelo por instrucción y por tipo de consulta (tipo → relación → MODELO) antes de crear la respuesta en OpenAI.",
		),
		await note(
			"mdi:code-braces",
			"La respuesta final tomó el modelo de la instrucción clasificada; las tareas operativas usaron el modelo operativo fijo. " +
				"Se retiró la variable de entorno OPENAI_MODEL de la configuración local.",
		),
		await note(
			"mdi:thermometer",
			"La temperatura se envía solo si el modelo efectivo la admite, evitando repetir el incidente al calibrar tipos con GPT-5 en BD.",
		),
		await note(
			"mdi:chart-bar",
			"En el resumen de conversación se integraron tokens y costo estimado por turno.",
		),
	);

	const validacion = noteList(
		await note(
			"mdi:check-bold",
			"La clasificación y extracción operativa se ejecutó con gpt-4.1-nano independiente del modelo de respuesta.",
		),
		await note(
			"mdi:check-bold",
			"La respuesta de conocimiento usó MODELO de la fila INSTRUCCION ligada al tipo clasificado, con registro de modelo y tokens en el turno.",
		),
		await note(
			"mdi:check-bold",
			"gpt-5-mini del JSON se usó únicamente como fallback (columna vacía, sin instrucción o error de lectura); con MODELO definido en la fila, prevaleció ese id.",
		),
		await note(
			"mdi:check-bold",
			"Con gpt-5-mini u otro modelo del catálogo sin temperatura en MODELO, las llamadas a OpenAI se ejecutaron sin temperature (sin error 400 por parámetro no soportado).",
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
