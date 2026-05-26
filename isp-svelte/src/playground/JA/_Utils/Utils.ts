import type { IconifyProps } from "$lib/primitives/Iconify.svelte";
import type { BreakpointSize } from "$lib/containers/layout/BlockLayout.svelte";
import type { ComponentColor } from "$lib/UlConst";

export const columnsGridPlayground = (size: BreakpointSize) => ({ xs: 2, sm: 3, md: 4, lg: 4, xl: 5 } as any)[size];

export const columnsConfig = (itemCount: number, size: BreakpointSize = "xl") => Math.min(({ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 })[size], Math.max(1, Math.floor(Number(itemCount)) || 1));

export const LAYOUT_PREVIEW_EMOJIS = [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(
	"😂❤️🔥😍✨🎉🙏👍⭐💯😊😎🤣😢🙌💀🙋🙊🌟🚀🥰😘🤔😅😜🤩😱😭😡🥺😴🤤🤯🤗🤝👏🙈🐶🐱🦄🍕🍔🍟🍩🍦🍓🍎🍇🌈☀️🌙",
)].map((seg) => seg.segment);

export function optionsToItems(
	options: any[] | Record<string, any> | undefined,
): [string, any][] {
	if (!options) return [];
	if (Array.isArray(options)) {
		return options.map((v) => {
			if (v && typeof v === "object" && "value" in v) {
				return [
					String((v as any).label ?? (v as any).value),
					(v as any).value,
				] as [string, any];
			}
			return [String(v) ?? "None", v] as [string, any];
		});
	}
	if (typeof options === "object") {
		return Object.entries(options).map(([label, val]) => [label, val]) as [
			string,
			any,
		][];
	}
	return [];
}

export const iconEnum: Record<string, IconifyProps["icon"]> = {
	None: "",
	"Rocket (Emoji)": "fluent-emoji:rocket",
	"Fire (Emoji)": "fluent-emoji:fire",
	"Star (Emoji)": "fluent-emoji:star",
	"Heart (Emoji)": "fluent-emoji:red-heart",
	"Home (MDI)": "mdi:home",
	"Account (MDI)": "mdi:account",
	"Settings (MDI)": "mdi:cog",
	"Check (MDI)": "mdi:check-circle",
	"Alert (MDI)": "mdi:alert-circle",
	"Delete (MDI)": "mdi:delete",
	"Add User (MDI)": "mdi:account-plus",
	"Help (MDI)": "mdi:help-circle-outline",
	"Svelte (Logos)": "logos:svelte-icon",
	"React (Logos)": "logos:react",
	"Vue (Logos)": "logos:vue",
	"Angular (Logos)": "logos:angular-icon",
	"Vite (Logos)": "logos:vitejs",
	"TypeScript (Logos)": "logos:typescript-icon",
	"JavaScript (Logos)": "logos:javascript",
	"HTML5 (Logos)": "logos:html-5",
	"CSS3 (Logos)": "logos:css-3",
	"Node.js (Logos)": "logos:nodejs-icon",
	"Tailwind (Logos)": "logos:tailwindcss-icon",
	"Firebase (Logos)": "logos:firebase",
	"Loading (LineMD)": "line-md:loading-twotone-loop",
	"Confirm (LineMD)": "line-md:confirm-circle",
	"Upload (LineMD)": "line-md:cloud-upload-loop",
	"Switch (LineMD)": "line-md:switch",
	"Google (Flat)": "flat-color-icons:google",
	"Settings (Flat)": "flat-color-icons:settings",
	"Search (Flat)": "flat-color-icons:search",
	"Folder (Flat)": "flat-color-icons:folder",
	"Calendar (Flat)": "flat-color-icons:calendar",
	"Chart (Flat)": "flat-color-icons:area-chart",
};

export const colorIcons: Record<string, IconifyProps["icon"]> = {
	"": "mdi:block-helper",
	primary: "mdi:palette",
	info: "mdi:information",
	success: "mdi:check-circle",
	warning: "mdi:alert",
	error: "mdi:close-circle",
	danger: "mdi:fire",
	neutral: "mdi:palette-swatch",
};

export const colorOptions = {
	"": "",
	primary: "primary",
	info: "info",
	success: "success",
	warning: "warning",
	error: "error",
	danger: "danger",
	neutral: "neutral",
} as const satisfies Record<string, "" | ComponentColor>;

export type PlaygroundPaletteColor = (typeof colorOptions)[keyof typeof colorOptions];

export function playgroundPaletteTrueColor(val: unknown): string {
	if (!val) return "neutral";
	return String(val);
}

export function playgroundRadioTrueColor(val: unknown): string {
	if (val === "" || val === null || val === undefined || val === "neutral") return "primary";
	return String(val);
}

// =============================================================================
// Generadores de código fuente PLANO. El resaltado lo hace CodeMirror.
// =============================================================================

export type TAttrItem = {
	name: string;
	value?: any;
	type?: "str" | "num" | "color" | "pt" | "pt-object" | "bind" | "event" | "bool";
	explicitFalse?: boolean;
	default?: any;
	dispatch?: boolean;
	native?: boolean;
};

export type TTagOpts = {
	indent?: number;
	multiline?: boolean;
	selfClose?: boolean;
};

const isIdent = (s: string) => /^[A-Za-z_$][\w$]*$/.test(s);

