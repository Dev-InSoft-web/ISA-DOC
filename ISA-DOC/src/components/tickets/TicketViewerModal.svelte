<script lang="ts">
	import { Modal, Switch, FlexLayout } from "@ingenieria_insoft/ispsveltecomponents";
	import { getTicketHtml, type TicketRegistro } from "../../lib/tickets";
	import { formatHtml } from "../../lib/format-html";
	import HtmlViewer from "../viewers/HtmlViewer.svelte";

	export let ticket: TicketRegistro | null = null;
	export let bshow: boolean = false;

	let whiteBg: boolean = true;
	let showCode: boolean = false;

	$: srcdoc = ticket ? getTicketHtml(ticket) : "";
	$: prettyHtml = srcdoc ? formatHtml(srcdoc) : "";
</script>

{#if ticket}
	<Modal bind:bshow variant="solid" style="width: min(960px, 95dvw); height: min(85dvh, 800px);">
		<svelte:fragment slot="title">
			<strong>{ticket.id} — {ticket.titulo}</strong>
		</svelte:fragment>

		<FlexLayout direction="row" items="center" style="margin-bottom: 0.5rem;">
			<Switch bind:checked={whiteBg} color="primary" colorFalse="neutral" disabled={showCode}>Fondo blanco</Switch>
			<Switch bind:checked={showCode} color="primary" colorFalse="neutral">Ver código HTML</Switch>
		</FlexLayout>

		{#if showCode}
			<HtmlViewer value={prettyHtml} height="min(70dvh, 680px)" />
		{:else}
			<iframe
				title={ticket.id}
				class="ticket-iframe"
				class:transparent={!whiteBg}
				sandbox="allow-same-origin allow-popups"
				{srcdoc}
			></iframe>
		{/if}
	</Modal>
{/if}

<style>
	.ticket-iframe {
		width: min(900px, 90dvw);
		height: min(70dvh, 680px);
		border: 0;
		background: #ffffff;
		display: block;
	}
	.ticket-iframe.transparent {
		background: transparent;
	}
</style>
