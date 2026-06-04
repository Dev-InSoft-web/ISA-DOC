// Elimina capturas locales (png/jpg/…) ya publicadas en imgbb.
// El visor usa solo `imgbb-map.json` / `code-imgs.json` vía `ticketImg` / `codeBlock`.
//
// Uso:
//   node scripts/assets/prune-uploaded-assets.mjs          # borra
//   node scripts/assets/prune-uploaded-assets.mjs --dry-run

import fs from "node:fs/promises";
import path from "node:path";

import { ISA_DOC_ROOT } from "../_shared/isa-doc-root.mjs";

const ROOT = ISA_DOC_ROOT;
const ASSETS_DIR = path.join(ROOT, "src", "lib", "features", "tickets", "assets");
const IMGBB_MAP = path.join(ASSETS_DIR, "_meta", "imgbb-map.json");
const CODE_MAP = path.join(ASSETS_DIR, "_meta", "code-imgs.json");
const CODE_DIR = path.join(ASSETS_DIR, "_meta", "code");

const VALID_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);
const dryRun = process.argv.includes("--dry-run");

async function loadJson(file) {
	try {
		return JSON.parse(await fs.readFile(file, "utf8"));
	} catch {
		return {};
	}
}

async function* walkImages(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	for (const e of entries) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) {
			if (e.name === "node_modules") continue;
			yield* walkImages(p);
			continue;
		}
		if (!e.isFile()) continue;
		const ext = path.extname(e.name).toLowerCase();
		if (!VALID_EXT.has(ext)) continue;
		yield p;
	}
}

async function main() {
	const imgbb = await loadJson(IMGBB_MAP);
	const code = await loadJson(CODE_MAP);
	const codeKeys = new Set(Object.keys(code).filter((k) => code[k]?.url));

	let removed = 0;
	let kept = 0;

	for await (const filePath of walkImages(ASSETS_DIR)) {
		const rel = path.relative(ASSETS_DIR, filePath).replace(/\\/g, "/");
		const base = path.basename(filePath);
		const inMetaCode = rel.startsWith("_meta/code/");
		const mapped =
			Boolean(imgbb[base]?.url) ||
			(inMetaCode && codeKeys.has(base.replace(/\.png$/i, "")));

		if (!mapped) {
			kept++;
			console.log(`· conservar (sin mapa): ${rel}`);
			continue;
		}

		if (dryRun) {
			console.log(`× [dry-run] ${rel}`);
		} else {
			await fs.unlink(filePath);
			console.log(`× ${rel}`);
		}
		removed++;
	}

	console.log(
		`${dryRun ? "[dry-run] " : ""}✓ ${removed} archivo(s) eliminado(s), ${kept} conservado(s) (sin entrada imgbb/code-imgs)`,
	);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
