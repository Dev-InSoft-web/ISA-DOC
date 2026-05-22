<script context="module" lang="ts">
   import { TObject } from "@ingenieria_insoft/ispgen";
   import { CatalogoGen, FlexLayout, Input, InputNumber, RichEditor, SelectObject } from "@ingenieria_insoft/ispsveltecomponents";
   import BtnRef2 from "../../especial/BtnRef2.svelte";
   import SwitchField from "../../especial/_Switch.svelte";
   import TipInfo from "../../overlays/TipInfo.svelte";
   import ObjJConfig, { Adapter, type CatalogoController, type ControlDef, type Controllers, type FieldDef, type InputKind } from "./ObjJConfig.svelte";
   import type { ICtxBtnRef } from "@ingenieria_insoft/ispsveltecomponents";

   class TEnumOption extends TObject {
      get caption(): string { return String(this.f.caption ?? ""); }
      set caption(v: string) { this.f.caption = v; }
   }

   export interface AttrJConfigProps {
      Obj: TObject;
      keyName: string;
      def: FieldDef;
      controllers?: Controllers;
      readonly?: boolean;
      small?: boolean;
      onvalue?: (v: unknown) => void;
   }
</script>

<script lang="ts">
   interface $$Props extends AttrJConfigProps {}

   export let Obj: $$Props["Obj"];
   export let keyName: $$Props["keyName"];
   export let def: $$Props["def"];
   export let controllers: $$Props["controllers"] = {};
   export let readonly: $$Props["readonly"] = false;
   export let small: $$Props["small"] = false;
   export let onvalue: $$Props["onvalue"] = undefined;

   let textValue = "";
   let numberValue = 0;
   let boolValue = false;
   let _lastIn: unknown;
   let _lastBool: boolean = false;
   let _lastText: string = "";
   let _lastNumber: number = 0;

   $: syncFromObj(Obj, keyName, def.type);

   function syncFromObj(o: TObject, k: string, t: FieldDef["type"]): void {
      const cur = Adapter.getByPath(o, k);
      if (cur === _lastIn) return;
      _lastIn = cur;
      const raw = cur == null ? "" : String(cur);
      textValue = t === "SelectObject" ? raw.toUpperCase() : raw;
      _lastText = textValue;
      const n = Number(cur);
      numberValue = Number.isFinite(n) ? n : 0;
      _lastNumber = numberValue;
      const b = !!cur;
      boolValue = b;
      _lastBool = b;
   }

   const pushText = (): void => { _lastIn = textValue; _lastText = textValue; Adapter.setByPath(Obj, keyName, textValue); Obj = Obj; onvalue?.(textValue); };
   const pushNumber = (): void => { _lastIn = numberValue; _lastNumber = numberValue; Adapter.setByPath(Obj, keyName, numberValue); Obj = Obj; onvalue?.(numberValue); };
   const pushEnum = (): void => { textValue = textValue.toUpperCase(); _lastIn = textValue; _lastText = textValue; Adapter.setByPath(Obj, keyName, textValue); Obj = Obj; onvalue?.(textValue); };
   const pushRich = (): void => { _lastIn = textValue; _lastText = textValue; Adapter.setByPath(Obj, keyName, textValue); Obj = Obj; onvalue?.(textValue); };

   $: if ((def.type === "InputText" || def.type === "RichEditor" || def.type === "BtnRef" || !def.type) && textValue !== _lastText) pushText();
   $: if (def.type === "InputNumber" && numberValue !== _lastNumber) pushNumber();

   $: if (def.type === "Switch" && boolValue !== _lastBool) {
      _lastBool = boolValue;
      _lastIn = boolValue;
      Adapter.setByPath(Obj, keyName, boolValue);
      Obj = Obj;
      onvalue?.(boolValue);
   }

   const self = {
      kind(d: FieldDef): InputKind {
         return d.type ?? "InputText";
      },
      label(d: FieldDef, k: string): string {
         return d.label ?? k;
      },
      effectiveReadonly(local: boolean | undefined, d: FieldDef): boolean {
         return !!local || !!d.readonly;
      },
      enumOptions(opts: FieldDef["options"]): Record<string, TEnumOption> {
         const out: Record<string, TEnumOption> = {};
         const add = (k: string, v: string) => { const key = k.trim().toUpperCase(); if (key) out[key] = TEnumOption.JSONToObject({ caption: v }) as TEnumOption; };
         if (Array.isArray(opts)) opts.forEach((o) => add(String(o ?? ""), String(o ?? "")));
         else if (opts && typeof opts === "object") Object.entries(opts).forEach(([k, v]) => add(String(k), String(v ?? k)));
         return out;
      },
      enumCaption(o: TEnumOption): string { return o?.caption ?? ""; },
      controlDef(d: FieldDef): ControlDef | undefined {
         const name = d.controllername;
         if (!name) return undefined;
         return Adapter.asControlDef(controllers?.[name]);
      },
      asBtnRefController(c: ControlDef | undefined): ICtxBtnRef<TObject> | undefined {
         return c?.Controller as ICtxBtnRef<TObject> | undefined;
      },
      asCatalogoController(c: ControlDef | undefined): CatalogoController | undefined {
         return c?.Controller as CatalogoController | undefined;
      },
      onBtnRefSelected(brd: ControlDef | undefined, record: TObject): void {
         brd?.onSelectedRecord?.(record, Obj);
         Obj = Obj;
         pushText();
      },
      hasTips(d: FieldDef): boolean {
         return !!(d.tipInfo || d.tipWarn);
      },
   };

   $: kind = self.kind(def);
   $: lbl = self.label(def, keyName);
   $: effReadonly = self.effectiveReadonly(readonly, def);
   $: enumOpts = kind === "SelectObject" ? self.enumOptions(def.options) : {};
   $: controlDef = kind === "BtnRef" || kind === "CatalogoGen" ? self.controlDef(def) : undefined;
   $: hasTips = self.hasTips(def);
