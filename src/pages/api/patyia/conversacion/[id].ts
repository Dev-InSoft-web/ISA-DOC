import type { APIRoute } from "astro";
import { getPatyPool } from "../../../../lib/dbPaty.ts";
import { resolveOpenAIKey } from "../../../../lib/patyia/openaiKey.ts";

export const prerender = false;

interface ArchivoCita {
	marcador: string;
	file_id: string;
	filename?: string;
}

interface MensajeOpenAI {
	fecha_hora: number | null;
	autor: "Usuario" | "Asistente";
	mensaje: string;
	archivos: ArchivoCita[];
}

interface OpenAIAnnotation {
	type?: string;
	text?: string;
	file_citation?: { file_id?: string; filename?: string };
	file_path?: { file_id?: string; filename?: string };
}

interface OpenAITextContent {
	type?: string;
	text?: string | { value?: string; annotations?: OpenAIAnnotation[] };
	annotations?: OpenAIAnnotation[];
}

interface OpenAIItem {
	type?: string;
	role?: string;
	created_at?: number;
	content?: OpenAITextContent[];
}

interface OpenAIItemsList {
	data?: OpenAIItem[];
	error?: { message?: string };
}

// Réplica del flujo de PatyIA `TConversacionesController.ValidarGet`:
//   1. Lee la fila de CONVERSACIONES por iconversacion.
//   2. Con el HILO de OpenAI, obtiene los mensajes del thread.
//   3. Lee los mensajes calificados (MENSAJESCALIFICADOS) y el tiquete
//      asociado (TIQUETESCONVERSACION) de la BD AYUDASCP_IA.
//   4. Devuelve { conversacion, mensajesOpenAI, mensajesCalificados, tiquete }.
//
// La BD física se resuelve desde `?db=` (alias `prod`/`staging` o nombre
// exacto). Si no se envía, se usa la BD por defecto del pool
// (`paty_namedb`).
const DB_ALIASES: Record<string, string> = {
	prod: "AYUDASCP_IA",
	produccion: "AYUDASCP_IA",
	staging: "AYUDASCP_IA_STAGING",
	stg: "AYUDASCP_IA_STAGING",
};
const DB_NAME_RE = /^[A-Za-z_][A-Za-z0-9_]{0,63}$/;

function resolveDbName(raw: string | null): { name: string } | { error: string } | { none: true } {
	const v = (raw ?? "").trim();
	if (!v) return { none: true };
	const alias = DB_ALIASES[v.toLowerCase()];
	const name = alias ?? v;
	if (!DB_NAME_RE.test(name)) return { error: `Nombre de BD inválido: ${v}` };
	return { name };
}

function qualify(db: string | null, table: string): string {
	return db ? `[${db}].dbo.${table}` : table;
}

