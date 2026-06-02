<script lang="ts">
	import { onMount, tick } from "svelte";
	import { FlexLayout } from "@ingenieria_insoft/ispsveltecomponents";
	import { encode } from "gpt-tokenizer/model/gpt-5";
	import Accordion from "$comps/containers/Accordion.svelte";
	import PatyIAPromptAccordion from "./PatyIAPromptAccordion.svelte";
	import {
		PATY_PROMPT_TIPOS,
		WENYAN_LEGACY_BY_TIPO,
		promptMdFilename,
		type PatyPromptTipo,
	} from "../../lib/patyia/prompt-files";
	import md90 from "../../lib/patyia/prompts/90-general.md?raw";
	import md91 from "../../lib/patyia/prompts/91-consolidacion.md?raw";
	import md90u from "../../lib/patyia/prompts/ultra/90-general.md?raw";
	import md91u from "../../lib/patyia/prompts/ultra/91-consolidacion.md?raw";

	const baseGlob = import.meta.glob("../../lib/patyia/prompts/PROMPT_*.md", {
		query: "?raw",
		import: "default",
		eager: true,
	}) as Record<string, string>;
	const ultraGlob = import.meta.glob("../../lib/patyia/prompts/Ultra/PROMPT_*.md", {
		query: "?raw",
		import: "default",
		eager: true,
	}) as Record<string, string>;
	const wenyanGlob = import.meta.glob("../../lib/patyia/prompts/wenyan-ultra/*.md", {
		query: "?raw",
		import: "default",
		eager: true,
	}) as Record<string, string>;

	function pickGlob(glob: Record<string, string>, file: string, fallback?: string): string {
		const key = Object.keys(glob).find((k) => k.replace(/\\/g, "/").endsWith(`/${file}`));
		if (key) return glob[key];
		if (fallback !== undefined) return fallback;
		throw new Error(`Falta ${file} en glob de prompts`);
	}

	const ICON_BY_TIPO: Record<PatyPromptTipo, string> = {
		SALUDO_OTRO: "mdi:hand-wave",
		FUERA_DE_ALCANCE_TECNICO: "mdi:alert-circle-outline",
		SOLICITUD_NO_PERMITIDA: "mdi:cancel",
		REQUIERE_CONTEXTO: "mdi:help-circle-outline",
		PASO_A_PASO: "mdi:format-list-numbered",
		INTERPRETACION_RESULTADO: "mdi:chart-box-outline",
		CONSULTA_NORMATIVA_NEGOCIO: "mdi:gavel",
		ASESORIA_PERSONALIZADA: "mdi:account-tie",
		ERROR_TECNICO: "mdi:bug-outline",
		ERROR_CONFIGURACION: "mdi:cog-outline",
		ERROR_ACCESO: "mdi:lock-alert-outline",
		ERROR_DIAN: "mdi:file-document-alert-outline",
		COMERCIAL: "mdi:cash-multiple",
	};

	type Version = "original" | "ultra" | "wenyan" | "comparativa";

	type Prompt = {
		title: string;
		icon: string;
		md: string;
		mdUltra: string;
		mdWenyan: string;
	};

	const tipoPrompts: ReadonlyArray<Prompt> = PATY_PROMPT_TIPOS.map((tipo, i) => {
		const n = String(i + 1).padStart(2, "0");
		const file = promptMdFilename(tipo);
		const md = pickGlob(baseGlob, file);
		const mdUltra = pickGlob(ultraGlob, file);
		return {
			title: `${n}. ${tipo}`,
			icon: ICON_BY_TIPO[tipo],
			md,
			mdUltra,
			mdWenyan: pickGlob(wenyanGlob, WENYAN_LEGACY_BY_TIPO[tipo], mdUltra),
		};
	});

	const prompts: ReadonlyArray<Prompt> = [
		...tipoPrompts,
		{ title: "90. GENERAL", icon: "mdi:shield-account-outline", md: md90, mdUltra: md90u, mdWenyan: md90u },
		{ title: "91. CONSOLIDACION", icon: "mdi:merge", md: md91, mdUltra: md91u, mdWenyan: md91u },
	];

	let versiones: Version[] = prompts.map(() => "comparativa");

	// Conteo exacto con el tokenizer de la familia GPT-5 (encoding o200k_base).
	const countTokens = (s: string): number => encode(s).length;

	const fmt = (n: number) => n.toLocaleString("es-CO");
	const pct = (a: number, base: number) =>
		base === 0 ? "—" : `${Math.round((a / base) * 100)}%`;

	type Row = {
		origChars: number; origTok: number;
		ultraChars: number; ultraTok: number;
		wenChars: number; wenTok: number;
	};

	const rows: Row[] = prompts.map((p) => ({
		origChars: p.md.length,
		origTok: countTokens(p.md),
		ultraChars: p.mdUltra.length,
		ultraTok: countTokens(p.mdUltra),
		wenChars: p.mdWenyan.length,
		wenTok: countTokens(p.mdWenyan),
	}));

	const resumenEntries = prompts
		.map((prompt, index) => ({ prompt, row: rows[index] }))
		.filter(({ prompt }) => !prompt.title.startsWith("91."));

	const resumenTotals: Row = resumenEntries.reduce<Row>(
		(acc, { row }) => ({
			origChars: acc.origChars + row.origChars,
			origTok: acc.origTok + row.origTok,
			ultraChars: acc.ultraChars + row.ultraChars,
			ultraTok: acc.ultraTok + row.ultraTok,
			wenChars: acc.wenChars + row.wenChars,
			wenTok: acc.wenTok + row.wenTok,
		}),
		{ origChars: 0, origTok: 0, ultraChars: 0, ultraTok: 0, wenChars: 0, wenTok: 0 },
	);

	let resumenOpen = false;
	let prevResumenOpen = false;
	let opens: boolean[] = prompts.map(() => false);
	let prevOpens: boolean[] = [...opens];
	let prevVersiones: Version[] = [...versiones];
	let stateLoaded = false;

	type SubState = { prompt?: number; tab?: Version; openPrompts?: number[]; resumen?: boolean; tabs?: Record<string, Version> };
	type PromptUrlState = Record<string, unknown> & { sub?: SubState };

	const PARAM_CHANGED = "isa-doc:url-state-changed";
	const isVersion = (value: unknown): value is Version => value === "original" || value === "ultra" || value === "wenyan" || value === "comparativa";

	function readStateFromUrl(): PromptUrlState {
		try {
			const raw = new URLSearchParams(window.location.search).get("state");
			if (!raw) return {};
			const value: unknown = JSON.parse(atob(raw));
			return value && typeof value === "object" ? value as PromptUrlState : {};
		} catch {
			return {};
		}
	}

	function normalizePromptIndexes(value: unknown): number[] {
		if (!Array.isArray(value)) return [];
		return [...new Set(value.filter((idx): idx is number => Number.isInteger(idx) && idx >= 0 && idx < prompts.length))];
	}

	function currentOpenPrompts(): number[] {
		return opens.reduce<number[]>((acc, open, idx) => {
			if (open) acc.push(idx);
			return acc;
		}, []);
	}

	function currentOpenTabs(openPrompts: number[]): Record<string, Version> {
		return openPrompts.reduce<Record<string, Version>>((acc, idx) => {
			acc[String(idx)] = versiones[idx];
			return acc;
		}, {});
	}

	function selectedPrompt(changedPrompt?: number): number | undefined {
		if (changedPrompt === -1 && resumenOpen) return -1;
		if (typeof changedPrompt === "number" && changedPrompt >= 0 && opens[changedPrompt]) return changedPrompt;
		const openPrompts = currentOpenPrompts();
		if (openPrompts.length) return openPrompts[openPrompts.length - 1];
		return resumenOpen ? -1 : undefined;
	}

	function buildSubState(changedPrompt?: number): SubState {
		const openPrompts = currentOpenPrompts();
		const tabs = currentOpenTabs(openPrompts);
		const prompt = selectedPrompt(changedPrompt);
		const sub: SubState = {};
		if (openPrompts.length) sub.openPrompts = openPrompts;
		if (resumenOpen) sub.resumen = true;
		if (Object.keys(tabs).length) sub.tabs = tabs;
		if (typeof prompt === "number") {
			sub.prompt = prompt;
			if (prompt >= 0) sub.tab = versiones[prompt];
		}
		return sub;
	}

	function writeSubToUrl(nextSub: SubState): void {
		try {
			const url = new URL(window.location.href);
			const st = readStateFromUrl();
			if (Object.keys(nextSub).length) st.sub = nextSub;
			else delete st.sub;
			if (Object.keys(st).length) url.searchParams.set("state", btoa(JSON.stringify(st)));
			else url.searchParams.delete("state");
			window.history.replaceState({}, "", url.toString());
			window.dispatchEvent(new CustomEvent(PARAM_CHANGED, { detail: { name: "state", value: url.searchParams.get("state") } }));
		} catch {
		}
	}

	function writeCurrentSubToUrl(changedPrompt?: number): void {
		writeSubToUrl(buildSubState(changedPrompt));
	}

	const promptElId = (i: number) => `patyia-prompt-${i}`;

	function firstOpenAccordionId(): string | null {
		if (resumenOpen) return "patyia-prompt-resumen";
		const idx = opens.findIndex(Boolean);
		return idx >= 0 ? promptElId(idx) : null;
	}

	function getScrollContainer(target: HTMLElement): HTMLElement {
		const docsPanel = target.closest(".docs-panel, .docs-content");
		if (docsPanel instanceof HTMLElement) return docsPanel;
		let parent = target.parentElement;
		while (parent) {
			const { overflowY } = getComputedStyle(parent);
			if ((overflowY === "auto" || overflowY === "scroll") && parent.scrollHeight > parent.clientHeight) return parent;
			parent = parent.parentElement;
		}
		return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
	}

	function scrollToAccordionInContainer(targetId: string): void {
		const target = document.getElementById(targetId);
		if (!target) return;
		const container = getScrollContainer(target);
		const targetRect = target.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();
		container.scrollTo({ top: container.scrollTop + targetRect.top - containerRect.top, behavior: "smooth" });
	}

	onMount(async () => {
		const sub = readStateFromUrl().sub ?? {};
		const idx = typeof sub.prompt === "number" ? sub.prompt : null;
		const openPrompts = normalizePromptIndexes(sub.openPrompts);
		if (typeof idx === "number" && idx >= 0 && idx < prompts.length && !openPrompts.includes(idx)) openPrompts.push(idx);
		for (const [key, value] of Object.entries(sub.tabs ?? {})) {
			const promptIdx = Number(key);
			if (Number.isInteger(promptIdx) && promptIdx >= 0 && promptIdx < prompts.length && isVersion(value)) versiones[promptIdx] = value;
		}
		if (isVersion(sub.tab) && typeof idx === "number" && idx >= 0 && idx < prompts.length) {
			versiones[idx] = sub.tab;
			versiones = versiones;
		}
		if (sub.resumen === true || idx === -1) {
			resumenOpen = true;
		}
		for (const openIdx of openPrompts) opens[openIdx] = true;
		if (openPrompts.length) {
			opens = opens;
		} else if (typeof idx === "number" && idx >= 0 && idx < prompts.length) {
			opens[idx] = true;
			opens = opens;
		}
		prevResumenOpen = resumenOpen;
		prevOpens = [...opens];
		prevVersiones = [...versiones];
		stateLoaded = true;
		const targetId = firstOpenAccordionId();
		if (!targetId) return;
		await tick();
		setTimeout(() => scrollToAccordionInContainer(targetId), 80);
	});

	$: if (stateLoaded) {
		let changedPrompt: number | undefined;
		let changed = false;
		for (let i = 0; i < opens.length; i++) {
			if (opens[i] !== prevOpens[i]) {
				changedPrompt = i;
				changed = true;
			}
		}
		if (changed) writeCurrentSubToUrl(changedPrompt);
		prevOpens = [...opens];
	}

	$: if (stateLoaded && resumenOpen !== prevResumenOpen) {
		writeCurrentSubToUrl(resumenOpen ? -1 : undefined);
		prevResumenOpen = resumenOpen;
	}

	$: if (stateLoaded) {
		let changedPrompt: number | undefined;
		for (let i = 0; i < versiones.length; i++) {
			if (versiones[i] !== prevVersiones[i] && opens[i]) {
				changedPrompt = i;
			}
		}
		if (typeof changedPrompt === "number") writeCurrentSubToUrl(changedPrompt);
		prevVersiones = [...versiones];
	}

