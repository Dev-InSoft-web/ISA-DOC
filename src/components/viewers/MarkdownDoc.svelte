<script lang="ts">
	import { onMount, tick } from 'svelte';

	export let src: string;
	export let title: string = '';

	let html = '';
	let loading = true;
	let error = '';

	const CM_BASE = 'https://cdn.jsdelivr.net/npm/codemirror@5.65.16';

	const LANG_TO_CM: Record<string, { mode: string; mime: string; label: string }> = {
		ts: { mode: 'javascript', mime: 'application/typescript', label: 'TypeScript' },
		tsx: { mode: 'javascript', mime: 'application/typescript', label: 'TypeScript' },
		typescript: { mode: 'javascript', mime: 'application/typescript', label: 'TypeScript' },
		js: { mode: 'javascript', mime: 'text/javascript', label: 'JavaScript' },
		jsx: { mode: 'javascript', mime: 'text/javascript', label: 'JavaScript' },
		javascript: { mode: 'javascript', mime: 'text/javascript', label: 'JavaScript' },
		json: { mode: 'javascript', mime: 'application/json', label: 'JSON' },
		sql: { mode: 'sql', mime: 'text/x-sql', label: 'SQL' },
		yaml: { mode: 'yaml', mime: 'text/x-yaml', label: 'YAML' },
		yml: { mode: 'yaml', mime: 'text/x-yaml', label: 'YAML' },
		bash: { mode: 'shell', mime: 'text/x-sh', label: 'Shell' },
		sh: { mode: 'shell', mime: 'text/x-sh', label: 'Shell' },
		shell: { mode: 'shell', mime: 'text/x-sh', label: 'Shell' },
		powershell: { mode: 'powershell', mime: 'application/x-powershell', label: 'PowerShell' },
		html: { mode: 'xml', mime: 'text/html', label: 'HTML' },
		xml: { mode: 'xml', mime: 'application/xml', label: 'XML' },
	};

	const cmModesLoaded = new Set<string>();

	function loadScript(s: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const el = document.createElement('script');
			el.src = s;
			el.onload = () => resolve();
			el.onerror = () => reject(new Error(`No se pudo cargar ${s}`));
			document.head.appendChild(el);
		});
	}

	function loadStyle(href: string): void {
		if (document.querySelector(`link[href="${href}"]`)) return;
		const l = document.createElement('link');
		l.rel = 'stylesheet';
		l.href = href;
		document.head.appendChild(l);
	}

	async function loadMarked(): Promise<void> {
		if ((window as unknown as { marked?: unknown }).marked) return;
		await loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js');
	}

	async function loadCodeMirror(): Promise<void> {
		if ((window as unknown as { CodeMirror?: unknown }).CodeMirror) return;
		loadStyle(`${CM_BASE}/lib/codemirror.min.css`);
		loadStyle(`${CM_BASE}/theme/dracula.min.css`);
		await loadScript(`${CM_BASE}/lib/codemirror.min.js`);
	}

	async function loadCmMode(mode: string): Promise<void> {
		if (!mode || cmModesLoaded.has(mode)) return;
		try {
			await loadScript(`${CM_BASE}/mode/${mode}/${mode}.min.js`);
			cmModesLoaded.add(mode);
		} catch {
			/* mode opcional */
		}
	}

	type CmFactory = (host: HTMLElement, opts: Record<string, unknown>) => unknown;

	async function ensureMermaid(): Promise<{ render: (id: string, src: string) => Promise<{ svg: string }> } | null> {
		const w = window as unknown as { __mermaidReady?: boolean; mermaid?: { render: (id: string, src: string) => Promise<{ svg: string }> } };
		if (w.__mermaidReady && w.mermaid) return w.mermaid;
		try {
			const m = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs');
			const mermaid = (m as { default?: unknown }).default ?? m;
			const css = getComputedStyle(document.documentElement);
			const toHex = (value: string, fallback: string): string => {
				const probe = document.createElement('div');
				probe.style.color = value || fallback;
				probe.style.display = 'none';
				document.body.appendChild(probe);
				const resolved = getComputedStyle(probe).color;
				document.body.removeChild(probe);
				const nums = resolved.match(/-?\d+(\.\d+)?/g);
				if (!nums || nums.length < 3) return fallback;
				const clip = (n: number): number => Math.max(0, Math.min(255, Math.round(n)));
				const r = clip(Number(nums[0])).toString(16).padStart(2, '0');
				const g = clip(Number(nums[1])).toString(16).padStart(2, '0');
				const b = clip(Number(nums[2])).toString(16).padStart(2, '0');
				return `#${r}${g}${b}`;
			};
			const bgPrim = toHex(css.getPropertyValue('--is-bg-primary').trim(), '#0c1222');
			const bgSec = toHex(css.getPropertyValue('--is-bg-secondary').trim(), '#13203a');
			(mermaid as { initialize: (opts: Record<string, unknown>) => void }).initialize({
				startOnLoad: false,
				securityLevel: 'loose',
				themeVariables: {
					primaryColor: bgSec,
					primaryBorderColor: '#505080',
					primaryTextColor: '#ffffff',
					secondaryColor: bgSec,
					tertiaryColor: bgPrim,
					lineColor: '#505080',
					textColor: '#ffffff',
					mainBkg: bgSec,
					nodeBorder: '#505080',
				},
			});
			w.mermaid = mermaid as typeof w.mermaid;
			w.__mermaidReady = true;

			return w.mermaid ?? null;
		} catch {
			return null;
		}
	}

	async function renderMermaidBlocks(container: HTMLElement): Promise<void> {
		const blocks = Array.from(container.querySelectorAll('pre > code.language-mermaid')) as HTMLElement[];
		if (!blocks.length) return;
		const mm = await ensureMermaid();
		if (!mm) return;
		let i = 0;
		for (const codeEl of blocks) {
			const pre = codeEl.parentElement;
			if (!pre) continue;
			const source = codeEl.textContent ?? '';
			const host = document.createElement('div');
			host.className = 'is-mermaid';
			try {
				const { svg } = await mm.render(`mmd-${Date.now()}-${i++}`, source);
				host.innerHTML = svg;
			} catch (err) {
				host.textContent = `Error mermaid: ${(err as Error).message}`;
			}
			pre.replaceWith(host);
		}
	}

	async function renderCodeBlocks(container: HTMLElement): Promise<void> {
		const CM = (window as unknown as { CodeMirror?: CmFactory }).CodeMirror;
		if (!CM) return;

		const blocks = Array.from(container.querySelectorAll('pre > code')) as HTMLElement[];
		if (!blocks.length) return;

		const uniqueModes = new Set<string>();
		const items: Array<{
			codeEl: HTMLElement;
			lang: string;
			cfg: { mode: string; mime: string; label: string } | undefined;
		}> = [];
		for (const codeEl of blocks) {
			const cls = codeEl.className || '';
			const m = cls.match(/language-([\w-]+)/);
			const lang = (m?.[1] ?? '').toLowerCase();
			if (lang === 'mermaid') continue;
			const cfg = LANG_TO_CM[lang];
			if (cfg) uniqueModes.add(cfg.mode);
			items.push({ codeEl, lang, cfg });
		}
		await Promise.all([...uniqueModes].map((mo) => loadCmMode(mo)));

		for (const { codeEl, lang, cfg } of items) {
			const pre = codeEl.parentElement;
			if (!pre) continue;
			const text = codeEl.textContent ?? '';
			const wrapper = document.createElement('div');
			wrapper.className = 'is-codeblock';
			if (lang) {
				const tag = document.createElement('div');
				tag.className = 'is-codeblock-tag';
				tag.textContent = cfg?.label ?? lang.toUpperCase();
				wrapper.appendChild(tag);
			}
			const host = document.createElement('div');
			host.className = 'is-codeblock-host';
			wrapper.appendChild(host);
			pre.replaceWith(wrapper);

			CM(host, {
				value: text.replace(/\n$/, ''),
				mode: cfg?.mime ?? 'text/plain',
				theme: 'dracula',
				lineNumbers: true,
				readOnly: 'nocursor',
				viewportMargin: Infinity,
				lineWrapping: false,
				tabSize: 2,
				indentUnit: 2,
			});
		}
	}

	onMount(async () => {
		try {
			await Promise.all([loadMarked(), loadCodeMirror()]);
			const res = await fetch(src, { cache: 'no-cache' });
			if (!res.ok) throw new Error(`HTTP ${res.status} al cargar ${src}`);
			const md = await res.text();
			const marked = (window as unknown as {
				marked: { parse: (md: string, opts?: Record<string, unknown>) => string };
			}).marked;
			html = marked.parse(md, { mangle: false, headerIds: true });
			await tick();
			const container = document.querySelector('.docs-content');
			if (container) {
				await renderMermaidBlocks(container as HTMLElement);
				await renderCodeBlocks(container as HTMLElement);
			}
		} catch (e: unknown) {
			error = e instanceof Error ? e.message : String(e);
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<div class="docs-loading">Cargando…</div>
{:else if error}
	<div class="docs-error">⚠ {error}</div>
{:else}
	<article class="docs-content">
		{#if title}
			<header class="docs-head"><span>{title}</span></header>
		{/if}
		{@html html}
	</article>
{/if}

<style>
	.docs-loading,
	.docs-error {
		padding: 1.5rem;
		color: #888;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.85rem;
	}

	.docs-content {
		background: #161616;
		border: 1px solid #262626;
		border-radius: 6px;
		padding: 2rem 2.25rem;
		color: #d4d4d4;
		font-size: 0.92rem;
		line-height: 1.65;
		overflow-x: auto;
		margin: 1rem auto;
		max-width: 1100px;
	}

	.docs-head {
		font-size: 0.75rem;
		color: #888;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		margin-bottom: 1rem;
	}

	:global(.docs-content .is-mermaid) {
		display: flex;
		justify-content: center;
		margin: 1rem 0;
		padding: 0.75rem;
		background: var(--is-bg-readonly, #001327);
		border: 1px solid #8885;
		border-radius: 6px;
		overflow-x: auto;
	}
	:global(.docs-content .is-mermaid svg) {
		max-width: 100%;
		height: auto;
	}

	:global(.docs-content h1) {
		font-size: 1.7rem;
		color: #f0f0f0;
		margin: 0 0 1rem 0;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #2c2c2c;
		font-weight: 600;
	}
	:global(.docs-content h2) {
		font-size: 1.25rem;
		color: #e8e8e8;
		margin: 2rem 0 0.75rem 0;
		padding-bottom: 0.35rem;
		border-bottom: 1px solid #232323;
		font-weight: 600;
	}
	:global(.docs-content h3) {
		font-size: 1.05rem;
		color: #dcdcdc;
		margin: 1.5rem 0 0.5rem 0;
		font-weight: 600;
	}
	:global(.docs-content p) {
		margin: 0.6rem 0;
	}
	:global(.docs-content a) {
		color: #cfcfcf;
		text-decoration: underline;
		text-decoration-color: #555;
	}
	:global(.docs-content a:hover) {
		color: #fff;
		text-decoration-color: #999;
	}
	:global(.docs-content ul),
	:global(.docs-content ol) {
		padding-left: 1.4rem;
		margin: 0.5rem 0;
	}
	:global(.docs-content li) {
		margin: 0.2rem 0;
	}
	:global(.docs-content code) {
		background: #1f1f1f;
		border: 1px solid #2a2a2a;
		border-radius: 3px;
		padding: 0.05rem 0.35rem;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.85em;
		color: #e0e0e0;
	}
	:global(.docs-content pre) {
		background: #0f0f0f;
		border: 1px solid #262626;
		border-radius: 5px;
		padding: 0.85rem 1rem;
		overflow-x: auto;
		font-size: 0.82rem;
		line-height: 1.55;
		margin: 0.75rem 0;
	}
	:global(.docs-content pre code) {
		background: transparent;
		border: 0;
		padding: 0;
		color: #d4d4d4;
	}
	:global(.docs-content blockquote) {
		margin: 0.75rem 0;
		padding: 0.4rem 0.9rem;
		border-left: 3px solid #444;
		background: #1a1a1a;
		color: #b8b8b8;
		font-style: italic;
	}
	:global(.docs-content table) {
		border-collapse: collapse;
		width: 100%;
		margin: 0.75rem 0;
		font-size: 0.85rem;
	}
	:global(.docs-content th),
	:global(.docs-content td) {
		border: 1px solid #2c2c2c;
		padding: 0.4rem 0.6rem;
		text-align: left;
	}
	:global(.docs-content th) {
		background: #1c1c1c;
		color: #e0e0e0;
		font-weight: 600;
	}

	:global(.is-codeblock) {
		margin: 1rem 0;
		border: 1px solid #2c2c2c;
		border-radius: 6px;
		overflow: hidden;
	}
	:global(.is-codeblock-tag) {
		padding: 0.3rem 0.7rem;
		background: #1a1a1a;
		color: #888;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.7rem;
		letter-spacing: 0.04em;
		border-bottom: 1px solid #2c2c2c;
	}
	:global(.is-codeblock-host .CodeMirror) {
		height: auto;
		font-size: 0.82rem;
		line-height: 1.55;
	}
</style>
