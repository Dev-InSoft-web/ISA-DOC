<!--
   Editor SQL — single-file (consolidación al estilo ISW `TreeContenidos`).

   Sustituye al adapter legacy 2-genérico + RealtimeTreeAdapter + SyncDisconnectOverlay +
   TSqlNodeUX + TSqlTableUX. Toda la lógica vive aquí: clase de dominio, customs
   declarativos, conversión ParsedTable ↔ árbol nested, y formulario inline.

   Capa realtime/sync DROPEADA (sin canal de sockets, sin overlay desconexión) —
   alineado con la simplicidad de ISW `TreeContenidos`.
-->
<script context="module" lang="ts">
   import { TObject } from "@ingenieria_insoft/ispgen";
   import type { FlexOptionsInput } from "../_comps/Options/FlexOptions.svelte";
   import { TreeCustomsBase, type ITreeRuntime, type RowOf } from "../_comps/TreeView/contracts";
   import type {
      ContainmentRole,
      INode,
      MobilityRole,
      TopologyRole,
   } from "../_comps/TreeView/_treeAdapter/_defgen/00-tree-data";
   import type {
      ParsedTable,
      TableColumn,
      TableOptional,
      TableRow,
      TableSection,
   } from "../../lib/tableSchema";
   import {
      isAnySectionRow,
      isOptionalRow,
      isSectionEndRow,
      isSectionRow,
   } from "../../lib/tableSchema";

   export type SqlNodeKind = "section" | "column" | "optional";

   /**
    * Nodo SQL: extiende TObject + implementa el shape de TreeView (flatPath,
    * childrens, topology, ...). Toda la info de dominio vive como campos
    * planos. La factoría `objRootsToNodes` del TreeView decorará getters
    * `isAtom`/`isGroupActor`/etc. al primer recorrido — los nuestros como
    * fallback para que el editor compile y funcione antes del primer paint.
    */
   export class TSqlNode extends TObject {
      // ── Shape árbol (lo lee/escribe TreeView) ──
      childrens: TSqlNode[] = [];
      flatPath: string = "";
      pathInit: string = "";
      topology: TopologyRole | undefined = undefined;
      containment: ContainmentRole | undefined = undefined;
      mobility: MobilityRole | undefined = undefined;
      freeze: boolean | undefined = undefined;
      depth: number = 0;
      isSelected: boolean = false;
      hasChildren: boolean = false;
      isCollapsed: boolean = false;

      // ── Dominio SQL ──
      kind: SqlNodeKind = "column";
      rowName: string = "";
      colType: string = "";
      nullable: "" | "NULL" | "NOT NULL" = "";
      defaultValue: string = "";
      primaryKey: boolean = false;
      colExtra: string = "";
      /** Solo aplica a kind="optional": si false, se omite del SQL emitido. */
      active: boolean = true;

      get isAtom(): boolean { return this.topology === "atom"; }
      get isGroupActor(): boolean { return (this.topology ?? "group") === "group"; }
      get isPrison(): boolean { return !this.isAtom && this.containment === "prison"; }
      get isHermetic(): boolean { return !this.isAtom && this.containment === "hermetic"; }
      get isCell(): boolean { return !this.isAtom && (this.containment ?? "cell") === "cell"; }
      get isUnanchored(): boolean { return (this.mobility ?? "unanchored") === "unanchored"; }
      get isFreezer(): boolean { return this.mobility === "freezer"; }
      get isEmpty(): boolean {
         if (this.isAtom) return true;
         return !this.childrens?.length;
      }

      constructor(init?: Partial<TSqlNode>) {
         super();
         if (init) Object.assign(this, init);
         this.applyTopologyFromKind();
      }

      applyTopologyFromKind(): void {
         if (this.kind === "column") {
            this.topology = "atom";
            this.containment = undefined;
         } else {
            this.topology = "group";
            this.containment = "hermetic";
         }
      }
   }

   /** Conjunto por defecto de columnas AUDITORIA cuando se activa el switch. */
   export function defaultAuditColumns(): TableColumn[] {
      return [
         { kind: "col", name: "IUSUARIOCRE", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
         { kind: "col", name: "IAPPCRE", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
         { kind: "col", name: "IEQUIPOCRE", type: "INT", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
         { kind: "col", name: "IPCRE", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
         { kind: "col", name: "FHCRE", type: "DATETIME2", nullable: "", defaultValue: "GETDATE()", primaryKey: false, extra: "" },
         { kind: "col", name: "IUSUARIOULT", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
         { kind: "col", name: "IAPPULT", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
         { kind: "col", name: "IEQUIPOULT", type: "INT", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
         { kind: "col", name: "IPULT", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
         { kind: "col", name: "FHULT", type: "DATETIME2", nullable: "", defaultValue: "GETDATE()", primaryKey: false, extra: "" },
      ];
   }

   /**
    * Construye los roots (árbol nested) a partir de `ParsedTable`. Devuelve
    * un array con secciones (con sus columnas-hijas en `childrens`) y
    * columnas raíz intercaladas en orden visual.
    */
   export function buildRowsFromParsed(parsed: ParsedTable): TSqlNode[] {
      const roots: TSqlNode[] = [];
      let topIdx = 0;
      let currentSection: TSqlNode | null = null;

      const emitColumn = (col: TableColumn, fp: string): TSqlNode => new TSqlNode({
         kind: "column",
         flatPath: fp,
         pathInit: fp,
         rowName: col.name,
         colType: col.type,
         nullable: col.nullable,
         defaultValue: col.defaultValue,
         primaryKey: !!col.primaryKey,
         colExtra: col.extra,
      });

      for (const row of parsed.columns) {
         if (isSectionEndRow(row)) {
            currentSection = null;
            continue;
         }
         if (isAnySectionRow(row)) {
            topIdx += 1;
            const sid = String(topIdx);
            // AUDITORIA: siempre promover a optional para heredar show/hide
            const isAudit = (row as TableSection | TableOptional).name === "AUDITORIA";
            const kind: SqlNodeKind = isAudit || isOptionalRow(row) ? "optional" : "section";
            const active = isOptionalRow(row) ? (row as TableOptional).active !== false : true;
            const node = new TSqlNode({
               kind,
               flatPath: sid,
               pathInit: sid,
               rowName: (row as TableSection | TableOptional).name,
               active,
            });
            roots.push(node);
            currentSection = node;
            continue;
         }
         const col = row as TableColumn;
         if (currentSection) {
            const cid = `${currentSection.flatPath}.${currentSection.childrens.length + 1}`;
            currentSection.childrens.push(emitColumn(col, cid));
         } else {
            topIdx += 1;
            roots.push(emitColumn(col, String(topIdx)));
         }
      }

      // Reubica AUDITORIA al final
      const auditIdx = roots.findIndex((r) => r.kind === "optional" && r.rowName === "AUDITORIA");
      if (auditIdx >= 0) {
         const [aud] = roots.splice(auditIdx, 1);
         if (aud.kind === "optional" && aud.childrens.length === 0) aud.active = false;
         roots.push(aud);
      }
      return roots;
   }

   /** Aplana los roots de vuelta a `ParsedTable.columns`. */
   export function exportRowsToParsed(roots: ReadonlyArray<TSqlNode>, base: ParsedTable): ParsedTable {
      const out: TableRow[] = [];
      let openSection = false;
      for (const n of roots) {
         if (n.kind === "optional") {
            if (!n.active) continue;
            if (openSection) out.push({ kind: "section_end" });
            out.push({ kind: "optional", name: n.rowName, active: true });
            openSection = true;
            for (const c of n.childrens) out.push(nodeToColumn(c));
         } else if (n.kind === "section") {
            if (openSection) out.push({ kind: "section_end" });
            out.push({ kind: "section", name: n.rowName });
            openSection = true;
            for (const c of n.childrens) out.push(nodeToColumn(c));
         } else {
            if (openSection) {
               out.push({ kind: "section_end" });
               openSection = false;
            }
            out.push(nodeToColumn(n));
         }
      }
      const next: ParsedTable = {
         ...base,
         columns: out,
         compositePrimaryKey: base.compositePrimaryKey.filter((c) =>
            out.some((cc) => !isAnySectionRow(cc) && !isSectionEndRow(cc) && (cc as TableColumn).name === c),
         ),
      };
      return next;
   }

   function nodeToColumn(n: TSqlNode): TableColumn {
      return {
         kind: "col",
         name: n.rowName,
         type: n.colType,
         nullable: n.nullable,
         defaultValue: n.defaultValue,
         primaryKey: !!n.primaryKey,
         extra: n.colExtra,
      };
   }

   /**
    * Customs declarativos: implementa el contrato del TreeView v2 con la
    * lógica específica del editor SQL (icons, acciones, defaults).
    */
   export class TSqlTreeCustoms extends TreeCustomsBase<TSqlNode> {
      klass = TSqlNode;
      entrie = "fila";
      entries = "Estructura de tabla";

      newItem = (data?: Partial<RowOf<TSqlNode>>): RowOf<TSqlNode> => {
         const init: Partial<TSqlNode> = { kind: "column" };
         if (data) Object.assign(init, data);
         return new TSqlNode(init) as unknown as RowOf<TSqlNode>;
      };

      getFlatPath = (rec: RowOf<TSqlNode>): string => String(rec.flatPath ?? "").trim();
      setFlatPath = (rec: RowOf<TSqlNode>, fp: string): void => {
         const next = String(fp ?? "").trim();
         if (!next) return;
         rec.flatPath = next;
      };
      remapReferences = (_rec: RowOf<TSqlNode>, _idMap: ReadonlyMap<string, string>): void => {
         // No hay referencias cruzadas entre filas SQL (la única "ref" es el
         // dotted-path que ya maneja TreeView). Nada que mapear.
      };

      updateNode = (node: RowOf<TSqlNode>, _isNew: boolean, _tree: ITreeRuntime<TSqlNode>): void => {
         node.applyTopologyFromKind();
         if (node.kind === "section" || node.kind === "optional") {
            node.containment = "hermetic"; // solo aceptan columnas
         }
      };

      levelName = ({ depth }: { depth: number }): string =>
         depth === 0 ? "Sección/Columna" : "Columna";

      getNodeIcon = (node: INode<RowOf<TSqlNode>>): { icon?: string; color?: "info" | "success" | "warning" | "danger" | "neutral"; style?: string; title?: string } | null => {
         if (node.kind === "section") return { icon: "mdi:format-list-group", style: "color: #C49B00", title: "Sección" };
         if (node.kind === "optional") {
            if (!node.active) return { icon: "mdi:eye-off-outline", color: "neutral", title: "Opcional inactiva" };
            return { icon: "mdi:format-list-group", style: "color: #C49B00", title: "Opcional" };
         }
         return { icon: "mdi:table-column", color: "info", title: "Columna" };
      };

      rowActions = (node: INode<RowOf<TSqlNode>>, tree: ITreeRuntime<TSqlNode>): FlexOptionsInput[] => {
         const ro = !!tree.isReadOnly;
         const isFolder = !node.isAtom;
         const moveGroup = !ro ? [
            { icon: "mdi:arrow-up", title: "Mover arriba", hotkey: "Ctrl+ArrowUp", onClick: () => { void tree.move?.(node, "up"); } },
            { icon: "mdi:arrow-down", title: "Mover abajo", hotkey: "Ctrl+ArrowDown", onClick: () => { void tree.move?.(node, "down"); } },
         ] : [];
         const addGroup = !ro && isFolder ? [{
            icon: "mdi:plus-circle-outline",
            title: tree.addChildLabel?.(node) ?? "Agregar columna",
            hotkey: "Insert",
            onClick: () => { void tree.addChild?.(node); },
         }] : [];
         return [moveGroup, addGroup];
      };

      rowCascadeOptions = (node: INode<RowOf<TSqlNode>>, tree: ITreeRuntime<TSqlNode>): FlexOptionsInput[] => {
         const ro = !!tree.isReadOnly;
         const editGroup = [{
            icon: ro ? "mdi:text-box-search-outline" : "mdi:pencil-outline",
            label: ro ? "Ver" : "Editar",
            title: ro ? "Ver" : "Editar",
            hotkey: "Enter",
            onClick: () => { if (ro) tree.openView?.(node); else tree.openEdit?.(node); },
         }];
         const siblingGroup = [
            { icon: "mdi:table-row-plus-before", label: "Añadir arriba", title: "Añadir arriba", hotkey: "Ctrl+Shift+ArrowUp", disabled: ro || undefined, onClick: () => { if (!ro) void tree.addSibling?.(node, "above"); } },
            { icon: "mdi:table-row-plus-after", label: "Añadir abajo", title: "Añadir abajo", hotkey: "Ctrl+Shift+ArrowDown", disabled: ro || undefined, onClick: () => { if (!ro) void tree.addSibling?.(node, "below"); } },
         ];
         const isAuditOptional = node.kind === "optional" && node.rowName === "AUDITORIA";
         const deleteGroup = !isAuditOptional ? [{
            icon: "mdi:delete-outline",
            label: "Eliminar",
            title: "Eliminar",
            hotkey: "Delete",
            color: "danger" as const,
            disabled: ro || undefined,
            onClick: () => { if (!ro) tree.remove?.(node); },
         }] : [];
         return [editGroup, siblingGroup, deleteGroup];
      };
   }
</script>

<script lang="ts">
   import { onDestroy } from "svelte";
   import { FlexLayout, Iconify, Switch, Text, SelectEnum } from "@ingenieria_insoft/ispsveltecomponents";
   import TreeView, { type TreeAdapter } from "../_comps/TreeView/TreeRowView.svelte";
   import { COMMON_COLUMN_TYPES } from "../../lib/tableSchema";

   export let table: ParsedTable;
   export let prefix: string = "";
   export let readonly: boolean = false;
   export let onChange: (t: ParsedTable) => void = () => {};

   const tableKey = (t: ParsedTable): string => `${t.fragmentId}::${t.originalName}`;

   let lastKey = tableKey(table);
   let rows: TSqlNode[] = buildRowsFromParsed(table);
   const customs = new TSqlTreeCustoms();
   let treeAdapter: TreeAdapter<TSqlNode> | undefined;
   let suppressEmit = false;
   let offUi: (() => void) | null = null;

   $: if (tableKey(table) !== lastKey) {
      lastKey = tableKey(table);
      suppressEmit = true;
      rows = buildRowsFromParsed(table);
      suppressEmit = false;
   }

   $: baseName = prefix && table.name.startsWith(prefix) ? table.name.slice(prefix.length) : table.name;
   let baseNameDraft = baseName;
   $: baseNameDraft = baseName;

   $: auditNode = rows.find((r) => r.kind === "optional" && r.rowName === "AUDITORIA");
   $: auditarChecked = !!auditNode?.active;

   const commitBaseName = (v: string): void => {
      const p = prefix && table.name.startsWith(prefix) ? prefix : "";
      const next = (p + v).toUpperCase().replace(/[^A-Z0-9_]/g, "_");
      if (next === table.name) return;
      table.name = next;
      onChange(table);
   };

   const emitChange = (): void => {
      if (suppressEmit) return;
      const next = exportRowsToParsed(rows, table);
      onChange(next);
   };

   const syncAdapter = (a: TreeAdapter<TSqlNode>): "" => {
      if (a === treeAdapter) return "";
      treeAdapter = a;
      a.applyAdapterConfig({ floatCard: { scale: 0.7 } });
      offUi?.();
      offUi = a.addUiListener(() => emitChange());
      return "";
   };

   onDestroy(() => offUi?.());

   const setAuditEnabled = (on: boolean): void => {
      suppressEmit = true;
      let aud = rows.find((r) => r.kind === "optional" && r.rowName === "AUDITORIA");
      if (!aud) {
         aud = new TSqlNode({ kind: "optional", rowName: "AUDITORIA", flatPath: String(rows.length + 1) });
         aud.pathInit = aud.flatPath;
         rows = [...rows, aud];
      }
      aud.active = on;
      if (on && aud.childrens.length === 0) {
         aud.childrens = defaultAuditColumns().map((col, i) => new TSqlNode({
            kind: "column",
            flatPath: `${aud!.flatPath}.${i + 1}`,
            pathInit: `${aud!.flatPath}.${i + 1}`,
            rowName: col.name,
            colType: col.type,
            nullable: col.nullable,
            defaultValue: col.defaultValue,
            primaryKey: !!col.primaryKey,
            colExtra: col.extra,
         }));
      }
      rows = rows; // trigger reactividad
      suppressEmit = false;
      emitChange();
   };

   $: if (typeof auditarChecked === "boolean" && auditNode && auditarChecked !== auditNode.active) {
      setAuditEnabled(auditarChecked);
   }

   const isPk = (node: TSqlNode): boolean =>
      !!node.primaryKey || table.compositePrimaryKey.includes(node.rowName);

   const buildTypeEnum = (current: string): { [k: string]: string } => {
      const out: { [k: string]: string } = {};
      for (const t of COMMON_COLUMN_TYPES) out[t] = t;
      const norm = (current || "").toUpperCase().replace(/\s+/g, "");
      if (norm && !(norm in out)) out[norm] = norm;
      return out;
   };
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
      {/if}
   </FlexLayout>

   <div class="tree-host">
      <TreeView
         {readonly}
         bAllowed={{ Crear: true, Modificar: true, Eliminar: true, Visualizar: true }}
         let:treeAdapter={ta}
         {customs}
         List2Rows={rows}
      >
         {syncAdapter(ta)}
         <span slot="grouperCaret" let:open let:node>
            {#if node.kind === "optional" && !node.active}
               <Iconify icon="mdi:eye-off-outline" style="color: #888" title="Opcional inactiva" />
            {:else if node.isEmpty}
               <Iconify icon="mdi:folder-plus-outline" style="color: #9E9E9E" title="Vacío — agregar columnas" />
            {:else}
               <Iconify icon={open ? "mdi:folder-open" : "mdi:folder"} style="color: #FFA000" />
            {/if}
         </span>

         <FlexLayout items="center" slot="row" let:node style="flex:1; min-width:0;">
            {#if node.kind === "section"}
               <span class="badge badge-section">Sección</span>
               <Text style="font-weight:bold;" lines={1}>{node.rowName || "(sin nombre)"}</Text>
            {:else if node.kind === "optional"}
               <span class="badge badge-optional">Opcional</span>
               <Text style="font-weight:bold;" lines={1}>{node.rowName || "(sin nombre)"}</Text>
               {#if !node.active}<span class="tag tag-hidden">oculta</span>{/if}
            {:else}
               <Text lines={1}>{node.rowName || "(columna)"}</Text>
            {/if}
         </FlexLayout>

         <FlexLayout items="center" slot="helperRow" let:node>
            {#if node.kind === "column"}
               <Text color="neutral" lines={1}><code>{node.colType || "—"}</code></Text>
               {#if node.nullable === "NOT NULL"}<span class="tag tag-nn">NN</span>{/if}
               {#if isPk(node)}<span class="tag tag-pk">PK</span>{/if}
            {/if}
         </FlexLayout>

         <div class="frm" slot="Frm" let:record>
            {#if record}
               {#if record.kind === "section" || record.kind === "optional"}
                  <label class="field">
                     <Text color="neutral"><small>Nombre de la {record.kind === "optional" ? "sección opcional" : "sección"}</small></Text>
                     <input
                        class="input-field"
                        type="text"
                        bind:value={record.rowName}
                        on:input={(e) => {
                           record.rowName = e.currentTarget.value.toUpperCase().replace(/[^A-Z0-9_ ]/g, "_");
                        }}
                     />
                  </label>
                  {#if record.kind === "optional"}
                     <label class="field row">
                        <Switch bind:checked={record.active} color="primary" colorFalse="neutral" />
                        <Text>Activo (incluir en SQL)</Text>
                     </label>
                  {/if}
               {:else}
                  <label class="field">
                     <Text color="neutral"><small>Nombre</small></Text>
                     <input
                        class="input-field"
                        type="text"
                        bind:value={record.rowName}
                        on:input={(e) => {
                           record.rowName = e.currentTarget.value.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
                        }}
                     />
                  </label>
                  <label class="field">
                     <Text color="neutral"><small>Tipo</small></Text>
                     <div class="select-host">
                        <SelectEnum label="Tipo" required={false} enumValue={buildTypeEnum(record.colType)} bind:value={record.colType} />
                     </div>
                  </label>
                  <label class="field row">
                     <input
                        type="checkbox"
                        checked={record.nullable === "NOT NULL"}
                        on:change={(e) => { record.nullable = e.currentTarget.checked ? "NOT NULL" : ""; }}
                     />
                     <Text>NOT NULL</Text>
                  </label>
                  <label class="field">
                     <Text color="neutral"><small>DEFAULT</small></Text>
                     <input class="input-field" type="text" bind:value={record.defaultValue} />
                  </label>
                  <label class="field row">
                     <input
                        type="checkbox"
                        checked={!!record.primaryKey}
                        on:change={(e) => { record.primaryKey = e.currentTarget.checked; }}
                     />
                     <Text>PRIMARY KEY</Text>
                  </label>
                  <label class="field">
                     <Text color="neutral"><small>Extra (IDENTITY, CHECK…)</small></Text>
                     <input class="input-field" type="text" bind:value={record.colExtra} />
                  </label>
               {/if}
            {/if}
         </div>
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
   .sql-tree-card.readonly { background: var(--is-bg-readonly, rgba(127, 127, 127, 0.08)); }
   .readonly-banner {
      display: flex; align-items: center; gap: 0.4rem;
      padding: 0.25rem 0.5rem;
      border: 1px dashed var(--is-b-color);
      border-radius: 4px;
      opacity: 0.85;
   }
   .tree-host {
      display: flex; flex-direction: column;
      width: 100%; flex: 1 1 auto; min-height: 240px;
      border: 1px solid var(--is-b-color);
      border-radius: 0.25rem;
      background: var(--is-bg-primary);
      padding: 0.25rem;
      font-size: 0.85rem;
      overflow: auto;
   }
   .name-row { display: inline-flex; align-items: center; gap: 0.25rem; }
   .input-field {
      padding: 0.2rem 0.4rem;
      border: 1px solid var(--is-b-color);
      border-radius: 0.25rem;
      font-family: inherit; font-size: 0.9rem;
      background: var(--is-bg-secondary);
      color: var(--is-color);
      outline: none;
   }
   .input-field:focus { border-color: var(--is-primary); }
   .name-input { font-weight: bold; min-width: 12rem; }
   .field { display: flex; flex-direction: column; gap: 0.15rem; }
   .field.row { flex-direction: row; align-items: center; gap: 0.5rem; }
   .select-host { width: 100%; }
   .select-host :global(select) {
      width: 100%; min-width: 11rem; height: 32px;
      padding: 0 1.6rem 0 0.5rem;
      font-size: 0.9rem;
      background-color: var(--is-bg-secondary);
      border: 1px solid var(--is-b-color);
      border-radius: 0.25rem;
      text-overflow: ellipsis;
   }
   .select-host :global(select:focus) { border-color: var(--is-primary); }
   .select-host :global(label) { display: none; }
   .frm { display: flex; flex-direction: column; gap: 0.6rem; padding: 1rem; }
   .tag { padding: 0 0.35rem; border-radius: 0.2rem; font-size: 0.7rem; font-weight: bold; line-height: 1.4; white-space: nowrap; flex: 0 0 auto; }
   .tag-nn { background: color-mix(in srgb, var(--is-info) 25%, transparent); color: var(--is-info); }
   .tag-pk { background: color-mix(in srgb, var(--is-success) 25%, transparent); color: var(--is-success); }
   .tag-hidden { background: color-mix(in srgb, var(--is-neutral) 25%, transparent); color: var(--is-neutral); }
   .badge { padding: 0.1rem 0.4rem; border-radius: 0.2rem; font-size: 0.75rem; font-weight: bold; white-space: nowrap; flex: 0 0 auto; }
   .badge-section { background: color-mix(in srgb, var(--is-warning) 25%, transparent); color: var(--is-warning); }
   .badge-optional { background: color-mix(in srgb, var(--is-info) 25%, transparent); color: var(--is-info); }
   .tree-row-index {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 1.5rem; height: 1.1rem;
      padding: 0 0.35rem;
      border-radius: 0.6rem;
      background: color-mix(in srgb, var(--is-neutral) 15%, transparent);
      color: var(--is-color);
      font-size: 0.7rem; font-weight: bold;
   }
</style>
