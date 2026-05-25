<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { FlexLayout, Text, Iconify } from "@ingenieria_insoft/ispsveltecomponents";

	type Status = {
		server: boolean;
		db: boolean;
		reason?: string;
		ts?: string;
	};

	export let pollMs: number = 15000;
	export let pingUrl: string = "/api/db/ping";
	export let labelOk: string = "BD conectada";

	let status: Status = { server: false, db: false, reason: "Verificando…" };
	let timer: ReturnType<typeof setInterval> | null = null;

	async function ping(): Promise<void> {
		try {
			const r = await fetch(pingUrl, { cache: "no-store" });
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			const data = (await r.json()) as Status;
			status = data;
		} catch (err) {
			status = {
				server: false,
				db: false,
				reason: err instanceof Error ? err.message : String(err),
			};
		}
	}

	onMount(() => {
		void ping();
		timer = setInterval(() => { void ping(); }, pollMs);
	});

	onDestroy(() => {
		if (timer) clearInterval(timer);
		timer = null;
	});

	$: dotColor = status.db
		? "var(--is-success)"
		: status.server
			? "var(--is-warning)"
			: "var(--is-error)";

	$: label = status.db
		? labelOk
		: status.server
			? "Servidor OK · BD no conectada"
			: "Servidor caído";
</script>

<div class="dbstatus" title={status.reason ?? ""}>
	<FlexLayout items="center">
		<span class="dot" style="background: {dotColor};"></span>
		<Text><strong>{label}</strong></Text>
		{#if status.reason}
			<Text color="neutral"><small>· {status.reason}</small></Text>
		{/if}
		<button type="button" class="refresh" on:click={() => void ping()} title="Reintentar">
			<Iconify icon="mdi:refresh" />
		</button>
	</FlexLayout>
</div>

<style>
	.dbstatus {
		padding: 0.4rem 0.75rem;
		border: 1px solid var(--is-b-color);
		border-radius: 0.5rem;
		background: color-mix(in srgb, var(--is-bg-secondary), white 0.5%);
	}
	.dot {
		display: inline-block;
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 999px;
		box-shadow: 0 0 0 1px var(--is-b-color);
	}
	.refresh {
		background: transparent;
		border: none;
		color: inherit;
		cursor: pointer;
		padding: 0.1rem 0.3rem;
		border-radius: 999px;
	}
	.refresh:hover {
		background: color-mix(in srgb, currentColor, transparent 85%);
	}
</style>
