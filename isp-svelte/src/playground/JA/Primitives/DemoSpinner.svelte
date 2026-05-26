<script lang="ts">
   import type { ComponentColor } from "$lib/UlConst";
   import FlexLayout from "$lib/containers/layout/FlexLayout.svelte";
   import Spinner from "$lib/primitives/Spinner.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { DemoSpinnerAdapter } from "./adapters/DemoSpinnerAdapter";

   const adapter = new DemoSpinnerAdapter();
   let state = adapter.initialState();
   let demoStyle = "";
   let demoClass = "";

   $: spinnerColor = (!state.color ? "neutral" : state.color) as ComponentColor;
</script>

<AccordeonDemo {adapter} bind:state bind:demoStyle bind:demoClass inner statusText="Aprobado" statusColor="success" titleIcon="mdi:loading">
   <svelte:fragment slot="intro">
      Indicador de carga: si no eliges color (<code>Ninguno</code>), el valor por defecto es <code>neutral</code>; escala con el tamaño de fuente del contenedor.
   </svelte:fragment>
   <FlexLayout slot="preview" let:previewKey justify="center" items="center" style="min-height: 100px; width: 100%; font-size: 2.25rem;">
      {#key previewKey}
         <div style={demoStyle} class={demoClass}>
            <Spinner color={spinnerColor} />
         </div>
      {/key}
   </FlexLayout>
</AccordeonDemo>
