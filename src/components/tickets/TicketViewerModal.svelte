<script lang="ts">
	import { Modal, Switch, FlexLayout, GridLayout } from "@ingenieria_insoft/ispsveltecomponents";
	import CopyButtonIconify from "$comps/actions/CopyButtonIconify.svelte";
	import { getTicketHtml, getTicketTotalEstimadoMin, type TicketRegistro } from "../../lib/tickets";
	import { formatHtml } from "../../lib/format-html";
	import HtmlViewer from "../viewers/HtmlViewer.svelte";

	export let ticket: TicketRegistro | null = null;
	export let bshow: boolean = false;

	let whiteBg: boolean = true;
	let showCode: boolean = false;

	type TicketView = { html: string; prettyHtml: string; totalMin: number };

	async function loadTicketView(t: TicketRegistro): Promise<TicketView> {
		const [html, totalMin] = await Promise.all([
			getTicketHtml(t),
			getTicketTotalEstimadoMin(t).catch(() => 0),
		]);
		return { html, prettyHtml: formatHtml(html), totalMin };
	}

	function ticketLoadError(err: unknown): string {
		const msg = err instanceof Error ? err.message : String(err);
		const html =
			`<p style="font-family:Tahoma;color:#c00;padding:1rem;">` +
			`No se pudo generar el contenido del ticket: ${msg}</p>`;
		return html;
	}

	function getHtmlToCopy(view: TicketView): string {
		return showCode ? view.prettyHtml : view.html;
	}
</script>

