/**
 * Indexa segmentos YouTube ContaPyme en PGVector.
 * Uso: npm run lab:yt:index-rag [-- --append]
 */
import { importLab } from "../../_shared/ensure-lab-build.mts";

const replace = !process.argv.includes("--append");

const { preloadIsaDocSecrets } = await importLab<{ preloadIsaDocSecrets: () => void }>(
	"src/lib/core/secrets.js",
);
const { loadYoutubeCorpusDocuments } = await importLab<{
	loadYoutubeCorpusDocuments: (dir: string) => Promise<{
		documents: unknown[];
		videos: number;
		segments: number;
		skippedNoSegments: number;
	}>;
}>("src/lib/rag/youtubeChunks.js");
const { clearVectorStore, indexYoutubeDocuments } = await importLab<{
	clearVectorStore: () => Promise<void>;
	indexYoutubeDocuments: (docs: unknown[]) => Promise<{ chunks: number; files: unknown[] }>;
}>("src/lib/rag/vectorstore.js");

preloadIsaDocSecrets();

const { documents, videos, segments, skippedNoSegments } = await loadYoutubeCorpusDocuments();
if (!documents.length) throw new Error("Sin segmentos. Genera corpus con lab:yt:transcripts.");

if (replace) await clearVectorStore();

console.log(`Indexando ${segments} segmentos (${videos} videos)…`);
if (skippedNoSegments) console.log(`Omitidos sin segmentos: ${skippedNoSegments}`);
const result = await indexYoutubeDocuments(documents);
console.log(`OK: ${result.chunks} chunks en PGVector (${result.files.length} fuentes)`);
