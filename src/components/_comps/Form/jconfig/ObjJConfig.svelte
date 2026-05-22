<script context="module" lang="ts">
   import type { TObject, TControllerCatalogoGen } from "@ingenieria_insoft/ispgen";
   import type { AccionesGenProps, ActionDrawerProps, ButtonProps, ComponentColor, FlexLayoutProps, ICtxAction, ICtxBtnRef, ICtxGrid, IconifyProps, ModalProps, TBAllowed } from "@ingenieria_insoft/ispsveltecomponents";
   import { AccionesGen, ActionDrawer, Button, FlexLayout, H4, Iconify, Modal, Text } from "@ingenieria_insoft/ispsveltecomponents";
   import type { FormJConfigProps } from "./FormJConfig.svelte";
   import type { HTMLInputAttributes, HTMLSelectAttributes, HTMLTextareaAttributes } from "svelte/elements";
   import { ObjPath } from "./ObjPath";
   import GridResponsiveForm from "../GridResponsiveForm.svelte";
   import AttrJConfig from "./AttrJConfig.svelte";

   export type InputKind = "InputText" | "InputNumber" | "Switch" | "RichEditor" | "SelectObject" | "BtnRef" | "CatalogoGen";

   type HTMLFormAttrs = HTMLInputAttributes & HTMLSelectAttributes & HTMLTextareaAttributes;

   export type FieldDef = Omit<HTMLFormAttrs, "type" | "options"> & { type?: InputKind; label?: string; small?: boolean; options?: string[] | Record<string, string>; controllername?: string; tipInfo?: string; tipWarn?: string; catalogo?: CatalogoFieldConfig };

   export type CatalogoFieldConfig = { bAllowed?: TBAllowed; onError?: (msg: string) => void; slots?: SlotMap };

   export type SlotMap = { Frm?: SlotDef };

   export type SlotCtx = { itdForm?: string; Obj?: TObject; small?: boolean };

   export type SlotChildrenFn = (ctx: SlotCtx) => NodeDef[];

   export type SlotDef = { type?: "FlexLayout"; direction?: "row" | "column"; id?: string; children: SlotChildrenFn };

   export type ObjJConfigNode = { type: "ObjJConfig"; Obj: TObject; children: StructureTree; readonly?: boolean };

   export type NodeDef = ObjJConfigNode;

   export type CatalogoController<T extends TObject = TObject> = TControllerCatalogoGen<T> & ICtxGrid<T> & ICtxAction<T>;

   export type AnyCtxBtnRef = ICtxBtnRef<any>;

   export type ControlDef<T extends TObject = TObject> = { Controller: AnyCtxBtnRef | CatalogoController<TObject>; onSelectedRecord?: (record: TObject, Obj: T) => void };

   export type ConfigNode = { type: "config"; maxcells?: number; mincells?: number };

   export type SlotContent = string | StructureNode | StructureTree;

   export type NodeSlots = { default?: SlotContent; title?: SlotContent };

   export type H4Node = { type: "H4"; slot?: NodeSlots };

   export type TextNode = { type: "Text"; color?: ComponentColor; icon?: string; slot?: NodeSlots };

   export type DecorativeNode = H4Node | TextNode;

   export type ItemNode<T extends TObject = TObject> = { type: "item"; Obj: T; keyName: string; def: FieldDef; key?: string };

   export type FieldGroup = Record<string, FieldDef>;

   export type ActionDrawerNode = { type: "ActionDrawer"; children: StructureTree } & Partial<Omit<ActionDrawerProps, "children">>;

   export type FormJConfigNode<T extends TObject = TObject> = { type: "FormJConfig"; children: StructureTree } & Partial<Omit<FormJConfigProps<T>, "structure" | "Obj">>;

   export type FlexLayoutNode = { type: "FlexLayout"; children: StructureTree } & Partial<Omit<FlexLayoutProps, "children">>;

   export type ModalNode = { type: "Modal"; children: StructureTree; slot?: NodeSlots } & Partial<Omit<ModalProps, "children" | "slot">>;

   export type ButtonNode = { type: "Button"; htmlType?: ButtonProps["type"]; slot?: NodeSlots } & Partial<Omit<ButtonProps, "children" | "type" | "slot">>;

   export type InputNode = { type: "Input"; value?: string; onvalue?: (v: string) => void; label?: string; readonly?: boolean; required?: boolean; maxLength?: number; class?: string; style?: string };

   export type IconifyNode = { type: "Iconify"; icon: string } & Partial<Omit<IconifyProps, "icon">>;

   export type AccionesGenNode<T extends TObject = any> = {
      type: "AccionesGen";
      children: StructureTree;
      onItdFormChange?: (v: AccionesGenProps<T>["itdForm"]) => void;
   } & Partial<Omit<AccionesGenProps<T>, "children" | "Controller" | "Obj" | "onNewObject">> & {
         Controller?: AccionesGenProps<T>["Controller"] | object;
         Obj?: T | object;
         onNewObject?: () => Promise<T | object>;
      };

   export type SlotDefaultNode = { type: "slotDefault" };

   export type ThunkNode = () => StructureNode | StructureTree | null | undefined | false;

   export type ContainerNode = ActionDrawerNode | FormJConfigNode | FlexLayoutNode | AccionesGenNode | ModalNode;
   export type LeafNode = ButtonNode | IconifyNode | InputNode;
   export type ControlNode = SlotDefaultNode;
   export type StructureNode = ConfigNode | ItemNode | DecorativeNode | ContainerNode | LeafNode | ControlNode | ThunkNode | FieldGroup | StructureNode[];
   export type StructureTree = StructureNode[];
   export type Controllers<T extends TObject = TObject> = Record<string, AnyCtxBtnRef | ControlDef<T>>;

   const ALL_NODE_TYPES = ["config", "item", "H4", "Text", "ActionDrawer", "FormJConfig", "FlexLayout", "AccionesGen", "Modal", "Button", "Iconify", "Input", "slotDefault"] as const;
   type AnyNodeType = (typeof ALL_NODE_TYPES)[number];

   export class Adapter {
      static getByPath = ObjPath.get;
      static setByPath = ObjPath.set;

      static isType<K extends AnyNodeType>(n: StructureNode, ...types: K[]): n is Extract<StructureNode, { type: K }> {
         if (Array.isArray(n) || typeof n === "function") return false;
         const t = (n as { type?: string }).type;
         return typeof t === "string" && (types as readonly string[]).includes(t);
      }

      static isDecorativeNode(n: StructureNode): n is DecorativeNode {
         return Adapter.isType(n, "H4", "Text");
      }

      static isContainerNode(n: StructureNode): n is ContainerNode {
         return Adapter.isType(n, "ActionDrawer", "FormJConfig", "FlexLayout", "AccionesGen", "Modal");
      }

      static isLeafNode(n: StructureNode): n is LeafNode {
         return Adapter.isType(n, "Button", "Iconify", "Input");
      }

      static isControlNode(n: StructureNode): n is ControlNode {
         return Adapter.isType(n, "slotDefault");
      }

      static isThunkNode(n: StructureNode): n is ThunkNode {
         return typeof n === "function";
      }

      static resolveThunk(n: ThunkNode): StructureTree {
         const r = n();
         if (r === null || r === undefined || r === false) return [];
         return Array.isArray(r) ? r : [r];
      }

      static isGroup(n: StructureNode): n is FieldGroup {
         if (Array.isArray(n) || typeof n === "function") return false;
         return ALL_NODE_TYPES.every((t) => !Adapter.isType(n, t));
      }

      static slotText(s: NodeSlots | undefined): string {
         return typeof s?.default === "string" ? s.default : "";
      }

      static slotTree(s: SlotContent | undefined): StructureTree {
         if (s == null || typeof s === "string") return [];
         return Array.isArray(s) ? s : [s];
      }

      static splitConfig(tree: StructureTree): { config: ConfigNode; rest: StructureNode[] } {
         if (tree.length > 0 && Adapter.isType(tree[0], "config")) {
            return { config: tree[0] as ConfigNode, rest: tree.slice(1) };
         }
         return { config: { type: "config" }, rest: tree };
      }

      static isFlatGroup(nodes: StructureNode[]): boolean {
         return nodes.every((n) => Adapter.isGroup(n) || Adapter.isType(n, "item", "H4", "Text"));
      }

      static segments(nodes: StructureNode[], defaultObj: TObject): Array<{ kind: "grid"; items: Array<{ key: string; Obj: TObject; keyName: string; def: FieldDef }> } | { kind: "H4"; text: string } | { kind: "Text"; text: string; color?: ComponentColor; icon?: string }> {
         type GridItem = { key: string; Obj: TObject; keyName: string; def: FieldDef };
         const out: Array<{ kind: "grid"; items: GridItem[] } | { kind: "H4"; text: string } | { kind: "Text"; text: string; color?: ComponentColor; icon?: string }> = [];
         let buf: GridItem[] = [];
         const flush = () => {
            if (buf.length) {
               out.push({ kind: "grid", items: buf });
               buf = [];
            }
         };
         nodes.forEach((n) => {
            if (Adapter.isType(n, "H4")) {
               flush();
               out.push({ kind: "H4", text: Adapter.slotText(n.slot) });
            } else if (Adapter.isType(n, "Text")) {
               flush();
               out.push({ kind: "Text", text: Adapter.slotText(n.slot), color: n.color, icon: n.icon });
            } else if (Adapter.isType(n, "item")) {
               buf.push({ key: n.key ?? n.keyName, Obj: n.Obj, keyName: n.keyName, def: n.def });
            } else if (Adapter.isGroup(n)) {
               Object.entries(n).forEach(([k, d]) => buf.push({ key: k, Obj: defaultObj, keyName: k, def: d }));
            }
         });
         flush();

         return out;
      }

      static asGroup(n: StructureNode): FieldGroup {
         return Adapter.isGroup(n) ? n : {};
      }

      static asTree(n: StructureNode): StructureTree {
         return Array.isArray(n) ? n : [n];
      }

      static nodeProps<N extends { type: string; children?: unknown }>(n: N): Omit<N, "type" | "children"> {
         const { type: _t, children: _c, ...rest } = n as N & { type: string; children?: unknown };
         void _t;
         void _c;
         return rest as Omit<N, "type" | "children">;
      }

      static asControlDef<T extends TObject>(entry: ICtxBtnRef<TObject> | ControlDef<T> | undefined): ControlDef<T> | undefined {
         if (!entry) return undefined;
         if ((entry as ControlDef<T>).Controller) return entry as ControlDef<T>;
         return { Controller: entry as ICtxBtnRef<TObject> };
      }

      static jconfig2FieldDef(jconfig: unknown, label: string): FieldDef {
         const j = (jconfig ?? {}) as {
            type?: string;
            options?: string[] | Record<string, string>;
            controllername?: string;
            readonly?: boolean;
            required?: boolean;
            inputProps?: { maxlength?: number };
         };
         const validKinds: ReadonlyArray<InputKind> = ["InputText", "InputNumber", "Switch", "RichEditor", "SelectObject", "BtnRef", "CatalogoGen"];
         const raw = String(j.type ?? "");
         const type: InputKind = (validKinds as readonly string[]).includes(raw) ? (raw as InputKind) : "InputText";
         const maxlength = Number(j.inputProps?.maxlength ?? 0);

         return {
            type,
            label,
            options: j.options,
            controllername: j.controllername,
            readonly: !!j.readonly,
            required: !!j.required,
            maxlength: Number.isFinite(maxlength) && maxlength > 0 ? maxlength : 500,
         };
      }
   }

   export type Structure = StructureTree | (() => StructureTree);

   export type SlotCtxState<T extends TObject = TObject> = { Obj?: T; itdForm?: string; bRapido?: boolean; small?: boolean };

   export type ObjJConfigProps<T extends TObject> = Omit<FlexLayoutProps, "direction"> & { structure: Structure; controllers?: Controllers<T>; Obj: T; readonly?: boolean; slotCtx?: SlotCtxState<T> };
