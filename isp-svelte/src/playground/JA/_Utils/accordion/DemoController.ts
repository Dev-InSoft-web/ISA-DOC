import type { TAttrItem, TTagOpts } from "../Utils";
import { buildTag } from "../Utils";

export type TBodyHelpers = {
   txt: (s: string) => string;
   pt: (s: string) => string;
   comm: (s: string) => string;
   punc: (s: string) => string;
   cl: (s: string) => string;
   str: (s: string | boolean) => string;
   prop: (s: string) => string;
   kw: (s: string) => string;
};

export type TFieldAttrSpec<V = unknown> = {
   attrName?: string;
   attrType?: TAttrItem["type"];
   attrDefault?: unknown;
   attrEmit?: (v: V) => unknown;
   attrOmit?: boolean;
};

export type TFieldPalette<TState, K extends keyof TState> = TFieldAttrSpec<TState[K]> & {
   kind: "palette";
   key: K;
   label: string;
   labelIcon?: string;
   options: ReadonlyArray<{ label: string; value: TState[K] }> | Record<string, TState[K]>;
   columns?: number | ((size: unknown) => number);
   accent?: "primary" | "semantic";
   layout?: "default" | "sideCross";
   getIcon?: (val: TState[K]) => string;
   name?: string;
};

export type TFieldSwitch<TState, K extends keyof TState> = TFieldAttrSpec<TState[K]> & {
   kind: "switch";
   key: K;
   label: string;
   labelIcon?: string;
};

export type TFieldSwitchGroup<TState> = {
   kind: "switch-group";
   key: string;
   label: string;
   labelIcon?: string;
   switches: ReadonlyArray<
      {
         [K in keyof TState]: {
            key: K;
            label: string;
         } & TFieldAttrSpec<TState[K]>;
      }[keyof TState]
   >;
};

export type TFieldSelectEnum<TState, K extends keyof TState> = TFieldAttrSpec<TState[K]> & {
   kind: "select-enum";
   key: K;
   label: string;
   labelIcon?: string;
   enumValue: Record<string, TState[K]>;
   required?: boolean;
};

export type TFieldColor<TState, K extends keyof TState> = TFieldAttrSpec<TState[K]> & {
   kind: "color";
   key: K;
   label: string;
   labelIcon?: string;
   columns?: number | ((size: unknown) => number);
};

export type TFieldText<TState, K extends keyof TState> = TFieldAttrSpec<TState[K]> & {
   kind: "text";
   key: K;
   label: string;
   labelIcon?: string;
   placeholder?: string;
   normalize?: (raw: string) => string;
};

export type TFieldNumber<TState, K extends keyof TState> = TFieldAttrSpec<TState[K]> & {
   kind: "number" | "range";
   key: K;
   label: string;
   labelIcon?: string;
   min?: number;
   max?: number;
   step?: number;
};

export type TFieldIconText<TState> = {
   kind: "icon-text";
   key: string;
   label: string;
   labelIcon?: string;
   iconKey: keyof TState;
   textKey: keyof TState;
   color?: string;
};

export type TFieldSelectEnumRow<TState> = {
   kind: "select-enum-row";
   key: string;
   label?: string;
   labelIcon?: string;
   selects: { [K in keyof TState]: TFieldSelectEnum<TState, K> }[keyof TState][];
};

export type TDemoField<TState> =
   | { [K in keyof TState]: TFieldPalette<TState, K> }[keyof TState]
   | { [K in keyof TState]: TFieldSwitch<TState, K> }[keyof TState]
   | TFieldSwitchGroup<TState>
   | { [K in keyof TState]: TFieldSelectEnum<TState, K> }[keyof TState]
   | { [K in keyof TState]: TFieldColor<TState, K> }[keyof TState]
   | { [K in keyof TState]: TFieldText<TState, K> }[keyof TState]
   | { [K in keyof TState]: TFieldNumber<TState, K> }[keyof TState]
   | TFieldSelectEnumRow<TState>
   | TFieldIconText<TState>;

