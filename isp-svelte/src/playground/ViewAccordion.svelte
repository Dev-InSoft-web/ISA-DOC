<script lang="ts">
   import Accordion from "$lib/navigation/accordion/Accordion.svelte";
   import AccordionItem from "$lib/navigation/accordion/AccordionItem.svelte";
   import { fly } from "svelte/transition";

   let visible: boolean = false;
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      Accordion {visible ? "▲" : "▼"}
   </button>
   {#if visible}
      <div in:fly={{ y: -50 }}>
         <h3>Previsualizacion</h3>
         <Accordion>
            <AccordionItem title="Contacto">Contacto</AccordionItem>

            <AccordionItem title="Desactivado" disabled>Desactivado</AccordionItem>
         </Accordion>
      </div>
   {/if}
</article>
