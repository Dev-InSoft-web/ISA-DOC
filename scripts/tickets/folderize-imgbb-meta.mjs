/**
 * Folderización de metadatos imgbb (sin binarios): manifest por TK y asset-index.json.
 * Fechas desde staticRegistry (fechaSolicitud) + referencias en records/*.ts.
 *
 * Uso: node scripts/tickets/folderize-imgbb-meta.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { ISA_DOC_ROOT } from "../_shared/isa-doc-root.mjs";

const ROOT = ISA_DOC_ROOT;
const TICKETS = path.join(ROOT, "src", "lib", "features", "tickets");
const ASSETS = path.join(TICKETS, "assets");
const MAP_FILE = path.join(ASSETS, "_meta", "imgbb-map.json");
const INDEX_FILE = path.join(ASSETS, "_meta", "asset-index.json");

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

async function parseStaticRegistryMeta() {
	const raw = await fs.readFile(path.join(TICKETS, "staticRegistry.ts"), "utf8");
	const meta = new Map();
	const re = /\{\s*\n\t\tid:\s*"(TK-\d+)"([\s\S]*?)\n\t\},/g;
	let m;
	while ((m = re.exec(raw)) !== null) {
		const id = m[1];
		const body = m[2];
		const fecha = body.match(/fechaSolicitud:\s*"([^"]+)"/)?.[1];
		if (!fecha) continue;
		const proyecto = body.match(/proyecto:\s*"(PatyIA|ClientesIS)"/)?.[1] ?? "ClientesIS";
		meta.set(id, { fecha, proyecto });
	}
	return meta;
}

async function scanRecordImageRefs() {
	/** @type {Map<string, Set<string>>} filename -> ticket ids */
	const byFile = new Map();
	const recordsDir = path.join(TICKETS, "records");

	async function walk(dir) {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		for (const e of entries) {
			const p = path.join(dir, e.name);
			if (e.isDirectory()) {
				await walk(p);
				continue;
			}
			if (!e.name.endsWith(".ts")) continue;
			const tkMatch = p.match(/(TK-\d+)/);
			const ticketId = tkMatch?.[1];
			if (!ticketId) continue;
			const text = await fs.readFile(p, "utf8");
			const imgRe = /(?:img|ticketImg|ticketImgTransparent|imgFull)\(\s*["']([^"']+\.(?:png|jpg|jpeg|webp))["']/gi;
			let im;
			while ((im = imgRe.exec(text)) !== null) {
				const fn = im[1];
				if (!byFile.has(fn)) byFile.set(fn, new Set());
				byFile.get(fn).add(ticketId);
			}
			const qaRe = /img:\s*["']([^"']+\.(?:png|jpg|jpeg|webp))["']/gi;
			while ((im = qaRe.exec(text)) !== null) {
				const fn = im[1];
				if (!byFile.has(fn)) byFile.set(fn, new Set());
				byFile.get(fn).add(ticketId);
			}
		}
	}

	await walk(recordsDir);
	return byFile;
}

function inferTicketFromFilename(filename) {
	const m = filename.match(/^tk(\d{6,8})/i);
	return m ? `TK-${m[1]}` : undefined;
}

function pickPrimaryTicket(filename, usedBy, ticketMeta) {
	if (usedBy.size === 1) return [...usedBy][0];
	const fromName = inferTicketFromFilename(filename);
	if (fromName && usedBy.has(fromName)) return fromName;
	if (fromName && ticketMeta.has(fromName)) return fromName;
	if (usedBy.size > 0) {
		return [...usedBy].sort()[0];
	}
	return fromName;
}

async function main() {
	const ticketMeta = await parseStaticRegistryMeta();
	const refs = await scanRecordImageRefs();
	const map = JSON.parse(await fs.readFile(MAP_FILE, "utf8"));
	const assetIndex = {};
	const shared = new Map();

	for (const filename of Object.keys(map)) {
		const usedBy = refs.get(filename) ?? new Set();
		const primary = pickPrimaryTicket(filename, usedBy, ticketMeta);
		const users = [...usedBy];

		let folder = "_shared/TK-XXX";
		if (users.length > 1) {
			shared.set(filename, users);
		} else if (primary && ticketMeta.has(primary)) {
			const info = ticketMeta.get(primary);
			const { mm, dd } = parseFecha(info.fecha);
			const slug = proyectoSlug(info.proyecto);
			folder = `${slug}/${mm}/${dd}/${primary}`;
		} else if (primary) {
			folder = `_orphan/${primary}`;
		} else if (users.length === 0 && inferTicketFromFilename(filename)) {
			const tid = inferTicketFromFilename(filename);
			if (ticketMeta.has(tid)) {
				const info = ticketMeta.get(tid);
				const { mm, dd } = parseFecha(info.fecha);
				folder = `${proyectoSlug(info.proyecto)}/${mm}/${dd}/${tid}`;
			}
		}

		assetIndex[filename] = {
			folder,
			ticketId: primary ?? null,
			usedBy: users,
			imgbb: true,
		};
	}

	// Manifests por carpeta TK
	const byFolder = new Map();
	for (const [filename, idx] of Object.entries(assetIndex)) {
		const folder = idx.folder;
		if (!byFolder.has(folder)) byFolder.set(folder, []);
		byFolder.get(folder).push({ filename, ...map[filename], ticketId: idx.ticketId });
	}

	for (const [folder, assets] of byFolder) {
		const dir = path.join(ASSETS, folder);
		await fs.mkdir(dir, { recursive: true });
		const manifest = {
			generatedAt: new Date().toISOString(),
			folder,
			assets: assets.map((a) => ({
				filename: a.filename,
				ticketId: a.ticketId,
				url: a.url,
				sha1: a.sha1,
				width: a.width,
				height: a.height,
			})),
		};
		await fs.writeFile(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");
	}

	// Shared explícito
	const sharedDir = path.join(ASSETS, "_shared", "TK-XXX");
	await fs.mkdir(sharedDir, { recursive: true });
	const sharedFiles = Object.entries(assetIndex).filter(([, v]) => v.folder === "_shared/TK-XXX");
	await fs.writeFile(
		path.join(sharedDir, "manifest.json"),
		JSON.stringify(
			{
				generatedAt: new Date().toISOString(),
				note: "Capturas reutilizadas por varios TK o sin prefijo tkNNNNNN",
				assets: sharedFiles.map(([filename]) => ({
					filename,
					usedBy: assetIndex[filename].usedBy,
					...map[filename],
				})),
			},
			null,
			2,
		) + "\n",
		"utf8",
	);

	await fs.writeFile(INDEX_FILE, JSON.stringify(assetIndex, null, "\t") + "\n", "utf8");
	console.log(`✓ ${Object.keys(assetIndex).length} entradas → ${path.relative(ROOT, INDEX_FILE)}`);
	console.log(`✓ ${byFolder.size} carpetas con manifest.json`);
	const orphans = Object.entries(assetIndex).filter(([, v]) => v.folder.startsWith("_orphan"));
	if (orphans.length) console.warn("Huérfanos sin meta en staticRegistry:", orphans.map(([k]) => k).join(", "));
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
