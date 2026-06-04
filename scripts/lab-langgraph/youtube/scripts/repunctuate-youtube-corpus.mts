/**
 * Re-aplica puntuación/marcas sin LLM en un video.
 * Uso: npm run lab:yt:repunctuate -- <videoId> [--force]
 */
import { importLab } from "../../_shared/ensure-lab-build.mts";

const force = process.argv.includes("--force");
const videoId = process.argv.slice(2).find((a) => !a.startsWith("--"))?.trim();

if (!videoId) {
	console.error("Uso: npm run lab:yt:repunctuate -- <videoId> [--force]");
	process.exit(1);
}

const { applyPunctuationAndBrandsToVideo } = await importLab<{
	applyPunctuationAndBrandsToVideo: (o: {
		videoId: string;
		force?: boolean;
	}) => Promise<{ skipped?: boolean }>;
}>("src/lib/youtube/proofread/run.js");

const result = await applyPunctuationAndBrandsToVideo({ videoId, force });
console.log(JSON.stringify(result, null, 2));
