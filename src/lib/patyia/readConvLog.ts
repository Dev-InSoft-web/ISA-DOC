import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export interface ConvLogTokens {
	input?: number;
	cached?: number;
	output?: number;
	reasoning?: number;
	total?: number;
}

export interface ConvLogMensaje {
	ts?: string;
	role: "user" | "assistant" | "operativa";
	turno?: number;
	seq?: number;
	text?: string;
	model?: string;
	modelo_configurado?: string;
	prompt_id?: string;
	nombre_usuario?: string;
	nombre_usado_en_respuesta?: boolean;
	itdconsulta?: string;
	instrucciones?: string[];
	vectorStoreIds?: string[];
	premisas?: string[];
	operativa_key?: string;
	operativa_engine?: string;
	tokens?: ConvLogTokens;
	usage?: Record<string, unknown>;
	prompt_variables?: Record<string, string>;
	response_id?: string;
	latency_ms?: number;
}

export interface ConvLogFile {
	iconversacion: number;
	mensajes: ConvLogMensaje[];
}

/** Orden de visualización por turno: user → operativas → assistant. */
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
