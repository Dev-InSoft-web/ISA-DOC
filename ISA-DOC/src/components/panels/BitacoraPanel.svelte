<script lang="ts">
	import { FlexLayout, H3, Text } from "@ingenieria_insoft/ispsveltecomponents";
	import IplanpadreToAtributoMigration from "../migration/IplanpadreToAtributoMigration.svelte";
	import CleanupTestDataMigration from "../migration/CleanupTestDataMigration.svelte";
	import OldRebuildSection from "../migration/OldRebuildSection.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import DbStatusBanner from "../_comps/status/DbStatusBanner.svelte";
	import md_2026_05_03_curso_500 from "../../lib/bitacora/2026-05-03-curso-get-update-500.md?raw";
	import md_cursos_isw_reglas from "../../lib/bitacora/cursos-isw-reglas.md?raw";
	import md_2026_05_04_resumen from "../../lib/bitacora/2026-05-04-resumen.md?raw";
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

<FlexLayout direction="column" style="padding: 1rem;">
	<H3>Bitácora</H3>
	<DbStatusBanner />
	<Text color="neutral">
		<small>
			Utilidades de desarrollo de ciclo corto (migraciones puntuales, inspecciones).
			No están pensadas para producción permanente.
		</small>
	</Text>

	<H3>Notas para futuros desarrolladores</H3>

	<BitacoraNote
		title="2026-05-04 — Resumen del día"
		mdSource={md_2026_05_04_resumen}
	/>

	<!-- ISW siempre primero -->
	<BitacoraNote
		title="Cursos (ISW) — Reglas, restricciones y avances"
		mdSource={md_cursos_isw_reglas}
	/>

	<!-- 2026-05-04 — Tres sub-secciones del mismo día agrupadas -->
	<AccordionActions
		title="2026-05-04 — Capacitación: limpieza de prueba, migración IPLANPADRE y reconstrucción CAPAC_*_OLD"
		icon="mdi:database-cog"
		count={3}
		open={false}
	>
		<RevisadoCheck slot="title-extra" keys={dayKeys} />
		<CleanupTestDataMigration {executeSql} inner />
		<IplanpadreToAtributoMigration {executeSql} inner />
		<OldRebuildSection {executeSql} date="2026-05-04" inner />
	</AccordionActions>

	<BitacoraNote
		title="2026-05-03 — Curso GET/UPDATE devuelve 500 tras npm i"
		mdSource={md_2026_05_03_curso_500}
	/>
</FlexLayout>
