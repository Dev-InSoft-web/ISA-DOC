/**
 * Indexa corpus web gubernamental en PGVector.
 * Uso: npm run lab:gov:index-rag
 */
import { importLab } from "../../_shared/ensure-lab-build.mts";

const append = process.argv.includes("--append");

const { preloadIsaDocSecrets } = await importLab<{ preloadIsaDocSecrets: () => void }>(
	"src/lib/core/secrets.js",
);
const { loadGovernmentWebDocuments } = await importLab<{
	loadGovernmentWebDocuments: () => Promise<{
		documents: unknown[];
		pages: number;
		chunks: number;
		skippedEmpty: number;
	}>;
}>("src/lib/rag/webChunks.js");
const { indexWebDocuments } = await importLab<{
	indexWebDocuments: (docs: unknown[]) => Promise<{ chunks: number; files: unknown[] }>;
}>("src/lib/rag/vectorstore.js");

preloadIsaDocSecrets();

const { documents, pages, chunks, skippedEmpty } = await loadGovernmentWebDocuments();
if (!documents.length) {
	console.error("Sin documentos. Ejecuta npm run lab:gov:fetch primero.");
	process.exit(1);
}

const result = await indexWebDocuments(documents);
console.log(
	JSON.stringify(
		{ ok: true, append, pages, chunks: result.chunks, segmentChunks: chunks, skippedEmpty, files: result.files.length },
		null,
		2,
	),
);
