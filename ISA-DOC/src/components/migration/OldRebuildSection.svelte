<script lang="ts">
	import { Button, Iconify, FlexLayout, Text, Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import RebuildOldTableMigration from "./RebuildOldTableMigration.svelte";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import { REBUILD_TABLES } from "../../lib/migration/oldRebuildTables.ts";
	import sectionMd from "../../lib/bitacora/2026-05-04-rebuild-section.md?raw";

	export let executeSql: ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string }>) | null = null;
	export let date: string = "2026-05-04";
	export let inner: boolean = false;

	const STEPS = ["drop", "create", "insert"] as const;
	$: rebuildKeys = REBUILD_TABLES.flatMap((t) => STEPS.map((s) => `2026-05-04.rebuild.${t.tableName}.${s}`));

	let downloading: boolean = false;
	let lastSummary: string = "";

	async function downloadState(): Promise<void> {
		if (downloading) return;
		downloading = true;
		lastSummary = "";
		try {
			const r = await fetch("/api/db/take-snapshot", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ all: true }),
			});
			const j = (await r.json()) as {
				ok: boolean;
				stamp?: string;
				results?: Array<{ table: string; file: string; rowCount: number }>;
				error?: string;
			};
			if (!j.ok) {
				window.alert(`Error descargando estado: ${j.error ?? "desconocido"}`);
				return;
			}
			const total = (j.results ?? []).reduce((a, x) => a + x.rowCount, 0);
			lastSummary = `${j.results?.length ?? 0} tablas · ${total} filas · stamp ${j.stamp ?? ""}`;
			window.alert(`Estado descargado (${lastSummary}).\nLa página se recargará para refrescar las fotografías.`);
			window.location.reload();
		} catch (err) {
			window.alert(`Error descargando estado: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			downloading = false;
		}
	}
</script>

<Toaster />

<AccordionActions
	title={inner
		? "Reconstrucción CAPAC_*_OLD → CAPAC_* (CSV)"
		: `${date} — Reconstrucción CAPAC_*_OLD → CAPAC_* (CSV)`}
	icon="mdi:database-import-outline"
	count={REBUILD_TABLES.length}
	{inner}
	open={false}
>
	<RevisadoCheck slot="title-extra" keys={rebuildKeys} />
	<BitacoraNote flat mdSource={sectionMd} />

	<FlexLayout items="center" justify="between">
		<Text color="neutral">
			<small>Descarga el estado actual de las {REBUILD_TABLES.length} tablas como fotografía CSV.</small>
		</Text>
		<Button
			variant="solid"
			color="success"
			disabled={downloading}
			style="width: fit-content;"
			on:click={downloadState}
		>
			<Iconify slot="icon" icon="mdi:cloud-download-outline" />
			{downloading ? "Descargando…" : "Descargar estado"}
		</Button>
	</FlexLayout>

	{#each REBUILD_TABLES as cfg (cfg.tableName)}
		<RebuildOldTableMigration config={cfg} {executeSql} />
	{/each}
</AccordionActions>
