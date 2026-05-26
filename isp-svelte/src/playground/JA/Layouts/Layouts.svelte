<script lang="ts">
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { statusDotsFor } from "../_Utils/demoStatus";
   import DemoBlockLayout from "./DemoBlockLayout.svelte";
   import DemoFlexLayout from "./DemoFlexLayout.svelte";
   import DemoGridLayout from "./DemoGridLayout.svelte";

   export let open = false;
</script>

<AccordeonDemo bind:open title="Layouts" titleIcon="mdi:view-dashboard-outline" qDemos={3} statusDots={statusDotsFor(["BlockLayout", "FlexLayout", "GridLayout"])}>
   <svelte:fragment slot="intro">
      Organización de la interfaz: <code>BlockLayout</code> (tamaño responsive), <code>FlexLayout</code> y <code>GridLayout</code>. Las superficies (<code>Card</code>) están en la sección Contenedores.
   </svelte:fragment>
   <DemoBlockLayout />
   <DemoFlexLayout />
   <DemoGridLayout />
</AccordeonDemo>
