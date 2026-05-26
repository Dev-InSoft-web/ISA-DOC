<svelte:options accessors={true} />

<script context="module" lang="ts">
   import type { TObject } from "@ingenieria_insoft/ispgen";
   import ObjJConfig, { type Controllers, type StructureTree } from "./ObjJConfig.svelte";

   export interface FormJConfigProps<T extends TObject = TObject> {
      class?: string;
      style?: string;
      structure?: StructureTree;
      controllers?: Controllers;
      Obj?: T;
      readonly?: boolean;
      oninput?: (e: Event) => void;
      onchange?: (e: Event) => void;
   }
</script>

<script lang="ts" generics="T extends TObject">
   interface $$Props extends FormJConfigProps<T> {}

   export let structure: $$Props["structure"] = undefined;
   export let controllers: $$Props["controllers"] = undefined;
   export let Obj: $$Props["Obj"] = undefined;
   export let readonly: $$Props["readonly"] = false;
   export let oninput: $$Props["oninput"] = undefined;
   export let onchange: $$Props["onchange"] = undefined;

   let host: HTMLFormElement | null = null;
   let initial = "";

   export function getJSON(): string {
      if (!host) return "";
      const data: Record<string, unknown> = {};
      const controls = host.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea");
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
</script>

<form bind:this={host} class={$$restProps.class} style={$$restProps.style} on:submit|preventDefault on:input={oninput} on:change={onchange}>
   {#if structure && Obj}
      <ObjJConfig {structure} {controllers} bind:Obj {readonly} />
   {/if}
</form>

<style>
   form {
      display: contents;
   }
</style>
