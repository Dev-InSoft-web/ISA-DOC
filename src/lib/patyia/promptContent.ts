import { join } from "node:path";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { STORAGE_ROOT } from "./storage.ts";

export interface PromptMessage {
	role: string;
	content: string;
}

export interface PromptContentSnapshot {
	id: string;
	version: string;
	messages: PromptMessage[];
	model: string;
	fetched_at: string;
	raw: unknown;
}

export const PROMPTS_DIR = join(STORAGE_ROOT, "prompts");

export function contentMdPath(key: string): string {
	return join(PROMPTS_DIR, `${key}.md`);
}

export function contentJsonPath(key: string): string {
	return join(PROMPTS_DIR, `${key}.json`);
}

const ROLE_BLOCK_RE = /<!--\s*role:\s*([\w-]+)\s*-->\r?\n?([\s\S]*?)\r?\n?<!--\/role-->/g;

export function serializarMd(messages: PromptMessage[]): string {
	return messages
		.map((m) => `<!--role: ${m.role}-->\n${m.content ?? ""}\n<!--/role-->`)
		.join("\n\n");
}

export function parsearMd(md: string): PromptMessage[] {
	const out: PromptMessage[] = [];
	const re = new RegExp(ROLE_BLOCK_RE.source, "g");
	let m: RegExpExecArray | null;
	while ((m = re.exec(md)) !== null) {
		out.push({ role: m[1], content: m[2].trim() });
	}
	return out;
}

interface ContentPart { text?: string; value?: string }
interface RawMessage { role?: string; content?: string | ContentPart[] }
interface RawVersion { version?: string | number; messages?: RawMessage[]; model?: string }
interface RawPrompt {
	messages?: RawMessage[];
	model?: string;
	version?: string | number;
	active_version?: string | number;
	versions?: RawVersion[];
	error?: { message?: string };
}

function normalizarMessages(arr: RawMessage[] | undefined): PromptMessage[] {
	if (!Array.isArray(arr)) return [];
	return arr.map((m) => {
		const role = String(m.role ?? "user");
		let content: string;
		if (Array.isArray(m.content)) {
			content = m.content.map((p) => (typeof p === "string" ? p : (p.text ?? p.value ?? ""))).join("\n");
		} else {
			content = String(m.content ?? "");
		}
		return { role, content };
	});
}

export interface FetchedPrompt {
	messages: PromptMessage[];
	model: string;
	version: string;
	raw: unknown;
}

export async function fetchOpenAIPrompt(id: string, version: string, apiKey: string): Promise<FetchedPrompt> {
	const v = version.trim();
	const url = v
		? `https://api.openai.com/v1/prompts/${encodeURIComponent(id)}/versions/${encodeURIComponent(v)}`
		: `https://api.openai.com/v1/prompts/${encodeURIComponent(id)}`;
	const r = await fetch(url, {
		headers: { authorization: `Bearer ${apiKey}` },
		signal: AbortSignal.timeout(30_000),
	});
	const text = await r.text();
	let j: RawPrompt;
	try { j = JSON.parse(text) as RawPrompt; }
	catch { throw new Error(`HTTP ${r.status} no JSON: ${text.slice(0, 200)}`); }
	if (!r.ok) throw new Error(j.error?.message ?? `HTTP ${r.status}`);

	let messages: PromptMessage[] = [];
	let resolvedVersion: string = v;
	let model: string = j.model ?? "";

	if (Array.isArray(j.messages)) {
		messages = normalizarMessages(j.messages);
		resolvedVersion = String(j.version ?? v ?? "");
	} else if (Array.isArray(j.versions)) {
		const wanted = v
			? j.versions.find((x) => String(x.version) === v)
			: (j.versions.find((x) => String(x.version) === String(j.active_version ?? "")) ?? j.versions[j.versions.length - 1]);
		if (!wanted) throw new Error(`versión no encontrada: ${v || "(activa)"}`);
		resolvedVersion = String(wanted.version ?? "");
		messages = normalizarMessages(wanted.messages);
		if (wanted.model) model = wanted.model;
	}

	return { messages, model, version: resolvedVersion, raw: j };
}

export async function publicarNuevaVersion(id: string, messages: PromptMessage[], model: string, apiKey: string): Promise<{ version: string; raw: unknown }> {
	const body: { messages: PromptMessage[]; model?: string } = { messages };
	if (model) body.model = model;
	const r = await fetch(`https://api.openai.com/v1/prompts/${encodeURIComponent(id)}/versions`, {
		method: "POST",
		headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
		body: JSON.stringify(body),
		signal: AbortSignal.timeout(60_000),
	});
	const text = await r.text();
	let j: RawPrompt & { version?: string | number };
	try { j = JSON.parse(text) as RawPrompt & { version?: string | number }; }
	catch { throw new Error(`HTTP ${r.status} no JSON: ${text.slice(0, 200)}`); }
	if (!r.ok) throw new Error(j.error?.message ?? `HTTP ${r.status}`);
	return { version: String(j.version ?? ""), raw: j };
}

export async function existeContenidoLocal(key: string): Promise<boolean> {
	try { await stat(contentMdPath(key)); return true; } catch { return false; }
}

export async function leerContenidoLocal(key: string): Promise<{ markdown: string; snapshot: PromptContentSnapshot | null }> {
	const markdown = await readFile(contentMdPath(key), "utf-8");
	let snapshot: PromptContentSnapshot | null = null;
	try { snapshot = JSON.parse(await readFile(contentJsonPath(key), "utf-8")) as PromptContentSnapshot; }
	catch { snapshot = null; }
	return { markdown, snapshot };
}

export async function escribirContenidoLocal(key: string, markdown: string, snapshot: PromptContentSnapshot | null): Promise<void> {
	await mkdir(PROMPTS_DIR, { recursive: true });
	await writeFile(contentMdPath(key), markdown, "utf-8");
	if (snapshot) await writeFile(contentJsonPath(key), JSON.stringify(snapshot, null, 2), "utf-8");
}
