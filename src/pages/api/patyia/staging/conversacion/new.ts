import type { APIRoute } from "astro";
import { getPatyPool } from "../../../../../lib/dbPaty.ts";
import { jsonResponse, resolveOpenAIKey } from "../../../../../lib/patyia/openaiKey.ts";

export const prerender = false;

const DB = "AYUDASCP_IA_STAGING";

interface Body {
	itercero?: string;
	icontacto?: string;
	primerMensaje?: string;
	imodulo?: string;
	modelo?: string;
	titulo?: string;
	nombre?: string;
	variables?: Record<string, string>;
}

interface OpenAIConversation { id?: string; object?: string; error?: { message?: string } }
interface OpenAIResponseUsage { input_tokens?: number; output_tokens?: number; total_tokens?: number }
interface OpenAIResponseContentItem { type?: string; text?: string | { value?: string } }
interface OpenAIResponseOutputItem { type?: string; content?: OpenAIResponseContentItem[] }
interface OpenAIResponse {
	id?: string;
	output_text?: string;
	output?: OpenAIResponseOutputItem[];
	usage?: OpenAIResponseUsage;
	error?: { message?: string };
}

function extraerTexto(resp: OpenAIResponse): string {
	if (resp.output_text && resp.output_text.trim()) return resp.output_text;
	const partes: string[] = [];
	for (const it of resp.output ?? []) {
		if (it.type !== "message") continue;
		for (const c of it.content ?? []) {
			if (typeof c.text === "string") partes.push(c.text);
			else if (c.text && typeof c.text === "object" && typeof c.text.value === "string") partes.push(c.text.value);
		}
	}

	return partes.join("\n").trim();
}

function defaultPromptId(): string {
	return (process.env.paty_pr_general ?? process.env.PR_GENERAL ?? "pmpt_69f9f701508c81978d82393f74030eac0fc02a771228ab14").trim();
}

