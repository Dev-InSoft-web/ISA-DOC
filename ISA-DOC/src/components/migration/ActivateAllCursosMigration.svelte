<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import SqlExecCard from "../_comps/actions/SqlExecCard.svelte";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import sql from "../../lib/migration/sql/activate-all-cursos.sql?raw";

	export let executeSql: ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string }>) | null = null;
	export let inner: boolean = false;
</script>

<Toaster />

<AccordionActions
	title="Cursos · Activar todos los registros (BACTIVO = 1)"
	icon="mdi:check-all"
	{inner}
	open={false}
>
	<RevisadoCheck slot="title-extra" keys={["2026-05-05.cursos.activate_all"]} />

	<SqlExecCard
		title="Forzar BACTIVO = 1 en CAPAC_CURSOS"
		checkKey="2026-05-05.cursos.activate_all"
		{sql}
		desc="Marca como activos todos los cursos en CAPAC_CURSOS. Solo actualiza las filas con BACTIVO ≠ 1 o NULL. Idempotente."
		confirmKind="warning"
		confirmMessage={`Se actualizarán todas las filas de CAPAC_CURSOS donde BACTIVO sea NULL o distinto de 1.\n\n¿Continuar?`}
		{executeSql}
		height="200px"
	/>
</AccordionActions>
