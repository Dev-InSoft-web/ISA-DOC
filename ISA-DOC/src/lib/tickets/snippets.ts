// Helpers (snippets) que construyen HTML "email-safe":
// - Sin flex/grid, sin variables CSS, sin selectores complejos.
// - Solo etiquetas básicas + estilos inline + tablas.
// La idea es que cada snippet devuelva un string de HTML autocontenido,
// para componer el body de un ticket y que el resultado pueda copiarse
// directo a un correo.

// ---------------------------------------------------------------- método/badge

type Method = "GET" | "POST" | "PUT" | "DELETE" | "DEL" | "OPT" | "PATCH";

const METHOD_COLORS: Record<Method, string> = {
	GET: "#2EAD56",
	POST: "#E2A03F",
	PUT: "#3F8AE0",
	DELETE: "#D9534F",
	DEL: "#D9534F",
	OPT: "#7C5CC1",
	PATCH: "#5BC0DE",
};

// Badge HTTP estilo "pill" (email-safe). Ancho mínimo amplio para que
// GET/POST/PUT/DELETE queden alineados en columnas.
export function methodBadge(method: Method): string {
	const bg = METHOD_COLORS[method];
	return (
		`<span style="display:inline-block;min-width:54px;padding:2px 8px;` +
		`background-color:${bg};color:#ffffff;font-weight:bold;font-size:11px;` +
		`text-align:center;border-radius:10px;letter-spacing:0.5px;` +
		`text-shadow:none;line-height:1.2;">${method}</span>`
	);
}

// Badge genérico (texto/color libre). Útil para etiquetas de entidad,
// estados, categorías, etc. Mantiene look consistente con methodBadge.
export function badge(text: string, color: string = "#6c757d"): string {
	return (
		`<span style="display:inline-block;padding:2px 8px;` +
		`background-color:${color};color:#ffffff;font-weight:bold;font-size:11px;` +
		`text-align:center;border-radius:10px;letter-spacing:0.3px;` +
		`text-shadow:none;line-height:1.2;">${text}</span>`
	);
}

// Icono de iconify embebido vía <img> (email-safe). Altura por defecto 1rem
// (= 16px); se setean atributos width/height además del style por compat
// con clientes de correo que ignoran CSS.
//
//   icon("mdi:school")
//   icon("mdi:school", { size: 20, color: "#3F8AE0" })
export interface IconOpts {
	size?: number;          // px; default 16
	color?: string;          // hex sin '#' o con '#'; aplica ?color= a la URL de iconify
	alt?: string;
	style?: string;          // estilos extra inline
}

export function icon(name: string, opts: IconOpts = {}): string {
	const size = opts.size ?? 16;
	const altText = opts.alt ?? "";
	const colorParam = opts.color
		? `?color=${encodeURIComponent(opts.color.startsWith("#") ? opts.color.slice(1) : opts.color)}`
		: "";
	const safeName = name.replace(":", "/");
	const src = `https://api.iconify.design/${safeName}.svg${colorParam}`;
	const baseStyle =
		`height:${size}px;width:${size}px;vertical-align:middle;display:inline-block;`;
	const fullStyle = opts.style ? baseStyle + opts.style : baseStyle;
	return (
		`<img src="${src}" alt="${escapeHtml(altText)}" ` +
		`width="${size}" height="${size}" style="${fullStyle}">`
	);
}

export function statusBadge(status: string | number): string {
	const code = String(status);
	const n = parseInt(code, 10);
	let bg = "#6c757d";
	if (n >= 200 && n < 300) bg = "#2EAD56";
	else if (n >= 400 && n < 500) bg = "#D9534F";
	else if (n >= 500) bg = "#8E44AD";
	return (
		`<span style="display:inline-block;min-width:34px;padding:1px 6px;` +
		`background-color:${bg};color:#ffffff;font-weight:bold;font-size:10px;` +
		`text-align:center;border-radius:3px;letter-spacing:0.5px;">${code}</span>`
	);
}

// --------------------------------------------------------------- árbol Postman

export interface PostmanResponse {
	status: string | number;
	label: string;
}

export interface PostmanRequest {
	kind: "request";
	method: Method;
	label: string;
	responses?: PostmanResponse[];
}

export interface PostmanFolder {
	kind: "folder";
	label: string;
	children: PostmanNode[];
}

export type PostmanNode = PostmanFolder | PostmanRequest;

const ROW_STYLE =
	"padding:2px 0;font-family:Tahoma,Arial,sans-serif;font-size:12px;color:#222;";
const INDENT_STYLE =
	"margin-left:14px;padding-left:10px;border-left:1px solid #d0d7de;";

function renderResponse(r: PostmanResponse): string {
	return (
		`<div style="${ROW_STYLE}">` +
		statusBadge(r.status) +
		`&nbsp;<span style="color:#555;">${r.label}</span>` +
		`</div>`
	);
}

