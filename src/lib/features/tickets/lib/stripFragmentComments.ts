import type { CodeLang } from "./snippets.js";

/**
 * Quita comentarios de fragmentos que se muestran en el HTML del ticket
 * (`codeBlock`, `cambiosBd.sql`). No usar en archivos fuente del repo.
 */
export function stripFragmentComments(src: string, lang: CodeLang = "typescript"): string {
	const trimmed = src.trim();
	if (!trimmed) return trimmed;
	if (lang === "json") return trimmed;

	const lines = trimmed.split("\n");
	const out: string[] = [];

	for (const line of lines) {
		const t = line.trim();
		if (lang === "sql") {
			if (t.startsWith("--")) continue;
			out.push(line);
			continue;
		}

		if (t.startsWith("//")) continue;

		let cleaned = line;
		const slash = cleaned.indexOf("//");
		if (slash >= 0) {
			const before = cleaned.slice(0, slash);
			const inString =
				(before.match(/'/g)?.length ?? 0) % 2 === 1 ||
				(before.match(/"/g)?.length ?? 0) % 2 === 1;
			if (!inString) cleaned = before.trimEnd();
		}
		if (cleaned.trim().length > 0 || out.length === 0) out.push(cleaned);
	}

	return out
		.join("\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
}
