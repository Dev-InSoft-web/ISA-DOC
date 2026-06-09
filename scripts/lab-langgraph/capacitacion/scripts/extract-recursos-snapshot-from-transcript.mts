/**
 * Extrae el JSON RECURSOS_ATRIBUTOS del último mensaje del transcript y lo guarda en corpus.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { RECURSOS_ATRIBUTOS_SNAPSHOT_PATH } from "../lib/corpus-paths.ts";

const transcriptPath = process.argv[2];
if (!transcriptPath) {
	console.error("Uso: tsx extract-recursos-snapshot-from-transcript.mts <transcript.jsonl>");
	process.exit(1);
}

function extractJsonObject(source: string, start: number): string {
	let depth = 0;
	let inString = false;
	let escape = false;
	for (let j = start; j < source.length; j += 1) {
		const c = source[j]!;
		if (escape) {
			escape = false;
			continue;
		}
		if (c === "\\" && inString) {
			escape = true;
			continue;
		}
		if (c === '"') {
			inString = !inString;
			continue;
		}
		if (inString) continue;
		if (c === "{") depth += 1;
		if (c === "}") {
			depth -= 1;
			if (depth === 0) return source.slice(start, j + 1);
		}
	}
	throw new Error("JSON incompleto en transcript");
}

const lines = readFileSync(transcriptPath, "utf8").trim().split("\n");
let saved = false;

for (let i = lines.length - 1; i >= 0; i -= 1) {
	if (!lines[i]!.includes("RECURSOS_ATRIBUTOS")) continue;
	const ev = JSON.parse(lines[i]!) as {
		message?: { content?: Array<{ type?: string; text?: string }> };
	};
	const rawText = ev.message?.content?.find((c) => c.type === "text")?.text ?? "";
	const text = rawText.replace(/<\/?user_query>/g, "").trim();
	const markers = ['{\n\t"table": "RECURSOS_ATRIBUTOS"', '{"table": "RECURSOS_ATRIBUTOS"'];
	let start = -1;
	for (const m of markers) {
		const i = text.indexOf(m);
		if (i >= 0) {
			start = i;
			break;
		}
	}
	if (start < 0) continue;
	const jsonText = extractJsonObject(text, start);
	const parsed = JSON.parse(jsonText) as { table?: string; rows?: unknown[] };
	if (parsed.table !== "RECURSOS_ATRIBUTOS" || !Array.isArray(parsed.rows)) continue;
	writeFileSync(RECURSOS_ATRIBUTOS_SNAPSHOT_PATH, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
	console.log(`Guardado: ${RECURSOS_ATRIBUTOS_SNAPSHOT_PATH}`);
	console.log(`Filas: ${parsed.rows.length}`);
	saved = true;
	break;
}

if (!saved) {
	console.error("No se encontró JSON RECURSOS_ATRIBUTOS en el transcript");
	process.exit(1);
}
