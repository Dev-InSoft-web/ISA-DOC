/**
 * Parser/emisor de tablas SQL (T-SQL) para el editor visual.
 *
 * Reconoce bloques del estilo:
 *   -- Tabla X (opcional)
 *   IF OBJECT_ID('X', 'U') IS NULL (opcional)
 *   CREATE TABLE X (
 *       COL TYPE [extras...],
 *       ...
 *       [PRIMARY KEY (col1, col2)]
 *   );
 *
 * Los detalles desconocidos por columna se conservan en `extra` para
 * minimizar pérdida cuando el usuario re-emite el cuerpo.
 */

export const COMMON_COLUMN_TYPES: string[] = [
	"BIGINT",
	"INT",
	"TINYINT",
	"BIT",
	"VARCHAR(25)",
	"VARCHAR(50)",
	"VARCHAR(255)",
	"VARCHAR(MAX)",
	"TEXT",
	"DATETIME2",
	"DATETIME2(7)",
];

export interface TableColumn {
	name: string;
	type: string;
	nullable: "" | "NULL" | "NOT NULL";
	defaultValue: string;
	primaryKey: boolean;
	extra: string;
}

export interface ParsedTable {
	/** Nombre del fragmento padre (para categoría: principales/pivote/historial). */
	fragmentId: string;
	fragmentName: string;
	/** Comentario línea opcional (sin "-- "). */
	comment: string;
	hasIfNotExists: boolean;
	originalName: string;
	name: string;
	columns: TableColumn[];
	compositePrimaryKey: string[];
	/** Texto que aparece dentro del paréntesis pero no se pudo parsear como columna. */
	extraStatements: string[];
	/** Sufijo posterior al `);` (constraints, opciones). Normalmente vacío. */
	trailing: string;
}

const COMMENT_RE = /^\s*--\s?(.*)$/;
const IF_NOT_EXISTS_RE = /^\s*IF\s+OBJECT_ID\s*\(\s*'([^']+)'\s*,\s*'U'\s*\)\s+IS\s+NULL\s*$/i;
const CREATE_RE = /^\s*CREATE\s+TABLE\s+([A-Za-z_][\w]*)\s*\(\s*$/i;
const CREATE_INLINE_RE = /^\s*CREATE\s+TABLE\s+([A-Za-z_][\w]*)\s*\((.*)$/i;

function splitTopLevelCommas(input: string): string[] {
	const out: string[] = [];
	let buf = "";
	let depth = 0;
	let inStr = false;
	for (let i = 0; i < input.length; i++) {
		const ch = input[i];
		if (inStr) {
			buf += ch;
			if (ch === "'") {
				if (input[i + 1] === "'") { buf += input[++i]; continue; }
				inStr = false;
			}
			continue;
		}
		if (ch === "'") { inStr = true; buf += ch; continue; }
		if (ch === "(") { depth++; buf += ch; continue; }
		if (ch === ")") { depth--; buf += ch; continue; }
		if (ch === "," && depth === 0) { out.push(buf.trim()); buf = ""; continue; }
		buf += ch;
	}
	if (buf.trim()) out.push(buf.trim());
	return out;
}

const PK_INLINE_RE = /\bPRIMARY\s+KEY\b/i;
const PK_COMPOSITE_RE = /^\s*PRIMARY\s+KEY\s*\(([^)]*)\)\s*$/i;
const NOT_NULL_RE = /\bNOT\s+NULL\b/i;
const NULL_RE = /(^|\s)NULL\b/i;
const DEFAULT_RE = /\bDEFAULT\b/i;

function parseColumn(stmt: string): TableColumn | null {
	const trimmed = stmt.trim();
	if (!trimmed) return null;
	if (PK_COMPOSITE_RE.test(trimmed)) return null;
	// nombre
	const m = /^([A-Za-z_][\w]*)\s+(.*)$/s.exec(trimmed);
	if (!m) return null;
	const name = m[1];
	let rest = m[2];
	// type: primer token, posiblemente con (...)
	const tm = /^([A-Za-z][\w]*(?:\s*\([^)]*\))?)\s*(.*)$/s.exec(rest);
	if (!tm) return null;
	const type = tm[1].replace(/\s+/g, "");
	rest = tm[2] ?? "";

	let primaryKey = false;
	if (PK_INLINE_RE.test(rest)) {
		primaryKey = true;
		rest = rest.replace(/\bPRIMARY\s+KEY\b/i, "").trim();
	}

	let nullable: TableColumn["nullable"] = "";
	if (NOT_NULL_RE.test(rest)) {
		nullable = "NOT NULL";
		rest = rest.replace(/\bNOT\s+NULL\b/i, "").trim();
	} else if (NULL_RE.test(rest)) {
		nullable = "NULL";
		rest = rest.replace(/(^|\s)NULL\b/i, "$1").trim();
	}

	let defaultValue = "";
	const defIdx = rest.search(DEFAULT_RE);
	if (defIdx >= 0) {
		const before = rest.slice(0, defIdx).trim();
		const after = rest.slice(defIdx).replace(/^DEFAULT\s+/i, "");
		// El default es una expresión que puede tener paréntesis balanceados
		let depth = 0;
		let i = 0;
		while (i < after.length) {
			const ch = after[i];
			if (ch === "(") depth++;
			else if (ch === ")") depth--;
			else if (ch === " " && depth === 0) {
				// frenamos en el primer espacio fuera de paréntesis si no hay más palabras
				break;
			}
			i++;
		}
		defaultValue = after.slice(0, i).trim();
		rest = (before + " " + after.slice(i)).trim();
	}

	const extra = rest.trim();

	return { name, type, nullable, defaultValue, primaryKey, extra };
}

