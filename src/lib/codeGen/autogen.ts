// Auto-generación de ResourceConfig a partir de fragmentos SQL parseados.
import { parseTableFragment, tableColumns, type ParsedTable, type TableColumn } from "../tableSchema.js";
import type { FieldDef, FieldType, RelationDef, ResourceConfig } from "./types.js";

interface SqlFragment { id: string; name: string; body: string; kind?: string; description?: string; }

export interface AutogenResult {
	resources: ResourceConfig[];
	tables: ParsedTable[];
	warnings: string[];
}

const TABLE_PREFIXES = ["CAPAC_", "ISYS_", "TBL_"];

export async function fetchSqlFragments(): Promise<SqlFragment[]> {
	const r = await fetch("/api/sql/fragments");
	if (!r.ok) throw new Error(`HTTP ${r.status}`);
	const data = (await r.json()) as { fragments: SqlFragment[] };
	return data.fragments ?? [];
}

export function parseAllTables(fragments: SqlFragment[]): ParsedTable[] {
	const out: ParsedTable[] = [];
	for (const f of fragments) {
		const isTablesFragment = (f.kind === "table") || /tabla|table/i.test(f.name);
		if (!isTablesFragment) continue;
		const parsed = parseTableFragment(f.id, f.name, f.body ?? "");
		out.push(...parsed);
	}
	return out;
}

export function generateResourcesFromTables(tables: ParsedTable[]): AutogenResult {
	const warnings: string[] = [];
	const resources: ResourceConfig[] = [];
	const idByTable = new Map<string, string>();

	for (const t of tables) {
		const id = t.customization?.resourceId ?? tableToResourceId(t.name);
		idByTable.set(t.name.toUpperCase(), id);
	}

	for (const t of tables) {
		const id = idByTable.get(t.name.toUpperCase()) as string;
		const cfg = buildResource(id, t, idByTable, warnings);
		resources.push(cfg);
	}

	for (const cfg of resources) {
		const t = tables.find((x) => x.name.toUpperCase() === cfg.tableName.toUpperCase());
		if (!t) continue;
		// Si la entidad ya trae relaciones de recurso persistidas, respetarlas.
		if (Array.isArray(t.customization?.relations) && t.customization!.relations!.length) continue;
		cfg.relations = inferRelations(cfg, t, tables, idByTable);
	}

	return { resources, tables, warnings };
}

function buildResource(id: string, t: ParsedTable, idByTable: Map<string, string>, warnings: string[]): ResourceConfig {
	const cols = tableColumns(t);
	const fields: FieldDef[] = cols.map((c) => columnToField(c, t, idByTable));
	const pkCols = t.compositePrimaryKey.length
		? t.compositePrimaryKey
		: cols.filter((c) => c.primaryKey).map((c) => c.name);
	for (const f of fields) {
		const colName = (f.column ?? f.name).toUpperCase();
		if (pkCols.some((p) => p.toUpperCase() === colName)) f.pk = true;
	}
	if (!fields.some((f) => f.pk)) warnings.push(`Tabla ${t.name}: sin PK detectada.`);

	const cust = t.customization ?? {};
	// Aplicar overrides de campos persistidos en la entidad.
	if (cust.fieldOverrides) {
		for (const f of fields) {
			const ov = cust.fieldOverrides[f.name] ?? cust.fieldOverrides[(f.column ?? f.name).toUpperCase()];
			if (!ov) continue;
			if (ov.caption !== undefined) f.caption = ov.caption;
			if (ov.visible !== undefined) f.visible = ov.visible;
			if (ov.required !== undefined) f.required = ov.required;
			if (ov.defaultValue !== undefined) f.defaultValue = ov.defaultValue;
			if (ov.fk !== undefined) f.fk = ov.fk;
			if (ov.enumName !== undefined) {
				f.enumName = ov.enumName;
				f.type = "enum";
			}
		}
	}

	const idLower = (cust.resourceId ?? id).toLowerCase();
	const resourceId = cust.resourceId ?? id;
	return {
		id: resourceId,
		className: cust.className ?? "T" + resourceId,
		tableName: t.name,
		tableConst: cust.tableConst,
		module: cust.module ?? "ContaPymeU/Capacitacion",
		singularApi: cust.singularApi ?? idLower,
		pluralApi: cust.pluralApi ?? pluralize(idLower),
		singularCaption: cust.singularCaption ?? resourceId,
		pluralCaption: cust.pluralCaption ?? pluralize(resourceId),
		isysRecurso: cust.isysRecurso ?? pluralize(resourceId),
		parentBaseClass: cust.parentBaseClass ?? "TCapacitacionServer",
		clientBaseClass: cust.clientBaseClass ?? "TCapacitacionBaseClient",
		uiBaseKind: cust.uiBaseKind ?? "CRUD",
		fields,
		relations: Array.isArray(cust.relations) && cust.relations.length
			? cust.relations.map((r) => ({
				alias: r.alias,
				kind: r.kind,
				target: r.target,
				versus: r.versus.map((v) => ({ ...v })),
				equals: r.equals.map((e) => ({ ...e })),
				insertEffect: r.insertEffect,
				customWhere: r.customWhere,
			}))
			: [],
		customHooks: Array.isArray(cust.customHooks) ? cust.customHooks.map((h) => ({ ...h })) : [],
		helpers: Array.isArray(cust.helpers) ? cust.helpers.map((h) => ({ ...h })) : undefined,
		omitOps: Array.isArray(cust.omitOps) ? [...cust.omitOps] : ["Verificar", "Duplicar", "Recodificar", "Consolidar"],
		exposeInFn: cust.exposeInFn,
		orderBy: cust.orderBy,
		targetFiles: cust.targetFiles ? { ...cust.targetFiles } : undefined,
	};
}

