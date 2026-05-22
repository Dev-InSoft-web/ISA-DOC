<script context="module" lang="ts">
   import { BtnRef } from "@ingenieria_insoft/ispsveltecomponents";
   import type { ICtxBtnRef } from "@ingenieria_insoft/ispsveltecomponents";
   import type { TFiltroLista, TListaPaginacion, TObject } from "@ingenieria_insoft/ispgen";
   import { TArray } from "@ingenieria_insoft/ispgen";

   type ListaFn<T extends TObject> = (filtro: TFiltroLista<T>) => Promise<TListaPaginacion<T>>;
   type Wrapped<T extends TObject> = ICtxBtnRef<T> & { __btnref2?: { ref: { current: string } } };

   function isPkLookupFiltro(filtro: unknown, lastPk: string): boolean {
      const sql = (filtro as { filtro?: { sql?: string } } | undefined)?.filtro?.sql;
      return !!lastPk && !!sql && new RegExp(`(^|\\W)${lastPk}\\s*=\\s*'`, "i").test(sql);
   }

   function wrapController<T extends TObject>(source: ICtxBtnRef<T>, ref: { current: string }): void {
      const existing = source as Wrapped<T>;
      if (existing.__btnref2) { existing.__btnref2.ref = ref; return; }
      const lastPkOf = (): string => String((source.PrimaryKeys as Array<keyof T>).at(-1) ?? "");
      const originalLista = source.Lista.bind(source) as ListaFn<T>;
      const wrappedLista: ListaFn<T> = async (filtro) => {
         const result = await originalLista(filtro);
         const cur = String(ref.current ?? "").trim();
         const lastPk = lastPkOf();
         if (!cur || !lastPk || isPkLookupFiltro(filtro, lastPk)) return result;
         const filtered = result.datos.filter((item) => String((item as Record<string, unknown>)?.[lastPk] ?? "") !== cur);
         if (filtered.length === result.datos.length) return result;
         const datos = new TArray<T>(filtered);

         return { ...result, datos, totalregistros: datos.length, qregistros: datos.length };
      };
      (source as { Lista: ListaFn<T> }).Lista = wrappedLista;
      existing.__btnref2 = { ref };
   }
</script>

<script lang="ts" generics="T extends TObject">
   export let value: string | number = "";
   export let Controller: ICtxBtnRef<T>;

   const currentRef = { current: "" };
   $: currentRef.current = String(value ?? "");
   $: if (Controller) wrapController<T>(Controller, currentRef);
</script>

<BtnRef {...$$restProps} {Controller} bind:value />
