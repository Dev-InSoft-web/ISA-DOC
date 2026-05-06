<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import SqlExecCard from "../_comps/actions/SqlExecCard.svelte";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import mdIntro from "../../lib/bitacora/topics/audit/intro.md?raw";
	import sqlAddAuditColumns from "../../lib/migration/sql/add-audit-columns.sql?raw";

	export let executeSql: ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string }>) | null = null;
	export let inner: boolean = false;
</script>

<Toaster />

<AccordionActions
	title="Auditoría · Garantizar columnas CRE/ULT en CAPAC_CURSOS y CAPAC_PLANES_ESTUDIO"
	icon="mdi:database-plus-outline"
	{inner}
	open={false}
>
	<RevisadoCheck slot="title-extra" keys={["2026-05-05.audit.add_columns"]} />
	<BitacoraNote flat mdSource={mdIntro} />

	<SqlExecCard
		title="Crear columnas de auditoría faltantes"
		checkKey="2026-05-05.audit.add_columns"
		sql={sqlAddAuditColumns}
		desc="Verifica cada columna en CAPAC_CURSOS y CAPAC_PLANES_ESTUDIO; crea solo las que falten. Idempotente."
		confirmKind="info"
		confirmMessage={`Se verificarán y crearán (si no existen) las columnas de auditoría CRE/ULT en CAPAC_CURSOS y CAPAC_PLANES_ESTUDIO.\n\n¿Continuar?`}
		{executeSql}
		height="320px"
	/>
</AccordionActions>
