<script lang="ts">
	import { FlexLayout } from "@ingenieria_insoft/ispsveltecomponents";
	import ProjectPanelLayout from "../templates/ProjectPanelLayout.svelte";
	import TicketsSection from "../tickets/TicketsSection.svelte";
	import DbStatusBanner from "$comps/status/DbStatusBanner.svelte";

	export let title: string;
	export let subtitle: string = "";
	export let proyecto: "ClientesIS" | "PatyIA" = "ClientesIS";
	export let withTickets: boolean = false;
	export let showDbBanner: boolean = false;
	export let dbPingUrl: string = "/api/db/ping";
	export let dbLabelOk: string = "BD conectada";
</script>

<ProjectPanelLayout {title} {subtitle} bleed>
	{#if showDbBanner}
		<DbStatusBanner pingUrl={dbPingUrl} labelOk={dbLabelOk} />
	{/if}

	{#if withTickets}
		<FlexLayout direction="row" items="stretch" style="gap: 1rem; width: 100%; flex: 1 1 auto; min-height: 0; overflow: hidden;">
			<!-- Panel izquierdo (20%): Tickets del proyecto -->
			<div class="custom-scrollbar" style="flex: 0 0 20%; min-width: 0; min-height: 0; overflow: auto;">
				<TicketsSection {proyecto} />
			</div>

			<!-- Panel derecho (80%): contenido específico de la sección -->
			<FlexLayout direction="column" class="custom-scrollbar" style="flex: 1 1 80%; min-width: 0; min-height: 0; overflow: auto;">
				<slot />
			</FlexLayout>
		</FlexLayout>
	{:else}
		<FlexLayout direction="column" class="custom-scrollbar" style="flex: 1 1 auto; min-width: 0; min-height: 0; overflow: auto;">
			<slot />
		</FlexLayout>
	{/if}
</ProjectPanelLayout>