export type TDemoDetails = Record<string, unknown>;

export abstract class DemoController<TProps extends object = object> {
   abstract componentName: string;

   /** Ruta relativa al workspace del archivo fuente del componente (p.ej. `src/lib/overlays/Modal.svelte`). */
   componentPath?: string;

   /** Factor de escala visual aplicado a `.preview-stage` cuando el componente se ve pequeño. */
   previewScale?: number;
   /** Estilo CSS adicional para `.preview-stage` (p.ej. `width: fit-content;`). */
   previewStyle?: string;

   abstract initialState(): TProps;

   abstract fields(): TDemoField<TProps>[];

   initialDetails(): TDemoDetails {
      return {};
   }

   detailFields(): TDemoField<TDemoDetails>[] {
      return [];
   }

   buildBody?(state: TProps, details: TDemoDetails, helpers: TBodyHelpers): string;

   tagOpts(_state: TProps, _details: TDemoDetails): TTagOpts {
      return {};
   }

   buildCode(state: TProps, details: TDemoDetails = {}, demoStyle: string = "", demoClass: string = ""): string {
      const attrs = [
         ...this.collectAttrs(state),
         ...this.extraAttrs(state, details),
         ...this.styleClassAttrs(demoStyle, demoClass),
      ];
      return buildTag(
         this.componentName,
         attrs,
         this.tagOpts(state, details),
         this.buildBody ? (h) => this.buildBody!(state, details, h) : undefined,
      );
   }

   protected extraAttrs(_state: TProps, _details: TDemoDetails): TAttrItem[] {
      return [];
   }

   reset(): { state: TProps; details: TDemoDetails } {
      return { state: this.initialState(), details: this.initialDetails() };
   }

   previewKey(
      state: TProps,
      details: TDemoDetails = {},
      demoStyle: string = "",
      demoClass: string = "",
      extras: ReadonlyArray<unknown> = [],
   ): string {
      const base = JSON.stringify(state);
      const dets = JSON.stringify(details);
      return [base, dets, demoStyle, demoClass, ...extras.map((e) => String(e ?? ""))].join("|");
   }

   protected styleClassAttrs(demoStyle: string, demoClass: string): TAttrItem[] {
      return [
         { name: "style", value: demoStyle || null, type: "str", default: null },
         { name: "class", value: demoClass || null, type: "str", default: null },
      ];
   }

   protected collectAttrs(state: TProps): TAttrItem[] {
      const attrs: TAttrItem[] = [];
      for (const f of this.fields()) this.collectFieldAttrs(state, f, attrs);
      return attrs;
   }

   private collectFieldAttrs(state: TProps, f: TDemoField<TProps>, attrs: TAttrItem[]): void {
      if (f.kind === "icon-text") return;
      if (f.kind === "select-enum-row") {
         for (const sub of f.selects) this.collectFieldAttrs(state, sub as TDemoField<TProps>, attrs);
         return;
      }
      if (f.kind === "switch-group") {
         for (const sw of f.switches) {
            if (sw.attrOmit) continue;
            const raw = (state as Record<string, unknown>)[sw.key as string];
            const emit = sw.attrEmit as ((v: unknown) => unknown) | undefined;
            const value = emit ? emit(raw) : raw;
            attrs.push({ name: sw.attrName ?? String(sw.key), value, type: sw.attrType ?? "bool", default: sw.attrDefault });
         }
         return;
      }
      if (f.attrOmit) return;
      const raw = (state as Record<string, unknown>)[f.key as string];
      const emit = f.attrEmit as ((v: unknown) => unknown) | undefined;
      const value = emit ? emit(raw) : raw;
      attrs.push({ name: f.attrName ?? String(f.key), value, type: f.attrType, default: f.attrDefault });
   }
}
