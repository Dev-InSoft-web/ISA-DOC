<script lang="ts" context="module">
   /** Carga única de CodeMirror 6 + tema vscode-dark vía CDN ESM. */
   type CmModules = {
      EditorView: any;
      EditorState: any;
      basicSetup: any;
      html: any;
      vscodeDark: any;
   };

   let cmPromise: Promise<CmModules> | null = null;

   const CM_DEPS = [
      "@codemirror/state@6.4.1",
      "@codemirror/view@6.27.0",
      "@codemirror/language@6.10.2",
      "@codemirror/commands@6.6.0",
      "@codemirror/search@6.5.6",
      "@codemirror/autocomplete@6.16.0",
      "@codemirror/lint@6.7.0",
   ].join(",");

   export function loadCodeMirror(): Promise<CmModules> {
      if (cmPromise) return cmPromise;
      cmPromise = Promise.all([
         // @ts-ignore esm CDN url
         import(/* @vite-ignore */ `https://esm.sh/codemirror@6.0.1?deps=${CM_DEPS}`),
         // @ts-ignore esm CDN url
         import(/* @vite-ignore */ `https://esm.sh/@codemirror/state@6.4.1`),
         // @ts-ignore esm CDN url
         import(/* @vite-ignore */ `https://esm.sh/@codemirror/lang-html@6.4.9?deps=${CM_DEPS}`),
         // @ts-ignore esm CDN url
         import(/* @vite-ignore */ `https://esm.sh/@uiw/codemirror-theme-vscode@4.23.5?deps=${CM_DEPS}`),
      ]).then(([cmIndex, stateMod, langHtml, themeMod]) => ({
         EditorView: cmIndex.EditorView,
         EditorState: stateMod.EditorState,
         basicSetup: cmIndex.basicSetup,
         html: langHtml.html,
         vscodeDark: themeMod.vscodeDark,
      }));
      return cmPromise;
   }
</script>

<script lang="ts">
   import { onMount, onDestroy, tick } from "svelte";

   export let code: string = "";
   export let minHeight: string = "12rem";

   let container: HTMLDivElement | undefined;
   let view: any = null;
   let pendingCode: string | null = null;

   function formatMarkup(src: string, indentUnit = "   "): string {
      const tokens: string[] = [];
      let i = 0;
      while (i < src.length) {
         const ch = src[i];
         if (ch === "<") {
            let j = i + 1;
            let q: string | null = null;
            while (j < src.length) {
               const c = src[j];
               if (q) {
                  if (c === q) q = null;
               } else if (c === '"' || c === "'") {
                  q = c;
               } else if (c === ">") {
                  j++;
                  break;
               }
               j++;
            }
            tokens.push(src.slice(i, j));
            i = j;
         } else {
            let j = i;
            while (j < src.length && src[j] !== "<") j++;
            const text = src.slice(i, j).trim();
            if (text) tokens.push(text);
            i = j;
         }
      }
      const out: string[] = [];
      let depth = 0;
      for (const tok of tokens) {
         if (tok.startsWith("</")) {
            depth = Math.max(0, depth - 1);
            out.push(indentUnit.repeat(depth) + tok);
         } else if (tok.startsWith("<") && !tok.startsWith("<!")) {
            const selfClose = tok.endsWith("/>");
            out.push(indentUnit.repeat(depth) + tok);
            if (!selfClose) depth++;
         } else {
            out.push(indentUnit.repeat(depth) + tok);
         }
      }
      return out.join("\n");
   }

   $: formattedCode = formatMarkup(code ?? "");

   onMount(async () => {
      try {
         const mods = await loadCodeMirror();
         if (!container) return;
         const exts = [
            mods.basicSetup,
            mods.html(),
            mods.vscodeDark,
            mods.EditorView.editable.of(false),
            mods.EditorView.lineWrapping,
         ];
         view = new mods.EditorView({
            state: mods.EditorState.create({
               doc: pendingCode != null ? pendingCode : formattedCode,
               extensions: exts,
            }),
            parent: container,
         });
         pendingCode = null;
      } catch (e) {
         console.error("[CodeBlock] CodeMirror load failed:", e);
      }
   });

   onDestroy(() => {
      view?.destroy();
      view = null;
   });

   async function syncCode(next: string) {
      if (!view) {
         pendingCode = next;
         await tick();
         return;
      }
      const cur = view.state.doc.toString();
      if (cur === next) return;
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: next } });
   }

   $: syncCode(formattedCode);
</script>

<div bind:this={container} class="cm-host" style:min-height={minHeight}></div>

<style>
   .cm-host {
      width: 100%;
      box-sizing: border-box;
      font-family: ui-monospace, "JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace;
      font-size: 0.85rem;
      border-radius: 0.25rem;
      overflow: hidden;
   }

   :global(.cm-host .cm-editor) {
      height: 100%;
      min-height: inherit;
   }

   :global(.cm-host .cm-scroller) {
      overflow: auto;
   }
</style>
