<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import SqlExecCard from "../_comps/actions/SqlExecCard.svelte";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import mdIntro from "../../lib/bitacora/audit-cols-drop-intro.md?raw";
	import sqlDropAuditColumns from "../../lib/migration/sql/drop-audit-columns.sql?raw";

	export let executeSql: ((sql: string) => Promise<{ ok: boolean; output?: string; error?: string }>) | null = null;
	export let inner: boolean = false;
</script>

<Toaster />

<AccordionActions
	title="Auditoría · Eliminar columnas CRE/ULT en entidades distintas a Cursos y Planes de Estudio"
	icon="mdi:database-minus-outline"
	{inner}
	open={false}
>
	<RevisadoCheck slot="title-extra" keys={["2026-05-05.audit.drop_columns"]} />
	<BitacoraNote flat mdSource={mdIntro} />

	<SqlExecCard
		title="Eliminar columnas de auditoría sobrantes"
		checkKey="2026-05-05.audit.drop_columns"
		sql={sqlDropAuditColumns}
		desc="Elimina las columnas CRE/ULT en las 7 tablas de Capacitación que no las requieren. Verifica cada columna y constraint antes de borrar. Idempotente."
		confirmKind="danger"
		confirmMessage={`Se eliminarán las 10 columnas de auditoría (IUSUARIOCRE/ULT, IAPPCRE/ULT, IEQUIPOCRE/ULT, IPCRE/ULT, FHCRE/ULT) en:\n\n  • CAPAC_DRIVERS\n  • CAPAC_TEMAS\n  • CAPAC_CURSOS_DE_PLANES_ESTUDIO\n  • CAPAC_SEGURIDADES_CURSOS\n  • CAPAC_PLANES_CURSOS\n  • CAPAC_ATRIBUTOS_PLANES\n  • CAPAC_ESTRUCTURAS_CURSOS\n\n¿Continuar?`}
		{executeSql}
		height="320px"
	/>
</AccordionActions>