export const GET: APIRoute = async ({ params, url }) => {
	const idRaw = params.id ?? "";
	const iconversacion = Number(idRaw);
	if (!Number.isInteger(iconversacion) || iconversacion <= 0) {
		return json({ ok: false, error: "iconversacion inválido" }, 400);
	}

	const dbResolved = resolveDbName(url.searchParams.get("db"));
	if ("error" in dbResolved) return json({ ok: false, error: dbResolved.error }, 400);
	const dbName: string | null = "none" in dbResolved ? null : dbResolved.name;

	const warnings: string[] = [];
	let conversacion: Record<string, unknown> | null = null;
	let mensajesCalificados: Record<string, unknown>[] = [];
	let tiquete: Record<string, unknown>[] = [];
	let mensajesOpenAI: MensajeOpenAI[] = [];

	try {
		const pool = await getPatyPool();
		const r1 = await pool
			.request()
			.input("id", iconversacion)
			.query(`SELECT TOP (1) * FROM ${qualify(dbName, "CONVERSACIONES")} WHERE iconversacion = @id`);
		conversacion = (r1.recordset?.[0] as Record<string, unknown>) ?? null;
	} catch (err) {
		return json({ ok: false, error: `BD CONVERSACIONES: ${errMsg(err)}` }, 500);
	}

	if (!conversacion) {
		return json(
			{ ok: false, error: `No existe la conversación ${iconversacion} en ${dbName ?? "BD por defecto"}.CONVERSACIONES.` },
			404,
		);
	}

	const hilo = pickStr(conversacion, ["HILO", "hilo"]);

	const [msgsRes, tickRes, openaiRes, vsRes] = await Promise.allSettled([
		queryRows(
			`SELECT * FROM ${qualify(dbName, "MENSAJESCALIFICADOS")} WHERE iconversacion = @id ORDER BY imensaje`,
			iconversacion,
		),
		queryRows(
			`SELECT * FROM ${qualify(dbName, "TIQUETESCONVERSACION")} WHERE iconversacion = @id`,
			iconversacion,
		),
		hilo ? obtenerMensajesDeThread(hilo) : Promise.resolve<MensajeOpenAI[]>([]),
		hilo ? obtenerVectorStoreIdsDeThread(hilo) : Promise.resolve<string[]>([]),
	]);

	if (msgsRes.status === "fulfilled") mensajesCalificados = msgsRes.value;
	else warnings.push(`MENSAJESCALIFICADOS: ${msgsRes.reason}`);

	if (tickRes.status === "fulfilled") tiquete = tickRes.value;
	else warnings.push(`TIQUETESCONVERSACION: ${tickRes.reason}`);

	if (openaiRes.status === "fulfilled") mensajesOpenAI = openaiRes.value;
	else warnings.push(`OpenAI threads: ${openaiRes.reason}`);

	let vectorStoreIds: string[] = [];
	if (vsRes.status === "fulfilled") vectorStoreIds = vsRes.value;
	else warnings.push(`OpenAI vector stores: ${vsRes.reason}`);

	return json({
		ok: true,
		iconversacion,
		db: dbName,
		conversacion,
		mensajesOpenAI,
		mensajesCalificados,
		tiquete,
		vectorStoreIds,
		warnings,
	});
};

async function queryRows(sql: string, id: number): Promise<Record<string, unknown>[]> {
	const pool = await getPatyPool();
	const r = await pool.request().input("id", id).query(sql);
	return (r.recordset ?? []) as Record<string, unknown>[];
}

async function obtenerMensajesDeThread(conversationId: string): Promise<MensajeOpenAI[]> {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) throw new Error("OPENAI_API_KEY no encontrada");
	return conversationId.startsWith("thread_")
		? await listarMensajesThread(conversationId, apiKey)
		: await listarMensajesConversation(conversationId, apiKey);
}

interface ThreadInfo {
	tool_resources?: { file_search?: { vector_store_ids?: string[] } };
}

interface RunsList {
	data?: Array<{ assistant_id?: string }>;
}

interface AssistantInfo {
	tool_resources?: { file_search?: { vector_store_ids?: string[] } };
}

async function obtenerVectorStoreIdsDeThread(conversationId: string): Promise<string[]> {
	if (!conversationId.startsWith("thread_")) return [];
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return [];

	const ids = new Set<string>();
	const extraHeaders = { "OpenAI-Beta": "assistants=v2" };

	try {
		const info = await fetchOpenAI<ThreadInfo>(
			`https://api.openai.com/v1/threads/${encodeURIComponent(conversationId)}`,
			apiKey,
			extraHeaders,
		);
		for (const v of info.tool_resources?.file_search?.vector_store_ids ?? []) ids.add(v);
	} catch {
		/* ignore */
	}

	// Si el thread no expone vector stores, mirar los runs para sacar el
	// assistant_id y consultar el asistente.
	if (!ids.size) {
		try {
			const runs = await fetchOpenAI<RunsList>(
				`https://api.openai.com/v1/threads/${encodeURIComponent(conversationId)}/runs?limit=10`,
				apiKey,
				extraHeaders,
			);
			const asistentes = new Set<string>();
			for (const run of runs.data ?? []) {
				if (run.assistant_id) asistentes.add(run.assistant_id);
			}
			for (const aid of asistentes) {
				try {
					const a = await fetchOpenAI<AssistantInfo>(
						`https://api.openai.com/v1/assistants/${encodeURIComponent(aid)}`,
						apiKey,
						extraHeaders,
					);
					for (const v of a.tool_resources?.file_search?.vector_store_ids ?? []) ids.add(v);
				} catch {
					/* ignore */
				}
			}
		} catch {
			/* ignore */
		}
	}

	return [...ids];
}

