import { loadLabEnv } from "../_shared/load-lab-env.ts";
import { orchestratorSyncKeys } from "../_shared/lab-api-client.ts";

loadLabEnv();
const cap = process.argv.find((a) => a.startsWith("--capability="))?.slice(12);
const r = await orchestratorSyncKeys(cap);
console.log(`Slots sincronizados desde env: ${r.synced}`);
