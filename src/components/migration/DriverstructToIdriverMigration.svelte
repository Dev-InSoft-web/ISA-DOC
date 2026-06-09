<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import SqlExecCard from "$comps/actions/SqlExecCard.svelte";
	import type { BitacoraBundle } from "../../lib/core/lab-api/bitacora.ts";

	type Props = {
		bundle?: BitacoraBundle;
		executeSql?: ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string }>) | null;
	};

	let { bundle = undefined, executeSql = null }: Props = $props();

	const seg = $derived(bundle?.sql["sql.driverstruct.idriver"]);
</script>

<Toaster />

<hr class="subtle-sep" />

{#if seg}
	<SqlExecCard
		title={seg.title}
		sql={seg.sql}
		desc={seg.desc ?? ""}
		confirmKind={seg.confirmKind ?? "warning"}
		checkKey="2026-05-04.driverstruct.update"
		confirmMessage={seg.confirmMessage ?? ""}
		{executeSql}
		height={seg.height ?? "320px"}
	/>
{/if}

<style>
	.subtle-sep {
		border: 0;
		border-top: 1px dashed var(--is-b-color, #8885);
		margin: 0.75rem 0 0.25rem;
		opacity: 0.6;
	}
</style>
