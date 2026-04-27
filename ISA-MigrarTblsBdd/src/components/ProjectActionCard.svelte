<script lang="ts">
	import { tick } from "svelte";
	import { Card, Button, Text, FlexLayout, Iconify, Modal } from "@ingenieria_insoft/ispsveltecomponents";

	export let action: {
		id: string;
		label: string;
		type: string;
		description?: string;
		needsPassword?: boolean;
		longRunning?: boolean;
		swaggerUrl?: string;
	};
	export let running = false;
	export let host: string | undefined = undefined;
	export let output: string | undefined = undefined;
	export let projectName: string | undefined = undefined;
	export let projectIcon: string | undefined = undefined;
	export let onRun: () => void;
	export let onStop: () => void;
	export let onRestart: () => void;
	export let onOpen: ((url: string) => void) | undefined = undefined;
	/**
	 * Si se proporciona, parseamos el output buscando bloques `Ya existían: N / Descargados: N / Error: N`
	 * y los asignamos en orden a estos nombres de proyecto. Renderiza una tabla resumen en el modal.
	 */
	export let summaryProjects: string[] | undefined = undefined;

	const TYPE_ICONS: Record<string, string> = {
		dev: "mdi:play-circle-outline",
		build: "mdi:hammer",
		start: "mdi:rocket-launch-outline",
		pub: "mdi:cloud-upload-outline",
		sync: "mdi:sync",
		func: "mdi:function-variant",
		custom: "mdi:cog-outline",
	};
	$: typeIcon = TYPE_ICONS[action.type] ?? "mdi:cog-outline";

	// --- ANSI -> HTML (subset suficiente para chalk/npm/azure-funcs) ---
	const FG: Record<number, string> = {
		30: "#000", 31: "#e06c75", 32: "#98c379", 33: "#e5c07b",
		34: "#61afef", 35: "#c678dd", 36: "#56b6c2", 37: "#dcdcdc",
		90: "#7f848e", 91: "#ff7b86", 92: "#b5e890", 93: "#ffe082",
		94: "#82c4ff", 95: "#e89bff", 96: "#7fdbe2", 97: "#ffffff",
	};
	const BG: Record<number, string> = {
		40: "#000", 41: "#e06c75", 42: "#98c379", 43: "#e5c07b",
		44: "#61afef", 45: "#c678dd", 46: "#56b6c2", 47: "#dcdcdc",
	};
	function escapeHtml(s: string): string {
		return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	function ansiToHtml(input: string): string {
		// Normaliza tanto \x1b[ como \u001b[ y los falsos "B[" que llegan al UI por filtros previos.
		const re = /(?:\x1b|\u009b)\[([\d;]*)m|B\[([\d;]*)m/g;
		let html = "";
		let last = 0;
		let openSpans = 0;
		const close = () => { let s = ""; while (openSpans > 0) { s += "</span>"; openSpans--; } return s; };
		let m: RegExpExecArray | null;
		while ((m = re.exec(input)) !== null) {
			html += escapeHtml(input.slice(last, m.index));
			const codes = (m[1] ?? m[2] ?? "0").split(";").map((x) => Number(x || 0));
			for (const c of codes) {
				if (c === 0) { html += close(); continue; }
				let style = "";
				if (c === 1) style = "font-weight:bold";
				else if (c === 2) style = "opacity:0.75";
				else if (c === 3) style = "font-style:italic";
				else if (c === 4) style = "text-decoration:underline";
				else if (FG[c]) style = `color:${FG[c]}`;
				else if (BG[c]) style = `background:${BG[c]}`;
				if (style) { html += `<span style="${style}">`; openSpans++; }
			}
			last = m.index + m[0].length;
		}
		html += escapeHtml(input.slice(last));
		html += close();
		return html;
	}

	let outputEl: HTMLDivElement | null = null;
	let showConsole = false;
	const MAX_BUFFER = 80_000; // ~80KB de cola visible
	// Throttle del parseo ANSI vía rAF: si llegan muchos chunks seguidos (típico al cerrar
	// procesos como func/astro que flushean stdout en ráfagas), recomputamos a lo sumo 1 vez por frame.
	let outputHtml = "";
	let rafId: number | null = null;
	function scheduleOutputUpdate(src: string | undefined): void {
		if (!showConsole || !src) { outputHtml = ""; return; }
		if (rafId !== null) return;
		rafId = requestAnimationFrame(() => {
			rafId = null;
			const tail = (output && output.length > MAX_BUFFER) ? output.slice(-MAX_BUFFER) : (output ?? "");
			outputHtml = tail ? ansiToHtml(tail) : "";
			if (outputEl) outputEl.scrollTop = outputEl.scrollHeight;
		});
	}
	$: scheduleOutputUpdate(output);
	$: if (showConsole) scheduleOutputUpdate(output);
	// Auto-abrir el modal al pasar a 'running'.
	let prevRunning = false;
	$: {
		if (running && !prevRunning) showConsole = true;
		prevRunning = running;
	}
	function closeConsole(): void { showConsole = false; }

	// Parsea bloques (Ya existían, Descargados, Error) emitidos por download-iconify y los asigna en
	// orden a `summaryProjects`. Devuelve filas + total.
	type SummaryRow = { name: string; existed: number; downloaded: number; failed: number };
	function parseSummary(text: string, projects: string[]): { rows: SummaryRow[]; total: SummaryRow } | null {
		if (!text || projects.length === 0) return null;
		// Quitamos secuencias ANSI para parsear texto plano.
		const plain = text.replace(/(?:\x1b|\u009b)\[[\d;]*m|B\[[\d;]*m/g, "");
		const re = /Ya\s+exist[ií]an:\s*(\d+)[\s\S]*?Descargados:\s*(\d+)[\s\S]*?Error:\s*(\d+)/g;
		const rows: SummaryRow[] = [];
		let m: RegExpExecArray | null;
		let i = 0;
		while ((m = re.exec(plain)) !== null && i < projects.length) {
			rows.push({ name: projects[i], existed: +m[1], downloaded: +m[2], failed: +m[3] });
			i++;
		}
		if (rows.length === 0) return null;
		const total: SummaryRow = rows.reduce(
			(acc, r) => ({ name: "Total", existed: acc.existed + r.existed, downloaded: acc.downloaded + r.downloaded, failed: acc.failed + r.failed }),
			{ name: "Total", existed: 0, downloaded: 0, failed: 0 },
		);
		return { rows, total };
	}
	$: summary = (!running && summaryProjects && output) ? parseSummary(output, summaryProjects) : null;
</script>

<Card variant="flat">
	<FlexLayout direction="column" justify="between" items="stretch" style="height: 100%; min-height: 220px;">
		<FlexLayout direction="column">
			{#if projectName}
				<FlexLayout items="center" gap="0.25rem">
					{#if projectIcon}<Iconify icon={projectIcon} style="opacity: 0.7;" />{/if}
					<Text color="primary" lines={1}><small><strong>{projectName}</strong></small></Text>
				</FlexLayout>
			{/if}
			<FlexLayout items="center" gap="0.4rem">
				<Iconify icon={typeIcon} />
				<Text><strong>{action.label}</strong></Text>
				{#if running}
					<span class="status-dot status-dot--running" title="En ejecución"></span>
				{/if}
			</FlexLayout>

			{#if action.description}
				<Text color="neutral" lines={2}><small>{action.description}</small></Text>
			{/if}

			{#if host}
				<a class="host-link" href={host} target="_blank" rel="noopener">
					<Iconify icon="mdi:open-in-new" />
					<small>{host}</small>
				</a>
			{/if}

			{#if action.swaggerUrl}
				<a class="host-link swagger-link" href={action.swaggerUrl} target="_blank" rel="noopener">
					<Iconify icon="mdi:api" />
					<small>Swagger: {action.swaggerUrl}</small>
				</a>
			{/if}
		</FlexLayout>

		<FlexLayout direction="row" items="stretch" gap="0.4rem" style="flex-wrap: wrap;">
			{#if action.longRunning}
				{#if running}
					<div class="grow">
						<Button color="danger" variant="outlined" onClick={onStop}>Stop</Button>
					</div>
					<div class="grow">
						<Button color="warning" onClick={onRestart}>Restart</Button>
					</div>
					{#if host && onOpen}
						<div class="grow">
							<Button color="success" onClick={() => onOpen?.(host!)}>Abrir</Button>
						</div>
					{/if}
				{:else}
					<div class="grow">
						<Button color="primary" onClick={onRun}>Run</Button>
					</div>
				{/if}
			{:else if running}
				<div class="grow">
					<Button color="danger" variant="outlined" onClick={onStop}>Detener</Button>
				</div>
			{:else}
				<div class="grow">
					<Button color={action.needsPassword ? "warning" : "primary"} onClick={onRun}>
						{action.label}
					</Button>
				</div>
			{/if}
			{#if output}
				<Button variant="ghost" onClick={() => (showConsole = true)}>
					<Iconify icon="mdi:console-line" />
					<span>Ver consola</span>
				</Button>
			{/if}
		</FlexLayout>
	</FlexLayout>
</Card>

{#if output}
	<Modal bind:bshow={showConsole} onClose={closeConsole} style="width: 90dvw; height: 80dvh;">
		<svelte:fragment slot="title">
			<FlexLayout items="center" gap="0.4rem">
				<Iconify icon="mdi:console-line" />
				<Text lines={1}>
					<strong>{action.label}</strong>
					{#if projectName}<span style="opacity: 0.7;"> · {projectName}</span>{/if}
				</Text>
				{#if running}
					<span class="status-dot status-dot--running" title="En ejecución"></span>
				{/if}
			</FlexLayout>
		</svelte:fragment>
		{#if summary}
			<table class="summary-table">
				<thead>
					<tr>
						<th>Proyecto</th>
						<th>Ya existían</th>
						<th>Descargados</th>
						<th>Error</th>
					</tr>
				</thead>
				<tbody>
					{#each summary.rows as r}
						<tr>
							<td>{r.name}</td>
							<td class="num">{r.existed}</td>
							<td class="num">{r.downloaded}</td>
							<td class="num err" class:zero={r.failed === 0}>{r.failed}</td>
						</tr>
					{/each}
					<tr class="total-row">
						<td><strong>{summary.total.name}</strong></td>
						<td class="num"><strong>{summary.total.existed}</strong></td>
						<td class="num"><strong>{summary.total.downloaded}</strong></td>
						<td class="num err" class:zero={summary.total.failed === 0}><strong>{summary.total.failed}</strong></td>
					</tr>
				</tbody>
			</table>
		{/if}
		<div class="console-body" bind:this={outputEl}>{@html outputHtml}</div>
	</Modal>
{/if}

<style>
	.host-link {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--color-primary, #2563eb);
		text-decoration: none;
		word-break: break-all;
	}
	.host-link:hover { text-decoration: underline; }
	.swagger-link { color: var(--color-success, #059669); }

	.status-dot {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.status-dot--running {
		background: var(--is-success, #16a34a);
		box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7);
		animation: pulse-dot 1.4s infinite;
	}
	@keyframes pulse-dot {
		0%   { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7); }
		70%  { box-shadow: 0 0 0 8px rgba(22, 163, 74, 0); }
		100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
	}

	.console-body {
		flex: 1 1 auto;
		overflow: auto;
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 0.78rem;
		line-height: 1.4;
		background: #0d1117;
		color: #d4d4d4;
		padding: 0.75rem 1rem;
		white-space: pre-wrap;
		word-break: break-word;
	}
	.grow { flex: 1; }

	.summary-table {
		width: 100%;
		border-collapse: collapse;
		margin: 0 0 0.75rem;
		font-size: 0.85rem;
	}
	.summary-table th,
	.summary-table td {
		padding: 0.4rem 0.6rem;
		border-bottom: 1px solid var(--is-b-color, #80808050);
		text-align: left;
	}
	.summary-table th { font-weight: 600; opacity: 0.85; }
	.summary-table td.num { text-align: right; font-variant-numeric: tabular-nums; }
	.summary-table td.err { color: var(--is-error, #ef4444); }
	.summary-table td.err.zero { color: inherit; opacity: 0.6; }
	.summary-table tr.total-row td { border-top: 1px solid var(--is-b-color, #80808050); background: color-mix(in srgb, var(--is-primary, #2563eb) 8%, transparent); }
</style>
