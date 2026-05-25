<script lang="ts">
	import ProjectSectionLayout from "./ProjectSectionLayout.svelte";
	import Accordion from "../_comps/containers/Accordion.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import SqlExecCard from "../_comps/actions/SqlExecCard.svelte";
	import md_2026_05_25_prompts_intro from "../../lib/patyia/daily/2026-05/25/01-prompts-tdconsulta-intro.md?raw";
	import sqlSeedPromptsTdConsulta from "../../lib/patyia/sql/seed-prompts-tdconsulta.sql?raw";
</script>

<ProjectSectionLayout title="PatyIA · Bitácora" subtitle="Diario de avance" proyecto="PatyIA" withTickets showDbBanner>
	<Accordion
		title="2026-05-25 — Carga inicial de prompts específicos por tipo de consulta"
		titleIcon="mdi:calendar"
		open={true}
	>
		<Accordion title="Modelado: INSTRUCCION + TDCONSULTAXINSTRUCCION" titleIcon="mdi:database-arrow-down-outline" inner>
			<BitacoraNote flat mdSource={md_2026_05_25_prompts_intro} />
		</Accordion>

		<Accordion title="SQL · Seed de 13 PROMPT_&lt;TIPO&gt; en AYUDASCP_IA" titleIcon="mdi:database-edit-outline" inner>
			<SqlExecCard
				title="AYUDASCP_IA · MERGE de prompts específicos (INSTRUCCION + TDCONSULTAXINSTRUCCION)"
				sql={sqlSeedPromptsTdConsulta}
				desc="MERGE idempotente sobre INSTRUCCION (clave iinstruccion='PROMPT_<TIPO>') con el contenido literal de cada .md como NVARCHAR(MAX), y MERGE sobre TDCONSULTAXINSTRUCCION resolviendo itdconsulta por nconsulta='<TIPO>' con orden=1. Cierra con SELECT de verificación. Pensado para ejecutarse contra AYUDASCP_IA (el endpoint genérico de la bitácora apunta a ClientesIS, ejecutar manual por ahora)."
				executeSql={null}
				height="360px"
			/>
		</Accordion>
	</Accordion>
</ProjectSectionLayout>
