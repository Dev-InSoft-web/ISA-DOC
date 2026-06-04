/**
 * CLI opcional — NO sustituye la bitácora ISA-DOC (SqlExecCard: candado + modal).
 * MSSQL Paty/ClientesIS siempre con confirmación en UI; PG vía POST /api/patyia/prompts/sync-pg (auto).
 *
 * Uso local/debug:
 *   npx tsx scripts/patyia/prompts/exec-paty-prompts-ultra-merge.mts --dry-run
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import sql from "mssql";
import { execSync } from "node:child_process";
import { ISA_DOC_ROOT } from "../../_shared/isa-doc-root.ts";

const dryRun = process.argv.includes("--dry-run");
const skipBuild = process.argv.includes("--skip-build");

function loadLabLocalSettings(): void {
	const path = resolve(ISA_DOC_ROOT, "..", "lab-langgraph", "local.settings.json");
	if (!existsSync(path)) {
		throw new Error(`No se encontró ${path}`);
	}
	const raw = JSON.parse(readFileSync(path, "utf8")) as { Values?: Record<string, string> };
	for (const [k, v] of Object.entries(raw.Values ?? {})) {
		if (typeof v === "string" && v.trim()) process.env[k] = v;
	}
}

function patyConfig(): sql.config {
	const host = process.env.PATY_MSSQL_HOST ?? "";
	const user = process.env.PATY_MSSQL_USER ?? "";
	const pass = process.env.PATY_MSSQL_PASS ?? "";
	const name = process.env.PATY_MSSQL_DB ?? "";
	const port = Number(process.env.PATY_MSSQL_PORT ?? "1433");
	if (!host || !user || !pass || !name) {
		throw new Error("Faltan PATY_MSSQL_* en lab-langgraph/local.settings.json");
	}
	return {
		server: host,
		port,
		user,
		password: pass,
		database: name,
		options: { encrypt: true, trustServerCertificate: true },
		requestTimeout: 300_000,
		connectionTimeout: 30_000,
	};
}

const sqlPath = resolve(
	ISA_DOC_ROOT,
	"src/lib/features/patyia/070-sql/seed-prompts-ultra-tdconsulta.sql",
);

async function main(): Promise<void> {
	loadLabLocalSettings();
	if (!skipBuild) {
		execSync("node scripts/patyia/prompts/build-paty-prompts-ultra-sql.mjs", {
			cwd: ISA_DOC_ROOT,
			stdio: "inherit",
		});
	}
	const batch = readFileSync(sqlPath, "utf8");
	const db = process.env.PATY_MSSQL_DB ?? "?";
	console.log(`[exec-ultra-merge] BD objetivo: ${db}`);
	if (dryRun) {
		console.log(`[exec-ultra-merge] dry-run: ${batch.length} caracteres SQL, sin ejecutar.`);
		return;
	}
	const pool = await sql.connect(patyConfig());
	try {
		const result = await pool.request().query(batch);
		const sets = Array.isArray(result.recordsets) ? result.recordsets.length : 0;
		const last = (result.recordsets as unknown[][] | undefined)?.[sets - 1] ?? [];
		const rows = Array.isArray(last) ? last.length : 0;
		console.log(`[exec-ultra-merge] OK · recordsets=${sets} · filas verificación=${rows}`);
		if (rows > 0 && rows !== 13) {
			console.warn(`[exec-ultra-merge] advertencia: se esperaban 13 filas PROMPT_%, hay ${rows}`);
		}
	} finally {
		await pool.close();
	}
}

main().catch((e) => {
	console.error(e instanceof Error ? e.message : e);
	process.exit(1);
});
