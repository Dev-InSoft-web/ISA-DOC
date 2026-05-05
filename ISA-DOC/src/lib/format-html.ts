// Pretty-printer minimalista de HTML para preview en el visor de tickets.
// No es un formatter completo (no maneja `<script>`, `<style>` con comillas anidadas
// ni atributos multilinea), pero alcanza para HTML "email-safe": tags + texto.

const VOID_TAGS = new Set([
	"area", "base", "br", "col", "embed", "hr", "img", "input",
	"link", "meta", "param", "source", "track", "wbr",
]);

const INLINE_TAGS = new Set([
	"a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
	"em", "i", "kbd", "mark", "q", "s", "samp", "small", "span", "strong",
	"sub", "sup", "time", "u", "var",
]);

interface Token {
	type: "open" | "close" | "self" | "text" | "comment" | "doctype";
	tag?: string;
	raw: string;
}

function tokenize(src: string): Token[] {
	const out: Token[] = [];
	let i = 0;
	while (i < src.length) {
		if (src.startsWith("<!--", i)) {
			const end = src.indexOf("-->", i + 4);
			const stop = end < 0 ? src.length : end + 3;
			out.push({ type: "comment", raw: src.slice(i, stop) });
			i = stop;
			continue;
		}
		if (src.startsWith("<!", i) || src.startsWith("<?", i)) {
			const end = src.indexOf(">", i);
			const stop = end < 0 ? src.length : end + 1;
			out.push({ type: "doctype", raw: src.slice(i, stop) });
			i = stop;
			continue;
		}
		if (src[i] === "<") {
			const end = src.indexOf(">", i);
			if (end < 0) {
				out.push({ type: "text", raw: src.slice(i) });
				break;
			}
			const raw = src.slice(i, end + 1);
			const isClose = raw.startsWith("</");
			const inner = raw.slice(isClose ? 2 : 1, raw.endsWith("/>") ? -2 : -1).trim();
			const tag = inner.split(/\s/)[0].toLowerCase();
			let type: Token["type"] = "open";
			if (isClose) type = "close";
			else if (raw.endsWith("/>") || VOID_TAGS.has(tag)) type = "self";
			out.push({ type, tag, raw });
			i = end + 1;
			continue;
		}
		const next = src.indexOf("<", i);
		const stop = next < 0 ? src.length : next;
		const text = src.slice(i, stop);
		if (text.length > 0) out.push({ type: "text", raw: text });
		i = stop;
	}
	return out;
}

export function formatHtml(src: string, indentUnit: string = "  "): string {
	const tokens = tokenize(src);
	const out: string[] = [];
	let depth = 0;
	const pad = () => indentUnit.repeat(Math.max(0, depth));

	for (let i = 0; i < tokens.length; i++) {
		const t = tokens[i];
		if (t.type === "text") {
			const trimmed = t.raw.replace(/\s+/g, " ").trim();
			if (!trimmed) continue;
			// si el texto va entre dos inlines, lo dejamos en línea aparte simple
			out.push(pad() + trimmed);
			continue;
		}
		if (t.type === "comment" || t.type === "doctype") {
			out.push(pad() + t.raw.trim());
			continue;
		}
		if (t.type === "self") {
			out.push(pad() + t.raw.trim());
			continue;
		}
		if (t.type === "open") {
			// caso especial: <tag>texto corto</tag> en una sola línea
			const next = tokens[i + 1];
			const after = tokens[i + 2];
			const isInline = t.tag && INLINE_TAGS.has(t.tag);
			if (
				next && next.type === "text" &&
				after && after.type === "close" && after.tag === t.tag
			) {
				const txt = next.raw.replace(/\s+/g, " ").trim();
				out.push(pad() + t.raw.trim() + txt + after.raw.trim());
				i += 2;
				continue;
			}
			if (
				isInline && next && next.type === "close" && next.tag === t.tag
			) {
				out.push(pad() + t.raw.trim() + next.raw.trim());
				i += 1;
				continue;
			}
			out.push(pad() + t.raw.trim());
			depth++;
			continue;
		}
		if (t.type === "close") {
			depth = Math.max(0, depth - 1);
			out.push(pad() + t.raw.trim());
			continue;
		}
	}
	return out.join("\n");
}
