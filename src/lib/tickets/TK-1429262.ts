// TK-1429262 — Evaluación de uso de modelos OpenAI por etapa y tipo de
// consulta en Paty IA. Esta diligencia consolida el análisis técnico de
// viabilidad basado en el código actual del proyecto PatyIA.

import { codeBlock, img } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se diligencia el análisis técnico de viabilidad para la <b>selección dinámica de modelo OpenAI</b> en Paty IA, sobre el código actual del proyecto <code>C:\\Users\\JAGUDELOE\\Documents\\Contapyme\\PatyIA</code>. Es una propuesta técnica; no incluye implementación ni cambios productivos.</div>`;

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
		h3Iconized("mdi:radar", "1) Estado actual del proyecto"),
		h3Iconized("mdi:file-code-outline", "2) Evidencia técnica en código (PatyIA)"),
		h3Iconized("mdi:check-decagram-outline", "3) Conclusión de viabilidad"),
		h3Iconized("mdi:compare", "4) Comparativa antes vs propuesta"),
		h3Iconized("mdi:map-marker-path", "5) Mejor camino propuesto"),
		h3Iconized("mdi:database-cog-outline", "6) Análisis de base de datos"),
		h3Iconized("mdi:youtube", "7) Recurso de referencia: Harness Engineering"),
		h3Iconized("mdi:clock-time-four-outline", "8) Presupuesto de tiempos"),
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
			`La consulta ya incorpora contexto dinámico desde BD (instrucciones y vector stores por tipo de consulta), lo que facilita extender esa lógica a <b>selección dinámica de modelo</b>.`,
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

	const TABLE_STYLE = `border-collapse:collapse;width:100%;margin-top:0.5rem;font-size:0.85rem;`;
	const TH_STYLE = `border:1px solid #80808040;padding:0.4rem;text-align:left;background:#80808015;`;
	const TD_STYLE = `border:1px solid #80808040;padding:0.4rem;vertical-align:top;`;

	const comparativa = await note(
		"mdi:table",
		`<table style="${TABLE_STYLE}">
		<thead><tr>
		<th style="${TH_STYLE}">Área</th>
		<th style="${TH_STYLE}">Aspecto</th>
		<th style="${TH_STYLE}">Antes (estado actual)</th>
		<th style="${TH_STYLE}">Después (propuesta)</th>
		</tr></thead>
		<tbody>
		<tr><td style="${TD_STYLE}" rowspan="4"><b>Flujo IA</b></td><td style="${TD_STYLE}">Modelo IA</td><td style="${TD_STYLE}">Un único <code>OPENAI_MODEL</code> para clasificación, extracción y respuesta final.</td><td style="${TD_STYLE}">Mapa de modelo por <code>ETAPA</code> y/o <code>TIPO_CONSULTA</code> con fallback global.</td></tr>
		<tr><td style="${TD_STYLE}">Configuración</td><td style="${TD_STYLE}">Variables individuales en <code>local.settings.json</code>.</td><td style="${TD_STYLE}">Configuración declarativa versionable (JSON env) y, fase posterior, catálogo en BD.</td></tr>
		<tr><td style="${TD_STYLE}">Observabilidad</td><td style="${TD_STYLE}">Se guarda <code>modelo_ia</code> final en conversación.</td><td style="${TD_STYLE}">Log por etapa: modelo elegido, tokens, latencia y tipo_consulta.</td></tr>
		<tr><td style="${TD_STYLE}">Riesgo operativo</td><td style="${TD_STYLE}">Bajo (simple) pero sin optimización fina de costo/rendimiento.</td><td style="${TD_STYLE}">Controlado por fallback + feature flag + despliegue por fases.</td></tr>
		<tr><td style="${TD_STYLE}" rowspan="4"><b>Base de datos</b></td><td style="${TD_STYLE}">Catálogo de recursos OpenAI</td><td style="${TD_STYLE}"><code>VECTOR_STORE</code> sólo para vector stores; prompts y modelo en <code>.env</code>.</td><td style="${TD_STYLE}"><code>RECURSO_OPENAI</code> genérico que referencia por id cualquier recurso de OpenAI (vector stores, prompts, modelos, chats, etc.) con su nombre asociado.</td></tr>
		<tr><td style="${TD_STYLE}">Tokens por mensaje</td><td style="${TD_STYLE}">No se registran; sólo <code>CONVERSACIONES.QTOKENS</code> agrega el total.</td><td style="${TD_STYLE}"><code>MENSAJE_METRICAS.TOKENS_IN</code> / <code>TOKENS_OUT</code> por turno y por etapa.</td></tr>
		<tr><td style="${TD_STYLE}">Costo</td><td style="${TD_STYLE}">No se calcula ni estima.</td><td style="${TD_STYLE}"><code>COSTO_APROX</code> por mensaje vía regla de tres sobre la tarifa vigente.</td></tr>
		<tr><td style="${TD_STYLE}">Utilidad del mensaje</td><td style="${TD_STYLE}">Bandera binaria, sin distinguir "no evaluado" vs "no útil".</td><td style="${TD_STYLE}"><code>UTIL TINYINT</code> tri-estado (<code>-1 / 0 / 1</code>).</td></tr>
		</tbody>
		</table>`,
	);

	const diagramaFases = img("tk1429262-mermaid-hoja-de-ruta.png", 720);

	const tablaFases = `
<table style="${TABLE_STYLE}">
<thead><tr>
<th style="${TH_STYLE}">Fase</th>
<th style="${TH_STYLE}">Cambio principal</th>
<th style="${TH_STYLE}">¿Toca código?</th>
<th style="${TH_STYLE}">¿Toca BD?</th>
<th style="${TH_STYLE}">¿Reversible?</th>
<th style="${TH_STYLE}">Esfuerzo</th>
</tr></thead>
<tbody>
<tr><td style="${TD_STYLE}"><b>1</b></td><td style="${TD_STYLE}">Mapa <code>etapa → modelo</code> + fallback global.</td><td style="${TD_STYLE}">Sí (mínimo)</td><td style="${TD_STYLE}">No</td><td style="${TD_STYLE}">Sí (toggle)</td><td style="${TD_STYLE}">Bajo</td></tr>
<tr><td style="${TD_STYLE}"><b>2</b></td><td style="${TD_STYLE}">Extiende a <code>etapa + tipo_consulta → modelo</code> reutilizando el clasificador existente.</td><td style="${TD_STYLE}">Sí</td><td style="${TD_STYLE}">No</td><td style="${TD_STYLE}">Sí (toggle)</td><td style="${TD_STYLE}">Bajo</td></tr>
<tr><td style="${TD_STYLE}"><b>3</b></td><td style="${TD_STYLE}">Trazabilidad por etapa: modelo, tokens, latencia, resultado, costo aproximado.</td><td style="${TD_STYLE}">Sí</td><td style="${TD_STYLE}">Sí (<code>MENSAJE_METRICAS</code>)</td><td style="${TD_STYLE}">Sí (deja de escribir)</td><td style="${TD_STYLE}">Medio</td></tr>
<tr><td style="${TD_STYLE}"><b>4</b></td><td style="${TD_STYLE}">Mueve <code>PR_*</code> y <code>OPENAI_MODEL</code> a SQL en <code>RECURSO_OPENAI</code>; sin redeploy para ajustar.</td><td style="${TD_STYLE}">Sí</td><td style="${TD_STYLE}">Sí (<code>RECURSO_OPENAI</code>)</td><td style="${TD_STYLE}">Sí (vuelve a env)</td><td style="${TD_STYLE}">Medio</td></tr>
</tbody>
</table>`;

	const mejorCamino = noteList(
		await note(
			"mdi:map-marker-path",
			`<b>Hoja de ruta visual</b><br>Las fases avanzan de menor a mayor impacto. <span style="color:#1976d2;">Azul</span>: cambios solo en código/configuración. <span style="color:#ef6c00;">Naranja</span>: cambios también en base de datos.${diagramaFases}`,
		),
		await note(
			"mdi:table",
			`<b>Comparativa de fases</b>${tablaFases}`,
		),
		await note(
			"mdi:numeric-1-circle-outline",
			`<b>Fase 1:</b> parametrización por configuración (sin tocar BD) con mapa <code>etapa -&gt; modelo</code> y fallback a <code>OPENAI_MODEL</code>. Es el punto de arranque.`,
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
			`<b>Fase 4:</b> mover el catálogo de <i>prompts</i> y modelo (<code>PR_*</code> y <code>OPENAI_MODEL</code>) a <b>SQL</b> como valores dinámicos administrables. Quita la dependencia de variables de entorno y permite ajustar prompts/modelo sin redeploy.`,
		),
	);

	const diagramaRelaciones = img("tk1429262-mermaid-er-recursos.png", 720);

	const tablaStorage = `
<table style="${TABLE_STYLE}">
<thead><tr>
<th style="${TH_STYLE}">Columna</th>
<th style="${TH_STYLE}">Tipo sugerido</th>
<th style="${TH_STYLE}">Descripción</th>
</tr></thead>
<tbody>
<tr><td style="${TD_STYLE}"><code>IRECURSO</code></td><td style="${TD_STYLE}">INT PK</td><td style="${TD_STYLE}">Identificador interno.</td></tr>
<tr><td style="${TD_STYLE}"><code>NOMBRE</code></td><td style="${TD_STYLE}">VARCHAR(80)</td><td style="${TD_STYLE}">Alias humano del recurso (páginas de OpenAI no muestran un nombre legible, este sirve para administración interna).</td></tr>
<tr><td style="${TD_STYLE}"><code>TIPO</code></td><td style="${TD_STYLE}">VARCHAR(40)</td><td style="${TD_STYLE}"><code>vector_store</code>, <code>prompt</code>, <code>model</code>, <code>chat</code>, …</td></tr>
<tr><td style="${TD_STYLE}"><code>CONTEXTO</code></td><td style="${TD_STYLE}">VARCHAR(80)</td><td style="${TD_STYLE}">Etapa o uso: <code>PR_GENERAL</code>, <code>PR_TIPO_CONSULTAS</code>, <code>PR_EXTRACTOR_CONSULTAS</code>, <code>PR_CLASIFICADOR_MODULO</code>, <code>OPENAI_MODEL</code>.</td></tr>
<tr><td style="${TD_STYLE}"><code>VALOR</code></td><td style="${TD_STYLE}">VARCHAR(200)</td><td style="${TD_STYLE}">Identificador externo de OpenAI (id del vector store, prompt, modelo, chat, etc.).</td></tr>
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
<tr><td style="${TD_STYLE}"><code>UTIL</code></td><td style="${TD_STYLE}">TINYINT</td><td style="${TD_STYLE}">Tri-estado de utilidad. El detalle de valores está en la siguiente tabla.</td></tr>
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
<tr><td style="${TD_STYLE}"><code>0</code></td><td style="${TD_STYLE}">Sin peso (por defecto)</td><td style="${TD_STYLE}">No se evaluó; no debe contar como negativo.</td></tr>
<tr><td style="${TD_STYLE}"><code>1</code></td><td style="${TD_STYLE}">Útil</td><td style="${TD_STYLE}">El asesor marcó explícitamente que la respuesta fue de utilidad.</td></tr>
</tbody>
</table>`;

	const analisisBD = noteList(
		await note(
			"mdi:sitemap-outline",
			`<b>Diagrama de relaciones propuesto</b><br>Esquema con las entidades involucradas y sus relaciones tras los cambios:${diagramaRelaciones}`,
		),
		await note(
			"mdi:database-arrow-right-outline",
			`<b>Tabla <code>VECTOR_STORE</code> → <code>RECURSO_OPENAI</code>:</b> hoy <code>VECTOR_STORE</code> está dedicada exclusivamente a los <i>vector stores</i> de OpenAI. Se propone generalizarla como <b><code>RECURSO_OPENAI</code></b>: un catálogo que referencia <b>por id</b> cualquier recurso de OpenAI (vector stores, prompts, modelos, chats, etc.) y guarda además un <code>NOMBRE</code> con el alias humano del recurso para administración interna. Cada registro queda ubicado en el contexto que le corresponda (etapa, tipo de consulta, módulo, etc.).${tablaStorage}`,
		),
		await note(
			"mdi:counter",
			`<b>Tabla de métricas por mensaje:</b> se requiere una tabla nueva, <code>MENSAJE_METRICAS</code>, enlazada al mensaje, con columnas <code>TOKENS_IN</code>, <code>TOKENS_OUT</code>, <code>MODELO</code>, <code>ETAPA</code> y <code>COSTO_APROX</code>. El costo es una aproximación por regla de tres sobre la tarifa vigente del modelo: el <i>pricing</i> de OpenAI no se obtiene desde una tabla normalizada, pero alcanza con mantener una referencia interna por modelo para estimar el costo de la transacción.${tablaMetricas}`,
		),
		await note(
			"mdi:thumbs-up-down-outline",
			`<b>Campo <code>UTIL</code> como tri-estado:</b> la métrica actual de utilidad se mueve a la tabla de métricas del mensaje y pasa a ser numérica (<code>TINYINT</code>) con semántica tri-estado. Así se distingue "no se evaluó" de "se evaluó como no útil".${tablaUtil}`,
		),
		await note(
			"mdi:database-alert-outline",
			`<b>Falta persistir el input:</b> hoy la BD guarda solo el <i>output</i> generado por el modelo, no el <i>input</i> enviado a OpenAI por etapa. Esto limita auditoría, depuración y re-evaluación con otros modelos. Conviene guardar también el <code>INPUT</code> (prompt efectivo o payload mínimo) junto a las métricas del mensaje.`,
		),
		await note(
			"mdi:numeric",
			`<b>Columna <code>QTOKENS</code> en <code>CONVERSACIONES</code>:</b> existe y acumula el <b>total de tokens de la conversación</b>, pero <b>no hay seguimiento por mensaje</b>. No es posible saber cuántos tokens consumió cada turno o etapa (clasificación, extracción, respuesta final). Es otra razón para sumar la tabla de métricas por mensaje (<code>TOKENS_IN</code>, <code>TOKENS_OUT</code>, <code>COSTO_APROX</code>).`,
		),
	);

	const referencia = await note(
		"mdi:video-outline",
		`Durante el análisis se encontró este video. Plantea un enfoque por <b>orquestación de múltiples llamadas especializadas</b> (Harness Engineering) que luce más adecuado que el actual, donde una sola conversación se encarga de todo el flujo. Vale la pena revisarlo con el equipo.<br><br>
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
		<td style="border:1px solid #80808040;padding:0.4rem;">Análisis de BD: <code>VECTOR_STORE</code> → <code>RECURSO_OPENAI</code>, tabla de métricas (<code>TOKENS_IN</code>/<code>TOKENS_OUT</code>, <code>COSTO_APROX</code>), <code>UTIL</code> tri-estado, persistencia de <code>INPUT</code>.</td>
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
			`<b>Recomendación técnica:</b> avanzar por fases. Empezar con parametrización por etapa en configuración y fallback global, y dejar los cambios en BD de configuración para cuando haya métricas reales que los justifiquen.`,
		),
		await note(
			"mdi:file-sign",
			`<b>Propuesta para aprobación:</b> aprobar una fase de diseño técnico detallado (sin desarrollo productivo) para definir el contrato de configuración, las reglas de fallback y el esquema mínimo de trazabilidad.`,
		),
		await note(
			"mdi:shield-check-outline",
			`<b>Estado de esta diligencia:</b> análisis cerrado como propuesta técnica. No hubo cambios en código de PatyIA dentro de este ticket.`,
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