export interface ParseTableFragmentResult {
	tables: ParsedTable[];
	/** Texto crudo entre tablas (comentarios de sección, líneas vacías). */
	gaps: string[];
}

/**
 * Parsea el body de un fragmento (kind=table) y devuelve la lista de tablas
 * detectadas. Las tablas se separan por bloques que empiecen en
 * `IF OBJECT_ID(...)` o `CREATE TABLE`.
 */
export function parseTableFragment(fragmentId: string, fragmentName: string, body: string): ParsedTable[] {
	const lines = body.split(/\r?\n/);
	const tables: ParsedTable[] = [];
	let i = 0;
	while (i < lines.length) {
		const line = lines[i] ?? "";
		// posible comentario
		let comment = "";
		if (COMMENT_RE.test(line)) {
			comment = (COMMENT_RE.exec(line) as RegExpExecArray)[1].trim();
			i++;
		}
		const ifLine = lines[i] ?? "";
		let hasIfNotExists = false;
		const ifMatch = IF_NOT_EXISTS_RE.exec(ifLine);
		if (ifMatch) { hasIfNotExists = true; i++; }
		const createLine = lines[i] ?? "";
		const cm = CREATE_RE.exec(createLine) ?? CREATE_INLINE_RE.exec(createLine);
		if (!cm) { i++; continue; }
		const tableName = cm[1];
		const inlineRest = (cm.length > 2 ? cm[2] : "") ?? "";
		i++;
		// recolectar líneas hasta el cierre `);` con balance de paréntesis
		const buf: string[] = [];
		if (inlineRest.trim()) buf.push(inlineRest);
		let depth = 1;
		while (i < lines.length && depth > 0) {
			const l = lines[i] ?? "";
			for (const ch of l) {
				if (ch === "(") depth++;
				else if (ch === ")") depth--;
				if (depth === 0) break;
			}
			if (depth === 0) {
				const closeIdx = l.lastIndexOf(")");
				if (closeIdx >= 0) buf.push(l.slice(0, closeIdx));
			} else {
				buf.push(l);
			}
			i++;
		}
		const inner = buf.join("\n").trim();
		const stmts = splitTopLevelCommas(inner);
		const columns: TableColumn[] = [];
		const extraStatements: string[] = [];
		let compositePrimaryKey: string[] = [];
		for (const s of stmts) {
			const pkm = PK_COMPOSITE_RE.exec(s);
			if (pkm) {
				compositePrimaryKey = pkm[1].split(",").map((c) => c.trim()).filter(Boolean);
				continue;
			}
			const col = parseColumn(s);
			if (col) columns.push(col);
			else extraStatements.push(s);
		}

		tables.push({
			fragmentId,
			fragmentName,
			comment,
			hasIfNotExists,
			originalName: tableName,
			name: tableName,
			columns,
			compositePrimaryKey,
			extraStatements,
			trailing: "",
		});
	}
	return tables;
}

export function emitColumn(col: TableColumn): string {
	const parts: string[] = [col.name, col.type];
	if (col.primaryKey) parts.push("PRIMARY KEY");
	if (col.nullable) parts.push(col.nullable);
	if (col.defaultValue) parts.push("DEFAULT", col.defaultValue);
	if (col.extra) parts.push(col.extra);
	return parts.join(" ").replace(/\s+/g, " ").trim();
}

export function emitTable(t: ParsedTable): string {
	const out: string[] = [];
	if (t.comment) out.push(`-- ${t.comment}`);
	if (t.hasIfNotExists) out.push(`IF OBJECT_ID('${t.name}', 'U') IS NULL`);
	out.push(`CREATE TABLE ${t.name} (`);
	const lines: string[] = [];
	for (const c of t.columns) lines.push("    " + emitColumn(c));
	for (const s of t.extraStatements) lines.push("    " + s);
	if (t.compositePrimaryKey.length > 0) {
		lines.push(`    PRIMARY KEY (${t.compositePrimaryKey.join(", ")})`);
	}
	out.push(lines.join(",\n"));
	out.push(");");
	return out.join("\n");
}

/**
 * Reemplaza en el body original el bloque CREATE TABLE de cada tabla por
 * su versión re-emitida. Se reescribe por completo para garantizar consistencia.
 */
export function emitTablesAsBody(tables: ParsedTable[]): string {
	return tables.map(emitTable).join("\n\n") + "\n";
}
