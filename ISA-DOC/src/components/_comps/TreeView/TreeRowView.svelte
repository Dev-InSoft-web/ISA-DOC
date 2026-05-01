<svelte:options accessors={true} />

<script context="module" lang="ts">
   import { AccionesGen, ActionDrawer, Button, FlexLayout, Iconify, Input, Modal, Text, type TDForm } from "@ingenieria_insoft/ispsveltecomponents";
   import type { HTMLAttributes } from "svelte/elements";
   import type { FlexOptionsAction } from "../Options/FlexOptions.svelte";
   import FlexOptions from "../Options/FlexOptions.svelte";
   import RowItem from "./_asRow/_rowItem.svelte";
   import { ComplexControl } from "./_treeAdapter/00-complex-control";
   import { type INode, type ITreeData, groupedWithSeparators, objRootsToNodes, TreeRowAdapter, TreeNodeUX } from "./_asRow/_rowAdapter";
   import { TreeRowViewAdapter } from "./_asRow/01-treeAdapterAsRowEvents";
   export { ComplexControl, TreeRowViewAdapter, TreeRowAdapter, TreeNodeUX, groupedWithSeparators, objRootsToNodes };
   export type { INode, ITreeData };

   export interface TreeViewProps<Stacker, TWorking extends ITreeData<TWorking>> extends HTMLAttributes<HTMLDivElement> {
      Obj: Stacker;
      itdForm: TDForm;
      brapido?: boolean;
      readonly?: boolean;
      small?: boolean;
      CatalogoController: Record<string, any>;
      TreeController: TreeRowViewAdapter<Stacker, TWorking>;
      disabled?: boolean;
      objWorking?: INode<TWorking> | null;
      showToolbar?: boolean;
      bdrag?: boolean;
      bLostFocus?: boolean;
      addReferenceId?: string | null;
      resourceSelectorOpen?: boolean;
      /**
       * Cuando es `true`, los nodos pueden salir de su agrupador (cross-parent reorder/drag).
       * Si se pasa una función, retornar `true` autoriza el movimiento; `false` lo bloquea.
       */
      bcanMoveOutside?: boolean | ((source: INode<TWorking>, target: INode<TWorking>, position: "before" | "after") => boolean);
   }

   export interface TreeViewSlots<Stacker, TWorking extends ITreeData<TWorking>> {
      default: { treeToolbar: TreeRowViewAdapter<Stacker, TWorking>; sizew: any; showEliminar: (Obj: TWorking) => void };
      pre: { treeToolbar: TreeRowViewAdapter<Stacker, TWorking>; sizew: any; showEliminar: (Obj: TWorking) => void };
      row: { node: INode<TWorking> };
      Frm: any;
   }
</script>

