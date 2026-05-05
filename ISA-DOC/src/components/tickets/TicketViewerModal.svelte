<script lang="ts">
	import { Modal, Switch, FlexLayout, ButtonIconify } from "@ingenieria_insoft/ispsveltecomponents";
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
			<strong>{ticket.id} — {ticket.titulo}</strong>
		</svelte:fragment>

		<FlexLayout direction="row" items="center" style="margin-bottom: 0.5rem;">
			<Switch bind:checked={whiteBg} color="primary" colorFalse="neutral" disabled={showCode}>Fondo blanco</Switch>
			<Switch bind:checked={showCode} color="primary" colorFalse="neutral">Ver código HTML</Switch>
		</FlexLayout>

		<div class="ticket-viewer">
			{#if showCode}
				<HtmlViewer value={prettyHtml} height="min(70dvh, 680px)" />
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
	</Modal>
{/if}

<style>
	.ticket-viewer {
		position: relative;
	}
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
