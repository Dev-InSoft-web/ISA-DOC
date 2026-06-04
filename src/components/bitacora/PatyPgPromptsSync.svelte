<script lang="ts">
	import { onMount } from "svelte";
	import { ButtonIconify, FlexLayout, Text, toastError, toastSuccess } from "@ingenieria_insoft/ispsveltecomponents";

	/** Sincroniza prompts Ultra a PostgreSQL (paty.*) sin modal de confirmación. */
	export let autoOnMount = true;

	let status: "idle" | "running" | "ok" | "error" = "idle";
	let detail = "";

	async function syncPg(): Promise<void> {
		status = "running";
		detail = "Copiando catálogo y actualizando paty.instruccion en Render…";
		try {
			const r = await fetch("/api/patyia/prompts/sync-pg", { method: "POST" });
			const text = await r.text();
			let data: {
				ok?: boolean;
				error?: string;
				copiedUltra?: number;
				agents?: number;
				syncedAt?: string;
			} = {};
			if (text.trim()) {
				try {
					data = JSON.parse(text) as typeof data;
				} catch {
					throw new Error(`Respuesta inválida del servidor (${r.status}): ${text.slice(0, 160)}`);
				}
			} else if (!r.ok) {
				throw new Error(`HTTP ${r.status} sin cuerpo (¿Astro caído o ruta /api/patyia/prompts/sync-pg inexistente?)`);
			}
			if (!r.ok || !data.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
			status = "ok";
			detail = `${data.copiedUltra ?? 13} Ultra + PATY_BASE · ${data.agents ?? 13} agentes · ${data.syncedAt ?? ""}`;
			toastSuccess("PostgreSQL paty.instruccion actualizado");
		} catch (err) {
			status = "error";
			detail = err instanceof Error ? err.message : String(err);
			toastError(`Sync PG: ${detail}`);
		}
	}

	onMount(() => {
		if (autoOnMount) void syncPg();
	});
</script>

<FlexLayout direction="column" style="gap: 0.35rem;">
	<FlexLayout items="center" style="gap: 0.5rem;">
		<Text color="neutral">
			<small>
				<b>PostgreSQL (Render)</b> — sync automático vía ISA-DOC (no lab-langgraph). Sin confirmación.
				El <b>MERGE MSSQL</b> de abajo va solo por SqlExecCard → /api/patyia/db/exec.
			</small>
		</Text>
		<ButtonIconify
			icon="mdi:database-sync-outline"
			title="Re-sincronizar PG"
			disabled={status === "running"}
			on:click={() => syncPg()}
		/>
	</FlexLayout>
	{#if detail}
		<Text color={status === "error" ? "danger" : "neutral"}>
			<small>{detail}</small>
		</Text>
	{/if}
</FlexLayout>
