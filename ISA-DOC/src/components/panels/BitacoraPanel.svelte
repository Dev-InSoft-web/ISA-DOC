<script lang="ts">
	import { FlexLayout, H3 } from "@ingenieria_insoft/ispsveltecomponents";
	import IplanpadreToAtributoMigration from "../migration/IplanpadreToAtributoMigration.svelte";
	import ImagenDocumentoDriverMigration from "../migration/ImagenDocumentoDriverMigration.svelte";
	import CleanupTestDataMigration from "../migration/CleanupTestDataMigration.svelte";
	import OldRebuildSection from "../migration/OldRebuildSection.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import DailySummaryAccordion from "../bitacora/DailySummaryAccordion.svelte";
	import TicketsSection from "../tickets/TicketsSection.svelte";
	import AccordionActions from "../_comps/containers/AccordionActions.svelte";
	import Accordion from "../_comps/containers/Accordion.svelte";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import SqlExecCard from "../_comps/actions/SqlExecCard.svelte";
	import DbStatusBanner from "../_comps/status/DbStatusBanner.svelte";
	import mdAuditAddIntro from "../../lib/bitacora/topics/audit/intro.md?raw";
	import mdAuditDropIntro from "../../lib/bitacora/topics/audit/drop-intro.md?raw";
	import sqlAddAuditColumns from "../../lib/migration/sql/add-audit-columns.sql?raw";
	import sqlDropAuditColumns from "../../lib/migration/sql/drop-audit-columns.sql?raw";
	import sqlActivateAllCursos from "../../lib/migration/sql/activate-all-cursos.sql?raw";
	import sqlDeleteCursosSinDriver from "../../lib/migration/sql/delete-cursos-sin-driver.sql?raw";
	import sqlUpdateDriverAtributosJConfig from "../../lib/migration/sql/update-driver-atributos-jconfig.sql?raw";
	import sqlReplaceDriverRecursoCodes from "../../lib/migration/sql/replace-driver-recurso-codes.sql?raw";
	import md_2026_05_06_driver_jconfig from "../../lib/bitacora/daily/2026-05/06/driver-atributos-jconfig-intro.md?raw";
	import md_2026_05_06_isa from "../../lib/bitacora/daily/2026-05/06/resumen-isa.md?raw";
	import md_2026_05_06_isw_isp from "../../lib/bitacora/daily/2026-05/06/resumen-isw-isp.md?raw";
	import md_2026_05_06_iss from "../../lib/bitacora/daily/2026-05/06/resumen-iss.md?raw";
	import md_2026_05_07_isa from "../../lib/bitacora/daily/2026-05/07/resumen-isa.md?raw";
	import md_2026_05_07_isw_isp from "../../lib/bitacora/daily/2026-05/07/resumen-isw-isp.md?raw";
	import md_2026_05_07_iss from "../../lib/bitacora/daily/2026-05/07/resumen-iss.md?raw";
	import md_2026_05_07_seguimiento from "../../lib/bitacora/daily/2026-05/07/resumen-seguimiento.md?raw";
	import md_2026_05_08_isa from "../../lib/bitacora/daily/2026-05/08/resumen-isa.md?raw";
	import md_2026_05_08_isw_isp from "../../lib/bitacora/daily/2026-05/08/resumen-isw-isp.md?raw";
	import md_2026_05_08_iss from "../../lib/bitacora/daily/2026-05/08/resumen-iss.md?raw";
	import md_2026_05_08_seguimiento from "../../lib/bitacora/daily/2026-05/08/resumen-seguimiento.md?raw";
	import md_2026_05_11_isa from "../../lib/bitacora/daily/2026-05/11/resumen-isa.md?raw";
	import md_2026_05_11_isw_isp from "../../lib/bitacora/daily/2026-05/11/resumen-isw-isp.md?raw";
	import md_2026_05_11_iss from "../../lib/bitacora/daily/2026-05/11/resumen-iss.md?raw";
	import md_2026_05_11_seguimiento from "../../lib/bitacora/daily/2026-05/11/resumen-seguimiento.md?raw";
	import md_2026_05_13_isa from "../../lib/bitacora/daily/2026-05/13/resumen-isa.md?raw";
	import md_2026_05_13_isp from "../../lib/bitacora/daily/2026-05/13/resumen-isp.md?raw";
	import md_2026_05_13_isw_isp from "../../lib/bitacora/daily/2026-05/13/resumen-isw-isp.md?raw";
	import md_2026_05_13_iss from "../../lib/bitacora/daily/2026-05/13/resumen-iss.md?raw";
	import md_2026_05_13_seguimiento from "../../lib/bitacora/daily/2026-05/13/resumen-seguimiento.md?raw";
	import JsonViewer from "../viewers/JsonViewer.svelte";

	const driverAtributosJsonItems: ReadonlyArray<{ iatributo: number; natributo: string; jconfig: string }> = [
		{ iatributo: 1, natributo: "URL diapositivas", jconfig: '{"type":"text","descripcion":"URL pública de las diapositivas asociadas al recurso.","inputProps":{"placeholder":"https://...","maxlength":500}}' },
		{ iatributo: 2, natributo: "Imagen del profesor", jconfig: '{"type":"text","descripcion":"URL pública de la imagen del profesor.","inputProps":{"placeholder":"https://...","maxlength":500}}' },
		{ iatributo: 3, natributo: "Driver de video", jconfig: '{"type":"selectEnum","options":{"1":"Lista con imagen pequeña","2":"Tarjeta con información completa","3":"Tarjeta solo con título","4":"Lista con imagen grande","5":"Lista pequeño"},"descripcion":"Componente Svelte que procesa los datos del video. Lista quemada (TTDriverRecurso); se actualizará cuando se aprueben otros controladores."}' },
		{ iatributo: 4, natributo: "Dificultad", jconfig: '{"type":"selectEnum","options":{"B":"Básico","M":"Medio","A":"Avanzado"},"descripcion":"Nivel de dificultad del contenido."}' },
		{ iatributo: 5, natributo: "iplanpadre", jconfig: '{"type":"text","readonly":true,"descripcion":"Path del plan padre. Calculado automáticamente desde el árbol de contenidos."}' },
		{ iatributo: 6, natributo: "Documento", jconfig: '{"type":"text","descripcion":"URL pública del documento adjunto al plan.","inputProps":{"placeholder":"https://...","maxlength":500}}' },
	];
	import md_2026_05_03_curso_500 from "../../lib/bitacora/daily/2026-05/03/curso-get-update-500.md?raw";
	import md_cursos_isw_reglas from "../../lib/bitacora/topics/cursos/cursos-isw-reglas.md?raw";
	import md_2026_05_04_isa from "../../lib/bitacora/daily/2026-05/04/resumen-isa.md?raw";
	import md_2026_05_04_isw_isp from "../../lib/bitacora/daily/2026-05/04/resumen-isw-isp.md?raw";
	import md_2026_05_04_iss from "../../lib/bitacora/daily/2026-05/04/resumen-iss.md?raw";
	import md_2026_05_05_isa from "../../lib/bitacora/daily/2026-05/05/resumen-isa.md?raw";
	import md_2026_05_05_isw_isp from "../../lib/bitacora/daily/2026-05/05/resumen-isw-isp.md?raw";
	import md_2026_05_05_iss from "../../lib/bitacora/daily/2026-05/05/resumen-iss.md?raw";
	import md_2026_05_05_seguimiento from "../../lib/bitacora/daily/2026-05/05/resumen-seguimiento.md?raw";
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
			<!-- 2026-05-13 -->
			<DailySummaryAccordion
				title="2026-05-13 — Cierre QA Capacitación (acciones en list-slaves, scroll Details) y normativa de tiquetes en ISA-DOC"
				open
				mdIsa={md_2026_05_13_isa}
				mdIsp={md_2026_05_13_isp}
				mdIswIsp={md_2026_05_13_isw_isp}
				mdIss={md_2026_05_13_iss}
				mdSeguimiento={md_2026_05_13_seguimiento}
			/>

			<!-- 2026-05-11 -->
			<DailySummaryAccordion
				title="2026-05-11 — Consolidado (09–11): TreeView (historial, candado, ciclos Svelte 5), módulos Capacitación y releases ispsveltecomponents 0.0.106–0.0.108"
				open
				mdIsa={md_2026_05_11_isa}
				mdIswIsp={md_2026_05_11_isw_isp}
				mdIss={md_2026_05_11_iss}
				mdSeguimiento={md_2026_05_11_seguimiento}
			/>

			<!-- 2026-05-08 -->
			<DailySummaryAccordion
				title="2026-05-08 — Capacitación: refactor TreeView (cascada de adaptadores) + cierre del Plan de contenidos del curso"
				open
				mdIsa={md_2026_05_08_isa}
				mdIswIsp={md_2026_05_08_isw_isp}
				mdIss={md_2026_05_08_iss}
				mdSeguimiento={md_2026_05_08_seguimiento}
			/>

			<!-- 2026-05-07 -->
			<DailySummaryAccordion
				title="2026-05-07 — Capacitación: Plan ↔ Curso (drawer + auto-open BtnRef) y fix de ciclo reactivo en TreeContenidos"
				open
				mdIsa={md_2026_05_07_isa}
				mdIswIsp={md_2026_05_07_isw_isp}
				mdIss={md_2026_05_07_iss}
				mdSeguimiento={md_2026_05_07_seguimiento}
			/>

			<!-- 2026-05-06 -->
			<DailySummaryAccordion
				title="2026-05-06 — Capacitación: JCONFIG de atributos de drivers + tracking temporal de índices"
				open
				resumenOpen={false}
				mdIsa={md_2026_05_06_isa}
				mdIswIsp={md_2026_05_06_isw_isp}
				mdIss={md_2026_05_06_iss}
			>
				<RevisadoCheck
					slot="title-extra"
					keys={[
						"2026-05-06.driver.atributos.jconfig",
						"2026-05-06.atributosplan.driver_recurso_codes",
					]}
				/>

				<Accordion
					title="Drivers · JCONFIG de atributos (configuración de inputs)"
					titleIcon="mdi:code-json"
					open={false}
					inner
				>
					<RevisadoCheck slot="title-extra" keys={["2026-05-06.driver.atributos.jconfig"]} />

					<BitacoraNote flat mdSource={md_2026_05_06_driver_jconfig} />

					<div class="driver-jconfig-grid">
						{#each driverAtributosJsonItems as item (item.iatributo)}
							<div class="driver-jconfig-card">
								<div class="driver-jconfig-card__head">
									<strong class="driver-jconfig-card__name">{item.natributo}</strong>
								</div>
								<JsonViewer value={item.jconfig} height="180px" />
							</div>
						{/each}
					</div>

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

				<Accordion
					title="Atributos de plan · Migrar códigos legacy de TTDriverRecurso a numérico (IATRIBUTO=3)"
					titleIcon="mdi:numeric"
					open={false}
					inner
				>
					<RevisadoCheck slot="title-extra" keys={["2026-05-06.atributosplan.driver_recurso_codes"]} />

					<SqlExecCard
						title="Atributos de plan · Reemplazar códigos legacy por valor numérico (IATRIBUTO=3)"
						checkKey="2026-05-06.atributosplan.driver_recurso_codes"
						sql={sqlReplaceDriverRecursoCodes}
						desc="Convierte en CAPAC_ATRIBUTOS_PLANES.VALOR los códigos legacy (FULL_NOMBRE_DESCRIPCION, MINI_DESCRIP_COMPLETA_PUR, MINI_FULL_INFO, MINI_NOMBRE_DESCRIPCION_VER, MINI_DESCRIP_COMPLETA_VER, GRANDE_FULL, SOLODECRIPCION_IMG) a sus valores numéricos 1..5 según el enum TTDriverRecurso. Idempotente. Cierra con SELECT de filas residuales no numéricas."
						confirmKind="warning"
						confirmMessage={`Se reemplazarán los códigos legacy de TTDriverRecurso por sus valores numéricos en CAPAC_ATRIBUTOS_PLANES (IATRIBUTO=3).\n\n¿Continuar?`}
						{executeSql}
						height="320px"
					/>
				</Accordion>
			</DailySummaryAccordion>

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

<style>
	.driver-jconfig-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.75rem;
		margin: 0.5rem 0 1rem;
	}
	@media (max-width: 900px) {
		.driver-jconfig-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
	}
	@media (max-width: 600px) {
		.driver-jconfig-grid { grid-template-columns: 1fr; }
	}
	.driver-jconfig-card {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 0.6rem;
		border: 1px solid var(--is-outline, #ccc);
		border-radius: 6px;
		background: var(--is-surface, transparent);
		min-width: 0;
	}
	.driver-jconfig-card__head {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.driver-jconfig-card__name {
		font-size: 0.95rem;
	}
</style>
