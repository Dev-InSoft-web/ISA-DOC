<!--
	DailySummaryAccordion.svelte
	===========================
	Accordion contenedor para el "Resumen del día" de la bitácora con CUATRO
	bloques predefinidos en orden estándar:

	1. Proyecto ISA-DOC                      → slot `isa`
	2. ISW / ISP ClientesIS                  → slot `isw-isp`
	3. ISP-ClientesISServer / ISS-...        → slot `iss`
	4. Avances ContaPymeU (sin ISA-DOC)      → slot `seguimiento`

	Cada slot recibe el `mdSource` (texto markdown) del resumen de ese ámbito,
	y el componente lo envuelve con `BitacoraNote` aplicando título y `inner`.

	Uso típico (en `BitacoraPanel.svelte`):

	    <DailySummaryAccordion
	        date="2026-05-08"
	        title="2026-05-08 — Capacitación: refactor TreeView…"
	        open
	        mdIsa={md_2026_05_08_isa}
	        mdIswIsp={md_2026_05_08_isw_isp}
	        mdIss={md_2026_05_08_iss}
	        mdSeguimiento={md_2026_05_08_seguimiento}
	    />

	Si un día concreto necesita inyectar contenido extra (acordeones de
	migración, ejecutores SQL, etc.), se pasan vía `<svelte:fragment slot="extra">`
	o usando los `<svelte:fragment slot="title-extra" />` para el header.
-->
<script lang="ts">
	import Accordion from "../_comps/containers/Accordion.svelte";
	import BitacoraNote from "./BitacoraNote.svelte";

	export let title: string;
	export let titleIcon: string = "mdi:calendar";
	export let open: boolean = true;

	// Markdown sources de cada bloque. Si alguno se omite, el bloque no se
	// renderiza (útil para días sin actividad en ese ámbito).
	export let mdIsa: string | undefined = undefined;
	export let mdIsp: string | undefined = undefined;
	export let mdIswIsp: string | undefined = undefined;
	export let mdIss: string | undefined = undefined;
	export let mdSeguimiento: string | undefined = undefined;

	// Permite alterar el título del accordion interno "Resumen del día".
	export let resumenTitle: string = "Resumen del día";
	export let resumenIcon: string = "mdi:notebook-edit-outline";
	export let resumenOpen: boolean = true;
</script>

<Accordion {title} {titleIcon} bind:open>
	<slot name="title-extra" slot="title-extra" />

	<Accordion title={resumenTitle} titleIcon={resumenIcon} open={resumenOpen} inner>
		{#if mdIsa}
			<BitacoraNote title="Proyecto ISA-DOC" mdSource={mdIsa} inner />
		{/if}
		{#if mdIsp}
			<BitacoraNote title="ISP-SvelteComponents" mdSource={mdIsp} inner />
		{/if}
		{#if mdIswIsp}
			<BitacoraNote title="ISW / ISP ClientesIS" mdSource={mdIswIsp} inner />
		{/if}
		{#if mdIss}
			<BitacoraNote
				title="ISP-ClientesISServer / ISS-ClientesIS-ContaPymeU"
				mdSource={mdIss}
				inner
			/>
		{/if}
		{#if mdSeguimiento}
			<BitacoraNote
				title="Avances ContaPymeU (sin ISA-DOC)"
				mdSource={mdSeguimiento}
				inner
			/>
		{/if}
	</Accordion>

	<slot />
</Accordion>
