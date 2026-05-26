<script lang="ts">
	import {
		Card, ButtonIconify, H4, Text, FlexLayout,
		toastError, toastSuccess,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import { onDestroy } from "svelte";
	import SqlViewer from "../../../../src/components/viewers/SqlViewer.svelte";
	import CodeModal from "../../../../src/components/viewers/CodeModal.svelte";
	import RunButton from "./RunButton.svelte";
	import RevisadoCheck from "./RevisadoCheck.svelte";
	import ConfirmDialog from "../overlays/ConfirmDialog.svelte";

	export let title: string;
	export let sql: string;
	export let desc: string = "";
	export let height: string = "240px";
	export let checkKey: string = "";
	export let confirmKind: "warning" | "danger" | "info" = "warning";
	export let confirmMessage: string = "";
	export let executeSql:
		| ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string; rowsAffected?: number; recordsets?: number }>)
		| null = null;

	let approved: boolean = false;
	let executing: boolean = false;
	let modalShow: boolean = false;
	let confirmOpen: boolean = false;
	let elapsedMs: number = 0;
	let progressMsg: string = "";
	let tickHandle: ReturnType<typeof setInterval> | null = null;

	const PROGRESS_STEPS: Array<{ at: number; msg: string }> = [
		{ at: 0,      msg: "Enviando SQL al servidor…" },
		{ at: 1500,   msg: "Conectando con SQL Server…" },
		{ at: 4000,   msg: "Compilando y ejecutando consulta…" },
		{ at: 10000,  msg: "Ejecutando (puede tardar con muchas filas)…" },
		{ at: 25000,  msg: "Aún en ejecución, procesando datos…" },
		{ at: 60000,  msg: "Operación pesada en curso, no cierres la pestaña…" },
		{ at: 120000, msg: "Sigue trabajando, tardando más de lo habitual…" },
	];

	function fmtElapsed(ms: number): string {
		const s = Math.floor(ms / 1000);
		const m = Math.floor(s / 60);
		const r = s % 60;
		return m > 0 ? `${m}m ${r.toString().padStart(2, "0")}s` : `${r}s`;
	}

	function startTicker(): void {
		const t0 = Date.now();
		elapsedMs = 0;
		progressMsg = PROGRESS_STEPS[0].msg;
		tickHandle = setInterval(() => {
			elapsedMs = Date.now() - t0;
			let cur = PROGRESS_STEPS[0].msg;
			for (const step of PROGRESS_STEPS) if (elapsedMs >= step.at) cur = step.msg;
			progressMsg = cur;
		}, 250);
	}

	function stopTicker(): void {
		if (tickHandle) { clearInterval(tickHandle); tickHandle = null; }
	}

	onDestroy(() => stopTicker());

	function copySql(): void {
		navigator.clipboard?.writeText(sql);
		toastSuccess("SQL copiado");
	}

	function openInModal(): void {
		modalShow = true;
	}

	function onRun(): void {
		if (!approved) { toastError("Desbloquea con el candado antes de ejecutar"); return; }
		if (!executeSql) { toastError("Ejecutor SQL no disponible"); return; }
		confirmOpen = true;
	}

	async function doRun(): Promise<void> {
		if (!executeSql) return;
		executing = true;
		startTicker();
		try {
			const res = await executeSql(sql);
			if (res.ok) {
				const r = typeof res.rowsAffected === "number" ? res.rowsAffected : null;
				const detail = r !== null ? ` · ${r} fila${r === 1 ? "" : "s"} afectada${r === 1 ? "" : "s"}` : (res.output ? ` · ${res.output}` : "");
				toastSuccess(`${title}${detail} (${fmtElapsed(elapsedMs)})`);
			} else toastError(`Falló: ${res.error ?? res.output ?? "desconocido"}`);
		} catch (err) {
			toastError(`Error: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			stopTicker();
			executing = false;
		}
	}
</script>

<Card variant="flat">
	<FlexLayout direction="column">
		<FlexLayout items="center" justify="between">
			<H4>{title}</H4>
			<FlexLayout items="center">
				{#if checkKey}
					<RevisadoCheck key={checkKey} />
				{/if}
				<ButtonIconify icon="mdi:content-copy" title="Copiar SQL" on:click={copySql} />
				<ButtonIconify icon="mdi:eye-outline" title="Abrir SQL" on:click={openInModal} />
				<RunButton
					bind:unlocked={approved}
					busy={executing}
					runTitle="Ejecutar"
					on:run={onRun}
				/>
			</FlexLayout>
		</FlexLayout>
		{#if desc}
			<Text color="neutral"><small>{desc}</small></Text>
		{/if}
		{#if executing}
			<div class="exec-progress">
				<span class="dot" />
				<span class="msg">{progressMsg}</span>
				<span class="elapsed">{fmtElapsed(elapsedMs)}</span>
			</div>
		{/if}
		<SqlViewer value={sql} {height} />
	</FlexLayout>
</Card>

<CodeModal bind:bshow={modalShow} {title} value={sql} language="sql" />
<ConfirmDialog
	bind:open={confirmOpen}
	title="Confirmar ejecución"
	message={confirmMessage || `Vas a ejecutar:\n\n${title}\n\n¿Continuar?`}
	confirmText="Ejecutar"
	cancelText="Cancelar"
	kind={confirmKind}
	confirmVariant="solid"
	confirmColorOverride="primary"
	cancelVariant="outlined"
	cancelColorOverride="neutral"
	onConfirm={doRun}
/>

<style>
	.exec-progress {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.6rem;
		border: 1px dashed color-mix(in srgb, var(--is-info), transparent 50%);
		border-radius: 0.4rem;
		background-color: color-mix(in srgb, var(--is-info), transparent 92%);
		font-size: 0.85em;
	}
	.exec-progress .dot {
		width: 0.55em;
		height: 0.55em;
		border-radius: 50%;
		background: var(--is-info);
		animation: pulse 1s ease-in-out infinite;
		flex: 0 0 auto;
	}
	.exec-progress .msg { flex: 1 1 auto; }
	.exec-progress .elapsed {
		font-variant-numeric: tabular-nums;
		opacity: 0.75;
		flex: 0 0 auto;
	}
	@keyframes pulse {
		0%, 100% { transform: scale(1); opacity: 1; }
		50%      { transform: scale(1.6); opacity: 0.4; }
	}
</style>