</script>

<script lang="ts" generics="T extends TObject">
   interface $$Props extends ObjJConfigProps<T> {}

   export let structure: $$Props["structure"];
   export let controllers: $$Props["controllers"] = {};
   export let Obj: $$Props["Obj"];
   export let readonly: $$Props["readonly"] = false;
   export let slotCtx: $$Props["slotCtx"] = undefined;

   let formHost: HTMLFormElement | null = null;
   let initial = "";

   export function getJSON(): string {
      if (!formHost) return "";
      const data: Record<string, unknown> = {};
      const controls = formHost.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea");
      controls.forEach((ctrl) => {
         const name = ctrl.getAttribute("name") || ctrl.getAttribute("data-name") || ctrl.id;
         if (!name) return;
         if (ctrl instanceof HTMLInputElement && (ctrl.type === "checkbox" || ctrl.type === "radio")) {
            data[name] = !!ctrl.checked;
            return;
         }
         data[name] = ctrl.value;
      });
      return JSON.stringify(data);
   }

   export function snapshot(): void {
      initial = getJSON();
   }

   export function isDirty(): boolean {
      return getJSON() !== initial;
   }

   $: resolved = typeof structure === "function" ? structure() : structure;
   $: split = Adapter.splitConfig(resolved);
   $: controllersAny = controllers as Controllers;
   $: slotObj = (slotCtx?.Obj ?? Obj) as T;
   $: slotItdForm = slotCtx?.itdForm;
   $: slotBRapido = slotCtx?.bRapido;
   $: slotSmall = slotCtx?.small;
