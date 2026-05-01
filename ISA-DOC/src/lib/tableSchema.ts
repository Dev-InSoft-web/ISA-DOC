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
	kind?: "col";
	name: string;
	type: string;
	nullable: "" | "NULL" | "NOT NULL";
	defaultValue: string;
	primaryKey: boolean;
	extra: string;
}

export interface TableSection {
	kind: "section";
	name: string;
}

export interface TableSectionEnd {
	kind: "section_end";
}

export type TableRow = TableColumn | TableSection | TableSectionEnd;

export function isSectionRow(r: TableRow): r is TableSection {
	return (r as TableSection).kind === "section";
}

export function isSectionEndRow(r: TableRow): r is TableSectionEnd {
	return (r as TableSectionEnd).kind === "section_end";
}

export function isColumnRow(r: TableRow): r is TableColumn {
	return !isSectionRow(r) && !isSectionEndRow(r);
}

export function tableColumns(t: ParsedTable): TableColumn[] {
	return t.columns.filter(isColumnRow);
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
	/** Filas de la tabla: columnas reales y secciones (`kind: "section"`). */
	columns: TableRow[];
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
		const parsedRows = parseInnerWithSections(inner);

		tables.push({
			fragmentId,
			fragmentName,
			comment,
			hasIfNotExists,
			originalName: tableName,
			name: tableName,
			columns: parsedRows.rows,
			compositePrimaryKey: parsedRows.compositePrimaryKey,
			extraStatements: parsedRows.extraStatements,
			trailing: "",
		});
	}
	return tables;
}

const REGION_LINE_RE = /^--\s*#region\s+(.+?)\s*$/i;
const ENDREGION_LINE_RE = /^--\s*#endregion\b/i;

function parseInnerWithSections(inner: string): {
	rows: TableRow[];
	extraStatements: string[];
	compositePrimaryKey: string[];
} {
	const lines = inner.split(/\r?\n/);
	const columns: TableColumn[] = [];
	const extraStatements: string[] = [];
	const sectionMarks: { idx: number; kind: "start" | "end"; name?: string; seq: number }[] = [];
	let seqCounter = 0;
	let compositePrimaryKey: string[] = [];
	let bufStmt = "";
	let depth = 0;
	let inStr = false;

	const finalize = (): void => {
		const s = bufStmt.trim();
		bufStmt = "";
		if (!s) return;
		const pkm = PK_COMPOSITE_RE.exec(s);
		if (pkm) {
			compositePrimaryKey = pkm[1].split(",").map((c) => c.trim()).filter(Boolean);
			return;
		}
		const col = parseColumn(s);
		if (col) columns.push(col);
		else extraStatements.push(s);
	};

	for (const raw of lines) {
		if (!inStr && depth === 0 && bufStmt.trim() === "") {
			const trimmed = raw.trim();
			const region = REGION_LINE_RE.exec(trimmed);
			if (region) {
				sectionMarks.push({ idx: columns.length, kind: "start", name: region[1], seq: seqCounter++ });
				continue;
			}
			if (ENDREGION_LINE_RE.test(trimmed)) {
				sectionMarks.push({ idx: columns.length, kind: "end", seq: seqCounter++ });
				continue;
			}
			if (/^--/.test(trimmed)) continue;
		}
		for (let i = 0; i < raw.length; i++) {
			const ch = raw[i];
			if (inStr) {
				bufStmt += ch;
				if (ch === "'") {
					if (raw[i + 1] === "'") { bufStmt += raw[++i]; continue; }
					inStr = false;
				}
				continue;
			}
			if (ch === "'") { inStr = true; bufStmt += ch; continue; }
			if (ch === "(") { depth++; bufStmt += ch; continue; }
			if (ch === ")") { depth--; bufStmt += ch; continue; }
			if (ch === "," && depth === 0) { finalize(); continue; }
			bufStmt += ch;
		}
		bufStmt += "\n";
	}
	finalize();

	// Splice sections at recorded column indices, preserving order between marks at same idx via seq.
	const rows: TableRow[] = [];
	let cIdx = 0;
	const sorted = sectionMarks.slice().sort((a, b) => a.idx - b.idx || a.seq - b.seq);
	let sIdx = 0;
	const pushMark = (m: typeof sorted[number]): void => {
		if (m.kind === "start") rows.push({ kind: "section", name: m.name || "" });
		else rows.push({ kind: "section_end" });
	};
	while (cIdx < columns.length || sIdx < sorted.length) {
		while (sIdx < sorted.length && sorted[sIdx].idx <= cIdx) {
			pushMark(sorted[sIdx]);
			sIdx++;
		}
		if (cIdx < columns.length) { rows.push(columns[cIdx]); cIdx++; }
	}
	while (sIdx < sorted.length) { pushMark(sorted[sIdx]); sIdx++; }
	return { rows, extraStatements, compositePrimaryKey };
}

