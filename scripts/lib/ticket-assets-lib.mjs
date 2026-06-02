/**
 * Pipeline de assets de tickets: fuente (.mmd / .chart.json) → PNG local → imgbb → imgbb-map.json.
 *
 * Uso típico por ticket:
 *   node scripts/tickets/build-TK-1431163-assets.mjs
 *   IMGBB_API_KEY=… (opcional; hay clave por defecto como upload-assets-imgbb.mjs)
 */

import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { spawn } from "node:child_process";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { barChartJsonToDot } from "./chart-json-to-dot.mjs";
import { chartFrameDot, dotImagePath } from "./chart-graphviz.mjs";
import sharp from "sharp";
import { removeBackgroundFromBuffer } from "./huggingface-remove-bg.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "..", "..");
export const ASSETS_ROOT = path.join(ROOT, "src", "lib", "tickets", "assets");
export const MAP_FILE = path.join(ASSETS_ROOT, "imgbb-map.json");
export const API_KEY = process.env.IMGBB_API_KEY ?? "bd446e4f6fb2260ac3111574c4e7412e";

const MERMAID_FLOWCHART_INIT =
	'%%{init: {"flowchart": {"curve": "stepAfter", "htmlLabels": true, "nodeSpacing": 44, "rankSpacing": 52, "padding": 18}}}%%';

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