function defaultModelo(): string {
	return ((process.env.paty_openai_model ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini").trim() || "gpt-4o-mini").slice(0, 20);
}

// POST → crea una conversación nueva en OpenAI (/v1/conversations), envía el
// primer mensaje al prompt principal (/v1/responses) y persiste la fila en
// AYUDASCP_IA_STAGING.dbo.CONVERSACIONES. Solo staging.
export const POST: APIRoute = async ({ request }) => {
	let body: Body;
	try { body = (await request.json()) as Body; }
	catch { return jsonResponse({ ok: false, error: "JSON inválido" }, 400); }

	const itercero = (body.itercero ?? "").toString().trim();
	const icontacto = (body.icontacto ?? "").toString().trim();
	const primerMensaje = (body.primerMensaje ?? "").toString();
	if (!itercero) return jsonResponse({ ok: false, error: "itercero requerido" }, 400);
	if (!primerMensaje.trim()) return jsonResponse({ ok: false, error: "primerMensaje vacío" }, 400);
	if (primerMensaje.length > 20_000) return jsonResponse({ ok: false, error: "primerMensaje excede 20k caracteres" }, 400);

	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return jsonResponse({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const promptId = defaultPromptId();
	const modelo = (body.modelo ?? "").trim() || defaultModelo();
	const imodulo = ((body.imodulo ?? "").toString().trim() || "isa-doc").slice(0, 100);
	const tituloAuto = primerMensaje.trim().slice(0, 100).replace(/\s+/g, " ");
	const titulo = ((body.titulo ?? "").toString().trim() || tituloAuto || "Sin título").slice(0, 100);

	// 1) Crear conversación en OpenAI
	let conv: OpenAIConversation;
	try {
		const r = await fetch("https://api.openai.com/v1/conversations", {
			method: "POST",
			headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
			body: JSON.stringify({ metadata: { origin: "isa-doc", itercero, icontacto } }),
			signal: AbortSignal.timeout(30_000),
		});
		const txt = await r.text();
		try { conv = JSON.parse(txt) as OpenAIConversation; }
		catch { return jsonResponse({ ok: false, error: `OpenAI conv HTTP ${r.status}: ${txt.slice(0, 300)}` }, 502); }
		if (!r.ok || !conv.id) return jsonResponse({ ok: false, error: conv.error?.message ?? `OpenAI conv HTTP ${r.status}` }, 502);
	} catch (err) {
		return jsonResponse({ ok: false, error: `OpenAI conv: ${err instanceof Error ? err.message : String(err)}` }, 502);
	}
	const hilo = conv.id ?? "";

	// 2) Enviar primer mensaje con prompt PR_GENERAL
	const variables: Record<string, string> = {
		nombre_usuario: (body.nombre ?? "").trim() || `Tercero ${itercero}`,
		...(body.variables ?? {}),
	};
	let resp: OpenAIResponse;
	try {
		const r = await fetch("https://api.openai.com/v1/responses", {
			method: "POST",
			headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
			body: JSON.stringify({
				prompt: { id: promptId, variables },
				input: primerMensaje,
				conversation: hilo,
				store: true,
				max_output_tokens: 4000,
				reasoning: { effort: "low" },
			}),
			signal: AbortSignal.timeout(120_000),
		});
		const txt = await r.text();
		try { resp = JSON.parse(txt) as OpenAIResponse; }
		catch { return jsonResponse({ ok: false, error: `OpenAI resp HTTP ${r.status}: ${txt.slice(0, 300)}`, hilo }, 502); }
		if (!r.ok) return jsonResponse({ ok: false, error: resp.error?.message ?? `OpenAI resp HTTP ${r.status}`, hilo }, 502);
	} catch (err) {
		return jsonResponse({ ok: false, error: `OpenAI resp: ${err instanceof Error ? err.message : String(err)}`, hilo }, 502);
	}

	const respuestaTexto = extraerTexto(resp);
	const qtokens = Number(resp.usage?.total_tokens ?? 0);

	// 3) Persistir en CONVERSACIONES staging (ICONVERSACION no es identity)
	try {
		const pool = await getPatyPool();
		const reqDb = pool.request();
		reqDb.input("itercero", itercero);
		reqDb.input("icontacto", icontacto);
		reqDb.input("hilo", hilo);
		reqDb.input("titulo", titulo);
		reqDb.input("imodulo", imodulo);
		reqDb.input("modelo", modelo);
		reqDb.input("prompt", primerMensaje);
		reqDb.input("qtokens", qtokens);
		const sql = `
			DECLARE @nuevo BIGINT = (SELECT ISNULL(MAX(ICONVERSACION), 0) + 1 FROM [${DB}].dbo.CONVERSACIONES);
			INSERT INTO [${DB}].dbo.CONVERSACIONES (
				ICONVERSACION, ITERCERO, ICONTACTO, HILO, TITULO, FHCRE, IMODULO,
				MODELO_IA, VERSION_AYUDA, QMENSAJES, QTOKENS, PROMPT, ITDESTADO,
				FHULTACT, BAUTORIZA_VISUALIZACION
			) VALUES (
				@nuevo, @itercero, @icontacto, @hilo, @titulo, GETDATE(), @imodulo,
				@modelo, 'isa-doc-stg', 2, @qtokens, @prompt, 1,
				GETDATE(), 0
			);
			SELECT @nuevo AS iconversacion;
		`;
		const result = await reqDb.query(sql);
		const rows = (result.recordset ?? []) as Array<{ iconversacion: number }>;
		const iconversacion = Number(rows[0]?.iconversacion ?? 0);

		return jsonResponse({
			ok: true,
			iconversacion,
			hilo,
			respuesta: { id: resp.id ?? "", texto: respuestaTexto, usage: resp.usage ?? null },
		});
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);

		return jsonResponse({ ok: false, error: `BD: ${msg}`, hilo, respuesta: { texto: respuestaTexto } }, 500);
	}
};
