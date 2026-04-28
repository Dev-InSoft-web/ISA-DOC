import process from "node:process";
import type sql from "mssql";
import { openPool, resolveSettingsPath } from "./db.js";
import {
	sqlCleanupLegacy900PlanAttributes,
	sqlSyncDificultadPlanAttributes,
	sqlSyncDriverVideoPlanAttributes,
	sqlUpdateIplanPadreFromDottedIplan,
	sqlUpsertVideoDriverAttributes,
} from "./hierarchy-indices-sql.js";
import { manualMappings, tableDestinationOverrides } from "./manual-mappings.js";
import { buildColumnPlan, type ColumnPlanEntry } from "./mapping.js";
import {
	fetchColumns,
	fetchIdentityColumns,
	fetchPrimaryKeyColumns,
	fetchTables,
	tableExists,
} from "./schema.js";

interface CliArgs {
	mode: string;
	dryRun: boolean;
	truncate: boolean;
	only: string | null;
}

function parseArgs(argv: string[]): CliArgs {
	const asSet = new Set(argv);
	const mode = argv[2] ?? "analyze";
	const dryRun = asSet.has("--dry-run");
	const truncate = asSet.has("--truncate");
	const onlyIdx = argv.indexOf("--only");
	const only = onlyIdx >= 0 ? (argv[onlyIdx + 1] ?? null) : null;
	return { mode, dryRun, truncate, only };
}

function srcToDest(src: string): string {
	return src.endsWith("_OLD") ? src.slice(0, -4) : src;
}

function normName(name: string): string {
	return String(name || "")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-zA-Z0-9]/g, "")
		.toUpperCase();
}

function similarity(a: string, b: string): number {
	const x = normName(a);
	const y = normName(b);
	if (!x || !y) return 0;
	const maxLen = Math.max(x.length, y.length);
	let same = 0;
	for (let i = 0; i < Math.min(x.length, y.length); i += 1) {
		if (x[i] === y[i]) same += 1;
	}
	return same / maxLen;
}

function resolveDestinationTable(srcTable: string, destinationTables: string[]): string {
	const forced = tableDestinationOverrides[srcTable];
	if (forced) return forced;

	const proposed = srcToDest(srcTable);
	if (destinationTables.includes(proposed)) return proposed;

	let best: string | null = null;
	let bestScore = 0;
	for (const t of destinationTables) {
		const score = similarity(proposed, t);
		if (score > bestScore) {
			bestScore = score;
			best = t;
		}
	}
	if (best && bestScore >= 0.72) return best;
	return proposed;
}

function suggestDestinationTables(
	srcTable: string,
	destinationTables: string[],
	top = 5,
): { table: string; score: number }[] {
	const proposed = srcToDest(srcTable);
	return destinationTables
		.map((t) => ({ table: t, score: similarity(proposed, t) }))
		.sort((a, b) => b.score - a.score)
		.slice(0, top);
}

function tablePairBanner(src: string, dst: string): string {
	return `\n=== ${src} -> ${dst} ===`;
}

function notNullWhereClauseFromPlan(plan: ColumnPlanEntry[]): string {
	const mapped = plan.filter((p) => p.selectExpr !== "NULL");
	const notNullGuards = mapped
		.filter((p) => String(p.dest.is_nullable).toUpperCase() === "NO")
		.map((p) => `(${p.selectExpr}) IS NOT NULL`);
	return notNullGuards.length > 0 ? `\nWHERE ${notNullGuards.join("\n  AND ")}` : "";
}

function aliasSource(expr: string, alias: string): string {
	return String(expr).replace(/\bs\./g, `${alias}.`);
}

function buildInsertSql(
	schema: string,
	srcTable: string,
	destTable: string,
	plan: ColumnPlanEntry[],
	pkColumnNames: string[] = [],
): string {
	const mapped = plan.filter((p) => p.selectExpr !== "NULL");
	const destCols = mapped.map((p) => `[${p.dest.column_name}]`).join(", ");
	const whereClause = notNullWhereClauseFromPlan(plan);

	const pkParts: string[] = [];
	for (const pk of pkColumnNames) {
		const p = mapped.find((m) => m.dest.column_name === pk);
		if (p) pkParts.push(aliasSource(p.selectExpr, "s2"));
	}
	const useDedupe = pkColumnNames.length > 0 && pkParts.length === pkColumnNames.length;

	if (!useDedupe) {
		const selectCols = mapped.map((p) => `${p.selectExpr} AS [${p.dest.column_name}]`).join(",\n  ");
		return `
INSERT INTO [${schema}].[${destTable}] (${destCols})
SELECT
  ${selectCols}
FROM [${schema}].[${srcTable}] s${whereClause};`.trim();
	}

	const selectColsOuter = mapped
		.map((p) => `${aliasSource(p.selectExpr, "s")} AS [${p.dest.column_name}]`)
		.join(",\n  ");
	const whereInner = whereClause.replace(/\bs\./g, "s2.");

	return `
INSERT INTO [${schema}].[${destTable}] (${destCols})
SELECT
  ${selectColsOuter}
FROM (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY ${pkParts.join(", ")}
    ORDER BY (SELECT NULL)
  ) AS [__rn]
  FROM [${schema}].[${srcTable}] s2${whereInner}
) s
WHERE s.[__rn] = 1`.trim();
}

