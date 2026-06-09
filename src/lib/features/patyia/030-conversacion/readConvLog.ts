import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { extractUserVisionFromSendInput, userContenidoFromConvLogSend } from "./convLogContent.ts";

export interface ConvLogTokens {
	input?: number;
	cached?: number;
	output?: number;
	reasoning?: number;
	total?: number;
}

export type ConvLogPayload = Record<string, unknown>;

export interface ConvLogOthers {
	itdconsulta?: string;
	nombre_usuario?: string;
	nombre_usado_en_respuesta?: boolean;
	modelo_configurado?: string;
	prompt_chars?: number;
	response_chars?: number;
	prompt_id?: string;
	engine?: string;
	conversation_id?: string;
	response_text?: string;
	vector_store_ids?: string[];
	operativa_key?: string;
	operativa_engine?: string;
	stream_ok?: boolean;
	stream_error?: string;
}

export interface ConvLogMensaje {
	ts?: string;
	role: "user" | "assistant" | "operativa";
	turno?: number;
	seq?: number;
	tokens?: ConvLogTokens;
	cost?: Record<string, number>;
	latency_ms?: number;
	send?: ConvLogPayload;
	receive?: ConvLogPayload;
	others?: ConvLogOthers;
}

export interface ConvLogFile {
	iconversacion: number;
	mensajes: ConvLogMensaje[];
}

export function textFromOpenAIReceive(rec?: ConvLogPayload): string {
	if (!rec) return "";
	const output = rec.output;
	if (Array.isArray(output)) {
		return output
			.filter((o): o is Record<string, unknown> => !!o && typeof o === "object" && (o as { type?: string }).type === "message")
			.flatMap((o) => {
				const content = (o as { content?: unknown }).content;
				if (!Array.isArray(content)) return [];
				return content
					.filter((c): c is Record<string, unknown> => !!c && typeof c === "object" && (c as { type?: string }).type === "output_text")
					.map((c) => String((c as { text?: string }).text ?? ""));
			})
			.join("");
	}
	const choices = rec.choices;
	if (Array.isArray(choices)) {
		return choices.map((c) => String((c as { message?: { content?: string } }).message?.content ?? "")).join("");
	}
	if (typeof rec.text === "string") return rec.text;
	return "";
}

export function convLogMensajeTexto(m: ConvLogMensaje): string {
	if (m.role === "user") return userContenidoFromConvLogSend(m.send as Record<string, unknown> | undefined);
	if (m.role === "assistant") return m.others?.response_text ?? textFromOpenAIReceive(m.receive);
	return textFromOpenAIReceive(m.receive);
}

export function flattenConvLogMensaje(m: ConvLogMensaje): Record<string, unknown> {
	const s = m.send;
	const r = m.receive;
	const o = m.others ?? {};
	const flat: Record<string, unknown> = { ts: m.ts, tokens: m.tokens, usage: r?.usage, latency_ms: m.latency_ms, send: s, receive: r, others: m.others };
	if (m.role === "user") {
		const { text, images } = extractUserVisionFromSendInput(s?.input, typeof s?.text === "string" ? s.text : "");
		if (text) flat.text = flat.prompt_text = text;
		if (images.length) flat.imagenes = images;
		const prompt = s?.prompt as { id?: string; variables?: Record<string, string> } | undefined;
		if (prompt?.id) flat.prompt_id = prompt.id;
		if (prompt?.variables) flat.prompt_variables = prompt.variables;
		if (o.vector_store_ids) flat.vectorStoreIds = o.vector_store_ids;
	} else if (m.role === "operativa") {
		if (o.operativa_key) flat.operativa_key = o.operativa_key;
		if (o.operativa_engine) flat.operativa_engine = o.operativa_engine;
		const txt = textFromOpenAIReceive(r);
		if (txt) flat.text = txt;
		if (typeof r?.model === "string") flat.model = r.model;
	} else if (m.role === "assistant") {
		const txt = o.response_text ?? textFromOpenAIReceive(r);
		if (txt) flat.text = flat.response_text = txt;
		if (typeof r?.model === "string") flat.model = r.model;
		if (typeof r?.id === "string") flat.response_id = r.id;
		if (o.engine) flat.engine = o.engine;
	}
	if (o.itdconsulta) flat.itdconsulta = o.itdconsulta;
	if (o.nombre_usuario) flat.nombre_usuario = o.nombre_usuario;
	if (o.stream_ok === false) flat.stream_ok = false;
	if (o.stream_error) flat.stream_error = o.stream_error;
	if (o.nombre_usado_en_respuesta !== undefined) flat.nombre_usado_en_respuesta = o.nombre_usado_en_respuesta;
	if (o.modelo_configurado) flat.modelo_configurado = o.modelo_configurado;
	if (o.prompt_chars !== undefined) flat.prompt_chars = o.prompt_chars;
	if (o.response_chars !== undefined) flat.response_chars = o.response_chars;
	if (o.prompt_id && !flat.prompt_id) flat.prompt_id = o.prompt_id;
	return flat;
}

