// @ts-nocheck
// Reestructura el `tables-tree.json` para que las tablas con prefijo común
// (ej. `CAPAC_`) cuelguen de un nodo `prefix`, y renombra los archivos de
// `columns/` para que NO carguen el prefijo en el nombre.
//
// Además, en cada `columns/<TABLE>.json`:
//  - Actualiza `tableref` y `tablemeta.originalname` al nombre bare.
//  - Garantiza la estructura AUDITORIA al final del bloque, con las 8
//    columnas de auditoría ANIDADAS dentro del nodo `optional` AUDITORIA
//    (flatpath punteado, p.ej. `12.1`, `12.2`, …).
//
// Tablas tipo `HISTORIAL*` se excluyen del bloque de auditoría (son ellas
// mismas el log de auditoría de otra tabla).
//
// Uso: node scripts/restructure-prefix-and-audit.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "public", "db", "clientesis");
const COLS_DIR = path.join(ROOT, "columns");
const TABLES_TREE = path.join(ROOT, "tables-tree.json");

/** Prefijos a extraer (con `_` final). El primero que matchea gana. */
const PREFIXES = ["CAPAC_"];

/** Tablas que NUNCA llevan prefijo, sin importar otras heurísticas. */
const NO_PREFIX_TABLES = new Set(["PERMISOS"]);

/** Si tras la heurística no se detectó prefijo y la tabla no está en la
 * lista anterior, se asigna este prefijo por defecto. */
const DEFAULT_PREFIX = "CAPAC_";

const AUDIT_COLS = [
	{ name: "IUSUARIOCRE", type: "VARCHAR(255)" },
	{ name: "IAPPCRE", type: "VARCHAR(255)" },
	{ name: "IPCRE", type: "VARCHAR(255)" },
	{ name: "FHCRE", type: "DATETIME2", defaultvalue: "GETDATE()" },
	{ name: "IUSUARIOULT", type: "VARCHAR(255)" },
	{ name: "IAPPULT", type: "VARCHAR(255)" },
	{ name: "IPULT", type: "VARCHAR(255)" },
	{ name: "FHULT", type: "DATETIME2", defaultvalue: "GETDATE()" },
];
const AUDIT_NAMES = new Set(AUDIT_COLS.map((c) => c.name));

function isHistorialBare(bareName) {
	return bareName.startsWith("HISTORIAL");
}

function detectPrefix(fullName) {
	for (const p of PREFIXES) if (fullName.startsWith(p)) return p;
	return "";
}

/* ───────── tables-tree restructure ───────── */

function restructureTablesTree() {
	const raw = fs.readFileSync(TABLES_TREE, "utf8");
	const doc = JSON.parse(raw);
	if (doc.kind !== "tables-tree" || !Array.isArray(doc.nodes)) {
		throw new Error("tables-tree.json no está en formato v4");
	}

	const tableBucket = (doc.entities?.TABLE ?? []).slice();

	// Construir mapa de prefix nodes existentes (flatpath → "CAPAC_").
	const prefixByPath = new Map();
	for (const n of doc.nodes) {
		if (n.kind === "prefix" && typeof n.prefix === "string" && n.prefix) {
			prefixByPath.set(String(n.flatpath), n.prefix);
		}
	}
	const ancestorPrefix = (flatpath) => {
		const parts = String(flatpath).split(".");
		while (parts.length > 1) {
			parts.pop();
			const p = prefixByPath.get(parts.join("."));
			if (p) return p;
		}
		return "";
	};

	// Conservar orden actual.
	const items = [];
	for (const node of doc.nodes) {
		if (node.kind !== "table") continue;
		const obj = tableBucket.find((o) => String(o.flatpath) === String(node.flatpath));
		if (!obj) continue;
		const refRaw = String(obj.tableref ?? obj.rowname ?? "");
		// Prefijo = el del padre `prefix` si existe, si no se intenta detectar
		// en el propio nombre (compat con archivos antiguos sin prefix node).
		const inheritedPrefix = ancestorPrefix(node.flatpath);
		let prefix = inheritedPrefix || detectPrefix(refRaw);
		if (!prefix && !NO_PREFIX_TABLES.has(refRaw)) prefix = DEFAULT_PREFIX;
		const bareFromRef = refRaw.startsWith(prefix) ? refRaw.slice(prefix.length) : refRaw;
		const fullRef = refRaw.startsWith(prefix) ? refRaw : `${prefix}${refRaw}`;
		items.push({ prefix, bare: bareFromRef, full: fullRef, obj });
	}

	// Agrupar por prefijo conservando orden de aparición.
	const groups = new Map(); // prefix → items[]
	const ungrouped = [];
	for (const it of items) {
		if (!it.prefix) {
			ungrouped.push(it);
			continue;
		}
		if (!groups.has(it.prefix)) groups.set(it.prefix, []);
		groups.get(it.prefix).push(it);
	}

	// Reconstruir nodes + entities.
	const newNodes = [];
	const newTableBucket = [];
	const newEntities = { ...(doc.entities ?? {}) };
	let topIdx = 0;

	// Estructura: primero los grupos con prefix; luego ungrouped (PERMISOS, …).
	const orderedTops = [];
	for (const [prefix, list] of groups) orderedTops.push({ kind: "prefix", prefix, list });
	for (const it of ungrouped) orderedTops.push({ kind: "table", item: it });

	for (const top of orderedTops) {
		topIdx += 1;
		const topPath = String(topIdx);
		if (top.kind === "prefix") {
			const prefixName = top.prefix.replace(/_$/, "");
			newNodes.push({
				flatpath: topPath,
				kind: "prefix",
				rowname: prefixName,
				prefix: top.prefix,
			});
			top.list.forEach((it, i) => {
				const childPath = `${topPath}.${i + 1}`;
				newNodes.push({ flatpath: childPath, ireference: "TABLE", kind: "table" });
				newTableBucket.push({
					itable: childPath,
					flatpath: childPath,
					tableref: it.bare,
					rowname: it.bare,
				});
			});
		} else {
			const it = top.item;
			newNodes.push({ flatpath: topPath, ireference: "TABLE", kind: "table" });
			newTableBucket.push({
				itable: topPath,
				flatpath: topPath,
				tableref: it.bare,
				rowname: it.bare,
			});
		}
	}

	newEntities.TABLE = newTableBucket;
	doc.nodes = newNodes;
	doc.entities = newEntities;
	fs.writeFileSync(TABLES_TREE, JSON.stringify(doc, null, 2) + "\n", "utf8");
	console.log(`[ok]   tables-tree.json (${newTableBucket.length} tablas, ${groups.size} prefijo(s))`);
	return items; // devuelve el plan de renombrado.
}

