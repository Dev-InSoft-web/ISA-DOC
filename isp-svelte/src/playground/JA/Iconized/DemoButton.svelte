<script lang="ts">
   import Button from "$lib/primitives/iconized/Button.svelte";
   import Iconify from "$lib/primitives/Iconify.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { DemoButtonAdapter } from "./adapters/DemoButtonAdapter";

   const adapter = new DemoButtonAdapter();
</script>

<AccordeonDemo {adapter} statusText="Aprobado" statusColor="success" titleIcon="mdi:gesture-tap" inner>
   <svelte:fragment slot="intro">
      Botón con variante, color, tipo (<code>button</code> / <code>submit</code> / <code>reset</code>), icono opcional y estados deshabilitado o carga.
   </svelte:fragment>
   <div slot="preview" let:state let:details let:previewKey let:demoStyle let:demoClass style="width: fit-content;">
      {#key previewKey}
         <Button
            variant={state.variant}
            color={state.color}
            type={state.type}
            disabled={state.disabled}
            loading={state.loading}
            style={`width: fit-content; ${demoStyle}`}
            class={demoClass}
         >
            {#if details.icon}
               <Iconify slot="icon" icon={details.icon as string} />
            {/if}
            {details.text}
         </Button>
      {/key}
   </div>
</AccordeonDemo>
