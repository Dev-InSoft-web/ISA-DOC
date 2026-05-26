<script lang="ts">
   import Iconify from "$lib/primitives/Iconify.svelte";
   import { FlexLayout, Loading } from "$lib";
   import ButtonFit from "../_Utils/controls/ButtonFit.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { DemoOverlayLoadingAdapter } from "./adapters/DemoOverlayLoadingAdapter";

   const adapter = new DemoOverlayLoadingAdapter();

   let loadingShow = false;

   const triggerTimed = (): void => {
      loadingShow = true;
      setTimeout(() => {
         loadingShow = false;
      }, 3000);
   };
</script>

<AccordeonDemo {adapter} inner statusText="Aprobado" statusColor="success" titleIcon="mdi:loading">
   <svelte:fragment slot="intro">
      Indicador a pantalla completa durante operaciones largas; color coherente con el tema.
   </svelte:fragment>
   <FlexLayout slot="preview" let:state let:previewKey let:demoStyle let:demoClass direction="column" justify="center" items="center" style="width: 100%; min-height: 120px;">
      <ButtonFit onClick={triggerTimed}>
         <Iconify slot="icon" icon="mdi:loading" />
         Ejecutar carga (3 s)
      </ButtonFit>
      {#key previewKey}
         <Loading bind:bShow={loadingShow} color={state.color} style={demoStyle} class={demoClass} />
      {/key}
   </FlexLayout>
</AccordeonDemo>
