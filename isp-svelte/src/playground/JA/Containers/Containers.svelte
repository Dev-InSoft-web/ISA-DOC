<script lang="ts">
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { statusDotsFor } from "../_Utils/demoStatus";
   import DemoCard from "./DemoCard.svelte";

   export let open = false;
</script>

<AccordeonDemo bind:open title="Contenedores" titleIcon="mdi:package-variant-closed" qDemos={1} statusDots={statusDotsFor(["Card"])}>
   <svelte:fragment slot="intro">
      Superficies: <code>Card</code> para agrupar contenido con relieve y sombra.
   </svelte:fragment>
   <DemoCard />
</AccordeonDemo>
