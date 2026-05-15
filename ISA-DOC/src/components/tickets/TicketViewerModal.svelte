<script lang="ts">
	import { Modal, Switch, FlexLayout, GridLayout, ButtonIconify } from "@ingenieria_insoft/ispsveltecomponents";
	import { getTicketHtml, type TicketRegistro } from "../../lib/tickets";
	import { formatHtml } from "../../lib/format-html";
	import HtmlViewer from "../viewers/HtmlViewer.svelte";

	export let ticket: TicketRegistro | null = null;
	export let bshow: boolean = false;

	let whiteBg: boolean = true;
	let showCode: boolean = false;
	let copyState: "idle" | "ok" | "err" = "idle";

	// El cuerpo del ticket ahora se construye de forma asíncrona (los iconos
	// se inlinean como SVG vía `loadIcon`). Resolvemos la promesa cuando
	// cambia el ticket y derivamos `srcdoc`/`prettyHtml` ya como strings.
	let srcdoc: string = "";
	let prettyHtml: string = "";
	$: if (ticket) {
		const t = ticket;
		getTicketHtml(t).then((html) => {
			if (t === ticket) {
				srcdoc = html;
				prettyHtml = formatHtml(html);
			}
		});
	} else {
		srcdoc = "";
		prettyHtml = "";
	}

	async function copyHtml(): Promise<void> {
		const value = showCode ? prettyHtml : srcdoc;
		if (!value) return;
		try {
			await navigator.clipboard.writeText(value);
			copyState = "ok";
		} catch {
			copyState = "err";
		}
		setTimeout(() => (copyState = "idle"), 1500);
	}
</script>

{#if ticket}
	<Modal bind:bshow variant="solid" style="width: min(960px, 95dvw); height: min(85dvh, 800px);">
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
			<GridLayout cells="3" items="stretch" style="column-gap: 0.75rem; row-gap: 0.15rem;">
				<small style="color: gray; line-height: 1.3;"><b>Medio:</b> {ticket.normativa.medioAtencion}</small>
				<small style="color: gray; line-height: 1.3;"><b>Tipo de solicitud:</b> {ticket.normativa.tipoSolicitud}</small>
				<small style="color: gray; line-height: 1.3;"><b>Estado:</b> {ticket.normativa.estadoSolicitud}</small>
				<small style="color: gray; line-height: 1.3;"><b>Tipo solución:</b> {ticket.normativa.tipoSolucion}</small>
				<small style="color: gray; line-height: 1.3;"><b>Cobertura:</b> {ticket.normativa.coberturaEstimada}</small>
				<small style="color: gray; line-height: 1.3;"><b>Cierre:</b> {ticket.normativa.cierre}</small>
				<small style="color: gray; line-height: 1.3;"><b>Estimación (min):</b> {ticket.estimacionMinutos ?? "—"}</small>
			</GridLayout>

			{#if ticket.resumen}
				<p class="ticket-resumen"><small><small>{ticket.resumen}</small></small></p>
			{/if}

			{#if ticket.commits && ticket.commits.length}
				<div class="ticket-commits">
					<small style="color: gray;"><b>Commits relacionados ({ticket.commits.length}):</b></small>
					<GridLayout cells="3" items="stretch" style="column-gap: 0.5rem; row-gap: 0.15rem; margin-top: 0.15rem;">
						{#each ticket.commits as c (c.hash)}
							<small class="commit-item" title={c.descripcion}>
								<code>{c.hash}</code> {c.descripcion}
							</small>
						{/each}
					</GridLayout>
				</div>
			{/if}

			<FlexLayout direction="row" items="center" style="margin-bottom: 0.5rem;">
				<Switch bind:checked={whiteBg} color="primary" colorFalse="neutral" disabled={showCode}><small>Fondo blanco</small></Switch>
				<Switch bind:checked={showCode} color="primary" colorFalse="neutral"><small>Ver código HTML</small></Switch>
			</FlexLayout>

			<div class="ticket-viewer">
			{#if showCode}
				<HtmlViewer value={prettyHtml} height="100%" />
				<div class="copy-card" role="group" aria-label="Acciones del contenido">
					<ButtonIconify
						icon={copyState === "ok" ? "mdi:check" : copyState === "err" ? "mdi:alert" : "mdi:content-copy"}
						title={copyState === "ok" ? "Copiado" : copyState === "err" ? "Error al copiar" : "Copiar HTML"}
						onClick={copyHtml}
					/>
				</div>
			{:else}
				<iframe
					title={ticket.id}
					class="ticket-iframe"
					class:transparent={!whiteBg}
					sandbox="allow-same-origin allow-popups"
					{srcdoc}
				></iframe>
			{/if}
			</div>
		</div>
	</Modal>
{/if}

<style>
	.ticket-body {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		min-height: 0;
		padding: 0.75rem;
		gap: 0.5rem;
	}
	.ticket-viewer {
		position: relative;
		width: 100%;
		flex: 1 1 auto;
		min-height: 0;
		display: flex;
		overflow: hidden;
		/* fallback por si el Modal no es flex-column: descontar header,
		   resumen, switches y paddings del alto disponible */
		max-height: calc(min(85dvh, 800px) - 240px);
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
	.ticket-commits {
		border-top: 1px dashed var(--is-border-color, rgba(0, 0, 0, 0.12));
		padding-top: 0.35rem;
	}
	.commit-item {
		display: block;
		color: gray;
		line-height: 1.25;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.commit-item code {
		background: rgba(0, 0, 0, 0.06);
		padding: 0 0.25rem;
		border-radius: 0.2rem;
		font-size: 0.85em;
	}
</style>
