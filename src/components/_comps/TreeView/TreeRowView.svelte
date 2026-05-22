<svelte:options accessors={true} />

<!-- TreeView v2 -->
<script context="module" lang="ts">
   import type { TObject } from "@ingenieria_insoft/ispgen";
   import type { TBAllowed, TDForm } from "@ingenieria_insoft/ispsveltecomponents";
   import { FlexLayout, Text } from "@ingenieria_insoft/ispsveltecomponents";
   import { onDestroy, tick } from "svelte";
   import type { HTMLAttributes } from "svelte/elements";
   import ObjJConfig from "../Form/jconfig/ObjJConfig.svelte";
   import type { FlexOptionsInput } from "../Options/FlexOptions.svelte";
   import FlexOptions from "../Options/FlexOptions.svelte";
   import { TreeRowViewAdapter } from "./_asRow/01-treeAdapterAsRowEvents";
   import { TreeRowAdapter } from "./_asRow/_rowAdapter/02-events";
   import RowItem from "./_asRow/_rowItem.svelte";
   import { groupedWithSeparators, objRootsToNodes, TreeNode, type INode, type ITreeData } from "./_treeAdapter/_defgen/00-tree-data";
   import type { ITreeAction, ITreeCustoms, ITreeCustomsRow, ITreeRowCtx, ITreeRuntime, RowOf } from "./contracts";
   export const TreeAdapter = TreeRowViewAdapter;
   export type TreeAdapterRow<R extends ITreeData<R> & TObject> = TreeRowViewAdapter<R>;
   export type TreeAdapter<TBase extends TObject> = TreeRowViewAdapter<RowOf<TBase>>;
   export { groupedWithSeparators, objRootsToNodes, TreeNode, TreeRowAdapter, TreeRowViewAdapter };
   export type { INode, ITreeAction, ITreeCustoms, ITreeData, ITreeRowCtx, ITreeRuntime, RowOf };
   export interface TreeViewProps<TListObj extends ITreeData<TListObj> & TObject> extends HTMLAttributes<HTMLDivElement> {
      readonly?: boolean;
      TreeController?: TreeAdapterRow<TListObj>;
      bAllowed?: TBAllowed;
      draggable?: boolean;
      disabled?: boolean;
      onError?: (msg: string) => void;
      List2Rows?: unknown;
      record?: INode<TListObj> | null;
      customs?: ITreeCustomsRow<TListObj>;
   }
   export interface TreeViewSlots<TListObj extends ITreeData<TListObj> & TObject> {
      default: { sizew: any; showDelete: (Obj: TListObj) => void; treeAdapter: TreeAdapterRow<TListObj> };
      header: { treeAdapter: TreeAdapterRow<TListObj>; sizew: any; showDelete: (Obj: TListObj) => void };
      row: { node: INode<TListObj> };
      helperRow: { node: INode<TListObj> };
      grouperCaret: { open: boolean; node: INode<TListObj> };
      dragHandle: { frozen: boolean; disabled: boolean };
      Frm: { record: TListObj; itdForm: "view" | "edit" | "create" | undefined; ancestors: INode<TListObj>[]; isNew: boolean };
   }
   export type EditDrawerStructureCtx<T extends ITreeData<T> & TObject> = { bshow: boolean; notClose: boolean; readonly: boolean; itdForm: TDForm; bAllowed: TBAllowed | undefined; record: INode<T> | null; onItdFormChange: (v: TDForm) => void; onclose: () => void; onError: (msg: string) => void; oninput: () => void; postSubmit: (o?: unknown, action?: unknown) => Promise<void> };
</script>