function buildDeleteByPkSql(
	schema: string,
	srcTable: string,
	destTable: string,
	plan: ColumnPlanEntry[],
	pkColumnNames: string[] = [],
): string {
	const mapped = plan.filter((p) => p.selectExpr !== "NULL");
	const whereClause = notNullWhereClauseFromPlan(plan);
	const pkParts: { name: string; expr: string }[] = [];

	for (const pk of pkColumnNames) {
		const p = mapped.find((m) => m.dest.column_name === pk);
		if (p) {
			pkParts.push({ name: pk, expr: aliasSource(p.selectExpr, "s") });
		}
	}

	if (pkColumnNames.length === 0 || pkParts.length !== pkColumnNames.length) return "";

	const selectPkCols = pkParts.map((p) => `${p.expr} AS [${p.name}]`).join(",\n    ");
	const joinPk = pkParts.map((p) => `d.[${p.name}] = src.[${p.name}]`).join("\n   AND ");

	return `
;WITH src AS (
  SELECT DISTINCT
    ${selectPkCols}
  FROM [${schema}].[${srcTable}] s${whereClause}
)
DELETE d
FROM [${schema}].[${destTable}] d
INNER JOIN src
   ON ${joinPk};`.trim();
}

function printPlan(plan: ColumnPlanEntry[]): void {
	for (const p of plan) {
		let src = "NULL";
		if (p.sourceColumn?.column_name) src = p.sourceColumn.column_name;
		else if (p.strategy === "empty-not-null") src = "(vacío)";
		else if (p.strategy === "manual") src = "(manual)";
		console.log(` - ${p.dest.column_name} <= ${src} [${p.strategy}]`);
	}
}

async function runAnalyze(pool: sql.ConnectionPool, schema: string, onlyTable: string | null): Promise<void> {
	const srcTables = await fetchTables(pool, schema);
	const allCapacTables = await fetchTables(pool, schema, "CAPAC%");
	const destinationTables = allCapacTables
		.map((t) => t.TABLE_NAME)
		.filter((t) => !t.endsWith("_OLD"));
	const filtered = onlyTable ? srcTables.filter((t) => t.TABLE_NAME === onlyTable) : srcTables;

	for (const t of filtered) {
		const src = t.TABLE_NAME;
		const dst = resolveDestinationTable(src, destinationTables);
		if (!(await tableExists(pool, schema, dst))) {
			console.log(tablePairBanner(src, dst));
			console.log(" ! Tabla destino no existe.");
			const suggestions = suggestDestinationTables(src, destinationTables);
			if (suggestions.length > 0) {
				console.log("   Posibles destinos:");
				for (const s of suggestions) console.log(`   - ${s.table} (${s.score.toFixed(2)})`);
			}
			continue;
		}
		const [srcCols, dstCols] = await Promise.all([
			fetchColumns(pool, schema, src),
			fetchColumns(pool, schema, dst),
		]);
		const identityCols = await fetchIdentityColumns(pool, schema, dst);
		const destColsToMap = dstCols.filter((c) => !identityCols.has(c.column_name));
		const plan = buildColumnPlan(destColsToMap, srcCols, manualMappings[dst] ?? {});

		console.log(tablePairBanner(src, dst));
		console.log(` src cols: ${srcCols.length} | dst cols: ${dstCols.length} | dst identity: ${identityCols.size}`);
		printPlan(plan);
	}
}

