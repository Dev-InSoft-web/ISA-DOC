<script lang="ts">
   import { CatalogoGen } from "$lib";
   import { fly } from "svelte/transition";
   import { TMyCatalogoController } from "./UlConst";

   let visible: boolean = false;

   let Controller: TMyCatalogoController = new TMyCatalogoController();
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      Catalogo Gen {visible ? "▲" : "▼"}
   </button>
   {#if visible}
      <div in:fly={{ y: -50 }}>
         <h3>Previsualizacion</h3>
         <CatalogoGen {Controller}></CatalogoGen>
      </div>
   {/if}
</article>
