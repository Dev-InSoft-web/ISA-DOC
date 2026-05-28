import type { APIRoute } from "astro";
import { getPatyPool } from "../../../../../../lib/dbPaty.ts";
import { jsonResponse, resolveOpenAIKey } from "../../../../../../lib/patyia/openaiKey.ts";

export const prerender = false;

const DB = "AYUDASCP_IA_STAGING";

interface Body { mensaje?: string; nombre?: string; variables?: Record<string, string> }

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

// POST → envía un mensaje nuevo a una conversación existente (no stream).
// Toma el HILO de CONVERSACIONES staging, llama /v1/responses con `conversation`
// y actualiza QMENSAJES / QTOKENS / FHULTACT.
export const POST: APIRoute = async ({ params, request }) => {
	const id = Number(params.id ?? 0);
	if (!Number.isFinite(id) || id <= 0) return jsonResponse({ ok: false, error: "id inválido" }, 400);

	let body: Body;
	try { body = (await request.json()) as Body; }
	catch { return jsonResponse({ ok: false, error: "JSON inválido" }, 400); }
	const mensaje = (body.mensaje ?? "").toString();
	if (!mensaje.trim()) return jsonResponse({ ok: false, error: "mensaje vacío" }, 400);
	if (mensaje.length > 20_000) return jsonResponse({ ok: false, error: "mensaje excede 20k" }, 400);

	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return jsonResponse({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const pool = await getPatyPool();
	const sel = await pool.request().input("id", id).query(
		`SELECT TOP 1 HILO, ITERCERO, MODELO_IA, QMENSAJES, QTOKENS FROM [${DB}].dbo.CONVERSACIONES WHERE ICONVERSACION = @id`,
	);
	const row = sel.recordset?.[0] as { HILO?: string; ITERCERO?: string; QMENSAJES?: number; QTOKENS?: number } | undefined;
	if (!row?.HILO) return jsonResponse({ ok: false, error: `Conversación ${id} no encontrada en staging` }, 404);
	const hilo = row.HILO;

	const variables: Record<string, string> = {
		nombre_usuario: (body.nombre ?? "").trim() || `Tercero ${row.ITERCERO ?? ""}`.trim(),
		...(body.variables ?? {}),
	};

	let resp: OpenAIResponse;
	try {
		const r = await fetch("https://api.openai.com/v1/responses", {
			method: "POST",
			headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
			body: JSON.stringify({
				prompt: { id: defaultPromptId(), variables },
				input: mensaje,
				conversation: hilo,
				store: true,
				max_output_tokens: 4000,
				reasoning: { effort: "low" },
			}),
			signal: AbortSignal.timeout(120_000),
		});
		const txt = await r.text();
		try { resp = JSON.parse(txt) as OpenAIResponse; }
		catch { return jsonResponse({ ok: false, error: `OpenAI HTTP ${r.status}: ${txt.slice(0, 300)}` }, 502); }
		if (!r.ok) return jsonResponse({ ok: false, error: resp.error?.message ?? `OpenAI HTTP ${r.status}` }, 502);
	} catch (err) {
		return jsonResponse({ ok: false, error: err instanceof Error ? err.message : String(err) }, 502);
	}

	const respuestaTexto = extraerTexto(resp);
	const addTokens = Number(resp.usage?.total_tokens ?? 0);

	try {
		await pool.request()
			.input("id", id)
			.input("addTokens", addTokens)
			.query(
				`UPDATE [${DB}].dbo.CONVERSACIONES
				 SET QMENSAJES = ISNULL(QMENSAJES, 0) + 2,
				     QTOKENS = ISNULL(QTOKENS, 0) + @addTokens,
				     FHULTACT = GETDATE()
				 WHERE ICONVERSACION = @id`,
			);
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);

		return jsonResponse({ ok: true, respuesta: { texto: respuestaTexto, usage: resp.usage ?? null }, warning: `BD update: ${msg}` });
	}

	return jsonResponse({ ok: true, respuesta: { id: resp.id ?? "", texto: respuestaTexto, usage: resp.usage ?? null } });
};
