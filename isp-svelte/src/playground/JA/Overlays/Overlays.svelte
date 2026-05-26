<script lang="ts">
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { statusDotsFor } from "../_Utils/demoStatus";
   import DemoOverlayModal from "./DemoOverlayModal.svelte";
   import DemoOverlayLoading from "./DemoOverlayLoading.svelte";
   import DemoOverlayActionDrawer from "./DemoOverlayActionDrawer.svelte";

   export let open = false;
</script>

<AccordeonDemo bind:open title="Overlays" titleIcon="mdi:layers-triple-outline" qDemos={3} statusDots={statusDotsFor(["OverlayModal", "OverlayActionDrawer", "OverlayLoading"])}>
   <svelte:fragment slot="intro">
      Capas sobre el contenido: diálogos modales, cajones de acción e indicadores de carga sin perder el contexto de la vista.
   </svelte:fragment>
   <DemoOverlayModal />
   <DemoOverlayActionDrawer />
   <DemoOverlayLoading />
</AccordeonDemo>
