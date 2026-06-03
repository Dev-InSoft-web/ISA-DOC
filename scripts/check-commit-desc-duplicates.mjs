import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const INDEX = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src/lib/features/tickets/index.ts");
const src = fs.readFileSync(INDEX, "utf8");
const lines = src.split("\n").filter((l) => l.includes('hash: "') && l.includes("descripcion:"));

const map = new Map();
for (const line of lines) {
	const hm = line.match(/hash:\s*"([0-9a-f]+)"/);
	const rm = line.match(/repo:\s*"([^"]+)"/);
	const dm = line.match(/descripcion:\s*"((?:\\.|[^"\\])*)"/);
	if (!hm || !dm) continue;
	const key = `${rm ? rm[1] : "ISW-ClientesIS"}:${hm[1]}`;
	const desc = dm[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\");
	if (!map.has(key)) map.set(key, new Set());
	map.get(key).add(desc);
}

const bad = [...map.entries()].filter(([, s]) => s.size > 1);
console.log(`Hashes con descripciones distintas en index.ts: ${bad.length}`);
for (const [k, s] of bad) {
	console.log(`\n${k}`);
	for (const d of s) console.log(`  - ${d}`);
}
