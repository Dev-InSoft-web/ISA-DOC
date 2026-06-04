/**
 * Proofread de un video vía lab-langgraph API.
 * Uso: npm run lab:yt:proofread -- <videoId>
 */
import { resolve } from "node:path";
import { loadLabEnv } from "../../_shared/load-lab-env.ts";
import { labLanggraphBaseUrl, proofreadVideoViaLab } from "../../_shared/lab-api-client.ts";
import { resolveVideoArtifacts } from "../lib/corpus-paths.ts";

loadLabEnv();

const args = process.argv.slice(2);
const promote = args.includes("--promote");
const force = args.includes("--force");
const videoId = args.filter((a) => !a.startsWith("--"))[0]?.trim();

if (!videoId) {
	console.error("Uso: npm run lab:yt:proofread -- <videoId>");
	process.exit(1);
}

if (promote) {
	const result = await proofreadVideoViaLab({ videoId, promote: true });
	console.log(JSON.stringify(result, null, 2));
	process.exit(result.ok ? 0 : 1);
}

let corpusJsonPath: string | undefined;
try {
	const { json } = await resolveVideoArtifacts(videoId);
	corpusJsonPath = resolve(json);
} catch {
	/* el servidor resuelve por videoId */
}

const result = await proofreadVideoViaLab({ videoId, force, corpusJsonPath });
console.log(JSON.stringify(result, null, 2));
console.log(`Lab: ${labLanggraphBaseUrl()}`);
if (!result.ok) process.exit(1);