<script lang="ts" generics="Stacker, TWorking extends ITreeData<TWorking>">
   import { toastError } from "$lib/stores";
   import TouchGestures from "../containers/TouchGestures.svelte";

   interface $$Props extends TreeViewProps<Stacker, TWorking> {}
   interface $$Slots extends TreeViewSlots<Stacker, TWorking> {}

   export let CatalogoController: $$Props["CatalogoController"];
   export let TreeController: $$Props["TreeController"];
   export let showToolbar: $$Props["showToolbar"] = true;
   export let objWorking: $$Props["objWorking"] = null;
   export let disabled: $$Props["disabled"] = false;
   export let readonly: $$Props["readonly"] = false;
   export let Obj: $$Props["Obj"];
   export let itdForm: $$Props["itdForm"];
   export let brapido: $$Props["brapido"] = false;
   export let small: $$Props["small"] = false;
   export let bdrag: $$Props["bdrag"] = true;
   export let bLostFocus: $$Props["bLostFocus"] = false;
   export let bcanMoveOutside: $$Props["bcanMoveOutside"] = false;

   let editRowShow = false;
   let bshowEliminar = false;
   let loadingEliminar = false;
   let codigoEliminarIngresado = "";
   let localItdForm: $$Props["itdForm"] = "view";

   const self = {
      get class() {
         return ["isp-tree", $$restProps.class].filter(Boolean).join(" ");
      },
      get style() {
         return typeof $$restProps.style === "string" ? $$restProps.style : undefined;
      },
      get resume() {
         return { ...$$restProps, class: this.class, style: this.style };
      },
   };

   const codToMinLenX = (value: unknown): string =>
      String(value ?? "")
         .trim()
         .padStart(5, "X");
   const getObjWorkingPlanCode = (row: $$Props["objWorking"]): string => {
      const asObj = row?.obj as Record<string, unknown> | null | undefined;
      const source = asObj?.iplan ?? asObj?.idrow ?? "";
      return codToMinLenX(String(source).replace(/^(_UP_|_M_)/, ""));
   };
   const workingRow = (row: $$Props["objWorking"]): TWorking | null => (row?.obj as TWorking | null | undefined) ?? null;

   $: codigoEliminarEsperado = getObjWorkingPlanCode(objWorking);
   $: bBloquearEliminar = codigoEliminarIngresado.trim() !== codigoEliminarEsperado;
   $: rowLayoutTickStore = TreeController.rowLayoutEpoch;
   // rootNodes se re-evalúa cada vez que el store cambia (cuando syncAllRowAdapters incrementa el epoch),
   // garantizando que RowItem recibe el array actualizado y Svelte re-evalúa la condición del {#if}.
   let rootNodes: INode<TWorking>[] = [];
   $: {
      $rowLayoutTickStore; // dependencia reactiva: fuerza re-evaluación al cambiar el epoch
      rootNodes = TreeController.rootNodes;
   }
   $: itdFormResolved = readonly ? "view" : localItdForm;
   $: currentWorking = workingRow(objWorking);
   const swipeNoop = () => (TreeController as any).onswipenoop?.();
   $: swipeHandlers = {
      onswipestart: swipeNoop,
      onswiping: swipeNoop,
      onswipeend: swipeNoop,
      onswipeleft: () => (TreeController as any).onswipeopendrawer?.(),
      onswiperight: () => (TreeController as any).onswipeclosedrawer?.(),
      onswipeup: swipeNoop,
      onswipedown: swipeNoop,
   };

   const setShowFrm = (b: unknown) => {
      editRowShow = !!b;
   };
   const findNodeByObj = (nodes: INode<TWorking>[], row: TWorking): INode<TWorking> | null => {
      for (const node of nodes) {
         if (node.obj === row) return node;
         if (node.children?.length) {
            const found = findNodeByObj(node.children, row);
            if (found) return found;
         }
      }
      return null;
   };
   const closeTreePlanDrawer = () => {
      editRowShow = false;
      TreeController.closePlanDrawer?.();
   };

   /** Busca el nodo por ID (usando `idrow` / `iplan`) con fallback a igualdad por referencia. */
   const findNodeForAction = (objRef: TWorking): INode<TWorking> | null => {
      const rawId = (objRef as any)?.idrow ?? (objRef as any)?.iplan;
      const cleanId = rawId != null ? TreeController.normalizeNodeId(String(rawId)) : "";
      if (cleanId.length > 0) return TreeController.findNodeById(cleanId);
      return findNodeByObj(TreeController.rootNodes, objRef);
   };

   const showFrmModificar = (objRef: TWorking) => {
      const node = findNodeForAction(objRef);
      if (!node) return;
      objWorking = node;
      localItdForm = readonly ? "view" : "edit";
      editRowShow = true;
   };

   const showFrmVisualizar = (objRef: TWorking) => {
      const node = findNodeForAction(objRef);
      if (!node) return;
      objWorking = node;
      localItdForm = "view";
      editRowShow = true;
   };

   const onError = async (msg: string) => {
      toastError(msg);
   };
   const postSubmit = async (_o?: unknown, action?: unknown) => {
      if (action === "Eliminar") await TreeController.ondeleteconfirmed?.();
      else if (action === "Modificar") await TreeController.onAfterCatalogModificar?.();
      closeTreePlanDrawer();
   };

   const showEliminar = (objRef: TWorking) => {
      const node = findNodeForAction(objRef);
      objWorking = node;
      bshowEliminar = true;
      codigoEliminarIngresado = "";
   };

   async function confirmarEliminar() {
      if (readonly || loadingEliminar || bBloquearEliminar || !objWorking) return;
      loadingEliminar = true;
      try {
         const ctrl = CatalogoController as unknown as { ActEliminar?: (...args: unknown[]) => Promise<boolean> };
         if (!ctrl.ActEliminar) throw new Error("La acción Eliminar no está disponible.");
         const row = workingRow(objWorking);
         if (!row) throw new Error("No hay fila activa para eliminar.");
         await ctrl.ActEliminar(row, Obj);
         bshowEliminar = false;
         codigoEliminarIngresado = "";
         await postSubmit(row, "Eliminar");
      } catch (e) {
         const sAdd = e instanceof Error ? `\r\n${e.message}` : "";
         await onError("No se pudo eliminar." + sAdd);
      } finally {
         loadingEliminar = false;
      }
   }

   $: {
      TreeController.onstateupdate({
         ...$$restProps,
         ...$$props,
         Obj,
         itdForm,
         small,
         brapido,
         bdrag,
         bLostFocus,
         bcanMoveOutside,
         CatalogoController,
         TreeController,
         showToolbar,
         disabled,
         readonly,
         get objWorking() {
            return objWorking;
         },
         set objWorking(value: $$Props["objWorking"]) {
            objWorking = value ?? null;
         },
      });
   }

   $: TreeController.bindParentData(setShowFrm, showFrmModificar, showFrmVisualizar, showEliminar);
