// @ts-nocheck
// Reordena cada `columns/<TABLE>.json` (formato v4) para garantizar la
// estructura estándar de AUDITORIA al final:
//
//   ...columnas de negocio...
//   AUDITORIA  (kind:"optional", show:true)
//   IUSUARIOCRE  VARCHAR(255)
//   IAPPCRE      VARCHAR(255)
//   IPCRE        VARCHAR(255)
//   FHCRE        DATETIME2 DEFAULT GETDATE()
//   IUSUARIOULT  VARCHAR(255)
//   IAPPULT      VARCHAR(255)
//   IPULT        VARCHAR(255)
//   FHULT        DATETIME2 DEFAULT GETDATE()
//
// Si la tabla ya tiene columnas de auditoría, se reubican (no se duplican).
// Si faltan, se agregan. Las tablas `HISTORIAL*` se omiten por ser ellas
// mismas el log de auditoría.
//
// Uso: node scripts/add-audit-columns.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "public", "db", "clientesis");
const COLS_DIR = path.join(ROOT, "columns");

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

function isHistorialFile(name) {
	const bare = name.replace(/^CAPAC_/, "");
	return bare.startsWith("HISTORIAL");
}

function processFile(filePath) {
	const raw = fs.readFileSync(filePath, "utf8");
	const doc = JSON.parse(raw);
	if (!doc || doc.kind !== "columns-tree" || !Array.isArray(doc.nodes)) return;

	const colBucket = (doc.entities?.COLUMN ?? []).slice();
	// Map flatpath -> ObjRow.
	const objByPath = new Map(colBucket.map((o) => [String(o.flatpath), o]));

	// Construir lista lineal en el orden actual de `nodes`.
	const ordered = [];
	for (const n of doc.nodes) {
		if (n.kind !== "col") continue;
		const obj = objByPath.get(String(n.flatpath));
		if (obj) ordered.push({ ...obj });
	}

	// Particionar: business cols + audit cols (existentes) + AUDITORIA section row.
	const businessCols = [];
	const existingAudit = new Map();
	for (const o of ordered) {
		if (o.kind === "optional" && o.name === "AUDITORIA") continue; // se re-emite
		if (o.kind === "section" || o.kind === "section_end") {
			businessCols.push(o);
			continue;
		}
		if (typeof o.name === "string" && AUDIT_NAMES.has(o.name)) {
			existingAudit.set(o.name, o);
			continue;
		}
		businessCols.push(o);
	}

	// Construir bloque AUDITORIA estándar.
	const auditBlock = [];
	auditBlock.push({
		name: "AUDITORIA",
		primarykey: false,
		kind: "optional",
		show: true,
	});
	for (const spec of AUDIT_COLS) {
		const prev = existingAudit.get(spec.name);
		const merged = {
			name: spec.name,
			type: spec.type,
			primarykey: false,
		};
		if (spec.defaultvalue) merged.defaultvalue = spec.defaultvalue;
		// Conservar metadatos previos (doc, wardenaction, foreignkey, extra…)
		if (prev) {
			for (const [k, v] of Object.entries(prev)) {
				if (k === "icolumn" || k === "flatpath") continue;
				if (k === "extra" && /#region\s+AUDITORIA/.test(String(v))) continue;
				if (merged[k] === undefined) merged[k] = v;
			}
		}
		auditBlock.push(merged);
	}

	const finalList = [...businessCols, ...auditBlock];

	// Re-emitir nodes + entities.COLUMN con flatpath secuencial.
	const newNodes = [];
	const newBucket = [];
	finalList.forEach((o, i) => {
		const fp = String(i + 1);
		newNodes.push({ flatpath: fp, ireference: "COLUMN", kind: "col" });
		const objRow = { icolumn: fp, flatpath: fp };
		for (const [k, v] of Object.entries(o)) {
			if (k === "icolumn" || k === "flatpath") continue;
			objRow[k] = v;
		}
		newBucket.push(objRow);
	});

	doc.nodes = newNodes;
	doc.entities = { ...(doc.entities ?? {}), COLUMN: newBucket };

	fs.writeFileSync(filePath, JSON.stringify(doc, null, 2) + "\n", "utf8");
	console.log(`[ok]   ${path.basename(filePath)}  (${newBucket.length} cols)`);
}

function main() {
	const files = fs.readdirSync(COLS_DIR).filter((f) => f.endsWith(".json"));
	for (const f of files) {
		if (isHistorialFile(f.replace(/\.json$/, ""))) {
			console.log(`[skip] ${f}  (historial)`);
			continue;
		}
		processFile(path.join(COLS_DIR, f));
	}
}

main();
