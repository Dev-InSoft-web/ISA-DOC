<script lang="ts">
	import { FlexLayout, H2 } from "@ingenieria_insoft/ispsveltecomponents";
	import TicketsSection from "../tickets/TicketsSection.svelte";
</script>

<FlexLayout direction="column" style="padding: 1rem; gap: 1rem; min-width: 0;">
	<H2 style="margin: 0;">PatyIA — Bitácora</H2>
	<small style="opacity: 0.75;">Tickets asignados al proyecto Paty IA.</small>
	<TicketsSection proyecto="PatyIA" />
</FlexLayout>
