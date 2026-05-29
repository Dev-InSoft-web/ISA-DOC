<script lang="ts">
	import { onMount, tick } from "svelte";
	import { FlexLayout, TabItem, Tabs } from "@ingenieria_insoft/ispsveltecomponents";
	import { encode } from "gpt-tokenizer/model/gpt-5";
	import Accordion from "$comps/containers/Accordion.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import md01 from "../../lib/patyia/prompts/01-saludo-otro.md?raw";
	import md02 from "../../lib/patyia/prompts/02-fuera-de-alcance-tecnico.md?raw";
	import md03 from "../../lib/patyia/prompts/03-solicitud-no-permitida.md?raw";
	import md04 from "../../lib/patyia/prompts/04-requiere-contexto.md?raw";
	import md05 from "../../lib/patyia/prompts/05-paso-a-paso.md?raw";
	import md06 from "../../lib/patyia/prompts/06-interpretacion-resultado.md?raw";
	import md07 from "../../lib/patyia/prompts/07-consulta-normativa-negocio.md?raw";
	import md08 from "../../lib/patyia/prompts/08-asesoria-personalizada.md?raw";
	import md09 from "../../lib/patyia/prompts/09-error-tecnico.md?raw";
	import md10 from "../../lib/patyia/prompts/10-error-configuracion.md?raw";
	import md11 from "../../lib/patyia/prompts/11-error-acceso.md?raw";
	import md12 from "../../lib/patyia/prompts/12-error-dian.md?raw";
	import md13 from "../../lib/patyia/prompts/13-comercial.md?raw";
	import md90 from "../../lib/patyia/prompts/90-general.md?raw";
	import md01u from "../../lib/patyia/prompts-ultra/01-saludo-otro.md?raw";
	import md02u from "../../lib/patyia/prompts-ultra/02-fuera-de-alcance-tecnico.md?raw";
	import md03u from "../../lib/patyia/prompts-ultra/03-solicitud-no-permitida.md?raw";
	import md04u from "../../lib/patyia/prompts-ultra/04-requiere-contexto.md?raw";
	import md05u from "../../lib/patyia/prompts-ultra/05-paso-a-paso.md?raw";
	import md06u from "../../lib/patyia/prompts-ultra/06-interpretacion-resultado.md?raw";
	import md07u from "../../lib/patyia/prompts-ultra/07-consulta-normativa-negocio.md?raw";
	import md08u from "../../lib/patyia/prompts-ultra/08-asesoria-personalizada.md?raw";
	import md09u from "../../lib/patyia/prompts-ultra/09-error-tecnico.md?raw";
	import md10u from "../../lib/patyia/prompts-ultra/10-error-configuracion.md?raw";
	import md11u from "../../lib/patyia/prompts-ultra/11-error-acceso.md?raw";
	import md12u from "../../lib/patyia/prompts-ultra/12-error-dian.md?raw";
	import md13u from "../../lib/patyia/prompts-ultra/13-comercial.md?raw";
	import md90u from "../../lib/patyia/prompts-ultra/90-general.md?raw";
	import md01w from "../../lib/patyia/prompts-wenyan-ultra/01-saludo-otro.md?raw";
	import md02w from "../../lib/patyia/prompts-wenyan-ultra/02-fuera-de-alcance-tecnico.md?raw";
	import md03w from "../../lib/patyia/prompts-wenyan-ultra/03-solicitud-no-permitida.md?raw";
	import md04w from "../../lib/patyia/prompts-wenyan-ultra/04-requiere-contexto.md?raw";
	import md05w from "../../lib/patyia/prompts-wenyan-ultra/05-paso-a-paso.md?raw";
	import md06w from "../../lib/patyia/prompts-wenyan-ultra/06-interpretacion-resultado.md?raw";
	import md07w from "../../lib/patyia/prompts-wenyan-ultra/07-consulta-normativa-negocio.md?raw";
	import md08w from "../../lib/patyia/prompts-wenyan-ultra/08-asesoria-personalizada.md?raw";
	import md09w from "../../lib/patyia/prompts-wenyan-ultra/09-error-tecnico.md?raw";
	import md10w from "../../lib/patyia/prompts-wenyan-ultra/10-error-configuracion.md?raw";
	import md11w from "../../lib/patyia/prompts-wenyan-ultra/11-error-acceso.md?raw";
	import md12w from "../../lib/patyia/prompts-wenyan-ultra/12-error-dian.md?raw";
	import md13w from "../../lib/patyia/prompts-wenyan-ultra/13-comercial.md?raw";
	import md90w from "../../lib/patyia/prompts-wenyan-ultra/90-general.md?raw";

	type Version = "original" | "ultra" | "wenyan" | "comparativa";

	type Prompt = {
		title: string;
		icon: string;
		md: string;
		mdUltra: string;
		mdWenyan: string;
	};

	const prompts: ReadonlyArray<Prompt> = [
		{ title: "01. SALUDO_OTRO",                 icon: "mdi:hand-wave",                       md: md01, mdUltra: md01u, mdWenyan: md01w },
		{ title: "02. FUERA_DE_ALCANCE_TECNICO",    icon: "mdi:alert-circle-outline",            md: md02, mdUltra: md02u, mdWenyan: md02w },
		{ title: "03. SOLICITUD_NO_PERMITIDA",      icon: "mdi:cancel",                          md: md03, mdUltra: md03u, mdWenyan: md03w },
		{ title: "04. REQUIERE_CONTEXTO",           icon: "mdi:help-circle-outline",             md: md04, mdUltra: md04u, mdWenyan: md04w },
		{ title: "05. PASO_A_PASO",                 icon: "mdi:format-list-numbered",            md: md05, mdUltra: md05u, mdWenyan: md05w },
		{ title: "06. INTERPRETACION_RESULTADO",    icon: "mdi:chart-box-outline",               md: md06, mdUltra: md06u, mdWenyan: md06w },
		{ title: "07. CONSULTA_NORMATIVA_NEGOCIO",  icon: "mdi:gavel",                           md: md07, mdUltra: md07u, mdWenyan: md07w },
		{ title: "08. ASESORIA_PERSONALIZADA",      icon: "mdi:account-tie",                     md: md08, mdUltra: md08u, mdWenyan: md08w },
		{ title: "09. ERROR_TECNICO",               icon: "mdi:bug-outline",                     md: md09, mdUltra: md09u, mdWenyan: md09w },
		{ title: "10. ERROR_CONFIGURACION",         icon: "mdi:cog-outline",                     md: md10, mdUltra: md10u, mdWenyan: md10w },
		{ title: "11. ERROR_ACCESO",                icon: "mdi:lock-alert-outline",              md: md11, mdUltra: md11u, mdWenyan: md11w },
		{ title: "12. ERROR_DIAN",                  icon: "mdi:file-document-alert-outline",     md: md12, mdUltra: md12u, mdWenyan: md12w },
		{ title: "13. COMERCIAL",                   icon: "mdi:cash-multiple",                   md: md13, mdUltra: md13u, mdWenyan: md13w },
		{ title: "90. GENERAL",                     icon: "mdi:shield-account-outline",          md: md90, mdUltra: md90u, mdWenyan: md90w },
	];

	let versiones: Version[] = prompts.map(() => "comparativa");

	// Conteo exacto con el tokenizer de la familia GPT-5 (encoding o200k_base).
	const countTokens = (s: string): number => encode(s).length;

	const sourceFor = (p: Prompt, v: Version): string =>
		v === "ultra" ? p.mdUltra : v === "wenyan" ? p.mdWenyan : p.md;

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

	const totals: Row = rows.reduce<Row>(
		(acc, r) => ({
			origChars: acc.origChars + r.origChars,
			origTok: acc.origTok + r.origTok,
			ultraChars: acc.ultraChars + r.ultraChars,
			ultraTok: acc.ultraTok + r.ultraTok,
			wenChars: acc.wenChars + r.wenChars,
			wenTok: acc.wenTok + r.wenTok,
		}),
		{ origChars: 0, origTok: 0, ultraChars: 0, ultraTok: 0, wenChars: 0, wenTok: 0 },
	);

	let resumenOpen = false;
	let prevResumenOpen = false;

	// --- Estado del acordeón + tab interno en la URL (?state= base64) ---
	// El DocsViewer guarda { slug }; aquí extendemos con sub.prompt = índice
	// y sub.tab = "original|ultra|wenyan|comparativa".
	let opens: boolean[] = prompts.map(() => false);
	let prevOpens: boolean[] = [...opens];
	let prevVersiones: Version[] = [...versiones];

	type SubState = { prompt?: number; tab?: Version };

	function readSubFromUrl(): SubState {
		try {
			const raw = new URLSearchParams(window.location.search).get("state");
			if (!raw) return {};
			const dec = JSON.parse(atob(raw)) as { sub?: SubState };
			return dec?.sub ?? {};
		} catch {
			return {};
		}
	}

	function writeSubToUrl(patch: SubState): void {
		try {
			const url = new URL(window.location.href);
			const raw = url.searchParams.get("state");
			let st: { slug?: string; sub?: SubState } = {};
			if (raw) {
				try { st = JSON.parse(atob(raw)); } catch { st = {}; }
			}
			st.sub = { ...(st.sub ?? {}), ...patch };
			url.searchParams.set("state", btoa(JSON.stringify(st)));
			window.history.replaceState({}, "", url.toString());
		} catch {
			/* ignore */
		}
	}

	const promptElId = (i: number) => `patyia-prompt-${i}`;

	onMount(async () => {
		const sub = readSubFromUrl();
		const idx = typeof sub.prompt === "number" ? sub.prompt : null;
		if (sub.tab && typeof idx === "number" && idx >= 0 && idx < prompts.length) {
			versiones[idx] = sub.tab;
			versiones = versiones;
		}
		let targetId: string | null = null;
		if (idx === -1) {
			resumenOpen = true;
			prevResumenOpen = true;
			targetId = "patyia-prompt-resumen";
		} else if (typeof idx === "number" && idx >= 0 && idx < prompts.length) {
			opens[idx] = true;
			opens = opens;
			prevOpens = [...opens];
			targetId = promptElId(idx);
		}
		prevVersiones = [...versiones];
		if (!targetId) return;
		await tick();
		setTimeout(() => {
			document.getElementById(targetId!)?.scrollIntoView({ behavior: "smooth", block: "start" });
		}, 80);
	});

	$: {
		for (let i = 0; i < opens.length; i++) {
			if (opens[i] && !prevOpens[i]) writeSubToUrl({ prompt: i, tab: versiones[i] });
		}
		prevOpens = [...opens];
	}

	$: if (resumenOpen && !prevResumenOpen) {
		writeSubToUrl({ prompt: -1 });
		prevResumenOpen = true;
	} else if (!resumenOpen && prevResumenOpen) {
		prevResumenOpen = false;
	}

	$: {
		for (let i = 0; i < versiones.length; i++) {
			if (versiones[i] !== prevVersiones[i] && opens[i]) {
				writeSubToUrl({ prompt: i, tab: versiones[i] });
			}
		}
		prevVersiones = [...versiones];
	}

	const onTabClick = (idx: number) => (e: MouseEvent) => {
		const btn = (e.target as HTMLElement | null)?.closest('button[role="tab"]') as HTMLButtonElement | null;
		if (!btn) return;
		const txt = (btn.textContent ?? "").trim().toLowerCase();
		const v: Version | null = txt.startsWith("wenyan")
			? "wenyan"
			: txt.startsWith("comp")
				? "comparativa"
				: txt === "ultra"
					? "ultra"
					: txt === "original"
						? "original"
						: null;
		if (!v) return;
		versiones[idx] = v;
		versiones = versiones;
	};
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
							{#each prompts as p, i}
								{@const r = rows[i]}
								<tr>
									<td class="sticky-col">{p.title}</td>
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
								<td class="num"><strong>{fmt(totals.origChars)}</strong></td>
								<td class="num"><strong>{fmt(totals.origTok)}</strong></td>
								<td class="num pct"><strong>100%</strong></td>
								<td class="num"><strong>{fmt(totals.ultraChars)}</strong></td>
								<td class="num"><strong>{fmt(totals.ultraTok)}</strong></td>
								<td class="num pct"><strong>{pct(totals.ultraTok, totals.origTok)}</strong></td>
								<td class="num"><strong>{fmt(totals.wenChars)}</strong></td>
								<td class="num"><strong>{fmt(totals.wenTok)}</strong></td>
								<td class="num pct"><strong>{pct(totals.wenTok, totals.origTok)}</strong></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</Accordion>
		{#each prompts as p, i}
			<Accordion title={p.title} titleIcon={p.icon} bind:open={opens[i]} id={promptElId(i)}>
					<FlexLayout direction="column">
						<div on:click={onTabClick(i)} role="presentation">
							<Tabs>
								<TabItem title="Comparativa" open={versiones[i] === "comparativa"} />
								<TabItem title="Original" open={versiones[i] === "original"} />
								<TabItem title="Ultra" open={versiones[i] === "ultra"} />
								<TabItem title="Wenyan ultra" open={versiones[i] === "wenyan"} />
							</Tabs>
						</div>
						{#if versiones[i] === "comparativa"}
							{@const r = rows[i]}
							<div class="cmp-wrap">
								<p class="cmp-note">
									Conteo exacto con <code>gpt-tokenizer</code> · modelo <code>gpt-5</code>
									(familia GPT-5, encoding <code>o200k_base</code>). Porcentajes calculados sobre <strong>Original</strong>.
								</p>
								<div class="cmp-table-scroll">
									<table class="cmp-table">
										<thead>
											<tr>
												<th>Versión</th>
												<th>chars</th>
												<th>tokens</th>
												<th>% tok</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Original</td>
												<td class="num">{fmt(r.origChars)}</td>
												<td class="num">{fmt(r.origTok)}</td>
												<td class="num pct">100%</td>
											</tr>
											<tr>
												<td>Ultra</td>
												<td class="num">{fmt(r.ultraChars)}</td>
												<td class="num">{fmt(r.ultraTok)}</td>
												<td class="num pct">{pct(r.ultraTok, r.origTok)}</td>
											</tr>
											<tr>
												<td>Wenyan ultra</td>
												<td class="num">{fmt(r.wenChars)}</td>
												<td class="num">{fmt(r.wenTok)}</td>
												<td class="num pct">{pct(r.wenTok, r.origTok)}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						{:else}
							{@const src = sourceFor(p, versiones[i])}
							<div class="meta">
								<span>{fmt(src.length)} chars</span>
								<span>·</span>
								<span>{fmt(countTokens(src))} tokens (gpt-5)</span>
							</div>
							<BitacoraNote flat mdSource={src} />
						{/if}
					</FlexLayout>
				</Accordion>
		{/each}
	</FlexLayout>
</div>

<style>
	.patyia-prompts {
		display: flex;
		flex-direction: column;
	}
	.meta {
		display: flex;
		gap: 0.5rem;
		font-size: 0.8rem;
		opacity: 0.7;
		padding: 0.25rem 0.5rem 0;
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