export function mermaidInkUrl(diagram, format = "img") {
	const encoded = utf8ToBase64(prepareMermaidDiagram(diagram));
	return `https://mermaid.ink/${format}/${encoded}`;
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

/**
 * Mermaid → PNG vía mermaid.ink/img (Chromium en servidor: respeta htmlLabels y texto).
 * No usar `/svg` + sharp: las etiquetas HTML (foreignObject) no se rasterizan y el diagrama queda sin letras.
 * Post-proceso remove-bg: rmbg ONNX (briaai/RMBG-1.4) u otros motores en huggingface-remove-bg.mjs.
 */
export async function renderMermaidToBuffer(mmdText) {
	return fetchBuffer(mermaidInkUrl(mmdText, "img"), "mermaid.ink/img");
}

/** Ruta a `dot` (PATH o instalación típica en Windows). */
export function resolveDotExecutable() {
	if (process.env.GRAPHVIZ_DOT) return process.env.GRAPHVIZ_DOT;
	const winCandidates = [
		"C:\\Program Files\\Graphviz\\bin\\dot.exe",
		"C:\\Program Files (x86)\\Graphviz\\bin\\dot.exe",
	];
	for (const p of winCandidates) {
		if (existsSync(p)) return p;
	}
	return "dot";
}

let vizInstancePromise;

async function getVizInstance() {
	if (!vizInstancePromise) {
		const { instance } = await import("@viz-js/viz");
		vizInstancePromise = instance();
	}
	return vizInstancePromise;
}

/** DOT → SVG (@viz-js/viz) → PNG (sharp). No requiere `dot` en PATH. */
export async function renderGraphvizWasmToBuffer(dotText, vizOptions = {}) {
	const viz = await getVizInstance();
	const result = viz.render(dotText, {
		format: "svg",
		graphAttributes: { bgcolor: "transparent", dpi: "144" },
		...vizOptions,
	});
	if (result.status !== "success") {
		const msg = result.errors?.map((e) => e.message).join("; ") || "Graphviz WASM";
		throw new Error(msg);
	}
	const sharp = (await import("sharp")).default;
	return sharp(Buffer.from(result.output, "utf8")).png().toBuffer();
}

/** Renderiza DOT con el binario `dot` de Graphviz. PNG fondo transparente. */
export async function renderGraphvizCliToBuffer(dotText, dotBin = resolveDotExecutable()) {
	const tmpDir = os.tmpdir();
	const id = `gv-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
	const dotPath = path.join(tmpDir, `${id}.dot`);
	const pngPath = path.join(tmpDir, `${id}.png`);
	await fs.writeFile(dotPath, dotText, "utf8");

	await new Promise((resolve, reject) => {
		const args = ["-Tpng", "-Gdpi=144", "-Gbgcolor=transparent", dotPath, "-o", pngPath];
		const proc = spawn(dotBin, args, { stdio: ["ignore", "pipe", "pipe"] });
		let err = "";
		proc.stderr?.on("data", (c) => {
			err += c.toString();
		});
		proc.on("error", (e) => {
			if (e.code === "ENOENT") {
				reject(
					new Error(
						"Graphviz no está en PATH. Instale Graphviz y verifique `dot -V` (https://graphviz.org/download/).",
					),
				);
			} else {
				reject(e);
			}
		});
		proc.on("close", (code) => {
			if (code === 0) resolve();
			else reject(new Error(`dot salió ${code}: ${err.trim() || "sin stderr"}`));
		});
	});

	const buf = await fs.readFile(pngPath);
	await fs.unlink(dotPath).catch(() => {});
	await fs.unlink(pngPath).catch(() => {});
	return buf;
}

/** Preferencia: WASM (portable); si hay `dot` instalado, se usa el binario. */
export async function renderGraphvizToBuffer(dotText) {
	const dotBin = resolveDotExecutable();
	const hasLocalDot = dotBin !== "dot" && existsSync(dotBin);
	if (hasLocalDot) {
		try {
			return await renderGraphvizCliToBuffer(dotText, dotBin);
		} catch {
			/* fallback WASM */
		}
	}
	try {
		return await renderGraphvizWasmToBuffer(dotText);
	} catch (wasmErr) {
		if (!hasLocalDot) {
			try {
				return await renderGraphvizCliToBuffer(dotText, dotBin);
			} catch {
				/* sigue con wasmErr */
			}
		}
		throw wasmErr;
	}
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

/**
 * Chart.js (QuickChart) incrustado en marco Graphviz transparente.
 * @param {object} chartConfig Chart.js JSON
 * @param {object} render width/height/plugins
 * @param {{ ticketDir: string, graphId: string }} ctx
 */
export async function renderChartGraphvizToBuffer(chartConfig, render, ctx) {
	const chartBuf = await renderQuickChartToBuffer(chartConfig, render);
	const { width, height } = imageDimensions(chartBuf);
	const tmpName = `.tmp-${ctx.graphId}-chart.png`;
	const tmpPng = path.join(ctx.ticketDir, tmpName);
	await fs.writeFile(tmpPng, chartBuf);
	const dot = chartFrameDot(ctx.graphId, tmpPng);
	const imgRef = dotImagePath(tmpPng);
	try {
		return await renderGraphvizWasmToBuffer(dot, {
			images: [{ name: imgRef, width, height }],
		});
	} finally {
		await fs.unlink(tmpPng).catch(() => {});
	}
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
 * @param {Array<{ id: string, kind: 'mermaid'|'graphviz'|'quickchart'|'chart-graphviz'|'capture', source: string, png: string, removeBg?: boolean|'canvas', render?: object, mermaidFallback?: string, chartFallback?: string, graphvizFallback?: string }>} assets
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
		let graphvizRendered = false;
		if (asset.kind === "mermaid") {
			const mmd = await fs.readFile(srcPath, "utf8");
			console.log(`◇ ${ticketId} · mermaid.ink/img ← ${asset.source}`);
			try {
				buf = await renderMermaidToBuffer(mmd);
			} catch (e) {
				const gv = asset.graphvizFallback;
				if (gv) {
					console.warn(`  ⚠ mermaid falló (${e.message}); NO usar .dot simplificado si existe .mmd detallado`);
					const dot = await fs.readFile(path.join(ticketDir, gv), "utf8");
					if (/DEPRECADO/i.test(dot)) throw e;
					buf = await renderGraphvizToBuffer(dot);
					graphvizRendered = true;
				} else {
					throw e;
				}
			}
		} else if (asset.kind === "graphviz") {
			let dot;
			let dotLabel = asset.source;
			try {
				dot = await fs.readFile(srcPath, "utf8");
			} catch (readErr) {
				const cf = asset.chartFallback;
				if (!cf?.endsWith(".chart.json")) throw readErr;
				const chart = JSON.parse(await fs.readFile(path.join(ticketDir, cf), "utf8"));
				const graphId = asset.id.replace(/-/g, "_");
				dot = barChartJsonToDot(chart, graphId);
				dotLabel = `${cf} → DOT`;
			}
			console.log(`◇ ${ticketId} · graphviz ← ${dotLabel}`);
			try {
				buf = await renderGraphvizToBuffer(dot);
				graphvizRendered = true;
			} catch (e) {
				const fb = asset.mermaidFallback;
				if (fb) {
					const mmdPath = path.join(ticketDir, fb);
					console.warn(`  ⚠ graphviz falló (${e.message}); fallback mermaid ← ${fb}`);
					const mmd = await fs.readFile(mmdPath, "utf8");
					buf = await renderMermaidToBuffer(mmd);
				} else if (asset.chartFallback) {
					console.warn(`  ⚠ graphviz falló (${e.message}); fallback quickchart ← ${asset.chartFallback}`);
					const raw = await fs.readFile(path.join(ticketDir, asset.chartFallback), "utf8");
					buf = await renderQuickChartToBuffer(JSON.parse(raw), asset.render ?? {});
				} else {
					throw e;
				}
			}
		} else if (asset.kind === "quickchart") {
			const raw = await fs.readFile(srcPath, "utf8");
			const config = JSON.parse(raw);
			console.log(`◇ ${ticketId} · quickchart.io ← ${asset.source}`);
			buf = await renderQuickChartToBuffer(config, asset.render ?? {});
		} else if (asset.kind === "chart-graphviz") {
			const raw = await fs.readFile(srcPath, "utf8");
			const config = JSON.parse(raw);
			const graphId = asset.id.replace(/-/g, "_");
			console.log(`◇ ${ticketId} · chart.js + graphviz ← ${asset.source}`);
			try {
				buf = await renderChartGraphvizToBuffer(config, asset.render ?? {}, {
					ticketDir,
					graphId,
				});
				graphvizRendered = true;
			} catch (e) {
				console.warn(`  ⚠ chart-graphviz falló (${e.message}); solo QuickChart`);
				buf = await renderQuickChartToBuffer(config, asset.render ?? {});
			}
		} else if (asset.kind === "capture") {
			console.log(`◇ ${ticketId} · captura local ← ${asset.source}`);
			buf = await fs.readFile(srcPath);
		} else {
			throw new Error(`kind no soportado: ${asset.kind}`);
		}

		if (asset.removeBg === true || asset.removeBg === "rmbg" || asset.removeBg === "canvas") {
			const engine = asset.removeBg === "canvas" ? "canvas" : "rmbg";
			console.log(`◇ ${ticketId} · remove-bg (${engine}) ← ${asset.id}`);
			buf = await removeBackgroundFromBuffer(buf, { engine });
		}

		let { ext, width: localW, height: localH } = imageDimensions(buf);
		const stem = baseOut.replace(/\.(png|jpe?g|webp|gif)$/i, "");
		const wantPng = /\.png$/i.test(baseOut);
		if (wantPng && ext !== ".png") {
			const sharp = (await import("sharp")).default;
			buf = await sharp(buf).png().toBuffer();
			ext = ".png";
			({ width: localW, height: localH } = imageDimensions(buf));
		}
		const fileName = wantPng || graphvizRendered ? `${stem}.png` : `${stem}${ext}`;
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
