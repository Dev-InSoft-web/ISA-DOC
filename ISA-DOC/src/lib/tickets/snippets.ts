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

// ─────────────────────────────────────────────────────────────────────────
// iconSvg(name, opts) — versión asíncrona que **inserta el SVG inline** en
// el HTML resultante. Usa `loadIcon` de ispsveltecomponents (cache global +
// fallback iconify.design). Los SVG monocromáticos de Iconify usan
// `currentColor`, por lo que el color se hereda del ancestro vía CSS
// (`color:` en el `<span>` envolvente). Esto evita el truco del `?color=…`
// y deja que el visor renderice la pieza de forma nativa.
// ─────────────────────────────────────────────────────────────────────────
import { loadIcon } from "@ingenieria_insoft/ispsveltecomponents";

function injectSvgAttrs(svg: string, size: number, altText: string, extraStyle: string, hardColor?: string): string {
	// 1) Quitar width/height/style fijos del SVG raíz para no chocar con los nuestros.
	// 2) Inyectar width/height + style con tamaño/alineación y aria.
	// 3) Si recibimos `hardColor`, reemplazar `currentColor` por ese hex (algunos
	//    visores no resuelven `currentColor` ni `inherit` correctamente).
	const baseStyle = `height:${size}px;width:${size}px;vertical-align:middle;display:inline-block;${extraStyle}`;
	const patched = hardColor
		? svg.replace(/currentColor/g, hardColor)
		: svg;
	const fillAttr = hardColor ? ` fill="${hardColor}"` : "";
	return patched.replace(/<svg\b([^>]*)>/i, (_m, attrs) => {
		const cleaned = String(attrs)
			.replace(/\swidth="[^"]*"/i, "")
			.replace(/\sheight="[^"]*"/i, "")
			.replace(/\sstyle="[^"]*"/i, "")
			.replace(/\sfill="[^"]*"/i, "");
		const aria = altText ? ` role="img" aria-label="${escapeHtml(altText)}"` : ` aria-hidden="true" focusable="false"`;
		return `<svg${cleaned} width="${size}" height="${size}" style="${baseStyle}"${aria}${fillAttr}>`;
	});
}

const ICON_FALLBACK_CACHE = new Map<string, Promise<string>>();
async function fetchIconSvgRaw(name: string): Promise<string> {
	if (ICON_FALLBACK_CACHE.has(name)) return ICON_FALLBACK_CACHE.get(name)!;
	const p = loadIcon(name).catch(() => "");
	ICON_FALLBACK_CACHE.set(name, p);
	return p;
}

