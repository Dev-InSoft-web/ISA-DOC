/**
 * Reorganiza src/lib/features/tickets → lib/, records/{proyecto}/{MM}/{DD}/, assets/...
 * Uso: node scripts/tickets/refolder-tickets.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { ISA_DOC_ROOT } from "../_shared/isa-doc-root.mjs";

const ROOT = ISA_DOC_ROOT;
const TICKETS = path.join(ROOT, "src", "lib", "features", "tickets");

const MES = {
	ene: "01", feb: "02", mar: "03", abr: "04", may: "05", jun: "06",
	jul: "07", ago: "08", sep: "09", oct: "10", nov: "11", dic: "12",
};

const LIB_FILES = [
	"template.ts",
	"tk-helpers.ts",
	"snippets.ts",
	"codeImage.ts",
	"assetsRemote.ts",
	"commitAuthors.ts",
	"imgDims.ts",
	"ticketColors.ts",
	"ticketDiagramAssets.ts",
	"ticketViewerPrefs.ts",
	"patyia-prompt-metrics.ts",
	"ticket-viewer-defaults.json",
];

function parseFecha(fechaSolicitud) {
	const m = String(fechaSolicitud ?? "").match(/^(\d{1,2})\/(\w+)\.\/(\d{4})/i);
	if (!m) return { mm: "00", dd: "00" };
	return { mm: MES[m[2].toLowerCase()] ?? "00", dd: m[1].padStart(2, "0") };
}

function proyectoSlug(proyecto) {
	return proyecto === "PatyIA" ? "patyia" : "clientesis";
}

async function parseIndexMeta() {
	const raw = await fs.readFile(path.join(TICKETS, "index.ts"), "utf8");
	const meta = new Map();
	const re = /id:\s*"(TK-\d+)"[\s\S]*?fechaSolicitud:\s*"([^"]+)"(?:[\s\S]*?proyecto:\s*"(PatyIA|ClientesIS)")?/g;
	let m;
	while ((m = re.exec(raw)) !== null) {
		meta.set(m[1], { fecha: m[2], proyecto: m[3] ?? "ClientesIS" });
	}
	return meta;
}

async function exists(p) {
	try {
		await fs.access(p);
		return true;
	} catch {
		return false;
	}
}

async function move(src, dest) {
	await fs.mkdir(path.dirname(dest), { recursive: true });
	await fs.rename(src, dest);
}

function libImportDepth(recordRel) {
	// records/patyia/06/04 → 4 niveles hasta tickets/
	const parts = recordRel.split("/").filter(Boolean);
	return parts.length;
}

function recordImportPrefix(recordRel) {
	const n = libImportDepth(recordRel);
	return "../".repeat(n) + "lib/";
}

async function patchRecordImports(filePath, recordRel) {
	const prefix = recordImportPrefix(recordRel);
	let s = await fs.readFile(filePath, "utf8");
	s = s.replace(/from\s+["']\.\/tk-helpers["']/g, `from "${prefix}tk-helpers"`);
	s = s.replace(/from\s+["']\.\/snippets["']/g, `from "${prefix}snippets"`);
	s = s.replace(/from\s+["']\.\/template["']/g, `from "${prefix}template"`);
	s = s.replace(/from\s+["']\.\/patyia-prompt-metrics["']/g, `from "${prefix}patyia-prompt-metrics"`);
	await fs.writeFile(filePath, s, "utf8");
}

async function extractTypes() {
	const raw = await fs.readFile(path.join(TICKETS, "index.ts"), "utf8");
	const start = raw.indexOf("export interface TicketNormativa");
	const end = raw.indexOf("const NORMATIVA_DEFAULT");
	if (start < 0 || end < 0) throw new Error("No se encontraron interfaces en index.ts");
	const typesBlock = raw.slice(start, end).trim() + "\n";
	await fs.writeFile(path.join(TICKETS, "types.ts"), typesBlock, "utf8");
}

async function patchLibFiles() {
	const lib = path.join(TICKETS, "lib");
	await fs.writeFile(
		path.join(lib, "template.ts"),
		(await fs.readFile(path.join(lib, "template.ts"), "utf8")).replace(
			'from "./index"',
			'from "../types"',
		),
		"utf8",
	);
	const diagram = await fs.readFile(path.join(lib, "ticketDiagramAssets.ts"), "utf8");
	let d = diagram
		.replace(/\.\/assets\//g, "../assets/")
		.replace(
			/\.\/assets\/TK-1431662\//g,
			"../assets/patyia/05/29/TK-1431662/",
		)
		.replace(
			/\.\/assets\/TK-1431666\//g,
			"../assets/patyia/05/29/TK-1431666/",
		);
	await fs.writeFile(path.join(lib, "ticketDiagramAssets.ts"), d, "utf8");

	await fs.writeFile(
		path.join(lib, "assetsRemote.ts"),
		(await fs.readFile(path.join(lib, "assetsRemote.ts"), "utf8")).replace(
			'./assets/imgbb-map.json',
			"../assets/_meta/imgbb-map.json",
		),
		"utf8",
	);

	await fs.writeFile(
		path.join(lib, "codeImage.ts"),
		(await fs.readFile(path.join(lib, "codeImage.ts"), "utf8"))
			.replace("./assets/code-imgs.json", "../assets/_meta/code-imgs.json")
			.replace("assets/code-imgs.json", "assets/_meta/code-imgs.json"),
		"utf8",
	);
}

async function rebuildIndexImports(meta) {
	const raw = await fs.readFile(path.join(TICKETS, "index.ts"), "utf8");
	const importEnd = raw.indexOf("export interface TicketNormativa");
	const bodyStart = raw.indexOf("const NORMATIVA_DEFAULT");
	if (importEnd < 0 || bodyStart < 0) throw new Error("index.ts estructura inesperada");

	const lines = ['import { buildTicketHtml, tiempoTotalEstimadoMin } from "./lib/template";'];
	const seen = new Set();

	for (const [id, { fecha, proyecto }] of meta) {
		const { mm, dd } = parseFecha(fecha);
		const slug = proyectoSlug(proyecto);
		const rel = `./records/${slug}/${mm}/${dd}/${id}`;
		const base = id.replace("TK-", "");
		const tsPath = path.join(TICKETS, "records", slug, mm, dd, `${id}.ts`);
		if (!(await exists(tsPath))) continue;
		const mod = await fs.readFile(tsPath, "utf8");
		const sqlPath = path.join(TICKETS, "records", slug, mm, dd, `${id}-sql.ts`);
		if (mod.includes(`export async function buildBody${base}`)) {
			lines.push(`import { buildBody${base} } from "${rel}";`);
		} else if (mod.includes(`export function buildBody${base}`)) {
			lines.push(`import { buildBody${base} } from "${rel}";`);
		} else if (mod.includes(`export const body${base}`)) {
			lines.push(`import { body${base} } from "${rel}";`);
		}
		if (await exists(sqlPath)) {
			const sqlMod = await fs.readFile(sqlPath, "utf8");
			const exp = sqlMod.match(/export const (\w+)/);
			if (exp) lines.push(`import { ${exp[1]} } from "${rel}-sql";`);
		}
		seen.add(id);
	}

	// Huérfanos en _draft
	const draftDir = path.join(TICKETS, "records", "patyia", "_draft");
	if (await exists(draftDir)) {
		for (const f of await fs.readdir(draftDir)) {
			if (!f.endsWith(".ts")) continue;
			const id = f.replace(".ts", "");
			if (seen.has(id)) continue;
			lines.push(`// ${id} no está en TICKETS[] — ver records/patyia/_draft/`);
		}
	}

	const typesExport =
		'export type { TicketNormativa, TicketCommit, TicketDbChange, TicketRegistro } from "./types";\n\n';
	const finalBody = raw.slice(bodyStart);
	await fs.writeFile(
		path.join(TICKETS, "index.ts"),
		lines.join("\n") + "\n\n" + typesExport + finalBody,
		"utf8",
	);
}

async function main() {
	const meta = await parseIndexMeta();
	console.log(`Tickets en index: ${meta.size}`);

	// 1) types.ts
	await extractTypes();

	// 2) lib/
	const libDir = path.join(TICKETS, "lib");
	await fs.mkdir(libDir, { recursive: true });
	for (const f of LIB_FILES) {
		const src = path.join(TICKETS, f);
		if (await exists(src)) await move(src, path.join(libDir, f));
	}

	// 3) records: TK-*.ts
	for (const [id, info] of meta) {
		const { mm, dd } = parseFecha(info.fecha);
		const slug = proyectoSlug(info.proyecto);
		const destDir = path.join(TICKETS, "records", slug, mm, dd);
		for (const suffix of [".ts", "-sql.ts", ".html"]) {
			const src = path.join(TICKETS, `${id}${suffix}`);
			if (await exists(src)) {
				await move(src, path.join(destDir, `${id}${suffix}`));
			}
		}
		const recordRel = `records/${slug}/${mm}/${dd}`;
		const tsFile = path.join(destDir, `${id}.ts`);
		if (await exists(tsFile)) await patchRecordImports(tsFile, recordRel);
	}

	// Huérfano TK-1418988
	const orphan = path.join(TICKETS, "TK-1418988.ts");
	if (await exists(orphan)) {
		const draft = path.join(TICKETS, "records", "patyia", "_draft");
		await fs.mkdir(draft, { recursive: true });
		await move(orphan, path.join(draft, "TK-1418988.ts"));
		await patchRecordImports(path.join(draft, "TK-1418988.ts"), "records/patyia/_draft");
	}

	// 4) assets/_meta
	const assetsRoot = path.join(TICKETS, "assets");
	const metaDir = path.join(assetsRoot, "_meta");
	await fs.mkdir(metaDir, { recursive: true });
	for (const f of ["imgbb-map.json", "code-imgs.json"]) {
		const src = path.join(assetsRoot, f);
		if (await exists(src)) await move(src, path.join(metaDir, f));
	}
	const codeDir = path.join(assetsRoot, "code");
	if (await exists(codeDir)) await move(codeDir, path.join(metaDir, "code"));

	// 5) assets por ticket
	for (const [id, info] of meta) {
		const srcDir = path.join(assetsRoot, id);
		if (!(await exists(srcDir))) continue;
		const { mm, dd } = parseFecha(info.fecha);
		const slug = proyectoSlug(info.proyecto);
		const destDir = path.join(assetsRoot, slug, mm, dd, id);
		await move(srcDir, destDir);
	}

	// TK-XXX → _shared
	const sharedSrc = path.join(assetsRoot, "TK-XXX");
	if (await exists(sharedSrc)) {
		await move(sharedSrc, path.join(assetsRoot, "_shared", "TK-XXX"));
	}

	// Eliminar carpetas vacías en assets
	for (const name of ["TK-1425170", "TK-1430974", "TK-camB"]) {
		const d = path.join(assetsRoot, name);
		try {
			await fs.rmdir(d);
			console.log(`Eliminada carpeta vacía: assets/${name}`);
		} catch { /* */ }
	}

	await patchLibFiles();
	await rebuildIndexImports(meta);

	console.log("[ok] Refolder completado.");
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
