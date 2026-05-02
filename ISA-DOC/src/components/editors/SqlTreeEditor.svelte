<script lang="ts">
   import { onDestroy } from "svelte";
   import { FlexLayout, Text, Iconify, Switch, SelectEnum } from "@ingenieria_insoft/ispsveltecomponents";
   import Chip from "../_comps/Chip.svelte";
   import TreeView from "../_comps/TreeView/TreeRowView.svelte";
   import type { ParsedTable } from "../../lib/tableSchema";
   import { COMMON_COLUMN_TYPES } from "../../lib/tableSchema";
   import { SqlTreeAdapter } from "./sql-tree/SqlTreeAdapter";
   import type { TSqlNodeUX } from "./sql-tree/TSqlNodeUX";

   export let table: ParsedTable;
   export let prefix: string = "";
   export let readonly: boolean = false;
   export let onChange: (t: ParsedTable) => void = () => {};

   function tableKey(t: ParsedTable): string {
      return `${t.fragmentId}::${t.originalName}`;
   }

   let lastKey = tableKey(table);
   let adapter: SqlTreeAdapter = createAdapter(table);

   function createAdapter(t: ParsedTable): SqlTreeAdapter {
      lastKey = tableKey(t);
      return new SqlTreeAdapter(t, (next) => onChange(next));
   }

   $: if (tableKey(table) !== lastKey) {
      adapter = createAdapter(table);
   }

   onDestroy(() => {
      // nothing to teardown explicitly; adapters are GC-friendly
   });

   $: baseName = prefix && table.name.startsWith(prefix) ? table.name.slice(prefix.length) : table.name;
   let baseNameDraft = baseName;
   $: baseNameDraft = baseName;

   let auditarChecked: boolean = adapter.auditEnabled;
   let historialChecked: boolean = adapter.historialEnabled;
   let isAutoStack: boolean = adapter.isAutoStackMaster;
   $: {
      void table;
      auditarChecked = adapter.auditEnabled;
      historialChecked = adapter.historialEnabled;
      isAutoStack = adapter.isAutoStackMaster;
   }

   $: if (typeof auditarChecked === "boolean" && auditarChecked !== adapter.auditEnabled) {
      adapter.setAuditEnabled(auditarChecked);
   }
   $: if (typeof historialChecked === "boolean" && isAutoStack && historialChecked !== adapter.historialEnabled) {
      adapter.setHistorialEnabled(historialChecked);
   }

   function commitBaseName(v: string): void {
      const p = prefix && table.name.startsWith(prefix) ? prefix : "";
      const next = (p + v).toUpperCase().replace(/[^A-Z0-9_]/g, "_");
      if (next === table.name) return;
      table.name = next;
      onChange(table);
   }

   function isPk(node: TSqlNodeUX): boolean {
      return !!node.primaryKey || table.compositePrimaryKey.includes(node.rowName);
   }

   function buildTypeEnum(current: string): { [k: string]: string } {
      const out: { [k: string]: string } = {};
      for (const t of COMMON_COLUMN_TYPES) out[t] = t;
      const norm = (current || "").toUpperCase().replace(/\s+/g, "");
      if (norm && !(norm in out)) out[norm] = norm;
      return out;
   }
</script>

