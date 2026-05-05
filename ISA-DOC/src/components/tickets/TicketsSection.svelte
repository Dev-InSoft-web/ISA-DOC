<script lang="ts">
	import { Button, FlexLayout, Iconify, Text } from "@ingenieria_insoft/ispsveltecomponents";
	import Accordion from "../_comps/containers/Accordion.svelte";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import { TICKETS, type TicketRegistro } from "../../lib/tickets";
	import TicketViewerModal from "./TicketViewerModal.svelte";

	let selected: TicketRegistro | null = null;
	let bshow: boolean = false;

	const ticketKeys: string[] = TICKETS.map((t) => `tickets.${t.id}`);

	function abrir(t: TicketRegistro) {
		selected = t;
		bshow = true;
	}
</script>

<Accordion title="Tickets" titleIcon="mdi:ticket-confirmation-outline" count={TICKETS.length} open={false}>
	<RevisadoCheck slot="title-extra" keys={ticketKeys} />
	<FlexLayout direction="column" style="padding: 0.5rem;">
		{#each TICKETS as t (t.id)}
			<FlexLayout
				direction="row"
				items="center"
				justify="between"
				style="padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--is-outline, #ddd);"
			>
				<FlexLayout direction="column">
					<FlexLayout direction="row" items="center">
						<Iconify icon="mdi:ticket-outline" />
						<strong style="margin-left: 0.4rem;">{t.id}</strong>
						<span style="margin-left: 0.6rem;">— {t.titulo}</span>
					</FlexLayout>
					<Text color="neutral">
						<small>
							{t.solicitante} · Solicitud: {t.fechaSolicitud}
							{#if t.fechaEntrega}· Entrega: {t.fechaEntrega}{/if}
						</small>
					</Text>
				</FlexLayout>

				<FlexLayout direction="row" items="center" style="gap: 0.5rem; width: fit-content;">
					<RevisadoCheck key={`tickets.${t.id}`} />
					<Button variant="solid" color="primary" style="width: fit-content;" onClick={() => abrir(t)}>
						<Iconify icon="mdi:eye-outline" /> Ver
					</Button>
				</FlexLayout>
			</FlexLayout>
		{/each}
	</FlexLayout>
</Accordion>

<TicketViewerModal ticket={selected} bind:bshow />
