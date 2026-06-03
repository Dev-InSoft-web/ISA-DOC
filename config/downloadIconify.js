import fs from "fs";
import path from "path";

/** ISP Iconify.svelte sigue resolviendo `/icons/iconify/…`; enlace a `public/assets/icons/iconify`. */
function ensureLegacyIconifyJunction(targetDir) {
	const legacyLink = path.join(PKG_ROOT, "public", "icons", "iconify");
	try {
		if (fs.existsSync(legacyLink)) {
			fs.rmSync(legacyLink, { recursive: true, force: true });
		}
		fs.mkdirSync(path.dirname(legacyLink), { recursive: true });
		const type = process.platform === "win32" ? "junction" : "dir";
		fs.symlinkSync(targetDir, legacyLink, type);
		console.log(`[iconify] compat: public/icons/iconify → ${targetDir}`);
	} catch (e) {
		console.warn("[iconify] compat junction omitido:", e instanceof Error ? e.message : e);
	}
}
import { fileURLToPath } from "url";
import { downloadIconifyIcons } from "@ingenieria_insoft/ispsveltecomponents/download-iconify";

// Raíz del proyecto ISA-DOC (este archivo está en config/)
const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../");

const scanDirs = [path.join(PKG_ROOT, "src")];
const insoftRoot = path.join(PKG_ROOT, "node_modules", "@ingenieria_insoft");
if (fs.existsSync(insoftRoot)) {
	scanDirs.push(insoftRoot);
}

try {
	const outputDir = path.join(PKG_ROOT, "public", "assets", "icons", "iconify");
	await downloadIconifyIcons({
		outputDir,
		projectRoot: PKG_ROOT,
		scanDirs,
	});
	ensureLegacyIconifyJunction(outputDir);
	process.exit(0);
} catch (e) {
	console.error(e);
	process.exit(1);
}
