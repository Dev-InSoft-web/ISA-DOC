// Alinea árbol SQL Capacitación con DER Capacitación.jpg
// - Elimina HISTORIALCURSO
// - Renombra SOP_TEMAS -> CAPAC_TEMAS
// - Corrige tipos (varchar tamaños, bigint->smallint), nombres (BGENERACERTIFICADOS), elimina BACTIVO sobrante
// - Añade PERMISOSCONTACTO y RECURSOS
import { readFile, writeFile, rename, unlink, access } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, "..", "public", "db", "clientesis");
const COLS = path.join(BASE, "columns");

const readJson = async (p) => JSON.parse(await readFile(p, "utf8"));
const writeJson = async (p, j) => writeFile(p, JSON.stringify(j, null, 2) + "\n", "utf8");

const setCol = (tree, name, patch) => {
  const c = tree.entities.COLUMN.find((x) => x.name === name);
  if (!c) throw new Error(`columna ${name} no encontrada en ${tree.tableref}`);
  Object.assign(c, patch);
};
const removeCol = (tree, name) => {
  const i = tree.entities.COLUMN.findIndex((x) => x.name === name);
  if (i < 0) return false;
  tree.entities.COLUMN.splice(i, 1);
  // reindex
  tree.entities.COLUMN.forEach((c, k) => { c.icolumn = String(k + 1); c.flatpath = String(k + 1); });
  const auditIdx = tree.nodes.findIndex((n) => n.kind === "optional" && n.name === "AUDITORIA");
  tree.nodes = tree.entities.COLUMN.map((c) => ({ flatpath: c.flatpath, ireference: "COLUMN", kind: "col" }));
  if (auditIdx >= 0) tree.nodes.push({ flatpath: String(tree.nodes.length + 1), kind: "optional", name: "AUDITORIA" });
  return true;
};
const renameCol = (tree, oldName, newName) => {
  const c = tree.entities.COLUMN.find((x) => x.name === oldName);
  if (c) c.name = newName;
};
const ensureAuditoria = (tree) => {
  const has = tree.nodes.some((n) => n.kind === "optional" && n.name === "AUDITORIA");
  if (!has) tree.nodes.push({ flatpath: String(tree.nodes.length + 1), kind: "optional", name: "AUDITORIA" });
};

// ===== PLANES_ESTUDIO =====
{
  const f = path.join(COLS, "PLANES_ESTUDIO.json");
  const t = await readJson(f);
  setCol(t, "IPLANESTUDIO", { type: "VARCHAR(20)" });
  setCol(t, "TTDVISUALIZACION", { type: "VARCHAR(1)" });
  removeCol(t, "IRECURSO");
  ensureAuditoria(t);
  await writeJson(f, t);
  console.log("✓ PLANES_ESTUDIO");
}

// ===== CURSOS =====
{
  const f = path.join(COLS, "CURSOS.json");
  const t = await readJson(f);
  setCol(t, "ICURSO", { type: "VARCHAR(10)" });
  setCol(t, "ITEMA", { type: "VARCHAR(25)" });
  setCol(t, "IDRIVER", { type: "SMALLINT" });
  renameCol(t, "BGENERACERTIFICADO", "BGENERACERTIFICADOS");
  ensureAuditoria(t);
  await writeJson(f, t);
  console.log("✓ CURSOS");
}

// ===== CURSOS_PREREQUISITOS =====
{
  const f = path.join(COLS, "CURSOS_PREREQUISITOS.json");
  const t = await readJson(f);
  setCol(t, "ICURSO", { type: "VARCHAR(10)" });
  setCol(t, "ICURSOREQUERIDO", { type: "VARCHAR(10)" });
  setCol(t, "IPLANESTUDIO", { type: "VARCHAR(20)" });
  await writeJson(f, t);
  console.log("✓ CURSOS_PREREQUISITOS");
}

// ===== CURSOS_DE_PLANES_ESTUDIO =====
{
  const f = path.join(COLS, "CURSOS_DE_PLANES_ESTUDIO.json");
  const t = await readJson(f);
  setCol(t, "IPLANESTUDIO", { type: "VARCHAR(20)" });
  setCol(t, "ICURSO", { type: "VARCHAR(10)" });
  await writeJson(f, t);
  console.log("✓ CURSOS_DE_PLANES_ESTUDIO");
}

// ===== ESTRUCTURAS_CURSOS =====
{
  const f = path.join(COLS, "ESTRUCTURAS_CURSOS.json");
  const t = await readJson(f);
  setCol(t, "ICURSO", { type: "VARCHAR(10)" });
  removeCol(t, "BACTIVO");
  await writeJson(f, t);
  console.log("✓ ESTRUCTURAS_CURSOS");
}

