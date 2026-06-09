<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import ProjectSectionLayout from "./ProjectSectionLayout.svelte";
	import BitacoraFromStore from "../bitacora/BitacoraFromStore.svelte";
</script>

<ProjectSectionLayout title="ClientesIS · Bitácora" subtitle="Diario de avance" proyecto="ClientesIS" withTickets showDbBanner>
	<BitacoraFromStore project="clientesis" mssqlTarget="clientesis" />
</ProjectSectionLayout>

<Toaster />
