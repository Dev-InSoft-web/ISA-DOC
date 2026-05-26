<script lang="ts">
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { statusDotsFor } from "../_Utils/demoStatus";
   import DemoBadge from "./DemoBadge.svelte";
   import DemoIconify from "./DemoIconify.svelte";
   import DemoSpinner from "./DemoSpinner.svelte";

   export let open = false;
</script>

<AccordeonDemo bind:open title="Primitives" titleIcon="mdi:atom" qDemos={3} statusDots={statusDotsFor(["Badge", "Iconify", "Spinner"])}>
   <svelte:fragment slot="intro">
      Átomos visuales reutilizados por el resto de componentes: etiquetas tipo badge, iconografía vectorial e indicador de carga.
   </svelte:fragment>
   <DemoBadge />
   <DemoIconify />
   <DemoSpinner />
</AccordeonDemo>