</script>

{#if Adapter.isFlatGroup(split.rest)}
   {@const segs = Adapter.segments(split.rest, Obj)}
   <FlexLayout {...$$restProps} direction="column" gap="0.5rem">
      {#each segs as seg, i (i)}
         {#if seg.kind === "H4"}
            <H4>{seg.text}</H4>
         {:else if seg.kind === "Text"}
            <Text color={seg.color ?? "neutral"}>
               {#if seg.icon}<Iconify icon={seg.icon} color={seg.color} />{/if}
               {seg.text}
            </Text>
         {:else}
            <GridResponsiveForm maxcells={split.config.maxcells} mincells={split.config.mincells} let:small>
               {#each seg.items as item (item.key)}
                  <AttrJConfig Obj={item.Obj} keyName={item.keyName} def={item.def} controllers={controllersAny} {readonly} {small} />
               {/each}
            </GridResponsiveForm>
         {/if}
      {/each}
   </FlexLayout>
{:else}
   {@const wrap = split.rest.length > 1}
   <div style:display={wrap ? "flex" : "contents"} style:flex-direction={wrap ? "column" : null} style:gap={wrap ? "0.5rem" : null}>
      {#each split.rest as node, i (i)}
         {#if Adapter.isType(node, "ActionDrawer")}
            <ActionDrawer {...Adapter.nodeProps(node) as ActionDrawerProps}>
               <svelte:self bind:Obj structure={node.children} {controllers} {readonly} {slotCtx} let:Obj={inObj} let:itdForm={inIt} let:bRapido={inBR} let:small={inSm}>
                  <slot Obj={inObj} itdForm={inIt} bRapido={inBR} small={inSm} />
               </svelte:self>
            </ActionDrawer>
         {:else if Adapter.isType(node, "FormJConfig")}
            <form bind:this={formHost} {...Adapter.nodeProps(node) as Record<string, unknown>}>
               <svelte:self bind:Obj structure={node.children} {controllers} {readonly} {slotCtx} let:Obj={inObj} let:itdForm={inIt} let:bRapido={inBR} let:small={inSm}>
                  <slot Obj={inObj} itdForm={inIt} bRapido={inBR} small={inSm} />
               </svelte:self>
            </form>
         {:else if Adapter.isType(node, "FlexLayout")}
            <FlexLayout {...Adapter.nodeProps(node) as FlexLayoutProps}>
               <svelte:self bind:Obj structure={node.children} {controllers} {readonly} {slotCtx} let:Obj={inObj} let:itdForm={inIt} let:bRapido={inBR} let:small={inSm}>
                  <slot Obj={inObj} itdForm={inIt} bRapido={inBR} small={inSm} />
               </svelte:self>
            </FlexLayout>
         {:else if Adapter.isType(node, "AccionesGen")}
            <AccionesGen {...Adapter.nodeProps(node) as AccionesGenProps<T>}>
               <svelte:fragment slot="Frm" let:Obj={accObj} let:itdForm={accIt} let:bRapido={accBR} let:small={accSm}>
                  {(node.onItdFormChange?.(accIt), "")}
                  <svelte:self bind:Obj structure={node.children} {controllers} {readonly} slotCtx={{ Obj: accObj as T, itdForm: accIt, bRapido: accBR, small: accSm }} let:Obj={inObj} let:itdForm={inIt} let:bRapido={inBR} let:small={inSm}>
                     <slot Obj={inObj} itdForm={inIt} bRapido={inBR} small={inSm} />
                  </svelte:self>
               </svelte:fragment>
            </AccionesGen>
         {:else if Adapter.isType(node, "Modal")}
            {@const modalAll = Adapter.nodeProps(node) as ModalProps & { slot?: NodeSlots }}
            {@const { slot: modalSlot, ...modalRest } = modalAll}
            {@const titleTree = Adapter.slotTree(modalSlot?.title)}
            <Modal {...modalRest as ModalProps}>
               <svelte:fragment slot="title">
                  {#if titleTree.length}
                     <svelte:self bind:Obj structure={titleTree} {controllers} {readonly} {slotCtx} let:Obj={inObj} let:itdForm={inIt} let:bRapido={inBR} let:small={inSm}>
                        <slot Obj={inObj} itdForm={inIt} bRapido={inBR} small={inSm} />
                     </svelte:self>
                  {/if}
               </svelte:fragment>
               <svelte:self bind:Obj structure={node.children} {controllers} {readonly} {slotCtx} let:Obj={inObj} let:itdForm={inIt} let:bRapido={inBR} let:small={inSm}>
                  <slot Obj={inObj} itdForm={inIt} bRapido={inBR} small={inSm} />
               </svelte:self>
            </Modal>
         {:else if Adapter.isType(node, "Button")}
            {@const btnAll = Adapter.nodeProps(node) as Omit<ButtonProps, "type"> & { htmlType?: ButtonProps["type"]; slot?: NodeSlots }}
            {@const { htmlType: btnType, slot: btnSlot, ...btnRest } = btnAll}
            {@const btnText = Adapter.slotText(btnSlot)}
            {@const btnTree = Adapter.slotTree(btnSlot?.default)}
            <Button type={btnType} {...btnRest as Omit<ButtonProps, "type">}>
               {#if btnText}{btnText}
               {:else if btnTree.length}
                  <svelte:self bind:Obj structure={btnTree} {controllers} {readonly} {slotCtx} let:Obj={inObj} let:itdForm={inIt} let:bRapido={inBR} let:small={inSm}>
                     <slot Obj={inObj} itdForm={inIt} bRapido={inBR} small={inSm} />
                  </svelte:self>
               {/if}
            </Button>
         {:else if Adapter.isType(node, "Iconify")}
            <Iconify {...Adapter.nodeProps(node) as IconifyProps} />
         {:else if Adapter.isType(node, "Input")}
            {@const inputProxy = { value: node.value ?? "" } as unknown as TObject}
            {@const inputDef = { type: "InputText" as InputKind, label: node.label, readonly: node.readonly, required: node.required, maxlength: node.maxLength } as FieldDef}
            <AttrJConfig Obj={inputProxy} keyName="value" def={inputDef} controllers={controllersAny} {readonly} onvalue={node.onvalue as ((v: unknown) => void) | undefined} />
         {:else if Adapter.isType(node, "H4")}
            <H4>{Adapter.slotText(node.slot)}</H4>
         {:else if Adapter.isType(node, "Text")}
            <Text color={node.color ?? "neutral"}>
               {#if node.icon}<Iconify icon={node.icon} color={node.color} />{/if}
               {Adapter.slotText(node.slot)}
            </Text>
         {:else if Adapter.isThunkNode(node)}
            <svelte:self bind:Obj structure={Adapter.resolveThunk(node)} {controllers} {readonly} {slotCtx} let:Obj={inObj} let:itdForm={inIt} let:bRapido={inBR} let:small={inSm}>
               <slot Obj={inObj} itdForm={inIt} bRapido={inBR} small={inSm} />
            </svelte:self>
         {:else if Adapter.isType(node, "slotDefault")}
            <slot Obj={slotObj} itdForm={slotItdForm} bRapido={slotBRapido} small={slotSmall} />
         {:else}
            <svelte:self bind:Obj structure={Adapter.asTree(node)} {controllers} {readonly} {slotCtx} let:Obj={inObj} let:itdForm={inIt} let:bRapido={inBR} let:small={inSm}>
               <slot Obj={inObj} itdForm={inIt} bRapido={inBR} small={inSm} />
            </svelte:self>
         {/if}
      {/each}
   </div>
{/if}