// ===== SEGURIDADES_CURSOS =====
{
  const f = path.join(COLS, "SEGURIDADES_CURSOS.json");
  const t = await readJson(f);
  setCol(t, "ICURSO", { type: "VARCHAR(10)" });
  setCol(t, "IPERMISO", { type: "VARCHAR(25)" });
  removeCol(t, "BACTIVO");
  await writeJson(f, t);
  console.log("✓ SEGURIDADES_CURSOS");
}

// ===== PERMISOS =====
{
  const f = path.join(COLS, "PERMISOS.json");
  const t = await readJson(f);
  setCol(t, "IPERMISO", { type: "VARCHAR(25)" });
  await writeJson(f, t);
  console.log("✓ PERMISOS");
}

// ===== PLANES_CURSOS =====
{
  const f = path.join(COLS, "PLANES_CURSOS.json");
  const t = await readJson(f);
  setCol(t, "IPLAN", { type: "VARCHAR(100)" });
  setCol(t, "ICURSO", { type: "VARCHAR(10)" });
  setCol(t, "IPLANPADRE", { type: "VARCHAR(100)" });
  setCol(t, "IRECURSO", { type: "BIGINT" });
  removeCol(t, "BACTIVO");
  await writeJson(f, t);
  console.log("✓ PLANES_CURSOS");
}

// ===== ATRIBUTOS_PLANES =====
{
  const f = path.join(COLS, "ATRIBUTOS_PLANES.json");
  const t = await readJson(f);
  setCol(t, "IPLAN", { type: "VARCHAR(100)" });
  setCol(t, "ICURSO", { type: "VARCHAR(10)" });
  setCol(t, "IATRIBUTO", { type: "SMALLINT" });
  removeCol(t, "BACTIVO");
  await writeJson(f, t);
  console.log("✓ ATRIBUTOS_PLANES");
}

// ===== DRIVERS =====
{
  const f = path.join(COLS, "DRIVERS.json");
  const t = await readJson(f);
  setCol(t, "IDRIVER", { type: "SMALLINT" });
  setCol(t, "NDRIVER", { type: "VARCHAR(50)" });
  setCol(t, "DESCRIPCION", { type: "VARCHAR(MAX)" });
  await writeJson(f, t);
  console.log("✓ DRIVERS");
}

// ===== ATRIBUTOS_X_DRIVERS =====
{
  const f = path.join(COLS, "ATRIBUTOS_X_DRIVERS.json");
  const t = await readJson(f);
  setCol(t, "IDRIVER", { type: "SMALLINT" });
  setCol(t, "IATRIBUTO", { type: "SMALLINT" });
  setCol(t, "NATRIBUTO", { type: "VARCHAR(50)" });
  // Añadir TDATRIBUTO si no existe
  if (!t.entities.COLUMN.find((c) => c.name === "TDATRIBUTO")) {
    // Insertar tras NATRIBUTO
    const idxNAtr = t.entities.COLUMN.findIndex((c) => c.name === "NATRIBUTO");
    t.entities.COLUMN.splice(idxNAtr + 1, 0, {
      icolumn: "x", flatpath: "x", name: "TDATRIBUTO", type: "VARCHAR(50)", primarykey: false, kind: "col"
    });
    t.entities.COLUMN.forEach((c, k) => { c.icolumn = String(k + 1); c.flatpath = String(k + 1); });
    const auditIdx = t.nodes.findIndex((n) => n.kind === "optional" && n.name === "AUDITORIA");
    t.nodes = t.entities.COLUMN.map((c) => ({ flatpath: c.flatpath, ireference: "COLUMN", kind: "col" }));
    if (auditIdx >= 0) t.nodes.push({ flatpath: String(t.nodes.length + 1), kind: "optional", name: "AUDITORIA" });
  }
  await writeJson(f, t);
  console.log("✓ ATRIBUTOS_X_DRIVERS");
}

// ===== SOP_TEMAS -> CAPAC_TEMAS =====
{
  const fOld = path.join(COLS, "SOP_TEMAS.json");
  const fNew = path.join(COLS, "CAPAC_TEMAS.json");
  if (existsSync(fOld)) {
    const t = await readJson(fOld);
    t.tableref = "CAPAC_TEMAS";
    t.tablemeta = { ...(t.tablemeta || {}), originalname: "CAPAC_TEMAS", hasifnotexists: true };
    setCol(t, "ITEMA", { type: "VARCHAR(25)" });
    await writeJson(fNew, t);
    await unlink(fOld);
    console.log("✓ SOP_TEMAS -> CAPAC_TEMAS");
  }
}

