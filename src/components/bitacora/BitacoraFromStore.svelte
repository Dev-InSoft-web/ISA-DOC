<script lang="ts">
	import { onMount } from "svelte";
	import { Text } from "@ingenieria_insoft/ispsveltecomponents";
	import BitacoraNode from "./BitacoraNode.svelte";
	import {
		bitacoraStoreEnabled,
		fetchBitacoraBundle,
		type BitacoraBundle,
	} from "../../lib/core/lab-api/bitacora.ts";
	import { labApiEnabled, labMssqlExec } from "../../lib/core/lab-api/mssql.ts";

	export let project: "patyia" | "clientesis" = "patyia";
	export let mssqlTarget: "paty" | "clientesis" = "paty";

	let bundle: BitacoraBundle | null = null;
	let error = "";
	let loading = true;

	async function executeSql(
		sql: string,
		dbTarget?: "paty" | "clientesis",
	): Promise<{ ok: boolean; output?: string; error?: string }> {
		const target = dbTarget ?? mssqlTarget;
		if (labApiEnabled()) return labMssqlExec(target, sql);
		const execPath = project === "patyia" ? "/api/patyia/db/exec" : "/api/db/exec";
		try {
			const r = await fetch(execPath, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ sql }),
			});
			const data = (await r.json()) as { ok: boolean; output?: string; error?: string };
			if (!r.ok) return { ok: false, error: data.error ?? `HTTP ${r.status}` };
			return data;
		} catch (err) {
			return { ok: false, error: err instanceof Error ? err.message : String(err) };
		}
	}

	onMount(async () => {
		if (!bitacoraStoreEnabled()) {
			error = "PUBLIC_LAB_LANGGRAPH_URL no configurada";
			loading = false;
			return;
		}
		try {
			bundle = await fetchBitacoraBundle(project);
		} catch (err) {
			error = err instanceof Error ? err.message : String(err);
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<Text color="neutral"><small>Cargando bitácora desde lab-langgraph…</small></Text>
{:else if error}
	<Text color="danger">
		<small>
			Bitácora no disponible: {error}.
			{#if error.includes("Sin layout")}
				Ejecutar en lab: <code>npm run bitacora:migrate-{project}</code>
			{/if}
		</small>
	</Text>
{:else if bundle}
	{#each bundle.layout.nodes as node (node)}
		<BitacoraNode {node} {bundle} executeSql={executeSql} inner={false} />
	{/each}
{/if}
