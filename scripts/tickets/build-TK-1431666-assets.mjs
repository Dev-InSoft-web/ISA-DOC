#!/usr/bin/env node
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const child = spawn(process.execPath, [path.join(dir, "build-from-manifest.mjs"), "TK-1431666"], {
	stdio: "inherit",
	env: process.env,
});
child.on("exit", (code) => process.exit(code ?? 1));