async function listarMensajesConversation(id: string, apiKey: string): Promise<MensajeOpenAI[]> {
	const url = `https://api.openai.com/v1/conversations/${encodeURIComponent(id)}/items?order=asc&limit=100`;
	const parsed = await fetchOpenAI<OpenAIItemsList>(url, apiKey);
	const data = parsed.data ?? [];
	return data
		.filter((item) => item.type === "message" && (item.role === "user" || item.role === "assistant"))
		.map((item) => {
			const piezas = (item.content ?? []).filter(
				(c) => c.type === "input_text" || c.type === "output_text" || c.type === "text",
			);
			const texto = piezas.map((c) => extraerTexto(c)).join("\n");
			const archivos = piezas.flatMap((c) => extraerArchivos(c));

			return {
				fecha_hora: item.created_at ?? null,
				autor: item.role === "user" ? "Usuario" : "Asistente",
				mensaje: texto,
				archivos,
			} satisfies MensajeOpenAI;
		})
		.filter((m) => m.mensaje);
}

interface ThreadMessage {
	role?: string;
	created_at?: number;
	content?: OpenAITextContent[];
}

interface ThreadMessagesList {
	data?: ThreadMessage[];
}

async function listarMensajesThread(threadId: string, apiKey: string): Promise<MensajeOpenAI[]> {
	const url = `https://api.openai.com/v1/threads/${encodeURIComponent(threadId)}/messages?order=asc&limit=100`;
	const parsed = await fetchOpenAI<ThreadMessagesList>(url, apiKey, {
		"OpenAI-Beta": "assistants=v2",
	});
	const data = parsed.data ?? [];
	return data
		.filter((m) => m.role === "user" || m.role === "assistant")
		.map((m) => {
			const piezas = (m.content ?? []).filter((c) => c.type === "text");
			const texto = piezas.map((c) => extraerTexto(c)).join("\n");
			const archivos = piezas.flatMap((c) => extraerArchivos(c));

			return {
				fecha_hora: m.created_at ?? null,
				autor: m.role === "user" ? "Usuario" : "Asistente",
				mensaje: texto,
				archivos,
			} satisfies MensajeOpenAI;
		})
		.filter((m) => m.mensaje);
}

function extraerTexto(c: OpenAITextContent): string {
	if (typeof c.text === "string") return c.text;
	return c.text?.value ?? "";
}

function extraerArchivos(c: OpenAITextContent): ArchivoCita[] {
	const anots: OpenAIAnnotation[] = [
		...(Array.isArray(c.annotations) ? c.annotations : []),
		...(typeof c.text === "object" && Array.isArray(c.text?.annotations) ? c.text!.annotations! : []),
	];
	const out: ArchivoCita[] = [];
	for (const a of anots) {
		const marcador = a.text ?? "";
		const fc = a.file_citation ?? a.file_path;
		const file_id = fc?.file_id;
		if (!marcador || !file_id) continue;
		out.push({ marcador, file_id, filename: fc?.filename });
	}
	return out;
}

async function fetchOpenAI<T>(url: string, apiKey: string, extraHeaders: Record<string, string> = {}): Promise<T> {
	const r = await fetch(url, {
		method: "GET",
		headers: { Authorization: `Bearer ${apiKey}`, ...extraHeaders },
	});
	const text = await r.text();
	let parsed: (T & { error?: { message?: string } }) | null = null;
	try {
		parsed = JSON.parse(text) as T & { error?: { message?: string } };
	} catch {
		throw new Error(`HTTP ${r.status} no JSON: ${text.slice(0, 200)}`);
	}
	if (!r.ok) {
		throw new Error(parsed?.error?.message ?? `HTTP ${r.status}`);
	}
	return parsed;
}

function pickStr(o: Record<string, unknown>, keys: string[]): string {
	for (const k of keys) {
		if (k in o) {
			const v = o[k];
			if (v != null) return String(v);
		}
	}
	const lower: Record<string, string> = {};
	for (const k of Object.keys(o)) lower[k.toLowerCase()] = k;
	for (const k of keys) {
		const real = lower[k.toLowerCase()];
		if (real && o[real] != null) return String(o[real]);
	}
	return "";
}

function errMsg(err: unknown): string {
	return err instanceof Error ? err.message : String(err);
}

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});
}
