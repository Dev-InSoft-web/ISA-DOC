import { spawnSync } from "node:child_process";

spawnSync(
  process.execPath,
  [
    "script/inspect-capac.mjs",
    "--mode",
    "columns",
    "--tables",
    "CAPAC_SEGURIDADPORCURSO_OLD,CAPAC_SEGURIDADES_CURSOS",
    ...process.argv.slice(2),
  ],
  { stdio: "inherit" },
);
