/**
 * Pipeline de assets de tickets: fuente (.mmd / .chart.json) → PNG local → imgbb → imgbb-map.json.
 *
 * Uso típico por ticket:
 *   node scripts/tickets/build-TK-1431163-assets.mjs
 *   IMGBB_API_KEY=… (opcional; hay clave por defecto como upload-assets-imgbb.mjs)
 */

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "..", "..");
export const ASSETS_ROOT = path.join(ROOT, "src", "lib", "tickets", "assets");
export const MAP_FILE = path.join(ASSETS_ROOT, "imgbb-map.json");
export const API_KEY = process.env.IMGBB_API_KEY ?? "bd446e4f6fb2260ac3111574c4e7412e";

const MERMAID_FLOWCHART_INIT =
	'%%{init: {"flowchart": {"curve": "stepAfter", "htmlLabels": true}}}%%';

export function prepareMermaidDiagram(diagram) {
	const trimmed = diagram.trim();
	if (/^%%\{init:/i.test(trimmed)) return trimmed;
	if (!/^(flowchart|graph)\s/im.test(trimmed)) return trimmed;
	return `${MERMAID_FLOWCHART_INIT}\n${trimmed}`;
}

export function utf8ToBase64(text) {
	return Buffer.from(text, "utf8")
		.toString("base64")
		.replace(/\+/g, "-")
		.replace(/\//g, "_");
}

export function mermaidInkUrl(diagram) {
	return `https://mermaid.ink/img/${utf8ToBase64(prepareMermaidDiagram(diagram))}`;
}

export function chartConfigToJson(chartConfig) {
	return JSON.stringify(chartConfig, (_k, v) => (typeof v === "function" ? undefined : v));
}

export function quickChartUrl(chartConfig, width = 900, height = 480, plugins = "datalabels") {
	const plug = plugins ? `&plugins=${encodeURIComponent(plugins)}` : "";
	return `https://quickchart.io/chart?w=${width}&h=${height}${plug}&c=${encodeURIComponent(chartConfigToJson(chartConfig))}`;
}

/** Detecta PNG o JPEG y devuelve extensión + dimensiones nativas. */
export function imageDimensions(buf) {
	if (buf.length >= 24 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
		return { ext: ".png", width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
	}
	if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
		let i = 2;
		while (i < buf.length - 8) {
			if (buf[i] !== 0xff) break;
			const marker = buf[i + 1];
			const len = buf.readUInt16BE(i + 2);
			if (marker === 0xc0 || marker === 0xc2) {
				return { ext: ".jpg", width: buf.readUInt16BE(i + 5), height: buf.readUInt16BE(i + 7) };
			}
			i += 2 + len;
		}
		throw new Error("JPEG sin marcador SOF");
	}
	throw new Error("Formato de imagen no soportado (se esperaba PNG o JPEG)");
}

export async function loadMap() {
	try {
		return JSON.parse(await fs.readFile(MAP_FILE, "utf8"));
	} catch {
		return {};
	}
}

export async function saveMap(map) {
	await fs.writeFile(MAP_FILE, JSON.stringify(map, null, "\t") + "\n");
}

export async function sha1(buf) {
	return crypto.createHash("sha1").update(buf).digest("hex");
}

export async function fetchBuffer(url, label) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${label}: HTTP ${res.status} ${url}`);
	return Buffer.from(await res.arrayBuffer());
}

export async function renderMermaidToBuffer(mmdText) {
	return fetchBuffer(mermaidInkUrl(mmdText), "mermaid.ink");
}

export async function renderQuickChartToBuffer(chartConfig, render = {}) {
	const url = quickChartUrl(
		chartConfig,
		render.width ?? 900,
		render.height ?? 480,
		render.plugins ?? "datalabels",
	);
	return fetchBuffer(url, "quickchart.io");
}

export async function uploadImgbb(pngName, buf) {
	const body = new FormData();
	body.append("key", API_KEY);
	body.append("image", buf.toString("base64"));
	body.append("name", path.parse(pngName).name);
	const res = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body });
	const json = await res.json();
	if (!json.success) {
		throw new Error(`imgbb ${pngName}: ${JSON.stringify(json)}`);
	}
	return {
		url: json.data.url,
		display_url: json.data.display_url,
		thumb: json.data.thumb?.url,
		delete_url: json.data.delete_url,
		width: json.data.width,
		height: json.data.height,
		size: json.data.size,
	};
}

/**
 * @param {string} ticketId ej. TK-1431163
 * @param {Array<{ id: string, kind: 'mermaid'|'quickchart', source: string, png: string, render?: object }>} assets
 */
export async function buildTicketAssets(ticketId, assets) {
	const ticketDir = path.join(ASSETS_ROOT, ticketId);
	await fs.mkdir(ticketDir, { recursive: true });
	const map = await loadMap();

	for (const asset of assets) {
		const srcPath = path.join(ticketDir, asset.source);
		const baseOut = asset.png ?? asset.file;
		if (!baseOut) throw new Error(`asset sin png/file: ${asset.id}`);

		let buf;
		if (asset.kind === "mermaid") {
			const mmd = await fs.readFile(srcPath, "utf8");
			console.log(`◇ ${ticketId} · mermaid.ink ← ${asset.source}`);
			buf = await renderMermaidToBuffer(mmd);
		} else if (asset.kind === "quickchart") {
			const raw = await fs.readFile(srcPath, "utf8");
			const config = JSON.parse(raw);
			console.log(`◇ ${ticketId} · quickchart.io ← ${asset.source}`);
			buf = await renderQuickChartToBuffer(config, asset.render ?? {});
		} else if (asset.kind === "capture") {
			console.log(`◇ ${ticketId} · captura local ← ${asset.source}`);
			buf = await fs.readFile(srcPath);
		} else {
			throw new Error(`kind no soportado: ${asset.kind}`);
		}

		const { ext, width: localW, height: localH } = imageDimensions(buf);
		const stem = baseOut.replace(/\.(png|jpe?g|webp|gif)$/i, "");
		const fileName = `${stem}${ext}`;
		const outPath = path.join(ticketDir, fileName);

		await fs.writeFile(outPath, buf);
		console.log(`  archivo local ${fileName} (${localW}×${localH})`);

		const hash = await sha1(buf);
		const prev = map[fileName];
		if (prev?.sha1 === hash && prev?.url) {
			console.log(`= imgbb ${fileName} (sin cambios, ${prev.width}×${prev.height})`);
			continue;
		}

		console.log(`↑ imgbb ${fileName} …`);
		const info = await uploadImgbb(fileName, buf);
		map[fileName] = { sha1: hash, ...info };
		await saveMap(map);
		console.log(`  → ${info.url} (imgbb ${info.width}×${info.height})`);
	}

	console.log(`✓ ${ticketId} listo · mapa: ${path.relative(ROOT, MAP_FILE)}`);
}