async function runMigrate(
	pool: sql.ConnectionPool,
	schema: string,
	onlyTable: string | null,
	dryRun: boolean,
	truncate: boolean,
): Promise<void> {
	const srcTables = await fetchTables(pool, schema);
	const allCapacTables = await fetchTables(pool, schema, "CAPAC%");
	const destinationTables = allCapacTables
		.map((t) => t.TABLE_NAME)
		.filter((t) => !t.endsWith("_OLD"));
	const filtered = onlyTable ? srcTables.filter((t) => t.TABLE_NAME === onlyTable) : srcTables;

	for (const t of filtered) {
		const src = t.TABLE_NAME;
		const dst = resolveDestinationTable(src, destinationTables);
		if (!(await tableExists(pool, schema, dst))) {
			console.log(tablePairBanner(src, dst));
			console.log(" ! Omitida: no existe tabla destino.");
			const suggestions = suggestDestinationTables(src, destinationTables);
			if (suggestions.length > 0) {
				console.log("   Posibles destinos:");
				for (const s of suggestions) console.log(`   - ${s.table} (${s.score.toFixed(2)})`);
			}
			continue;
		}
		const [srcCols, dstCols] = await Promise.all([
			fetchColumns(pool, schema, src),
			fetchColumns(pool, schema, dst),
		]);
		const identityCols = await fetchIdentityColumns(pool, schema, dst);
		const destColsToMap = dstCols.filter((c) => !identityCols.has(c.column_name));
		const plan = buildColumnPlan(destColsToMap, srcCols, manualMappings[dst] ?? {});

		console.log(tablePairBanner(src, dst));
		printPlan(plan);

		const pkCols = await fetchPrimaryKeyColumns(pool, schema, dst);
		const deleteByPkSql = buildDeleteByPkSql(schema, src, dst, plan, pkCols);
		const insertSql = buildInsertSql(schema, src, dst, plan, pkCols);
		if (
			pkCols.length > 0 &&
			pkCols.filter((pk) => plan.some((x) => x.dest.column_name === pk && x.selectExpr !== "NULL"))
				.length === pkCols.length
		) {
			console.log(` Dedupe por PK (${pkCols.join(", ")}): una fila por clave en origen`);
		}
		const whereClause = notNullWhereClauseFromPlan(plan);
		if (whereClause) {
			const totalRs = await pool.request().query<{ n: number }>(`SELECT COUNT(*) AS n FROM [${schema}].[${src}] s`);
			const okRs = await pool
				.request()
				.query<{ n: number }>(`SELECT COUNT(*) AS n FROM [${schema}].[${src}] s${whereClause}`);
			const total = totalRs.recordset[0]?.n ?? 0;
			const ok = okRs.recordset[0]?.n ?? 0;
			if (ok < total) {
				console.log(` ! Filas omitidas (NOT NULL / cast): ${total - ok} de ${total}`);
			}
		}
		if (dryRun) {
			console.log(" --dry-run activo. SQL generado:");
			console.log(insertSql);
			continue;
		}

		const tx = pool.transaction();
		await tx.begin();
		try {
			const req = tx.request();
			if (truncate) {
				await req.query(`TRUNCATE TABLE [${schema}].[${dst}]`);
			} else if (deleteByPkSql) {
				const deleted = await req.query(deleteByPkSql);
				const removed = deleted.rowsAffected?.[0] ?? 0;
				if (removed > 0) console.log(` OK filas eliminadas por PK: ${removed}`);
			}
			const result = await req.query(insertSql);
			const inserted = result.rowsAffected?.[0] ?? 0;
			if (src === "CAPAC_PLANDECURSO_OLD" && dst === "CAPAC_PLANES_CURSOS") {
				await req.query(sqlUpsertVideoDriverAttributes);
				await req.query(sqlUpdateIplanPadreFromDottedIplan);
				await req.query(sqlSyncDriverVideoPlanAttributes);
				await req.query(sqlSyncDificultadPlanAttributes);
				await req.query(sqlCleanupLegacy900PlanAttributes);
				console.log(" OK IPLAN en notación jerárquica (puntos); IPLANPADRE recalculado");
				console.log(" OK atributos de detalle: NATRIBUTO (etiquetas UI), carga desde DRIVERVIDEO/DATO1 y limpieza legacy 900+");
			}
			await tx.commit();
			console.log(` OK filas insertadas: ${inserted}`);
		} catch (err) {
			await tx.rollback();
			const msg = err instanceof Error ? err.message : String(err);
			console.log(` ERROR al migrar ${src} -> ${dst}: ${msg}`);
		}
	}
}

async function main(): Promise<void> {
	const args = parseArgs(process.argv);
	const settingsPath = resolveSettingsPath(process.argv);
	const schema = "dbo";
	const onlyTable = args.only ?? null;

	const pool = await openPool(settingsPath);
	try {
		if (args.mode === "migrate") {
			await runMigrate(pool, schema, onlyTable, args.dryRun, args.truncate);
		} else {
			await runAnalyze(pool, schema, onlyTable);
		}
	} finally {
		await pool.close();
	}
}

main().catch((e: unknown) => {
	console.error(e);
	process.exit(1);
});
