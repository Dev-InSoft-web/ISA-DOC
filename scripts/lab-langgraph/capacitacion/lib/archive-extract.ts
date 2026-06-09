import AdmZip from "adm-zip";
import { execFile } from "node:child_process";
import { mkdir, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const SEVEN_ZIP_CANDIDATES = [
	"C:\\Program Files\\7-Zip\\7z.exe",
	"C:\\Program Files (x86)\\7-Zip\\7z.exe",
];

const PROCESSABLE_EXT = new Set(["pdf", "pptx", "xlsx", "xls", "ppt", "docx", "doc"]);

export async function extractArchive(archivePath: string, outDir: string): Promise<void> {
	await mkdir(outDir, { recursive: true });
	const ext = archivePath.split(".").pop()?.toLowerCase() ?? "";
	if (ext === "rar") {
		const ok = await extractWith7z(archivePath, outDir);
		if (!ok) throw new Error("RAR requiere 7-Zip instalado (https://www.7-zip.org/)");
		return;
	}
	extractZipWithAdm(archivePath, outDir);
}

function extractZipWithAdm(archivePath: string, outDir: string): void {
	const zip = new AdmZip(archivePath);
	zip.extractAllTo(outDir, true);
}

async function extractWith7z(archivePath: string, outDir: string): Promise<boolean> {
	for (const bin of SEVEN_ZIP_CANDIDATES) {
		try {
			await stat(bin);
			await execFileAsync(bin, ["x", archivePath, `-o${outDir}`, "-y"], { timeout: 300_000 });
			return true;
		} catch {
			/* try next */
		}
	}
	return false;
}

export async function listProcessableFiles(rootDir: string): Promise<string[]> {
	const out: string[] = [];

	async function walk(dir: string): Promise<void> {
		let entries: string[];
		try {
			entries = await readdir(dir);
		} catch {
			return;
		}
		for (const name of entries) {
			const full = join(dir, name);
			const st = await stat(full);
			if (st.isDirectory()) {
				await walk(full);
				continue;
			}
			const ext = name.split(".").pop()?.toLowerCase() ?? "";
			if (PROCESSABLE_EXT.has(ext)) out.push(full);
		}
	}

	await walk(rootDir);
	return out.sort();
}
