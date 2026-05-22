<script context="module" lang="ts">
   import type { TObject } from "@ingenieria_insoft/ispgen";
   import { Card, FlexLayout, Iconify, mkAlpha, resolveColor } from "@ingenieria_insoft/ispsveltecomponents";
   import type { HTMLAttributes } from "svelte/elements";
   import { slide } from "svelte/transition";
   import FloatingComponent from "../../containers/FloatingComponent.svelte";
   import FlexOptions from "../../Options/FlexOptions.svelte";
   import type { INode, ITreeData, TreeRowViewAdapter } from "../TreeRowView.svelte";

   export interface RowItemProps<TListObj extends ITreeData<TListObj> & TObject> extends HTMLAttributes<HTMLDivElement> {
      treeController: TreeRowViewAdapter<TListObj>;
      nodes: INode<TListObj>[];
      rowLayoutEpoch: number;
   }

   export interface RowItemSlots<TListObj extends ITreeData<TListObj> & TObject> {
      row: { node: INode<TListObj> };
      grouperCaret: { open: boolean; node: INode<TListObj> };
      dragHandle: { frozen: boolean; disabled: boolean };
   }

   export type RowItemAdapterBridge<TListObj extends ITreeData<TListObj> & TObject> = RowItemProps<TListObj> & {
      node: INode<TListObj>;
      forceRefresh?: () => void;
   };
</script>

<script lang="ts" generics="TListObj extends ITreeData<TListObj> & TObject">
   interface $$Props extends RowItemProps<TListObj> {}
   interface $$Slots extends RowItemSlots<TListObj> {}

   export let treeController: $$Props["treeController"];
   export let nodes: $$Props["nodes"];
   export let rowLayoutEpoch: $$Props["rowLayoutEpoch"] = 0;

   const self = {
      refreshUi() {
         // oxlint-disable-next-line eslint/no-self-assign
         nodes = nodes;
      },
      rowHostClass(restClass: HTMLAttributes<HTMLDivElement>["class"]) {
         return ["trvwr-row-host", restClass].filter(Boolean).join(" ");
      },
      summaryClass(rc: ReturnType<typeof treeController.getOrCreateRowAdapter>) {
         const drg = rc.dragOver;
         const forbidden = rc.dragForbidden && drg !== null;
         return ["trvwr-itm-sum", rc.isHighlighted && "trvwr-itm-sum--focused", rc.mergedDisabled && "trvwr-itm-sum--disabled", !forbidden && drg === "before" && "trvwr-itm-sum--drg-bf", !forbidden && drg === "after" && "trvwr-itm-sum--drg-aftr", !forbidden && drg === "into" && "trvwr-itm-sum--drg-into", forbidden && drg === "before" && "trvwr-itm-sum--drg-forbidden-bf", forbidden && drg === "after" && "trvwr-itm-sum--drg-forbidden-aftr", forbidden && drg === "into" && "trvwr-itm-sum--drg-forbidden-into"].filter(Boolean).join(" ");
      },
      summaryAttrs(rc: ReturnType<typeof treeController.getOrCreateRowAdapter>) {
         return {
            class: self.summaryClass(rc),
            "aria-selected": rc.isSelected,
            "aria-expanded": rc.hasChildren ? rc.isNodeOpen : undefined,
         };
      },
      detailsStyle(rc: ReturnType<typeof treeController.getOrCreateRowAdapter>) {
         const colorPrimary80 = mkAlpha("primary", 80);
         return [`--trvwr-hvr-dflt: ${mkAlpha("color", 92)}`, `--trvwr-ctv-dflt: ${mkAlpha("color", 86)}`, `--trvwr-hghlght-bg: ${mkAlpha("primary", 88)}`, `--trvwr-hghlght-hvr-bg: ${colorPrimary80}`, `--trvwr-swp-bg: ${mkAlpha("success", 70)}`, `--trvwr-swp-err-bg: ${mkAlpha("danger", 70)}`, `--trvwr-fcs-rng: ${mkAlpha("primary", 45)}`, `--trvwr-drp-ndctr-bg: ${colorPrimary80}`, `--trvwr-drp-ndctr-hght: ${Math.max(24, rc.dragPlaceholderHeight || 24)}px`, `--trvwr-sel-brd: ${resolveColor("border")}`].join("; ");
      },
   };
