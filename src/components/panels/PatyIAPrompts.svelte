<script lang="ts">
	import { FlexLayout } from "@ingenieria_insoft/ispsveltecomponents";
	import Accordion from "$comps/containers/Accordion.svelte";
	import BitacoraNote from "../bitacora/BitacoraNote.svelte";
	import md01 from "../../lib/patyia/prompts/01-saludo-otro.md?raw";
	import md02 from "../../lib/patyia/prompts/02-fuera-de-alcance-tecnico.md?raw";
	import md03 from "../../lib/patyia/prompts/03-solicitud-no-permitida.md?raw";
	import md04 from "../../lib/patyia/prompts/04-requiere-contexto.md?raw";
	import md05 from "../../lib/patyia/prompts/05-paso-a-paso.md?raw";
	import md06 from "../../lib/patyia/prompts/06-interpretacion-resultado.md?raw";
	import md07 from "../../lib/patyia/prompts/07-consulta-normativa-negocio.md?raw";
	import md08 from "../../lib/patyia/prompts/08-asesoria-personalizada.md?raw";
	import md09 from "../../lib/patyia/prompts/09-error-tecnico.md?raw";
	import md10 from "../../lib/patyia/prompts/10-error-configuracion.md?raw";
	import md11 from "../../lib/patyia/prompts/11-error-acceso.md?raw";
	import md12 from "../../lib/patyia/prompts/12-error-dian.md?raw";
	import md13 from "../../lib/patyia/prompts/13-comercial.md?raw";

	const prompts: ReadonlyArray<{ title: string; icon: string; md: string }> = [
		{ title: "01. SALUDO_OTRO",                 icon: "mdi:hand-wave",                       md: md01 },
		{ title: "02. FUERA_DE_ALCANCE_TECNICO",    icon: "mdi:alert-circle-outline",            md: md02 },
		{ title: "03. SOLICITUD_NO_PERMITIDA",      icon: "mdi:cancel",                          md: md03 },
		{ title: "04. REQUIERE_CONTEXTO",           icon: "mdi:help-circle-outline",             md: md04 },
		{ title: "05. PASO_A_PASO",                 icon: "mdi:format-list-numbered",            md: md05 },
		{ title: "06. INTERPRETACION_RESULTADO",    icon: "mdi:chart-box-outline",               md: md06 },
		{ title: "07. CONSULTA_NORMATIVA_NEGOCIO",  icon: "mdi:gavel",                           md: md07 },
		{ title: "08. ASESORIA_PERSONALIZADA",      icon: "mdi:account-tie",                     md: md08 },
		{ title: "09. ERROR_TECNICO",               icon: "mdi:bug-outline",                     md: md09 },
		{ title: "10. ERROR_CONFIGURACION",         icon: "mdi:cog-outline",                     md: md10 },
		{ title: "11. ERROR_ACCESO",                icon: "mdi:lock-alert-outline",              md: md11 },
		{ title: "12. ERROR_DIAN",                  icon: "mdi:file-document-alert-outline",     md: md12 },
		{ title: "13. COMERCIAL",                   icon: "mdi:cash-multiple",                   md: md13 },
	];
</script>

<div class="patyia-prompts">
	<FlexLayout direction="column">
		{#each prompts as p}
			<Accordion title={p.title} titleIcon={p.icon}>
				<BitacoraNote flat mdSource={p.md} />
			</Accordion>
		{/each}
	</FlexLayout>
</div>

<style>
	.patyia-prompts {
		display: flex;
		flex-direction: column;
	}
</style>