function columnToField(c: TableColumn, t: ParsedTable, idByTable: Map<string, string>): FieldDef {
	const rawName = String(c.name ?? "").trim();
	const propName = rawName.toLowerCase();
	const type = sqlTypeToFieldType(c.type);
	const fk = rawName ? detectFkTarget(rawName, t.name, idByTable) : undefined;
	const field: FieldDef = {
		name: propName,
		column: rawName === propName.toUpperCase() ? undefined : rawName,
		type,
		caption: prettyCaption(rawName),
		visible: true,
		required: c.nullable === "NOT NULL" && !c.primaryKey,
	};
	if (fk) field.fk = fk;
	if (c.defaultValue) field.defaultValue = c.defaultValue;
	return field;
}

function inferRelations(cfg: ResourceConfig, t: ParsedTable, tables: ParsedTable[], idByTable: Map<string, string>): RelationDef[] {
	const rels: RelationDef[] = [];
	const seen = new Set<string>();
	for (const other of tables) {
		if (other.name.toUpperCase() === t.name.toUpperCase()) continue;
		const myPkCols = (t.compositePrimaryKey.length
			? t.compositePrimaryKey
			: tableColumns(t).filter((c) => c.primaryKey).map((c) => c.name)
		).map((s) => s.toUpperCase());
		if (!myPkCols.length) continue;
		const otherCols = tableColumns(other).map((c) => c.name.toUpperCase());
		const sharedPk = myPkCols.filter((p) => otherCols.includes(p));
		if (sharedPk.length === 0) continue;
		const targetId = idByTable.get(other.name.toUpperCase());
		if (!targetId) continue;
		const otherPkCount = (other.compositePrimaryKey.length
			? other.compositePrimaryKey
			: tableColumns(other).filter((c) => c.primaryKey).map((c) => c.name)).length;
		// Solo emitimos relaciones direccionales padre → hijo (contenedor → contenido).
		// Si el otro tiene PK más ancha (incluye la mía como prefijo), es mi hijo.
		if (otherPkCount <= myPkCols.length) continue;
		const kind: "1-N" = "1-N";
		const alias = aliasFromTableName(other.name);
		const key = `${alias}|${kind}`;
		if (seen.has(key)) continue;
		seen.add(key);
		rels.push({
			alias,
			kind,
			target: targetId,
			versus: sharedPk.map((c) => ({ sub: c.toUpperCase(), parent: c.toUpperCase() })),
			equals: [],
			insertEffect: kind === "1-N" ? "syncDetails" : "ignore",
		});
	}
	return rels;
}

function detectFkTarget(columnName: string, ownTable: string, idByTable: Map<string, string>): string | undefined {
	const upper = columnName.toUpperCase();
	if (!upper.startsWith("I") || upper.length < 2) return undefined;
	const stem = upper.slice(1);
	for (const [tname, id] of idByTable) {
		if (tname === ownTable.toUpperCase()) continue;
		const stripped = stripTablePrefix(tname);
		if (stripped === stem || stripped.replace(/S$/u, "") === stem || stripped === stem + "S") return id;
		if (id.toUpperCase() === stem) return id;
	}
	return undefined;
}

function tableToResourceId(tableName: string): string {
	const stripped = stripTablePrefix(tableName.toUpperCase());
	const singular = singularize(stripped);
	return toPascal(singular.toLowerCase());
}

function stripTablePrefix(name: string): string {
	for (const p of TABLE_PREFIXES) if (name.startsWith(p)) return name.slice(p.length);
	return name;
}

function aliasFromTableName(tableName: string): string {
	return stripTablePrefix(tableName.toUpperCase()).replace(/_/g, "").toLowerCase();
}

function singularize(s: string): string {
	if (/IES$/.test(s)) return s.slice(0, -3) + "Y";
	if (/ES$/.test(s) && s.length > 3) return s.slice(0, -2);
	if (/S$/.test(s) && s.length > 2) return s.slice(0, -1);
	return s;
}

function pluralize(s: string): string {
	if (/[aeiouAEIOU]$/.test(s)) return s + "s";
	if (/[yY]$/.test(s)) return s.slice(0, -1) + "ies";
	return s + "es";
}

function toPascal(s: string): string {
	return s.split(/[\s_\-]+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join("");
}

function prettyCaption(col: string): string {
	const stripped = col.replace(/^[IN]/, "");
	const lower = stripped.toLowerCase();
	return lower[0].toUpperCase() + lower.slice(1);
}

function sqlTypeToFieldType(sqlType: string | undefined | null): FieldType {
	const t = String(sqlType ?? "").toUpperCase();
	if (!t) return "string";
	if (/BIT|BOOL/.test(t)) return "bool";
	if (/INT|NUMERIC|DECIMAL|FLOAT|REAL|MONEY/.test(t)) return "number";
	if (/DATE|TIME/.test(t)) return "date";
	if (/JSON/.test(t)) return "json";
	return "string";
}