const fmtColorPlain = (c: any): string => {
	if (c == null || c === "") return "";
	if (typeof c === "string") return `"${c}"`;
	if (typeof c !== "object") return "";
	const keys = Object.keys(c);
	if (!keys.length) return "";
	const base = keys[0];
	const opts = (c as Record<string, any>)[base];
	if (opts == null || typeof opts !== "object") return "";
	const optsStr = Object.entries(opts).map(([k, v]) => `${k}: ${v}`).join(", ");
	const quotedBase = isIdent(base) ? base : `"${base}"`;
	return `{{ ${quotedBase}: { ${optsStr} } }}`;
};

const renderBraceExpr = (v: any): string => {
	if (typeof v === "boolean" || typeof v === "number") return String(v);
	if (typeof v === "string") return v;
	return String(v);
};

const filterAttrs = (attrs: TAttrItem[]): TAttrItem[] =>
	attrs.filter((a) => {
		if (!a || typeof a.name !== "string") return false;
		const t = a.type
			?? (typeof a.value === "boolean"
				? "bool"
				: typeof a.value === "number"
					? "num"
					: typeof a.value === "string"
						? "str"
						: typeof a.value === "undefined"
							? "bool"
							: undefined);
		if (t === "bind") return true;
		if (a.type !== "bind" && a.value === undefined) return false;
		if (a.value === null) return false;
		const def = a.default !== undefined ? a.default : t === "str" ? "" : undefined;
		if (def !== undefined && a.value === def) return false;
		return true;
	});

const renderAttr = (a: TAttrItem, prefix: string): string => {
	const t = a.type
		?? (typeof a.value === "boolean"
			? "bool"
			: typeof a.value === "number"
				? "num"
				: typeof a.value === "string"
					? "str"
					: typeof a.value === "undefined"
						? "bool"
						: undefined);
	if (t === "event") {
		let ev = a.name;
		if (a.dispatch) ev = a.name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
		if (a.native) return `${prefix}on:${ev}={${a.value}}`;
		return `${prefix}${ev}={${a.value}}`;
	}
	if (t === "color") {
		const c = fmtColorPlain(a.value);
		if (!c) return "";
		return `${prefix}${a.name}=${c}`;
	}
	if (t === "bool") {
		if (a.value) return `${prefix}${a.name}`;
		if (a.explicitFalse) return `${prefix}${a.name}={false}`;
		return "";
	}
	if (t === "pt" && typeof a.value === "string" && a.value === a.name && isIdent(a.name)) {
		return `${prefix}{${a.name}}`;
	}
	if (t === "bind" && typeof a.value === "string" && a.value === a.name && isIdent(a.name)) {
		return `${prefix}bind:${a.name}`;
	}
	if (t === "bind") {
		if (!a.value) return `${prefix}bind:${a.name}`;
		return `${prefix}bind:${a.name}={${renderBraceExpr(a.value)}}`;
	}
	if (t === "str") return `${prefix}${a.name}="${a.value}"`;
	if (t === "num") return `${prefix}${a.name}={${a.value}}`;
	if (t === "pt") return `${prefix}${a.name}={${renderBraceExpr(a.value)}}`;
	if (t === "pt-object") return `${prefix}${a.name}={{${renderBraceExpr(a.value)}}}`;
	return `${prefix}${a.name}="${a.value}"`;
};

const tagOpenPlain = (name: string, attrs: TAttrItem[] = [], opts: TTagOpts = {}) => {
	const { selfClose = false } = opts;
	let s = `<${name}`;
	const filtered = filterAttrs(attrs);
	filtered.forEach((a) => {
		s += renderAttr(a, " ");
	});
	s += selfClose ? ` />` : `>`;
	return s;
};

const tagClosePlain = (name: string) => `</${name}>`;

const plainHelpers = {
	txt: (s: string) => s,
	pt: (s: string) => s,
	comm: (s: string) => s,
	fmtColor: fmtColorPlain,
	punc: (s: string) => s,
	cl: (s: string) => s,
	str: (s: string | boolean) => `"${s}"`,
	prop: (s: string) => s,
	kw: (s: string) => s,
	codeBg: "#1E1E1E",
};

export const buildTag = (
	name: string,
	attrs: TAttrItem[] = [],
	opts: TTagOpts = {},
	bodyFn?: (helpers: typeof plainHelpers) => string,
) => {
	const open = tagOpenPlain(name, attrs, { ...opts, selfClose: !bodyFn });
	if (!bodyFn) return open;
	const content = bodyFn(plainHelpers)
		.split("\n")
		.map((l) => l.trim())
		.filter((l) => l)
		.join(" ");
	if (!content) return `${open}${tagClosePlain(name)}`;
	return `${open}${content}${tagClosePlain(name)}`;
};

export const prefixGridLayoutCodeWithCardStyleComment = (gridSnippet: string) => gridSnippet;

export type TBuildLayoutPreviewItemOpts = { compactStyle?: boolean };

export const buildLayoutPreviewItemSnippet = (
	emoji: string,
	stretchToCell = false,
	opts?: TBuildLayoutPreviewItemOpts,
) =>
	buildTag(
		"Card",
		[
			{
				name: "style",
				value: opts?.compactStyle === false
					? stretchToCell
						? "box-sizing: border-box; max-width: 100%; width: 100%; height: 100%; min-height: 3rem; display: flex; align-items: center; justify-content: center;"
						: "box-sizing: border-box; max-width: 100%; width: fit-content; height: fit-content; display: inline-flex; align-items: center; justify-content: center;"
					: "...",
				type: "str",
			},
		],
		{},
		({ txt }) => txt(emoji),
	);
