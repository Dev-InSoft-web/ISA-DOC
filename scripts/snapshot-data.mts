/**
 * Snapshots estaticos para gh-pages. Invoca los modulos lib server
 * directamente (sin levantar astro dev) y vuelca JSONs en public/static-api/.
 *
 * Salidas:
 *   - tables.json
 *   - sql/fragments.json
 *   - ts/fragments.json
 *   - codegen/state.json
 *   - revisado.json (copia de data/revisado.json)
 *   - postman/list.json
 *   - postman/envs.json
 *   - postman/full.json
 *   - postman/entity-<slug>.json (uno por slug)
 */
import { mkdirSync, writeFileSync, copyFileSync, existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve, join, sep } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const OUT = resolve(root, "public", "static-api");
const WORKSPACE_ROOT = resolve(root, "..", "..");
const DOCS_DIR = resolve(root, "public", "docs");

function writeJson(rel: string, data: unknown): void {
	const dst = join(OUT, rel);
	mkdirSync(dirname(dst), { recursive: true });
	writeFileSync(dst, JSON.stringify(data), "utf8");
	console.log(`[snap] ${rel}`);
}

function copyJson(srcRel: string, dstRel: string): void {
	const src = resolve(root, srcRel);
	if (!existsSync(src)) return;
	const dst = join(OUT, dstRel);
	mkdirSync(dirname(dst), { recursive: true });
	copyFileSync(src, dst);
	console.log(`[snap] copy ${srcRel} -> ${dstRel}`);
}

async function snapshotTables(): Promise<void> {
	try {
		const mod = await import("../src/lib/tablesStore.server.ts");
		const doc = await mod.readTablesDoc();
		writeJson("tables.json", { ok: true, ...doc });
	} catch (e) {
		console.warn(`[snap] tables fallo: ${(e as Error).message}`);
	}
}

async function snapshotSqlFragments(): Promise<void> {
	try {
		const mod = await import("../src/lib/sqlFragments.ts");
		const raw = readFileSync(mod.sqlFilePath, "utf8");
		const fragments = mod.parseSql(raw);
		writeJson("sql/fragments.json", { fragments, full: raw });
	} catch (e) {
		console.warn(`[snap] sql/fragments fallo: ${(e as Error).message}`);
	}
}

async function snapshotTsFragments(): Promise<void> {
	try {
		const mod = await import("../src/lib/tsFragments.ts");
		const map = await mod.loadProdTsFragments();
		writeJson("ts/fragments.json", { ok: true, map });
	} catch (e) {
		console.warn(`[snap] ts/fragments fallo: ${(e as Error).message}`);
	}
}

async function snapshotCodegenState(): Promise<void> {
	try {
		const pathsMod = await import("../src/lib/codeGen/paths.ts");
		const stateFile = join(pathsMod.codegenDir, "_state.json");
		if (existsSync(stateFile)) {
			let raw = readFileSync(stateFile, "utf8");
			if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
			const state = raw.trim() ? JSON.parse(raw) : {};
			writeJson("codegen/state.json", { ok: true, state });
		} else {
			writeJson("codegen/state.json", { ok: true, state: {} });
		}
	} catch (e) {
		console.warn(`[snap] codegen/state fallo: ${(e as Error).message}`);
	}
}

async function snapshotPostman(): Promise<void> {
	try {
		const mod = await import("../src/lib/postman/store.ts");

		const snap = (prefix: string, store: import("../src/lib/postman/store.ts").PostmanStore): void => {
			const meta = store.loadCollectionMeta();
			if (meta) writeJson(`${prefix}/list.json`, meta);
			const envs = store.loadEnvironments();
			writeJson(`${prefix}/envs.json`, envs);
			const full = store.loadFullCollection();
			if (full) writeJson(`${prefix}/full.json`, full);
			if (meta) {
				for (const ent of meta.entities) {
					const e = store.loadEntity(ent.slug);
					if (e) writeJson(`${prefix}/entity-${ent.slug}.json`, e);
				}
			}
		};

		snap("postman", mod.clientesisStore);
		snap("patyia-postman", mod.patyiaStore);
	} catch (e) {
		console.warn(`[snap] postman fallo: ${(e as Error).message}`);
	}
}

