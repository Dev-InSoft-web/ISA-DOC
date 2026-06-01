<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import ProjectSectionLayout from "./ProjectSectionLayout.svelte";
	import Accordion from "$comps/containers/Accordion.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import SqlExecCard from "$comps/actions/SqlExecCard.svelte";
	import md_2026_06_01_resumen from "../../lib/patyia/daily/2026-06/01/01-resumen-2026-06-01.md?raw";
	import md_2026_05_29_instrucciones_cleanup from "../../lib/patyia/daily/2026-05/29/01-instrucciones-listado-y-limpieza.md?raw";
	import md_2026_05_29_reunion_mejoras from "../../lib/patyia/daily/2026-05/29/02-reunion-propuesta-mejora-patyia.md?raw";
	import md_2026_05_28_saludo_diag from "../../lib/patyia/daily/2026-05/28/01-saludo-perdido-diagnostico.md?raw";
	import md_2026_05_28_compare_engines from "../../lib/patyia/daily/2026-05/28/02-comparativa-engines-responses-vs-agents.md?raw";
	import md_2026_05_25_prompts_intro from "../../lib/patyia/daily/2026-05/25/01-prompts-tdconsulta-intro.md?raw";
	import sqlSelectAllInstrucciones from "../../lib/patyia/sql/select-all-instrucciones.sql?raw";
	import sqlCleanupInstruccionesVacias from "../../lib/patyia/sql/cleanup-instrucciones-vacias.sql?raw";
	import sqlSeedPromptsTdConsulta from "../../lib/patyia/sql/seed-prompts-tdconsulta.sql?raw";
	import sqlUpdateDescripcionesInstruccion from "../../lib/patyia/sql/update-descripciones-instruccion.sql?raw";
	import sqlUpdateNombresInstruccion from "../../lib/patyia/sql/update-nombres-instruccion.sql?raw";
	import sqlAddModeloInstruccion from "../../lib/patyia/sql/add-modelo-instruccion.sql?raw";
	import sqlResyncSeqConversaciones from "../../lib/patyia/sql/resync-seq-conversaciones.sql?raw";
	import md_2026_06_01_tk1431662 from "../../lib/patyia/daily/2026-06/01/02-tk1431662-modelo-por-instruccion.md?raw";

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
	dbLabelOk="BD PatyIA conectada"
