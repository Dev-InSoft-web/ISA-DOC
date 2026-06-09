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

	const mdIntro = $derived(bundle.md["md.topics.cleanup.intro"]?.markdown ?? "");
	const mdOutro = $derived(bundle.md["md.topics.cleanup.outro"]?.markdown ?? "");
	const sqlDrop = $derived(bundle.sql["sql.cleanup.drop-tablas"]);
	const sqlDrivers = $derived(bundle.sql["sql.cleanup.drivers"]);
	const sqlAtributos = $derived(bundle.sql["sql.cleanup.atributos-planes"]);
</script>

<Toaster />

<AccordionActions
	title={inner
		? "Limpieza · Drivers de prueba (conservar 1, 2, 3)"
		: (date ? `${date} — Limpieza · Drivers de prueba (conservar 1, 2, 3)` : "Limpieza · Drivers de prueba")}
	icon="mdi:broom"
	{inner}
	open={false}
>
	<RevisadoCheck slot="title-extra" keys={["2026-05-04.cleanup.run", "2026-05-04.cleanup.atributos_planes", "2026-05-04.cleanup.drop_obsoletas"]} />
	{#if mdIntro}<BitacoraNote flat mdSource={mdIntro} />{/if}

	{#if sqlDrop}
		<SqlExecCard
			title="Eliminar tablas obsoletas (CAPAC_TEMAS, CAPAC_PERMISOS)"
			checkKey="2026-05-04.cleanup.drop_obsoletas"
			sql={sqlDrop.sql}
			desc={sqlDrop.desc ?? ""}
			confirmKind={sqlDrop.confirmKind ?? "danger"}
			confirmMessage={sqlDrop.confirmMessage ?? ""}
			{executeSql}
			height={sqlDrop.height ?? "200px"}
		/>
	{/if}

	{#if sqlDrivers}
		<SqlExecCard
			title={sqlDrivers.title}
			checkKey={sqlDrivers.checkKey}
			sql={sqlDrivers.sql}
			desc={sqlDrivers.desc ?? ""}
			confirmKind={sqlDrivers.confirmKind ?? "danger"}
			confirmMessage={sqlDrivers.confirmMessage ?? ""}
			{executeSql}
			height={sqlDrivers.height}
		/>
	{/if}

	{#if sqlAtributos}
		<SqlExecCard
			title={sqlAtributos.title}
			checkKey={sqlAtributos.checkKey}
			sql={sqlAtributos.sql}
			desc={sqlAtributos.desc ?? ""}
			confirmKind={sqlAtributos.confirmKind ?? "danger"}
			confirmMessage={sqlAtributos.confirmMessage ?? ""}
			{executeSql}
			height={sqlAtributos.height}
		/>
	{/if}

	{#if mdOutro}<BitacoraNote flat mdSource={mdOutro} />{/if}
</AccordionActions>