function safeResolveWs(rel: string): string | null {
	const abs = resolve(WORKSPACE_ROOT, rel);
	const r = WORKSPACE_ROOT.endsWith(sep) ? WORKSPACE_ROOT : WORKSPACE_ROOT + sep;
	if (abs !== WORKSPACE_ROOT && !abs.startsWith(r)) return null;
	return abs;
}

function safeRegex(p: string): RegExp | null {
	try { return new RegExp(p); } catch { return null; }
}

function extractSymbol(lines: string[], symbol: string): { start: number; end: number } | null {
	const needle = symbol.trim();
	if (!needle) return null;
	const wordRe = new RegExp(`(^|[^A-Za-z0-9_])${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^A-Za-z0-9_]|$)`);
	let startIdx = -1;
	for (let i = 0; i < lines.length; i++) {
		if (wordRe.test(lines[i])) { startIdx = i; break; }
	}
	if (startIdx < 0) return null;
	let depth = 0;
	let opened = false;
	for (let i = startIdx; i < lines.length; i++) {
		const line = lines[i];
		const stripped = line.replace(/\/\/.*$/, "").replace(/(['"`])(?:\\.|(?!\1).)*\1/g, "''");
		for (const ch of stripped) {
			if (ch === "{") { depth++; opened = true; }
			else if (ch === "}") {
				depth--;
				if (opened && depth === 0) return { start: startIdx, end: i };
			}
		}
		if (!opened && i > startIdx) {
			if (line.trim() === "" || /;\s*$/.test(line)) return { start: startIdx, end: i };
		}
	}
	return { start: startIdx, end: Math.min(lines.length - 1, startIdx + 60) };
}

function guessLangFromPath(p: string): string {
	const ext = p.split(".").pop()?.toLowerCase() ?? "";
	switch (ext) {
		case "ts": case "tsx": return "typescript";
		case "js": case "jsx": return "javascript";
		case "sql": return "sql";
		case "json": return "json";
		case "yaml": case "yml": return "yaml";
		case "ps1": return "powershell";
		case "sh": return "bash";
		default: return "";
	}
}

function resolveSourceFragment(attrs: Record<string, string>): { lang: string; body: string } {
	const p = attrs.path;
	const lang = attrs.lang || guessLangFromPath(p);
	const abs = safeResolveWs(p);
	if (!abs) return { lang, body: `> ⚠ \`${p}\`: path outside workspace` };
	let raw: string;
	try { raw = readFileSync(abs, "utf8"); }
	catch (e) { return { lang, body: `> ⚠ \`${p}\`: ${(e as Error).message}` }; }
	const lines = raw.split(/\r?\n/);
	let startIdx = 0;
	let endIdx = Math.min(lines.length - 1, 3999);
	if (attrs.symbol) {
		const r = extractSymbol(lines, attrs.symbol);
		if (!r) return { lang, body: `> ⚠ \`${p}\`: symbol "${attrs.symbol}" no encontrado` };
		startIdx = r.start; endIdx = r.end;
	} else if (attrs.from || attrs.to) {
		if (attrs.from) {
			const re = safeRegex(attrs.from);
			if (!re) return { lang, body: `> ⚠ \`${p}\`: invalid from regex` };
			const i = lines.findIndex((l) => re.test(l));
			if (i < 0) return { lang, body: `> ⚠ \`${p}\`: from "${attrs.from}" no encontrado` };
			startIdx = i;
		}
		if (attrs.to) {
			const re = safeRegex(attrs.to);
			if (!re) return { lang, body: `> ⚠ \`${p}\`: invalid to regex` };
			const i = lines.slice(startIdx + 1).findIndex((l) => re.test(l));
			endIdx = i < 0 ? lines.length - 1 : startIdx + 1 + i;
		}
	} else if (attrs.start || attrs.end) {
		if (attrs.start) startIdx = Math.max(0, parseInt(attrs.start, 10) - 1);
		if (attrs.end) endIdx = Math.max(startIdx, parseInt(attrs.end, 10) - 1);
	}
	return { lang, body: lines.slice(startIdx, endIdx + 1).join("\n") };
}

function resolveIncludesInMd(md: string): string {
	const re = /<!--\s*src\s+([^>]+?)\s*-->/g;
	const attrRe = /(\w+)\s*=\s*"([^"]*)"/g;
	return md.replace(re, (_full, body: string) => {
		const attrs: Record<string, string> = {};
		for (const a of body.matchAll(attrRe)) attrs[a[1]] = a[2];
		if (!attrs.path) return `> ⚠ include sin \`path\``;
		const { lang, body: src } = resolveSourceFragment(attrs);
		const fence = "```";
		return `${fence}${lang}\n${src.replace(/```/g, "ʼʼʼ")}\n${fence}`;
	});
}

function snapshotResolvedDocs(): void {
	if (!existsSync(DOCS_DIR)) return;
	const projects = readdirSync(DOCS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());
	for (const proj of projects) {
		const projDir = join(DOCS_DIR, proj.name);
		const outDir = join(OUT, "docs", proj.name);
		mkdirSync(outDir, { recursive: true });
		const files = readdirSync(projDir).filter((f) => f.endsWith(".md"));
		for (const f of files) {
			const md = readFileSync(join(projDir, f), "utf8");
			const resolved = resolveIncludesInMd(md);
			writeFileSync(join(outDir, f), resolved, "utf8");
		}
		console.log(`[snap] docs/${proj.name} (${files.length} archivos resueltos)`);
	}
}

async function snapshotPatyiaStagingIdentidades(): Promise<void> {
	try {
		const mod = await import("../src/lib/dbPaty.ts");
		const pool = await mod.getPatyPool();
		const sql = `SELECT TOP 100 ITERCERO, ICONTACTO, COUNT(*) AS QCONV, MAX(FHCRE) AS ULT_FH
			FROM [AYUDASCP_IA_STAGING].dbo.CONVERSACIONES
			WHERE ITERCERO IS NOT NULL
			GROUP BY ITERCERO, ICONTACTO
			ORDER BY QCONV DESC, ULT_FH DESC`;
		const result = await pool.request().query(sql);
		const rows = (result.recordset ?? []) as Array<{ ITERCERO: string; ICONTACTO: string | null; QCONV: number; ULT_FH: Date | null }>;
		const items = rows.map((r) => ({
			itercero: String(r.ITERCERO ?? "").trim(),
			icontacto: String(r.ICONTACTO ?? "").trim(),
			qconv: Number(r.QCONV ?? 0),
			ultFh: r.ULT_FH ? new Date(r.ULT_FH).toISOString() : null,
			nombreTercero: "",
			nombreContacto: "",
		}));

		try {
			const helper = await import("../src/lib/patyia/identidadesCache.ts");
			const { terceros, contactos } = await helper.resolverIdentidades(items.map((it) => ({ itercero: it.itercero, icontacto: it.icontacto })));
			for (const it of items) {
				it.nombreTercero = terceros[it.itercero] ?? "";
				it.nombreContacto = contactos[it.icontacto] ?? "";
			}
		} catch (e) {
			console.warn(`[snap] identidades: enriquecer nombres fallo: ${(e as Error).message}`);
		}

		writeJson("patyia/staging/identidades.json", { ok: true, db: "AYUDASCP_IA_STAGING", items, snapshotAt: new Date().toISOString() });
	} catch (e) {
		console.warn(`[snap] patyia/staging/identidades fallo: ${(e as Error).message}`);
	}
}

async function main(): Promise<void> {
	mkdirSync(OUT, { recursive: true });
	copyJson("data/revisado.json", "revisado.json");
	await snapshotTables();
	await snapshotSqlFragments();
	await snapshotTsFragments();
	await snapshotCodegenState();
	await snapshotPostman();
	await snapshotPatyiaStagingIdentidades();
	snapshotResolvedDocs();
}

main().catch((e) => {
	console.error("[snap] fallo total:", e);
	process.exit(1);
});
