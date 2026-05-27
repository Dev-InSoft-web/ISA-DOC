// TK-1429262 — Evaluación de uso de modelos OpenAI por etapa y tipo de
// consulta en Paty IA. Esta diligencia consolida el análisis técnico de
// viabilidad basado en el código actual del proyecto PatyIA.

import { codeBlock } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se diligencia análisis técnico de viabilidad para evaluar la <b>selección dinámica de modelo OpenAI</b> en Paty IA, tomando como base el código actual del proyecto <code>C:\\Users\\JAGUDELOE\\Documents\\Contapyme\\PatyIA</code>. Este documento es <b>propuesta técnica</b>; no implica implementación ni cambios productivos en esta etapa.</div>`;

const SNIPPET_FLUJO_ENTRADA = `export async function http_insertar_conversacion(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  let controller = new TConversacionesController(request, context);
  let conversacion: TConversacion = TConversacion.JSONToObject(controller.CtxUser.jsonBody);

  const readableStream: ReadableStream = controller.respuestaIA(conversacion, async (finalObj: TConversacion) => {
    controller.tryUpdate(finalObj);
  });

  return {
    body: readableStream,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  };
}`;

const SNIPPET_MODELO_UNICO_RESPONSES = `protected async clasificarConsulta(promptUsuario: string): Promise<string> {
  const response = await (this.openai.responses as any).create({
    model: varEnv("OPENAI_MODEL") || "gpt-4o",
    prompt: { id: varEnv("PR_TIPO_CONSULTAS") },
    input: [{ role: "user", content: promptUsuario }],
    store: false
  });
  return resultado.trim();
}`;

const SNIPPET_MODELO_UNICO_RESPUESTA = `const body = {
  model: varEnv("OPENAI_MODEL") || "gpt-4o",
  input: Obj.prompt,
  stream: true,
  store: true,
  conversation: Obj.hilo,
  prompt: { id: varEnv("PR_GENERAL") },
  ...(instructionsText && { instructions: instructionsText }),
  ...(vectorStoreIds?.length && {
    tools: [{ type: "file_search", vector_store_ids: vectorStoreIds, max_num_results: 3 }]
  }),
};`;

const SNIPPET_CONFIG_ACTUAL = `{
  "PR_TIPO_CONSULTAS": "pmpt_...",
  "PR_GENERAL": "pmpt_...",
  "PR_EXTRACTOR_CONSULTAS": "pmpt_...",
  "PR_CLASIFICADOR_MODULO": "pmpt_...",
  "OPENAI_MODEL": "gpt-5.4"
}`;

export async function buildBodyTK1429262(): Promise<string> {
	const [
		h3Estado,
		h3Evidencia,
		h3Viabilidad,
		h3Comparativa,
		h3Ruta,
		h3BD,
		h3Referencia,
		h3Presupuesto,
		h3Riesgos,
		h3Conclusion,
	] = await Promise.all([
		h3Iconized("mdi:radar", "1) Estado actual del proyecto (cómo funciona hoy)"),
		h3Iconized("mdi:file-code-outline", "2) Evidencia técnica en código (PatyIA)"),
		h3Iconized("mdi:check-decagram-outline", "3) Conclusión de viabilidad"),
		h3Iconized("mdi:compare", "4) Comparativa antes vs propuesta"),
		h3Iconized("mdi:map-marker-path", "5) Mejor camino propuesto (sin implementar)"),
		h3Iconized("mdi:database-cog-outline", "6) Análisis de base de datos (STORAGE, métricas y utilidad)"),
		h3Iconized("mdi:youtube", "7) Referencia recomendada (Harness Engineering)"),
		h3Iconized("mdi:clock-time-four-outline", "8) Presupuesto de tiempos (3 horas)"),
		h3Iconized("mdi:alert-outline", "9) Riesgos y mitigación"),
		h3Iconized("mdi:clipboard-text-outline", "10) Propuesta para aprobación"),
	]);

	const [codeFlujoEntrada, codeModeloUnicoResponses, codeModeloUnicoRespuesta, codeConfigActual] = await Promise.all([
		codeBlock(SNIPPET_FLUJO_ENTRADA, "typescript"),
		codeBlock(SNIPPET_MODELO_UNICO_RESPONSES, "typescript"),
		codeBlock(SNIPPET_MODELO_UNICO_RESPUESTA, "typescript"),
		codeBlock(SNIPPET_CONFIG_ACTUAL, "json"),
	]);

	const estadoActual = noteList(
		await note(
			"mdi:source-branch",
			`El flujo HTTP de conversación entra por <code>PatyIA/src/functions/POST-Conversacion.ts</code>, delega a <code>TConversacionesController.respuestaIA</code> y responde por <b>SSE</b>.`,
		),
		await note(
			"mdi:brain",
			`La orquestación IA está concentrada en <code>PatyIA/src/020 Controller/005 - OpenIAServer.ts</code>, donde se ejecutan: clasificación de tipo de consulta, clasificación de módulo, extracción de consultas y respuesta final al usuario.`,
		),
		await note(
			"mdi:cog-outline",
			`Actualmente se usa <b>un solo modelo global</b> para todas las etapas a través de <code>OPENAI_MODEL</code> (configurado en <code>PatyIA/local.settings.json</code>).`,
		),
		await note(
			"mdi:database-search-outline",
			`La consulta ya incorpora contexto dinámico desde BD (instrucciones y vector stores por tipo de consulta), por lo que existe una base técnica sólida para extender esa lógica a <b>selección dinámica de modelo</b>.`,
		),
	);

	const evidencia = noteList(
		await note(
			"mdi:code-braces",
			`<b>Archivo:</b> <code>PatyIA/src/functions/POST-Conversacion.ts</code><br><b>Fragmento (entrada del flujo):</b><br>${codeFlujoEntrada}`,
		),
		await note(
			"mdi:code-braces-box",
			`<b>Archivo:</b> <code>PatyIA/src/020 Controller/005 - OpenIAServer.ts</code><br><b>Fragmento (modelo global en clasificación):</b><br>${codeModeloUnicoResponses}`,
		),
		await note(
			"mdi:code-braces-box",
			`<b>Archivo:</b> <code>PatyIA/src/020 Controller/005 - OpenIAServer.ts</code><br><b>Fragmento (modelo global en respuesta final):</b><br>${codeModeloUnicoRespuesta}`,
		),
		await note(
			"mdi:file-cog-outline",
			`<b>Archivo:</b> <code>PatyIA/local.settings.json</code><br><b>Configuración actual:</b><br>${codeConfigActual}`,
		),
		await note(
			"mdi:database-edit-outline",
			`<b>Observación clave:</b> los valores <code>PR_TIPO_CONSULTAS</code>, <code>PR_GENERAL</code>, <code>PR_EXTRACTOR_CONSULTAS</code>, <code>PR_CLASIFICADOR_MODULO</code> y <code>OPENAI_MODEL</code> <b>no deberían ser variables de entorno</b>, sino <b>valores dinámicos</b>. Puede resolverse vía <i>hardcode</i> o, preferiblemente, desde <b>SQL</b>: por temas de <b>persistencia y mantenimiento</b>, la información es más simple de trabajar como dato dinámico que como valor quemado en <code>env</code>, evitando redeploy ante cualquier ajuste de prompt o modelo.`,
		),
	);

	const viabilidad = noteList(
		await note(
			"mdi:check-bold",
			`<b>Sí es viable técnicamente</b> implementar selección dinámica de modelo por etapa/tipo de consulta usando la API Responses, porque el modelo ya se envía por request y la construcción del body está centralizada.`,
		),
		await note(
			"mdi:information-outline",
			`El principal trabajo no está en OpenAI Responses, sino en definir una estrategia de configuración, fallback y trazabilidad para evitar complejidad operativa.`,
		),
	);

	const comparativa = await note(
		"mdi:table",
		`<table style="border-collapse:collapse;width:100%;margin-top:0.5rem;font-size:0.9rem;">
		<thead>
		<tr style="background:#80808015;">
		<th style="border:1px solid #80808040;padding:0.4rem;text-align:left;">Aspecto</th>
		<th style="border:1px solid #80808040;padding:0.4rem;text-align:left;">Antes (estado actual)</th>
		<th style="border:1px solid #80808040;padding:0.4rem;text-align:left;">Después (propuesta)</th>
		</tr>
		</thead>
		<tbody>
		<tr>
		<td style="border:1px solid #80808040;padding:0.4rem;">Modelo IA</td>
		<td style="border:1px solid #80808040;padding:0.4rem;">Un único <code>OPENAI_MODEL</code> para clasificación, extracción y respuesta final.</td>
		<td style="border:1px solid #80808040;padding:0.4rem;">Mapa de modelo por <code>ETAPA</code> y/o <code>TIPO_CONSULTA</code> con fallback global.</td>
		</tr>
		<tr>
		<td style="border:1px solid #80808040;padding:0.4rem;">Configuración</td>
		<td style="border:1px solid #80808040;padding:0.4rem;">Variables individuales en <code>local.settings.json</code>.</td>
		<td style="border:1px solid #80808040;padding:0.4rem;">Configuración declarativa versionable (JSON env) y, fase posterior, catálogo en BD.</td>
		</tr>
		<tr>
		<td style="border:1px solid #80808040;padding:0.4rem;">Observabilidad</td>
		<td style="border:1px solid #80808040;padding:0.4rem;">Se guarda <code>modelo_ia</code> final en conversación.</td>
		<td style="border:1px solid #80808040;padding:0.4rem;">Log por etapa: modelo elegido, tokens, latencia y tipo_consulta.</td>
		</tr>
		<tr>
		<td style="border:1px solid #80808040;padding:0.4rem;">Riesgo operativo</td>
		<td style="border:1px solid #80808040;padding:0.4rem;">Bajo (simple) pero sin optimización fina de costo/rendimiento.</td>
		<td style="border:1px solid #80808040;padding:0.4rem;">Controlado por fallback + feature flag + despliegue por fases.</td>
		</tr>
		</tbody>
		</table>`,
	);

	const mejorCamino = noteList(
		await note(
			"mdi:numeric-1-circle-outline",
			`<b>Fase 1 (recomendada para arrancar):</b> parametrización por configuración (sin tocar BD) con mapa <code>etapa -&gt; modelo</code> y fallback a <code>OPENAI_MODEL</code>.`,
		),
		await note(
			"mdi:numeric-2-circle-outline",
			`<b>Fase 2:</b> extender a <code>tipo_consulta -&gt; modelo</code> en el mismo mapa, aprovechando que ya existe clasificación de tipo en el flujo actual.`,
		),
		await note(
			"mdi:numeric-3-circle-outline",
			`<b>Fase 3:</b> trazabilidad por etapa (modelo, tokens, latencia, resultado) para medir impacto real en costo/calidad antes de ampliar cobertura.`,
		),
		await note(
			"mdi:numeric-4-circle-outline",
			`<b>Fase 4 (recomendada):</b> mover el catálogo de <i>prompts</i> y modelo (<code>PR_*</code> y <code>OPENAI_MODEL</code>) a <b>SQL</b> como valores dinámicos administrables, eliminando su dependencia de variables de entorno. Esto simplifica persistencia, mantenimiento y trazabilidad, y permite ajustar prompts/modelo sin redeploy.`,
		),
	);

	const TABLE_STYLE = `border-collapse:collapse;width:100%;margin-top:0.5rem;font-size:0.85rem;`;
	const TH_STYLE = `border:1px solid #80808040;padding:0.4rem;text-align:left;background:#80808015;`;
	const TD_STYLE = `border:1px solid #80808040;padding:0.4rem;vertical-align:top;`;

	const MERMAID_URL = "https://mermaid.ink/img/ZXJEaWFncmFtCiAgICBDT05WRVJTQUNJT04gfHwtLW97IE1FTlNBSkUgOiBjb250aWVuZQogICAgTUVOU0FKRSB8fC0tfHwgTUVOU0FKRV9NRVRSSUNBUyA6IG1pZGUKICAgIENPTlZFUlNBQ0lPTiB7CiAgICAgICAgSU5UX1BLIElDT05WRVJTQUNJT04KICAgICAgICBJTlQgUVRPS0VOUyAiVE9UQUwgY29udmVyc2FjaW9uIgogICAgfQogICAgTUVOU0FKRSB7CiAgICAgICAgSU5UX1BLIElNRU5TQUpFCiAgICAgICAgSU5UX0ZLIElDT05WRVJTQUNJT04KICAgICAgICBWQVJDSEFSKDIwKSBST0wKICAgICAgICBWQVJDSEFSKE1BWCkgQ09OVEVOSURPICJvdXRwdXQiCiAgICAgICAgVkFSQ0hBUihNQVgpIElOUFVUICJOVUVWTyIKICAgIH0KICAgIE1FTlNBSkVfTUVUUklDQVMgewogICAgICAgIElOVF9GSyBJTUVOU0FKRQogICAgICAgIElOVCBUT0tFTlNfSU4KICAgICAgICBJTlQgVE9LRU5TX09VVAogICAgICAgIFZBUkNIQVIoNjApIE1PREVMTwogICAgICAgIFZBUkNIQVIoNDApIEVUQVBBCiAgICAgICAgREVDSU1BTCgxMCw2KSBDT1NUT19BUFJPWAogICAgICAgIFRJTllJTlQgVVRJTCAiLTEvMC8xIgogICAgfQogICAgU1RPUkFHRSB7CiAgICAgICAgSU5UX1BLIElTVE9SQUdFCiAgICAgICAgVkFSQ0hBUig0MCkgVElQTyAidmVjdG9yX3N0b3JlLXByb21wdC1tb2RlbCIKICAgICAgICBWQVJDSEFSKDgwKSBDT05URVhUTyAiUFJfR0VORVJBTCwgT1BFTkFJX01PREVMLi4uIgogICAgICAgIFZBUkNIQVIoMjAwKSBWQUxPUiAiaWQgZXh0ZXJubyBPcGVuQUkiCiAgICAgICAgQklUIEFDVElWTwogICAgfQ==";

	const diagramaRelaciones = `
<div style="text-align:center;margin-top:0.5rem;">
	<a href="${MERMAID_URL}" target="_blank" rel="noopener">
		<img src="${MERMAID_URL}" alt="Diagrama ER propuesto: CONVERSACION, MENSAJE, MENSAJE_METRICAS y STORAGE" style="max-width:100%;height:auto;border:1px solid #80808040;border-radius:4px;background:#fff;padding:0.5rem;" />
	</a>
</div>`;

	const tablaStorage = `
<table style="${TABLE_STYLE}">
<thead><tr>
<th style="${TH_STYLE}">Columna</th>
<th style="${TH_STYLE}">Tipo sugerido</th>
<th style="${TH_STYLE}">Descripción</th>
</tr></thead>
<tbody>
<tr><td style="${TD_STYLE}"><code>ISTORAGE</code></td><td style="${TD_STYLE}">INT PK</td><td style="${TD_STYLE}">Identificador interno.</td></tr>
<tr><td style="${TD_STYLE}"><code>TIPO</code></td><td style="${TD_STYLE}">VARCHAR(40)</td><td style="${TD_STYLE}"><code>vector_store</code>, <code>prompt</code>, <code>model</code>, …</td></tr>
<tr><td style="${TD_STYLE}"><code>CONTEXTO</code></td><td style="${TD_STYLE}">VARCHAR(80)</td><td style="${TD_STYLE}">Etapa o uso: <code>PR_GENERAL</code>, <code>PR_TIPO_CONSULTAS</code>, <code>PR_EXTRACTOR_CONSULTAS</code>, <code>PR_CLASIFICADOR_MODULO</code>, <code>OPENAI_MODEL</code>.</td></tr>
<tr><td style="${TD_STYLE}"><code>VALOR</code></td><td style="${TD_STYLE}">VARCHAR(200)</td><td style="${TD_STYLE}">Identificador o referencia externa de OpenAI.</td></tr>
<tr><td style="${TD_STYLE}"><code>ACTIVO</code></td><td style="${TD_STYLE}">BIT</td><td style="${TD_STYLE}">Permite versionar y activar/desactivar sin borrar.</td></tr>
</tbody>
</table>`;

	const tablaMetricas = `
<table style="${TABLE_STYLE}">
<thead><tr>
<th style="${TH_STYLE}">Columna</th>
<th style="${TH_STYLE}">Tipo sugerido</th>
<th style="${TH_STYLE}">Descripción</th>
</tr></thead>
<tbody>
<tr><td style="${TD_STYLE}"><code>IMENSAJE</code></td><td style="${TD_STYLE}">INT FK</td><td style="${TD_STYLE}">Enlaza con <code>MENSAJE</code> (1:1).</td></tr>
<tr><td style="${TD_STYLE}"><code>TOKENS_IN</code></td><td style="${TD_STYLE}">INT</td><td style="${TD_STYLE}">Tokens del prompt/input enviados a OpenAI.</td></tr>
<tr><td style="${TD_STYLE}"><code>TOKENS_OUT</code></td><td style="${TD_STYLE}">INT</td><td style="${TD_STYLE}">Tokens generados en la respuesta.</td></tr>
<tr><td style="${TD_STYLE}"><code>MODELO</code></td><td style="${TD_STYLE}">VARCHAR(60)</td><td style="${TD_STYLE}">Modelo efectivo usado (<code>gpt-4o-mini</code>, <code>gpt-5</code>, …).</td></tr>
<tr><td style="${TD_STYLE}"><code>ETAPA</code></td><td style="${TD_STYLE}">VARCHAR(40)</td><td style="${TD_STYLE}"><code>clasificacion</code>, <code>extraccion</code>, <code>respuesta</code>, …</td></tr>
<tr><td style="${TD_STYLE}"><code>COSTO_APROX</code></td><td style="${TD_STYLE}">DECIMAL(10,6)</td><td style="${TD_STYLE}">Aproximación por regla de tres sobre tarifa vigente del modelo.</td></tr>
<tr><td style="${TD_STYLE}"><code>UTIL</code></td><td style="${TD_STYLE}">TINYINT</td><td style="${TD_STYLE}">Tri-estado de utilidad (ver tabla siguiente).</td></tr>
</tbody>
</table>`;

	const tablaUtil = `
<table style="${TABLE_STYLE}">
<thead><tr>
<th style="${TH_STYLE}">Valor</th>
<th style="${TH_STYLE}">Significado</th>
<th style="${TH_STYLE}">Interpretación</th>
</tr></thead>
<tbody>
<tr><td style="${TD_STYLE}"><code>-1</code></td><td style="${TD_STYLE}">No útil</td><td style="${TD_STYLE}">El asesor marcó explícitamente que la respuesta no sirvió.</td></tr>
<tr><td style="${TD_STYLE}"><code>0</code></td><td style="${TD_STYLE}">Sin peso (default)</td><td style="${TD_STYLE}">No se evaluó; no debe contar como negativo.</td></tr>
<tr><td style="${TD_STYLE}"><code>1</code></td><td style="${TD_STYLE}">Útil</td><td style="${TD_STYLE}">El asesor marcó explícitamente que la respuesta fue de utilidad.</td></tr>
</tbody>
</table>`;

	const tablaAntesDespues = `
<table style="${TABLE_STYLE}">
<thead><tr>
<th style="${TH_STYLE}">Aspecto</th>
<th style="${TH_STYLE}">Estado actual</th>
<th style="${TH_STYLE}">Propuesta</th>
</tr></thead>
<tbody>
<tr><td style="${TD_STYLE}">Catálogo de recursos OpenAI</td><td style="${TD_STYLE}"><code>VECTOR_STORE</code> sólo para vector stores; prompts y modelo en <code>.env</code>.</td><td style="${TD_STYLE}"><code>STORAGE</code> genérico que aloja vector stores, prompts y modelo.</td></tr>
<tr><td style="${TD_STYLE}">Tokens por mensaje</td><td style="${TD_STYLE}">No se registran; sólo <code>CONVERSACIONES.QTOKENS</code> agrega el total.</td><td style="${TD_STYLE}"><code>MENSAJE_METRICAS.TOKENS_IN</code> / <code>TOKENS_OUT</code> por turno y por etapa.</td></tr>
<tr><td style="${TD_STYLE}">Costo</td><td style="${TD_STYLE}">No se calcula ni estima.</td><td style="${TD_STYLE}"><code>COSTO_APROX</code> por mensaje vía regla de tres sobre la tarifa vigente.</td></tr>
<tr><td style="${TD_STYLE}">Utilidad del mensaje</td><td style="${TD_STYLE}">Bandera binaria, sin distinguir "no evaluado" vs "no útil".</td><td style="${TD_STYLE}"><code>UTIL TINYINT</code> tri-estado (<code>-1 / 0 / 1</code>).</td></tr>
</tbody>
</table>`;

	const analisisBD = noteList(
		await note(
			"mdi:compare-horizontal",
			`<b>Comparativa estado actual vs. propuesta</b>${tablaAntesDespues}`,
		),
		await note(
			"mdi:sitemap-outline",
			`<b>Diagrama de relaciones propuesto</b><br>Visión general de las entidades involucradas y cómo se conectan tras los cambios propuestos:${diagramaRelaciones}`,
		),
		await note(
			"mdi:database-arrow-right-outline",
			`<b>Tabla <code>VECTOR_STORE</code> → <code>STORAGE</code> general:</b> hoy existe una tabla <code>VECTOR_STORE</code> dedicada a <i>vector stores</i> de OpenAI, pero la idea propuesta es generalizarla como tabla <b><code>STORAGE</code></b>, capaz de alojar también los identificadores de prompts (<code>PR_TIPO_CONSULTAS</code>, <code>PR_GENERAL</code>, <code>PR_EXTRACTOR_CONSULTAS</code>, <code>PR_CLASIFICADOR_MODULO</code>) y, en general, cualquier recurso administrable de OpenAI. Cada registro se ubica en el contexto que corresponda (etapa, tipo de consulta, módulo, etc.), centralizando configuración dinámica en un único catálogo.${tablaStorage}`,
		),
		await note(
			"mdi:counter",
			`<b>Tabla de métricas por mensaje:</b> se requiere una tabla nueva (p. ej. <code>MENSAJE_METRICAS</code>) enlazada al mensaje, con columnas <code>TOKENS_IN</code>, <code>TOKENS_OUT</code>, <code>MODELO</code>, <code>ETAPA</code> y un campo <code>COSTO_APROX</code>. El costo se calcula como aproximación (no exacto), aplicando una <b>regla de tres</b> sobre la tarifa vigente del modelo: aunque <i>pricing</i> de OpenAI no se obtiene desde una tabla normalizada, sí es posible mantener una referencia interna por modelo y aproximar el costo de la transacción.${tablaMetricas}`,
		),
		await note(
			"mdi:thumbs-up-down-outline",
			`<b>Campo <code>UTIL</code> como tri-estado:</b> la métrica actual de utilidad debe moverse a la tabla de métricas del mensaje y pasar a ser un valor numérico (<code>TINYINT</code>) con semántica tri-estado. Esto permite distinguir explícitamente "no se evaluó" de "se evaluó como neutro/negativo".${tablaUtil}`,
		),
		await note(
			"mdi:database-alert-outline",
			`<b>Falta persistir el input:</b> actualmente la BD almacena únicamente el <i>output</i> generado por el modelo, pero <b>no el input</b> enviado a OpenAI por etapa. Esto limita auditoría, depuración y re-evaluación con otros modelos. Debe incorporarse el almacenamiento del <code>INPUT</code> (prompt efectivo y/o payload mínimo) en la misma estructura de métricas/mensaje, respetando privacidad y tamaño máximo razonable.`,
		),
		await note(
			"mdi:numeric",
			`<b>Columna <code>QTOKENS</code> en <code>CONVERSACIONES</code>:</b> existe una columna <code>QTOKENS</code> que acumula el <b>total de tokens de la conversación</b>, pero <b>por mensaje no hay seguimiento</b> de los tokens usados. Esto impide medir el costo/consumo real por turno o por etapa (clasificación, extracción, respuesta final) y refuerza la necesidad de la tabla de métricas por mensaje propuesta arriba (<code>TOKENS_IN</code>, <code>TOKENS_OUT</code>, <code>COSTO_APROX</code>).`,
		),
	);

	const referencia = await note(
		"mdi:video-outline",
		`Como parte de la investigación sobre cambios de modelos de IA para optimizar las conversaciones, se recomienda a los asesores ver el siguiente video. Plantea un enfoque por <b>orquestación de múltiples llamadas especializadas</b> (Harness Engineering) que <b>parece ser un mejor enfoque que el actual</b>, en el que una sola conversación se encarga de todo el flujo.<br><br>
		<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#222;">
			<div style="font-weight:bold;margin-bottom:6px;">¿Qué es esto del Harness Engineering? — BettaTech</div>
			<a href="https://www.youtube.com/watch?v=q9Vaoz0hd0U" target="_blank" rel="noopener" style="text-decoration:none;display:inline-block;">
				<img src="https://i.ytimg.com/vi/q9Vaoz0hd0U/hqdefault.jpg" alt="Miniatura del video: ¿Qué es esto del Harness Engineering?" width="480" height="360" style="display:block;border:0;max-width:100%;height:auto;" />
			</a>
			<div style="margin-top:6px;"><a href="https://www.youtube.com/watch?v=q9Vaoz0hd0U" target="_blank" rel="noopener">https://www.youtube.com/watch?v=q9Vaoz0hd0U</a></div>
		</div>`,
	);

	const presupuesto = await note(
		"mdi:clock-outline",
		`<b>Estimación total: 3 horas (180 min)</b> para diseño + actualización documental, sin desarrollo productivo en código de PatyIA.<br>
		<table style="border-collapse:collapse;width:100%;margin-top:0.5rem;font-size:0.9rem;">
		<thead>
		<tr style="background:#80808015;">
		<th style="border:1px solid #80808040;padding:0.4rem;text-align:left;">#</th>
		<th style="border:1px solid #80808040;padding:0.4rem;text-align:left;">Actividad</th>
		<th style="border:1px solid #80808040;padding:0.4rem;text-align:right;">Tiempo</th>
		</tr>
		</thead>
		<tbody>
		<tr>
		<td style="border:1px solid #80808040;padding:0.4rem;">1</td>
		<td style="border:1px solid #80808040;padding:0.4rem;">Lectura y análisis del código de PatyIA (flujo SSE, <code>OpenIAServer</code>, configuración actual).</td>
		<td style="border:1px solid #80808040;padding:0.4rem;text-align:right;">30 min</td>
		</tr>
		<tr>
		<td style="border:1px solid #80808040;padding:0.4rem;">2</td>
		<td style="border:1px solid #80808040;padding:0.4rem;">Diseño de la propuesta de selección dinámica de modelo (mapa por etapa/tipo, fallback, feature flag).</td>
		<td style="border:1px solid #80808040;padding:0.4rem;text-align:right;">40 min</td>
		</tr>
		<tr>
		<td style="border:1px solid #80808040;padding:0.4rem;">3</td>
		<td style="border:1px solid #80808040;padding:0.4rem;">Análisis de BD: <code>VECTOR_STORE</code> → <code>STORAGE</code>, tabla de métricas (<code>TOKENS_IN</code>/<code>TOKENS_OUT</code>, <code>COSTO_APROX</code>), <code>UTIL</code> tri-estado, persistencia de <code>INPUT</code>.</td>
		<td style="border:1px solid #80808040;padding:0.4rem;text-align:right;">50 min</td>
		</tr>
		<tr>
		<td style="border:1px solid #80808040;padding:0.4rem;">4</td>
		<td style="border:1px solid #80808040;padding:0.4rem;">Redacción de viabilidad, comparativa, hoja de ruta por fases y riesgos.</td>
		<td style="border:1px solid #80808040;padding:0.4rem;text-align:right;">30 min</td>
		</tr>
		<tr>
		<td style="border:1px solid #80808040;padding:0.4rem;">5</td>
		<td style="border:1px solid #80808040;padding:0.4rem;">Consolidación, revisión y actualización final de la diligencia del ticket.</td>
		<td style="border:1px solid #80808040;padding:0.4rem;text-align:right;">30 min</td>
		</tr>
		<tr style="background:#80808010;font-weight:600;">
		<td style="border:1px solid #80808040;padding:0.4rem;" colspan="2">Total</td>
		<td style="border:1px solid #80808040;padding:0.4rem;text-align:right;">180 min (3 h)</td>
		</tr>
		</tbody>
		</table>`,
	);

	const riesgos = noteList(
		await note(
			"mdi:alert-decagram-outline",
			`<b>Riesgo de inconsistencia entre etapas:</b> respuestas heterogéneas entre modelos.<br><b>Mitigación:</b> guardrails de formato y fallback a modelo fuerte cuando falle validación.`,
		),
		await note(
			"mdi:cash-fast",
			`<b>Riesgo de ahorro no materializado:</b> usar más modelos no garantiza ahorro si crece el retrabajo.<br><b>Mitigación:</b> tablero de costo/latencia por etapa antes de escalar.`,
		),
		await note(
			"mdi:timer-alert-outline",
			`<b>Riesgo de latencia acumulada:</b> múltiples etapas con modelos distintos pueden aumentar tiempo total.<br><b>Mitigación:</b> límites de timeout por etapa y policy de degradación controlada.`,
		),
	);

	const conclusion = noteList(
		await note(
			"mdi:thumb-up-outline",
			`<b>Recomendación técnica:</b> avanzar por fases, iniciando con parametrización por etapa en configuración y fallback global; no iniciar con cambios en BD de configuración hasta validar métricas reales.`,
		),
		await note(
			"mdi:file-sign",
			`<b>Propuesta para aprobación:</b> aprobar una fase de diseño técnico detallado (sin desarrollo productivo) para definir contrato de configuración, reglas de fallback y esquema mínimo de trazabilidad.`,
		),
		await note(
			"mdi:shield-check-outline",
			`<b>Estado de esta diligencia:</b> análisis concluido como propuesta técnica. No se realizó implementación en código de PatyIA dentro de este ticket.`,
		),
	);

	return intro
		+ h3Estado + estadoActual
		+ h3Evidencia + evidencia
		+ h3Viabilidad + viabilidad
		+ h3Comparativa + comparativa
		+ h3Ruta + mejorCamino
		+ h3BD + analisisBD
		+ h3Referencia + referencia
		+ h3Presupuesto + presupuesto
		+ h3Riesgos + riesgos
		+ h3Conclusion + conclusion;
}

export const bodyTK1429262: Promise<string> = buildBodyTK1429262();
