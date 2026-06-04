/**
 * Prompts Ultra (ISA-DOC) → PostgreSQL paty.instruccion
 * Uso: npm run lab:patyia:sync-prompts
 */
import { importLab } from "../../_shared/ensure-lab-build.mts";

const { preloadIsaDocSecrets } = await importLab<{ preloadIsaDocSecrets: () => void }>(
	"src/lib/secrets.js",
);
const { syncPatyiaPromptsFromIsaDoc } = await importLab<{
	syncPatyiaPromptsFromIsaDoc: (opts?: { log?: boolean }) => Promise<void>;
}>("src/lib/patyia/db/syncPromptsFromIsaDoc.js");

preloadIsaDocSecrets();
await syncPatyiaPromptsFromIsaDoc();