{#if ticket}
	<Modal bind:bshow variant="solid" style="width: 95dvw; height: 95dvh;">
		<svelte:fragment slot="title">
			<FlexLayout direction="column" style="gap: 0.15rem; min-width: 0;">
				<strong style="font-size: 0.95rem; line-height: 1.25;">{ticket.id} — {ticket.titulo}</strong>
				<small style="color: gray;">
					{ticket.solicitante} · Solicitud: {ticket.fechaSolicitud}
					{#if ticket.fechaEntrega}· Entrega: {ticket.fechaEntrega}{/if}
				</small>
			</FlexLayout>
		</svelte:fragment>

		<div class="ticket-body">
			{#key ticket.id}
				{#await loadTicketView(ticket)}
					<GridLayout cells="3" items="stretch" style="column-gap: 0.75rem; row-gap: 0.15rem;">
						<small style="color: gray; line-height: 1.3;"><b>Medio:</b> {ticket.normativa.medioAtencion}</small>
						<small style="color: gray; line-height: 1.3;"><b>Tipo de solicitud:</b> {ticket.normativa.tipoSolicitud}</small>
						<small style="color: gray; line-height: 1.3;"><b>Estado:</b> {ticket.normativa.estadoSolicitud}</small>
						<small style="color: gray; line-height: 1.3;"><b>Tipo solución:</b> {ticket.normativa.tipoSolucion}</small>
						<small style="color: gray; line-height: 1.3;"><b>Cobertura:</b> {ticket.normativa.coberturaEstimada}</small>
						<small style="color: gray; line-height: 1.3;"><b>Cierre:</b> {ticket.normativa.cierre}</small>
						<small style="color: gray; line-height: 1.3;"><b>Estimación total (min):</b> —</small>
					</GridLayout>

					{#if ticket.resumen}
						<p class="ticket-resumen"><small><small>{ticket.resumen}</small></small></p>
					{/if}

					<p class="ticket-loading">Generando vista del ticket…</p>
				{:then view}
					<GridLayout cells="3" items="stretch" style="column-gap: 0.75rem; row-gap: 0.15rem;">
						<small style="color: gray; line-height: 1.3;"><b>Medio:</b> {ticket.normativa.medioAtencion}</small>
						<small style="color: gray; line-height: 1.3;"><b>Tipo de solicitud:</b> {ticket.normativa.tipoSolicitud}</small>
						<small style="color: gray; line-height: 1.3;"><b>Estado:</b> {ticket.normativa.estadoSolicitud}</small>
						<small style="color: gray; line-height: 1.3;"><b>Tipo solución:</b> {ticket.normativa.tipoSolucion}</small>
						<small style="color: gray; line-height: 1.3;"><b>Cobertura:</b> {ticket.normativa.coberturaEstimada}</small>
						<small style="color: gray; line-height: 1.3;"><b>Cierre:</b> {ticket.normativa.cierre}</small>
						<small style="color: gray; line-height: 1.3;"><b>Estimación total (min):</b> {view.totalMin || "—"}</small>
					</GridLayout>

					{#if ticket.resumen}
						<p class="ticket-resumen"><small><small>{ticket.resumen}</small></small></p>
					{/if}

					<FlexLayout direction="row" items="center" style="margin-bottom: 0.5rem;">
						<Switch bind:checked={whiteBg} color="primary" colorFalse="neutral" disabled={showCode}><small>Fondo blanco</small></Switch>
						<Switch bind:checked={showCode} color="primary" colorFalse="neutral"><small>Ver código HTML</small></Switch>
					</FlexLayout>

					<div class="ticket-viewer">
						{#if showCode}
							<HtmlViewer value={view.prettyHtml} height="100%" />
							<div class="copy-card" role="group" aria-label="Acciones del contenido">
								<CopyButtonIconify title="Copiar HTML" getText={() => getHtmlToCopy(view)} />
							</div>
						{:else}
							<iframe
								title={ticket.id}
								class="ticket-iframe"
								class:transparent={!whiteBg}
								sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
								srcdoc={view.html}
							></iframe>
						{/if}
					</div>
				{:catch err}
					<GridLayout cells="3" items="stretch" style="column-gap: 0.75rem; row-gap: 0.15rem;">
						<small style="color: gray; line-height: 1.3;"><b>Medio:</b> {ticket.normativa.medioAtencion}</small>
						<small style="color: gray; line-height: 1.3;"><b>Tipo de solicitud:</b> {ticket.normativa.tipoSolicitud}</small>
						<small style="color: gray; line-height: 1.3;"><b>Estado:</b> {ticket.normativa.estadoSolicitud}</small>
						<small style="color: gray; line-height: 1.3;"><b>Tipo solución:</b> {ticket.normativa.tipoSolucion}</small>
						<small style="color: gray; line-height: 1.3;"><b>Cobertura:</b> {ticket.normativa.coberturaEstimada}</small>
						<small style="color: gray; line-height: 1.3;"><b>Cierre:</b> {ticket.normativa.cierre}</small>
						<small style="color: gray; line-height: 1.3;"><b>Estimación total (min):</b> —</small>
					</GridLayout>

					{#if ticket.resumen}
						<p class="ticket-resumen"><small><small>{ticket.resumen}</small></small></p>
					{/if}

					<div class="ticket-viewer">
						<iframe
							title={ticket.id}
							class="ticket-iframe"
							sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
							srcdoc={ticketLoadError(err)}
						></iframe>
					</div>
				{/await}
			{/key}
		</div>
	</Modal>
{/if}

<style>
	.ticket-body {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
		padding: 0.75rem;
		gap: 0.5rem;
	}
	.ticket-loading {
		flex: 1 1 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		color: gray;
		font-size: 0.9rem;
	}
	.ticket-viewer {
		position: relative;
		width: 100%;
		flex: 1 1 0;
		min-height: 0;
		display: flex;
		overflow: hidden;
	}
	.ticket-iframe {
		width: 100%;
		height: 100%;
		flex: 1 1 auto;
		min-height: 0;
		border: 0;
		background: #ffffff;
		display: block;
	}
	.ticket-iframe.transparent {
		background: transparent;
	}
	.copy-card {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		padding: 0.4rem 0.5rem;
		background: var(--is-bg-primary, #ffffff);
		border: 1px solid var(--is-border-color, rgba(0, 0, 0, 0.12));
		border-radius: 0.5rem;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
		z-index: 5;
	}
</style>
