<script lang="ts">
	import { Button, Iconify, FlexLayout, Text, Toaster, SelectObject } from "@ingenieria_insoft/ispsveltecomponents";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import RebuildOldTableMigration from "./RebuildOldTableMigration.svelte";
	import DriverstructToIdriverMigration from "./DriverstructToIdriverMigration.svelte";
	import MigrateFromOldMigration from "./MigrateFromOldMigration.svelte";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import { REBUILD_TABLES } from "../../lib/migration/oldRebuildTables.ts";
	import sectionMd from "../../lib/bitacora/daily/2026-05-04/rebuild-section.md?raw";

	export let executeSql: ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string }>) | null = null;
	export let date: string = "2026-05-04";
	export let inner: boolean = false;

	const STEPS = ["drop", "create", "insert"] as const;
	$: rebuildKeys = REBUILD_TABLES.flatMap((t) => STEPS.map((s) => `2026-05-04.rebuild.${t.tableName}.${s}`));

	const tsvModules = import.meta.glob("../../lib/migration/tsv/**/*.tsv", {
		query: "?raw",
		import: "default",
		eager: true,
	}) as Record<string, string>;

	const stampsSet: Set<string> = new Set();
	for (const p of Object.keys(tsvModules)) {
		const m = /(\d{8}(?:\d{6})?)-(.+)\.tsv$/.exec(p);
		if (m) stampsSet.add(m[1]);
	}
	const stamps: string[] = Array.from(stampsSet).sort((a, b) => b.localeCompare(a));

	function formatStamp(stamp: string): string {
		if (stamp.length === 14) {
			return `${stamp.slice(0, 4)}-${stamp.slice(4, 6)}-${stamp.slice(6, 8)} ${stamp.slice(8, 10)}:${stamp.slice(10, 12)}:${stamp.slice(12, 14)}`;
		}
		if (stamp.length === 8) {
			return `${stamp.slice(0, 4)}-${stamp.slice(4, 6)}-${stamp.slice(6, 8)}`;
		}
		return stamp;
	}

	const stampOptions: Record<string, { stamp: string; label: string }> = (() => {
		const out: Record<string, { stamp: string; label: string }> = {};
		stamps.forEach((s, i) => {
			const suffix = i === 0 ? " (más reciente)" : "";
			out[s] = { stamp: s, label: `${formatStamp(s)}${suffix}` };
		});
		return out;
	})();

	let selectedStamp: string = stamps[0] ?? "";

	let downloading: boolean = false;

	async function downloadState(): Promise<void> {
		if (downloading) return;
		downloading = true;
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
			window.alert(`Estado descargado (${j.results?.length ?? 0} tablas · ${total} filas · ${formatStamp(j.stamp ?? "")}).\nLa página se recargará para refrescar las fotografías.`);
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
	title="Construcción CAPAC_*"
	icon="mdi:database-import-outline"
	count={REBUILD_TABLES.length}
	{inner}
	open={false}
>
	<RevisadoCheck slot="title-extra" keys={rebuildKeys} />
	<BitacoraNote flat mdSource={sectionMd} />

	<FlexLayout items="center" justify="between">
		<div class="stamp-select">
			{#if stamps.length > 0}
				<SelectObject
					label="Fotografía"
					Options={stampOptions}
					fnCaption={(o) => o.label}
					bind:value={selectedStamp}
					required={false}
				/>
			{:else}
				<Text color="warning">
					<small>No hay fotografías guardadas. Pulsa <strong>Descargar estado</strong> para crear la primera.</small>
				</Text>
			{/if}
		</div>
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
		<RebuildOldTableMigration config={cfg} {executeSql} stamp={selectedStamp}>
			{#if cfg.oldTableName}
				<MigrateFromOldMigration config={cfg} {executeSql} />
			{/if}
			{#if cfg.tableName === "CAPAC_CURSOS"}
				<DriverstructToIdriverMigration {executeSql} />
			{/if}
		</RebuildOldTableMigration>
	{/each}
</AccordionActions>

<style>
	.stamp-select {
		min-width: 280px;
	}
</style>
