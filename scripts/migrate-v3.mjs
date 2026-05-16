// Migraci\u00f3n one-shot del formato V2 (con ireference/comment/HISTORIAL) al V3.
// Acciones:
//  1. Carga `tables-tree.json` y elimina `ireference` recursivamente.
//  2. Detecta nodos `kind:"table"` cuyo nombre empieza por `HISTORIAL` y cuya
//     "tabla maestra" (sufijo tras HISTORIAL) existe como otra tabla del
//     \u00e1rbol bajo el MISMO prefijo. Marca el master con `obj.stack = true` y
//     elimina el nodo de historial.
//  3. Reescribe `version` a 3.
//  4. Para cada `columns/*.json`:
//       - elimina `ireference` recursivo,
//       - elimina `tableMeta.comment / fragmentId / fragmentName / effectivePrefix`,
//       - elimina la propiedad `kind` duplicada dentro de `obj` de columnas,
//       - reescribe `version: 3`.
//  5. Borra `columns/HISTORIAL*.json`.
//  6. Borra los archivos `.legacy.json`.
//  7. Sustituye en `doc.description` cualquier referencia con `CAPAC_` por la
//     entidad bare (ej. `CAPAC_PLANES_ESTUDIO` \u2192 `PLANES_ESTUDIO`).
import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const baseDir = path.join(ROOT, "public", "db", "clientesis");
const colsDir = path.join(baseDir, "columns");
const treePath = path.join(baseDir, "tables-tree.json");

function strip(node) {
	delete node.ireference;
	if (node.obj && typeof node.obj === "object") {
		// Quita la `kind` redundante dentro del obj (heredada del editor visual).
		delete node.obj.kind;
	}
	for (const c of node.children ?? []) strip(c);
}

// Mapeos manuales para historiales con nomenclatura no algoritmica.
const KNOWN_MASTERS = {
	HISTORIALPLANESTUDIO: "PLANES_ESTUDIO",
	HISTORIALCURSO: "CURSOS",
};

function findTable(root, ref) {
	const norm = (s) => String(s).toUpperCase().replace(/_/g, "");
	const target = norm(ref);
	let exact = null, fuzzy = null;
	const dfs = (n) => {
		if (n.kind === "table") {
			const r = norm(n.obj?.tableRef ?? n.obj?.rowName ?? "");
			if (r === target || r === target + "S" || r === target + "ES" || r === target.replace(/S$/, "")) {
				exact = exact || n;
			} else if (r.startsWith(target) || target.startsWith(r)) {
				fuzzy = fuzzy || n;
			}
		}
		for (const c of n.children ?? []) {
			dfs(c);
			if (exact) return;
		}
	};
	dfs(root);
	return exact || fuzzy;
}

function pruneHistorial(root) {
	const removed = [];
	const recurse = (parent) => {
		if (!parent.children) return;
		const keep = [];
		for (const c of parent.children) {
			recurse(c);
			if (c.kind === "table") {
				const ref = String(c.obj?.tableRef ?? c.obj?.rowName ?? "").toUpperCase();
				if (ref.startsWith("HISTORIAL")) {
					const masterRef = KNOWN_MASTERS[ref] ?? ref.slice("HISTORIAL".length);
					console.log(`  candidato: ${ref} \u2192 master '${masterRef}'`);
					if (masterRef) {
						const master = findTable(root, masterRef);
						console.log(`  master encontrado:`, !!master, master?.obj?.tableRef);
						if (master) {
							master.obj = master.obj ?? {};
							master.obj.stack = true;
							removed.push({ historial: ref, master: masterRef });
							continue;
						}
					}
				}
			}
			keep.push(c);
		}
		parent.children = keep;
	};
	recurse(root);
	return removed;
}

function fixDocText(value) {
	if (!value || typeof value !== "string") return value;
	// Elimina el prefijo CAPAC_ pegado a un identificador en may\u00fasculas, p.ej.:
	// "CAPAC_PLANES_ESTUDIO" \u2192 "PLANES_ESTUDIO".
	return value.replace(/`?CAPAC_([A-Z][A-Z0-9_]*)`?/g, (_m, rest) => `\`${rest}\``);
}

function fixDocsRecursive(node) {
	if (node?.doc) {
		if (node.doc.description) node.doc.description = fixDocText(node.doc.description);
		if (Array.isArray(node.doc.rules)) node.doc.rules = node.doc.rules.map(fixDocText);
		if (Array.isArray(node.doc.notes)) node.doc.notes = node.doc.notes.map(fixDocText);
	}
	for (const c of node?.children ?? []) fixDocsRecursive(c);
}

function fixTreeDoc(treeDoc) {
	if (!treeDoc) return;
	if (treeDoc.description) treeDoc.description = fixDocText(treeDoc.description);
	if (Array.isArray(treeDoc.rules)) treeDoc.rules = treeDoc.rules.map(fixDocText);
	if (treeDoc.entities) {
		for (const k of Object.keys(treeDoc.entities)) {
			const e = treeDoc.entities[k];
			if (e.description) e.description = fixDocText(e.description);
			if (Array.isArray(e.rules)) e.rules = e.rules.map(fixDocText);
		}
	}
}

// 1\u20133. tables-tree.json
const tree = JSON.parse(readFileSync(treePath, "utf8"));
strip(tree.root);
const removedHist = pruneHistorial(tree.root);
fixDocsRecursive(tree.root);
fixTreeDoc(tree.doc);
tree.version = 3;
// Reindexa rowIds segu\u00fan estructura (1, 1.1, 1.2, ...).
function reindex(n, prefix) {
	n.id = prefix;
	(n.children ?? []).forEach((c, i) => reindex(c, prefix ? `${prefix}.${i + 1}` : String(i + 1)));
}
reindex(tree.root, "");
writeFileSync(treePath, JSON.stringify(tree, null, 2), "utf8");
console.log(`OK tables-tree.json migrado (historiales removidos: ${removedHist.length})`);
for (const r of removedHist) console.log(`  ${r.historial} \u2192 master '${r.master}'`);

// 4\u20135. columns/*.json
const colFiles = readdirSync(colsDir).filter((e) => e.endsWith(".json"));
for (const f of colFiles) {
	const full = path.join(colsDir, f);
	if (/^HISTORIAL/i.test(f)) {
		unlinkSync(full);
		console.log(`DEL ${f}`);
		continue;
	}
	const c = JSON.parse(readFileSync(full, "utf8"));
	strip(c.root);
	if (c.tableMeta) {
		delete c.tableMeta.comment;
		delete c.tableMeta.fragmentId;
		delete c.tableMeta.fragmentName;
		delete c.tableMeta.effectivePrefix;
	}
	fixDocsRecursive(c.root);
	fixTreeDoc(c.doc);
	c.version = 3;
	reindex(c.root, "");
	writeFileSync(full, JSON.stringify(c, null, 2), "utf8");
	console.log(`OK columns/${f} migrado`);
}

// 6. legacy.json
for (const e of readdirSync(baseDir)) {
	if (e.endsWith(".legacy.json")) {
		const p = path.join(baseDir, e);
		if (existsSync(p)) {
			unlinkSync(p);
			console.log(`DEL ${e}`);
		}
	}
}

console.log("Migraci\u00f3n V3 completa.");
