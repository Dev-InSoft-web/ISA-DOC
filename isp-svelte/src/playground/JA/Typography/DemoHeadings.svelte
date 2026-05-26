<script lang="ts">
   import H1 from "$lib/primitives/typography/headings/H1.svelte";
   import H2 from "$lib/primitives/typography/headings/H2.svelte";
   import H3 from "$lib/primitives/typography/headings/H3.svelte";
   import H4 from "$lib/primitives/typography/headings/H4.svelte";
   import H5 from "$lib/primitives/typography/headings/H5.svelte";
   import H6 from "$lib/primitives/typography/headings/H6.svelte";
   import GridLayout from "$lib/containers/layout/GridLayout.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { DemoHeadingsAdapter } from "./adapters/DemoHeadingsAdapter";

   const adapter = new DemoHeadingsAdapter();
</script>

<AccordeonDemo {adapter} class="demo-headings-wrapper" title="Headings (H1–H6)" statusText="Aprobado" statusColor="success" titleIcon="mdi:format-header-1" inner>
   <svelte:fragment slot="intro">
      Encabezados <code>H1</code>–<code>H6</code> con color de tema y truncado opcional en varias líneas.
   </svelte:fragment>
   <div slot="preview" let:state let:details let:previewKey style="width: 100%;">
      {#key previewKey}
         <GridLayout cells="1" style="width: 100%;">
            <H1 color={state.color} lines={state.lines}>{details.sampleText} — H1</H1>
            <H2 color={state.color} lines={state.lines}>{details.sampleText} — H2</H2>
            <H3 color={state.color} lines={state.lines}>{details.sampleText} — H3</H3>
            <H4 color={state.color} lines={state.lines}>{details.sampleText} — H4</H4>
            <H5 color={state.color} lines={state.lines}>{details.sampleText} — H5</H5>
            <H6 color={state.color} lines={state.lines}>{details.sampleText} — H6</H6>
         </GridLayout>
      {/key}
   </div>
</AccordeonDemo>