// ===== Nueva PERMISOSCONTACTO =====
{
  const f = path.join(COLS, "PERMISOSCONTACTO.json");
  if (!existsSync(f)) {
    const t = {
      version: 4,
      kind: "columns-tree",
      tableref: "PERMISOSCONTACTO",
      tablemeta: { originalname: "PERMISOSCONTACTO", hasifnotexists: true },
      nodes: [
        { flatpath: "1", ireference: "COLUMN", kind: "col" },
        { flatpath: "2", ireference: "COLUMN", kind: "col" },
        { flatpath: "3", kind: "optional", name: "AUDITORIA" }
      ],
      entities: {
        COLUMN: [
          { icolumn: "1", flatpath: "1", name: "IPERMISO", type: "VARCHAR(25)", primarykey: true, kind: "col" },
          { icolumn: "2", flatpath: "2", name: "ICONTACTO", type: "BIGINT", primarykey: true, kind: "col" }
        ]
      }
    };
    await writeJson(f, t);
    console.log("✓ PERMISOSCONTACTO creada");
  }
}

// ===== Nueva RECURSOS =====
{
  const f = path.join(COLS, "RECURSOS.json");
  if (!existsSync(f)) {
    const cols = [
      { name: "IRECURSO", type: "BIGINT", primarykey: true },
      { name: "NRECURSO", type: "VARCHAR(255)" },
      { name: "DESCRIPCION", type: "VARCHAR(MAX)" },
      { name: "IRECURSOBASE", type: "BIGINT", nullable: "NULL" },
      { name: "IAPP", type: "VARCHAR(25)" },
      { name: "VERSIONINI", type: "VARCHAR(20)", nullable: "NULL" },
      { name: "VERSIONFIN", type: "VARCHAR(20)", nullable: "NULL" },
      { name: "ITDRECURSO", type: "TINYINT" },
      { name: "ICONTACTORESPONSABLE", type: "BIGINT", nullable: "NULL" },
      { name: "BUSARBUSQUEDA", type: "BIT", defaultvalue: "1" },
      { name: "BINTERMINAR", type: "BIT", defaultvalue: "0" },
      { name: "BUSARIA", type: "BIT", defaultvalue: "0" },
      { name: "QSEGMARCARVISTO", type: "INT", defaultvalue: "0" },
      { name: "ITDESTADO", type: "TINYINT" }
    ];
    const t = {
      version: 4,
      kind: "columns-tree",
      tableref: "RECURSOS",
      tablemeta: { originalname: "RECURSOS", hasifnotexists: true },
      nodes: [
        ...cols.map((_, i) => ({ flatpath: String(i + 1), ireference: "COLUMN", kind: "col" })),
        { flatpath: String(cols.length + 1), kind: "optional", name: "AUDITORIA" }
      ],
      entities: {
        COLUMN: cols.map((c, i) => ({
          icolumn: String(i + 1), flatpath: String(i + 1),
          name: c.name, type: c.type,
          ...(c.defaultvalue ? { defaultvalue: c.defaultvalue } : {}),
          ...(c.nullable ? { nullable: c.nullable } : {}),
          primarykey: !!c.primarykey, kind: "col"
        }))
      }
    };
    await writeJson(f, t);
    console.log("✓ RECURSOS creada");
  }
}

// ===== tables-tree.json =====
{
  const f = path.join(BASE, "tables-tree.json");
  const t = await readJson(f);

  // Eliminar HISTORIALCURSO (flat=7)
  t.entities.TABLE = t.entities.TABLE.filter((x) => x.tableref !== "HISTORIALCURSO");

  // Renombrar SOP_TEMAS -> CAPAC_TEMAS
  t.entities.TABLE.forEach((x) => {
    if (x.tableref === "SOP_TEMAS") {
      x.tableref = "CAPAC_TEMAS";
      x.rowname = "CAPAC_TEMAS";
      x.tableid = "tbl_capac_temas";
    }
  });

  // Añadir PERMISOSCONTACTO y RECURSOS si no están
  if (!t.entities.TABLE.find((x) => x.tableref === "PERMISOSCONTACTO")) {
    t.entities.TABLE.push({
      itable: "x", flatpath: "x",
      tableref: "PERMISOSCONTACTO", rowname: "PERMISOSCONTACTO", tableid: "tbl_permisoscontacto"
    });
  }
  if (!t.entities.TABLE.find((x) => x.tableref === "RECURSOS")) {
    t.entities.TABLE.push({
      itable: "x", flatpath: "x",
      tableref: "RECURSOS", rowname: "RECURSOS", tableid: "tbl_recursos"
    });
  }

  // Reindex secuencial (1..N)
  t.entities.TABLE.forEach((x, i) => {
    x.itable = String(i + 1);
    x.flatpath = String(i + 1);
  });
  t.nodes = t.entities.TABLE.map((x) => ({ flatpath: x.flatpath, ireference: "TABLE", kind: "table" }));

  await writeJson(f, t);
  console.log("✓ tables-tree.json");
}

// Eliminar HISTORIALCURSO.json
{
  const f = path.join(COLS, "HISTORIALCURSO.json");
  if (existsSync(f)) {
    await unlink(f);
    console.log("✓ HISTORIALCURSO.json eliminado");
  }
}

console.log("\nAlineación completa.");
