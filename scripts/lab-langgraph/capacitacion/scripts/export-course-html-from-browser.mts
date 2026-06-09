/**
 * Instrucciones para exportar HTML de un curso desde el navegador (sesión activa).
 *
 * Ejecute este script para ver el snippet de consola; luego guarde cada HTML en:
 *   lab-langgraph/data/vectorize/capacitacion-oculta/html-export/{ICURSO}.html
 *
 * Después:
 *   npm run lab:cap:fetch -- --html-dir=.../html-export CP40MOD610
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { CORPUS_BASE } from "../lib/corpus-paths.ts";

const HTML_EXPORT_DIR = join(CORPUS_BASE, "html-export");
const SNIPPET_PATH = join(CORPUS_BASE, "browser-export-snippet.js");

const SNIPPET = `// Pegar en consola de https://www.contapyme.com/capacitacion-virtual/#/{ICURSO}
(function () {
  const icurso = location.hash.replace(/^#\\//, "").trim();
  const html = document.querySelector(".div-Body.contenido, .contenido")?.innerHTML || "";
  const meta = {
    icurso,
    exportedAt: new Date().toISOString(),
    videoThumbs: [...html.matchAll(/img\\.youtube\\.com\\/vi\\/([A-Za-z0-9_-]{11})/g)].map((m) => m[1]),
  };
  const payload = JSON.stringify({ meta, html }, null, 2);
  console.log("Copie el JSON siguiente y guárdelo como html-export/" + icurso + ".json");
  copy(payload);
  return meta;
})();`;

async function main(): Promise<void> {
	await mkdir(HTML_EXPORT_DIR, { recursive: true });
	await writeFile(SNIPPET_PATH, `${SNIPPET}\n`, "utf8");
	console.log(`Directorio export: ${HTML_EXPORT_DIR}`);
	console.log(`Snippet guardado: ${SNIPPET_PATH}`);
	console.log(`
1. Abra un curso en capacitacion-virtual (sesión InSoft).
2. Ejecute el snippet en la consola del navegador.
3. Guarde el JSON como html-export/{ICURSO}.json o solo el campo html como {ICURSO}.html
4. Ejecute: npm run lab:cap:fetch -- --html-dir="${HTML_EXPORT_DIR}" ICURSO
`);
}

main().catch((e: unknown) => {
	console.error(e instanceof Error ? e.message : String(e));
	process.exit(1);
});
