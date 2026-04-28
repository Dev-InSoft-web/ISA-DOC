import { spawnSync } from "node:child_process";

spawnSync(
  process.execPath,
  ["script/manage-estructuras.mjs", "--action", "create-mirror", ...process.argv.slice(2)],
  { stdio: "inherit" },
);
