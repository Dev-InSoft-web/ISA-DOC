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
		h3Iconized("mdi:clock-time-four-outline", "7) Presupuesto de tiempos (3 horas)"),
		h3Iconized("mdi:alert-outline", "8) Riesgos y mitigación"),
		h3Iconized("mdi:clipboard-text-outline", "9) Propuesta para aprobación"),
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
		<td style="border:1px solid #80808040;padding:0.4rem;">Mapa de modelo por <code>etapa</code> y/o <code>tipo_consulta</code> con fallback global.</td>
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
		+ h3Riesgos + riesgos
		+ h3Conclusion + conclusion;
}

export const bodyTK1429262: Promise<string> = buildBodyTK1429262();
