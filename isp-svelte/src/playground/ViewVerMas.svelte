<script lang="ts">
   import BtnVerMas from "$lib/form/BtnVerMas.svelte";
   import { fly } from "svelte/transition";

   let visible: boolean = false;
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      Boton ver mas {visible ? "▲" : "▼"}
   </button>
   {#if visible}
      <div in:fly={{ y: -50 }}>
         <h3>Previsualizacion</h3>
         <BtnVerMas
            onclick={() => {
               console.log(123);
            }}
         ></BtnVerMas>
      </div>
   {/if}
</article>

<style>
   article {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 1rem;
   }

   button {
      cursor: pointer;
      text-align: left;
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 700;
      color: rgb(2, 132, 199);
   }

   div {
      gap: 0.5rem;
   }
</style>
