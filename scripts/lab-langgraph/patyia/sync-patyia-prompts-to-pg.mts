/**
 * Prompts Ultra (ISA-DOC) → PostgreSQL paty.instruccion
 * Uso: npm run lab:patyia:sync-prompts
 */
import { importLab } from "../_shared/ensure-lab-build.mts";
import { LAB_REPO_ROOT } from "../_shared/isa-doc-root.ts";

process.env.LAB_LANGGRAPH_ROOT = LAB_REPO_ROOT;

const { preloadIsaDocSecrets } = await importLab<{ preloadIsaDocSecrets: () => void }>(
	"src/lib/core/secrets.js",
);
preloadIsaDocSecrets();

const { syncPatyiaPromptsFromIsaDoc } = await importLab<{
	syncPatyiaPromptsFromIsaDoc: (opts?: { log?: boolean }) => Promise<void>;
}>("src/lib/patyia/db/syncPromptsFromIsaDoc.js");

await syncPatyiaPromptsFromIsaDoc();
