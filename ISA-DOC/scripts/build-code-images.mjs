// @ts-nocheck
// build-code-images.mjs — descubre todos los snippets que requieren imagen
// (llamadas a `codeBlock(src, lang?)` y `compareTable({ kind:"code", before, after, lang })`
// en los archivos `src/lib/tickets/TK-*.ts`), invoca `render-code.py`
// (carbon-api → carbon.now.sh), sube cada PNG a imgbb y actualiza el mapa
// `src/lib/tickets/assets/code-imgs.json`.
//
// Uso (desde la raíz de ISA-DOC):
//   npm run code-images:build
// Variables opcionales:
//   IMGBB_API_KEY    → clave imgbb (default: la del proyecto)
//   PYTHON           → ejecutable python (default: 'python')
//
// Requiere previamente: `pip install carbon-api`.

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TICKETS_DIR = path.join(ROOT, "src", "lib", "tickets");
const ASSETS_DIR = path.join(TICKETS_DIR, "assets");
const PNG_DIR = path.join(ASSETS_DIR, "code");
const MAP_FILE = path.join(ASSETS_DIR, "code-imgs.json");
const PY_SCRIPT = path.join(__dirname, "render-code.py");
const IMGBB_KEY = process.env.IMGBB_API_KEY ?? "bd446e4f6fb2260ac3111574c4e7412e";
const PYTHON = process.env.PYTHON ?? "python";

async function loadMap() {
	try {
		return JSON.parse(await fs.readFile(MAP_FILE, "utf8"));
	} catch {
		return {};
	}
}

async function saveMap(map) {
	await fs.writeFile(MAP_FILE, JSON.stringify(map, null, "\t") + "\n", "utf8");
}

function sha1(input) {
	return crypto.createHash("sha1").update(input).digest("hex");
}

function templateLiteralText(node) {
	// Solo plantillas SIN interpolación (`...`) o string literals ("...").
	if (ts.isNoSubstitutionTemplateLiteral(node) || ts.isStringLiteral(node)) {
		return node.text;
	}
	return null;
}

function readObjectProps(objectLit) {
	const out = {};
	for (const p of objectLit.properties) {
		if (!ts.isPropertyAssignment(p)) continue;
		const name = p.name.getText().replace(/['"`]/g, "");
		out[name] = p.initializer;
	}
	return out;
}

async function discoverSnippets() {
	const files = (await fs.readdir(TICKETS_DIR)).filter((n) => /^TK-\d+\.ts$/.test(n));
	const snippets = [];
	const seen = new Set();
	const push = (lang, src) => {
		if (!src) return;
		const key = sha1(`${lang}\0${src}`);
		if (seen.has(key)) return;
		seen.add(key);
		snippets.push({ key, lang, src });
	};
	for (const f of files) {
		const filePath = path.join(TICKETS_DIR, f);
		const text = await fs.readFile(filePath, "utf8");
		const sf = ts.createSourceFile(f, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
		const visit = (node) => {
			if (ts.isCallExpression(node)) {
				const callee = node.expression.getText(sf);
				if (callee === "codeBlock") {
					const [arg0, arg1] = node.arguments;
					const src = arg0 ? templateLiteralText(arg0) : null;
					const lang = arg1 && ts.isStringLiteral(arg1) ? arg1.text : "typescript";
					push(lang, src);
				} else if (callee === "compareTable") {
					const [arg0] = node.arguments;
					if (arg0 && ts.isObjectLiteralExpression(arg0)) {
						const props = readObjectProps(arg0);
						const kind = props.kind && ts.isStringLiteral(props.kind) ? props.kind.text : "code";
						if (kind !== "code") return;
						const lang = props.lang && ts.isStringLiteral(props.lang) ? props.lang.text : "typescript";
						const before = props.before ? templateLiteralText(props.before) : null;
						const after = props.after ? templateLiteralText(props.after) : null;
						push(lang, before);
						push(lang, after);
					}
				}
			}
			ts.forEachChild(node, visit);
		};
		visit(sf);
	}
	return snippets;
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
	console.log("→ analizando AST de los TK-*.ts para descubrir snippets…");
	const all = await discoverSnippets();
	const map = await loadMap();
	const pending = all.filter((s) => !map[s.key]);
	console.log(`  total: ${all.length}, ya mapeados: ${all.length - pending.length}, faltantes: ${pending.length}`);
	if (pending.length === 0) {
		console.log("✓ nada que generar");
		return;
	}

	console.log("→ generando PNGs con carbon-api (Python)…");
	await fs.mkdir(PNG_DIR, { recursive: true });
	await runPython(pending);

	console.log("→ subiendo PNGs a imgbb…");
	for (const item of pending) {
		const png = path.join(PNG_DIR, `${item.key}.png`);
		try {
			await fs.access(png);
		} catch {
			console.warn(`! falta ${item.key}.png (Python no lo generó), salto`);
			continue;
		}
		if (map[item.key]) continue;
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
