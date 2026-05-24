/**
 * Loader y render de Mermaid unificado para toda la app (ISA-DOC).
 *
 * Garantiza que:
 *   - Solo se carga mermaid@11 una vez (idempotente, cacheado en window).
 *   - El tema oscuro proviene de las variables CSS globales --is-* del sitio,
 *     idéntico al usado en el panel SQL (TreeSQLTables), de modo que el DER de
 *     tablas y los diagramas dentro de docs Markdown se vean consistentes.
 *   - El consumidor solo tiene que pasar el `source` (texto mermaid) o un
 *     container con bloques `<pre><code class="language-mermaid">…</code></pre>`.
 */

type MermaidAPI = {
	initialize: (opts: Record<string, unknown>) => void;
	render: (id: string, src: string) => Promise<{ svg: string } | string>;
	registerLayoutLoaders?: (loaders: unknown) => void;
};

declare global {
	interface Window {
		mermaid?: MermaidAPI;
		__isaMermaidPromise?: Promise<MermaidAPI>;
		__isaMermaidReady?: boolean;
	}
}

const MERMAID_CDN = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
const MERMAID_ELK_CDN = "https://cdn.jsdelivr.net/npm/@mermaid-js/layout-elk@0/dist/mermaid-layout-elk.esm.min.mjs";

function cssVarToHex(value: string, fallback: string): string {
	const probe = document.createElement("div");
	probe.style.color = value || fallback;
	probe.style.display = "none";
	document.body.appendChild(probe);
	const resolved = getComputedStyle(probe).color;
	document.body.removeChild(probe);
	const nums = resolved.match(/-?\d+(\.\d+)?/g);
	if (!nums || nums.length < 3) return fallback;
	const clip = (n: number): number => Math.max(0, Math.min(255, Math.round(n)));
	const r = clip(Number(nums[0])).toString(16).padStart(2, "0");
	const g = clip(Number(nums[1])).toString(16).padStart(2, "0");
	const b = clip(Number(nums[2])).toString(16).padStart(2, "0");

	return `#${r}${g}${b}`;
}

function buildThemeVariables(): Record<string, string> {
	const css = getComputedStyle(document.documentElement);
	const bgPrim = cssVarToHex(css.getPropertyValue("--is-bg-primary").trim(), "#0c1222");
	const bgSec = cssVarToHex(css.getPropertyValue("--is-bg-secondary").trim(), "#13203a");

	return {
		primaryColor: bgSec,
		primaryBorderColor: "#505080",
		primaryTextColor: "#ffffff",
		secondaryColor: bgSec,
		tertiaryColor: bgPrim,
		lineColor: "dodgerblue",
		textColor: "#ffffff",
		mainBkg: bgSec,
		nodeBorder: "#505080",
		attributeBackgroundColorOdd: bgPrim,
		attributeBackgroundColorEven: bgSec,
		clusterBkg: bgSec,
		clusterBorder: "#505080",
		edgeLabelBackground: bgSec,
		actorBkg: bgSec,
		actorBorder: "#505080",
		actorTextColor: "#ffffff",
		labelBoxBkgColor: bgSec,
		labelBoxBorderColor: "#505080",
		signalColor: "dodgerblue",
		signalTextColor: "#ffffff",
	};
}

export async function ensureMermaid(): Promise<MermaidAPI> {
	if (window.__isaMermaidReady && window.mermaid) return window.mermaid;
	if (window.__isaMermaidPromise) return window.__isaMermaidPromise;

	const promise = (async (): Promise<MermaidAPI> => {
		const m = await import(/* @vite-ignore */ MERMAID_CDN);
		const mermaid = ((m as { default?: MermaidAPI }).default ?? (m as unknown as MermaidAPI));
		try {
			const elk = await import(/* @vite-ignore */ MERMAID_ELK_CDN);
			const elkLoaders = (elk as { default?: unknown }).default ?? elk;
			mermaid.registerLayoutLoaders?.(elkLoaders);
		} catch {
			// elk es opcional; mermaid sigue funcionando con el layout por defecto
		}
		try {
			mermaid.initialize({
				startOnLoad: false,
				securityLevel: "loose",
				themeVariables: buildThemeVariables(),
				flowchart: { curve: "step", htmlLabels: true, useMaxWidth: true },
			});
		} catch {
			// si initialize falla con el tema, mermaid sigue usable con defaults
		}
		window.mermaid = mermaid;
		window.__isaMermaidReady = true;

		return mermaid;
	})();

	window.__isaMermaidPromise = promise;
	return promise;
}

let mermaidCounter = 0;

export async function renderMermaidSvg(source: string): Promise<string> {
	const mm = await ensureMermaid();
	const id = `isa-mmd-${Date.now()}-${++mermaidCounter}`;
	const out = await mm.render(id, source);

	return typeof out === "string" ? out : (out?.svg ?? "");
}

/**
 * Convierte todos los bloques `<pre><code class="language-mermaid">…</code></pre>`
 * del container en `<div class="is-mermaid">…SVG…</div>`.
 *
 * Idempotente: si un bloque ya fue procesado se omite.
 */
export async function renderMermaidBlocks(container: HTMLElement): Promise<void> {
	const blocks = Array.from(container.querySelectorAll("pre > code.language-mermaid")) as HTMLElement[];
	if (!blocks.length) return;

	let mm: MermaidAPI;
	try {
		mm = await ensureMermaid();
	} catch {
		return;
	}

	for (const codeEl of blocks) {
		const pre = codeEl.parentElement;
		if (!pre) continue;
		const source = codeEl.textContent ?? "";
		const host = document.createElement("div");
		host.className = "is-mermaid";
		try {
			const id = `isa-mmd-${Date.now()}-${++mermaidCounter}`;
			const out = await mm.render(id, source);
			host.innerHTML = typeof out === "string" ? out : (out?.svg ?? "");
		} catch (err) {
			host.textContent = `Error mermaid: ${(err as Error).message}`;
		}
		pre.replaceWith(host);
	}
}