<script lang="ts" generics="TListObj extends ITreeData<TListObj> & TObject">
   interface $$Props extends TreeViewProps<TListObj> {}
   interface $$Slots extends TreeViewSlots<TListObj> {}

   export let TreeController: $$Props["TreeController"] = undefined;
   export let readonly: $$Props["readonly"] = false;
   export let bAllowed: $$Props["bAllowed"] = undefined;
   export let draggable: $$Props["draggable"] = true;
   export let onError: $$Props["onError"] = undefined;
   export let List2Rows: $$Props["List2Rows"] = undefined;
   export let customs: $$Props["customs"] = undefined;

   if (!TreeController) TreeController = new TreeRowViewAdapter<TListObj>({} as unknown as TreeViewProps<TListObj>);
   if (onError) TreeController.onError = onError;
   TreeController.customs = customs;

   let record: INode<TListObj> | null = null;
   let disabled = false;
   const getEntryLabel = () => customs?.entrie ?? "registro";
   const getEntriesLabel = () => customs?.entries ?? `Árbol de ${getEntryLabel()}s`;
   const getTreeAriaLabel = () => getEntriesLabel();
   const getToolbarAriaLabel = () => `Acciones de ${getEntriesLabel()}`;
   const getHostClass = () => ["isp-tree-host", "isp-tree", $$restProps.class].filter(Boolean).join(" ");

   let editRowShow = false;
   let editRowNotClose = false;
   let drawerForm: ObjJConfig<TObject> | null = null;
   let _prevEditRowShow = false;
   let showDeleteModal = false;
   let deleteLoading = false;
   let deleteCodeInput = "";
   let localItdForm: "view" | "edit" | "create" | undefined = "view";
   let uiTick = 0;

   $: deleteCodeExpected = (void uiTick, TreeController.getRecordSecurityCode(record ?? null));
   $: isDeleteBlocked = deleteCodeInput.trim() !== deleteCodeExpected;
   $: if (editRowShow !== _prevEditRowShow) {
      _prevEditRowShow = editRowShow;
      if (!editRowShow) {
         editRowNotClose = false;
         TreeController.closeEditForm();
      }
   }

   const openDrawer = async (): Promise<void> => {
      editRowShow = true;
      editRowNotClose = false;
      await tick();
      drawerForm?.snapshot();
   };

   const oninput = (): void => {
      editRowNotClose = !!drawerForm?.isDirty();
   };
   const onItdFormChange = (v: "view" | "edit" | "create" | undefined): void => {
      localItdForm = v ?? "view";
   };

   const offUiListener = TreeController.addUiListener(() => uiTick++);
   onDestroy(() => offUiListener());

   TreeController.onrequestopendrawer = (mode: TDForm) => {
      localItdForm = mode === "create" ? "edit" : mode;
      openDrawer();
   };
   TreeController.onrequestclosedrawer = () => {
      editRowShow = false;
   };
   TreeController.onrequesteditshow = (node: INode<TListObj>, mode: TDForm) => {
      record = node;
      localItdForm = mode;
      openDrawer();
   };
   TreeController.onrequestdelete = (node: INode<TListObj>) => {
      record = node;
      deleteCodeInput = "";
      showDeleteModal = true;
   };

   let toolbarActions: FlexOptionsInput[] = [];
   let rootNodes: INode<TListObj>[] = [];

   $: {
      void List2Rows;
      void readonly;
      void customs;
      void bAllowed;
      void disabled;
      TreeController.customs = customs;
      TreeController.onstateupdate({
         ...$$restProps,
         ...$$props,
         draggable,
         TreeController,
         readonly,
         bAllowed,
         get record() {
            return record;
         },
         set record(value: INode<TListObj> | null) {
            record = value ?? null;
         },
      });
      void uiTick;
      toolbarActions = TreeController.decorateHotkeyTitles(TreeController.customs?.topMenuActions?.(TreeController.buildCustomsRuntime()) ?? []);
   }
   $: {
      uiTick;
      rootNodes = TreeController.rootNodes;
   }
   $: protectionPromptOpen = (void uiTick, TreeController.isProtectionPromptOpen);
   $: protectionPromptStructure = TreeController.buildProtectionModalStructure({
      bshow: protectionPromptOpen,
      onclose: protectionDismiss,
      oncancel: protectionDismiss,
      onconfirm: protectionConfirm,
      onredoall: protectionRedoAll,
   });

   const protectionConfirm = () => {
      TreeController.confirmProtectionRelease();
   };
   const protectionDismiss = () => {
      TreeController.dismissProtectionPrompt();
   };
   const protectionRedoAll = () => {
      if (typeof (TreeController as any).historyRedoAll === "function") {
         (TreeController as any).historyRedoAll();
      } else {
         let guard = 1000;
         while (TreeController.historyCanRedo && guard-- > 0) TreeController.historyRedo();
      }
      TreeController.confirmProtectionRelease();
   };
   const showDelete = (objRef: TListObj) => TreeController.showDelete(objRef);
   const onclose = (): void => {
      editRowShow = false;
   };
   const confirmDelete = async () => {
      if (deleteLoading || isDeleteBlocked) return;
      deleteLoading = true;
      try {
         const ok = await TreeController.confirmDelete(deleteCodeInput);
         if (ok) {
            showDeleteModal = false;
            deleteCodeInput = "";
         }
      } finally {
         deleteLoading = false;
      }
   };
