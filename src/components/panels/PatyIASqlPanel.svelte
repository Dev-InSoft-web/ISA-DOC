<script lang="ts">
   import { onMount } from "svelte";
   import {
      ButtonIconify,
      Card,
      FlexLayout,
      H2,
      Iconify,
      Text,
      Toaster,
      toastError,
      toastSuccess,
   } from "@ingenieria_insoft/ispsveltecomponents";

   import TreeView from "$comps/TreeViewLegacy/TreeRowView.svelte";

   import { PatyiaSqlAdapter, type PatyiaTableSelect } from "./patyia-sql-browser/PatyiaSqlAdapter";
   import { TPatyiaNodeUX } from "./patyia-sql-browser/TPatyiaNodeUX";

   const DB_NAME = "AYUDASCP_IA";

   const adapter = new PatyiaSqlAdapter();
   const adapterAny = adapter as any;

   let loading = true;
   let loadError = "";
   let totalTables = 0;

   let selected: PatyiaTableSelect = null;
   let ddl = "";

   adapter.onTableSelect = (s) => { selected = s; rebuildDDL(); };

   onMount(() => {
      void loadSchema();
   });

   async function execGet<T = any>(sql: string): Promise<T[]> {
      const resp = await fetch("/api/patyia/db/exec", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ sql }),
      });
      const data = await resp.json();
      if (!resp.ok || !data?.ok) {
         throw new Error(data?.error || `HTTP ${resp.status}`);
      }
      return (data.rows ?? []) as T[];
   }

   async function loadSchema(): Promise<void> {
      loading = true;
      loadError = "";
      try {
         const tablesSql = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_NAME`;
         const colsSql = `SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo' ORDER BY TABLE_NAME, ORDINAL_POSITION`;
         const consSql = `SELECT tc.TABLE_NAME, tc.CONSTRAINT_TYPE, kcu.COLUMN_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME WHERE tc.TABLE_SCHEMA = 'dbo' AND tc.CONSTRAINT_TYPE IN ('PRIMARY KEY','UNIQUE','FOREIGN KEY')`;
         const rowsSql = `SELECT t.name AS TABLE_NAME, SUM(p.rows) AS ROWS FROM sys.tables t JOIN sys.partitions p ON t.object_id = p.object_id WHERE p.index_id IN (0,1) GROUP BY t.name`;

         const [tablesRaw, columnsRaw, consRaw, countsRaw] = await Promise.all([
            execGet<{ TABLE_NAME: string }>(tablesSql),
            execGet<any>(colsSql),
            execGet<any>(consSql),
            execGet<any>(rowsSql),
         ]);

         const tables = tablesRaw.map((r) => r.TABLE_NAME);
         totalTables = tables.length;

         adapter.setSchema([{
            name: DB_NAME,
            tables,
            columns: columnsRaw,
            constraints: consRaw,
            rowCounts: countsRaw,
         }]);

         if (tables.length > 0 && !selected) {
            selected = { databaseName: DB_NAME, tableName: tables[0] };
            rebuildDDL();
         }
      } catch (e: any) {
         loadError = e?.message ?? String(e);
         toastError(`Error al cargar esquema SQL: ${loadError}`);
      } finally {
         loading = false;
      }
   }

   function getSelectedNode(): TPatyiaNodeUX | null {
      if (!selected) return null;
      for (const r of adapter.obj.rows) {
         if (r.kind === "table" && r.databaseName === selected.databaseName && r.tableName === selected.tableName) return r;
      }
      return null;
   }

   function getSelectedColumns(): TPatyiaNodeUX[] {
      if (!selected) return [];
      return adapter.obj.rows.filter((r) => r.kind === "column" && r.databaseName === selected!.databaseName && r.tableName === selected!.tableName);
   }

   function rebuildDDL(): void {
      const cols = getSelectedColumns();
      if (!selected || cols.length === 0) { ddl = ""; return; }
      const lines: string[] = [];
      lines.push(`CREATE TABLE [dbo].[${selected.tableName}] (`);
      const pkCols: string[] = [];
      cols.forEach((c, idx) => {
         const lenTypes = new Set(["varchar", "nvarchar", "char", "nchar"]);
         let typeStr = c.colDataType;
         if (lenTypes.has(c.colDataType) && c.colMaxLen != null) {
            typeStr += c.colMaxLen === -1 ? "(max)" : `(${c.colMaxLen})`;
         }
         const nul = c.colNullable ? "NULL" : "NOT NULL";
         const sep = idx === cols.length - 1 && pkCols.length === 0 ? "" : ",";
         lines.push(`   [${c.rowName}] ${typeStr} ${nul}${sep}`);
         if (c.colIsPk) pkCols.push(c.rowName);
      });
      if (pkCols.length > 0) {
         lines.push(`   CONSTRAINT [PK_${selected.tableName}] PRIMARY KEY (${pkCols.map((n) => `[${n}]`).join(", ")})`);
      }
      lines.push(`);`);
      ddl = lines.join("\n");
   }

   function copyDDL(): void {
      if (!ddl) return;
      navigator.clipboard.writeText(ddl).then(() => toastSuccess("DDL copiado"));
   }

   $: selectedNode = selected ? getSelectedNode() : null;
   $: selectedColumns = selected ? getSelectedColumns() : [];
