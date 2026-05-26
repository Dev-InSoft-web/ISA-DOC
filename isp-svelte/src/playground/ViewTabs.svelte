<script lang="ts">
   import TabItem from "$lib/navigation/tabs/TabItem.svelte";
   import Tabs from "$lib/navigation/tabs/Tabs.svelte";
   import TabVerticalContent from "$lib/navigation/tabs/TabVerticalContent.svelte";
   import { fly } from "svelte/transition";

   let visible: boolean = false;
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      Tabs {visible ? "▲" : "▼"}
   </button>
   {#if visible}
      <div in:fly={{ y: -50 }}>
         <h3>Previsualizacion</h3>
         <Tabs>
            <TabItem title="Contacto">Contacto</TabItem>
            <TabItem title="Cliente">Cliente</TabItem>
            <TabItem title="Disable" disabled>Desactivado</TabItem>
         </Tabs>
         <div class="espacio"></div>
         <TabVerticalContent>
            <Tabs>
               <TabItem title="Contacto">Contacto</TabItem>
               <TabItem title="Cliente">Cliente</TabItem>
               <TabItem title="Disable" disabled>Desactivado</TabItem>
            </Tabs>
         </TabVerticalContent>
         <div class="espacio"></div>
         <span style="color: darkorange; font-size: 130%; font-weight: bold;"> Error al anidar un tab horizontal dentro de uno vertical </span>
         <div class="espacio"></div>
         <TabVerticalContent>
            <Tabs>
               <TabItem title="Contacto">
                  <Tabs>
                     <TabItem title="Contacto">Contacto</TabItem>
                     <TabItem title="Cliente">Cliente</TabItem>
                     <TabItem title="Disable" disabled>Desactivado</TabItem>
                  </Tabs>
               </TabItem>
               <TabItem title="Cliente">Cliente</TabItem>
               <TabItem title="Disable" disabled>Desactivado</TabItem>
            </Tabs>
         </TabVerticalContent>
      </div>
   {/if}
</article>

<style>
   div {
      gap: 0.5rem;
   }
   .espacio {
      margin: 16px;
   }
</style>