</script>

<ObjJConfig Obj={({} as TObject)} structure={() => TreeController!.buildDeleteModalStructure({
   bshow: showDeleteModal,
   loading: deleteLoading,
   isBlocked: isDeleteBlocked,
   codeExpected: deleteCodeExpected,
   codeInput: deleteCodeInput,
   onclose: () => (showDeleteModal = false),
   oncancel: () => (showDeleteModal = false),
   onconfirm: confirmDelete,
   oncodeinput: (v: string) => (deleteCodeInput = v),
})} />

<ObjJConfig Obj={({} as TObject)} structure={protectionPromptStructure} />

<svelte:window on:pointerdown={(e) => TreeController.ontreeoutsidepointerdown(e)} />

<span {...$$restProps} class={getHostClass()} data-tree-root={TreeController.treeRootId}>
   <FlexLayout direction="column" items="stretch" style="width: 100%; flex: 1 1 auto; min-height: 0;" let:sizew>
      <slot treeAdapter={TreeController!} {sizew} {showDelete} />
      {#if !!(customs?.menu || customs?.moreMenu) || (toolbarActions?.length ?? 0) > 0}
         <FlexOptions class="isp-tree-toolbar" inline items="center" style="overflow: hidden;" aria-label={getToolbarAriaLabel()} actions={toolbarActions} />
      {/if}
      <slot name="header" treeAdapter={TreeController!} {sizew} {showDelete} />

      <FlexLayout direction="column" cscroll class="isp-tree-body isp-tree-focus-scope custom-scrollbar" data-testid="tree" role="tree" aria-label={getTreeAriaLabel()} aria-disabled={disabled}>
         {#if rootNodes?.length}
            <RowItem nodes={rootNodes} treeController={TreeController} rowLayoutEpoch={uiTick}>
               <svelte:fragment slot="row" let:node>
                  <FlexLayout items="center" justify="between" style="flex: 1; min-width: 0;">
                     <Text style="flex: 1 1 auto; min-width: 0;" lines={1}>
                        <slot name="row" {node} />
                     </Text>
                     {#if $$slots.helperRow}
                        <Text style="flex: 0 0 auto; width: fit-content; margin-left: 0.5rem;" color="neutral" lines={1}>
                           <small><slot name="helperRow" {node} /></small>
                        </Text>
                     {/if}
                  </FlexLayout>
               </svelte:fragment>
               <svelte:fragment slot="grouperCaret" let:open let:node>
                  <slot name="grouperCaret" {open} {node} />
               </svelte:fragment>
            </RowItem>
         {/if}
      </FlexLayout>
   </FlexLayout>

   {#if editRowShow}
      <ObjJConfig bind:this={drawerForm} Obj={(record ?? ({} as TObject)) as TObject} let:Obj={accObj} let:itdForm={accIt} structure={() => TreeController!.buildEditDrawerStructure({ bshow: editRowShow, notClose: editRowNotClose, readonly: !!readonly, itdForm: localItdForm, bAllowed, record, onItdFormChange, onclose, oninput, onError: (msg: string) => TreeController.onError?.(msg), postSubmit: (o: unknown, action: unknown) => TreeController.postSubmit(o, action) })}>
         <slot name="Frm" record={accObj as TListObj} itdForm={accIt as "view" | "edit" | "create" | undefined} ancestors={record ? TreeController.walkAncestors(record) : []} isNew={!!record && !!TreeController.isPendingInsertPath?.(record.flatPath)}>
            <Text style="padding: 1rem;" color="neutral">Implemente el slot "Frm" para las acciones sobre el objeto {record?.flatPath ?? "---"}.</Text>
         </slot>
      </ObjJConfig>
   {/if}
</span>

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
            min-height: 0;
            flex: 1 1 auto;
            overflow-y: auto;
            overflow-x: hidden;
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
            overflow: hidden;
            flex: 0 0 auto;

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
