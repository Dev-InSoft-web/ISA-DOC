// Ajustes posteriores a la 1ª alineación:
// - Renombra CAPAC_TEMAS -> SOP_TEMAS_V2 (es dominio Soporte, no Capacitación)
// - Elimina PERMISOSCONTACTO (fuera de alcance del módulo)
// - Marca PLANES_CURSOS con herencia de modelo (extendsmodel: "RECURSOS")
import { readFile, writeFile, rename, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, "..", "public", "db", "clientesis");
const COLS = path.join(BASE, "columns");

const readJson = async (p) => JSON.parse(await readFile(p, "utf8"));
const writeJson = async (p, j) => writeFile(p, JSON.stringify(j, null, 2) + "\n", "utf8");

// ===== CAPAC_TEMAS -> SOP_TEMAS_V2 =====
{
  const fOld = path.join(COLS, "CAPAC_TEMAS.json");
  const fNew = path.join(COLS, "SOP_TEMAS_V2.json");
  if (existsSync(fOld)) {
    const t = await readJson(fOld);
    t.tableref = "SOP_TEMAS_V2";
    t.tablemeta = { ...(t.tablemeta || {}), originalname: "SOP_TEMAS_V2", hasifnotexists: true };
    await writeJson(fNew, t);
    await unlink(fOld);
    console.log("✓ CAPAC_TEMAS -> SOP_TEMAS_V2");
  }
}

// ===== Eliminar PERMISOSCONTACTO =====
{
  const f = path.join(COLS, "PERMISOSCONTACTO.json");
  if (existsSync(f)) {
    await unlink(f);
    console.log("✓ PERMISOSCONTACTO.json eliminado");
  }
}

// ===== PLANES_CURSOS: marca herencia modelo =====
{
  const f = path.join(COLS, "PLANES_CURSOS.json");
  const t = await readJson(f);
  t.tablemeta = { ...(t.tablemeta || {}), extendsmodel: "Recurso" };
  await writeJson(f, t);
  console.log("✓ PLANES_CURSOS extendsmodel=Recurso");
}

// ===== tables-tree.json =====
{
  const f = path.join(BASE, "tables-tree.json");
  const t = await readJson(f);

  // Eliminar PERMISOSCONTACTO
  t.entities.TABLE = t.entities.TABLE.filter((x) => x.tableref !== "PERMISOSCONTACTO");

  // Renombrar CAPAC_TEMAS -> SOP_TEMAS_V2
  t.entities.TABLE.forEach((x) => {
    if (x.tableref === "CAPAC_TEMAS") {
      x.tableref = "SOP_TEMAS_V2";
      x.rowname = "SOP_TEMAS_V2";
      x.tableid = "tbl_sop_temas_v2";
    }
  });

  // Reindex
  t.entities.TABLE.forEach((x, i) => {
    x.itable = String(i + 1);
    x.flatpath = String(i + 1);
  });
  t.nodes = t.entities.TABLE.map((x) => ({ flatpath: x.flatpath, ireference: "TABLE", kind: "table" }));

  await writeJson(f, t);
  console.log("✓ tables-tree.json");
}

console.log("\nAjustes aplicados.");
