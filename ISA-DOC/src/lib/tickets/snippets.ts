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
	"font-family:Tahoma,Arial,Calibri,sans-serif !important;font-size:0.92em;" +
	"line-height:1.45;text-shadow:none;" +
	"white-space:pre-wrap;overflow:auto;max-width:100%;";
const CODE_BLOCK_INNER_STYLE =
	`color:${VSDARK_FG};background:transparent;` +
	"font-family:Tahoma,Arial,Calibri,sans-serif !important;font-size:inherit;";

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

// Devuelve el contenido resaltado y email-safe (sin envoltorio `<pre>/<code>`),
// con saltos `<br>` y espacios de indentación `&nbsp;`.
function renderCodeInner(src: string, lang?: CodeLang): string {
	const highlighted = highlightCode(src, lang);
	return highlighted
		.split("\n")
		.map((line) => line.replace(/^ +/, (m) => "&nbsp;".repeat(m.length)))
		.join("<br>");
}

import { lookupCodeImage, type CodeImageInfo } from "./codeImage";

const CODE_BLOCK_DEFAULT_W = 720;
const CODE_BLOCK_COMPARE_W = 360;

function renderCodeImg(info: CodeImageInfo, targetW: number): string {
	let w = info.width;
	let h = info.height;
	if (w > targetW) {
		h = Math.round((h * targetW) / w);
		w = targetW;
	}
	return (
		`<a href="${info.url}" target="_blank" rel="noopener noreferrer" ` +
		`style="display:block;margin:8px 0;text-decoration:none;">` +
		`<img src="${info.url}" alt="" width="${w}" height="${h}" ` +
		`style="display:block;width:${w}px;height:${h}px;` +
		`border:0;border-radius:6px;background-color:#000;cursor:zoom-in;">` +
		`</a>`
	);
}

function renderCodeFallbackPre(src: string, lang: CodeLang): string {
	return (
		`<pre style="${CODE_BLOCK_PRE_STYLE}"><code style="${CODE_BLOCK_INNER_STYLE}">` +
		renderCodeInner(src, lang) +
		`</code></pre>`
	);
}

// Bloque multilínea. Si existe imagen pre-generada (carbon-api → imgbb) en
// `assets/code-imgs.json`, devuelve `<img>`. Si no, devuelve el fallback
// `<pre><code>` con highlight Lezer (mismo aspecto vsdark) — esto permite
// que la página funcione antes de correr el script de build de imágenes.
export async function codeBlock(
	src: string,
	lang: CodeLang = "typescript",
	targetW: number = CODE_BLOCK_DEFAULT_W,
): Promise<string> {
	const info = await lookupCodeImage(src, lang);
	return info ? renderCodeImg(info, targetW) : renderCodeFallbackPre(src, lang);
}

// ─────────────────────────────────────────────────────────────────────────
// compareTable — tabla email-safe con dos columnas "Antes / Después".
// Si `kind:"code"`, las celdas usan el fondo vsdark (#1e1e1e) y se aplica
// highlight como en `codeBlock` (sin el wrapper `<pre>` para que la celda
// ocupe el fondo entero, sin doble borde ni doble padding).
// Si `kind:"html"`, las celdas usan fondo claro y se renderiza el HTML tal
// cual (útil para texto/listas).
// ─────────────────────────────────────────────────────────────────────────

export interface ComparePair {
	before: string;
	after: string;
	kind?: "code" | "html";
	lang?: CodeLang;
	beforeLabel?: string;
	afterLabel?: string;
}

