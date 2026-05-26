<script lang="ts">
   import Text from "$lib/primitives/typography/Text.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { DemoTextAdapter } from "./adapters/DemoTextAdapter";

   const adapter = new DemoTextAdapter();
   let state = adapter.initialState();
   let details = adapter.initialDetails();
   let demoStyle = "";
   let demoClass = "";

   $: textLines = Math.max(0, Math.floor(Number(state.lines)));
</script>

<AccordeonDemo {adapter} bind:state bind:details bind:demoStyle bind:demoClass inner statusText="Aprobado" statusColor="success" titleIcon="mdi:text-long" configBlockCount={2}>
   <svelte:fragment slot="intro">
      Párrafo con color semántico opcional y <code>lines</code> para truncar por número de líneas.
   </svelte:fragment>
   <div slot="preview" let:previewKey style="width: 100%; min-width: 0;">
      <div style="min-width: 0; width: 100%; min-height: 250px; box-sizing: border-box;">
         {#key previewKey}
            <Text color={state.color} lines={textLines} style={demoStyle} class={demoClass}>{details.sampleText}</Text>
         {/key}
      </div>
   </div>
</AccordeonDemo>
