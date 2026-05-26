<script lang="ts">
   import FlexLayout from "$lib/containers/layout/FlexLayout.svelte";
   import Iconify from "$lib/primitives/Iconify.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { DemoIconifyAdapter } from "./adapters/DemoIconifyAdapter";

   const adapter = new DemoIconifyAdapter();
</script>

<AccordeonDemo {adapter} inner statusText="Aprobado" statusColor="success" titleIcon="mdi:vector-square">
   <svelte:fragment slot="intro">Icono vectorial (MDI, emoji, etc.) con rotación, espejo horizontal/vertical y estado de carga.</svelte:fragment>
   <FlexLayout slot="preview" let:state let:previewKey let:demoStyle let:demoClass justify="center" items="center" style="min-height: 100px; width: 100%; font-size: 3em;">
      {#key previewKey}
         <Iconify {...state} style={demoStyle} class={demoClass} />
      {/key}
   </FlexLayout>
</AccordeonDemo>
