import { loadLabEnv } from "../_shared/load-lab-env.ts";
import { assertNoProviderKeysInEnv, labHealthCheck, labLanggraphBaseUrl } from "../_shared/lab-api-client.ts";

loadLabEnv();
assertNoProviderKeysInEnv();
const h = await labHealthCheck();
console.log(JSON.stringify({ url: labLanggraphBaseUrl(), ...h }, null, 2));
if (!h.ok) process.exit(1);
