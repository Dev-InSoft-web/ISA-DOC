<script lang="ts">
	import ProjectSectionLayout from "./ProjectSectionLayout.svelte";
	import Accordion from "../_comps/containers/Accordion.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import SqlExecCard from "../_comps/actions/SqlExecCard.svelte";
	import md_2026_05_25_prompts_intro from "../../lib/patyia/daily/2026-05/25/01-prompts-tdconsulta-intro.md?raw";
	import sqlSeedPromptsTdConsulta from "../../lib/patyia/sql/seed-prompts-tdconsulta.sql?raw";

	// PatyIA tiene su propia BD (AYUDASCP_IA) — los endpoints de ejecución y
	// ping están bifurcados respecto a los de ClientesIS para que el banner
	// y el botón de SqlExecCard apunten al pool correcto.
	async function executeSql(sql: string): Promise<{ ok: boolean; output?: string; error?: string }> {
		try {
			const r = await fetch("/api/patyia/db/exec", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ sql }),
			});
			const data = (await r.json()) as { ok: boolean; output?: string; error?: string };
			if (!r.ok) return { ok: false, error: data.error ?? `HTTP ${r.status}` };
			return data;
		} catch (err) {
			return { ok: false, error: err instanceof Error ? err.message : String(err) };
		}
	}
</script>

<ProjectSectionLayout
	title="PatyIA · Bitácora"
	subtitle="Diario de avance"
	proyecto="PatyIA"
	withTickets
	showDbBanner
	dbPingUrl="/api/patyia/db/ping"
	dbLabelOk="BD conectada · AYUDASCP_IA"
>
	<Accordion
		title="2026-05-25 — Carga inicial de prompts específicos por tipo de consulta"
		titleIcon="mdi:calendar"
		open={true}
		checkKeys={["2026-05-25.patyia.prompts-intro", "2026-05-25.patyia.seed-prompts"]}
	>
		<Accordion
			title="Modelado: INSTRUCCION + TDCONSULTAXINSTRUCCION"
			titleIcon="mdi:database-arrow-down-outline"
			inner
			checkKey="2026-05-25.patyia.prompts-intro"
		>
			<BitacoraNote flat mdSource={md_2026_05_25_prompts_intro} />
		</Accordion>

		<Accordion
			title="SQL · Seed de 13 PROMPT_&lt;TIPO&gt; en AYUDASCP_IA"
			titleIcon="mdi:database-edit-outline"
			inner
			checkKey="2026-05-25.patyia.seed-prompts"
		>
			<SqlExecCard
				title="AYUDASCP_IA · MERGE de prompts específicos (INSTRUCCION + TDCONSULTAXINSTRUCCION)"
				sql={sqlSeedPromptsTdConsulta}
				desc="MERGE idempotente sobre INSTRUCCION (clave iinstruccion='PROMPT_<TIPO>') con el contenido literal de cada .md como NVARCHAR(MAX), y MERGE sobre TDCONSULTAXINSTRUCCION resolviendo itdconsulta por nconsulta='<TIPO>' con orden=1. Cierra con SELECT de verificación. Ejecuta contra AYUDASCP_IA vía /api/patyia/db/exec."
				{executeSql}
				checkKey="2026-05-25.patyia.seed-prompts"
				confirmKind="warning"
				height="360px"
			/>
		</Accordion>
	</Accordion>
</ProjectSectionLayout>
