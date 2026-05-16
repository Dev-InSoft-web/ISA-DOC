import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// src/lib → repo root: ../..
export const sqlFilePath = path.resolve(__dirname, "..", "..", "public", "db", "init_capacitacion.sql");

export type SqlFragmentKind = "table" | "index" | "fk" | "seed" | "raw";

export interface SqlFragment {
	id: string;
	name: string;
	description: string;
	kind: SqlFragmentKind;
	body: string;
}

const HEADER_RE = /^-- =+\s*$/;

function inferKind(name: string): SqlFragmentKind {
	const n = name.toUpperCase();
	if (/(ÍNDICES|INDICES|INDEX)/.test(n)) return "index";
	if (/(FOREIGN|FK\b|FOREIGN\s+KEY)/.test(n)) return "fk";
	if (/(INSERT|SEED|DATOS\s+INICIALES|DATOS\s+SEMILLA)/.test(n)) return "seed";
	if (/(TABLAS|TABLE)/.test(n)) return "table";
	return "raw";
}

function slugify(s: string, i: number): string {
	const base = s
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
	return base ? `${base}-${i}` : `frag-${i}`;
}

export function parseSql(content: string): SqlFragment[] {
	const lines = content.split(/\r?\n/);
	const fragments: SqlFragment[] = [];
	let i = 0;
	let preambleEnd = -1;
	let firstHeaderIdx = -1;
	for (let k = 0; k < lines.length; k++) {
		if (HEADER_RE.test(lines[k] ?? "")) { firstHeaderIdx = k; break; }
	}
	if (firstHeaderIdx === -1) {
		const body = content.trim();
		if (body) fragments.push({ id: "frag-0", name: "Contenido", description: "", kind: "raw", body });
		return fragments;
	}
	if (firstHeaderIdx > 0) {
		const pre = lines.slice(0, firstHeaderIdx).join("\n").trim();
		if (pre) {
			fragments.push({ id: "preambulo-0", name: "Preámbulo", description: "Contenido previo a la primera sección", kind: "raw", body: pre });
		}
		preambleEnd = firstHeaderIdx;
	} else {
		preambleEnd = 0;
	}
	i = preambleEnd;
	let idx = fragments.length;
	while (i < lines.length) {
		if (!HEADER_RE.test(lines[i] ?? "")) { i++; continue; }
		const titleLine = lines[i + 1] ?? "";
		const closeLine = lines[i + 2] ?? "";
		if (!HEADER_RE.test(closeLine)) { i++; continue; }
		const name = titleLine.replace(/^--\s?/, "").trim() || `Sección ${idx + 1}`;
		let j = i + 3;
		while (j < lines.length && !HEADER_RE.test(lines[j] ?? "")) j++;
		const body = lines.slice(i + 3, j).join("\n").replace(/^\s*\n+|\n+\s*$/g, "");
		fragments.push({
			id: slugify(name, idx),
			name,
			description: "",
			kind: inferKind(name),
			body,
		});
		idx++;
		i = j;
	}
	return fragments;
}

export function joinFragments(fragments: SqlFragment[]): string {
	const parts: string[] = [];
	const sep = "-- " + "=".repeat(76);
	for (const f of fragments) {
		const isPreamble = f.id.startsWith("preambulo-") || /^pre[áa]mbulo$/i.test(f.name);
		if (isPreamble) {
			parts.push(f.body.trim());
			continue;
		}
		parts.push([sep, `-- ${f.name}`, sep, "", f.body.trim()].join("\n"));
	}
	return parts.join("\n\n") + "\n";
}
