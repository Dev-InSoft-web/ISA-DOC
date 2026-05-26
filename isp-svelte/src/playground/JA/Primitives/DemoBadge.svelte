<script lang="ts">
   import Badge from "$lib/primitives/Badge.svelte";
   import Iconify from "$lib/primitives/Iconify.svelte";
   import AccordeonDemo from "../_Utils/accordion/AccordeonDemo.svelte";
   import { DemoBadgeAdapter } from "./adapters/DemoBadgeAdapter";

   const adapter = new DemoBadgeAdapter();
</script>

<AccordeonDemo {adapter} statusText="sin revisión" statusColor="danger" titleIcon="mdi:label-outline" inner>
   <svelte:fragment slot="intro">
      Etiqueta/chip informativo con variante, color, forma, ícono opcional y modificador <code>uppercase</code>.
   </svelte:fragment>
   <div slot="preview" let:state let:details let:previewKey let:demoStyle let:demoClass style="width: fit-content;">
      {#key previewKey}
         <Badge
            variant={state.variant}
            color={state.color}
            shape={state.shape}
            uppercase={state.uppercase}
            style={demoStyle}
            class={demoClass}
         >
            {#if details.icon}
               <Iconify slot="icon" icon={details.icon as string} />
            {/if}
            {details.text}
         </Badge>
      {/key}
   </div>
</AccordeonDemo>
