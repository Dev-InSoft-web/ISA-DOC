/**
 * Proofread de un video (LangGraph / API :5500).
 * Uso: npm run lab:yt:proofread -- <videoId>
 *      npm run lab:yt:proofread:promote -- <videoId>
 */
import { importLab } from "../../_shared/ensure-lab-build.mts";

const args = process.argv.slice(2);
const promote = args.includes("--promote");
const force = args.includes("--force");
const apiMode = args[0] === "--api";
const apiBase = apiMode ? args[1]?.replace(/\/$/, "") : null;
const videoId = (apiMode ? args[2] : args.filter((a) => !a.startsWith("--"))[0])?.trim();

if (!videoId) {
	console.error("Uso: npm run lab:yt:proofread -- <videoId> | lab:yt:proofread:promote -- <id> | --api <base> <id>");
	process.exit(1);
}

async function viaHttp(base: string, id: string, isPromote: boolean): Promise<void> {
	const q = new URLSearchParams({ videoId: id });
	if (isPromote) q.set("promote", "true");
	const res = await fetch(`${base}/youtube/proofread?${q}`, { method: "POST" });
	const body = await res.json();
	console.log(JSON.stringify(body, null, 2));
	if (!res.ok) process.exit(1);
}

if (apiMode && apiBase) {
	await viaHttp(apiBase, videoId, promote);
	process.exit(0);
}

const { promoteProofreadTest, proofreadVideo } = await importLab<{
	promoteProofreadTest: (id: string) => Promise<void>;
	proofreadVideo: (o: { videoId: string; force?: boolean }) => Promise<{ ok: boolean }>;
}>("src/lib/youtube/proofread/run.js");

if (promote) {
	await promoteProofreadTest(videoId);
	console.log(`Promovido ${videoId}-test → ${videoId}`);
} else {
	const result = await proofreadVideo({ videoId, force });
	console.log(JSON.stringify(result, null, 2));
	if (!result.ok) process.exit(1);
}