export function stripConstraints(input: string): string {
	if (!input) return "";
	let s = input;
	// 1) Strip "CONSTRAINT <name> [ ( ... ) ]" anywhere.
	const constraintRe = /\bCONSTRAINT\s+[A-Za-z_][\w]*\s*(\([^()]*\))?/gi;
	let prev = "";
	while (prev !== s) { prev = s; s = s.replace(constraintRe, ""); }
	// 2) Strip stray region/endregion markers that may have leaked into column extras.
	s = s.replace(/--\s*#(?:end)?region\b[^\n]*/gi, "");
	return s.replace(/\s+/g, " ").trim();
}

export function emitColumn(col: TableColumn): string {
	const parts: string[] = [col.name, col.type];
	if (col.primaryKey) parts.push("PRIMARY KEY");
	if (col.nullable) parts.push(col.nullable);
	if (col.defaultValue) parts.push("DEFAULT", col.defaultValue);
	const cleanExtra = stripConstraints(col.extra);
	if (cleanExtra) parts.push(cleanExtra);
	return parts.join(" ").replace(/\s+/g, " ").trim();
}

export function emitTable(t: ParsedTable): string {
	const out: string[] = [];
	if (t.comment) out.push(`-- ${t.comment}`);
	if (t.hasIfNotExists) out.push(`IF OBJECT_ID('${t.name}', 'U') IS NULL`);
	out.push(`CREATE TABLE ${t.name} (`);

	// Build inner lines with explicit comma logic.
	// Sections become `-- #region NAME` … `-- #endregion NAME` wrapping their columns.
	type InnerLine = { text: string; isStmt: boolean };
	const innerLines: InnerLine[] = [];

	let openSection: string | null = null;
	const closeSection = (): void => {
		if (openSection) {
			innerLines.push({ text: `    -- #endregion ${openSection}`, isStmt: false });
			openSection = null;
		}
	};

	for (const r of t.columns) {
		if (isSectionRow(r)) {
			closeSection();
			innerLines.push({ text: `    -- #region ${r.name}`, isStmt: false });
			openSection = r.name;
		} else if (isSectionEndRow(r)) {
			closeSection();
		} else {
			innerLines.push({ text: "    " + emitColumn(r), isStmt: true });
		}
	}
	closeSection();

	for (const s of t.extraStatements) {
		const cleaned = stripConstraints(s);
		if (cleaned) innerLines.push({ text: "    " + cleaned, isStmt: true });
	}
	if (t.compositePrimaryKey.length > 0) {
		innerLines.push({ text: `    PRIMARY KEY (${t.compositePrimaryKey.join(", ")})`, isStmt: true });
	}

	const lastStmtIdx = (() => {
		for (let i = innerLines.length - 1; i >= 0; i--) {
			if (innerLines[i].isStmt) return i;
		}
		return -1;
	})();

	const rendered: string[] = [];
	for (let i = 0; i < innerLines.length; i++) {
		const ln = innerLines[i];
		const needsComma = ln.isStmt && i < lastStmtIdx;
		rendered.push(needsComma ? ln.text + "," : ln.text);
	}
	out.push(rendered.join("\n"));
	out.push(");");
	return out.join("\n");
}

export function emitDropTable(t: ParsedTable): string {
	return `IF OBJECT_ID('${t.name}', 'U') IS NOT NULL DROP TABLE ${t.name};`;
}

/**
 * Reemplaza en el body original el bloque CREATE TABLE de cada tabla por
 * su versión re-emitida. Se reescribe por completo para garantizar consistencia.
 */
export function emitTablesAsBody(tables: ParsedTable[]): string {
	return tables.map(emitTable).join("\n\n") + "\n";
}
