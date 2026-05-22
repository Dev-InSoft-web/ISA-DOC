<script lang="ts">
	import { FlexLayout, H3 } from "@ingenieria_insoft/ispsveltecomponents";
	import TicketsSection from "../tickets/TicketsSection.svelte";
	import DbStatusBanner from "../_comps/status/DbStatusBanner.svelte";

	export let title: string;
	export let proyecto: "ClientesIS" | "PatyIA" = "ClientesIS";
	export let showDbBanner: boolean = true;
</script>

<FlexLayout direction="column" style="padding: 0; flex: 1 1 auto; min-height: 0; height: 100%; overflow: hidden;">
	<H3>{title}</H3>
	{#if showDbBanner}
		<DbStatusBanner />
	{/if}

	<FlexLayout direction="row" items="stretch" style="gap: 1rem; width: 100%; flex: 1 1 auto; min-height: 0; overflow: hidden;">
		<!-- Panel izquierdo (20%): Tickets del proyecto -->
		<div class="custom-scrollbar" style="flex: 0 0 20%; min-width: 0; min-height: 0; overflow: auto;">
			<TicketsSection {proyecto} />
		</div>

		<!-- Panel derecho (80%): contenido específico del proyecto -->
		<FlexLayout direction="column" class="custom-scrollbar" style="flex: 1 1 80%; min-width: 0; min-height: 0; overflow: auto;">
			<slot />
		</FlexLayout>
	</FlexLayout>
</FlexLayout>
