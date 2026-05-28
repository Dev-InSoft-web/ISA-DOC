import type { APIRoute } from "astro";
import { getPatyPool } from "../../../../../../lib/dbPaty.ts";
import { resolveOpenAIKey } from "../../../../../../lib/patyia/openaiKey.ts";

export const prerender = false;

const DB = "AYUDASCP_IA_STAGING";

interface Body { mensaje?: string; nombre?: string; variables?: Record<string, string> }

function defaultPromptId(): string {
	return (process.env.paty_pr_general ?? process.env.PR_GENERAL ?? "pmpt_69f9f701508c81978d82393f74030eac0fc02a771228ab14").trim();
}

function sseLine(event: string, data: unknown): string {
	return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

// POST → envía mensaje a una conversación staging con stream SSE.
// Cliente debe consumir text/event-stream. Eventos:
//   - delta { text }
//   - done  { id, usage }
//   - error { error }
export const POST: APIRoute = async ({ params, request }) => {
	const id = Number(params.id ?? 0);
	if (!Number.isFinite(id) || id <= 0) return new Response("id inválido", { status: 400 });

	let body: Body;
	try { body = (await request.json()) as Body; }
	catch { return new Response("JSON inválido", { status: 400 }); }
	const mensaje = (body.mensaje ?? "").toString();
	if (!mensaje.trim()) return new Response("mensaje vacío", { status: 400 });

	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return new Response("OPENAI_API_KEY no encontrada", { status: 500 });

	const pool = await getPatyPool();
	const sel = await pool.request().input("id", id).query(
		`SELECT TOP 1 HILO, ITERCERO FROM [${DB}].dbo.CONVERSACIONES WHERE ICONVERSACION = @id`,
	);
	const row = sel.recordset?.[0] as { HILO?: string; ITERCERO?: string } | undefined;
	if (!row?.HILO) return new Response(`Conversación ${id} no encontrada`, { status: 404 });
	const hilo = row.HILO;

	const variables: Record<string, string> = {
		nombre_usuario: (body.nombre ?? "").trim() || `Tercero ${row.ITERCERO ?? ""}`.trim(),
		...(body.variables ?? {}),
	};

	const encoder = new TextEncoder();
	const stream = new ReadableStream<Uint8Array>({
		async start(controller) {
			let acumulado = "";
			let finalId = "";
			let finalUsage: Record<string, unknown> | null = null;

			try {
				const r = await fetch("https://api.openai.com/v1/responses", {
					method: "POST",
					headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
					body: JSON.stringify({
						prompt: { id: defaultPromptId(), variables },
						input: mensaje,
						conversation: hilo,
						store: true,
						stream: true,
						max_output_tokens: 4000,
						reasoning: { effort: "low" },
					}),
				});
				if (!r.ok || !r.body) {
					const txt = await r.text();
					controller.enqueue(encoder.encode(sseLine("error", { error: `OpenAI HTTP ${r.status}: ${txt.slice(0, 300)}` })));
					controller.close();
					return;
				}

				const reader = r.body.getReader();
				const dec = new TextDecoder();
				let buffer = "";
				while (true) {
					const { value, done } = await reader.read();
					if (done) break;
					buffer += dec.decode(value, { stream: true });
					const blocks = buffer.split("\n\n");
					buffer = blocks.pop() ?? "";
					for (const block of blocks) {
						const lines = block.split("\n");
						let evento = "";
						let datos = "";
						for (const ln of lines) {
							if (ln.startsWith("event:")) evento = ln.slice(6).trim();
							else if (ln.startsWith("data:")) datos += ln.slice(5).trim();
						}
						if (!datos || datos === "[DONE]") continue;
						let parsed: Record<string, unknown>;
						try { parsed = JSON.parse(datos) as Record<string, unknown>; }
						catch { continue; }
						if (evento === "response.output_text.delta" || parsed.type === "response.output_text.delta") {
							const delta = String((parsed as { delta?: string }).delta ?? "");
							if (delta) {
								acumulado += delta;
								controller.enqueue(encoder.encode(sseLine("delta", { text: delta })));
							}
						} else if (evento === "response.completed" || parsed.type === "response.completed") {
							const resp = (parsed as { response?: { id?: string; usage?: Record<string, unknown>; output_text?: string } }).response;
							finalId = resp?.id ?? "";
							finalUsage = resp?.usage ?? null;
							if (!acumulado && resp?.output_text) acumulado = resp.output_text;
						} else if (evento === "response.error" || parsed.type === "error") {
							controller.enqueue(encoder.encode(sseLine("error", { error: (parsed as { error?: { message?: string } }).error?.message ?? "error desconocido" })));
						}
					}
				}

				const total = Number((finalUsage as { total_tokens?: number } | null)?.total_tokens ?? 0);
				try {
					await pool.request()
						.input("id", id)
						.input("addTokens", total)
						.query(
							`UPDATE [${DB}].dbo.CONVERSACIONES
							 SET QMENSAJES = ISNULL(QMENSAJES, 0) + 2,
							     QTOKENS = ISNULL(QTOKENS, 0) + @addTokens,
							     FHULTACT = GETDATE()
							 WHERE ICONVERSACION = @id`,
						);
				} catch (err) {
					controller.enqueue(encoder.encode(sseLine("warning", { warning: `BD: ${err instanceof Error ? err.message : String(err)}` })));
				}
				controller.enqueue(encoder.encode(sseLine("done", { id: finalId, usage: finalUsage, texto: acumulado })));
			} catch (err) {
				controller.enqueue(encoder.encode(sseLine("error", { error: err instanceof Error ? err.message : String(err) })));
			} finally {
				controller.close();
			}
		},
	});

	return new Response(stream, {
		headers: {
			"content-type": "text/event-stream; charset=utf-8",
			"cache-control": "no-store",
			"x-accel-buffering": "no",
		},
	});
};
