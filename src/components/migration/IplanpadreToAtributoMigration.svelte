<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import AccordionActions from "$comps/ui/containers/AccordionActions.svelte";
	import SqlExecCard from "$comps/actions/SqlExecCard.svelte";
	import RevisadoCheck from "$comps/actions/RevisadoCheck.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import type { BitacoraBundle } from "../../lib/core/lab-api/bitacora.ts";

	type Props = {
		bundle: BitacoraBundle;
		executeSql?: ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string }>) | null;
		date?: string;
		inner?: boolean;
	};

	let { bundle, executeSql = null, date = "", inner = false }: Props = $props();

	function md(id: string): string {
		return bundle.md[id]?.markdown ?? "";
	}
	function sql(id: string) {
		return bundle.sql[id];
	}
</script>

<Toaster />

<AccordionActions
	title={inner
		? "Capacitación · IPLANPADRE → atributo plan"
		: (date ? `${date} — Capacitación · IPLANPADRE → atributo plan` : "Capacitación · IPLANPADRE → atributo plan")}
	icon="mdi:database-sync"
	count={6}
	{inner}
	open={false}
>
	<RevisadoCheck
		slot="title-extra"
		keys={[
			"2026-05-04.iplanpadre.fase1",
			"2026-05-04.iplanpadre.fase2a",
			"2026-05-04.iplanpadre.fase2",
			"2026-05-04.iplanpadre.fase3",
			"2026-05-04.iplanpadre.fase4",
			"2026-05-04.iplanpadre.fase5",
		]}
	/>
	{#if md("md.topics.iplan.intro")}<BitacoraNote flat mdSource={md("md.topics.iplan.intro")} />{/if}
	{#if md("md.topics.iplan.fase1")}<BitacoraNote flat mdSource={md("md.topics.iplan.fase1")} />{/if}
	{#if sql("sql.iplan.seed")}
		{@const seg = sql("sql.iplan.seed")}
		<SqlExecCard title={seg.title} sql={seg.sql} desc={seg.desc ?? ""} confirmKind={seg.confirmKind} confirmMessage={seg.confirmMessage ?? ""} checkKey={seg.checkKey} {executeSql} height={seg.height} />
	{/if}
	{#if md("md.topics.iplan.fase2a")}<BitacoraNote flat mdSource={md("md.topics.iplan.fase2a")} />{/if}
	{#if sql("sql.iplan.rollback-dato2")}
		{@const seg = sql("sql.iplan.rollback-dato2")}
		<SqlExecCard title={seg.title} sql={seg.sql} desc={seg.desc ?? ""} confirmKind={seg.confirmKind} confirmMessage={seg.confirmMessage ?? ""} checkKey={seg.checkKey} {executeSql} height={seg.height} />
	{/if}
	{#if md("md.topics.iplan.fase2")}<BitacoraNote flat mdSource={md("md.topics.iplan.fase2")} />{/if}
	{#if sql("sql.iplan.migrar-dato2")}
		{@const seg = sql("sql.iplan.migrar-dato2")}
		<SqlExecCard title={seg.title} sql={seg.sql} desc={seg.desc ?? ""} confirmKind={seg.confirmKind} confirmMessage={seg.confirmMessage ?? ""} checkKey={seg.checkKey} {executeSql} height={seg.height} />
	{/if}
	{#if md("md.topics.iplan.fase3")}<BitacoraNote flat mdSource={md("md.topics.iplan.fase3")} />{/if}
	{#if sql("sql.iplan.drop-columna")}
		{@const seg = sql("sql.iplan.drop-columna")}
		<SqlExecCard title={seg.title} sql={seg.sql} desc={seg.desc ?? ""} confirmKind={seg.confirmKind} confirmMessage={seg.confirmMessage ?? ""} checkKey={seg.checkKey} {executeSql} height={seg.height} />
	{/if}
	{#if md("md.topics.iplan.fase4")}<BitacoraNote flat mdSource={md("md.topics.iplan.fase4")} />{/if}
	{#if sql("sql.iplan.jconfig-dificultad")}
		{@const seg = sql("sql.iplan.jconfig-dificultad")}
		<SqlExecCard title={seg.title} sql={seg.sql} desc={seg.desc ?? ""} confirmKind={seg.confirmKind} confirmMessage={seg.confirmMessage ?? ""} checkKey={seg.checkKey} {executeSql} height={seg.height} />
	{/if}
	{#if md("md.topics.iplan.fase5")}<BitacoraNote flat mdSource={md("md.topics.iplan.fase5")} />{/if}
	{#if sql("sql.iplan.limpiar-audit")}
		{@const seg = sql("sql.iplan.limpiar-audit")}
		<SqlExecCard title={seg.title} sql={seg.sql} desc={seg.desc ?? ""} confirmKind={seg.confirmKind} confirmMessage={seg.confirmMessage ?? ""} checkKey={seg.checkKey} {executeSql} height={seg.height} />
	{/if}
</AccordionActions>
