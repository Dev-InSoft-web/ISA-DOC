/**
 * Aplica schema paty + extensiones en DATABASE_URL.
 * Uso: npm run lab:db:apply-schema
 */
import { importLab } from "../../_shared/ensure-lab-build.mts";

const { preloadIsaDocSecrets } = await importLab<{ preloadIsaDocSecrets: () => void }>(
	"src/lib/secrets.js",
);
const { ensurePatyiaSchema } = await importLab<{ ensurePatyiaSchema: () => Promise<void> }>(
	"src/lib/patyia/db/ensureSchema.js",
);

preloadIsaDocSecrets();
await ensurePatyiaSchema();
console.log("Schema paty + extensiones aplicado en DATABASE_URL.");
