<script lang="ts">
   import { onMount } from "svelte";

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

   function loadMarked(): Promise<void> {
      return new Promise((resolve, reject) => {
         if ((window as any).marked) {
            markedReady = true;
            resolve();
            return;
         }
         const s = document.createElement("script");
         s.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
         s.onload = () => {
            markedReady = true;
            resolve();
         };
         s.onerror = () => reject(new Error("No se pudo cargar marked.js"));
         document.head.appendChild(s);
      });
   }

   async function loadSection(slug: string) {
      activeSlug = slug;
      html = "";
      try {
         const res = await fetch(`/docs/${project}/${slug}.md`, { cache: "no-cache" });
         if (!res.ok) throw new Error(`HTTP ${res.status}`);
         const md = await res.text();
         const marked = (window as any).marked;
         html = marked.parse(md, { mangle: false, headerIds: true });
      } catch (e: any) {
         html = `<p class="docs-error">Error cargando <code>${slug}.md</code>: ${e?.message ?? e}</p>`;
      }
   }

   onMount(async () => {
      try {
         const res = await fetch(`/docs/${project}/_index.json`, { cache: "no-cache" });
         if (!res.ok) throw new Error(`No se encontró _index.json (HTTP ${res.status})`);
         manifest = await res.json();
         await loadMarked();
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
