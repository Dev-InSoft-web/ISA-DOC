import type { SqlColumnNode, SqlDatabaseNode, SqlSchemaController } from "../../components/panels/sql/sqlController";

interface ColumnRow {
	TABLE_NAME: string;
	COLUMN_NAME: string;
	DATA_TYPE: string;
	CHARACTER_MAXIMUM_LENGTH: number | null;
	IS_NULLABLE: "YES" | "NO";
	ORDINAL_POSITION: number;
}

interface ConstraintRow {
	TABLE_NAME: string;
	CONSTRAINT_TYPE: "PRIMARY KEY" | "UNIQUE" | "FOREIGN KEY";
	COLUMN_NAME: string;
}

interface RowCountRow {
	TABLE_NAME: string;
	ROWS: number;
}

const DB_NAME = "AYUDASCP_IA";
const TABLES = ["CONVERSACIONES", "MENSAJESCALIFICADOS", "TIQUETESCONVERSACION", "PROPIETARIOXTERCERO"];

async function execGet<T>(sql: string): Promise<T[]> {
	const res = await fetch("/api/patyia/db/exec", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ sql }),
	});
	const data = (await res.json()) as { ok: boolean; error?: string; rows?: T[] };
	if (!data.ok) throw new Error(data.error ?? "Error desconocido");
	return data.rows ?? [];
}

export const patyiaSqlController: SqlSchemaController = {
	title: "PatyIA · Árbol SQL",
	subtitle: `Esquema en vivo de <code>${DB_NAME}</code> obtenido vía <code>SELECT</code> sobre <code>INFORMATION_SCHEMA</code>. Solo lectura.`,
	footnote: "Consultas readonly: <code>INFORMATION_SCHEMA.COLUMNS</code>, <code>INFORMATION_SCHEMA.TABLE_CONSTRAINTS</code>, <code>sys.partitions</code>.",
	async loadSchema(): Promise<SqlDatabaseNode[]> {
		const list = TABLES.map((t) => `'${t}'`).join(",");
		const colsSql = `SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME IN (${list}) ORDER BY TABLE_NAME, ORDINAL_POSITION`;
		const consSql = `SELECT tc.TABLE_NAME, tc.CONSTRAINT_TYPE, kcu.COLUMN_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME WHERE tc.TABLE_NAME IN (${list})`;
		const rowsSql = `SELECT t.name AS TABLE_NAME, SUM(p.rows) AS ROWS FROM sys.tables t JOIN sys.partitions p ON t.object_id = p.object_id WHERE p.index_id IN (0, 1) AND t.name IN (${list}) GROUP BY t.name`;

		const [cols, cons, rows] = await Promise.all([
			execGet<ColumnRow>(colsSql),
			execGet<ConstraintRow>(consSql),
			execGet<RowCountRow>(rowsSql),
		]);

		const pkSet: Set<string> = new Set();
		for (const c of cons) {
			if (c.CONSTRAINT_TYPE === "PRIMARY KEY") pkSet.add(`${c.TABLE_NAME}.${c.COLUMN_NAME}`);
		}
		const rowCount: Map<string, number> = new Map();
		for (const r of rows) rowCount.set(r.TABLE_NAME, Number(r.ROWS));

		const byTable: Map<string, SqlColumnNode[]> = new Map();
		for (const t of TABLES) byTable.set(t, []);
		for (const c of cols) {
			const arr = byTable.get(c.TABLE_NAME);
			if (!arr) continue;
			arr.push({
				name: c.COLUMN_NAME,
				dataType: c.DATA_TYPE,
				maxLen: c.CHARACTER_MAXIMUM_LENGTH,
				nullable: c.IS_NULLABLE === "YES",
				isPk: pkSet.has(`${c.TABLE_NAME}.${c.COLUMN_NAME}`),
			});
		}

		return [{
			name: DB_NAME,
			expanded: true,
			tables: TABLES.map((name) => ({
				name,
				columns: byTable.get(name) ?? [],
				rows: rowCount.has(name) ? rowCount.get(name)! : null,
				expanded: true,
			})),
		}];
	},
};
