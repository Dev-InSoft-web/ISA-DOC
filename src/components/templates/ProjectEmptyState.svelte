<script lang="ts">
   /**
    * ProjectEmptyState
    * Vista estándar para pestañas sin contenido aún (proyectos en construcción).
    * Usa la paleta global `--is-*` para verse igual entre proyectos.
    */

   export let project: string = "";
   export let tab: string = "";
   export let message: string = "Esta sección aún no tiene contenido.";
   export let icon: string = "📄";
</script>

<div class="empty-state">
   <div class="empty-inner">
      <div class="empty-icon">{icon}</div>
      {#if project || tab}
         <h2 class="empty-title">
            {#if project}{project}{/if}{#if project && tab} — {/if}{#if tab}{tab}{/if}
         </h2>
      {/if}
      <p class="empty-msg">{message}</p>
      <p class="empty-hint">Próximamente.</p>
   </div>
</div>

<style>
   .empty-state {
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: var(--is-bg-primary);
      color: var(--is-color);
   }
   .empty-inner {
      max-width: 480px;
      text-align: center;
      padding: 1.5rem 2rem;
      background: var(--is-bg-secondary);
      border: 1px solid var(--is-b-color);
      border-radius: 8px;
   }
   .empty-icon {
      font-size: 2.25rem;
      margin-bottom: 0.5rem;
      opacity: 0.75;
   }
   .empty-title {
      margin: 0 0 0.5rem;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--is-primary);
   }
   .empty-msg {
      margin: 0;
      font-size: 0.9rem;
      line-height: 1.5;
      opacity: 0.85;
   }
   .empty-hint {
      margin: 0.75rem 0 0;
      font-size: 0.75rem;
      opacity: 0.55;
      text-transform: uppercase;
      letter-spacing: 0.08em;
   }
</style>
