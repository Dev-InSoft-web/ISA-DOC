<script lang="ts">
	import { FlexLayout, H3 } from "@ingenieria_insoft/ispsveltecomponents";
	import IplanpadreToAtributoMigration from "../migration/IplanpadreToAtributoMigration.svelte";
	import ImagenDocumentoDriverMigration from "../migration/ImagenDocumentoDriverMigration.svelte";
	import CleanupTestDataMigration from "../migration/CleanupTestDataMigration.svelte";
	import OldRebuildSection from "../migration/OldRebuildSection.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import TicketsSection from "../tickets/TicketsSection.svelte";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import Accordion from "../_comps/containers/Accordion.svelte";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import DbStatusBanner from "../_comps/status/DbStatusBanner.svelte";
	import md_2026_05_03_curso_500 from "../../lib/bitacora/2026-05-03-curso-get-update-500.md?raw";
	import md_cursos_isw_reglas from "../../lib/bitacora/cursos-isw-reglas.md?raw";
	import md_2026_05_04_isa from "../../lib/bitacora/2026-05-04-resumen-isa.md?raw";
	import md_2026_05_04_isw_isp from "../../lib/bitacora/2026-05-04-resumen-isw-isp.md?raw";
	import md_2026_05_04_iss from "../../lib/bitacora/2026-05-04-resumen-iss.md?raw";
	import { REBUILD_TABLES } from "../../lib/migration/oldRebuildTables.ts";

	const REBUILD_STEPS = ["drop", "create", "insert"] as const;
	const dayKeys: string[] = [
		"2026-05-04.cleanup.run",
		"2026-05-04.cleanup.atributos_planes",
		"2026-05-04.iplanpadre.fase1",
		"2026-05-04.iplanpadre.fase2a",
		"2026-05-04.iplanpadre.fase2",
		"2026-05-04.iplanpadre.fase3",
		"2026-05-04.iplanpadre.fase4",
		...REBUILD_TABLES.flatMap((t) => REBUILD_STEPS.map((s) => `2026-05-04.rebuild.${t.tableName}.${s}`)),
	];

	const todayKeys: string[] = [
		"2026-05-05.imgdoc.fase1a",
		"2026-05-05.imgdoc.fase1b",
		"2026-05-05.imgdoc.fase2a",
		"2026-05-05.imgdoc.fase2b",
		"2026-05-05.imgdoc.fase2c",
	];

	// La pestaña Bitácora aloja utilidades temporales del desarrollo (one-shots,
	// migraciones puntuales, scripts de inspección). El ejecutor SQL apunta al
	// endpoint `/api/db/exec` que abre la conexión `mssql` configurada en el
	// `.env` de ISA-DOC.
	async function executeSql(sql: string): Promise<{ ok: boolean; output?: string; error?: string }> {
		try {
			const r = await fetch("/api/db/exec", {
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

<FlexLayout direction="column" style="padding: 0; flex: 1 1 auto; min-height: 0; height: 100%; overflow: hidden;">
	<H3>Bitácora</H3>
	<DbStatusBanner />

	<FlexLayout direction="row" items="stretch" style="gap: 1rem; width: 100%; flex: 1 1 auto; min-height: 0; overflow: hidden;">
		<!-- Panel izquierdo (20%): Tickets -->
		<div class="custom-scrollbar" style="flex: 0 0 20%; min-width: 0; min-height: 0; overflow: auto;">
			<TicketsSection />
		</div>

		<!-- Panel derecho (80%): el resto -->
		<FlexLayout direction="column" class="custom-scrollbar" style="flex: 1 1 80%; min-width: 0; min-height: 0; overflow: auto;">
			<!-- 1) ISW siempre primero -->
			<BitacoraNote
				title="Cursos (ISW) — Reglas, restricciones y avances"
				mdSource={md_cursos_isw_reglas}
			/>

			<!-- 2) Construcción CAPAC_* (acceso rápido) -->
			<OldRebuildSection {executeSql} />

			<!-- =================== Separador =================== -->
			<hr style="margin: 1.25rem 0; border: 0; border-top: 1px solid var(--is-outline, #ccc); opacity: 0.4;" />

			<!-- =================== Secciones por FECHA (DESC) =================== -->
			<!-- 2026-05-05 -->
			<Accordion
				title="2026-05-05 — Capacitación: IMAGENDRIVER / DOCUMENTODRIVER → atributos plan"
				titleIcon="mdi:calendar"
				open={true}
			>
				<RevisadoCheck slot="title-extra" keys={todayKeys} />
				<ImagenDocumentoDriverMigration {executeSql} inner />
			</Accordion>

			<!-- 2026-05-04 -->
			<Accordion
				title="2026-05-04 — Capacitación: limpieza, migración IPLANPADRE, reconstrucción CAPAC_*_OLD y snapshots"
				titleIcon="mdi:calendar"
				open={true}
			>
				<Accordion title="Resumen del día" titleIcon="mdi:notebook-edit-outline" open={false} inner>
					<BitacoraNote
						title="Proyecto ISA-DOC"
						mdSource={md_2026_05_04_isa}
						inner
					/>
					<BitacoraNote
						title="ISW / ISP ClientesIS"
						mdSource={md_2026_05_04_isw_isp}
						inner
					/>
					<BitacoraNote
						title="ISS ClientesIS-ContaPymeU"
						mdSource={md_2026_05_04_iss}
						inner
					/>
				</Accordion>

				<AccordionActions
					title="Capacitación: limpieza de prueba e IPLANPADRE"
					icon="mdi:database-cog"
					count={2}
					open={false}
					inner
				>
					<RevisadoCheck slot="title-extra" keys={dayKeys} />
					<CleanupTestDataMigration {executeSql} inner />
					<IplanpadreToAtributoMigration {executeSql} inner />
				</AccordionActions>
			</Accordion>

			<!-- 2026-05-03 -->
			<Accordion
				title="2026-05-03 — Curso GET/UPDATE devuelve 500 tras npm i"
				titleIcon="mdi:calendar"
				open={true}
			>
				<BitacoraNote
					title="Curso GET/UPDATE devuelve 500 tras npm i"
					mdSource={md_2026_05_03_curso_500}
					inner
				/>
			</Accordion>
		</FlexLayout>
	</FlexLayout>
</FlexLayout>