<div class="sql-tree-card" class:readonly>
   {#if readonly}
      <div class="readonly-banner">
         <Iconify icon="mdi:lock-outline" />
         <Text color="neutral"><small>Tabla derivada por auto-stack — solo lectura</small></Text>
      </div>
   {/if}
   <FlexLayout items="center" justify="between">
      <div class="name-row">
         <input class="input-field name-input" type="text" bind:value={baseNameDraft} disabled={readonly} on:change={(e) => commitBaseName(e.currentTarget.value)} />
      </div>
      {#if !readonly}
         <Switch bind:checked={auditarChecked} color="primary" colorFalse="neutral">Auditar</Switch>
         {#if isAutoStack}
            <Switch bind:checked={historialChecked} color="primary" colorFalse="neutral">Historial</Switch>
         {/if}
      {/if}
   </FlexLayout>

   <div class="tree-host">
      <TreeView Obj={adapter.obj} itdForm={readonly ? "view" : "edit"} brapido={true} small={false} readonly={readonly} bdrag={!readonly} showToolbar={!readonly} CatalogoController={adapter.catalogoController} TreeController={adapter} objWorking={adapter.objWorking}>
         <svelte:fragment slot="row" let:node>
            {#if node.kind === "section"}
               <FlexLayout items="center" style="flex:1; min-width:0;">
                  <span class="tree-row-index" title="Índice">{node.flatPath}</span>
                  <span class="badge badge-section">Sección</span>
                  <Text style="font-weight:bold;" lines={1}>{node.rowName || "(sin nombre)"}</Text>
               </FlexLayout>
            {:else if node.kind === "optional"}
               <FlexLayout items="center" justify="between" style="flex:1; min-width:0;">
                  <span class="tree-row-index" title="Índice">{node.flatPath}</span>
                  <span class="badge badge-optional">Opcional</span>
                  <Text style="font-weight:bold;" lines={1}>{node.rowName || "(sin nombre)"}</Text>
                  {#if !node.active}
                     <span class="tag tag-hidden">oculta</span>
                  {/if}
               </FlexLayout>
            {:else}
                  <FlexLayout items="stretch" justify="between" style="flex: 1 1 auto; min-width: 0;">
                     <FlexLayout items="center">
                        <span class="tree-row-index" title="Índice">{node.flatPath}</span>
                        <Text lines={1}>{node.rowName || "(columna)"}</Text>
                     </FlexLayout>
                     <FlexLayout items="center">
                        <Text color="neutral" lines={1}><code>{node.colType || "—"}</code></Text>
                        {#if node.nullable === "NOT NULL"}
                           <span class="tag tag-nn">NN</span>
                        {/if}
                        {#if isPk(node)}
                           <span class="tag tag-pk">PK</span>
                        {/if}
                     </FlexLayout>
                  </FlexLayout>
            {/if}
         </svelte:fragment>

         <svelte:fragment slot="Frm" let:frmObj>
            {#if frmObj}
               {#if frmObj.kind === "section"}
                  <div class="frm">
                     <label class="field">
                        <Text color="neutral"><small>Nombre de la sección</small></Text>
                        <input
                           class="input-field"
                           type="text"
                           bind:value={frmObj.rowName}
                           on:input={(e) => {
                              frmObj.rowName = e.currentTarget.value.toUpperCase().replace(/[^A-Z0-9_ ]/g, "_");
                           }}
                        />
                     </label>
                  </div>
               {:else if frmObj.kind === "optional"}
                  <div class="frm">
                     <label class="field">
                        <Text color="neutral"><small>Nombre de la sección opcional</small></Text>
                        <input
                           class="input-field"
                           type="text"
                           bind:value={frmObj.rowName}
                           on:input={(e) => {
                              frmObj.rowName = e.currentTarget.value.toUpperCase().replace(/[^A-Z0-9_ ]/g, "_");
                           }}
                        />
                     </label>
                     <label class="field row">
                        <Switch bind:checked={frmObj.active} color="primary" colorFalse="neutral" />
                        <Text>Activo (incluir en SQL)</Text>
                     </label>
                  </div>
               {:else}
                  <div class="frm">
                     <label class="field">
                        <Text color="neutral"><small>Nombre</small></Text>
                        <input
                           class="input-field"
                           type="text"
                           bind:value={frmObj.rowName}
                           on:input={(e) => {
                              frmObj.rowName = e.currentTarget.value.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
                           }}
                        />
                     </label>
                     <label class="field">
                        <Text color="neutral"><small>Tipo</small></Text>
                        <div class="select-host">
                           <SelectEnum label="Tipo" required={false} enumValue={buildTypeEnum(frmObj.colType)} bind:value={frmObj.colType} />
                        </div>
                     </label>
                     <label class="field row">
                        <input
                           type="checkbox"
                           checked={frmObj.nullable === "NOT NULL"}
                           on:change={(e) => {
                              frmObj.nullable = e.currentTarget.checked ? "NOT NULL" : "";
                           }}
                        />
                        <Text>NOT NULL</Text>
                     </label>
                     <label class="field">
                        <Text color="neutral"><small>DEFAULT</small></Text>
                        <input class="input-field" type="text" bind:value={frmObj.defaultValue} />
                     </label>
                     <label class="field row">
                        <input
                           type="checkbox"
                           checked={!!frmObj.primaryKey}
                           on:change={(e) => {
                              frmObj.primaryKey = e.currentTarget.checked;
                           }}
                        />
                        <Text>PRIMARY KEY</Text>
                     </label>
                     <label class="field">
                        <Text color="neutral"><small>Extra (IDENTITY, CHECK…)</small></Text>
                        <input class="input-field" type="text" bind:value={frmObj.colExtra} />
                     </label>
                  </div>
               {/if}
            {/if}
         </svelte:fragment>
      </TreeView>
   </div>
</div>

<style>
   .sql-tree-card {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;
      max-width: 100%;
      min-width: 0;
      min-height: 0;
      flex: 1 1 auto;
      height: 100%;
   }
   .sql-tree-card.readonly {
      background: var(--is-bg-readonly, rgba(127, 127, 127, 0.08));
   }
   .readonly-banner {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.25rem 0.5rem;
      border: 1px dashed var(--is-b-color);
      border-radius: 4px;
      opacity: 0.85;
   }
   .tree-host {
      display: flex;
      flex-direction: column;
      width: 100%;
      flex: 1 1 auto;
      min-height: 240px;
      border: 1px solid var(--is-b-color);
      border-radius: 0.25rem;
      background: var(--is-bg-primary);
      padding: 0.25rem;
      font-size: 0.85rem;
      overflow: auto;
   }
   .tree-host :global(.trvwr-itm > summary) {
      padding-top: 0.1rem;
      padding-bottom: 0.1rem;
   }
   .tree-host :global(.touch-gestures-body) {
      position: static !important;
      display: flex;
      flex-direction: column;
   }
   .tree-host :global(.isp-tree) {
      display: block !important;
      height: auto !important;
      min-height: 0;
   }
   .name-row {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
   }
   .input-field {
      padding: 0.2rem 0.4rem;
      border: 1px solid var(--is-b-color);
      border-radius: 0.25rem;
      font-family: inherit;
      font-size: 0.9rem;
      background: var(--is-bg-secondary);
      color: var(--is-color);
      outline: none;
   }
   .input-field:focus {
      border-color: var(--is-primary);
   }
   .name-input {
      font-weight: bold;
      min-width: 12rem;
   }
   .field {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
   }
   .field.row {
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
   }
   .select-host {
      width: 100%;
   }
   .select-host :global(select) {
      height: 28px;
      padding: 0 0.4rem;
      font-size: 0.9rem;
      background-color: var(--is-bg-secondary);
      border: 1px solid var(--is-b-color);
      border-radius: 0.25rem;
   }
   .select-host :global(select:focus) {
      border-color: var(--is-primary);
   }
   .select-host :global(label) {
      display: none;
   }
   .frm {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      padding: 1rem;
   }
   .tag {
      padding: 0 0.35rem;
      border-radius: 0.2rem;
      font-size: 0.7rem;
      font-weight: bold;
      line-height: 1.4;
   }
   .tag-nn {
      background: color-mix(in srgb, var(--is-info) 25%, transparent);
      color: var(--is-info);
   }
   .tag-pk {
      background: color-mix(in srgb, var(--is-success) 25%, transparent);
      color: var(--is-success);
   }
   .tag-hidden {
      background: color-mix(in srgb, var(--is-neutral) 25%, transparent);
      color: var(--is-neutral);
   }
   .badge {
      padding: 0.1rem 0.4rem;
      border-radius: 0.2rem;
      font-size: 0.75rem;
      font-weight: bold;
   }
   .tree-row-index {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.5rem;
      height: 1.1rem;
      padding: 0 0.35rem;
      border-radius: 0.6rem;
      background: color-mix(in srgb, var(--is-text-neutral, #888) 18%, transparent);
      color: var(--is-text-neutral, #666);
      font-size: 0.7rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      flex: 0 0 auto;
   }
   .badge-section {
      background: color-mix(in srgb, var(--is-warning) 25%, transparent);
      color: var(--is-warning);
   }
   .badge-optional {
      background: color-mix(in srgb, var(--is-info) 25%, transparent);
      color: var(--is-info);
   }
</style>