>
	<!-- 2026-06-01 (hoy) — entrada diaria (mes actual no agrupado) -->
	<Accordion
		title="2026-06-01 — PatyIA: TK-1431163, TK-1431662 (modelo por instrucción) y limpieza Groq"
		titleIcon="mdi:calendar"
		open={true}
		checkKeys={["2026-06-01.patyia.instruccion.modelo"]}
	>
		<Accordion
			title="Resumen del día"
			titleIcon="mdi:notebook-edit-outline"
			inner
		>
			<BitacoraNote flat mdSource={md_2026_06_01_resumen} />
		</Accordion>

		<Accordion
			title="TK-1431662 · MODELO en INSTRUCCION (modelo OpenAI por fila)"
			titleIcon="mdi:brain"
			inner
			checkKey="2026-06-01.patyia.instruccion.modelo"
		>
			<BitacoraNote flat mdSource={md_2026_06_01_tk1431662} />
			<SqlExecCard
				title="AYUDASCP_IA · ADD MODELO en INSTRUCCION (default gpt-5-mini)"
				sql={sqlAddModeloInstruccion}
				desc="Idempotente: agrega MODELO a INSTRUCCION (13 tipos) con default gpt-5-mini. Resuelve AYUDASCP_IA_STAGING / AYUDASCP_IA automáticamente. Requiere paty_* en ISA-DOC/.env (copiar de PatyIA/local.settings.json) si el banner muestra CLIENTES u otra BD sin INSTRUCCION."
				{executeSql}
				checkKey="2026-06-01.patyia.instruccion.modelo"
				confirmKind="warning"
				confirmMessage={`Se agregará la columna MODELO (si no existe) y se normalizarán filas existentes con valor vacío a gpt-5-mini.\n\n¿Continuar?`}
				height="360px"
			/>
			<SqlExecCard
				title="AYUDASCP_IA · Resync SEQ_IDCONVERSACIONES"
				sql={sqlResyncSeqConversaciones}
				desc="Corrige error 400999 «El recurso a insertar ya existe» al crear conversación (secuencia desincronizada vs MAX(ICONVERSACION)). Ejecutar en staging si falla Iniciar conversación con API local."
				{executeSql}
				checkKey="2026-06-01.patyia.seq.conversaciones"
				confirmKind="warning"
				confirmMessage="Se ajustará SEQ_IDCONVERSACIONES al siguiente id libre (MAX+1).\n\n¿Continuar?"
				height="280px"
			/>
		</Accordion>
	</Accordion>

	<!-- Agrupación mensual: Mayo 2026 -->
	<Accordion title="Mayo 2026 — Entradas diarias" titleIcon="mdi:calendar-month" open={false} inner>
		<Accordion
			title="2026-05-29 — PatyIA: reunión de mejoras, listado de INSTRUCCION y limpieza"
			titleIcon="mdi:calendar"
			open={true}
			checkKeys={[
				"2026-05-29.patyia.instrucciones.select",
				"2026-05-29.patyia.instrucciones.cleanup",
			]}
		>
			<Accordion
				title="Análisis reunión · propuesta de mejora PatyIA"
				titleIcon="mdi:file-document-outline"
				inner
			>
				<BitacoraNote flat mdSource={md_2026_05_29_reunion_mejoras} />
			</Accordion>

			<Accordion
				title="Contexto · premisas dejan de persistirse en BD"
				titleIcon="mdi:note-text-outline"
				inner
			>
				<BitacoraNote flat mdSource={md_2026_05_29_instrucciones_cleanup} />
			</Accordion>

			<Accordion
				title="INSTRUCCION · listado completo del catálogo"
				titleIcon="mdi:database-search-outline"
				inner
				checkKey="2026-05-29.patyia.instrucciones.select"
			>
				<SqlExecCard
					title="AYUDASCP_IA · SELECT TOP 1000 INSTRUCCION"
					sql={sqlSelectAllInstrucciones}
					desc="Lectura de inspección sobre dbo.INSTRUCCION (TOP 1000). Útil para validar antes/después del cleanup qué premisas residuales (filas con INSTRUCCION y DESCRIPCION vacías) están ensuciando el catálogo."
					{executeSql}
					checkKey="2026-05-29.patyia.instrucciones.select"
					height="280px"
				/>
			</Accordion>

			<Accordion
				title="INSTRUCCION · DELETE de premisas residuales (INSTRUCCION y DESCRIPCION vacías)"
				titleIcon="mdi:database-remove-outline"
				inner
				checkKey="2026-05-29.patyia.instrucciones.cleanup"
			>
				<SqlExecCard
					title="AYUDASCP_IA · CLEANUP INSTRUCCION sin contenido"
					sql={sqlCleanupInstruccionesVacias}
					desc="Vista previa + DELETE dentro de transacción de las filas con INSTRUCCION y DESCRIPCION nulas/vacías (premisas auto-insertadas por la rutina vieja generarPremisasInput). No toca los PROMPT_<TIPO>. Cierra con COUNT(*) de verificación."
					{executeSql}
					checkKey="2026-05-29.patyia.instrucciones.cleanup"
					confirmKind="danger"
					confirmMessage={`Se eliminarán todas las filas de INSTRUCCION cuya INSTRUCCION y DESCRIPCION estén vacías (premisas residuales).\n\n¿Continuar?`}
					height="340px"
				/>
			</Accordion>
		</Accordion>

		<Accordion
			title="2026-05-28 — PatyIA: diagnóstico del saludo perdido tras instrucciones por tipo de consulta"
			titleIcon="mdi:calendar"
			open={true}
		>
			<Accordion
				title="Diagnóstico · override de instructions sobre PR_GENERAL"
				titleIcon="mdi:bug-outline"
				inner
			>
				<BitacoraNote flat mdSource={md_2026_05_28_saludo_diag} />
			</Accordion>

			<Accordion
				title="Comparativa de costos · Responses vs Agents SDK (10 turnos)"
				titleIcon="mdi:scale-balance"
				inner
			>
				<BitacoraNote flat mdSource={md_2026_05_28_compare_engines} />
			</Accordion>
		</Accordion>

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
	</Accordion>
</ProjectSectionLayout>

<Toaster />
