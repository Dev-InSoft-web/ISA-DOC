<script lang="ts">
   /**
    * ProjectPanelLayout
    * Shell común para todos los paneles de proyecto (SQL, Bitácora, Postman, Docs, Actions).
    * Provee:
    *   - Encabezado opcional (título + subtítulo + slot "actions")
    *   - Área de contenido scrollable
    *   - Estados estándar: loading / error / empty (mutuamente excluyentes)
    *
    * Usa la paleta global (`--is-*`) para mantener consistencia visual entre proyectos.
    */

   export let title: string = "";
   export let subtitle: string = "";
   export let loading: boolean = false;
   export let error: string = "";
   export let empty: boolean = false;
   export let emptyText: string = "Sin datos disponibles.";
   /** Si es true el contenido NO tiene padding interno (útil cuando un panel define el suyo). */
   export let bleed: boolean = false;
</script>

<section class="ipl" class:ipl-bleed={bleed}>
   {#if title || $$slots.actions}
      <header class="ipl-head">
         <div class="ipl-titles">
            {#if title}<h1 class="ipl-title">{title}</h1>{/if}
            {#if subtitle}<p class="ipl-subtitle">{subtitle}</p>{/if}
         </div>
         {#if $$slots.actions}
            <div class="ipl-actions">
               <slot name="actions" />
            </div>
         {/if}
      </header>
   {/if}

   <div class="ipl-body">
      {#if loading}
         <div class="ipl-state ipl-loading">Cargando…</div>
      {:else if error}
         <div class="ipl-state ipl-error">
            <strong>Error:</strong> {error}
         </div>
      {:else if empty}
         <div class="ipl-state ipl-empty">{emptyText}</div>
      {:else}
         <slot />
      {/if}
   </div>
</section>

<style>
   .ipl {
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      flex-direction: column;
      background: var(--is-bg-primary);
      color: var(--is-color);
   }

   .ipl-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.75rem 0.25rem 0.65rem;
      border-bottom: 1px solid var(--is-b-color);
      margin-bottom: 0.75rem;
   }

   .ipl-titles {
      min-width: 0;
   }

   .ipl-title {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--is-color);
   }

   .ipl-subtitle {
      margin: 0.15rem 0 0;
      font-size: 0.8rem;
      opacity: 0.7;
   }

   .ipl-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
   }

   .ipl-body {
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
   }

   .ipl-bleed .ipl-body {
      overflow: hidden;
   }

   .ipl-state {
      padding: 1.25rem;
      font-size: 0.85rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      opacity: 0.8;
   }

   .ipl-error {
      color: var(--is-error);
      opacity: 1;
   }
</style>
