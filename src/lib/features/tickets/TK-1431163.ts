// TK-1431163 — Integración OpenAI: conservar prompt general + instrucciones por tipo.

import { codeBlock, simpleTable, ticketImg } from "./snippets";
import { diagramCapasOpenai } from "./ticketDiagramAssets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const SNIPPET_VARIABLES = `prompt: {
  id: promptId, // PR_GENERAL
  variables: {
    nombre_usuario: nombreSesion,
    instrucion_tipo: textoInstruccionBdResuelto // soporta {{vars}}
  }
}
// Sin campo instructions en el body`;

const COMPOSITION_ROWS: Array<{ pieza: string; responsabilidad: string }> = [
	{ pieza: "PR_GENERAL", responsabilidad: "Plantilla en OpenAI; el id se resolvió con <code>varEnv('PR_GENERAL')</code> desde <code>local.settings.json</code>. Definía saludo, tono y límites; anexaba el tipo al final vía slot." },
	{ pieza: "Clasificación (operativa)", responsabilidad: "Resolvió el código de tipo (`PASO_A_PASO`, `SALUDO_OTRO`, …) antes de la respuesta." },
	{ pieza: "INSTRUCCION (BD)", responsabilidad: "Aportó el texto por tipo (`PROMPT_<TIPO>`); se inyectó solo en `instrucion_tipo`." },
	{ pieza: "Variables del prompt", responsabilidad: "`nombre_usuario` en la plantilla base; `instrucion_tipo` con el texto de BD (sin prefijos helper)." },
	{ pieza: "Vector stores", responsabilidad: "Se enlazaron por tipo; `file_search` se activó cuando el flujo lo exigió." },
	{ pieza: "Conversación", responsabilidad: "Se persistió el hilo en `conv_*`; el input del turno fue solo el mensaje nuevo." },
];

const intro =
	`<div>Se corrigió la integración de <b>OpenAI Responses</b> en Paty IA: el <b>prompt general</b> (` +
	`PR_GENERAL) dejó de ser sustituido por instrucciones en el body y las reglas por tipo pasaron a ` +
	`<code>prompt.variables.instrucion_tipo</code>, con el nombre en <code>nombre_usuario</code>.</div>`;

export async function buildBodyTK1431163(): Promise<string> {
	const [h3Problema, h3Diag, h3Arq, h3Solucion, h3Validacion] = await Promise.all([
		h3Iconized("mdi:alert-circle-outline", "Problema identificado"),
		h3Iconized("mdi:magnify-scan", "Diagnóstico"),
		h3Iconized("mdi:sitemap", "Arquitectura de capas"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:check-decagram", "Validación"),
	]);

	const problema = noteList(
		await note(
			"mdi:alert-circle-outline",
			"Tras cargar instrucciones por tipo en base de datos, dejó de aplicarse el saludo y el uso del nombre en el primer mensaje cuando existía instrucción para el <code>itdconsulta</code> clasificado.",
		),
		await note(
			"mdi:file-document-outline",
			"En Responses API, enviar <code>prompt.id</code> junto con <code>instructions</code> en el body hizo que <code>instructions</code> <b>reemplazara</b> la plantilla PR_GENERAL en lugar de complementarla.",
		),
		await note(
			"mdi:account-question-outline",
			"Problema adicional en QA: los ejemplos de instrucciones por tipo (p. ej. <code>SALUDO_OTRO</code> en BD) venían sin nombre, y al mandar prioridad a la instrucción específica el modelo repetía saludos genéricos aunque <code>nombre_usuario</code> sí llegara en PR_GENERAL. Se añadió sustitución de placeholders <code>{{var}}</code> en el texto antes de <code>instrucion_tipo</code> (<code>resolveUserNameInText</code>, p. ej. <code>{{nombre_usuario}}</code>) y un flujo <code>localmd</code> para probar prompts locales sin depender solo de la carga en BD.",
		),
	);

	const diag = noteList(
		await note(
			"mdi:layers-off-outline",
			"Sin <code>instructions</code> en el body, el template aplicaba completo (saludo y <code>{{nombre_usuario}}</code>). Al enviar el texto por tipo como <code>instructions</code>, se opacaron las reglas globales.",
		),
		await note(
			"mdi:tag-text-outline",
			"Se requirió trazabilidad por <code>tipo_consulta</code>, instrucciones, vector stores y modelo en logs y métricas del turno.",
		),
	);

	const composicion = simpleTable(
		["Pieza", "Responsabilidad"],
		COMPOSITION_ROWS.map((row) => [row.pieza, row.responsabilidad]),
		{ widths: ["28%", "72%"] },
	);

	const arq = noteList(
		await note(
			"mdi:chart-tree",
			"Se documentó el flujo por turno: clasificación → BD → variables del prompt → request sin <code>instructions</code>:" +
				diagramCapasOpenai(),
		),
	);

	const solucion = noteList(
		await note(
			"mdi:format-vertical-align-bottom",
			"Se anexaron las reglas del tipo al final del mensaje de sistema mediante <code>{{instrucion_tipo}}</code> (tras <code>---</code> en PR_GENERAL v13), sin sustituir el comportamiento base de Paty." +
				ticketImg("tk1431163-pr-general-slot-final.png"),
		),
		await note(
			"mdi:code-braces",
			"Se eliminó <code>instructions</code> del body; nombre e instrucción por tipo quedaron únicamente en <code>prompt.variables</code>:" +
				(await codeBlock(SNIPPET_VARIABLES, "typescript")),
		),
		await note(
			"mdi:account-outline",
			"Se resolvió <code>{{nombre_usuario}}</code> dentro del texto de BD (<code>resolveUserNameInText</code>) antes de armar <code>instrucion_tipo</code>; el saludo y la apertura con nombre quedaron a cargo de PR_GENERAL, no de prefijos en código.",
		),
		await note(
			"mdi:broom",
			"Se retiraron los <code>helpers</code> de <code>system-prompts.json</code> (<code>personalizacionNombre</code>, <code>saludoOtroExtra</code>, <code>separadorInstrucciones</code>): eran redundantes tras v13 y duplicaban tokens en cada turno.",
		),
		await note(
			"mdi:database-search-outline",
			"El contexto por tipo siguió resolviéndose desde BD (instrucciones, MODELO y vector stores); la búsqueda en archivos se activó solo cuando el flujo lo requirió.",
		),
	);

	const validacion = noteList(
		await note(
			"mdi:check-bold",
			"En la conversación de prueba <code>1806</code> el body dejó de incluir <code>instructions</code>; la respuesta recuperó saludo y nombre con la guía <code>PASO_A_PASO</code>.",
		),
		await note(
			"mdi:check-bold",
			"En consultas documentales se mantuvieron reglas globales y vector stores del tipo clasificado.",
		),
		await note(
			"mdi:check-bold",
			"La conversación <code>iconversacion = 1851</code> pasó la prueba de saludo: con <code>{{nombre_usuario}}</code> quemado en el texto de <code>instrucion_tipo</code> (antes del request), la respuesta incluyó el nombre en la apertura.",
		),
		await note(
			"mdi:timeline-check-outline",
			"Pendiente de validar en BD: se propuso incluir <code>{{nombre_usuario}}</code> en todos los ejemplos de las instrucciones por tipo y comprobar si con ello se extinguen los errores de formato (saludos genéricos u omisión del nombre).",
		),
	);

	return intro + h3Problema + problema + h3Diag + diag + h3Arq + composicion + arq + h3Solucion + solucion + h3Validacion + validacion;
}

export const bodyTK1431163: Promise<string> = buildBodyTK1431163();
