// TK-1429262 — Evaluación de uso de modelos OpenAI por etapa y tipo de
// consulta en Paty IA. Esta diligencia consolida el análisis técnico de
// viabilidad basado en el código actual del proyecto PatyIA.

import { codeBlock, img, imgFull } from "./snippets";
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
	] = await Promise.all([
		h3Iconized("mdi:radar", "1) Estado actual del proyecto"),
		h3Iconized("mdi:file-code-outline", "2) Evidencia técnica en código (PatyIA)"),
		h3Iconized("mdi:check-decagram-outline", "3) Conclusión de viabilidad"),
		h3Iconized("mdi:compare", "4) Comparativa antes vs propuesta"),
		h3Iconized("mdi:map-marker-path", "5) Mejor camino propuesto"),
		h3Iconized("mdi:database-cog-outline", "6) Análisis de base de datos"),
		h3Iconized("mdi:youtube", "7) Recurso de referencia: Harness Engineering"),
		h3Iconized("mdi:clock-time-four-outline", "8) Presupuesto de tiempos"),
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
		<tr><td style="${TD_STYLE}" rowspan="3"><b>Flujo IA</b></td><td style="${TD_STYLE}">Modelo IA</td><td style="${TD_STYLE}">Un único <code>OPENAI_MODEL</code> para clasificación, extracción y respuesta final.</td><td style="${TD_STYLE}">Mapa de modelo por <code>TIPO_CONSULTA</code> con fallback global.</td></tr>
		<tr><td style="${TD_STYLE}">Configuración</td><td style="${TD_STYLE}">Variables individuales en <code>local.settings.json</code>.</td><td style="${TD_STYLE}">Catálogo en BD.</td></tr>
		<tr><td style="${TD_STYLE}">Observabilidad</td><td style="${TD_STYLE}">Se guarda <code>modelo_ia</code> final en conversación.</td><td style="${TD_STYLE}">Log por etapa: modelo elegido, tokens, latencia y tipo_consulta.</td></tr>
		<tr><td style="${TD_STYLE}" rowspan="3"><b>Base de datos</b></td><td style="${TD_STYLE}">Catálogo de recursos OpenAI</td><td style="${TD_STYLE}"><code>VECTOR_STORE</code> sólo para vector stores; prompts y modelo en <code>local.settings.json</code>.</td><td style="${TD_STYLE}"><code>RECURSO_OPENAI</code> genérico que referencia por id cualquier recurso de OpenAI (vector stores, prompts, modelos, chats, etc.) con su nombre asociado.</td></tr>
		<tr><td style="${TD_STYLE}">Tokens por mensaje</td><td style="${TD_STYLE}">No se registran; sólo <code>CONVERSACIONES.QTOKENS</code> agrega el total.</td><td style="${TD_STYLE}"><code>MENSAJE_METRICAS.TOKENS_IN</code> / <code>TOKENS_OUT</code> por turno y por etapa.</td></tr>
		<tr><td style="${TD_STYLE}">Costo</td><td style="${TD_STYLE}">No se calcula ni estima.</td><td style="${TD_STYLE}"><code>COSTO_APROX</code> por mensaje vía regla de tres sobre la tarifa vigente.</td></tr>
		</tbody>
		</table>`,
	);

	const diagramaFases = imgFull("tk1429262-mermaid-hoja-de-ruta.png");

	const INPUT_BOX = `background:#f5f7fa;border-left:3px solid #1976d2;padding:0.5rem 0.75rem;margin:0.5rem 0;font-family:Consolas,Menlo,monospace;font-size:0.85rem;white-space:pre-wrap;`;
	const OUTPUT_BOX = `background:#f4faf4;border-left:3px solid #2e7d32;padding:0.5rem 0.75rem;margin:0.5rem 0;font-family:Consolas,Menlo,monospace;font-size:0.85rem;white-space:pre-wrap;`;

	const viajePorFases = `
<div style="margin-top:0.5rem;">
	<div><b>Entrada fija del asesor</b></div>
	<div style="${INPUT_BOX}">"Liquidación de retención en la fuente por servicios técnicos para un proveedor declarante."</div>

	<div style="margin-top:0.75rem;"><b>Etapas del flujo (mismas en todas las fases)</b></div>
	<div style="margin-top:0.25rem;color:#555;">Todo mensaje pasa por estas tres etapas; cada fase del plan solo cambia <i>cómo se decide</i> el modelo y <i>qué se registra</i>, no la secuencia.</div>
	<table style="${TABLE_STYLE}">
	<thead><tr>
	<th style="${TH_STYLE}">Etapa</th>
	<th style="${TH_STYLE}">Qué hace con el input</th>
	<th style="${TH_STYLE}">Salida intermedia</th>
	</tr></thead>
	<tbody>
	<tr>
	<td style="${TD_STYLE}"><code>clasificacion</code></td>
	<td style="${TD_STYLE}">Encaja el mensaje en una categoría conocida.</td>
	<td style="${TD_STYLE}"><code>tipo_consulta = "tributaria"</code></td>
	</tr>
	<tr>
	<td style="${TD_STYLE}"><code>extraccion</code></td>
	<td style="${TD_STYLE}">Saca entidades estructuradas del texto.</td>
	<td style="${TD_STYLE}"><code>{ tributo: "retencion_fuente", concepto: "servicios_tecnicos", proveedor: "declarante" }</code></td>
	</tr>
	<tr>
	<td style="${TD_STYLE}"><code>respuesta</code></td>
	<td style="${TD_STYLE}">Genera la respuesta final al asesor con el contexto recolectado.</td>
	<td style="${TD_STYLE}">Texto final + cálculos (ver al pie).</td>
	</tr>
	</tbody>
	</table>

	<div style="margin-top:0.75rem;"><b>Qué aporta cada fase sobre el mismo input</b></div>
	<table style="${TABLE_STYLE}">
	<thead><tr>
	<th style="${TH_STYLE}">Fase</th>
	<th style="${TH_STYLE}">Qué introduce</th>
	<th style="${TH_STYLE}">Modelos resultantes para este input</th>
	<th style="${TH_STYLE}">Trazabilidad guardada</th>
	<th style="${TH_STYLE}">Cómo se ajusta una regla</th>
	</tr></thead>
	<tbody>
	<tr>
	<td style="${TD_STYLE}"><b>Hoy</b><br>(antes del plan)</td>
	<td style="${TD_STYLE}">Modelo único global para toda etapa de todo mensaje.</td>
	<td style="${TD_STYLE}">Las tres etapas usan <code>gpt-5.4</code> (definido en <code>OPENAI_MODEL</code>).</td>
	<td style="${TD_STYLE}">Solo el <code>modelo_ia</code> final en la conversación.</td>
	<td style="${TD_STYLE}">Editar <code>OPENAI_MODEL</code> y redeploy.</td>
	</tr>
	<tr>
	<td style="${TD_STYLE}"><b>Fase 1</b></td>
	<td style="${TD_STYLE}">Mapa de modelo por <b>etapa</b> + fallback global.</td>
	<td style="${TD_STYLE}"><code>clasificacion</code> y <code>extraccion</code> bajan a <code>gpt-4o-mini</code>; <code>respuesta</code> queda en <code>gpt-5</code>.</td>
	<td style="${TD_STYLE}">Solo el <code>modelo_ia</code> final en la conversación.</td>
	<td style="${TD_STYLE}">Editar el mapa <code>etapa → modelo</code> y redeploy.</td>
	</tr>
	<tr>
	<td style="${TD_STYLE}"><b>Fase 2</b></td>
	<td style="${TD_STYLE}">Se suma <b><code>tipo_consulta</code></b> al mapa (reutiliza la salida de la etapa de clasificación).</td>
	<td style="${TD_STYLE}">Para este input el resultado es el mismo (tipo <code>tributaria</code> sigue exigiendo modelo fuerte). Pero un saludo o un soporte_uso bajan también la <code>respuesta</code> a un modelo más barato.</td>
	<td style="${TD_STYLE}">Solo el <code>modelo_ia</code> final en la conversación.</td>
	<td style="${TD_STYLE}">Editar el mapa <code>etapa + tipo → modelo</code> y redeploy.</td>
	</tr>
	<tr>
	<td style="${TD_STYLE}"><b>Fase 3</b></td>
	<td style="${TD_STYLE}">Se agrega <b>trazabilidad por etapa</b> (sin cambiar reglas).</td>
	<td style="${TD_STYLE}"><code>clasificacion</code> y <code>extraccion</code> en <code>gpt-4o-mini</code>; <code>respuesta</code> en <code>gpt-5</code> (los mismos que Fase 2 para este input).</td>
	<td style="${TD_STYLE}">Una fila en <code>MENSAJE_METRICAS</code> por etapa: <code>TOKENS_IN/OUT</code>, <code>MODELO</code>, <code>ETAPA</code>, <code>COSTO_APROX</code>. Permite ver dónde se concentra el gasto.</td>
	<td style="${TD_STYLE}">Editar el mapa <code>etapa + tipo → modelo</code> y redeploy (la regla no cambia, pero ahora se mide su efecto por etapa).</td>
	</tr>
	<tr>
	<td style="${TD_STYLE}"><b>Fase 4</b></td>
	<td style="${TD_STYLE}">Catálogo de prompts y modelos en <b>SQL</b> (<code>RECURSO_OPENAI</code>). Cada fila de prompt (con su <b>INSTRUCCION</b>) lleva ahora una columna propia con el <b>modelo OpenAI</b> a usar, de modo que el modelo se elige <i>por prompt</i> según su complejidad y ya no todos quedan en <code>gpt-5</code>.</td>
	<td style="${TD_STYLE}">Modelos elegidos por prompt según complejidad: clasificación y extracción en <code>gpt-4o-mini</code>, respuesta tributaria compleja en <code>gpt-5</code>; un saludo o un soporte_uso bajarían a un modelo aún más liviano. Modelo y prompt se leen de BD y no de <code>local.settings.json</code>.</td>
	<td style="${TD_STYLE}">Una fila en <code>MENSAJE_METRICAS</code> por etapa (<code>TOKENS_IN/OUT</code>, <code>MODELO</code>, <code>ETAPA</code>, <code>COSTO_APROX</code>) más el <code>IRECURSO</code> usado por etapa.</td>
	<td style="${TD_STYLE}"><b>Sin redeploy.</b> Cambiar la fila en <code>RECURSO_OPENAI</code> y el próximo mensaje lo toma.</td>
	</tr>
	</tbody>
	</table>

	<div style="margin-top:0.75rem;"><b>Lo que el asesor recibe</b> (idéntico en todas las fases, salvo costo y latencia)</div>
	<div style="${OUTPUT_BOX}">Para liquidar la retención en la fuente por servicios técnicos a un proveedor declarante:

1. Identificar la base gravable (valor del servicio antes de IVA) …
2. Aplicar la tarifa vigente para "servicios técnicos" sobre la base …
3. Descontar la retención del pago al proveedor y declararla en el formulario 350 …

(respuesta generada por <b>gpt-5</b>)</div>
	<div style="margin-top:0.5rem;font-style:italic;color:#555;">Lectura: la calidad percibida es la misma a partir de Fase 1; lo que mejora en cada fase es el <b>costo</b> (Fase 1-2), la <b>visibilidad</b> (Fase 3) y la <b>agilidad operativa</b> (Fase 4, sin redeploy).</div>
</div>`;

	const mejorCamino = noteList(
		await note(
			"mdi:map-marker-path",
			`<b>Hoja de ruta visual</b><br>Las fases avanzan de menor a mayor impacto. <span style="color:#1976d2;">Azul</span>: cambios solo en código/configuración. <span style="color:#ef6c00;">Naranja</span>: cambios también en base de datos.${diagramaFases}`,
		),
		await note(
			"mdi:flask-outline",
			`<b>Caso de prueba: un mismo input recorriendo las 4 fases</b><br>Útil para visualizar qué cambia exactamente en cada fase y qué permanece igual:${viajePorFases}`,
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
			`<b>Fase 4:</b> mover el catálogo de <i>prompts</i> y modelo (<code>PR_*</code> y <code>OPENAI_MODEL</code>) a <b>SQL</b> como valores dinámicos administrables. Además, cada fila de prompt (columna <b>INSTRUCCION</b>) incorpora una columna propia de <b>modelo OpenAI</b>, de modo que la elección se hace <i>por prompt</i> según su complejidad: ya no todos quedan en <code>gpt-5</code>, sino que cada instrucción usa el modelo más costo-efectivo para su tarea. Quita la dependencia de variables de entorno y permite ajustar prompts/modelo sin redeploy.`,
		),
	);

	const diagramaRelaciones = imgFull("tk1429262-mermaid-er-recursos.png");

	const tablaStorage = `
<table style="${TABLE_STYLE}">
<thead><tr>
<th style="${TH_STYLE}">Columna</th>
<th style="${TH_STYLE}">Tipo sugerido</th>
<th style="${TH_STYLE}">Descripción</th>
</tr></thead>
<tbody>
<tr><td style="${TD_STYLE}"><code>IRECURSO</code></td><td style="${TD_STYLE}">INT PK</td><td style="${TD_STYLE}">Identificador interno.</td></tr>
<tr><td style="${TD_STYLE}"><code>NOMBRE</code></td><td style="${TD_STYLE}">VARCHAR(80)</td><td style="${TD_STYLE}">Label del front.</td></tr>
<tr><td style="${TD_STYLE}"><code>TIPO</code></td><td style="${TD_STYLE}">VARCHAR(40)</td><td style="${TD_STYLE}"><code>vector_store</code>, <code>prompt</code>, <code>model</code>, <code>chat</code>, …</td></tr>
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
<tr><td style="${TD_STYLE}"><code>COSTO_APROX</code></td><td style="${TD_STYLE}">DECIMAL(10,6)</td><td style="${TD_STYLE}">Aproximación por regla de tres sobre tarifa vigente del modelo.</td></tr>
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

	const tablaPresupuesto = `
<table style="${TABLE_STYLE}">
<thead><tr>
<th style="${TH_STYLE}">Fase</th>
<th style="${TH_STYLE}">Trabajo principal</th>
<th style="${TH_STYLE}">Estimación</th>
</tr></thead>
<tbody>
<tr><td style="${TD_STYLE}"><b>Fase 1</b></td><td style="${TD_STYLE}">Mapa de modelo por etapa + fallback global.</td><td style="${TD_STYLE}">15 min</td></tr>
<tr><td style="${TD_STYLE}"><b>Fase 2</b></td><td style="${TD_STYLE}">Mapa de modelos en BD (<code>tipo_consulta</code>).</td><td style="${TD_STYLE}">40 min</td></tr>
<tr><td style="${TD_STYLE}"><b>Fase 3</b></td><td style="${TD_STYLE}">Métricas por etapa (<code>MENSAJE_METRICAS</code>).</td><td style="${TD_STYLE}">40 min</td></tr>
<tr><td style="${TD_STYLE}"><b>Fase 4</b></td><td style="${TD_STYLE}">Cambio de tabla, ajustes y migración de información.</td><td style="${TD_STYLE}">1 h</td></tr>
<tr><td style="${TD_STYLE}"><b>Total</b></td><td style="${TD_STYLE}">Sumatoria en el caso idóneo, sin imprevistos.</td><td style="${TD_STYLE}"><b>2 h 35 min</b></td></tr>
</tbody>
</table>`;
	const presupuesto = `<p style="margin:0.5rem 0;">Estimación por fase en el caso idóneo, donde no se presenten situaciones no contempladas. La sumatoria corresponde al tiempo total proyectado.</p>${tablaPresupuesto}`;

	return intro
		+ h3Estado + estadoActual
		+ h3Evidencia + evidencia
		+ h3Viabilidad + viabilidad
		+ h3Comparativa + comparativa
		+ h3Ruta + mejorCamino
		+ h3BD + analisisBD
		+ h3Referencia + referencia
		+ h3Presupuesto + presupuesto;
}

export const bodyTK1429262: Promise<string> = buildBodyTK1429262();