</script>

<div class="patyia-prompts">
	<FlexLayout direction="column">
		<Accordion title="Resumen comparativo" titleIcon="mdi:chart-bar" bind:open={resumenOpen} id="patyia-prompt-resumen">
			<div class="cmp-wrap">
				<p class="cmp-note">
					Conteo exacto con <code>gpt-tokenizer</code> · modelo <code>gpt-5</code>
					(familia GPT-5, encoding <code>o200k_base</code>). Porcentajes calculados sobre <strong>Original</strong>.
				</p>
				<div class="cmp-table-scroll">
					<table class="cmp-table">
						<thead>
							<tr>
								<th rowspan="2" class="sticky-col">Prompt</th>
								<th colspan="3">Original</th>
								<th colspan="3">Ultra</th>
								<th colspan="3">Wenyan ultra</th>
							</tr>
							<tr>
								<th>chars</th><th>tok</th><th>%</th>
								<th>chars</th><th>tok</th><th>%</th>
								<th>chars</th><th>tok</th><th>%</th>
							</tr>
						</thead>
						<tbody>
							{#each resumenEntries as entry}
								{@const r = entry.row}
								<tr>
									<td class="sticky-col">{entry.prompt.title}</td>
									<td class="num">{fmt(r.origChars)}</td>
									<td class="num">{fmt(r.origTok)}</td>
									<td class="num pct">100%</td>
									<td class="num">{fmt(r.ultraChars)}</td>
									<td class="num">{fmt(r.ultraTok)}</td>
									<td class="num pct">{pct(r.ultraTok, r.origTok)}</td>
									<td class="num">{fmt(r.wenChars)}</td>
									<td class="num">{fmt(r.wenTok)}</td>
									<td class="num pct">{pct(r.wenTok, r.origTok)}</td>
								</tr>
							{/each}
							<tr class="total-row">
								<td class="sticky-col"><strong>TOTAL</strong></td>
								<td class="num"><strong>{fmt(resumenTotals.origChars)}</strong></td>
								<td class="num"><strong>{fmt(resumenTotals.origTok)}</strong></td>
								<td class="num pct"><strong>100%</strong></td>
								<td class="num"><strong>{fmt(resumenTotals.ultraChars)}</strong></td>
								<td class="num"><strong>{fmt(resumenTotals.ultraTok)}</strong></td>
								<td class="num pct"><strong>{pct(resumenTotals.ultraTok, resumenTotals.origTok)}</strong></td>
								<td class="num"><strong>{fmt(resumenTotals.wenChars)}</strong></td>
								<td class="num"><strong>{fmt(resumenTotals.wenTok)}</strong></td>
								<td class="num pct"><strong>{pct(resumenTotals.wenTok, resumenTotals.origTok)}</strong></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</Accordion>
		{#each prompts as p, i}
			<PatyIAPromptAccordion prompt={p} row={rows[i]} bind:open={opens[i]} bind:version={versiones[i]} accordionId={promptElId(i)} />
		{/each}
	</FlexLayout>
</div>

<style>
	.patyia-prompts {
		display: flex;
		flex-direction: column;
	}
	.cmp-wrap {
		padding: 0.75rem 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.cmp-note {
		font-size: 0.85rem;
		opacity: 0.8;
		margin: 0;
	}
	.cmp-table-scroll {
		overflow-x: auto;
		border: 1px solid var(--is-b-color, rgba(127, 127, 127, 0.25));
		border-radius: 6px;
		background: var(--is-bg-secondary, transparent);
	}
	.cmp-table {
		border-collapse: collapse;
		width: 100%;
		font-size: 0.85rem;
		color: var(--is-color, inherit);
	}
	.cmp-table th,
	.cmp-table td {
		padding: 0.4rem 0.6rem;
		border-bottom: 1px solid var(--is-b-color, rgba(127, 127, 127, 0.18));
		text-align: left;
		white-space: nowrap;
	}
	.cmp-table thead th {
		background: color-mix(in srgb, var(--is-primary, #2a7) 14%, transparent);
		font-weight: 600;
		text-align: center;
	}
	.cmp-table tbody tr:nth-child(odd) td {
		background: color-mix(in srgb, var(--is-color, #fff) 4%, transparent);
	}
	.cmp-table .num {
		text-align: right;
		font-variant-numeric: tabular-nums;
	}
	.cmp-table .pct {
		color: var(--is-primary, #2a7);
		font-weight: 600;
	}
</style>
