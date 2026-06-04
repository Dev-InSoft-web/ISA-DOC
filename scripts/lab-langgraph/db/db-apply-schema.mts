/**
 * Aplica schema paty + extensiones en DATABASE_URL.
 * Uso: npm run lab:db:apply-schema
 */
import { importLab, LAB_REPO_ROOT } from "../_shared/ensure-lab-build.mts";
import { chdir } from "node:process";

chdir(LAB_REPO_ROOT);

const { preloadIsaDocSecrets } = await importLab<{ preloadIsaDocSecrets: () => void }>(
	"src/lib/core/secrets.js",
);
const { ensurePatyiaSchema } = await importLab<{ ensurePatyiaSchema: () => Promise<void> }>(
	"src/lib/patyia/db/ensureSchema.js",
);

preloadIsaDocSecrets();
await ensurePatyiaSchema();
console.log("Schema paty + extensiones aplicado en DATABASE_URL.");
