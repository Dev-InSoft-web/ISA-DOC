import { spawnSync } from "node:child_process";

spawnSync(
  process.execPath,
  ["script/inspect-capac.mjs", "--mode", "list-aplic-tables", ...process.argv.slice(2)],
  { stdio: "inherit" },
);
