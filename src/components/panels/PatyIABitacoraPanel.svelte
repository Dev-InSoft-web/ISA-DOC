<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import ProjectSectionLayout from "./ProjectSectionLayout.svelte";
	import Accordion from "$comps/containers/Accordion.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import SqlExecCard from "$comps/actions/SqlExecCard.svelte";
	import md_2026_05_25_prompts_intro from "../../lib/patyia/daily/2026-05/25/01-prompts-tdconsulta-intro.md?raw";
	import sqlSeedPromptsTdConsulta from "../../lib/patyia/sql/seed-prompts-tdconsulta.sql?raw";
	import sqlUpdateDescripcionesInstruccion from "../../lib/patyia/sql/update-descripciones-instruccion.sql?raw";
	import sqlUpdateNombresInstruccion from "../../lib/patyia/sql/update-nombres-instruccion.sql?raw";

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
		title="2026-05-26 — PatyIA: poblar NINSTRUCCION con nombres semánticos en español"
		titleIcon="mdi:calendar"
		open={true}
		checkKeys={["2026-05-26.patyia.ninstruccion.update"]}
	>
		<Accordion
			title="INSTRUCCION · Actualizar NINSTRUCCION con labels semánticos"
			titleIcon="mdi:translate"
			inner
			checkKey="2026-05-26.patyia.ninstruccion.update"
		>
			<SqlExecCard
				title="AYUDASCP_IA · UPDATE NINSTRUCCION con nombres semánticos en español (13 instrucciones)"
				sql={sqlUpdateNombresInstruccion}
				desc="UPDATE...FROM INNER JOIN (VALUES) que sobreescribe NINSTRUCCION con el nombre semántico en español para cada uno de los 13 tipos de instrucción. Ej: ASESORIA_PERSONALIZADA → 'Asesoría Personalizada'. Idempotente. Se esperan 13 filas afectadas."
				{executeSql}
				checkKey="2026-05-26.patyia.ninstruccion.update"
				confirmKind="warning"
				confirmMessage={`Se actualizará NINSTRUCCION en los 13 registros de INSTRUCCION con nombres semánticos en español.\n\n¿Continuar?`}
				height="340px"
			/>
		</Accordion>
	</Accordion>

	<Accordion
		title="2026-05-25 — Carga inicial de prompts específicos por tipo de consulta"
		titleIcon="mdi:calendar"
		open={true}
		checkKeys={["2026-05-25.patyia.seed-prompts", "2026-05-25.patyia.update-descripciones"]}
	>
		<Accordion
			title="Modelado: INSTRUCCION + TDCONSULTAXINSTRUCCION"
			titleIcon="mdi:database-arrow-down-outline"
			inner
		>
			<BitacoraNote flat mdSource={md_2026_05_25_prompts_intro} />
		</Accordion>

		<Accordion
			title="SQL · Seed y actualización de prompts en AYUDASCP_IA"
			titleIcon="mdi:database-edit-outline"
			inner
			checkKeys={["2026-05-25.patyia.seed-prompts", "2026-05-25.patyia.update-descripciones"]}
		>
			<SqlExecCard
				title="AYUDASCP_IA · MERGE de prompts específicos (INSTRUCCION + TDCONSULTAXINSTRUCCION)"
				sql={sqlSeedPromptsTdConsulta}
				desc="MERGE idempotente sobre INSTRUCCION (iinstruccion=&lt;TIPO&gt;, ninstruccion='PROMPT_&lt;TIPO&gt;') con el contenido literal de cada .md como NVARCHAR(MAX), y MERGE sobre TDCONSULTAXINSTRUCCION resolviendo itdconsulta=&lt;TIPO&gt; con orden=1. Cierra con SELECT de verificación. Ejecuta contra AYUDASCP_IA vía /api/patyia/db/exec."
				{executeSql}
				checkKey="2026-05-25.patyia.seed-prompts"
				confirmKind="warning"
				height="360px"
			/>
			<SqlExecCard
				title="AYUDASCP_IA · UPDATE de descripcion en INSTRUCCION (13 prompts)"
				sql={sqlUpdateDescripcionesInstruccion}
				desc="UPDATE...FROM INNER JOIN (VALUES) que reemplaza la descripción genérica de los 13 PROMPT_&lt;TIPO&gt; por la descripción funcional entregada en la tabla del TK-1429373. Envuelto en BEGIN TRAN / COMMIT con SET XACT_ABORT ON."
				{executeSql}
				checkKey="2026-05-25.patyia.update-descripciones"
				confirmKind="warning"
				height="360px"
			/>
		</Accordion>
	</Accordion>
</ProjectSectionLayout>

<Toaster />
