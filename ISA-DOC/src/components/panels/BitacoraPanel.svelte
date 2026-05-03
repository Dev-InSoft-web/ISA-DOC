<script lang="ts">
	import { FlexLayout, H3, Text } from "@ingenieria_insoft/ispsveltecomponents";
	import PermisosCsvMigration from "../migration/PermisosCsvMigration.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import md_2026_05_03_curso_500 from "../../lib/bitacora/2026-05-03-curso-get-update-500.md?raw";
	import md_cursos_isw_reglas from "../../lib/bitacora/cursos-isw-reglas.md?raw";

	// La pestaña Bitácora aloja utilidades temporales del desarrollo (one-shots,
	// migraciones puntuales, scripts de inspección). No comparte canal de
	// ejecución directo contra la BD: cada utilidad propone su propio SQL y el
	// desarrollador decide si lo ejecuta vía herramienta externa.
	const executeSql: null = null;
</script>

<FlexLayout direction="column" style="padding: 1rem;">
	<H3>Bitácora</H3>
	<Text color="neutral">
		<small>
			Utilidades de desarrollo de ciclo corto (migraciones puntuales, inspecciones).
			No están pensadas para producción permanente.
		</small>
	</Text>

	<H3>Notas para futuros desarrolladores</H3>
	<BitacoraNote
		title="Cursos (ISW) — Reglas, restricciones y avances"
		mdSource={md_cursos_isw_reglas}
	/>
	<BitacoraNote
		title="2026-05-03 — Curso GET/UPDATE devuelve 500 tras npm i"
		mdSource={md_2026_05_03_curso_500}
	/>

	<PermisosCsvMigration {executeSql} tableName="PERMISOS" />
</FlexLayout>
