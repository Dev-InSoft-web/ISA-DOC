<script lang="ts">
   import ButtonIconify from "$lib/primitives/iconized/ButtonIconify.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { DemoIconButtonAdapter } from "./adapters/DemoIconButtonAdapter";

   const adapter = new DemoIconButtonAdapter();
</script>

<AccordeonDemo {adapter} statusText="Aprobado" statusColor="success" titleIcon="mdi:cursor-default-click" configBlockCount={4} inner>
   <svelte:fragment slot="intro">
      Botón compacto solo icono: forma (<code>circle</code> / <code>square</code>), variante, color y estados.
   </svelte:fragment>
   <div slot="preview" let:state let:previewKey let:demoStyle let:demoClass style="width: fit-content;">
      {#key previewKey}
         <ButtonIconify
            icon={state.icon}
            color={state.color}
            variant={state.variant}
            shape={state.shape || undefined}
            disabled={state.disabled}
            loading={state.loading}
            style={`width: fit-content; ${demoStyle}`}
            class={demoClass}
         />
      {/key}
   </div>
</AccordeonDemo>
