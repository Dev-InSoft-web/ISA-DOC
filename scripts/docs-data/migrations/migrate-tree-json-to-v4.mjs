// @ts-nocheck
// Convierte los JSON v3 (anidados) al nuevo formato v4 NodeStore (plano,
// estilo SQL).
//
// Convenciones v4:
//  - `nodes`: array de NodeRow. Sin `id`, sin `label`. La identidad del
//    nodo es su `flatpath`. Sólo lleva `flatpath`, `ireference`, `kind`.
//  - `entities`: { [ENTITYNAME]: ObjRow[] }. Nombres de bucket en
//    MAYÚSCULA SOSTENIDA con `_` como separador (estilo MSSQL):
//      kind:"prefix" -> "PREFIX"
//      kind:"table"  -> "TABLE"
//      kind:"col"    -> "COLUMN"
//  - PK de cada ObjRow: `i<entityname>` en minúsculas, sin separadores
//    (p.ej. `iprefix`, `itable`, `icolumn`). Es UNA columna más en el
//    POJO; el resto de claves del obj v3 también pasa a minúsculas
//    sostenidas SIN guiones bajos (TObject-ready).
//
// Uso (desde la raíz de ISA-DOC):
//   node scripts/migrate-tree-json-to-v4.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "public", "db", "clientesis");

const ENTITY_NAME_BY_KIND = {
	table: "TABLE",
	col: "COLUMN",
	domain: "DOMAIN",
};

/** kinds que NO referencian entidad: nodos puramente estructurales. */
const STRUCTURAL_KINDS = new Set(["root", "prefix"]);

function entityNameForKind(kind) {
	const k = String(kind || "").trim();
	if (!k) return null;
	if (STRUCTURAL_KINDS.has(k)) return null;
	return ENTITY_NAME_BY_KIND[k] ?? k.toUpperCase().replace(/[\s-]+/g, "_");
}

function pkKeyForEntity(entityName) {
	return ("i" + entityName.replace(/_/g, "")).toLowerCase();
}

function tobjectKeysDeep(value) {
	if (Array.isArray(value)) return value.map(tobjectKeysDeep);
	if (value && typeof value === "object") {
		const out = {};
		for (const k of Object.keys(value)) {
			const newKey = k.toLowerCase().replace(/_/g, "");
			out[newKey] = tobjectKeysDeep(value[k]);
		}
		return out;
	}
	return value;
}

function flattenV3(rootChildren) {
	const nodes = [];
	const entities = {};
	const visit = (list) => {
		for (const n of list) {
			const flatpath = String(n.id);
			const kind = String(n.kind);
			const ireference = entityNameForKind(kind);
			if (ireference) {
				nodes.push({ flatpath, ireference, kind });
				const baseObj = n.obj && typeof n.obj === "object" ? tobjectKeysDeep(n.obj) : {};
				const extras = {};
				if (n.doc !== undefined) extras.doc = tobjectKeysDeep(n.doc);
				if (n.wardenAction !== undefined) extras.wardenaction = tobjectKeysDeep(n.wardenAction);
				const pkKey = pkKeyForEntity(ireference);
				const objRow = {
					[pkKey]: flatpath,
					flatpath,
					...baseObj,
					...extras,
				};
				(entities[ireference] ??= []).push(objRow);
			} else {
				// Nodo estructural: sólo lleva flatpath + kind. Sus props v3
				// (obj.prefix/rowName, doc, wardenAction) se preservan en línea
				// dentro del NodeRow para no perder la información.
				const row = { flatpath, kind };
				if (n.obj && typeof n.obj === "object") {
					Object.assign(row, tobjectKeysDeep(n.obj));
				}
				if (n.doc !== undefined) row.doc = tobjectKeysDeep(n.doc);
				if (n.wardenAction !== undefined) row.wardenaction = tobjectKeysDeep(n.wardenAction);
				nodes.push(row);
			}
			if (Array.isArray(n.children) && n.children.length) visit(n.children);
		}
	};
	visit(rootChildren ?? []);
	return { nodes, entities };
}

function migrateFile(filePath) {
	const raw = fs.readFileSync(filePath, "utf8");
	const src = JSON.parse(raw);
	if (!src || typeof src !== "object") {
		console.warn(`[skip] ${filePath} — no es objeto.`);
		return;
	}
	// v3 → v4 (sólo si tiene root). Si ya es v4 lo re-migramos desde nodes/entities.
	let flat;
	if (src.root) {
		flat = flattenV3(src.root.children ?? []);
	} else if (Array.isArray(src.nodes)) {
		flat = reflattenV4(src);
	} else {
		console.warn(`[skip] ${filePath} — ni v3 ni v4 reconocido.`);
		return;
	}
	const v4 = {
		version: 4,
		kind: src.kind,
	};
	if (src.tableRef !== undefined) v4.tableref = String(src.tableRef);
	else if (src.tableref !== undefined) v4.tableref = String(src.tableref);
	if (src.tableMeta !== undefined) v4.tablemeta = tobjectKeysDeep(src.tableMeta);
	else if (src.tablemeta !== undefined) v4.tablemeta = tobjectKeysDeep(src.tablemeta);
	v4.nodes = flat.nodes;
	v4.entities = flat.entities;
	if (src.doc !== undefined) v4.doc = tobjectKeysDeep(src.doc);
	fs.writeFileSync(filePath, JSON.stringify(v4, null, 2) + "\n", "utf8");
	console.log(`[ok]   ${path.relative(ROOT, filePath)}`);
}

/** Re-aplana un archivo v4 ya existente para aplicar nuevas convenciones. */
function reflattenV4(src) {
	const nodes = [];
	const entities = {};
	for (const n of src.nodes) {
		const flatpath = String(n.flatpath);
		const kind = String(n.kind);
		const ireference = entityNameForKind(kind);
		if (ireference) {
			nodes.push({ flatpath, ireference, kind });
			const src4 = (src.entities?.[n.ireference ?? ireference] ?? []).find((o) => o.flatpath === flatpath);
			if (src4) {
				const pkKey = pkKeyForEntity(ireference);
				const { [pkKey]: _ignored, flatpath: _fp, ...rest } = src4;
				const objRow = { [pkKey]: flatpath, flatpath, ...tobjectKeysDeep(rest) };
				(entities[ireference] ??= []).push(objRow);
			} else {
				const pkKey = pkKeyForEntity(ireference);
				(entities[ireference] ??= []).push({ [pkKey]: flatpath, flatpath });
			}
		} else {
			// estructural: copiar props inline (excepto ireference legado).
			const { ireference: _i, ...inline } = n;
			nodes.push({ ...tobjectKeysDeep(inline), flatpath, kind });
		}
	}
	return { nodes, entities };
}

function main() {
	const targets = [];
	const tablesTree = path.join(ROOT, "tables-tree.json");
	if (fs.existsSync(tablesTree)) targets.push(tablesTree);
	const colsDir = path.join(ROOT, "columns");
	if (fs.existsSync(colsDir)) {
		for (const f of fs.readdirSync(colsDir)) {
			if (f.endsWith(".json")) targets.push(path.join(colsDir, f));
		}
	}
	for (const f of targets) migrateFile(f);
}

main();
