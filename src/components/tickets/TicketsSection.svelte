<script lang="ts">
	import { Button, FlexLayout, Iconify, H3 } from "@ingenieria_insoft/ispsveltecomponents";
	import RevisadoCheck from "../_comps/actions/RevisadoCheck.svelte";
	import { TICKETS, type TicketRegistro } from "../../lib/tickets";
	import TicketViewerModal from "./TicketViewerModal.svelte";

	export let proyecto: "ClientesIS" | "PatyIA" = "ClientesIS";

	let selected: TicketRegistro | null = null;
	let bshow: boolean = false;

	$: tickets = TICKETS.filter((t) => (t.proyecto ?? "ClientesIS") === proyecto);
	$: ticketKeys = tickets.map((t) => `tickets.${t.id}`);

	function abrir(t: TicketRegistro) {
		selected = t;
		bshow = true;
	}
</script>

<FlexLayout direction="column" style="min-width: 0;">
	<FlexLayout direction="row" items="center" style="gap: 0.4rem; padding: 0.5rem 0.25rem; min-width: 0; line-height: 1;">
		<RevisadoCheck keys={ticketKeys} />
		<H3 style="margin: 0; flex: 1 1 auto; line-height: 1;">Tickets <span style="opacity: 0.7;">({tickets.length})</span></H3>
	</FlexLayout>
	<FlexLayout direction="column">
		{#each tickets as t (t.id)}
			<FlexLayout
				direction="column"
				style="gap: 0.35rem; padding: 0.5rem 0; min-width: 0;"
			>
				<FlexLayout direction="row" items="center" style="gap: 0.4rem; min-width: 0; line-height: 1;">
					<RevisadoCheck key={`tickets.${t.id}`} />
					<strong style="min-width: 0; word-break: break-word; overflow-wrap: anywhere; line-height: 1;">{t.id}</strong>
				</FlexLayout>
				<small style="font-weight: 600; word-break: break-word; overflow-wrap: anywhere; line-height: 1.25;">
					{t.titulo}
				</small>
				<FlexLayout direction="row" items="center" justify="end">
					<Button variant="solid" color="primary" style="width: 100%;" onClick={() => abrir(t)}>
						<Iconify icon="mdi:eye-outline" /> Ver
					</Button>
				</FlexLayout>
			</FlexLayout>
		{/each}
	</FlexLayout>
</FlexLayout>

<TicketViewerModal ticket={selected} bind:bshow />
