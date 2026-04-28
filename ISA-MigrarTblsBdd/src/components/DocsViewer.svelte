<script lang="ts">
   import { onMount, tick } from "svelte";

   export let project: string = "contapymeu";

   type Section = { slug: string; title: string; icon?: string };
   type Manifest = {
      project: string;
      title: string;
      description?: string;
      sections: Section[];
   };

   let manifest: Manifest | null = null;
   let activeSlug = "";
   let html = "";
   let loading = true;
   let error = "";
   let markedReady = false;
   let mermaidReady = false;
   let mermaidCounter = 0;
   let codeMirrorReady = false;
   const cmModesLoaded = new Set<string>();

   function loadScript(src: string): Promise<void> {
      return new Promise((resolve, reject) => {
         const s = document.createElement("script");
         s.src = src;
         s.onload = () => resolve();
         s.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
         document.head.appendChild(s);
      });
   }

   function loadStyle(href: string): void {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = href;
      document.head.appendChild(l);
   }

   async function loadMarked(): Promise<void> {
      if ((window as any).marked) {
         markedReady = true;
         return;
      }
      await loadScript("https://cdn.jsdelivr.net/npm/marked/marked.min.js");
      markedReady = true;
   }

   async function loadMermaid(): Promise<void> {
      if ((window as any).mermaid) {
         mermaidReady = true;
         return;
      }
      try {
         await loadScript("https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js");
         (window as any).mermaid.initialize({
            startOnLoad: false,
            theme: "dark",
            themeVariables: {
               background: "#0f1117",
               // Acento azul (dodgerblue para dark) en nodos y aristas.
               primaryColor: "#0b3a66",
               primaryBorderColor: "#3a8bff",
               primaryTextColor: "#dfe9f7",
               lineColor: "#3a8bff",
               secondaryColor: "#13243d",
               tertiaryColor: "#0b1626",
               nodeBorder: "#3a8bff",
               clusterBkg: "#0e1b2d",
               clusterBorder: "#1f4a7e",
               edgeLabelBackground: "#0e1b2d",
               textColor: "#dfe9f7",
               // Sequence / class / state extras
               actorBkg: "#0b3a66",
               actorBorder: "#3a8bff",
               actorTextColor: "#dfe9f7",
               labelBoxBkgColor: "#0e1b2d",
               labelBoxBorderColor: "#3a8bff",
               signalColor: "#3a8bff",
               signalTextColor: "#dfe9f7",
            },
            flowchart: { curve: "step", htmlLabels: true, useMaxWidth: true },
         });
         mermaidReady = true;
      } catch (e) {
         // Si Mermaid falla, mantén el bloque tal cual.
         mermaidReady = false;
      }
   }

   const CM_BASE = "https://cdn.jsdelivr.net/npm/codemirror@5.65.16";

   /** Mapea el `language-X` que produce marked al mode/mime de CodeMirror 5. */
   const LANG_TO_CM: Record<string, { mode: string; mime: string; label: string }> = {
      ts:         { mode: "javascript", mime: "application/typescript", label: "TypeScript" },
      tsx:        { mode: "javascript", mime: "application/typescript", label: "TypeScript" },
      typescript: { mode: "javascript", mime: "application/typescript", label: "TypeScript" },
      js:         { mode: "javascript", mime: "text/javascript",        label: "JavaScript" },
      jsx:        { mode: "javascript", mime: "text/javascript",        label: "JavaScript" },
      javascript: { mode: "javascript", mime: "text/javascript",        label: "JavaScript" },
      json:       { mode: "javascript", mime: "application/json",       label: "JSON" },
      sql:        { mode: "sql",        mime: "text/x-sql",             label: "SQL" },
      yaml:       { mode: "yaml",       mime: "text/x-yaml",            label: "YAML" },
      yml:        { mode: "yaml",       mime: "text/x-yaml",            label: "YAML" },
      bash:       { mode: "shell",      mime: "text/x-sh",              label: "Shell" },
      sh:         { mode: "shell",      mime: "text/x-sh",              label: "Shell" },
      shell:      { mode: "shell",      mime: "text/x-sh",              label: "Shell" },
      powershell: { mode: "powershell", mime: "application/x-powershell", label: "PowerShell" },
      html:       { mode: "xml",        mime: "text/html",              label: "HTML" },
      xml:        { mode: "xml",        mime: "application/xml",        label: "XML" },
   };

   async function loadCodeMirror(): Promise<void> {
      if ((window as any).CodeMirror) {
         codeMirrorReady = true;
         return;
      }
      try {
         loadStyle(`${CM_BASE}/lib/codemirror.min.css`);
         loadStyle(`${CM_BASE}/theme/dracula.min.css`);
         await loadScript(`${CM_BASE}/lib/codemirror.min.js`);
         codeMirrorReady = true;
      } catch (e) {
         codeMirrorReady = false;
      }
   }

   async function loadCmMode(mode: string): Promise<void> {
      if (!mode || cmModesLoaded.has(mode)) return;
      try {
         await loadScript(`${CM_BASE}/mode/${mode}/${mode}.min.js`);
         cmModesLoaded.add(mode);
      } catch {
         // si el modo no existe, CodeMirror se degrada a texto plano
      }
   }

   /**
    * Reemplaza cada <pre><code class="language-X"> (excepto mermaid) por una
    * instancia read-only de CodeMirror con tema oscuro propio (cm-s-isadocs).
    * Añade una etiqueta superior con el lenguaje.
    */
   async function renderCodeBlocks(container: HTMLElement) {
      if (!codeMirrorReady || !(window as any).CodeMirror) return;
      const blocks = Array.from(container.querySelectorAll("pre > code")).filter((c) => {
         const cls = (c as HTMLElement).className || "";
         return !cls.includes("language-mermaid");
      }) as HTMLElement[];
      if (!blocks.length) return;

      const CM = (window as any).CodeMirror;
      // pre-cargar modes únicos
      const uniqueModes = new Set<string>();
      const items: Array<{ codeEl: HTMLElement; lang: string; cfg?: { mode: string; mime: string; label: string } }> = [];
      for (const codeEl of blocks) {
         const cls = codeEl.className || "";
         const m = cls.match(/language-([\w-]+)/);
         const lang = (m?.[1] ?? "").toLowerCase();
         const cfg = LANG_TO_CM[lang];
         if (cfg) uniqueModes.add(cfg.mode);
         items.push({ codeEl, lang, cfg });
      }
      await Promise.all([...uniqueModes].map((mo) => loadCmMode(mo)));

      for (const { codeEl, lang, cfg } of items) {
         const pre = codeEl.parentElement!;
         const text = codeEl.textContent ?? "";
         const wrapper = document.createElement("div");
         wrapper.className = "is-codeblock";
         if (lang) {
            const tag = document.createElement("div");
            tag.className = "is-codeblock-tag";
            tag.textContent = cfg?.label ?? lang.toUpperCase();
            wrapper.appendChild(tag);
         }
         const host = document.createElement("div");
         host.className = "is-codeblock-host";
         wrapper.appendChild(host);
         pre.replaceWith(wrapper);

         CM(host, {
            value: text.replace(/\n$/, ""),
            mode: cfg?.mime ?? "text/plain",
            theme: "dracula",
            lineNumbers: true,
            readOnly: "nocursor",
            viewportMargin: Infinity,
            lineWrapping: false,
            tabSize: 2,
            indentUnit: 2,
         });
      }
   }

   /**
    * marked entrega ```mermaid``` como <pre><code class="language-mermaid">...</code></pre>.
    * Tras inyectar el HTML, transformamos cada bloque en un <div class="mermaid"> y llamamos a mermaid.run().
    */
   async function renderMermaidBlocks(container: HTMLElement) {
      if (!mermaidReady || !(window as any).mermaid) return;
      const blocks = container.querySelectorAll("pre > code.language-mermaid");
      if (!blocks.length) return;

      const nodes: HTMLElement[] = [];
      blocks.forEach((codeEl) => {
         const pre = codeEl.parentElement!;
         const div = document.createElement("div");
         div.className = "mermaid";
         div.id = `mmd-${++mermaidCounter}`;
         div.textContent = codeEl.textContent ?? "";
         pre.replaceWith(div);
         nodes.push(div);
      });

      try {
         await (window as any).mermaid.run({ nodes });
      } catch (e) {
         // ignorar errores individuales de sintaxis
      }
   }

   /**
    * Pre-procesa el markdown reemplazando cada
    *   <!-- img path="..." [crop="x,y,w,h"] [alt="..."] [width="N"] -->
    * por un <img> normal o, si trae crop, un <canvas data-img-crop>
    * que tras renderizar el HTML dibuja sólo el rectángulo solicitado.
    */
   function expandImageCrops(md: string): string {
      const re = /<!--\s*img\s+([^>]+?)\s*-->/g;
      const attrRe = /(\w+)\s*=\s*"([^"]*)"/g;
      return md.replace(re, (_full, body: string) => {
         const attrs: Record<string, string> = {};
         for (const a of body.matchAll(attrRe)) attrs[a[1]] = a[2];
         const path = attrs.path;
         if (!path) return `> ⚠ \`<!-- img -->\` sin \`path\``;
         const src = path.startsWith("/") ? path : `/${path}`;
         const alt = (attrs.alt ?? "").replace(/"/g, "&quot;");
         if (attrs.crop) {
            const w = attrs.width ? `data-w="${attrs.width}"` : "";
            return `<canvas class="is-imgcrop" data-src="${src}" data-crop="${attrs.crop}" ${w} aria-label="${alt}"></canvas>`;
         }
         return `<img src="${src}" alt="${alt}" />`;
      });
   }

   /** Para cada <canvas data-src + data-crop>, carga la imagen y dibuja sólo el rect. */
   async function renderImageCrops(container: HTMLElement) {
      const list = Array.from(container.querySelectorAll<HTMLCanvasElement>("canvas.is-imgcrop"));
      for (const cv of list) {
         const src = cv.dataset.src ?? "";
         const crop = (cv.dataset.crop ?? "").split(",").map((n) => parseFloat(n.trim()));
         if (!src || crop.length !== 4 || crop.some((n) => Number.isNaN(n))) continue;
         const [sx, sy, sw, sh] = crop;
         await new Promise<void>((res) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
               const targetW = parseFloat(cv.dataset.w ?? "") || sw;
               const scale = targetW / sw;
               cv.width = Math.round(sw * scale);
               cv.height = Math.round(sh * scale);
               const ctx = cv.getContext("2d");
               if (ctx) ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cv.width, cv.height);
               res();
            };
            img.onerror = () => res();
            img.src = src;
         });
      }
   }

   /**
    * Pre-procesa el markdown reemplazando cada
    *   <!-- src path="..." [lang="..."] [from="..."] [to="..."] [symbol="..."] [start="N"] [end="N"] -->
    * por un bloque ```lang … ``` con el contenido leído en tiempo real
    * desde `/api/source`. Si el endpoint falla, deja un aviso visible.
    *
    * Nota: el regex no permite `-->` dentro de los atributos.
    */
   async function expandSourceIncludes(md: string): Promise<string> {
      const re = /<!--\s*src\s+([^>]+?)\s*-->/g;
      const matches = [...md.matchAll(re)];
      if (!matches.length) return md;

      const attrRe = /(\w+)\s*=\s*"([^"]*)"/g;
      const replacements = await Promise.all(matches.map(async (m) => {
         const attrs: Record<string, string> = {};
         for (const a of m[1].matchAll(attrRe)) attrs[a[1]] = a[2];
         const path = attrs.path;
         if (!path) return { match: m[0], replacement: `> ⚠ include sin \`path\`: \`${m[0]}\`` };
         const params = new URLSearchParams({ path });
         for (const k of ["from", "to", "symbol", "start", "end"]) {
            if (attrs[k]) params.set(k, attrs[k]);
         }
         const lang = attrs.lang || guessLangFromPath(path);
         try {
            const res = await fetch(`/api/source?${params.toString()}`, { cache: "no-cache" });
            const txt = await res.text();
            if (!res.ok) {
               return { match: m[0], replacement: `> ⚠ \`${path}\`: ${txt}` };
            }
            const fence = "```";
            const body = `${fence}${lang}\n${txt.replace(/```/g, "ʼʼʼ")}\n${fence}`;
            return { match: m[0], replacement: body };
         } catch (e: any) {
            return { match: m[0], replacement: `> ⚠ \`${path}\`: ${e?.message ?? e}` };
         }
      }));

      let out = md;
      for (const { match, replacement } of replacements) {
         out = out.replace(match, () => replacement);
      }
      return out;
   }

   function guessLangFromPath(p: string): string {
      const ext = p.split(".").pop()?.toLowerCase() ?? "";
      switch (ext) {
         case "ts": case "tsx": return "typescript";
         case "js": case "jsx": return "javascript";
         case "sql": return "sql";
         case "json": return "json";
         case "yaml": case "yml": return "yaml";
         case "ps1": return "powershell";
         case "sh": return "bash";
         default: return "";
      }
   }

   async function loadSection(slug: string) {
      activeSlug = slug;
      html = "";
      try {
         const res = await fetch(`/docs/${project}/${slug}.md`, { cache: "no-cache" });
         if (!res.ok) throw new Error(`HTTP ${res.status}`);
         let md = await res.text();
         md = expandImageCrops(md);
         md = await expandSourceIncludes(md);
         const marked = (window as any).marked;
         html = marked.parse(md, { mangle: false, headerIds: true });
         await tick();
         const container = document.querySelector(".docs-content");
         if (container) {
            // Mermaid PRIMERO (consume bloques `language-mermaid`), luego CodeMirror para el resto.
            await renderMermaidBlocks(container as HTMLElement);
            await renderCodeBlocks(container as HTMLElement);
            await renderImageCrops(container as HTMLElement);
         }
      } catch (e: any) {
         html = `<p class="docs-error">Error cargando <code>${slug}.md</code>: ${e?.message ?? e}</p>`;
      }
   }

   onMount(async () => {
      try {
         const res = await fetch(`/docs/${project}/_index.json`, { cache: "no-cache" });
         if (!res.ok) throw new Error(`No se encontró _index.json (HTTP ${res.status})`);
         manifest = await res.json();
         await Promise.all([loadMarked(), loadMermaid(), loadCodeMirror()]);
         if (manifest && manifest.sections.length > 0) {
            await loadSection(manifest.sections[0].slug);
         }
      } catch (e: any) {
         error = e?.message ?? String(e);
      } finally {
         loading = false;
      }
   });