</script>

{#if bshowEliminar}
   <Modal bind:bshow={bshowEliminar} bind:loading={loadingEliminar}>
      <Text slot="title" style="display: flex; align-items: center; gap: 0.5rem;">
         <Iconify icon="mdi:trash-can-outline" />
         Eliminar contenido del plan
      </Text>
      <FlexLayout direction="column" style="padding: 0.75rem; min-width: 350px;">
         <Text>Confirme la eliminación digitando el código de seguridad del plan.</Text>
         <Input label="Código esperado" value={codigoEliminarEsperado} readonly />
         <Input label="Confirme código de seguridad" required maxLength={60} bind:value={codigoEliminarIngresado} />
         <FlexLayout direction="row" wrap justify="end" items="center" style="gap: 0.5rem">
            <Button variant="outlined" color="neutral" onClick={() => (bshowEliminar = false)} loading={loadingEliminar}>Cancelar</Button>
            <Button color="danger" onClick={confirmarEliminar} disabled={loadingEliminar || bBloquearEliminar} loading={loadingEliminar}>Eliminar</Button>
         </FlexLayout>
      </FlexLayout>
   </Modal>
{/if}

<TouchGestures {...self.resume} {...swipeHandlers}>
   <span class="isp-tree-host">
      <FlexLayout direction="column" items="stretch" style="width: 100%; flex: 1 1 auto; min-height: 0;" let:sizew>
         <slot treeToolbar={TreeController} {sizew} {showEliminar}>
            {#if showToolbar}
               <FlexOptions class="isp-tree-toolbar" cscroll inline items="center" aria-label="Acciones del plan de contenidos" actions={TreeController.getToolsBarActions() as FlexOptionsAction[]} />
            {/if}
            <slot name="pre" treeToolbar={TreeController} {sizew} {showEliminar} />
         </slot>

         <FlexLayout direction="column" class="isp-tree-body isp-tree-focus-scope" data-tree-root={TreeController.treeRootId} data-testid="tree" role="tree" aria-label="Plan de contenidos" aria-disabled={disabled}>
            {#if rootNodes?.length}
               <RowItem nodes={rootNodes} treeController={TreeController} rowLayoutEpoch={$rowLayoutTickStore}>
                  <svelte:fragment slot="row" let:node>
                     <slot name="row" {node} />
                  </svelte:fragment>
               </RowItem>
            {/if}
         </FlexLayout>
      </FlexLayout>

      {#if editRowShow}
         <ActionDrawer bind:bshow={editRowShow} onclose={closeTreePlanDrawer} style="width: 580px; max-width: 90vw;">
            <FlexLayout direction="column" style="height: 100%; background-color: var(--is-bg-primary);">
               <FlexLayout direction="column" class="isp-tree-frm-body custom-scrollbar" cscroll style="overflow: hidden; flex: 1 1 auto; min-height: 0;">
                  {#if currentWorking}
                     <AccionesGen bind:itdForm={localItdForm} bRapido={true} {postSubmit} {onError} onCancel={closeTreePlanDrawer} Controller={CatalogoController as any} Obj={currentWorking as any} onNewObject={async () => currentWorking}>
                        <slot name="Frm" slot="Frm" let:Obj={frmObj} let:small let:itdForm {frmObj} {small} {itdForm} {brapido}>
                           <Text style="padding: 1rem;" color="neutral">Implemente el slot "Frm" para las acciones sobre el objeto {currentWorking?.id ?? "---"}.</Text>
                        </slot>
                     </AccionesGen>
                  {/if}
               </FlexLayout>
            </FlexLayout>
         </ActionDrawer>
      {/if}
   </span>
</TouchGestures>

<style>
   span.isp-tree-host {
      display: contents;
      :global {
         .isp-tree {
            position: relative;
            width: 100%;
            height: 100%;
            flex: 1 1 auto;
            min-height: 0;
            font-size: 0.875rem;
         }
         .isp-tree-body {
            width: 100%;
            min-width: 0;
            flex: 1 1 auto;
         }
         .isp-tree-focus-scope {
            width: 100%;
            min-width: 0;
            flex: 1 1 auto;
         }

         .isp-tree-toolbar {
            flex-wrap: nowrap;
            margin-bottom: 0.35rem;
            align-self: flex-start;
            width: max-content;
            max-width: 100%;
            min-width: min-content;

            .button-option {
               flex: 0 0 auto;
               flex-shrink: 0;
               width: max-content;
               max-width: none;
               white-space: nowrap;
               box-sizing: border-box;
            }
            .button-option.card-root {
               padding: 0;
               border: none;
               box-shadow: none;
               background: transparent;
            }
            .flex-options-vsep {
               flex: 0 0 auto;
            }
         }

         .isp-tree-frm-body {
            flex: 1 1 auto;
            min-height: 0;
         }
      }
   }
</style>
