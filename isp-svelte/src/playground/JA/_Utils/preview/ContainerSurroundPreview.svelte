<script lang="ts">
   import Badge from "$lib/primitives/Badge.svelte";
   export let inline = false;
</script>

{#if inline}
   <slot name="after-prev" />
   <slot />
   <Badge icon="mdi:arrow-left" variant="ghost" color="neutral" shape="pill" uppercase>contenido posterior</Badge>
{:else}
   {#if $$slots["after-prev"]}
      <div class="container-surround-after-prev">
         <slot name="after-prev" />
      </div>
   {/if}
   <slot />
   <div class="cs-marker cs-marker--post">
      <Badge icon="mdi:arrow-up" variant="ghost" color="neutral" shape="pill" uppercase>contenido posterior</Badge>
   </div>
{/if}

<style>
   .container-surround-after-prev {
      box-sizing: border-box;
      margin-bottom: 0.65rem;
      max-width: 100%;
      width: 100%;
   }
   .cs-marker--post { margin-top: 0.7rem; }
</style>