</script>

{#if loading}
   <div class="docs-loading">Cargando documentación…</div>
{:else if error}
   <div class="docs-error">⚠ {error}</div>
{:else if manifest}
   <div class="docs-shell">
      <aside class="docs-side">
         <div class="docs-side-head">
            <h2 class="docs-title">{manifest.title}</h2>
            {#if manifest.description}
               <p class="docs-desc">{manifest.description}</p>
            {/if}
         </div>
         <nav class="docs-nav">
            {#each manifest.sections as s}
               <button
                  type="button"
                  class="docs-nav-item"
                  class:active={activeSlug === s.slug}
                  on:click={() => loadSection(s.slug)}
               >
                  <span class="docs-nav-num">{s.slug.split("-")[0]}</span>
                  <span class="docs-nav-text">{s.title}</span>
               </button>
            {/each}
         </nav>
      </aside>
      <article class="docs-content">
         {@html html}
      </article>
   </div>
{/if}

<style>
   .docs-loading,
   .docs-error {
      padding: 1.5rem;
      color: #888;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.85rem;
   }

   .docs-shell {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 1.25rem;
      align-items: start;
      min-height: calc(100vh - 100px);
   }

   .docs-side {
      position: sticky;
      top: 1rem;
      max-height: calc(100vh - 2rem);
      overflow-y: auto;
      background: #1a1a1a;
      border: 1px solid #2c2c2c;
      border-radius: 6px;
      padding: 1rem;
   }

   .docs-side-head {
      padding-bottom: 0.75rem;
      margin-bottom: 0.75rem;
      border-bottom: 1px solid #2c2c2c;
   }

   .docs-title {
      margin: 0 0 0.35rem 0;
      font-size: 0.95rem;
      color: #e0e0e0;
      font-weight: 600;
   }

   .docs-desc {
      margin: 0;
      font-size: 0.75rem;
      line-height: 1.4;
      color: #888;
   }

   .docs-nav {
      display: flex;
      flex-direction: column;
      gap: 2px;
   }

   .docs-nav-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.45rem 0.6rem;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 4px;
      color: #bbb;
      font-size: 0.8rem;
      text-align: left;
      cursor: pointer;
      transition: background 0.12s, color 0.12s, border-color 0.12s;
      font-family: inherit;
   }

   .docs-nav-item:hover {
      background: #232323;
      color: #e0e0e0;
   }

   .docs-nav-item.active {
      background: #2a2a2a;
      color: #f0f0f0;
      border-color: #3a3a3a;
   }

   .docs-nav-num {
      display: inline-block;
      min-width: 1.5em;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.7rem;
      color: #666;
   }

   .docs-nav-item.active .docs-nav-num {
      color: #999;
   }

   .docs-content {
      background: #161616;
      border: 1px solid #262626;
      border-radius: 6px;
      padding: 2rem 2.25rem;
      color: #d4d4d4;
      font-size: 0.92rem;
      line-height: 1.65;
      overflow-x: auto;
   }

   /* Markdown rendered styles (grayscale only) */
   :global(.docs-content h1) {
      font-size: 1.7rem;
      color: #f0f0f0;
      margin: 0 0 1rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #2c2c2c;
      font-weight: 600;
   }
   :global(.docs-content h2) {
      font-size: 1.25rem;
      color: #e8e8e8;
      margin: 2rem 0 0.75rem 0;
      padding-bottom: 0.35rem;
      border-bottom: 1px solid #232323;
      font-weight: 600;
   }
   :global(.docs-content h3) {
      font-size: 1.05rem;
      color: #dcdcdc;
      margin: 1.5rem 0 0.5rem 0;
      font-weight: 600;
   }
   :global(.docs-content h4) {
      font-size: 0.95rem;
      color: #cfcfcf;
      margin: 1.25rem 0 0.35rem 0;
      font-weight: 600;
   }
   :global(.docs-content p) {
      margin: 0.6rem 0;
   }
   :global(.docs-content a) {
      color: #cfcfcf;
      text-decoration: underline;
      text-decoration-color: #555;
   }
   :global(.docs-content a:hover) {
      color: #ffffff;
      text-decoration-color: #999;
   }
   :global(.docs-content ul),
   :global(.docs-content ol) {
      padding-left: 1.4rem;
      margin: 0.5rem 0;
   }
   :global(.docs-content li) {
      margin: 0.2rem 0;
   }
   :global(.docs-content code) {
      background: #1f1f1f;
      border: 1px solid #2a2a2a;
      border-radius: 3px;
      padding: 0.05rem 0.35rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.85em;
      color: #e0e0e0;
   }
   :global(.docs-content pre) {
      background: #0f0f0f;
      border: 1px solid #262626;
      border-radius: 5px;
      padding: 0.85rem 1rem;
      overflow-x: auto;
      font-size: 0.82rem;
      line-height: 1.55;
      margin: 0.75rem 0;
   }
   :global(.docs-content pre code) {
      background: transparent;
      border: 0;
      padding: 0;
      color: #d4d4d4;
   }
   :global(.docs-content blockquote) {
      margin: 0.75rem 0;
      padding: 0.4rem 0.9rem;
      border-left: 3px solid #444;
      background: #1a1a1a;
      color: #b8b8b8;
      font-style: italic;
   }
   :global(.docs-content table) {
      border-collapse: collapse;
      width: 100%;
      margin: 0.75rem 0;
      font-size: 0.85rem;
   }
   :global(.docs-content th),
   :global(.docs-content td) {
      border: 1px solid #2a2a2a;
      padding: 0.4rem 0.65rem;
      text-align: left;
      vertical-align: top;
   }
   :global(.docs-content th) {
      background: #1c1c1c;
      color: #e0e0e0;
      font-weight: 600;
   }
   :global(.docs-content tr:nth-child(even) td) {
      background: #161616;
   }
   :global(.docs-content tr:nth-child(odd) td) {
      background: #1a1a1a;
   }
   :global(.docs-content hr) {
      border: 0;
      border-top: 1px solid #2a2a2a;
      margin: 1.5rem 0;
   }
   :global(.docs-content img) {
      max-width: 100%;
      border-radius: 4px;
      border: 1px solid #2a2a2a;
      /* Filtro solicitado: invertir color, rotar tono 180° e incrementar saturación. */
      filter: invert(1) hue-rotate(180deg) saturate(1.5);
   }
   /* Imagen recortada server-side: el filtro ya viene aplicado por el endpoint. */
   :global(.docs-content img.is-imgcrop) { filter: none; }
   :global(.docs-content canvas.is-imgcrop) {
      display: block;
      max-width: 100%;
      margin: 0.6rem auto;
      border: 1px solid #2a2a2a;
      border-radius: 4px;
      filter: invert(1) hue-rotate(180deg) saturate(1.5);
   }
   :global(.docs-content .mermaid) {
      background: #141414;
      border: 1px solid #2a2a2a;
      border-radius: 6px;
      padding: 1rem;
      margin: 0.9rem 0;
      text-align: center;
      overflow-x: auto;
   }
   :global(.docs-content .mermaid svg) {
      max-width: 100%;
      height: auto;
   }

   /* ------------------------------------------------------------- */
   /* CodeMirror — bloque y tema oscuro grayscale (cm-s-isadocs)    */
   /* ------------------------------------------------------------- */
   :global(.docs-content .is-codeblock) {
      margin: 0.85rem 0;
      border: 1px solid #262626;
      border-radius: 6px;
      background: #0f0f0f;
      overflow: hidden;
   }
   :global(.docs-content .is-codeblock-tag) {
      display: inline-block;
      padding: 0.15rem 0.55rem;
      background: #1c1c1c;
      border-bottom: 1px solid #262626;
      border-right: 1px solid #262626;
      border-bottom-right-radius: 4px;
      color: #9a9a9a;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.7rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
   }
   :global(.docs-content .is-codeblock-host) {
      font-size: 0.82rem;
      line-height: 1.55;
   }
   :global(.docs-content .CodeMirror.cm-s-isadocs) {
      height: auto;
      background: #0f0f0f;
      color: #d4d4d4;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
   }
   :global(.docs-content .cm-s-isadocs .CodeMirror-gutters) {
      background: #131313;
      border-right: 1px solid #1f1f1f;
   }
   :global(.docs-content .cm-s-isadocs .CodeMirror-linenumber) {
      color: #555;
      padding: 0 0.5rem 0 0.35rem;
      font-size: 0.72rem;
   }
   :global(.docs-content .cm-s-isadocs .CodeMirror-cursor) { display: none; }
   :global(.docs-content .cm-s-isadocs .CodeMirror-selected) { background: #2a2a2a !important; }
   :global(.docs-content .cm-s-isadocs .CodeMirror-line) {
      color: #d4d4d4;
   }
   :global(.docs-content .cm-s-isadocs .cm-comment)   { color: #6a6a6a; font-style: italic; }
   :global(.docs-content .cm-s-isadocs .cm-keyword)   { color: #e8e8e8; font-weight: 600; }
   :global(.docs-content .cm-s-isadocs .cm-atom)      { color: #d0d0d0; }
   :global(.docs-content .cm-s-isadocs .cm-number)    { color: #b8b8b8; }
   :global(.docs-content .cm-s-isadocs .cm-def)       { color: #f0f0f0; }
   :global(.docs-content .cm-s-isadocs .cm-variable)  { color: #c8c8c8; }
   :global(.docs-content .cm-s-isadocs .cm-variable-2){ color: #b0b0b0; }
   :global(.docs-content .cm-s-isadocs .cm-variable-3){ color: #a8a8a8; }
   :global(.docs-content .cm-s-isadocs .cm-property)  { color: #cccccc; }
   :global(.docs-content .cm-s-isadocs .cm-operator)  { color: #d4d4d4; }
   :global(.docs-content .cm-s-isadocs .cm-string)    { color: #a3a3a3; }
   :global(.docs-content .cm-s-isadocs .cm-string-2)  { color: #999; }
   :global(.docs-content .cm-s-isadocs .cm-meta)      { color: #888; }
   :global(.docs-content .cm-s-isadocs .cm-builtin)   { color: #e0e0e0; }
   :global(.docs-content .cm-s-isadocs .cm-tag)       { color: #d8d8d8; }
   :global(.docs-content .cm-s-isadocs .cm-attribute) { color: #b8b8b8; }
   :global(.docs-content .cm-s-isadocs .cm-type)      { color: #e0e0e0; }
   :global(.docs-content .cm-s-isadocs .cm-qualifier) { color: #c0c0c0; }
   :global(.docs-content .cm-s-isadocs .cm-bracket)   { color: #888; }
   :global(.docs-content .cm-s-isadocs .cm-error)     { color: #c66; }
   :global(.docs-content .cm-s-isadocs .CodeMirror-matchingbracket) {
      color: #fff !important;
      outline: 1px solid #555;
   }

   @media (max-width: 900px) {
      .docs-shell {
         grid-template-columns: 1fr;
      }
      .docs-side {
         position: static;
         max-height: none;
      }
   }
</style>
