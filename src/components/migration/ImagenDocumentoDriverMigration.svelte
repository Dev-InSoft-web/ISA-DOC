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
		? "Capacitación · IMAGENDRIVER / DOCUMENTODRIVER → atributos plan"
		: (date ? `${date} — IMAGENDRIVER / DOCUMENTODRIVER → atributos plan` : "Capacitación · IMAGENDRIVER / DOCUMENTODRIVER → atributos plan")}
	icon="mdi:image-text"
	count={5}
	{inner}
	open={false}
>
	<RevisadoCheck
		slot="title-extra"
		keys={[
			"2026-05-05.imgdoc.fase1a",
			"2026-05-05.imgdoc.fase1b",
			"2026-05-05.imgdoc.fase2a",
			"2026-05-05.imgdoc.fase2b",
			"2026-05-05.imgdoc.fase2c",
		]}
	/>
	{#if md("md.topics.imgdoc.intro")}<BitacoraNote flat mdSource={md("md.topics.imgdoc.intro")} />{/if}
	{#if md("md.topics.imgdoc.fase1a")}<BitacoraNote flat mdSource={md("md.topics.imgdoc.fase1a")} />{/if}
	{#if sql("sql.imgdoc.seed-imagen")}
		{@const seg = sql("sql.imgdoc.seed-imagen")}
		<SqlExecCard title={seg.title} sql={seg.sql} desc={seg.desc ?? ""} confirmKind={seg.confirmKind} confirmMessage={seg.confirmMessage ?? ""} checkKey={seg.checkKey} {executeSql} height={seg.height} />
	{/if}
	{#if md("md.topics.imgdoc.fase1b")}<BitacoraNote flat mdSource={md("md.topics.imgdoc.fase1b")} />{/if}
	{#if sql("sql.imgdoc.seed-documento")}
		{@const seg = sql("sql.imgdoc.seed-documento")}
		<SqlExecCard title={seg.title} sql={seg.sql} desc={seg.desc ?? ""} confirmKind={seg.confirmKind} confirmMessage={seg.confirmMessage ?? ""} checkKey={seg.checkKey} {executeSql} height={seg.height} />
	{/if}
	{#if md("md.topics.imgdoc.fase2a")}<BitacoraNote flat mdSource={md("md.topics.imgdoc.fase2a")} />{/if}
	{#if sql("sql.imgdoc.rollback")}
		{@const seg = sql("sql.imgdoc.rollback")}
		<SqlExecCard title={seg.title} sql={seg.sql} desc={seg.desc ?? ""} confirmKind={seg.confirmKind} confirmMessage={seg.confirmMessage ?? ""} checkKey={seg.checkKey} {executeSql} height={seg.height} />
	{/if}
	{#if md("md.topics.imgdoc.fase2b")}<BitacoraNote flat mdSource={md("md.topics.imgdoc.fase2b")} />{/if}
	{#if sql("sql.imgdoc.migrar-imagen")}
		{@const seg = sql("sql.imgdoc.migrar-imagen")}
		<SqlExecCard title={seg.title} sql={seg.sql} desc={seg.desc ?? ""} confirmKind={seg.confirmKind} confirmMessage={seg.confirmMessage ?? ""} checkKey={seg.checkKey} {executeSql} height={seg.height} />
	{/if}
	{#if md("md.topics.imgdoc.fase2c")}<BitacoraNote flat mdSource={md("md.topics.imgdoc.fase2c")} />{/if}
	{#if sql("sql.imgdoc.migrar-documento")}
		{@const seg = sql("sql.imgdoc.migrar-documento")}
		<SqlExecCard title={seg.title} sql={seg.sql} desc={seg.desc ?? ""} confirmKind={seg.confirmKind} confirmMessage={seg.confirmMessage ?? ""} checkKey={seg.checkKey} {executeSql} height={seg.height} />
	{/if}
</AccordionActions>
