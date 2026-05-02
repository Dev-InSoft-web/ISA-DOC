<script lang="ts">
	import { FlexLayout, H3, Text } from "@ingenieria_insoft/ispsveltecomponents";
	import PermisosCsvMigration from "../migration/PermisosCsvMigration.svelte";

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

	<PermisosCsvMigration {executeSql} tableName="PERMISOS" />
</FlexLayout>
