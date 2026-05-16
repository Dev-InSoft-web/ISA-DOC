import fs from "fs";
import path from "path";
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
	await downloadIconifyIcons({
		outputDir: path.join(PKG_ROOT, "public", "icons", "iconify"),
		projectRoot: PKG_ROOT,
		scanDirs,
	});
	process.exit(0);
} catch (e) {
	console.error(e);
	process.exit(1);
}
