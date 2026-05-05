// @ts-nocheck
// build-code-images.mjs — descubre todos los snippets que requieren imagen
// (vía `lookupCodeImage` con miss en `code-imgs.json`), invoca el script
// Python `render-code.py` para generar las PNG, sube cada PNG a imgbb y
// actualiza el mapa.
//
// Uso (desde la raíz de ISA-DOC):
//   $env:CODE_IMG_BUILD='1'; node scripts/build-code-images.mjs
// Variables opcionales:
//   IMGBB_API_KEY    → clave imgbb (default: la del proyecto)
//   PYTHON           → ejecutable python (default: 'python')
//
// Requiere: `pip install carbon-api` (lo usa render-code.py).

import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

process.env.CODE_IMG_BUILD = "1";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT, "src", "lib", "tickets", "assets");
const PNG_DIR = path.join(ASSETS_DIR, "code");
const MAP_FILE = path.join(ASSETS_DIR, "code-imgs.json");
const PY_SCRIPT = path.join(__dirname, "render-code.py");
const IMGBB_KEY = process.env.IMGBB_API_KEY ?? "bd446e4f6fb2260ac3111574c4e7412e";
const PYTHON = process.env.PYTHON ?? "python";

async function loadMap() {
	try {
		const raw = await fs.readFile(MAP_FILE, "utf8");
		return JSON.parse(raw);
	} catch {
		return {};
	}
}

async function saveMap(map) {
	await fs.writeFile(MAP_FILE, JSON.stringify(map, null, "\t") + "\n", "utf8");
}

async function importTickets() {
	const ticketsDir = path.join(ROOT, "src", "lib", "tickets");
	const files = await fs.readdir(ticketsDir);
	const tkFiles = files.filter((n) => /^TK-\d+\.ts$/.test(n));
	const bodyPromises = [];
	for (const f of tkFiles) {
		const url = pathToFileURL(path.join(ticketsDir, f)).href;
		const mod = await import(url);
		for (const [k, v] of Object.entries(mod)) {
			if (k.startsWith("bodyTK") && v && typeof v.then === "function") {
				bodyPromises.push(v.catch(() => null));
			}
		}
	}
	await Promise.all(bodyPromises);
}

function runPython(manifest) {
	return new Promise((resolve, reject) => {
		const proc = spawn(PYTHON, [PY_SCRIPT], { stdio: ["pipe", "inherit", "inherit"] });
		proc.on("error", reject);
		proc.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`python exited ${code}`))));
		proc.stdin.end(JSON.stringify(manifest));
	});
}

async function uploadImgbb(buf, name) {
	const form = new FormData();
	form.append("key", IMGBB_KEY);
	form.append("image", buf.toString("base64"));
	form.append("name", name);
	const res = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body: form });
	const json = await res.json();
	if (!json.success) throw new Error(`imgbb upload failed: ${JSON.stringify(json)}`);
	return {
		url: json.data.url,
		width: Number(json.data.width),
		height: Number(json.data.height),
	};
}

async function main() {
	console.log("→ importando tickets para descubrir snippets…");
	await importTickets();

	const codeImage = await import(pathToFileURL(path.join(ROOT, "src", "lib", "tickets", "codeImage.ts")).href);
	const queue = codeImage.__codeImgQueue;
	console.log(`  ${queue.length} snippet(s) sin imagen`);
	if (queue.length === 0) {
		console.log("✓ nada que generar");
		return;
	}

	console.log("→ generando PNGs con carbon-api (Python)…");
	await fs.mkdir(PNG_DIR, { recursive: true });
	await runPython(queue);

	console.log("→ subiendo PNGs a imgbb…");
	const map = await loadMap();
	for (const item of queue) {
		const png = path.join(PNG_DIR, `${item.key}.png`);
		try {
			await fs.access(png);
		} catch {
			console.warn(`! falta ${item.key}.png (Python no lo generó), salto`);
			continue;
		}
		if (map[item.key]) {
			console.log(`= ${item.key} ya estaba en el mapa`);
			continue;
		}
		const buf = await fs.readFile(png);
		const info = await uploadImgbb(buf, `code-${item.key.slice(0, 12)}`);
		map[item.key] = info;
		await saveMap(map);
		console.log(`  ↑ ${item.key} → ${info.url} (${info.width}×${info.height})`);
	}
	console.log(`✓ mapa actualizado: ${path.relative(ROOT, MAP_FILE)}`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
