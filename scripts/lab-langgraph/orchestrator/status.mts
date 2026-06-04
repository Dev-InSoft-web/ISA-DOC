import { loadLabEnv } from "../_shared/load-lab-env.ts";
import { orchestratorStatus } from "../_shared/lab-api-client.ts";

loadLabEnv();
const cap = process.argv.find((a) => a.startsWith("--capability="))?.slice(12);
const prov = process.argv.find((a) => a.startsWith("--provider="))?.slice(11);
const data = await orchestratorStatus(cap, prov);
console.log(JSON.stringify(data, null, 2));
