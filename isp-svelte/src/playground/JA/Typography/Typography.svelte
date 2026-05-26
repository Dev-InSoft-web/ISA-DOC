<script lang="ts">
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { statusDotsFor } from "../_Utils/demoStatus";
   import DemoHeadings from "./DemoHeadings.svelte";
   import DemoText from "./DemoText.svelte";

   export let open = false;
</script>

<AccordeonDemo bind:open title="Typography" titleIcon="mdi:format-text" qDemos={2} statusDots={statusDotsFor(["Text", "Headings"])}>
   <svelte:fragment slot="intro">
      Jerarquía y contenido textual: párrafos con color y truncado, encabezados <code>H1</code>–<code>H6</code>.
   </svelte:fragment>
   <DemoText />
   <DemoHeadings />
</AccordeonDemo>
