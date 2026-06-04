/**
 * Sincroniza `descripcion` de commits en src/lib/features/tickets/index.ts
 * con el subject real de git (`git show -s --format=%s`).
 *
 * Uso: node scripts/tickets/sync-ticket-commit-descriptions.mjs [--dry-run]
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INDEX = path.join(ROOT, "src", "lib", "features", "tickets", "index.ts");
const CONTAPYME = path.resolve(ROOT, "..");

const REPO_PATHS = {
	"ISA-DOC": ROOT,
	PatyIA: path.join(CONTAPYME, "PatyIA"),
	"ISW-ClientesIS": path.join(CONTAPYME, "ClientesIS", "ISW-ClientesIS"),
	"ISP-ClientesIS": path.join(CONTAPYME, "ClientesIS", "ISP-ClientesIS"),
	"ISP-CLientesISServer": path.join(CONTAPYME, "ClientesIS", "ISP-CLientesISServer"),
	"ISS-ClientesIS-ContaPymeU": path.join(CONTAPYME, "ClientesIS", "ISS-ClientesIS-ContaPymeU"),
	"ISP-SvelteComponents": path.join(CONTAPYME, "ISP-SvelteComponents"),
};

const REPO_DEFAULT = "ISW-ClientesIS";

const HASH_RE = /hash:\s*"([0-9a-f]+)"/;
const REPO_RE = /repo:\s*"([^"]+)"/;
const DESC_RE = /descripcion:\s*"((?:\\.|[^"\\])*)"/;

function gitSubject(repo, hash) {
	const dir = REPO_PATHS[repo];
	if (!dir) return { error: `repo sin ruta local: ${repo}` };
	try {
		const subject = execSync(`git show -s --format=%s ${hash}`, {
			cwd: dir,
			encoding: "utf8",
			stdio: ["ignore", "pipe", "pipe"],
		}).trim();
		return { subject };
	} catch (e) {
		const err = e.stderr?.toString?.() || e.message || String(e);
		return { error: err.trim().split("\n")[0] };
	}
}

function escapeForTs(s) {
	return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function unescapeFromTs(s) {
	return s.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
}

const dryRun = process.argv.includes("--dry-run");
const lines = fs.readFileSync(INDEX, "utf8").split("\n");
const cache = new Map();
const mismatches = [];
const failures = [];
let changed = 0;

const out = lines.map((line) => {
	if (!line.includes('hash: "') || !line.includes("descripcion:")) return line;

	const hm = line.match(HASH_RE);
	const dm = line.match(DESC_RE);
	if (!hm || !dm) return line;

	const hash = hm[1];
	const repoM = line.match(REPO_RE);
	const repo = repoM ? repoM[1] : REPO_DEFAULT;
	const current = unescapeFromTs(dm[1]);
	const key = `${repo}:${hash}`;

	let subject;
	if (cache.has(key)) {
		subject = cache.get(key);
	} else {
		const r = gitSubject(repo, hash);
		if (r.error) {
			failures.push({ hash, repo, error: r.error });
			cache.set(key, null);
			return line;
		}
		subject = r.subject;
		cache.set(key, subject);
	}

	if (subject === null || subject === current) return line;

	mismatches.push({ hash, repo, was: current, now: subject });
	changed++;
	return line.replace(DESC_RE, `descripcion: "${escapeForTs(subject)}"`);
});

console.log(`Líneas con commit: ${cache.size}`);
console.log(`Descripciones corregidas: ${changed}`);
console.log(`Fallos git: ${failures.length}`);

if (failures.length) {
	console.log("\n--- Fallos ---");
	for (const f of failures) console.log(`  ${f.repo} ${f.hash}: ${f.error}`);
}

if (mismatches.length) {
	console.log("\n--- Cambios (muestra hasta 40) ---");
	for (const m of mismatches.slice(0, 40)) {
		console.log(`\n[${m.repo}] ${m.hash}`);
		console.log(`  - ${m.was}`);
		console.log(`  + ${m.now}`);
	}
	if (mismatches.length > 40) {
		console.log(`\n... y ${mismatches.length - 40} más`);
	}
}

if (!dryRun && changed > 0) {
	fs.writeFileSync(INDEX, out.join("\n"), "utf8");
	console.log(`\nActualizado: ${INDEX}`);
} else if (dryRun) {
	console.log("\n(dry-run: no se escribió el archivo)");
}
