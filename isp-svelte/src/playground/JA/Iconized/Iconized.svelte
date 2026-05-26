<script lang="ts">
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { statusDotsFor } from "../_Utils/demoStatus";
   import DemoButton from "./DemoButton.svelte";
   import DemoIconButton from "./DemoIconButton.svelte";
   import DemoCheckboxIcon from "./DemoCheckboxIcon.svelte";
   import DemoSwitch from "./DemoSwitch.svelte";

   export let open = false;
</script>

<AccordeonDemo bind:open title="Iconized" titleIcon="mdi:gesture-tap-button" qDemos={4} statusDots={statusDotsFor(["Button", "IconButton", "CheckboxIcon", "Switch"])}>
   <svelte:fragment slot="intro">
      Controles compactos con icono: botones, casillas e interruptores que combinan acción y feedback visual en poco espacio.
   </svelte:fragment>
   <DemoButton />
   <DemoIconButton />
   <DemoCheckboxIcon />
   <DemoSwitch />
</AccordeonDemo>
