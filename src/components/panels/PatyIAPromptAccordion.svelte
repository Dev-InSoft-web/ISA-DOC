<script lang="ts">
	import { FlexLayout, TabItem, Tabs } from "@ingenieria_insoft/ispsveltecomponents";
	import Accordion from "$comps/ui/containers/Accordion.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";

	type Version = "original" | "ultra" | "wenyan" | "comparativa";
	type Prompt = {
		title: string;
		icon: string;
		md: string;
		mdUltra: string;
		mdWenyan: string;
	};
	type Row = {
		origChars: number; origTok: number;
		ultraChars: number; ultraTok: number;
		wenChars: number; wenTok: number;
	};

	export let prompt: Prompt;
	export let row: Row;
	export let open: boolean = false;
	export let version: Version = "comparativa";
	export let accordionId: string;

	const fmt = (n: number) => n.toLocaleString("es-CO");
	const pct = (a: number, base: number) => base === 0 ? "—" : `${Math.round((a / base) * 100)}%`;

	const sourceFor = (p: Prompt, v: Version): string =>
		v === "ultra" ? p.mdUltra : v === "wenyan" ? p.mdWenyan : p.md;

	function charsFor(v: Version): number {
		if (v === "ultra") return row.ultraChars;
		if (v === "wenyan") return row.wenChars;
		return row.origChars;
	}

	function tokensFor(v: Version): number {
		if (v === "ultra") return row.ultraTok;
		if (v === "wenyan") return row.wenTok;
		return row.origTok;
	}

	function onTabClick(e: MouseEvent): void {
		const btn = (e.target as HTMLElement | null)?.closest('button[role="tab"]') as HTMLButtonElement | null;
		if (!btn) return;
		const txt = (btn.textContent ?? "").trim().toLowerCase();
		const next: Version | null = txt.startsWith("wenyan")
			? "wenyan"
			: txt.startsWith("comp")
				? "comparativa"
				: txt === "ultra"
					? "ultra"
					: txt === "original"
						? "original"
						: null;
		if (next) version = next;
	}
</script>

<Accordion title={prompt.title} titleIcon={prompt.icon} bind:open id={accordionId}>
	<FlexLayout direction="column">
		<div on:click={onTabClick} role="presentation">
			<Tabs>
				<TabItem title="Comparativa" open={version === "comparativa"} />
				<TabItem title="Original" open={version === "original"} />
				<TabItem title="Ultra" open={version === "ultra"} />
				<TabItem title="Wenyan ultra" open={version === "wenyan"} />
			</Tabs>
		</div>
		{#if version === "comparativa"}
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
								<td class="num">{fmt(row.origChars)}</td>
								<td class="num">{fmt(row.origTok)}</td>
								<td class="num pct">100%</td>
							</tr>
							<tr>
								<td>Ultra</td>
								<td class="num">{fmt(row.ultraChars)}</td>
								<td class="num">{fmt(row.ultraTok)}</td>
								<td class="num pct">{pct(row.ultraTok, row.origTok)}</td>
							</tr>
							<tr>
								<td>Wenyan ultra</td>
								<td class="num">{fmt(row.wenChars)}</td>
								<td class="num">{fmt(row.wenTok)}</td>
								<td class="num pct">{pct(row.wenTok, row.origTok)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		{:else}
			{@const src = sourceFor(prompt, version)}
			<div class="meta">
				<span>{fmt(charsFor(version))} chars</span>
				<span>·</span>
				<span>{fmt(tokensFor(version))} tokens (gpt-5)</span>
			</div>
			<BitacoraNote flat mdSource={src} />
		{/if}
	</FlexLayout>
</Accordion>

<style>
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