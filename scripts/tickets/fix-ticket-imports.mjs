/**
 * Completa imports en index.ts y mueve TK-* sueltos en la raíz de tickets/.
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

function parseFecha(fechaSolicitud) {
	const m = String(fechaSolicitud ?? "").match(/^(\d{1,2})\/(\w+)\.\/(\d{4})/i);
	if (!m) return { mm: "00", dd: "00" };
	return { mm: MES[m[2].toLowerCase()] ?? "00", dd: m[1].padStart(2, "0") };
}

function proyectoSlug(proyecto) {
	return proyecto === "PatyIA" ? "patyia" : "clientesis";
}

async function exists(p) {
	try {
		await fs.access(p);
		return true;
	} catch {
		return false;
	}
}

async function parseTicketsFromIndex() {
	const raw = await fs.readFile(path.join(TICKETS, "index.ts"), "utf8");
	const blocks = raw.split(/\n\t\{/).slice(1);
	const out = new Map();
	for (const block of blocks) {
		const idM = block.match(/id:\s*"(TK-\d+)"/);
		const fechaM = block.match(/fechaSolicitud:\s*"([^"]+)"/);
		if (!idM || !fechaM) continue;
		const proyM = block.match(/proyecto:\s*"(PatyIA|ClientesIS)"/);
		out.set(idM[1], { fecha: fechaM[1], proyecto: proyM?.[1] ?? "ClientesIS" });
	}
	return out;
}

function recordImportPrefix(recordRel) {
	const n = recordRel.split("/").filter(Boolean).length;
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

async function moveTicket(id, info) {
	const { mm, dd } = parseFecha(info.fecha);
	const slug = proyectoSlug(info.proyecto);
	const destDir = path.join(TICKETS, "records", slug, mm, dd);
	const recordRel = `records/${slug}/${mm}/${dd}`;
	for (const suffix of [".ts", "-sql.ts", ".html"]) {
		const src = path.join(TICKETS, `${id}${suffix}`);
		if (await exists(src)) {
			await fs.mkdir(destDir, { recursive: true });
			await fs.rename(src, path.join(destDir, `${id}${suffix}`));
		}
	}
	const tsFile = path.join(destDir, `${id}.ts`);
	if (await exists(tsFile)) await patchRecordImports(tsFile, recordRel);
	return { rel: `./records/${slug}/${mm}/${dd}/${id}`, tsFile };
}

async function buildImports(meta) {
	const lines = ['import { buildTicketHtml, tiempoTotalEstimadoMin } from "./lib/template";'];
	const ids = [...meta.keys()].sort();
	for (const id of ids) {
		const info = meta.get(id);
		const { rel, tsFile } = await moveTicket(id, info);
		if (!(await exists(tsFile))) continue;
		const mod = await fs.readFile(tsFile, "utf8");
		const num = id.replace("TK-", "");
		if (mod.includes(`export const bodyTK${num}`)) {
			lines.push(`import { bodyTK${num} } from "${rel}";`);
		} else if (mod.includes(`buildBodyTK${num}`)) {
			lines.push(`import { buildBodyTK${num} } from "${rel}";`);
		}
		const sqlFile = path.join(path.dirname(tsFile), `${id}-sql.ts`);
		if (await exists(sqlFile)) {
			const sqlMod = await fs.readFile(sqlFile, "utf8");
			for (const m of sqlMod.matchAll(/export const (\w+)/g)) {
				lines.push(`import { ${m[1]} } from "${rel}-sql";`);
			}
		}
	}
	if (await exists(path.join(TICKETS, "records", "patyia", "_draft", "TK-1418988.ts"))) {
		lines.push("// TK-1418988 no está en TICKETS[] — ver records/patyia/_draft/");
	}
	return lines;
}

async function main() {
	const meta = await parseTicketsFromIndex();
	console.log(`Tickets parseados: ${meta.size}`);
	const imports = await buildImports(meta);
	const raw = await fs.readFile(path.join(TICKETS, "index.ts"), "utf8");
	const bodyStart = raw.indexOf("export type { TicketNormativa");
	const body = raw.slice(bodyStart);
	await fs.writeFile(
		path.join(TICKETS, "index.ts"),
		imports.join("\n") + "\n\n" + body,
		"utf8",
	);

	// Corregir diagram assets
	const diagramPath = path.join(TICKETS, "lib", "ticketDiagramAssets.ts");
	let d = await fs.readFile(diagramPath, "utf8");
	d = d.replace(/\.\.\.\/assets\//g, "../assets/");
	await fs.writeFile(diagramPath, d, "utf8");

	console.log("[ok] Imports regenerados:", imports.length);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
