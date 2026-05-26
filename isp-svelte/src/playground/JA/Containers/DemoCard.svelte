<script lang="ts">
   import Card from "$lib/containers/Card.svelte";
   import FlexLayout from "$lib/containers/layout/FlexLayout.svelte";
   import Iconify from "$lib/primitives/Iconify.svelte";
   import Text from "$lib/primitives/typography/Text.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import ContainerSurroundPreview from "../_Utils/preview/ContainerSurroundPreview.svelte";
   import { DemoCardAdapter } from "./adapters/DemoCardAdapter";

   const adapter = new DemoCardAdapter();
   let state = adapter.initialState();
   let details = adapter.initialDetails();
   let demoStyle = "";
   let demoClass = "";

   $: relievePacked =
      (Math.round(Number(details.relieve)) & 0x7f) |
      ((Math.min(8, Math.max(0, Number(details.relieveDirIndex) || 0)) & 0xf) << 7) |
      ((Math.min(100, Math.max(0, Math.round(Number(details.elevation) || 0))) & 0x7f) << 11);

   $: cardPreviewVariant = state.variant === "solid" || state.variant === "flat" ? state.variant : undefined;
</script>

<AccordeonDemo {adapter} bind:state bind:details bind:demoStyle bind:demoClass inner statusText="Aprobado" statusColor="success" titleIcon="mdi:credit-card-outline" relieve={65} configBlockCount={3}>
   <svelte:fragment slot="intro">
      Contenedor para agrupar contenido con volumen y sombra: sirve para jerarquizar la pantalla y dar contexto visual sin depender solo del texto. Abajo puedes explorar cómo cambian la forma de la superficie, la sensación de relieve y el modo en que la tarjeta ocupa el espacio (en bloque o en línea con el texto).
   </svelte:fragment>
   <div slot="preview" let:previewKey style="width: 100%;">
      <ContainerSurroundPreview inline={state.inline}>
         {#key previewKey}
            <Card relieve={relievePacked} variant={cardPreviewVariant} inline={state.inline} style={`min-width: min(320px, 100%); max-width: 100%; margin: 1rem; ${demoStyle}`} class={demoClass}>
               <FlexLayout style="width: 100%;">
                  <Iconify icon="mdi:text-box-outline" style="font-size: 1.25rem; line-height: 1; color: var(--is-neutral); flex-shrink: 0; margin-top: 0.1rem; opacity: 0.85;" />
                  <Text color="neutral" style="font-size: 0.9rem; line-height: 1.45; opacity: 0.95;">Texto de ejemplo para la vista previa. Sirve únicamente para ver la tarjeta con contenido; no está ligado a los valores del panel.</Text>
               </FlexLayout>
            </Card>
         {/key}
      </ContainerSurroundPreview>
   </div>
</AccordeonDemo>