/* ───────── columns/<TABLE>.json: rename + audit nesting ───────── */

function rebuildColumnsFile(filePath, bareName) {
	const raw = fs.readFileSync(filePath, "utf8");
	const doc = JSON.parse(raw);
	if (!doc || doc.kind !== "columns-tree" || !Array.isArray(doc.nodes)) return;

	doc.tableref = bareName;
	if (doc.tablemeta) doc.tablemeta.originalname = bareName;

	const colBucket = (doc.entities?.COLUMN ?? []).slice();
	const objByPath = new Map(colBucket.map((o) => [String(o.flatpath), o]));

	// Lista lineal en orden actual.
	const ordered = [];
	for (const n of doc.nodes) {
		if (n.kind !== "col") continue;
		const obj = objByPath.get(String(n.flatpath));
		if (obj) ordered.push({ ...obj });
	}

	// Particionar: business + audit existentes (case-insensitive name match).
	const businessCols = [];
	const existingAudit = new Map();
	for (const o of ordered) {
		const oname = typeof o.name === "string" ? o.name.toUpperCase() : "";
		if (o.kind === "optional" && oname === "AUDITORIA") continue; // se re-emite
		if (AUDIT_NAMES.has(oname)) {
			existingAudit.set(oname, o);
			continue;
		}
		businessCols.push(o);
	}

	const skipAudit = isHistorialBare(bareName);

	// Numerar business cols planos: 1, 2, … N.
	const newNodes = [];
	const newBucket = [];
	businessCols.forEach((o, i) => {
		const fp = String(i + 1);
		newNodes.push({ flatpath: fp, ireference: "COLUMN", kind: "col" });
		const objRow = { icolumn: fp, flatpath: fp };
		for (const [k, v] of Object.entries(o)) {
			if (k === "icolumn" || k === "flatpath") continue;
			objRow[k] = v;
		}
		newBucket.push(objRow);
	});

	if (!skipAudit) {
		const sectionPath = String(businessCols.length + 1);
		// Nodo estructural AUDITORIA: NO es columna; agrupa para mostrar/ocultar
		// la sección en los snippets. Sin `ireference`, sin entrada en COLUMN.
		// `active` es bandera base de todos los nodos; default true → no se
		// persiste cuando es true.
		newNodes.push({
			flatpath: sectionPath,
			kind: "optional",
			name: "AUDITORIA",
		});
		// Hijos anidados con flatpath punteado.
		AUDIT_COLS.forEach((spec, i) => {
			const childPath = `${sectionPath}.${i + 1}`;
			newNodes.push({ flatpath: childPath, ireference: "COLUMN", kind: "col" });
			const merged = {
				icolumn: childPath,
				flatpath: childPath,
				name: spec.name,
				type: spec.type,
				primarykey: false,
			};
			if (spec.defaultvalue) merged.defaultvalue = spec.defaultvalue;
			const prev = existingAudit.get(spec.name);
			if (prev) {
				for (const [k, v] of Object.entries(prev)) {
					if (k === "icolumn" || k === "flatpath") continue;
					if (k === "extra" && /#region\s+AUDITORIA/.test(String(v))) continue;
					if (merged[k] === undefined) merged[k] = v;
				}
			}
			newBucket.push(merged);
		});
	}

	doc.nodes = newNodes;
	doc.entities = { ...(doc.entities ?? {}), COLUMN: newBucket };
	fs.writeFileSync(filePath, JSON.stringify(doc, null, 2) + "\n", "utf8");
}

function processColumnsFiles(plan) {
	for (const it of plan) {
		const oldFile = path.join(COLS_DIR, `${it.full}.json`);
		const newFile = path.join(COLS_DIR, `${it.bare}.json`);
		if (!fs.existsSync(oldFile)) {
			if (fs.existsSync(newFile)) {
				rebuildColumnsFile(newFile, it.bare);
				console.log(`[ok]   columns/${it.bare}.json (sin renombrar)`);
				continue;
			}
			console.log(`[warn] columns/${it.full}.json no encontrado`);
			continue;
		}
		if (oldFile !== newFile) {
			if (fs.existsSync(newFile)) fs.unlinkSync(newFile);
			fs.renameSync(oldFile, newFile);
		}
		rebuildColumnsFile(newFile, it.bare);
		console.log(`[ok]   ${it.full}.json → ${it.bare}.json`);
	}
}

function main() {
	const plan = restructureTablesTree();
	processColumnsFiles(plan);
}

main();