</script>

{#if hasTips}
   <FlexLayout items="center" wrap={false}>
      <svelte:self bind:Obj {keyName} def={{ ...def, tipInfo: undefined, tipWarn: undefined }} {controllers} {readonly} {small} />
      <FlexLayout direction="column" items="center" justify="center" wrap={false} style="flex-shrink: 0; line-height: 0;">
         {#if def.tipInfo}
            <TipInfo descripcion={def.tipInfo} kind="info" />
         {/if}
         {#if def.tipWarn}
            <TipInfo descripcion={def.tipWarn} kind="warn" />
         {/if}
      </FlexLayout>
   </FlexLayout>
{:else if kind === "Switch"}
   <SwitchField name={keyName} label={lbl} bind:checked={boolValue} readonly={effReadonly} />
{:else if kind === "InputNumber"}
   <InputNumber name={keyName} label={lbl} required={!!def.required} readonly={effReadonly} bind:value={numberValue} onChange={pushNumber} onTypingEnd={pushNumber} />
{:else if kind === "RichEditor"}
   <RichEditor name={keyName} label={lbl} required={!!def.required} readonly={effReadonly} bind:value={textValue} onTypingEnd={pushRich} />
{:else if kind === "SelectObject"}
   <SelectObject name={keyName} label={lbl} required={!!def.required} readonly={effReadonly} bind:value={textValue} Options={enumOpts} fnCaption={self.enumCaption} onChange={pushEnum} />
{:else if kind === "BtnRef" && controlDef}
   {@const btnCtrl = self.asBtnRefController(controlDef) as ICtxBtnRef<TObject>}
   <BtnRef2 name={keyName} label={lbl} {small} required={!!def.required} readonly={effReadonly} maxLength={def.maxlength ?? undefined} bind:value={textValue} Controller={btnCtrl} onSelectedRecord={(rec: TObject) => self.onBtnRefSelected(controlDef, rec)} onChange={pushText} onTypingEnd={pushText} />
{:else if kind === "CatalogoGen" && controlDef}
   {@const catCtrl = self.asCatalogoController(controlDef) as CatalogoController}
   {@const catCfg = def.catalogo ?? {}}
   {@const frmSlot = catCfg.slots?.Frm}
   <CatalogoGen Controller={catCtrl} bAllowed={catCfg.bAllowed} onError={catCfg.onError ?? ((msg: string) => alert(msg))}>
      <FlexLayout slot="Frm" id={frmSlot?.id} direction={frmSlot?.direction ?? "column"} let:itdForm={fIt} let:Obj={fObj} let:small={fSm}>
         {#each frmSlot?.children({ itdForm: fIt, Obj: fObj, small: fSm }) ?? [] as childNode, i (i)}
            {#if childNode.type === "ObjJConfig"}
               <ObjJConfig Obj={childNode.Obj} structure={childNode.children} {controllers} readonly={childNode.readonly ?? readonly} />
            {/if}
         {/each}
      </FlexLayout>
   </CatalogoGen>
{:else}
   <Input name={keyName} label={lbl} {small} required={!!def.required} readonly={effReadonly} maxLength={def.maxlength ?? undefined} bind:value={textValue} onChange={pushText} onTypingEnd={pushText} />
{/if}
