<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import ProjectSectionLayout from "./ProjectSectionLayout.svelte";
	import BitacoraFromStore from "../bitacora/BitacoraFromStore.svelte";
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
	<BitacoraFromStore project="patyia" mssqlTarget="paty" />
</ProjectSectionLayout>

<Toaster />