function renderRequest(req: PostmanRequest): string {
	const head =
		`<div style="${ROW_STYLE}">` +
		methodBadge(req.method) +
		`&nbsp;<span>${req.label}</span>` +
		`</div>`;
	if (!req.responses || req.responses.length === 0) return head;
	const inner = req.responses.map(renderResponse).join("");
	return head + `<div style="${INDENT_STYLE}">${inner}</div>`;
}

function renderFolder(f: PostmanFolder): string {
	const head =
		`<div style="${ROW_STYLE}">` +
		`<span style="color:#E2A03F;">&#128193;</span>&nbsp;` +
		`<strong>${f.label}</strong>` +
		`</div>`;
	const inner = f.children.map(renderNode).join("");
	return head + `<div style="${INDENT_STYLE}">${inner}</div>`;
}

function renderNode(n: PostmanNode): string {
	return n.kind === "folder" ? renderFolder(n) : renderRequest(n);
}

export function postmanTree(title: string, nodes: PostmanNode[]): string {
	const header =
		`<div style="${ROW_STYLE}font-weight:bold;letter-spacing:1px;color:#666;">` +
		title.toUpperCase() +
		`</div>`;
	const body = nodes.map(renderNode).join("");
	return (
		`<div style="border:1px solid #d0d7de;border-radius:4px;padding:10px 12px;` +
		`background-color:#fafbfc;margin:10px 0;">` +
		header +
		body +
		`</div>`
	);
}

// ----------------------------------------------------------- código en grises
// Tonos neutros que se ven legibles tanto en fondo claro como oscuro.

const CODE_BASE_STYLE =
	"font-family:Consolas,'Courier New',monospace;font-size:0.92em;" +
	"padding:1px 5px;border-radius:3px;" +
	"background-color:rgba(128,128,128,0.18);" +
	"border:1px solid rgba(128,128,128,0.25);" +
	"color:#888;text-shadow:none;";

const TOKEN_COLORS = {
	keyword: "#9aa0a6", // gris medio (más fuerte)
	fn: "#a0a4a8",
	string: "#8a8a8a",
	number: "#909090",
	punct: "#7a7a7a",
	ident: "#9e9e9e",
};

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function token(text: string, color: string, weight?: "bold"): string {
	const w = weight ? `;font-weight:bold` : "";
	return `<span style="color:${color}${w}">${escapeHtml(text)}</span>`;
}

// Tokenizador minimalista para JS/TS/expresiones cortas (lo que cabe en `<code>`).
function tokenizeInline(src: string): string {
	const KEYWORDS = new Set([
		"return", "const", "let", "var", "if", "else", "for", "while",
		"function", "true", "false", "null", "undefined", "new", "typeof",
		"await", "async",
	]);
	const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b|[(){}\[\].,;:?=+\-*/<>!&|%^~]+|\s+)/g;
	let out = "";
	let m: RegExpExecArray | null;
	let lastIdent: string | null = null;
	while ((m = re.exec(src)) !== null) {
		const t = m[0];
		if (/^\s+$/.test(t)) {
			out += escapeHtml(t);
			lastIdent = null;
			continue;
		}
		if (/^["'`]/.test(t)) {
			out += token(t, TOKEN_COLORS.string);
			lastIdent = null;
			continue;
		}
		if (/^\d/.test(t)) {
			out += token(t, TOKEN_COLORS.number);
			lastIdent = null;
			continue;
		}
		if (/^[A-Za-z_$]/.test(t)) {
			if (KEYWORDS.has(t)) {
				out += token(t, TOKEN_COLORS.keyword, "bold");
				lastIdent = null;
			} else {
				lastIdent = t;
				// se decide más adelante (si lo sigue '(' es función)
				out += `__IDENT__${escapeHtml(t)}__/IDENT__`;
			}
			continue;
		}
		// puntuación
		if (lastIdent && t.startsWith("(")) {
			// reemplaza el último identificador como función
			out = out.replace(
				`__IDENT__${escapeHtml(lastIdent)}__/IDENT__`,
				token(lastIdent, TOKEN_COLORS.fn, "bold"),
			);
		}
		out += token(t, TOKEN_COLORS.punct);
		lastIdent = null;
	}
	// identificadores que quedaron sin '(' detrás → ident normal
	out = out.replace(/__IDENT__(.*?)__\/IDENT__/g, (_, name) => {
		// 'name' ya viene escapado; reusamos token() de forma segura sin re-escapar
		return `<span style="color:${TOKEN_COLORS.ident}">${name}</span>`;
	});
	return out;
}

// Inline: `<code>btoa(JSON.stringify(filtro))</code>` con tokens grises.
export function code(src: string): string {
	return `<code style="${CODE_BASE_STYLE}">${tokenizeInline(src)}</code>`;
}

// Bloque multilínea: `<pre><code>…</code></pre>`
export function codeBlock(src: string): string {
	const blockStyle =
		CODE_BASE_STYLE +
		"display:block;padding:8px 10px;white-space:pre;overflow:auto;";
	return `<pre style="margin:8px 0;"><code style="${blockStyle}">${tokenizeInline(src)}</code></pre>`;
}
