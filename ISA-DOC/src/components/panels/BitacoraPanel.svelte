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
	import SqlExecCard from "../_comps/actions/SqlExecCard.svelte";
	import DbStatusBanner from "../_comps/status/DbStatusBanner.svelte";
	import mdAuditAddIntro from "../../lib/bitacora/audit-cols-intro.md?raw";
	import mdAuditDropIntro from "../../lib/bitacora/audit-cols-drop-intro.md?raw";
	import sqlAddAuditColumns from "../../lib/migration/sql/add-audit-columns.sql?raw";
	import sqlDropAuditColumns from "../../lib/migration/sql/drop-audit-columns.sql?raw";
	import sqlActivateAllCursos from "../../lib/migration/sql/activate-all-cursos.sql?raw";
	import sqlDeleteCursosSinDriver from "../../lib/migration/sql/delete-cursos-sin-driver.sql?raw";
	import sqlUpdateDriverAtributosJConfig from "../../lib/migration/sql/update-driver-atributos-jconfig.sql?raw";
	import md_2026_05_06_driver_jconfig from "../../lib/bitacora/2026-05-06-driver-atributos-jconfig-intro.md?raw";
	import md_2026_05_03_curso_500 from "../../lib/bitacora/2026-05-03-curso-get-update-500.md?raw";
	import md_cursos_isw_reglas from "../../lib/bitacora/cursos-isw-reglas.md?raw";
	import md_2026_05_04_isa from "../../lib/bitacora/2026-05-04-resumen-isa.md?raw";
	import md_2026_05_04_isw_isp from "../../lib/bitacora/2026-05-04-resumen-isw-isp.md?raw";
	import md_2026_05_04_iss from "../../lib/bitacora/2026-05-04-resumen-iss.md?raw";
	import md_2026_05_05_isa from "../../lib/bitacora/2026-05-05-resumen-isa.md?raw";
	import md_2026_05_05_isw_isp from "../../lib/bitacora/2026-05-05-resumen-isw-isp.md?raw";
	import md_2026_05_05_iss from "../../lib/bitacora/2026-05-05-resumen-iss.md?raw";
	import md_2026_05_05_seguimiento from "../../lib/bitacora/2026-05-05-resumen-seguimiento.md?raw";
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
			<!-- 2026-05-06 -->
			<Accordion
				title="2026-05-06 — Capacitación: JCONFIG de atributos de drivers + tracking temporal de índices"
				titleIcon="mdi:calendar"
				open={true}
			>
				<RevisadoCheck slot="title-extra" keys={["2026-05-06.driver.atributos.jconfig"]} />

				<BitacoraNote flat mdSource={md_2026_05_06_driver_jconfig} />
				<SqlExecCard
					title="Drivers · Completar JCONFIG de los 6 atributos (drivers 1, 2, 3)"
					checkKey="2026-05-06.driver.atributos.jconfig"
					sql={sqlUpdateDriverAtributosJConfig}
					desc="Actualiza JCONFIG en CAPAC_ATRIBUTOS_X_DRIVERS para los drivers 1, 2 y 3 con la configuración interpretada por AtributoInput (text/selectEnum, inputProps, descripcion, readonly). Idempotente."
					confirmKind="warning"
					confirmMessage={`Se actualizará JCONFIG de los 6 atributos (IATRIBUTO 1..6) en los drivers 1, 2 y 3 de CAPAC_ATRIBUTOS_X_DRIVERS.\n\n¿Continuar?`}
					{executeSql}
					height="320px"
				/>
			</Accordion>

			<!-- 2026-05-05 -->
			<Accordion
				title="2026-05-05 — Capacitación: IMAGENDRIVER / DOCUMENTODRIVER → atributos plan + auditoría"
				titleIcon="mdi:calendar"
				open={true}
			>
				<RevisadoCheck slot="title-extra" keys={todayKeys} />

				<Accordion title="Resumen del día" titleIcon="mdi:notebook-edit-outline" open={false} inner>
					<BitacoraNote
						title="Proyecto ISA-DOC"
						mdSource={md_2026_05_05_isa}
						inner
					/>
					<BitacoraNote
						title="ISW / ISP ClientesIS"
						mdSource={md_2026_05_05_isw_isp}
						inner
					/>
					<BitacoraNote
						title="ISP-ClientesISServer / ISS-ClientesIS-ContaPymeU"
						mdSource={md_2026_05_05_iss}
						inner
					/>
					<BitacoraNote
						title="Avances ContaPymeU (sin ISA-DOC)"
						mdSource={md_2026_05_05_seguimiento}
						inner
					/>
				</Accordion>

				<ImagenDocumentoDriverMigration {executeSql} inner />

				<AccordionActions
					title="Auditoría y activación · Cursos / Planes de Estudio"
					icon="mdi:database-cog"
					count={4}
					open={false}
					inner
				>
					<RevisadoCheck
						slot="title-extra"
						keys={[
							"2026-05-05.audit.add_columns",
							"2026-05-05.audit.drop_columns",
							"2026-05-05.cursos.activate_all",
							"2026-05-05.cursos.delete_sin_driver",
						]}
					/>

					<BitacoraNote flat mdSource={mdAuditAddIntro} />
					<SqlExecCard
						title="Auditoría · Crear columnas CRE/ULT en CAPAC_CURSOS y CAPAC_PLANES_ESTUDIO"
						checkKey="2026-05-05.audit.add_columns"
						sql={sqlAddAuditColumns}
						desc="Verifica cada columna en CAPAC_CURSOS y CAPAC_PLANES_ESTUDIO; crea solo las que falten. Idempotente."
						confirmKind="info"
						confirmMessage={`Se verificarán y crearán (si no existen) las columnas de auditoría CRE/ULT en CAPAC_CURSOS y CAPAC_PLANES_ESTUDIO.\n\n¿Continuar?`}
						{executeSql}
						height="320px"
					/>

					<BitacoraNote flat mdSource={mdAuditDropIntro} />
					<SqlExecCard
						title="Auditoría · Eliminar columnas CRE/ULT en entidades distintas a Cursos y Planes de Estudio"
						checkKey="2026-05-05.audit.drop_columns"
						sql={sqlDropAuditColumns}
						desc="Elimina las columnas CRE/ULT en las 7 tablas de Capacitación que no las requieren. Verifica cada columna y constraint antes de borrar. Idempotente."
						confirmKind="danger"
						confirmMessage={`Se eliminarán las 10 columnas de auditoría (IUSUARIOCRE/ULT, IAPPCRE/ULT, IEQUIPOCRE/ULT, IPCRE/ULT, FHCRE/ULT) en:\n\n  • CAPAC_DRIVERS\n  • CAPAC_TEMAS\n  • CAPAC_CURSOS_DE_PLANES_ESTUDIO\n  • CAPAC_SEGURIDADES_CURSOS\n  • CAPAC_PLANES_CURSOS\n  • CAPAC_ATRIBUTOS_PLANES\n  • CAPAC_ESTRUCTURAS_CURSOS\n\n¿Continuar?`}
						{executeSql}
						height="320px"
					/>

					<SqlExecCard
						title="Cursos · Activar todos los registros (BACTIVO = 1)"
						checkKey="2026-05-05.cursos.activate_all"
						sql={sqlActivateAllCursos}
						desc="Marca como activos todos los cursos en CAPAC_CURSOS. Solo actualiza las filas con BACTIVO ≠ 1 o NULL. Idempotente."
						confirmKind="warning"
						confirmMessage={`Se actualizarán todas las filas de CAPAC_CURSOS donde BACTIVO sea NULL o distinto de 1.\n\n¿Continuar?`}
						{executeSql}
						height="200px"
					/>

					<SqlExecCard
						title="Cursos · Eliminar registros sin driver válido"
						checkKey="2026-05-05.cursos.delete_sin_driver"
						sql={sqlDeleteCursosSinDriver}
						desc="Elimina los cursos cuyo IDRIVER es NULL o no referencia a un CAPAC_DRIVERS existente, junto con todas sus filas dependientes (atributos, planes, seguridades, estructuras, prerequisitos, historial). Transaccional e idempotente."
						confirmKind="danger"
						confirmMessage={`Se eliminarán de forma permanente los cursos sin driver junto con sus dependencias en:\n\n  • CAPAC_ATRIBUTOS_PLANES\n  • CAPAC_PLANES_CURSOS\n  • CAPAC_SEGURIDADES_CURSOS\n  • CAPAC_ESTRUCTURAS_CURSOS\n  • CAPAC_CURSOS_DE_PLANES_ESTUDIO\n  • CAPAC_CURSOS_PREREQUISITOS\n  • CAPAC_HISTORIALCURSO\n  • CAPAC_CURSOS\n\n¿Continuar?`}
						{executeSql}
						height="280px"
					/>
				</AccordionActions>
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