</script>

<Toaster />

<section class="browser">
   <Card>
      <FlexLayout items="center" justify="between">
         <div>
            <H2>PatyIA · Visor SQL</H2>
            <Text color="neutral"><small>Esquema vivo de <code>{DB_NAME}</code>. Tablas y columnas en solo lectura.</small></Text>
         </div>
         <FlexLayout items="center">
            {#if loading}
               <FlexLayout items="center"><Iconify icon="mdi:loading" /><Text color="neutral"><small>Cargando…</small></Text></FlexLayout>
            {:else}
               <Text color="neutral"><small>{totalTables} tabla{totalTables === 1 ? "" : "s"}</small></Text>
            {/if}
            <ButtonIconify icon="mdi:refresh" title="Recargar esquema" disabled={loading} on:click={() => loadSchema()} />
         </FlexLayout>
      </FlexLayout>
   </Card>

   <div class="layout">
      <div class="tree-pane">
         <div class="pane-scroll custom-scrollbar">
            {#if loading}
               <Text color="neutral">Cargando…</Text>
            {:else if loadError}
               <Text color="error">{loadError}</Text>
            {:else if totalTables === 0}
               <Text color="neutral">Sin tablas.</Text>
            {:else}
               <div class="tables-tree-host">
                  <TreeView
                     Obj={adapter.obj}
                     itdForm="view"
                     brapido={true}
                     small={true}
                     readonly={true}
                     bdrag={false}
                     showToolbar={false}
                     CatalogoController={adapterAny.catalogoController}
                     TreeController={adapter}
                  >
                     <svelte:fragment slot="row" let:node>
                        {#if node.kind === "database"}
                           <span class="tree-row" title={`Base de datos: ${node.rowName}`}>
                              <span class="badge badge-database">DB</span>
                              <span class="tree-row-name">{node.rowName}</span>
                              <span class="tree-row-meta">{node.columnCount} tablas</span>
                           </span>
                        {:else if node.kind === "table"}
                           <span class="tree-row" title={`Tabla: ${node.rowName}${node.tableRows != null ? ` (${node.tableRows} filas)` : ""}`}>
                              <span class="tree-row-name">{node.rowName}</span>
                              <span class="tree-row-meta">{node.columnCount} cols{node.tableRows != null ? ` · ${node.tableRows}` : ""}</span>
                           </span>
                        {:else}
                           <span class="tree-row" title={`Columna: ${node.rowName} (${node.formattedColType})`}>
                              <span class="tree-row-name">{node.rowName}</span>
                              <span class="tree-row-meta">{node.formattedColType}{node.colNullable ? " · null" : ""}</span>
                           </span>
                        {/if}
                     </svelte:fragment>

                     <svelte:fragment slot="Frm" let:frmObj>
                        {#if frmObj}
                           <div class="frm">
                              <Text color="neutral"><small>Vista de solo lectura. Selecciona la tabla para ver columnas y DDL en el panel derecho.</small></Text>
                           </div>
                        {/if}
                     </svelte:fragment>
                  </TreeView>
               </div>
            {/if}
         </div>
      </div>

      <div class="form-pane">
         <div class="pane-scroll custom-scrollbar">
            {#if selectedNode}
               <Card>
                  <FlexLayout items="center" justify="between">
                     <H2>{selectedNode.tableName}</H2>
                     <Text color="neutral"><small>{selectedColumns.length} columnas{selectedNode.tableRows != null ? ` · ${selectedNode.tableRows} filas` : ""}</small></Text>
                  </FlexLayout>
                  <table class="cols-table">
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>Nombre</th>
                           <th>Tipo</th>
                           <th>Null</th>
                           <th>PK</th>
                        </tr>
                     </thead>
                     <tbody>
                        {#each selectedColumns as c, i (c.flatPath)}
                           <tr>
                              <td class="num">{i + 1}</td>
                              <td>{c.rowName}</td>
                              <td><code>{c.formattedColType}</code></td>
                              <td>{c.colNullable ? "Sí" : "No"}</td>
                              <td>{c.colIsPk ? "✓" : ""}</td>
                           </tr>
                        {/each}
                     </tbody>
                  </table>
               </Card>
            {:else if !loading}
               <Text color="neutral">Selecciona una tabla en el árbol.</Text>
            {/if}
         </div>
      </div>

      <div class="code-pane">
         <div class="pane-scroll">
            {#if ddl}
               <div class="code-header">
                  <Text color="neutral"><small>DDL inferido</small></Text>
                  <ButtonIconify icon="mdi:content-copy" title="Copiar DDL" on:click={copyDDL} />
               </div>
               <pre class="code-block custom-scrollbar"><code>{ddl}</code></pre>
            {:else if !loading}
               <Text color="neutral">Sin tabla seleccionada.</Text>
            {/if}
         </div>
      </div>
   </div>
</section>

<style>
   .browser {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      min-height: 0;
   }
   .layout {
      display: grid;
      grid-template-columns: minmax(358px, calc(14.4rem + 190px)) minmax(0, 0.86fr) minmax(0, 1.07fr);
      gap: 0.5rem;
      height: calc(100dvh - 13rem);
      align-items: stretch;
   }
   :global(.tree-pane),
   :global(.form-pane),
   :global(.code-pane) {
      width: 100%;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
   }
   .pane-scroll {
      flex: 1 1 auto;
      min-height: 0;
      width: 100%;
      overflow: auto;
      display: block;
   }
   :global(.code-pane) > .pane-scroll {
      display: flex;
      flex-direction: column;
      overflow: hidden;
   }
   :global(.tree-pane) {
      padding: 0.5rem;
      border: 1px solid var(--is-b-color);
      border-radius: 0.25rem;
      background: var(--is-bg-primary);
      overflow: hidden;
   }
   .tables-tree-host {
      display: block;
      width: 100%;
      font-size: 0.7em;
   }
   .tables-tree-host :global(.touch-gestures-body) {
      position: static !important;
      display: flex;
      flex-direction: column;
   }
   .tables-tree-host :global(.isp-tree) {
      display: block !important;
      height: auto !important;
      min-height: 0;
   }
   .tree-row {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      flex: 1;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
   }
   .tree-row-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
      flex: 1;
   }
   .tree-row-meta {
      color: var(--is-text-neutral, #888);
      font-size: 0.7rem;
      margin-left: auto;
      padding-left: 0.4rem;
   }
   .badge {
      padding: 0.05rem 0.3rem;
      border-radius: 0.2rem;
      font-size: 0.65rem;
      font-weight: bold;
      flex: 0 0 auto;
   }
   .badge-database {
      background: color-mix(in srgb, var(--is-info) 22%, transparent);
      color: var(--is-info);
   }
   .cols-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.78rem;
      margin-top: 0.4rem;
   }
   .cols-table th,
   .cols-table td {
      padding: 0.3rem 0.5rem;
      border-bottom: 1px solid var(--is-b-color);
      text-align: left;
   }
   .cols-table th {
      color: var(--is-text-neutral, #888);
      font-weight: 500;
      background: var(--is-bg-secondary, transparent);
      position: sticky;
      top: 0;
   }
   .cols-table td.num {
      color: var(--is-text-neutral, #888);
      font-variant-numeric: tabular-nums;
      width: 2rem;
   }
   .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.3rem 0.5rem;
   }
   .code-block {
      flex: 1 1 auto;
      min-height: 0;
      margin: 0;
      padding: 0.6rem;
      border: 1px solid var(--is-b-color);
      border-radius: 0.25rem;
      background: var(--is-bg-secondary, #1d1d1d);
      color: var(--is-text-primary, #ddd);
      font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
      font-size: 0.78rem;
      line-height: 1.4;
      overflow: auto;
      white-space: pre;
   }
</style>