export function ordenarMensajesConvLog(mensajes: ConvLogMensaje[]): ConvLogMensaje[] {
	if (!mensajes.length) return [];

	const byTurno = new Map<number, ConvLogMensaje[]>();
	const sinTurno: ConvLogMensaje[] = [];

	for (const m of mensajes) {
		const t = m.turno;
		if (t == null || t <= 0) {
			sinTurno.push(m);
			continue;
		}
		if (!byTurno.has(t)) byTurno.set(t, []);
		byTurno.get(t)!.push(m);
	}

	const out: ConvLogMensaje[] = [];
	for (const t of [...byTurno.keys()].sort((a, b) => a - b)) {
		const g = byTurno.get(t)!;
		const users = g.filter((m) => m.role === "user");
		const ops = g.filter((m) => m.role === "operativa").sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0));
		const assistants = g.filter((m) => m.role === "assistant");
		out.push(...users, ...ops, ...assistants);
	}

	if (sinTurno.length) {
		sinTurno.sort((a, b) => String(a.ts ?? "").localeCompare(String(b.ts ?? "")));
		out.push(...sinTurno);
	}

	return out;
}

function defaultLogDir(): string {
	const env = (process.env.PATYIA_CONV_LOG_DIR ?? process.env.CONV_LOG_DIR ?? "").trim();
	if (env) return resolve(env);
	return resolve(process.cwd(), "..", "PatyIA", "logs", "conversaciones");
}

export async function readConvLogFile(iconversacion: number): Promise<ConvLogFile | null> {
	if (!Number.isFinite(iconversacion) || iconversacion <= 0) return null;
	const path = resolve(defaultLogDir(), `conv-${iconversacion}.json`);
	if (!existsSync(path)) return null;
	try {
		const raw = await readFile(path, "utf8");
		const parsed = JSON.parse(raw.trim()) as ConvLogFile;
		if (!parsed || !Array.isArray(parsed.mensajes)) return null;
		return parsed;
	} catch {
		return null;
	}
}

/** CONTENT en CONVERSACION_LOG (staging/prod según pool Paty). */
export async function readConvLogFromDb(iconversacion: number): Promise<ConvLogFile | null> {
	try {
		const { getPatyPool } = await import("../../../core/database/paty-pool.ts");
		const pool = await getPatyPool();
		const r = await pool.request().input("id", iconversacion).query(
			"SELECT CONTENT FROM dbo.CONVERSACION_LOG WHERE ICONVERSACION = @id",
		);
		const row = r.recordset?.[0] as { CONTENT?: string; content?: string } | undefined;
		const raw = row?.CONTENT ?? row?.content;
		if (!raw || typeof raw !== "string") return null;
		const parsed = JSON.parse(raw.trim()) as ConvLogFile;
		if (!parsed || !Array.isArray(parsed.mensajes) || !parsed.mensajes.length) return null;
		parsed.iconversacion = parsed.iconversacion || iconversacion;
		return parsed;
	} catch {
		return null;
	}
}

export async function readConvLogMerged(iconversacion: number): Promise<ConvLogFile | null> {
	const fromFile = await readConvLogFile(iconversacion);
	const fromDb = await readConvLogFromDb(iconversacion);
	if (!fromFile) return fromDb;
	if (!fromDb) return fromFile;
	const seen = new Set<string>();
	const mensajes: ConvLogMensaje[] = [];
	for (const m of [...fromFile.mensajes, ...fromDb.mensajes]) {
		const k = `${m.turno ?? 0}|${m.seq ?? 0}|${m.role}|${m.ts ?? ""}`;
		if (seen.has(k)) continue;
		seen.add(k);
		mensajes.push(m);
	}
	mensajes.sort((a, b) => (a.turno ?? 0) - (b.turno ?? 0) || (a.seq ?? 0) - (b.seq ?? 0));
	return { iconversacion, mensajes };
}