</script>

{#if nodes?.length}
   {#each nodes as node (node.pathInit)}
      {@const rowController = treeController.getOrCreateRowAdapter({
         ...$$props,
         ...$$restProps,
         treeController,
         get forceRefresh() {
            return self.refreshUi;
         },
         get rowLayoutEpoch() {
            return rowLayoutEpoch;
         },
         set rowLayoutEpoch(value: number) {
            rowLayoutEpoch = value;
         },
         get node() {
            return node;
         },
         get nodes() {
            return nodes;
         },
         set nodes(value: INode<TListObj>[]) {
            nodes = value;
         },
      })}
      <div {...$$restProps} class={self.rowHostClass($$restProps.class)} data-flatpath={rowController.flatPath}>
         <details class="trvwr-itm" class:highlight={rowController.isHighlighted} class:should-flash={rowController.shouldFlash} class:should-flash--error={rowController.shouldFlashError} class:trvwr-itm--folder-selected={rowController.isSelected && rowController.hasChildren} class:trvwr-itm--active={rowController.showOptions || rowController.isHighlighted} data-testid="tree-item" open={rowController.isNodeOpen} aria-disabled={rowController.mergedDisabled} on:toggle={(e) => rowController.ondetailstoggle(e)} style={self.detailsStyle(rowController)}>
            <summary {...self.summaryAttrs(rowController)} role="treeitem" draggable={rowController.isDraggable} on:click={(e) => rowController.onsummaryclick(e)} on:dblclick={(e) => rowController.onsummarydblclick(e)} on:keydown={(e) => rowController.onkeydown(e)} on:focus={(e) => rowController.onsummaryfocus(e)} on:blur={() => rowController.onsummaryblur()} on:pointerenter={() => rowController.onsummarypointerenter()} on:pointerleave={() => rowController.onsummarypointerleave()} on:dragstart={(e) => rowController.ondragstart(e)} on:dragend={(e) => rowController.ondragend(e)} on:dragenter={() => rowController.onsummarydragenter()} on:dragover={(e) => rowController.onsummarydragover(e)} on:dragleave={() => rowController.onsummarydragleave()} on:drop={(e) => rowController.ondrop(e)}>
               <FloatingComponent showfloat={rowController.floatVisible && rowController.hasRowTools} horizontal="right" vertical="top+50" linearTransform={rowController.floatCard}>
                  <FlexLayout items="center" class="trvwr-sum-row" gap="0.45rem">
                     <!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
                     {#if rowController.isDraggable}
                        <span class="trvwr-drag-handle" title="Arrastrar para reordenar" draggable={true} on:dragstart={(e) => rowController.ondragstart(e)} on:dragend={(e) => rowController.ondragend(e)}>
                           <Iconify icon="mdi:dots-grid" style="font-size: 1rem; opacity: 0.45" />
                        </span>
                     {:else if rowController.isLockedByProtection}
                        <span class="trvwr-drag-handle trvwr-drag-handle--locked" title="Protegido" aria-disabled="true">
                           <Iconify icon="mdi:lock-outline" style="font-size: 1rem; opacity: 0.55" />
                        </span>
                     {:else if rowController.isFrozen && !rowController.mergedDisabled}
                        <span class="trvwr-drag-handle trvwr-drag-handle--frozen" title="Posición fija" aria-disabled="true">
                           <Iconify icon="mdi:hand-back-right-off-outline" style="font-size: 1rem; opacity: 0.3" />
                        </span>
                     {/if}
                     {#if rowController.showCaret}
                        <FlexLayout items="center" class="trvwr-itm-symb" gap="0.45rem">
                           <Iconify icon="mdi:chevron-down" style="font-size: 1rem" rotate={rowController.isNodeOpen ? 0 : -90} />
                           {#if node.isGroupActor}
                              <slot name="grouperCaret" open={rowController.isNodeOpen} {node} />
                           {/if}
                           {#if rowController.rowIcono}
                              <Iconify icon={rowController.rowIcono.icon} {...rowController.rowIcono.rest} style={rowController.rowIcono.mergedStyle} />
                           {/if}
                        </FlexLayout>
                     {/if}
                     {#if !rowController.showCaret && rowController.rowIcono}
                        <!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
                        <span class="trvwr-itm-lead trvwr-itm-lead--icon" class:trvwr-itm-lead--add={!!rowController.onLeadIconClick} title={rowController.onLeadIconClick ? "Agregar hijo" : undefined} on:click|stopPropagation={rowController.onLeadIconClick ? () => rowController.onLeadIconClick?.() : undefined}>
                           <Iconify icon={rowController.rowIcono.icon} {...rowController.rowIcono.rest} style={rowController.rowIcono.mergedStyle} />
                        </span>
                     {/if}
                     <FlexLayout items="center" class="trvwr-itm-content" style="flex: 1; min-width: 0">
                        <slot name="row" {node} />
                     </FlexLayout>
                  </FlexLayout>
                  <Card slot="float" class="trvwr-float-card">
                     <div role="presentation" style="display: contents" on:click|stopPropagation on:dblclick|stopPropagation on:mousedown|stopPropagation on:pointerdown|stopPropagation on:keydown|stopPropagation>
                        <FlexOptions actions={rowController.filteredActions} more={rowController.cascadeOptions} moreDisabled={rowController.cascadeDisabled} morePanelClass="trvwr-cascade-panel" />
                     </div>
                  </Card>
               </FloatingComponent>
            </summary>
            {#if rowController.hasChildren && rowController.isNodeOpen}
               <div class="trvwr-itm-childrens-wrap" transition:slide={{ duration: 200 }}>
                  <FlexLayout direction="column" gap="0" role="group" class="trvwr-itm-childrens" style="padding-inline-start: 1.6rem">
                     <svelte:self {treeController} {rowLayoutEpoch} nodes={node.childrens!}>
                        <div slot="row" style="display: contents" let:node={childNode}>
                           <slot name="row" node={childNode} />
                        </div>
                        <div slot="grouperCaret" style="display: contents" let:open={childOpen} let:node={childCaretNode}>
                           <slot name="grouperCaret" open={childOpen} node={childCaretNode} />
                        </div>
                     </svelte:self>
                  </FlexLayout>
               </div>
            {/if}
         </details>
      </div>
   {/each}
{/if}

<style>
   :global(.trvwr-float-card) {
      max-width: min(100%, 18rem);
      overflow-x: auto;
      overflow-y: hidden;
   }
   :global(.trvwr-float-card .ispsc-flex-options) {
      flex-wrap: nowrap;
   }
   :global(.trvwr-cascade-panel) {
      scale: 0.8;
      transform-origin: top right;
   }
   .trvwr-row-host {
      display: contents;
      .trvwr-itm {
         overflow: visible;
         list-style: none;
         width: 100%;
         min-width: 0;
         & > .trvwr-itm-sum {
            list-style: none;
            display: block;
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
            padding: 0.35rem 0.5rem;
            border-radius: 0;
            cursor: pointer;
            user-select: none;
            transition: background-color 0.15s ease;
            position: relative;

            :global(.trvwr-float-btn) {
               scale: 0.7;
            }
            &:hover:not(.trvwr-itm-sum--disabled) {
               background-color: var(--trvwr-hvr-dflt);
            }
            &:active:not(.trvwr-itm-sum--disabled) {
               background-color: var(--trvwr-ctv-dflt);
            }
            &.trvwr-itm-sum--focused {
               outline: 2px solid var(--trvwr-fcs-rng);
               outline-offset: -1px;
            }
            &:focus-visible {
               outline: 2px solid var(--trvwr-fcs-rng);
               outline-offset: -1px;
            }
            &.trvwr-itm-sum--disabled {
               opacity: 0.5;
               cursor: not-allowed;
            }
            &::-webkit-details-marker {
               display: none;
            }
            &.trvwr-itm-sum--drg-bf::before,
            &.trvwr-itm-sum--drg-aftr::after,
            &.trvwr-itm-sum--drg-forbidden-bf::before,
            &.trvwr-itm-sum--drg-forbidden-aftr::after {
               content: "";
               position: absolute;
               left: 0;
               right: 0;
               height: 4px;
               background-color: var(--trvwr-drp-ndctr-bg);
               border: 1px solid var(--is-primary);
               border-radius: 0.25rem;
               box-sizing: border-box;
               pointer-events: none;
               z-index: 2;
            }
            &.trvwr-itm-sum--drg-bf::before {
               top: -2px;
            }
            &.trvwr-itm-sum--drg-aftr::after {
               bottom: -2px;
            }
            &.trvwr-itm-sum--drg-forbidden-bf::before,
            &.trvwr-itm-sum--drg-forbidden-aftr::after {
               background-color: color-mix(in srgb, var(--is-danger, #e53935) 35%, transparent);
               border-color: var(--is-danger, #e53935);
            }
            &.trvwr-itm-sum--drg-forbidden-bf::before {
               top: -2px;
            }
            &.trvwr-itm-sum--drg-forbidden-aftr::after {
               bottom: -2px;
            }
            &.trvwr-itm-sum--drg-into {
               outline: 2px dashed var(--is-primary);
               outline-offset: -2px;
               background-color: var(--trvwr-drp-ndctr-bg);
               border-radius: 0.25rem;
            }
            &.trvwr-itm-sum--drg-forbidden-into {
               outline: 2px dashed var(--is-danger, #e53935);
               outline-offset: -2px;
               background-color: color-mix(in srgb, var(--is-danger, #e53935) 18%, transparent);
               border-radius: 0.25rem;
            }
            :global {
               .trvwr-itm-symb {
                  flex-shrink: 0;
                  border-radius: 9999px;
                  padding: 0.1em 0.45em;
                  cursor: pointer;
                  color: var(--is-color);
                  transition: background-color 0.15s ease;
               }
               .trvwr-itm-symb:hover {
                  background-color: var(--trvwr-ctv-dflt);
               }
               .trvwr-itm-lead {
                  flex-shrink: 0;
               }
               .trvwr-itm-lead--add {
                  cursor: pointer;
                  border-radius: 0.2em;
                  transition: background-color 0.15s ease;
                  &:hover {
                     background-color: var(--trvwr-ctv-dflt);
                  }
               }
            }
         }
         &:is(details.highlight) > .trvwr-itm-sum {
            background-color: var(--trvwr-hghlght-bg);
         }
         &:is(details.highlight) > .trvwr-itm-sum:hover:not(.trvwr-itm-sum--disabled) {
            background-color: var(--trvwr-hghlght-hvr-bg);
         }
         &.trvwr-itm--dragging {
            opacity: 0.4;
         }
         &.trvwr-itm--folder-selected {
            border: 1px solid var(--trvwr-sel-brd);
            background-color: #8881;
            border-radius: 0.25rem;
         }
         &.trvwr-itm--active {
            border: 1px solid var(--trvwr-sel-brd);
            background-color: #8881;
            border-radius: 0.25rem;
         }
         & :global {
            .trvwr-drag-handle {
               display: inline-flex;
               align-items: center;
               justify-content: center;
               vertical-align: middle;
               width: 1.25em;
               height: 100%;
               cursor: grab;
               flex-shrink: 0;
               color: var(--is-color);
               &:active {
                  cursor: grabbing;
               }
            }
            .trvwr-drag-handle--frozen {
               cursor: not-allowed;
               opacity: 0.5;
               &:active {
                  cursor: not-allowed;
               }
            }
            .trvwr-drag-handle--locked {
               cursor: not-allowed;
               opacity: 0.7;
               &:active {
                  cursor: not-allowed;
               }
            }
            .trvwr-sum-row {
               width: 100%;
               min-height: 2em;
               flex: 1;
               min-width: 0;
            }
         }
         & .trvwr-itm-lead--icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.25em;
            flex-shrink: 0;
         }
         &:is(details.should-flash) > .trvwr-itm-sum {
            animation: trvwr-swap-flash 0.6s ease-out;
         }
         &:is(details.should-flash--error) > .trvwr-itm-sum {
            animation: trvwr-swap-flash-error 0.6s ease-out;
         }
      }
   }
   @keyframes trvwr-swap-flash {
      0% {
         background-color: var(--trvwr-swp-bg);
      }
      100% {
         background-color: transparent;
      }
   }
   @keyframes trvwr-swap-flash-error {
      0% {
         background-color: var(--trvwr-swp-err-bg);
      }
      100% {
         background-color: transparent;
      }
   }
</style>
