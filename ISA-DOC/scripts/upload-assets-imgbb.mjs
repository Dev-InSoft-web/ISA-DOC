// Sube los archivos de src/lib/tickets/assets/ a imgbb y escribe
// src/lib/tickets/assets/imgbb-map.json con la relación nombre → URL pública.
//
// Uso:
//   IMGBB_API_KEY=xxxxxxxx node scripts/upload-assets-imgbb.mjs
//   (si no hay env, usa la clave por defecto incrustada abajo)
//
// El script calcula el sha1 de cada archivo y omite la subida si el hash
// ya coincide con el del mapa anterior.

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT, "src", "lib", "tickets", "assets");
const MAP_FILE = path.join(ASSETS_DIR, "imgbb-map.json");
const API_KEY = process.env.IMGBB_API_KEY ?? "bd446e4f6fb2260ac3111574c4e7412e";

const VALID_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

async function loadMap() {
	try {
		const raw = await fs.readFile(MAP_FILE, "utf8");
		return JSON.parse(raw);
	} catch {
		return {};
	}
}

async function sha1(buf) {
	return crypto.createHash("sha1").update(buf).digest("hex");
}

async function uploadOne(name, buf) {
	const body = new FormData();
	body.append("key", API_KEY);
	body.append("image", buf.toString("base64"));
	body.append("name", path.parse(name).name);
	const res = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body });
	const json = await res.json();
	if (!json.success) {
		throw new Error(`imgbb upload failed for ${name}: ${JSON.stringify(json)}`);
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

async function main() {
	const map = await loadMap();
	const entries = await fs.readdir(ASSETS_DIR);
	for (const name of entries) {
		const ext = path.extname(name).toLowerCase();
		if (!VALID_EXT.has(ext)) continue;
		const filePath = path.join(ASSETS_DIR, name);
		const buf = await fs.readFile(filePath);
		const hash = await sha1(buf);
		const prev = map[name];
		if (prev && prev.sha1 === hash && prev.url) {
			console.log(`= ${name} (sin cambios)`);
			continue;
		}
		console.log(`↑ ${name} …`);
		const info = await uploadOne(name, buf);
		map[name] = { sha1: hash, ...info };
		await fs.writeFile(MAP_FILE, JSON.stringify(map, null, "\t") + "\n");
		console.log(`  → ${info.url}`);
	}
	console.log(`✓ mapa actualizado: ${path.relative(ROOT, MAP_FILE)}`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
