import { join } from "node:path";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { STORAGE_ROOT } from "./storage.ts";

export interface PromptMessage {
	role: string;
	content: string;
}

export interface PromptContentSnapshot {
	messages: PromptMessage[];
	model: string;
	updated_at: string;
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

export function plantillaVacia(): string {
	return serializarMd([
		{ role: "system", content: "" },
		{ role: "user", content: "" },
	]);
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