export async function iconSvg(name: string, opts: IconOpts = {}): Promise<string> {
	const size = opts.size ?? 16;
	const altText = opts.alt ?? "";
	const extra = opts.style ? `;${opts.style}` : "";
	const raw = await fetchIconSvgRaw(name);
	if (raw && raw.includes("<svg")) return injectSvgAttrs(raw, size, altText, extra, opts.color);
	// Fallback final: <img> con ?color= cuando exista.
	return icon(name, { size, alt: altText, style: opts.style, color: opts.color });
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

// ----------------------------------------------------------- código (inline + bloque)
// Inline: color sostenido SteelBlue (sin tokenizar).
// Bloque: highlight con la API de CodeMirror/Lezer (parser por lenguaje) y
// tema VSCode Dark+ aplicado como estilos inline (email-safe).

import { highlightTree, tagHighlighter, tags as t } from "@lezer/highlight";
import { javascriptLanguage, typescriptLanguage } from "@codemirror/lang-javascript";
import { jsonLanguage } from "@codemirror/lang-json";
import { htmlLanguage } from "@codemirror/lang-html";
import { StandardSQL } from "@codemirror/lang-sql";
import type { LRLanguage } from "@codemirror/language";

const INLINE_CODE_COLOR = "steelblue";

const CODE_INLINE_STYLE =
	"font-family:Consolas,'Courier New',monospace;font-size:0.92em;" +
	"padding:1px 4px;margin:0;border-radius:3px;" +
	"background-color:rgba(70,130,180,0.10);" +
	"border:1px solid rgba(70,130,180,0.25);" +
	`color:${INLINE_CODE_COLOR};text-shadow:none;font-weight:600;`;

// VSCode Dark+ palette (subset suficiente para JS/TS/JSON/SQL/HTML).
const VSDARK_BG = "#1e1e1e";
const VSDARK_FG = "#d4d4d4";
const CODE_BLOCK_PRE_STYLE =
	`background-color:${VSDARK_BG};color:${VSDARK_FG};` +
	"border:1px solid #333;border-radius:6px;" +
	"margin:8px 0;padding:10px 12px;" +
	"font-family:Calibri,Arial,Tahoma,sans-serif;font-size:0.92em;" +
	"line-height:1.45;text-shadow:none;" +
	"white-space:pre-wrap;overflow:auto;max-width:100%;";
const CODE_BLOCK_INNER_STYLE =
	`color:${VSDARK_FG};background:transparent;font-family:inherit;font-size:inherit;`;

// El "class" del Highlighter se inyecta literalmente en el atributo style del
// <span> que generamos, así que aquí van CSS rules en lugar de class names.
const vsdarkHighlighter = tagHighlighter([
	{ tag: t.comment, class: "color:#6a9955;font-style:italic" },
	{ tag: t.lineComment, class: "color:#6a9955;font-style:italic" },
	{ tag: t.blockComment, class: "color:#6a9955;font-style:italic" },
	{ tag: t.docComment, class: "color:#6a9955;font-style:italic" },
	{ tag: t.keyword, class: "color:#569cd6;font-weight:600" },
	{ tag: t.controlKeyword, class: "color:#c586c0;font-weight:600" },
	{ tag: t.moduleKeyword, class: "color:#c586c0;font-weight:600" },
	{ tag: t.operatorKeyword, class: "color:#569cd6" },
	{ tag: t.definitionKeyword, class: "color:#569cd6;font-weight:600" },
	{ tag: t.modifier, class: "color:#569cd6" },
	{ tag: t.string, class: "color:#ce9178" },
	{ tag: t.special(t.string), class: "color:#ce9178" },
	{ tag: t.regexp, class: "color:#d16969" },
	{ tag: t.escape, class: "color:#d7ba7d" },
	{ tag: t.number, class: "color:#b5cea8" },
	{ tag: t.bool, class: "color:#569cd6" },
	{ tag: t.null, class: "color:#569cd6" },
	{ tag: t.atom, class: "color:#569cd6" },
	{ tag: t.typeName, class: "color:#4ec9b0" },
	{ tag: t.className, class: "color:#4ec9b0" },
	{ tag: t.namespace, class: "color:#4ec9b0" },
	{ tag: t.labelName, class: "color:#c8c8c8" },
	{ tag: t.function(t.variableName), class: "color:#dcdcaa" },
	{ tag: t.function(t.propertyName), class: "color:#dcdcaa" },
	{ tag: t.definition(t.function(t.variableName)), class: "color:#dcdcaa" },
	{ tag: t.macroName, class: "color:#dcdcaa" },
	{ tag: t.propertyName, class: "color:#9cdcfe" },
	{ tag: t.attributeName, class: "color:#9cdcfe" },
	{ tag: t.variableName, class: "color:#9cdcfe" },
	{ tag: t.local(t.variableName), class: "color:#9cdcfe" },
	{ tag: t.special(t.variableName), class: "color:#9cdcfe" },
	{ tag: t.definition(t.variableName), class: "color:#9cdcfe" },
	{ tag: t.constant(t.variableName), class: "color:#4fc1ff" },
	{ tag: t.tagName, class: "color:#569cd6" },
	{ tag: t.angleBracket, class: "color:#808080" },
	{ tag: t.bracket, class: "color:#d4d4d4" },
	{ tag: t.brace, class: "color:#d4d4d4" },
	{ tag: t.paren, class: "color:#d4d4d4" },
	{ tag: t.squareBracket, class: "color:#d4d4d4" },
	{ tag: t.punctuation, class: "color:#d4d4d4" },
	{ tag: t.separator, class: "color:#d4d4d4" },
	{ tag: t.operator, class: "color:#d4d4d4" },
	{ tag: t.derefOperator, class: "color:#d4d4d4" },
	{ tag: t.updateOperator, class: "color:#d4d4d4" },
	{ tag: t.arithmeticOperator, class: "color:#d4d4d4" },
	{ tag: t.logicOperator, class: "color:#d4d4d4" },
	{ tag: t.bitwiseOperator, class: "color:#d4d4d4" },
	{ tag: t.compareOperator, class: "color:#d4d4d4" },
	{ tag: t.heading, class: "color:#569cd6;font-weight:bold" },
	{ tag: t.emphasis, class: "font-style:italic" },
	{ tag: t.strong, class: "font-weight:bold" },
	{ tag: t.link, class: "color:#569cd6;text-decoration:underline" },
	{ tag: t.url, class: "color:#569cd6;text-decoration:underline" },
	{ tag: t.invalid, class: "color:#f44747" },
]);

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

export type CodeLang = "ts" | "typescript" | "js" | "javascript" | "json" | "sql" | "html";

function pickLanguage(lang?: CodeLang): LRLanguage {
	switch (lang) {
		case "json": return jsonLanguage;
		case "sql": return StandardSQL.language;
		case "html": return htmlLanguage;
		case "js":
		case "javascript": return javascriptLanguage;
		case "ts":
		case "typescript":
		default: return typescriptLanguage;
	}
}

// Resalta `src` usando el parser Lezer del lenguaje indicado y el highlighter
// vsdark (estilos inline en cada <span>). Devuelve sólo el contenido (sin
// envoltorio <pre>/<code>); el caller decide la presentación.
function highlightCode(src: string, lang?: CodeLang): string {
	const tree = pickLanguage(lang).parser.parse(src);
	let out = "";
	let pos = 0;
	highlightTree(tree, vsdarkHighlighter, (from, to, classes) => {
		if (pos < from) out += escapeHtml(src.slice(pos, from));
		const slice = escapeHtml(src.slice(from, to));
		out += classes
			? `<span style="${classes}">${slice}</span>`
			: slice;
		pos = to;
	});
	if (pos < src.length) out += escapeHtml(src.slice(pos));
	return out;
}

// Inline: color SteelBlue sostenido (sin highlight de tokens). Email-safe:
// fondo y borde sutiles para distinguirlo del párrafo.
export function code(src: string): string {
	return `<code style="${CODE_INLINE_STYLE}">${escapeHtml(src)}</code>`;
}

// Bloque multilínea: `<pre><code>…</code></pre>` con highlight vsdark sobre
// fondo oscuro. `lang` permite elegir el parser (default "typescript").
// Para clientes de email que ignoran `white-space:pre`, convertimos los
// saltos de línea a <br> y los espacios de indentación a &nbsp;.
export function codeBlock(src: string, lang: CodeLang = "typescript"): string {
	const highlighted = highlightCode(src, lang);
	const emailSafe = highlighted
		.split("\n")
		.map((line) => line.replace(/^ +/, (m) => "&nbsp;".repeat(m.length)))
		.join("<br>");
	return (
		`<pre style="${CODE_BLOCK_PRE_STYLE}"><code style="${CODE_BLOCK_INNER_STYLE}">` +
		emailSafe +
		`</code></pre>`
	);
}

// ─────────────────────────────────────────────────────────────────────────
// img(src, width?) — renderiza un <img> simple, email-safe.
// `src` puede ser URL/data URI (recomendado importar con `?inline`).
// ─────────────────────────────────────────────────────────────────────────

export function img(src: string, width = 720): string {
	return (
		`<img src="${src}" style="display:block;max-width:100%;width:${width}px;` +
		`height:auto;border:1px solid #ddd;border-radius:4px;margin:0.75rem 0;">`
	);
}


