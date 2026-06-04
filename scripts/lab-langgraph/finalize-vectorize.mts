/**
 * Finaliza corpus para vectorizar: Whisper → proofread → PDFs ImgBB.
 * Cascada de API keys sin espera tras MiniMax; cada archivo hasta OK.
 *
 * Uso:
 *   npm run lab:finalize-vectorize
 *   npm run lab:finalize-vectorize -- --skip-whisper
 *   npm run lab:finalize-vectorize -- --only gov-pdfs
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

function parseArgs(argv: string[]): { only: Set<string> | null; skip: Set<string> } {
	const skip = new Set<string>();
	let only: Set<string> | null = null;
	for (const a of argv) {
		if (a === "--skip-whisper") skip.add("whisper");
		if (a === "--skip-proofread") skip.add("proofread");
		if (a === "--skip-gov-pdfs") skip.add("gov");
		if (a === "--only-whisper") only = new Set(["whisper"]);
		if (a === "--only-proofread") only = new Set(["proofread"]);
		if (a === "--only-gov-pdfs") only = new Set(["gov"]);
	}
	return { only, skip };
}

function runNpm(script: string): Promise<number> {
	return new Promise((resolve, reject) => {
		console.log(`\n════════ ${script} ════════\n`);
		const child = spawn("npm", ["run", script], {
			cwd: ROOT,
			stdio: "inherit",
			shell: true,
		});
		child.on("error", reject);
		child.on("close", (code) => resolve(code ?? 1));
	});
}

const { only, skip } = parseArgs(process.argv.slice(2));
const steps: Array<{ key: string; script: string }> = [
	{ key: "audit-before", script: "lab:vectorize:status" },
	{ key: "whisper", script: "lab:yt:whisper-resume" },
	{ key: "proofread", script: "lab:yt:proofread-resume" },
	{ key: "gov", script: "lab:gov:convert-pdfs" },
	{ key: "audit-after", script: "lab:vectorize:status" },
];

console.log("Finalizar vectorización · cascada Groq→MiniMax · reintentos máx 1 min");
if (only) console.log(`Solo: ${[...only].join(", ")}`);
else if (skip.size) console.log(`Omitidos: ${[...skip].join(", ")}`);

for (const step of steps) {
	if (step.key.startsWith("audit")) {
		if (only && !only.has("whisper") && !only.has("proofread") && !only.has("gov")) {
			/* full pipeline: show audits */
		} else if (only) continue;
		await runNpm(step.script);
		continue;
	}
	if (only && !only.has(step.key)) continue;
	if (skip.has(step.key)) {
		console.log(`\n— omitido ${step.script}\n`);
		continue;
	}
	const code = await runNpm(step.script);
	if (code !== 0) {
		console.error(`\n✗ ${step.script} terminó con código ${code}`);
		process.exit(code);
	}
}

console.log("\n✓ Finalización completada. Revisa lab:vectorize:status antes de index-rag.");
