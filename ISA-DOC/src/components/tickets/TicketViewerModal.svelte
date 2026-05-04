<script lang="ts">
	import { Modal } from "@ingenieria_insoft/ispsveltecomponents";
	import { getTicketHtml, type TicketRegistro } from "../../lib/tickets";

	export let ticket: TicketRegistro | null = null;
	export let bshow: boolean = false;

	$: srcdoc = ticket ? getTicketHtml(ticket) : "";
</script>

{#if ticket}
	<Modal bind:bshow variant="solid" style="width: min(960px, 95dvw); height: min(85dvh, 800px);">
		<svelte:fragment slot="title">
			<strong>{ticket.id} — {ticket.titulo}</strong>
		</svelte:fragment>

		<iframe
			title={ticket.id}
			class="ticket-iframe"
			sandbox="allow-same-origin allow-popups"
			{srcdoc}
		></iframe>
	</Modal>
{/if}

<style>
	.ticket-iframe {
		width: min(900px, 90dvw);
		height: min(75dvh, 720px);
		border: 0;
		background: #ffffff;
		display: block;
	}
</style>
