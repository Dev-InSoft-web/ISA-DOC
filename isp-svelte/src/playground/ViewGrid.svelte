<script lang="ts">
   import Grid, { type ICtxGrid } from "$lib/base/Grid.svelte";
   import { fly } from "svelte/transition";
   import { TApp, TMyGridController } from "./UlConst";

   let visible: boolean = false;

   let Controller: ICtxGrid<TApp> = new TMyGridController();
</script>

<article>
   <button on:click={() => (visible = !visible)}>
      Grid {visible ? "▲" : "▼"}
   </button>
   {#if visible}
      <div in:fly={{ y: -50 }}>
         <h3>Previsualizacion</h3>
         <div style="height: 400px;">
            <Grid {Controller}></Grid>
         </div>
      </div>
   {/if}
</article>
