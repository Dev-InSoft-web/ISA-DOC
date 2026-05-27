<script lang="ts">
   import { Button, ButtonIconify, Card, FlexLayout, H2, H4, Iconify, Modal, SelectEnum, Text, Toaster, toastError, toastSuccess } from "@ingenieria_insoft/ispsveltecomponents";
   import { marked } from "marked";
   import { onMount, tick } from "svelte";
   import { generateResourcesFromTables } from "../../lib/codeGen/autogen.ts";
   import { findDomainOf, getSlaves, isMaster as isMasterFn, type DomainsMap } from "../../lib/codeGen/domains.ts";
   import { genAzureFn, genClient, genModelo, genServer } from "../../lib/codeGen/generators.ts";
   import { getCached, loadStateFromServer, onStateChanged, reloadStateFromServer, setCached } from "../../lib/codeGen/stateClient.ts";
   import type { FieldDef, RelationDef, ResourceConfig } from "../../lib/codeGen/types.ts";
   import { renderMermaidSvg } from "../../lib/mermaid/render.ts";
   import { isRealtimeEnabled } from "../../lib/realtimeFlag.ts";
   import { effectiveTableName, emitDropTable, emitTable, isSqlSnippetEnabled, newTableId, tableColumns, type ParsedTable } from "../../lib/tableSchema.ts";
   import { clientesIsProvider } from "../../lib/sqlProviders/clientesIsProvider.ts";
   import type { SqlDataProvider } from "../../lib/sqlProviders/types.ts";
   import SwitchComp from "$comps/especial/_Switch.svelte";
   import TreeView from "$comps/TreeViewLegacy/TreeRowView.svelte";
   import SqlTreeEditor from "../editors/SqlTreeEditor.svelte";
   import CodeModal from "../viewers/CodeModal.svelte";
   import CodeViewer from "../viewers/CodeViewer.svelte";
   import DocInfoModal from "../viewers/DocInfoModal.svelte";
   import InfoEditModal from "../viewers/InfoEditModal.svelte";
   import ResourceConfigSections from "./tables-browser/ResourceConfigSections.svelte";
   import { TreeSQLTablesAdapter, type TablesBrowserState } from "./tables-browser/TreeSQLTablesAdapter";

   export let provider: SqlDataProvider = clientesIsProvider;
   $: providerConfig = provider.config;
   $: isReadOnly = providerConfig.readOnly;

   let tables: ParsedTable[] = [];
   let loading = true;
   let saving = false;
   let generating = false;
   let dirty = false;
   let selectedKey: string | null = null;
   let selectedPointerCtx: { isPointer: boolean; domainId?: string } = { isPointer: false };
   let selectedDomainNode: { kind: "domain" | "pivot"; domainId: string } | null = null;
   const CardinalityEnum = { "1:1": "1:1", "1:N": "1:N" } as const;

   const NAME_MODE_KEY = "isa-doc:tree-name-mode";
   const NameModeEnum = { "SQL Entity": "sql", "Model": "model" } as const;
   let nameMode: "sql" | "model" = (typeof localStorage !== "undefined" && (localStorage.getItem(NAME_MODE_KEY) as "sql" | "model")) || "sql";
   $: if (typeof localStorage !== "undefined") localStorage.setItem(NAME_MODE_KEY, nameMode);

   let modalShow = false;
   let modalTitle = "";
   let modalValue = "";
   let modalLanguage: "sql" | "ts" = "sql";

   let runUnlocked: Record<string, boolean> = {};
   let runBusy: Record<string, boolean> = {};


   let sqlPreviewShow: boolean = false;
   let sqlPreviewValue: string = "";
   let sqlPreviewExecuting: boolean = false;
   let sqlPreviewUnlocked: boolean = false;

   let derShow: boolean = false;
   let derSource: string = "";
   let derSvg: string = "";
   let derLoading: boolean = false;
   let derError: string = "";
   let derScale: number = 1;
   let derTx: number = 0;
   let derTy: number = 0;
   $: derTransform = `translate(${derTx}px, ${derTy}px)`;
   $: void applyDerSvgScale(derScale, derSvg);
   let derViewport: HTMLDivElement | undefined;

   function derSvgNaturalSize(svg: SVGSVGElement): { w: number; h: number } {
      const vb = svg.viewBox?.baseVal;
      if (vb && vb.width && vb.height) return { w: vb.width, h: vb.height };
      const rect = svg.getBoundingClientRect();
      return { w: rect.width, h: rect.height };
   }

   function applyDerSvgScale(scale: number, _svgHtml: string): void {
      if (typeof document === "undefined" || !derViewport) return;
      requestAnimationFrame(() => {
         const svg = derViewport?.querySelector(".der-content > svg") as SVGSVGElement | null;
         if (!svg) return;
         if (!svg.dataset.derNatural) {
            const nat = derSvgNaturalSize(svg);
            svg.dataset.derNatural = `${nat.w}x${nat.h}`;
         }
         const [w, h] = (svg.dataset.derNatural || "0x0").split("x").map(Number);
         if (!w || !h) return;
         svg.style.width = `${w * scale}px`;
         svg.style.height = `${h * scale}px`;
         svg.style.maxWidth = "none";
      });
   }

   function zoomBy(factor: number, cx?: number, cy?: number): void {
      const rect = derViewport?.getBoundingClientRect();
      const x = cx ?? (rect ? rect.width / 2 : 0);
      const y = cy ?? (rect ? rect.height / 2 : 0);
      const next = Math.max(0.1, Math.min(8, derScale * factor));
      const applied = next / derScale;
      derTx = x - (x - derTx) * applied;
      derTy = y - (y - derTy) * applied;
      derScale = next;
      clampDerPan();
   }

   const DER_PAN_VISIBLE_MARGIN = 10;

   function clampDerPan(): void {
      if (!derViewport) return;
      const svg = derViewport.querySelector(".der-content > svg") as SVGSVGElement | null;
      if (!svg) return;
      const [w, h] = (svg.dataset.derNatural || "0x0").split("x").map(Number);
      if (!w || !h) return;
      const host = derViewport.getBoundingClientRect();
      const imgW = w * derScale;
      const imgH = h * derScale;
      const minTx = DER_PAN_VISIBLE_MARGIN - imgW;
      const maxTx = host.width - DER_PAN_VISIBLE_MARGIN;
      const minTy = DER_PAN_VISIBLE_MARGIN - imgH;
      const maxTy = host.height - DER_PAN_VISIBLE_MARGIN;
      derTx = Math.min(maxTx, Math.max(minTx, derTx));
      derTy = Math.min(maxTy, Math.max(minTy, derTy));
   }

   function resetDerView(): void {
      derScale = 1;
      derTx = 0;
      derTy = 0;
   }

   function fitDerView(mode: "both" | "width" | "height" = "both"): void {
      if (!derViewport) return;
      const svg = derViewport.querySelector(".der-content > svg") as SVGSVGElement | null;
      if (!svg) {
         resetDerView();
         return;
      }
      const host = derViewport.getBoundingClientRect();
      const nat = derSvgNaturalSize(svg);
      if (!nat.w || !nat.h) return;
      const pad = 24;
      const sx = (host.width - pad * 2) / nat.w;
      const sy = (host.height - pad * 2) / nat.h;
      const pick = mode === "width" ? sx : mode === "height" ? sy : Math.min(sx, sy);
      const s = Math.max(0.1, Math.min(8, pick));
      derScale = s;
      derTx = (host.width - nat.w * s) / 2;
      derTy = (host.height - nat.h * s) / 2;
   }

   function attachDerPanZoom(node: HTMLDivElement): { destroy(): void } {
      derViewport = node;
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      const PAN_STEP = 1;
      const pointers = new Map<number, { x: number; y: number }>();
      let pinchDist = 0;
      let pinchMid = { x: 0, y: 0 };
      const isToolbarTarget = (e: Event): boolean => {
         const t = e.target as Element | null;
         return !!t && !!t.closest?.(".der-toolbar");
      };
      const pointerPairDist = (): number => {
         const pts = Array.from(pointers.values());
         if (pts.length < 2) return 0;
         const dx = pts[0].x - pts[1].x;
         const dy = pts[0].y - pts[1].y;
         return Math.hypot(dx, dy);
      };
      const pointerPairMid = (): { x: number; y: number } => {
         const pts = Array.from(pointers.values());
         const rect = node.getBoundingClientRect();
         return {
            x: (pts[0].x + pts[1].x) / 2 - rect.left,
            y: (pts[0].y + pts[1].y) / 2 - rect.top,
         };
      };
      const onWheel = (e: WheelEvent): void => {
         if (isToolbarTarget(e)) return;
         e.preventDefault();
         if (e.ctrlKey) {
            const rect = node.getBoundingClientRect();
            const cx = e.clientX - rect.left;
            const cy = e.clientY - rect.top;
            const factor = Math.exp(-e.deltaY * 0.01);
            zoomBy(factor, cx, cy);
            return;
         }
         if (e.shiftKey) {
            derTx -= (e.deltaY || e.deltaX) * PAN_STEP;
            clampDerPan();
            return;
         }
         derTy -= e.deltaY * PAN_STEP;
         if (e.deltaX) derTx -= e.deltaX * PAN_STEP;
         clampDerPan();
      };
      const onDown = (e: PointerEvent): void => {
         if (isToolbarTarget(e)) return;
         if (e.pointerType === "mouse" && e.button !== 0) return;
         pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
         node.setPointerCapture(e.pointerId);
         if (pointers.size === 2) {
            dragging = false;
            pinchDist = pointerPairDist();
            pinchMid = pointerPairMid();
            node.classList.remove("grabbing");
            return;
         }
         if (pointers.size === 1) {
            dragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            node.classList.add("grabbing");
         }
      };
      const onMove = (e: PointerEvent): void => {
         if (!pointers.has(e.pointerId)) return;
         pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
         if (pointers.size >= 2) {
            const dist = pointerPairDist();
            if (pinchDist > 0 && dist > 0) {
               const factor = dist / pinchDist;
               zoomBy(factor, pinchMid.x, pinchMid.y);
            }
            pinchDist = dist;
            pinchMid = pointerPairMid();
            return;
         }
         if (!dragging) return;
         derTx += e.clientX - lastX;
         derTy += e.clientY - lastY;
         lastX = e.clientX;
         lastY = e.clientY;
         clampDerPan();
      };
      const onUp = (e: PointerEvent): void => {
         pointers.delete(e.pointerId);
         try {
            node.releasePointerCapture(e.pointerId);
         } catch {}
         if (pointers.size < 2) pinchDist = 0;
         if (pointers.size === 1) {
            const rem = Array.from(pointers.values())[0];
            lastX = rem.x;
            lastY = rem.y;
            dragging = true;
            node.classList.add("grabbing");
            return;
         }
         if (pointers.size === 0) {
            dragging = false;
            node.classList.remove("grabbing");
         }
      };
      node.addEventListener("wheel", onWheel, { passive: false });
      node.addEventListener("pointerdown", onDown);
      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerup", onUp);
      node.addEventListener("pointercancel", onUp);
      return {
         destroy() {
            node.removeEventListener("wheel", onWheel);
            node.removeEventListener("pointerdown", onDown);
            node.removeEventListener("pointermove", onMove);
            node.removeEventListener("pointerup", onUp);
            node.removeEventListener("pointercancel", onUp);
            if (derViewport === node) derViewport = undefined;
         },
      };
   }

   let overrides: Record<string, never> = {};
   void overrides;
   let activeCodeTab: "sql" | "model" | "server" | "client" | "azure" = "sql";
   let domains: DomainsMap = {};

   type NodeInfo = { description?: string; rules?: string };
   type NodeInfoMap = Record<string, NodeInfo>;
   let nodeInfo: NodeInfoMap = {};
   function loadNodeInfo(): void {
      const v = getCached("nodeInfo");
      nodeInfo = v && typeof v === "object" ? (v as NodeInfoMap) : {};
   }
   function getInfo(key: string): NodeInfo {
      const e = nodeInfo[key];
      return { description: e?.description ?? "", rules: e?.rules ?? "" };
   }
   function saveInfo(key: string, payload: NodeInfo): void {
      const existing = nodeInfo[key] ?? { description: "", rules: "" };
      const nextDesc = (payload.description ?? existing.description ?? "").trim();
      const nextRules = payload.rules ?? existing.rules ?? "";
      if (!nextDesc) {
         toastError("La descripción es obligatoria para todos los nodos.");
         nodeInfo = { ...nodeInfo };
         return;
      }
      nodeInfo = { ...nodeInfo, [key]: { description: nextDesc, rules: nextRules } };
      setCached("nodeInfo", nodeInfo);
   }

   let resettingBaseline = false;
   let resetBaselineShow = false;
   function openResetBaseline(): void {
      if (resettingBaseline) return;
      resetBaselineShow = true;
   }
   async function confirmResetBaseline(): Promise<void> {
      resettingBaseline = true;
      try {
         const res = await fetch("/api/codegen/reset", { method: "POST" });
         const data = await res.json();
         if (!res.ok || !data?.ok) throw new Error(data?.error ?? `HTTP ${res.status}`);
         resetBaselineShow = false;
         toastSuccess("Baseline restaurado. Recargando…");
         window.setTimeout(() => window.location.reload(), 600);
      } catch (err) {
         resettingBaseline = false;
         const msg = err instanceof Error ? err.message : String(err);
         toastError(`No se pudo restaurar el baseline: ${msg}`);
      }
   }

   const PANEL_INFO_KEY = "panel:sql-tree";
   const PANEL_INFO_DEFAULT_DESCRIPTION = `<p><strong>Editor visual del modelo de datos del proyecto ISA-DOC.</strong></p>
<p>Permite gestionar dominios, pivotes, tablas master/esclavas, pointers, prefijos y cardinalidades del esquema SQL del proyecto. Los cambios se persisten automáticamente en el archivo de estado del codegen y alimentan la generación de modelos, server y client.</p>
<ul>
<li>Árbol izquierdo: navegación jerárquica por prefijo, dominio y pivote.</li>
<li>Panel central: detalle, columnas SQL y configuración de recursos.</li>
<li>Panel derecho: código generado (SQL, model, server, client, Azure).</li>
</ul>`;
   const PANEL_INFO_DEFAULT_RULES = `<ul>
<li>Cada slave o pointer define su propia cardinalidad respecto al master.</li>
<li>Los pivotes no tienen cardinalidad propia; la define su entidad master.</li>
<li>Los pivotes de tipo pivot requieren exactamente master más un slave.</li>
<li>Los nombres de tabla se almacenan en MAYÚSCULAS con guion bajo como separador.</li>
<li>La identidad de tablas, dominios y órdenes se basa en IDs estables; los nombres son secundarios y pueden cambiar.</li>
<li>Un pointer referencia una tabla externa al dominio padre conservando el mismo tableKey.</li>
</ul>`;
   $: panelInfoRaw = (nodeInfo[PANEL_INFO_KEY] ?? { description: "", rules: "" }) as NodeInfo;
   $: panelInfo = {
      description: panelInfoRaw.description?.trim() ? panelInfoRaw.description : PANEL_INFO_DEFAULT_DESCRIPTION,
      rules: panelInfoRaw.rules?.trim() ? panelInfoRaw.rules : PANEL_INFO_DEFAULT_RULES,
   } as NodeInfo;

   function infoKeyOf(obj: { kind?: string; domainId?: string; prefix?: string; rowName?: string; tableKey?: string }): string {
      if (!obj || !obj.kind) return "";
      if (obj.kind === "prefix") return `prefix:${String(obj.prefix ?? obj.rowName ?? "")}`;
      if (obj.kind === "domain" || obj.kind === "pivot") return `domain:${String(obj.domainId ?? "")}`;
      if (obj.kind === "table") return `table:${String(obj.tableKey ?? "")}`;
      return "";
   }

   function collectDomainCardinalities(domainId: string, dm: DomainsMap, tablesArr: ParsedTable[]): Array<{ from: string; to: string; card: string }> {
      const out: Array<{ from: string; to: string; card: string }> = [];
      const visited = new Set<string>();
      const walk = (id: string): void => {
         if (visited.has(id)) return;
         visited.add(id);
         const d = dm[id];
         if (!d) return;
         const masterTbl = tablesArr.find((t) => t.id === d.masterTable);
         const masterName = masterTbl ? effectiveTableName(masterTbl) : "—";
         for (const memberId of d.members) {
            if (memberId === d.masterTable) continue;
            const slaveTbl = tablesArr.find((t) => t.id === memberId);
            if (!slaveTbl) continue;
            const card = d.slaveCardinalities?.[memberId] ?? "1:N";
            out.push({ from: masterName, to: effectiveTableName(slaveTbl), card });
         }
         for (const child of d.childrenOrder ?? []) {
            if (child.kind === "pointer") {
               const ptrTbl = tablesArr.find((t) => t.id === child.key);
               if (ptrTbl) out.push({ from: masterName, to: effectiveTableName(ptrTbl), card: child.cardinality ?? "1:N" });
            }
         }
         for (const childDom of Object.values(dm)) {
            if (childDom.parentId !== id) continue;
            const childMasterTbl = tablesArr.find((t) => t.id === childDom.masterTable);
            if (childMasterTbl) {
               const card = childDom.cardinality ?? "1:N";
               out.push({ from: masterName, to: effectiveTableName(childMasterTbl), card });
            }
            walk(childDom.id);
         }
      };
      walk(domainId);
      return out;
   }

   function renderCardinalityTable(rows: Array<{ from: string; to: string; card: string }>): string {
      if (rows.length === 0) return "_Sin relaciones registradas._";
      const lines: string[] = [];
      lines.push(`| Origen | Destino | Cardinalidad |`);
      lines.push(`| --- | --- | --- |`);
      for (const r of rows) lines.push(`| \`${r.from}\` | \`${r.to}\` | \`${r.card}\` |`);
      return lines.join("\n");
   }

   function buildPivotMarkdown(domainId: string, domainsMap: DomainsMap, tablesArr: ParsedTable[]): string {
      const d = domainsMap[domainId];
      if (!d) return "_Sin información del pivote._";
      const card = d.cardinality ?? "1:N";
      const parent = d.parentId ? domainsMap[d.parentId] : undefined;
      const parentName = parent?.name ?? "—";
      const parentMaster = parent ? tablesArr.find((t) => t.id === parent.masterTable) : undefined;
      const parentMasterName = parentMaster ? effectiveTableName(parentMaster) : "—";
      const masterTbl = tablesArr.find((t) => t.id === d.masterTable);
      const masterName = masterTbl ? effectiveTableName(masterTbl) : "—";

      const lines: string[] = [];
      lines.push(`## Pivote · ${d.name ?? domainId}`);
      lines.push("");
      lines.push(`Pivote dentro del dominio ${parentName} con cardinalidad ${card} respecto al master ${parentMasterName}. La tabla pivote es ${masterName}.`);
      lines.push("");
      lines.push(`### Resumen`);
      lines.push("");
      lines.push(`| Atributo | Valor |`);
      lines.push(`| --- | --- |`);
      lines.push(`| Cardinalidad respecto al padre | \`${card}\` |`);
      lines.push(`| Dominio padre | \`${parentName}\` |`);
      lines.push(`| Master del dominio padre | \`${parentMasterName}\` |`);
      lines.push(`| Master del pivote | \`${masterName}\` |`);

      const rows = collectDomainCardinalities(domainId, domainsMap, tablesArr);
      lines.push("");
      lines.push(`### Cardinalidades`);
      lines.push("");
      lines.push(renderCardinalityTable(rows));
      return lines.join("\n");
   }

   function buildDomainMarkdown(domainId: string, domainsMap: DomainsMap, tablesArr: ParsedTable[]): string {
      const d = domainsMap[domainId];
      if (!d) return "_Sin información del dominio._";
      const masterTbl = tablesArr.find((t) => t.id === d.masterTable);
      const masterName = masterTbl ? effectiveTableName(masterTbl) : "—";

      const lines: string[] = [];
      lines.push(`## Dominio · ${d.name ?? domainId}`);
      lines.push("");
      lines.push(`Dominio raíz expuesto por la API. Su master es ${masterName}.`);
      if (d.prefix) lines.push(`Prefijo: \`${d.prefix}\`.`);
      lines.push("");
      lines.push(`### Resumen`);
      lines.push("");
      lines.push(`| Atributo | Valor |`);
      lines.push(`| --- | --- |`);
      lines.push(`| Master | \`${masterName}\` |`);
      lines.push(`| Tablas miembro | \`${d.members.length}\` |`);
      if (d.prefix) lines.push(`| Prefijo | \`${d.prefix}\` |`);

      const rows = collectDomainCardinalities(domainId, domainsMap, tablesArr);
      lines.push("");
      lines.push(`### Cardinalidades`);
      lines.push("");
      lines.push(renderCardinalityTable(rows));
      return lines.join("\n");
   }

   /** Canal de sincronización entre pestañas del navegador para `/api/tables`. */
   const TABLES_BROADCAST_CHANNEL = "isa-doc:tables";
   let tablesChannel: BroadcastChannel | null = null;
   let tabId: string = "";

   function toggleRunLock(key: string): void {
      runUnlocked = { ...runUnlocked, [key]: !runUnlocked[key] };
   }

   async function runCode(key: string, code: string, language: "sql" | "ts"): Promise<void> {
      if (!runUnlocked[key] || runBusy[key]) return;
      runBusy = { ...runBusy, [key]: true };
      try {
         const r = await fetch("/api/run", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ key, code, language }),
         });
         if (!r.ok) throw new Error(`HTTP ${r.status}`);
         toastSuccess(`Ejecutado: ${key}`);
      } catch (err) {
         toastError(`Error ejecutando ${key}: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
         runBusy = { ...runBusy, [key]: false };
         runUnlocked = { ...runUnlocked, [key]: false };
      }
   }

   const adapter = new TreeSQLTablesAdapter([], onAdapterChange);
   adapter.onTableSelect = (key, ctx) => {
      selectedKey = key;
      selectedPointerCtx = ctx ?? { isPointer: false };
      selectedDomainNode = null;
   };
   adapter.onDomainNodeSelect = (info) => {
      selectedDomainNode = info;
      if (info) selectedKey = null;
   };
   adapter.onDomainsChange = (d) => {
      domains = d;
   };
   adapter.onCascadeAddDomain = () => {
      adapter.addDomainAtFocus();
      toastSuccess(`Dominio creado. Marca una tabla como master desde el árbol.`);
   };
   adapter.onCascadeAddPivot = () => {
      adapter.addPivotAtFocus();
      toastSuccess(`Pivote creado. Marca una tabla como master y agrega dominios o tablas miembros.`);
   };
   adapter.onCascadeAddPrefix = () => {
      adapter.addPrefixAtFocus();
      toastSuccess(`Prefijo creado. Renómbralo y agrega tablas o subgrupos.`);
   };
   adapter.onCascadeAddChildPrefix = (parent) => {
      const parentKey = parent.kind === "domain" ? `domain:${parent.domainId ?? ""}` : parent.kind === "pivot" ? `pivot:${parent.domainId ?? ""}` : parent.kind === "prefix" ? `prefix:${parent.prefix ?? ""}` : "";
      adapter.addEmptyPrefix(parentKey);
      toastSuccess(`Prefijo creado como hijo. Renómbralo desde el árbol.`);
   };
   adapter.onGenerateSql = () => {
      void generateSql();
   };
   adapter.onShowDER = () => {
      void openDERModal();
   };
   domains = adapter.domains;
   const adapterAny = adapter as any;

   function tableKey(t: ParsedTable): string {
      return t.id;
   }

   function isHistorialDerived(t: ParsedTable): boolean {
      // HISTORIAL virtual tables son derivadas de auto-stack: empiezan con
      // "HISTORIAL" y no llevan la marca autoStack (esa la lleva la maestra).
      return t.name.startsWith("HISTORIAL") && !t.autoStack;
   }

   function setTables(list: ParsedTable[]): void {
      tables = list;
      adapter.setTables(tables);
      if (selectedKey && !tables.some((t) => tableKey(t) === selectedKey)) selectedKey = null;
      if (!selectedKey && tables[0]) selectedKey = tableKey(tables[0]);
   }

   function onAdapterChange(state: TablesBrowserState): void {
      // Persistir orden y/o renombrados de inmediato para que el árbol conserve
      // el reordenamiento en la próxima carga.
      const sameOrder = state.tables.length === tables.length && state.tables.every((t, i) => t.name === tables[i]?.name && (t.effectivePrefix ?? "") === (tables[i]?.effectivePrefix ?? ""));
      if (state.prefixRenames.length === 0 && sameOrder) return;
      tables = state.tables;
      // Mantener el adapter sincronizado con el nuevo estado para que sus
      // próximas operaciones (rebuildRows, emitChange) usen `effectivePrefix`
      // actualizado y no se generen ciclos por estado divergente.
      (adapter as TreeSQLTablesAdapter).syncTablesQuiet(tables);
      dirty = true;
      scheduleSave();
   }

   $: selected = (() => {
      if (!selectedKey) return null;
      const idx = tables.findIndex((t) => tableKey(t) === selectedKey);
      if (idx < 0) return null;
      return { table: tables[idx], index: idx };
   })();

   $: autogen = generateResourcesFromTables(tables, domains);
   $: tablesPlain = tables.map((t) => ({ ...t, customization: undefined }));
   $: inferredAutogen = generateResourcesFromTables(tablesPlain, domains);
   $: resByTable = new Map(autogen.resources.map((r) => [r.tableName.toUpperCase(), r]));
   $: inferredById = Object.fromEntries(inferredAutogen.resources.map((r) => [r.id, r])) as Record<string, ResourceConfig>;
   $: mergedResources = autogen.resources;
   $: mergedById = Object.fromEntries(mergedResources.map((r) => [r.id, r])) as Record<string, ResourceConfig>;
   $: mergedByTable = new Map(mergedResources.map((r) => [r.tableName.toUpperCase(), r]));
   $: classNameByTable = new Map(mergedResources.map((r) => [r.tableName.toUpperCase(), r.className]));
   const displayName = (sqlName: string, mode: "sql" | "model", map: Map<string, string>): string => {
      if (mode === "model") return map.get((sqlName ?? "").toUpperCase()) ?? sqlName ?? "";
      return sqlName ?? "";
   };

   $: selectedIsMaster = !!(selected && isMasterFn(domains, selected.table.id));
   $: selectedSlaves = selected ? getSlaves(domains, selected.table.id) : [];
   $: selectedSlaveNames = (selectedSlaves ?? [])
      .map((sid) => tables.find((tt) => tt.id === sid))
      .filter((tt): tt is ParsedTable => !!tt)
      .map((tt) => effectiveTableName(tt));
   $: selectedDomain = selected ? findDomainOf(domains, selected.table.id) : undefined;
   $: selectedDomainWrappedByPivot = !!selectedDomain && Object.values(domains).some((d) => (d.type === "pivot" || d.type === "pivot-domain") && (d.childrenOrder ?? []).some((c) => (c.kind === "domain" || c.kind === "pivot") && c.key === selectedDomain!.id));
   $: selectedPivotDomain = selectedDomainNode?.kind === "pivot" ? domains[selectedDomainNode.domainId] : undefined;
   $: selectedPlainDomain = selectedDomainNode?.kind === "domain" ? domains[selectedDomainNode.domainId] : undefined;
   $: selectedPivotInfoKey = selectedDomainNode ? `domain:${selectedDomainNode.domainId}` : "";
   $: selectedPivotInfo = selectedPivotInfoKey ? (nodeInfo[selectedPivotInfoKey] ?? { description: "", rules: "" }) : { description: "", rules: "" };
   $: selectedDomainNodeMd = selectedDomainNode ? (selectedDomainNode.kind === "pivot" ? buildPivotMarkdown(selectedDomainNode.domainId, domains, tables) : buildDomainMarkdown(selectedDomainNode.domainId, domains, tables)) : "";
   $: selectedDomainNodeMdHtml = selectedDomainNodeMd ? (marked.parse(selectedDomainNodeMd, { async: false }) as string) : "";
   $: if (activeCodeTab === "azure" && !selectedIsMaster) activeCodeTab = "sql";

   async function handleCfgChange(id: string): Promise<void> {
      const inferred = inferredById[id];
      const merged = mergedById[id];
      if (!inferred || !merged) return;
      const t = tables.find((tt) => tt.name.toUpperCase() === merged.tableName.toUpperCase());
      if (!t) return;
      const idx = tables.indexOf(t);
      const cust = buildCustomizationFromMerged(merged, inferred);
      tables[idx] = { ...t, customization: Object.keys(cust).length ? cust : undefined };
      tables = tables;
      adapter.setTables(tables);
      dirty = true;
      scheduleSave();
   }

   function buildCustomizationFromMerged(merged: ResourceConfig, inferred: ResourceConfig): NonNullable<ParsedTable["customization"]> {
      const out: NonNullable<ParsedTable["customization"]> = {};
      const eq = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);
      if (merged.id !== inferred.id) out.resourceId = merged.id;
      if (merged.className !== inferred.className) out.className = merged.className;
      if ((merged.tableConst ?? undefined) !== (inferred.tableConst ?? undefined)) out.tableConst = merged.tableConst;
      if (merged.module !== inferred.module) out.module = merged.module;
      if (merged.singularApi !== inferred.singularApi) out.singularApi = merged.singularApi;
      if (merged.pluralApi !== inferred.pluralApi) out.pluralApi = merged.pluralApi;
      if (merged.singularCaption !== inferred.singularCaption) out.singularCaption = merged.singularCaption;
      if (merged.pluralCaption !== inferred.pluralCaption) out.pluralCaption = merged.pluralCaption;
      if (merged.isysRecurso !== inferred.isysRecurso) out.isysRecurso = merged.isysRecurso;
      if (merged.parentBaseClass !== inferred.parentBaseClass) out.parentBaseClass = merged.parentBaseClass;
      if ((merged.parentModelClass ?? undefined) !== (inferred.parentModelClass ?? undefined)) out.parentModelClass = merged.parentModelClass;
      if (merged.clientBaseClass !== inferred.clientBaseClass) out.clientBaseClass = merged.clientBaseClass;
      if (merged.uiBaseKind !== inferred.uiBaseKind) out.uiBaseKind = merged.uiBaseKind;
      if (!eq(merged.omitOps ?? [], inferred.omitOps ?? [])) out.omitOps = merged.omitOps ? [...merged.omitOps] : undefined;
      if ((merged.exposeInFn ?? undefined) !== (inferred.exposeInFn ?? undefined)) out.exposeInFn = merged.exposeInFn;
      if ((merged.orderBy ?? undefined) !== (inferred.orderBy ?? undefined)) out.orderBy = merged.orderBy;
      if (!eq(merged.detailSpec ?? {}, inferred.detailSpec ?? {})) {
         out.detailSpec = merged.detailSpec ? JSON.parse(JSON.stringify(merged.detailSpec)) : undefined;
      }
      // Las relaciones se derivan SIEMPRE de la estructura (PKs compartidas); no se persisten.
      // Sólo se conservan overrides de alias y de versus/equals por relación (clave = target).
      const infByTarget = new Map(inferred.relations.map((r) => [r.target, r]));
      const aliasOv: Record<string, string> = {};
      const relOv: Record<string, { versus?: RelationDef["versus"]; equals?: RelationDef["equals"] }> = {};
      for (const r of merged.relations) {
         const inf = infByTarget.get(r.target);
         if (inf && r.alias && r.alias !== inf.alias) aliasOv[r.target] = r.alias;
         const ov: { versus?: RelationDef["versus"]; equals?: RelationDef["equals"] } = {};
         if (inf && !eq(r.versus ?? [], inf.versus ?? [])) ov.versus = (r.versus ?? []).map((v) => ({ ...v }));
         if (inf && !eq(r.equals ?? [], inf.equals ?? [])) ov.equals = (r.equals ?? []).map((e) => ({ ...e }));
         if (ov.versus || ov.equals) relOv[r.target] = ov;
      }
      if (Object.keys(aliasOv).length) out.relationAliases = aliasOv;
      if (Object.keys(relOv).length) out.relationOverrides = relOv;
      if (!eq(merged.customHooks ?? [], inferred.customHooks ?? [])) {
         out.customHooks = (merged.customHooks ?? []).map((h) => ({ ...h }));
      }
      if (!eq(merged.helpers ?? [], inferred.helpers ?? [])) {
         out.helpers = (merged.helpers ?? []).map((h) => ({ ...h }));
      }
      if (merged.targetFiles && Object.keys(merged.targetFiles).length) {
         out.targetFiles = { ...merged.targetFiles };
      }
      const fOv: Record<string, NonNullable<NonNullable<ParsedTable["customization"]>["fieldOverrides"]>[string]> = {};
      const infByName = new Map<string, FieldDef>(inferred.fields.map((f) => [f.name, f]));
      for (const f of merged.fields) {
         const inf = infByName.get(f.name);
         if (!inf) continue;
         const ov: NonNullable<NonNullable<ParsedTable["customization"]>["fieldOverrides"]>[string] = {};
         if ((f.caption ?? undefined) !== (inf.caption ?? undefined)) ov.caption = f.caption;
         if ((f.visible ?? undefined) !== (inf.visible ?? undefined)) ov.visible = f.visible;
         if ((f.required ?? undefined) !== (inf.required ?? undefined)) ov.required = f.required;
         if ((f.defaultValue ?? undefined) !== (inf.defaultValue ?? undefined)) ov.defaultValue = f.defaultValue;
         if ((f.fk ?? undefined) !== (inf.fk ?? undefined)) ov.fk = f.fk;
         if ((f.enumName ?? undefined) !== (inf.enumName ?? undefined)) ov.enumName = f.enumName;
         if (Object.keys(ov).length) fOv[f.name] = ov;
      }
      if (Object.keys(fOv).length) out.fieldOverrides = fOv;
      return out;
   }

   function onTableChange(idx: number, t: ParsedTable): void {
      tables[idx] = { ...t };
      tables = tables;
      adapter.setTables(tables);
      dirty = true;
      scheduleSave();
   }

   /**
    * Activa o desactiva la generación de un snippet (`sql` por ahora) para la
    * tabla seleccionada. Persiste el flag en `t.snippets` y, si se desactivó
    * el SQL estando en esa pestaña, mueve el foco a otra pestaña visible.
    */
   function setTableSnippet(idx: number, key: "sql", enabled: boolean): void {
      const t = tables[idx];
      if (!t) return;
      const current = (t.snippets ?? {}) as NonNullable<ParsedTable["snippets"]>;
      const nextFlag: boolean | undefined = enabled ? undefined : false;
      const nextSnippets: NonNullable<ParsedTable["snippets"]> = { ...current };
      if (nextFlag === undefined) delete (nextSnippets as Record<string, unknown>)[key];
      else nextSnippets[key] = nextFlag;
      const cleaned = Object.keys(nextSnippets).length ? nextSnippets : undefined;
      tables[idx] = { ...t, snippets: cleaned };
      tables = tables;
      adapter.setTables(tables);
      dirty = true;
      scheduleSave();
   }

   async function load(): Promise<void> {
      try {
         loading = true;
         dirty = false;
         const list = await provider.loadTables();
         // Backfill de id estable: tablas legacy persistidas antes de la migración
         // llegan sin `id`. Asignamos uno aquí y marcamos `dirty` para round-tripear
         // los ids al server en el siguiente save.
         let backfilled = false;
         for (const t of list) {
            if (!t.id) {
               t.id = newTableId();
               backfilled = true;
            }
         }
         setTables(list);
         if (provider.buildSyntheticDomains) {
            const syn = provider.buildSyntheticDomains(list);
            if (syn) {
               adapter.setDomains(syn, false);
               domains = adapter.domains;
            }
         }
         if (backfilled && !providerConfig.skipBackfillSave) {
            dirty = true;
            void save(true);
         }
      } catch (err) {
         toastError(`Error cargando tablas: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
         loading = false;
      }
   }

   async function save(silent = false): Promise<void> {
      if (providerConfig.readOnly) { dirty = false; return; }
      if (saving) return;
      saving = true;
      try {
         await provider.saveTables(tables);
         if (!silent) toastSuccess(`Tablas guardadas (${tables.length})`);
         dirty = false;
         broadcastTablesUpdated();
      } catch (err) {
         toastError(`Error guardando: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
         saving = false;
      }
   }

   /**
    * Debounce de 1 segundo para guardar el árbol completo. Cada llamada
    * cancela el timer pendiente y reagenda el `save(true)`. Esto reemplaza
    * la antigua emisión por setter: en lugar de un PUT por cada mutación
    * fina, agendamos UN PUT con el snapshot final del árbol cuando el
    * usuario deja de tocar por 1 s.
    */
   let saveTimer: number | null = null;
   function scheduleSave(): void {
      if (typeof window === "undefined") return;
      if (saveTimer !== null) window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
         saveTimer = null;
         void save(true);
      }, 1000);
   }

   /** Notifica a otras pestañas que `/api/tables` cambió para que recarguen. */
   function broadcastTablesUpdated(): void {
      if (!tablesChannel) return;
      if (!isRealtimeEnabled()) return;
      try {
         tablesChannel.postMessage({ kind: "tables-updated", senderId: tabId, ts: Date.now() });
      } catch {
         /* noop */
      }
   }

   async function generateSql(): Promise<void> {
      if (generating) return;
      generating = true;
      try {
         if (saveTimer !== null) {
            window.clearTimeout(saveTimer);
            saveTimer = null;
         }
         if (dirty) await save(true);
         const r = await fetch("/api/sql/generate?dry=1", { method: "POST" });
         const data = (await r.json()) as { ok?: boolean; full?: string; count?: number; error?: string };
         if (!r.ok || !data.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
         sqlPreviewValue = data.full ?? "";
         sqlPreviewShow = true;
      } catch (err) {
         toastError(`Error generando SQL: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
         generating = false;
      }
   }

   async function executeSqlFromPreview(): Promise<void> {
      if (sqlPreviewExecuting || !sqlPreviewUnlocked) return;
      sqlPreviewExecuting = true;
      try {
         const r = await fetch("/api/sql/generate", { method: "POST" });
         const data = (await r.json()) as { ok?: boolean; count?: number; error?: string };
         if (!r.ok || !data.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
         toastSuccess(`SQL aplicado (${data.count ?? tables.length} tablas)`);
         sqlPreviewShow = false;
      } catch (err) {
         toastError(`Error ejecutando SQL: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
         sqlPreviewExecuting = false;
         sqlPreviewUnlocked = false;
      }
   }

   function cardToMermaid(card: string | undefined): string {
      switch (card) {
         case "1:1":
            return "||--||";
         default:
            return "||--o{";
      }
   }

   function sanitizeMermaidId(s: string): string {
      const out = (s || "").replace(/[^A-Za-z0-9_]/g, "_");
      return /^[A-Za-z_]/.test(out) ? out : `T_${out}`;
   }

   function sanitizeMermaidType(s: string): string {
      const out = (s || "").replace(/\s+/g, "").replace(/[^A-Za-z0-9_()]/g, "_");
      return /^[A-Za-z_]/.test(out) ? out : `T_${out}` || "VAR";
   }

   function buildMermaidDER(): string {
      const lines: string[] = ["---", "config:", "  layout: elk", "  theme: dark", "  look: classic", "---", "erDiagram", "  direction LR"];
      const nameOf = (id: string): string => {
         const t = tables.find((x) => x.id === id);
         return t ? sanitizeMermaidId(effectiveTableName(t)) : "";
      };

      const emittedEntities = new Set<string>();
      const hideColumns = providerConfig.hideColumnsInDiagram;

      for (const t of tables) {
         const ent = sanitizeMermaidId(effectiveTableName(t));
         if (emittedEntities.has(ent)) continue;
         emittedEntities.add(ent);
         if (hideColumns) {
            lines.push(`  ${ent} {}`);
            continue;
         }
         lines.push(`  ${ent} {`);
         const seenCol = new Set<string>();
         for (const c of tableColumns(t)) {
            const cname = sanitizeMermaidId(c.name);
            const dedupeKey = cname.toUpperCase();
            if (seenCol.has(dedupeKey)) continue;
            seenCol.add(dedupeKey);
            const typ = sanitizeMermaidType(c.type);
            const tags: string[] = [];
            if (c.primaryKey) tags.push("PK");
            if (c.foreignKey) tags.push("FK");
            lines.push(`    ${cname} ${typ}${tags.length ? " " + tags.join(",") : ""}`);
         }
         lines.push(`  }`);
      }

      const emitted = new Set<string>();
      const emit = (from: string, to: string, card: string | undefined, label: string): void => {
         if (!from || !to || from === to) return;
         const key = `${from}->${to}::${cardToMermaid(card)}::${label}`;
         if (emitted.has(key)) return;
         emitted.add(key);
         const safeLabel = label.replace(/"/g, "'");
         lines.push(`  ${from} ${cardToMermaid(card)} ${to} : "${safeLabel}"`);
      };

      for (const d of Object.values(domains)) {
         const masterName = nameOf(d.masterTable);
         if (!masterName) continue;
         for (const m of d.members) {
            if (m === d.masterTable) continue;
            const slaveName = nameOf(m);
            const card = d.slaveCardinalities?.[m] ?? d.cardinality ?? "1:N";
            emit(masterName, slaveName, card, "contiene");
         }
         for (const ch of d.childrenOrder ?? []) {
            if (ch.kind === "pointer") {
               emit(masterName, nameOf(ch.key), ch.cardinality ?? "1:N", "ref");
            }
         }
         for (const cd of Object.values(domains)) {
            if (cd.parentId !== d.id) continue;
            emit(masterName, nameOf(cd.masterTable), cd.cardinality ?? "1:N", "agrupa");
         }
      }

      for (const t of tables) {
         const fromName = sanitizeMermaidId(effectiveTableName(t));
         for (const c of tableColumns(t)) {
            if (c.foreignKey) {
               emit(sanitizeMermaidId(c.foreignKey.refTable), fromName, "1:N", `fk_${c.name}`);
            }
         }
         for (const r of t.relations ?? []) {
            emit(sanitizeMermaidId(r.refTable), fromName, "1:N", r.name || "fk");
         }
      }

      return lines.join("\n");
   }

   $: DER_DOMAIN = providerConfig.derDomain;

   async function sha1Hex(s: string): Promise<string> {
      const buf = new TextEncoder().encode(s);
      const hash = await crypto.subtle.digest("SHA-1", buf);
      return Array.from(new Uint8Array(hash))
         .map((b) => b.toString(16).padStart(2, "0"))
         .join("");
   }

   async function fetchCachedDer(domain: string, expectedHash: string): Promise<string | null> {
      try {
         const metaRes = await fetch(`/bd/codegen/der/${domain}.json`, { cache: "no-store" });
         if (!metaRes.ok) return null;
         const meta = (await metaRes.json()) as { hash?: string };
         if (meta?.hash !== expectedHash) return null;
         const svgRes = await fetch(`/bd/codegen/der/${domain}.svg`, { cache: "no-store" });
         if (!svgRes.ok) return null;
         return await svgRes.text();
      } catch {
         return null;
      }
   }

   function uploadDerCache(domain: string, hash: string, source: string, svg: string): void {
      void fetch("/api/codegen/der", {
         method: "POST",
         headers: { "content-type": "application/json" },
         body: JSON.stringify({ domain, hash, source, svg }),
      }).catch(() => {});
   }

   async function applyDerSvg(svg: string): Promise<void> {
      derSvg = svg;
      // Reset el cache de tamaño natural porque cambió el contenido.
      await tick();
      const oldSvg = derViewport?.querySelector(".der-content > svg") as SVGSVGElement | null;
      if (oldSvg) delete oldSvg.dataset.derNatural;
      applyDerSvgScale(derScale, derSvg);
      await tick();
      fitDerView("both");
   }

   async function openDERModal(): Promise<void> {
      derError = "";
      derSvg = "";
      derSource = buildMermaidDER();
      derShow = true;
      derLoading = true;
      resetDerView();

      const localHash = await sha1Hex(derSource);
      const cached = await fetchCachedDer(DER_DOMAIN, localHash);

      if (cached) {
         derLoading = false;
         await applyDerSvg(cached);
         return;
      }

      try {
         const fresh = await renderMermaidSvg(derSource);
         derLoading = false;
         await applyDerSvg(fresh);
         if (fresh) uploadDerCache(DER_DOMAIN, localHash, derSource, fresh);
      } catch (err) {
         derError = err instanceof Error ? err.message : String(err);
         derLoading = false;
      }
   }

   function onDerKeydown(e: KeyboardEvent): void {
      if (!derShow) return;
      if (e.ctrlKey && (e.code === "Digit0" || e.code === "Numpad0" || e.key === "0")) {
         e.preventDefault();
         fitDerView();
      }
   }

   function openCodeModal(title: string, value: string, language: "sql" | "ts" = "ts"): void {
      modalTitle = title;
      modalValue = value;
      modalLanguage = language;
      modalShow = true;
   }

   async function loadOverrides(): Promise<void> {
      // Override layer eliminado: las personalizaciones viven en `t.customization`
      // y se persisten al guardar `tables` en `/api/tables`. Función conservada
      // como no-op por compatibilidad con call sites existentes.
      return;
   }

   onMount(() => {
      void (async () => {
         if (!providerConfig.skipStatePersistence) {
            await loadStateFromServer();
            loadNodeInfo();
            domains = adapter.reloadFromCache();
         }
         void load();
         void loadOverrides();
      })();
      // Sincronización entre pestañas: cuando otra pestaña guarda `/api/tables`,
      // recargamos el estado para reflejar los cambios remotos. No recargamos
      // si hay edición sucia local pendiente para evitar perder cambios no
      // confirmados — el flush por `pagehide` cubrirá el caso de cierre.
      if (typeof window !== "undefined" && typeof BroadcastChannel !== "undefined" && !providerConfig.skipStatePersistence) {
         tabId = `tab_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
         tablesChannel = new BroadcastChannel(TABLES_BROADCAST_CHANNEL);
         tablesChannel.onmessage = (ev) => {
            if (!isRealtimeEnabled()) return;
            const msg = ev.data as { kind?: string; senderId?: string } | null;
            if (!msg || msg.kind !== "tables-updated") return;
            if (msg.senderId === tabId) return;
            if (dirty || saving) return;
            void load();
            void loadOverrides();
            void reloadStateFromServer().then(() => {
               domains = adapter.reloadFromCache();
            });
         };
      }
      // Sincronización del estado de codegen (`_state.json`): cuando otra
      // pestaña reordena dominios/prefijos, recibimos
      // la notificación y rehidratamos los dominios sin tocar las tablas.
      const offStateChanged = providerConfig.skipStatePersistence
         ? () => {}
         : onStateChanged(() => {
            if (!isRealtimeEnabled()) return;
            if (dirty || saving) return;
            void reloadStateFromServer().then(() => {
               domains = adapter.reloadFromCache();
            });
         });
      // Asegura persistencia del save de tablas ante refresh/cierre repentino.
      // Si hubo cambios pendientes (`dirty`), envía un `sendBeacon` con los
      // `tables` actuales como respaldo; el backend trata PUT igual que POST
      // para este endpoint via la lectura del body JSON.
      const flushTablesOnUnload = (): void => {
         if (!dirty || providerConfig.readOnly) return;
         try {
            const blob = new Blob([JSON.stringify({ tables })], { type: "application/json" });
            if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
               navigator.sendBeacon("/api/tables", blob);
               return;
            }
            void provider.saveTables(tables);
         } catch {
            /* noop */
         }
      };
      if (typeof window !== "undefined") {
         window.addEventListener("pagehide", flushTablesOnUnload);
         window.addEventListener("beforeunload", flushTablesOnUnload);
      }
      return () => {
         if (typeof window !== "undefined") {
            window.removeEventListener("pagehide", flushTablesOnUnload);
            window.removeEventListener("beforeunload", flushTablesOnUnload);
         }
         if (saveTimer !== null) {
            try {
               window.clearTimeout(saveTimer);
            } catch {
               /* noop */
            }
            saveTimer = null;
         }
         if (tablesChannel) {
            try {
               tablesChannel.close();
            } catch {
               /* noop */
            }
            tablesChannel = null;
         }
         try {
            offStateChanged();
         } catch {
            /* noop */
         }
      };
   });

   $: focusOnSelection(selectedKey);

   function focusOnSelection(_key: string | null): void {
      if (typeof window === "undefined") return;
      requestAnimationFrame(() => {
         const formPane = document.querySelector<HTMLElement>(".browser .form-pane");
         if (!formPane) return;
         // Solo flashear visualmente; NO robar el foco al usuario que está
         // interactuando con el árbol u otros controles.
         formPane.classList.add("entity-focus-flash");
         window.setTimeout(() => formPane.classList.remove("entity-focus-flash"), 700);
      });
   }
</script>

<svelte:window on:keydown={onDerKeydown} />

<Toaster />

<section class="browser">
   <Card>
      <FlexLayout items="center" justify="between">
         <div>
            <H2>Editor visual de tablas</H2>
            <Text color="neutral"><small>Árbol con prefijos como carpetas (visual) y tablas como nodos. Los cambios se guardan automáticamente.</small></Text>
         </div>
         <FlexLayout items="center">
            <div class="name-mode-host" title="Cambia el nombre mostrado en los nodos de tabla del árbol">
               <SelectEnum label="Mostrar" required={false} enumValue={NameModeEnum} bind:value={nameMode} />
            </div>
            <InfoEditModal title="Información del panel SQL" buttonTitle="Info del panel" description={panelInfo.description ?? ""} rules={panelInfo.rules ?? ""} on:save={(e) => saveInfo(PANEL_INFO_KEY, e.detail)} />
            <ButtonIconify icon="mdi:graph-outline" title="Diagrama entidad-relación (DER)" on:click={() => adapter.onShowDER()} />
            <ButtonIconify icon="mdi:backup-restore" title="Restaurar al último baseline estable" disabled={resettingBaseline} on:click={openResetBaseline} />
            {#if saving}
               <FlexLayout items="center"><Iconify icon="mdi:loading" /><Text color="neutral"><small>Guardando…</small></Text></FlexLayout>
            {/if}
         </FlexLayout>
      </FlexLayout>
   </Card>

   <div class="layout">
      <div class="tree-pane">
         <div class="pane-scroll custom-scrollbar">
            {#if loading}
               <Text color="neutral">Cargando…</Text>
            {:else if tables.length === 0}
               <Text color="neutral">Sin tablas.</Text>
            {:else}
               <div class="tables-tree-host">
                  <TreeView Obj={adapter.obj} itdForm="edit" brapido={true} small={true} readonly={false} bdrag={true} bcanMoveOutside={() => true} showToolbar={true} CatalogoController={adapterAny.catalogoController} TreeController={adapter} objWorking={adapterAny.objWorking}>
                     <svelte:fragment slot="row" let:node>
                        {#if node.kind === "prefix"}
                           <span class="tree-row" title={`Prefijo: ${node.rowName ?? ""}`}>
                              <span class="badge badge-prefix">Prefixer</span>
                              <span class="tree-row-name">{node.rowName}</span>
                           </span>
                        {:else if node.kind === "domain"}
                           <span class="tree-row" title={`${node.domainType === "bd" ? "Base de datos" : "Dominio"}: ${node.rowName ?? node.domainId ?? ""}${node.prefix ? ` (prefijo ${node.prefix})` : ""}`}>
                              {#if node.domainType === "bd"}
                                 <span class="badge badge-bd"><Iconify icon="mdi:database" /> BD</span>
                              {:else}
                                 <span class="badge badge-domain">Domain</span>
                              {/if}
                              {#if node.prefix}<span class="tree-row-name" title="Prefijo aplicado a las tablas del dominio">{node.prefix}</span>
                              {:else if node.rowName}<span class="tree-row-name">{node.rowName}</span>{/if}
                           </span>
                        {:else if node.kind === "pivot"}
                           <span class="tree-row" title={`Pivote: ${node.rowName ?? node.domainId ?? ""}`}>
                              <span class="badge badge-pivot">Pivote</span>
                              {#if node.rowName}<span class="tree-row-name">{node.rowName}</span>{/if}
                           </span>
                        {:else}
                           {@const _tableParent = adapter.findNodeById(String(node.ireference || "").trim()) as unknown as { kind?: string; domainType?: string; ireference?: string } | null}
                           {@const _isMasterOfDomain = !!_tableParent && _tableParent.kind === "domain"}
                           {@const _isInsidePivot = _tableParent?.domainType === "pivot" || _tableParent?.domainType === "pivot-domain"}
                           {@const _isInsideDomain = !!_tableParent && (_tableParent.domainType === "domain" || _isInsidePivot)}
                           {@const _grandParent = _tableParent ? (adapter.findNodeById(String(_tableParent.ireference || "").trim()) as unknown as { domainType?: string } | null) : null}
                           {@const _parentDomainWrappedByPivot = _grandParent?.domainType === "pivot" || _grandParent?.domainType === "pivot-domain"}
                           {@const _isMasterOfPlainDomain = !!node.isMaster && _tableParent?.domainType === "domain" && !_parentDomainWrappedByPivot}
                           {@const _showCardinality = _isInsideDomain && !_isMasterOfPlainDomain}
                           <span class="tree-row {node.isPointer ? 'tree-row-pointer' : ''}" title={node.isPointer ? `Pointer → ${node.rowName ?? ""}` : `Tabla: ${node.rowName ?? ""}`}>
                              {#if node.isPointer}
                                 <span class="badge badge-pointer">Pointer</span>
                              {/if}
                              <span class="tree-row-name">{displayName(node.rowName, nameMode, classNameByTable)}</span>
                              {#if node.slaveCardinality && _showCardinality}
                                 <span class="tree-row-meta tree-row-card" title={node.isPointer ? "Cardinalidad del pointer respecto al master" : node.isMaster ? (_isMasterOfDomain ? "Cardinalidad por defecto del dominio" : "Cardinalidad del pivote respecto al dominio padre") : "Cardinalidad respecto al master"}>{node.slaveCardinality}</span>
                              {/if}
                           </span>
                        {/if}
                     </svelte:fragment>

                     <svelte:fragment slot="Frm" let:frmObj>
                        {#if frmObj}
                           {@const _infoKey = infoKeyOf(frmObj)}
                           {@const _info = (nodeInfo[_infoKey] ?? { description: "", rules: "" }) as NodeInfo}
                           {#if frmObj.kind === "prefix"}
                              <div class="frm">
                                 <label class="field">
                                    <Text color="neutral"><small>Prefijo</small></Text>
                                    <input
                                       class="input-field"
                                       type="text"
                                       bind:value={frmObj.rowName}
                                       on:input={(e) => {
                                          const v = e.currentTarget.value.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
                                          frmObj.rowName = v;
                                       }}
                                       on:change={() => adapter.updateNode(frmObj)}
                                       on:blur={() => adapter.updateNode(frmObj)}
                                    />
                                 </label>
                                 <Text color="neutral"><small>Renombrar el prefijo aplica el cambio a todas las tablas que lo usan al guardar.</small></Text>
                              </div>
                           {:else if frmObj.kind === "domain"}
                              <div class="frm">
                                 <Text color="neutral"><small>Un dominio agrupa tablas que se exponen como raíz en la API. La tabla master puede leer y modificar a sus esclavas.</small></Text>
                                 <label class="field">
                                    <Text color="neutral"><small>Descripción</small></Text>
                                    <textarea class="input-field" rows="3" required placeholder="Describe el propósito y contenido de este dominio." value={_info.description ?? ""} on:change={(e) => saveInfo(_infoKey, { description: e.currentTarget.value, rules: _info.rules ?? "" })}></textarea>
                                 </label>
                                 <label class="field">
                                    <Text color="neutral"><small>Prefijo (opcional, se aplica a las tablas del dominio)</small></Text>
                                    <input
                                       class="input-field"
                                       type="text"
                                       placeholder="p. ej. CAPAC_"
                                       value={frmObj.prefix ?? ""}
                                       on:input={(e) => {
                                          const v = e.currentTarget.value.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
                                          e.currentTarget.value = v;
                                       }}
                                       on:change={(e) => adapter.updateDomainMeta(frmObj.domainId, { prefix: e.currentTarget.value })}
                                    />
                                 </label>
                              </div>
                           {:else if frmObj.kind === "pivot"}
                              <div class="frm">
                                 <Text color="neutral"><small>El formulario del pivote vive en el panel central. Selecciona el pivote en el árbol para editarlo allí.</small></Text>
                              </div>
                           {:else}
                              <div class="frm">
                                 <label class="field">
                                    <Text color="neutral"><small>Nombre de la tabla</small></Text>
                                    <input
                                       class="input-field name-input"
                                       type="text"
                                       bind:value={frmObj.rowName}
                                       on:input={(e) => {
                                          frmObj.rowName = e.currentTarget.value.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
                                       }}
                                    />
                                 </label>
                                 {#if !frmObj.isMaster && frmObj.domainId}
                                    <Text color="neutral"><small>La cardinalidad de esta fila se edita en el panel de detalle a la derecha.</small></Text>
                                 {/if}
                                 <Text color="neutral"><small>El prefijo es una propiedad del grupo padre y no se edita desde aquí. Para editar columnas/secciones, usa el panel SQL.</small></Text>
                              </div>
                           {/if}
                           {#if _infoKey && frmObj.kind !== "pivot"}
                              <div class="frm">
                                 <label class="field">
                                    <Text color="neutral"><small>Descripción <span style="color: var(--is-error);">*</span></small></Text>
                                    <textarea class="input-field" rows="3" required value={_info.description ?? ""} on:change={(e) => saveInfo(_infoKey, { description: e.currentTarget.value, rules: "" })}></textarea>
                                 </label>
                              </div>
                           {/if}
                        {/if}
                     </svelte:fragment>
                  </TreeView>
               </div>
            {/if}
         </div>
      </div>

      <div class="form-pane">
         <div class="pane-scroll custom-scrollbar">
            {#if selectedPivotDomain}
               {@const dId = selectedPivotDomain.id}
               {#key dId}
                  <Card>
                     <FlexLayout items="center" justify="between">
                        <FlexLayout items="center">
                           <Iconify icon="mdi:link-variant" style="color: orange;" />
                           <H4>{selectedPivotDomain.name ?? dId}</H4>
                           <Text color="neutral"><small>Pivote</small></Text>
                        </FlexLayout>
                     </FlexLayout>

                     <div class="frm" style="margin-top: 0.5rem;">
                        <Text color="neutral"><small>La cardinalidad se asigna por fila (entidad SQL o pointer) dentro del pivote, no en el pivote mismo.</small></Text>
                        <label class="field">
                           <Text color="neutral"><small>Descripción <span style="color: var(--is-error);">*</span></small></Text>
                           <textarea class="input-field" rows="3" required placeholder="Describe el propósito y comportamiento de este pivote." value={selectedPivotDomain.description ?? ""} on:change={(e) => adapter.updateDomainMeta(dId, { description: e.currentTarget.value })}></textarea>
                        </label>
                     </div>
                  </Card>
               {/key}
            {:else if selectedPlainDomain}
               {@const dId = selectedPlainDomain.id}
               {#key dId}
                  <Card>
                     <FlexLayout items="center">
                        <Iconify icon="mdi:folder-outline" style="color: var(--is-primary);" />
                        <H4>{selectedPlainDomain.name ?? dId}</H4>
                        <Text color="neutral"><small>Dominio</small></Text>
                     </FlexLayout>
                     <div class="frm" style="margin-top: 0.5rem;">
                        <label class="field">
                           <Text color="neutral"><small>Prefijo</small></Text>
                           <input class="input-field" type="text" placeholder="Ej: CAPAC_" value={selectedPlainDomain.prefix ?? ""} on:change={(e) => adapter.updateDomainMeta(dId, { prefix: e.currentTarget.value })} />
                        </label>
                        <label class="field">
                           <Text color="neutral"><small>Descripción <span style="color: var(--is-error);">*</span></small></Text>
                           <textarea class="input-field" rows="4" required placeholder="Describe el propósito y contenido de este dominio." value={selectedPlainDomain.description ?? ""} on:change={(e) => adapter.updateDomainMeta(dId, { description: e.currentTarget.value })}></textarea>
                        </label>
                     </div>
                  </Card>
               {/key}
            {:else if !selected}
               <Card variant="flat"><Text color="neutral">Selecciona una tabla o pivote del árbol.</Text></Card>
            {:else}
               {@const t = selected.table}
               {@const idx = selected.index}
               {@const cfg = resByTable.get(t.name.toUpperCase())}
               {@const mergedCfg = mergedByTable.get(t.name.toUpperCase())}

               {#key tableKey(t) + "::" + activeCodeTab}
                  {@const isPtr = selectedPointerCtx.isPointer}
                  {@const ptrDomain = isPtr && selectedPointerCtx.domainId ? domains[selectedPointerCtx.domainId] : undefined}
                  {@const ptrEntry = ptrDomain ? (ptrDomain.childrenOrder ?? []).find((e) => e.kind === "pointer" && e.key === t.id) : undefined}
                  {@const tblEntry = !isPtr && selectedDomain ? (selectedDomain.childrenOrder ?? []).find((e) => e.kind === "table" && e.key === t.id) : undefined}
                  {@const effDomain = isPtr ? ptrDomain : selectedDomain}
                  {@const isMasterOfPivot = !isPtr && selectedIsMaster && (effDomain?.type === "pivot" || effDomain?.type === "pivot-domain")}
                  {@const isMasterOfDomain = !isPtr && selectedIsMaster && !isMasterOfPivot}
                  {@const isMasterOfPlainDomain = isMasterOfDomain && !selectedDomainWrappedByPivot}
                  {@const explicit = isPtr ? ptrEntry?.cardinality : (tblEntry?.cardinality ?? (!isMasterOfPivot ? effDomain?.slaveCardinalities?.[t.id] : undefined))}
                  {@const fallback = isMasterOfPivot ? (effDomain?.cardinality ?? "1:N") : "1:N"}
                  {@const cardValue = explicit ?? fallback ?? "1:N"}
                  {@const cardLabel = "Cardinalidad"}
                  <Card>
                     <FlexLayout items="center" justify="between">
                        <FlexLayout items="center">
                           <Iconify icon="mdi:table" />
                           <H4>{effectiveTableName(t)}</H4>
                        </FlexLayout>
                        <DocInfoModal title={`Documentación de la tabla ${t.name}`} label="Doc de la tabla" query={{ table: t.name }} />
                     </FlexLayout>

                     {#if isPtr}
                        <FlexLayout items="center" style="margin-top: 0.25rem;">
                           <Iconify icon="mdi:link-variant" color="primary" />
                           <Text color="primary"><small>Pointer · independiente del elemento apuntado</small></Text>
                        </FlexLayout>
                     {/if}

                     {#if activeCodeTab === "sql"}
                        <SqlTreeEditor table={t} prefix={t.effectivePrefix ?? ""} readonly={isHistorialDerived(t)} onChange={(nt) => onTableChange(idx, nt)}>
                           <svelte:fragment slot="extraControls">
                              {#if effDomain && !isMasterOfPlainDomain}
                                 <div class="card-inline-select">
                                    <SelectEnum
                                       label={cardLabel}
                                       required={true}
                                       enumValue={CardinalityEnum}
                                       value={cardValue}
                                       onChange={(v) => {
                                          const nv = v as "1:1" | "1:N";
                                          if (!effDomain) return;
                                          if (isPtr) adapter.setPointerCardinality(effDomain.id, t.id, nv);
                                          else adapter.setSlaveCardinality(effDomain.id, t.id, nv);
                                       }}
                                    />
                                 </div>
                              {/if}
                              <SwitchComp
                                 small
                                 label="Propia"
                                 title="Si está activo, el desarrollo SQL de esta entidad es propio del proyecto (se generan los snippets). Desactívalo cuando la tabla pertenezca a un sistema externo."
                                 checked={isSqlSnippetEnabled(t)}
                                 on:change={(ev: CustomEvent<boolean> | Event) => {
                                    const v = (ev as CustomEvent<boolean>).detail;
                                    const checked = typeof v === "boolean" ? v : (ev.target as HTMLInputElement).checked;
                                    setTableSnippet(idx, "sql", checked);
                                 }}
                              />
                           </svelte:fragment>
                        </SqlTreeEditor>
                     {:else if cfg && mergedCfg}
                        <ResourceConfigSections resource={mergedCfg} resources={mergedResources} inferred={cfg} section={((activeCodeTab as string) === "sql" ? "model" : activeCodeTab) as "model" | "server" | "client" | "azure"} slaves={selectedSlaveNames} domainName={selectedDomain?.name ?? ""} on:change={() => handleCfgChange(mergedCfg.id)} />
                     {:else}
                        <Text color="neutral">Sin configuración inferida para esta tabla.</Text>
                     {/if}
                  </Card>
               {/key}
            {/if}
         </div>
      </div>

      <div class="code-pane">
         <div class="pane-scroll custom-scrollbar">
            {#if selectedDomainNode}
               {#key selectedDomainNode.kind + ":" + selectedDomainNode.domainId}
                  <Card>
                     <FlexLayout items="center">
                        <Iconify icon="mdi:information-outline" />
                        <Text color="neutral"><small>{selectedDomainNode.kind === "pivot" ? "Deducciones del pivote" : "Resumen del dominio"}</small></Text>
                     </FlexLayout>
                     <div class="md-rendered">{@html selectedDomainNodeMdHtml}</div>
                  </Card>
               {/key}
            {:else if selected}
               {@const t = selected.table}
               {@const cfg = mergedByTable.get(t.name.toUpperCase())}

               {#key tableKey(t)}
                  {@const sqlEnabled = isSqlSnippetEnabled(t)}
                  {@const sqlCode = sqlEnabled ? `${emitDropTable(t)}\n\n${emitTable(t)}` : `-- no procesa snippet sql ${t.name}`}
                  {@const modelCode = cfg ? genModelo(cfg, mergedResources) : ""}
                  {@const serverCode = cfg ? genServer(cfg, mergedResources) : ""}
                  {@const clientCode = cfg ? genClient(cfg) : ""}
                  {@const slavesCfgs = (selectedSlaves ?? [])
                     .map((sid) => tables.find((tt) => tt.id === sid))
                     .filter((tt): tt is ParsedTable => !!tt)
                     .map((tt) => mergedByTable.get(tt.name.toUpperCase()))
                     .filter((x): x is ResourceConfig => !!x)}
                  {@const azureCode = cfg && selectedIsMaster ? genAzureFn([cfg, ...slavesCfgs]) : ""}
                  <Card>
                     <div class="code-tabs-bar">
                        <button class="code-tab" class:active={activeCodeTab === "sql"} type="button" on:click={() => (activeCodeTab = "sql")}>
                           <Iconify icon="mdi:database" /> <span>SQL</span>
                        </button>
                        {#if cfg}
                           <button class="code-tab" class:active={activeCodeTab === "model"} type="button" on:click={() => (activeCodeTab = "model")}>
                              <Iconify icon="mdi:cube-outline" /> <span>Modelo</span>
                           </button>
                           <button class="code-tab" class:active={activeCodeTab === "server"} type="button" on:click={() => (activeCodeTab = "server")}>
                              <Iconify icon="mdi:server" /> <span>Server</span>
                           </button>
                           <button class="code-tab" class:active={activeCodeTab === "client"} type="button" on:click={() => (activeCodeTab = "client")}>
                              <Iconify icon="mdi:monitor" /> <span>Client</span>
                           </button>
                           {#if selectedIsMaster}
                              <button class="code-tab" class:active={activeCodeTab === "azure"} type="button" on:click={() => (activeCodeTab = "azure")}>
                                 <Iconify icon="mdi:microsoft-azure" /> <span>Azure</span>
                              </button>
                           {/if}
                        {/if}
                     </div>

                     {#if activeCodeTab === "sql"}
                        <div class="code-card">
                           <FlexLayout items="center" justify="between">
                              <FlexLayout items="center"><Iconify icon="mdi:database" /><Text color="neutral"><small>DROP + CREATE</small></Text></FlexLayout>
                              <FlexLayout items="center">
                                 <div class="run-group">
                                    <ButtonIconify icon={runUnlocked[`${t.name}::sql`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${t.name}::sql`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${t.name}::sql`)} />
                                    <ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${t.name}::sql`] || runBusy[`${t.name}::sql`]} on:click={() => runCode(`${t.name}::sql`, sqlCode, "sql")} />
                                 </div>
                                 <ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${t.name} · SQL`, sqlCode, "sql")} />
                              </FlexLayout>
                           </FlexLayout>
                           <CodeViewer value={sqlCode} lang="sql" height="100%" />
                        </div>
                     {:else if cfg && activeCodeTab === "model"}
                        <div class="code-card">
                           <FlexLayout items="center" justify="between">
                              <FlexLayout items="center"><Iconify icon="mdi:cube-outline" /><Text color="neutral"><small>{cfg.className}</small></Text></FlexLayout>
                              <FlexLayout items="center">
                                 <div class="run-group">
                                    <ButtonIconify icon={runUnlocked[`${cfg.className}::model`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${cfg.className}::model`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${cfg.className}::model`)} />
                                    <ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${cfg.className}::model`] || runBusy[`${cfg.className}::model`]} on:click={() => runCode(`${cfg.className}::model`, modelCode, "ts")} />
                                 </div>
                                 <ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${cfg.className} · Modelo`, modelCode, "ts")} />
                              </FlexLayout>
                           </FlexLayout>
                           <CodeViewer value={modelCode} lang="ts" height="100%" />
                        </div>
                     {:else if cfg && activeCodeTab === "server"}
                        <div class="code-card">
                           <FlexLayout items="center" justify="between">
                              <FlexLayout items="center"><Iconify icon="mdi:server" /><Text color="neutral"><small>{cfg.className}</small></Text></FlexLayout>
                              <FlexLayout items="center">
                                 <div class="run-group">
                                    <ButtonIconify icon={runUnlocked[`${cfg.className}::server`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${cfg.className}::server`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${cfg.className}::server`)} />
                                    <ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${cfg.className}::server`] || runBusy[`${cfg.className}::server`]} on:click={() => runCode(`${cfg.className}::server`, serverCode, "ts")} />
                                 </div>
                                 <ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${cfg.className} · Server`, serverCode, "ts")} />
                              </FlexLayout>
                           </FlexLayout>
                           <CodeViewer value={serverCode} lang="ts" height="100%" />
                        </div>
                     {:else if cfg && activeCodeTab === "client"}
                        <div class="code-card">
                           <FlexLayout items="center" justify="between">
                              <FlexLayout items="center"><Iconify icon="mdi:monitor" /><Text color="neutral"><small>{cfg.className}</small></Text></FlexLayout>
                              <FlexLayout items="center">
                                 <div class="run-group">
                                    <ButtonIconify icon={runUnlocked[`${cfg.className}::client`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${cfg.className}::client`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${cfg.className}::client`)} />
                                    <ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${cfg.className}::client`] || runBusy[`${cfg.className}::client`]} on:click={() => runCode(`${cfg.className}::client`, clientCode, "ts")} />
                                 </div>
                                 <ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${cfg.className} · Client`, clientCode, "ts")} />
                              </FlexLayout>
                           </FlexLayout>
                           <CodeViewer value={clientCode} lang="ts" height="100%" />
                        </div>
                     {:else if cfg && activeCodeTab === "azure" && selectedIsMaster}
                        <div class="code-card">
                           <FlexLayout items="center" justify="between">
                              <FlexLayout items="center"><Iconify icon="mdi:microsoft-azure" /><Text color="neutral"><small>FN-{selectedDomain?.name ?? cfg.className} · master {cfg.className} + {slavesCfgs.length} esclavas</small></Text></FlexLayout>
                              <FlexLayout items="center">
                                 <div class="run-group">
                                    <ButtonIconify icon={runUnlocked[`${cfg.className}::azure`] ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={runUnlocked[`${cfg.className}::azure`] ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => toggleRunLock(`${cfg.className}::azure`)} />
                                    <ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!runUnlocked[`${cfg.className}::azure`] || runBusy[`${cfg.className}::azure`]} on:click={() => runCode(`${cfg.className}::azure`, azureCode, "ts")} />
                                 </div>
                                 <ButtonIconify icon="mdi:eye-outline" title="Abrir" on:click={() => openCodeModal(`${cfg.className} · Azure FN`, azureCode, "ts")} />
                              </FlexLayout>
                           </FlexLayout>
                           <CodeViewer value={azureCode} lang="ts" height="100%" />
                        </div>
                     {/if}
                  </Card>
               {/key}
            {/if}
         </div>
      </div>
   </div>
</section>

<Modal bind:bshow={sqlPreviewShow} onClose={() => (sqlPreviewShow = false)} style="width: 96dvw; height: 96dvh;">
   <svelte:fragment slot="title">
      <FlexLayout items="center">
         <Iconify icon="mdi:database-export" />
         <Text><strong>Creación SQL · Vista previa</strong></Text>
      </FlexLayout>
   </svelte:fragment>
   <FlexLayout direction="column" style="height: 100%;">
      <FlexLayout justify="between" items="center">
         <Text color="neutral"><small>Código generado a partir de los snippets actuales. No se ha aplicado nada todavía.</small></Text>
         <div class="run-pill">
            <ButtonIconify icon={sqlPreviewUnlocked ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"} title={sqlPreviewUnlocked ? "Bloquear ejecución" : "Desbloquear ejecución"} on:click={() => (sqlPreviewUnlocked = !sqlPreviewUnlocked)} />
            <ButtonIconify color="success" icon="mdi:play" title="Ejecutar" disabled={!sqlPreviewUnlocked || sqlPreviewExecuting} on:click={executeSqlFromPreview} />
         </div>
      </FlexLayout>
      <div class="sql-preview-host">
         <CodeViewer value={sqlPreviewValue} lang="sql" height="100%" />
      </div>
   </FlexLayout>
</Modal>

<Modal bind:bshow={resetBaselineShow} onClose={() => (resetBaselineShow = false)} style="max-width: 32rem;">
   <svelte:fragment slot="title">
      <FlexLayout items="center">
         <Iconify icon="mdi:backup-restore" />
         <Text><strong>Restaurar baseline estable</strong></Text>
      </FlexLayout>
   </svelte:fragment>
   <FlexLayout direction="column" style="padding: 1rem;">
      <Text>¿Restaurar el árbol y el estado al último baseline estable?</Text>
      <Text color="neutral"><small>Se descartarán los cambios manuales no incluidos en el baseline y la página se recargará.</small></Text>
      <FlexLayout justify="end" items="center" style="margin-top: 0.75rem;">
         <Button variant="outlined" color="neutral" disabled={resettingBaseline} onClick={() => (resetBaselineShow = false)}>Cancelar</Button>
         <Button color="warning" disabled={resettingBaseline} onClick={confirmResetBaseline}>
            <Iconify icon={resettingBaseline ? "mdi:loading" : "mdi:backup-restore"} /> Restaurar
         </Button>
      </FlexLayout>
   </FlexLayout>
</Modal>

<Modal bind:bshow={derShow} onClose={() => (derShow = false)} style="width: 96dvw; height: 96dvh;">
   <svelte:fragment slot="title">
      <FlexLayout items="center">
         <Iconify icon="mdi:graph-outline" />
         <Text><strong>Diagrama entidad-relación (DER)</strong></Text>
      </FlexLayout>
   </svelte:fragment>
   <FlexLayout direction="column" style="height: 100%;">
      <div class="der-host" use:attachDerPanZoom>
         <div class="der-toolbar">
            <span class="der-zoom-pct"><small>{Math.round(derScale * 100)}%</small></span>
            <ButtonIconify icon="mdi:magnify-minus-outline" title="Alejar (Ctrl+Scroll abajo / pinch)" on:click={() => zoomBy(1 / 1.2)} />
            <ButtonIconify icon="mdi:magnify-plus-outline" title="Acercar (Ctrl+Scroll arriba / pinch)" on:click={() => zoomBy(1.2)} />
            <ButtonIconify icon="mdi:fit-to-screen-outline" title="Ajustar al diagrama completo (Ctrl+0)" on:click={() => fitDerView("both")} />
            <ButtonIconify icon="mdi:image-filter-center-focus" title="Restablecer (100%)" on:click={resetDerView} />
            <ButtonIconify icon="mdi:code-tags" title="Ver fuente Mermaid" on:click={() => openCodeModal("DER · fuente Mermaid", derSource, "ts")} />
         </div>
         {#if derLoading}
            <div class="der-msg"><Text color="neutral"><small>Generando diagrama…</small></Text></div>
         {:else if derError}
            <div class="der-msg">
               <Text color="error"><small>Error generando DER: {derError}</small></Text>
               <pre class="der-source">{derSource}</pre>
            </div>
         {:else}
            <div class="der-content" style="transform: {derTransform};">
               {@html derSvg}
            </div>
         {/if}
      </div>
   </FlexLayout>
</Modal>

<CodeModal bind:bshow={modalShow} title={modalTitle} value={modalValue} language={modalLanguage} />

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
   /* El TouchGestures interno usa position:absolute para overlays, lo que saca al cuerpo del flujo y deja la altura de `.isp-tree` en 0. Forzamos in-flow para que `pane-scroll` reciba la altura real y pueda hacer scroll cuando rebose. */
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
   .tables-tree-host :global(.fc-panel) {
      margin-top: 20px;
   }
   .tables-tree-host :global(.fc-panel) > :global(*) {
      transform: scale(0.8);
      transform-origin: top right;
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
   .tree-row-index {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.3rem;
      height: 1rem;
      padding: 0 0.3rem;
      border-radius: 0.5rem;
      background: color-mix(in srgb, var(--is-text-neutral, #888) 18%, transparent);
      color: var(--is-text-neutral, #666);
      font-size: 0.6rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      flex: 0 0 auto;
   }
   .badge-domain {
      background: color-mix(in srgb, var(--is-warning) 25%, transparent);
      color: var(--is-warning);
   }
   .badge-bd {
      background: color-mix(in srgb, var(--is-info) 25%, transparent);
      color: var(--is-info);
      border: 1px solid color-mix(in srgb, var(--is-info) 50%, transparent);
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
   }
   .badge-pivot {
      background: color-mix(in srgb, orange 25%, transparent);
      color: orange;
   }
   .badge-prefix {
      background: color-mix(in srgb, var(--is-success) 25%, transparent);
      color: var(--is-success);
   }
   .badge-pointer {
      background: color-mix(in srgb, var(--is-info) 25%, transparent);
      color: var(--is-info);
   }
   .tree-row-card {
      font-variant-numeric: tabular-nums;
      font-weight: 600;
   }
   .card-inline-select {
      width: 150px;
      min-width: 0;
   }
   .card-inline-select :global(select) {
      width: 150px;
   }
   .card-inline-select :global(label) {
      width: 150px;
      font-size: 0.65rem;
   }
   .name-mode-host :global(label) { display: none; }
   .name-mode-host :global(select),
   .name-mode-host :global(select.isFocused) {
      height: 32px;
      padding: 0 1.4rem 0 0.5rem;
      font-size: 0.8rem;
      line-height: 1;
      background-color: var(--is-bg-secondary);
      border: 1px solid var(--is-b-color);
      border-radius: 0.25rem;
   }
   .tree-row-pointer {
      font-style: italic;
      opacity: 0.85;
   }
   :global(.code-pane) > :global(.pane-scroll) > :global(.card-root) {
      width: 100%;
      min-width: 0;
      min-height: 0;
      flex: 1 1 auto;
      display: flex !important;
      flex-direction: column;
   }
   :global(.code-pane) > :global(.pane-scroll) {
      overflow: hidden;
   }
   :global(.code-pane .code-tabs),
   :global(.code-pane .code-tabs-content),
   :global(.form-pane .card-root > *) {
      width: 100%;
      min-width: 0;
   }
   :global(.form-pane),
   :global(.code-pane) {
      min-width: 0;
      min-height: 0;
   }
   :global(.code-pane) {
      padding: 1rem;
      gap: 1rem;
   }
   :global(body) {
      overflow: hidden;
   }
   .code-card {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;
      min-height: 0;
      flex: 1 1 auto;
   }
   .run-group {
      display: inline-flex;
      align-items: center;
      gap: 0.15rem;
      border: 1px solid var(--is-b-color);
      border-radius: 999px;
      padding: 0.1rem 0.25rem;
   }
   .code-card :global(.cm-wrap) {
      display: block;
      min-height: 0;
      flex: 1 1 auto;
   }
   :global(.code-pane .tabs-content) {
      flex: 1 1 auto;
      min-height: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
   }
   :global(.code-pane .tabs-content) > :global(.tab-item) {
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      flex-direction: column;
   }
   @media (max-width: 900px) {
      .layout {
         grid-template-columns: 1fr;
         max-height: none;
      }
      :global(.tree-pane),
      :global(.form-pane),
      :global(.code-pane) {
         height: auto;
         max-height: none;
      }
   }
   .code-tabs-bar {
      display: flex;
      gap: 0.25rem;
      border-bottom: 1px solid var(--is-b-color, #444);
      margin-bottom: 0.5rem;
   }
   .code-tab {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.35rem 0.7rem;
      background: transparent;
      border: 1px solid transparent;
      border-bottom: none;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      color: inherit;
      cursor: pointer;
      font-size: 0.85rem;
      margin-bottom: -1px;
   }
   .code-tab:hover {
      background: var(--is-bg-secondary, #2a2a2a);
   }
   .code-tab.active {
      border-color: var(--is-b-color, #444);
      border-bottom-color: var(--is-bg-primary, #1e1e1e);
      background: var(--is-bg-primary, #1e1e1e);
      font-weight: 600;
   }
   .sql-preview-host {
      display: flex;
      flex: 1 1 auto;
      min-height: 0;
      height: 100%;
      overflow: hidden;
   }
   .der-host {
      flex: 1 1 auto;
      min-height: 0;
      height: 100%;
      overflow: hidden;
      position: relative;
      padding: 0;
      background: var(--is-bg-readonly, #001327);
      border: 1px solid var(--is-b-color, #555);
      border-radius: 0.25rem;
      cursor: grab;
      touch-action: none;
   }
   :global(.der-host.grabbing) {
      cursor: grabbing !important;
   }
   .der-content {
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: 0 0;
      pointer-events: none;
   }
   .der-msg {
      padding: 0.5rem;
   }
   .der-toolbar {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 5;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      background: color-mix(in srgb, var(--is-bg-secondary, #13203a) 85%, transparent);
      border: 1px solid var(--is-b-color, #555);
      border-radius: 0.5rem;
      backdrop-filter: blur(4px);
   }
   .der-zoom-pct {
      min-width: 3.5rem;
      text-align: right;
      opacity: 0.8;
   }
   .der-host :global(svg) {
      max-width: none;
      height: auto;
      display: block;
   }
   .der-host :global(svg text),
   .der-host :global(svg .entityLabel),
   .der-host :global(svg .er.entityLabel),
   .der-host :global(svg .er.relationshipLabel),
   .der-host :global(svg .relationshipLabel) {
      fill: #ffffff !important;
      color: #ffffff !important;
   }
   .der-host :global(svg .er.relationshipLabelBox),
   .der-host :global(svg .relationshipLabelBox) {
      fill: var(--is-bg-primary, #0c1222) !important;
   }
   .der-source {
      font-size: 0.75em;
      white-space: pre-wrap;
      opacity: 0.8;
   }
   .run-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.15rem 0.4rem;
      border: 1px solid var(--is-b-color, #555);
      border-radius: 999px;
      background: var(--is-bg-secondary);
   }
   :global(.entity-focus-flash) {
      animation: entityFocusFlash 0.7s ease-out;
   }
   @keyframes entityFocusFlash {
      0% {
         box-shadow: 0 0 0 0 var(--is-primary, #4ea1ff);
      }
      40% {
         box-shadow: 0 0 0 4px color-mix(in srgb, var(--is-primary, #4ea1ff) 35%, transparent);
      }
      100% {
         box-shadow: 0 0 0 0 transparent;
      }
   }
   .frm {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.75rem;
   }
   .frm .field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
   }
   .frm .input-field {
      width: 100%;
      padding: 0.4rem 0.5rem;
      border: 1px solid var(--is-b-color, #555);
      border-radius: 4px;
      background: var(--is-bg-primary);
      color: inherit;
      font: inherit;
   }
   .md-rendered {
      padding: 0.5rem 0.25rem;
      line-height: 1.55;
      overflow: auto;
      font-size: 0.9em;
   }
   .md-rendered :global(p),
   .md-rendered :global(li) {
      font-weight: normal;
   }
   .md-rendered :global(strong) {
      font-weight: normal;
   }
   .md-rendered :global(table) {
      border-collapse: collapse;
      margin: 0.5rem 0;
   }
   .md-rendered :global(th),
   .md-rendered :global(td) {
      border: 1px solid var(--is-b-color);
      padding: 0.3rem 0.6rem;
   }
   .md-rendered :global(code) {
      background: var(--is-bg-secondary);
      padding: 0.1rem 0.3rem;
      border-radius: 4px;
   }
   .md-rendered :global(pre) {
      background: var(--is-bg-secondary);
      padding: 0.6rem;
      border-radius: 6px;
      overflow: auto;
   }
</style>