export async function compareTable(pair: ComparePair): Promise<string> {
	const kind = pair.kind ?? "code";
	const beforeLabel = pair.beforeLabel ?? "Antes";
	const afterLabel = pair.afterLabel ?? "Después";
	const lang = pair.lang ?? "typescript";

	const isCode = kind === "code";
	const headerBg = isCode ? "#000000" : "#f5f5f5";
	const headerFg = isCode ? "#d4d4d4" : "#333333";
	const headerBorder = isCode ? "#333333" : "#dddddd";
	const cellBg = isCode ? VSDARK_BG : "#ffffff";
	const cellFg = isCode ? VSDARK_FG : "#333333";
	const cellBorder = isCode ? "#333333" : "#dddddd";
	const fontFamily = "Tahoma,Arial,Calibri,sans-serif";

	const headerStyle =
		`background-color:${headerBg};color:${headerFg};` +
		`border:1px solid ${headerBorder};` +
		`padding:6px 12px;font-family:${fontFamily};font-size:0.92em;` +
		`font-weight:bold;text-align:left;width:50%;`;

	const renderCell = async (src: string): Promise<{ html: string; isImg: boolean }> => {
		if (!isCode) return { html: src, isImg: false };
		const info = await lookupCodeImage(src, lang);
		if (info) return { html: renderCodeImg(info, CODE_BLOCK_COMPARE_W), isImg: true };
		return { html: renderCodeInner(src, lang), isImg: false };
	};

	const cellStyle = (isImg: boolean): string =>
		`background-color:${cellBg};color:${cellFg};` +
		`border:1px solid ${cellBorder};border-top:none;` +
		`padding:${isImg ? "0" : "10px 12px"};font-family:${fontFamily} !important;` +
		`font-size:0.92em;line-height:1.45;vertical-align:top;` +
		`width:50%;word-break:break-word;overflow-wrap:anywhere;`;

	const [beforeCell, afterCell] = await Promise.all([renderCell(pair.before), renderCell(pair.after)]);

	return (
		`<table cellpadding="0" cellspacing="0" border="0" ` +
		`style="border-collapse:collapse;width:100%;max-width:100%;` +
		`table-layout:fixed;margin:8px 0;">` +
		`<thead><tr>` +
		`<th style="${headerStyle}">${escapeHtml(beforeLabel)}</th>` +
		`<th style="${headerStyle};border-left:none;">${escapeHtml(afterLabel)}</th>` +
		`</tr></thead>` +
		`<tbody><tr>` +
		`<td style="${cellStyle(beforeCell.isImg)}">${beforeCell.html}</td>` +
		`<td style="${cellStyle(afterCell.isImg)};border-left:none;">${afterCell.html}</td>` +
		`</tr></tbody>` +
		`</table>`
	);
}

// ─────────────────────────────────────────────────────────────────────────
// img(filename, targetW?) — renderiza un <img> con dimensiones ya calculadas
// a partir del width/height nativo guardado en `imgbb-map.json`.
//
// Algoritmo (determinístico, sin CSS):
//   1. Por defecto se intenta `w = 360` (configurable por `targetW`).
//   2. Se proyecta `h = round(w * natH / natW)`.
//   3. Si `h < 300`, se fuerza `h = 300` y se recalcula `w = round(300 * natW / natH)`.
//   4. Para imágenes muy verticales: si `h > 600`, se baja a `h = 600` y se
//      recalcula `w = round(600 * natW / natH)`.
//
// Las medidas finales se emiten como atributos HTML `width` y `height` y
// también en el `style` (sin `max-width`/`min-height`), para que clientes
// de email respeten el tamaño exacto.
// ─────────────────────────────────────────────────────────────────────────

import { imgInfo } from "./assetsRemote";

const IMG_DEFAULT_W = 360;
const IMG_MIN_H = 300;
const IMG_MAX_H = 600;

function computeImgDims(natW: number, natH: number, targetW: number): { w: number; h: number } {
	if (!natW || !natH) return { w: targetW, h: targetW };
	let w = targetW;
	let h = Math.round((w * natH) / natW);
	if (h < IMG_MIN_H) {
		h = IMG_MIN_H;
		w = Math.round((h * natW) / natH);
	}
	if (h > IMG_MAX_H) {
		h = IMG_MAX_H;
		w = Math.round((h * natW) / natH);
	}
	return { w, h };
}

export function img(filename: string, targetW: number = IMG_DEFAULT_W): string {
	const info = imgInfo(filename);
	const { w, h } = computeImgDims(info.width, info.height, targetW);
	return (
		`<a href="${info.url}" target="_blank" rel="noopener noreferrer" ` +
		`style="display:block;margin:0.75rem 0;text-decoration:none;">` +
		`<img src="${info.url}" alt="" width="${w}" height="${h}" ` +
		`style="display:block;width:${w}px;height:${h}px;` +
		`border:1px solid #ddd;border-radius:4px;cursor:zoom-in;">` +
		`</a>`
	);
}


