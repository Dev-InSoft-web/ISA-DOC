import { spawnSync } from "node:child_process";

spawnSync(
  process.execPath,
  ["script/inspect-capac.mjs", "--mode", "sample-iplan", "--top", "12", ...process.argv.slice(2)],
  { stdio: "inherit" },
);
