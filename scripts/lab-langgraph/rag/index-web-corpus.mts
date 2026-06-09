/**
 * Indexa corpus web gubernamental en PGVector.
 * Uso: npm run lab:gov:index-rag [-- --append] [-- --replace]
 */
import { LAB_REPO_ROOT } from "../_shared/isa-doc-root.ts";

process.env.LAB_LANGGRAPH_ROOT ??= LAB_REPO_ROOT;

import { importLab } from "../_shared/ensure-lab-build.mts";

const argv = process.argv.slice(2);
const replace = argv.includes("--replace");
const append = argv.includes("--append") || !replace;

const { preloadIsaDocSecrets } = await importLab<{ preloadIsaDocSecrets: () => void }>(
	"src/lib/core/secrets.js",
);
const { readIndexBatchOptionsFromEnv } = await importLab<{
	readIndexBatchOptionsFromEnv: () => {
		batchSize: number;
		batchDelayMs: number;
		mergeYoutubeSegments: boolean;
	};
}>("src/lib/rag/embedBatches.js");
const { loadGovernmentWebDocuments } = await importLab<{
	loadGovernmentWebDocuments: () => Promise<{
		documents: unknown[];
		pages: number;
		chunks: number;
		skippedEmpty: number;
	}>;
}>("src/lib/rag/webChunks.js");
const { clearVectorStore, indexWebDocuments, listIndexedSources } = await importLab<{
	clearVectorStore: () => Promise<void>;
	indexWebDocuments: (
		docs: unknown[],
		opts?: { skipSources?: Set<string>; onBatch?: (info: unknown) => void },
	) => Promise<{ chunks: number; files: unknown[]; skipped?: number }>;
	listIndexedSources: () => Promise<string[]>;
}>("src/lib/rag/vectorstore.js");

preloadIsaDocSecrets();
const batchOpts = readIndexBatchOptionsFromEnv();

const { documents, pages, chunks, skippedEmpty } = await loadGovernmentWebDocuments();
if (!documents.length) {
	console.error("Sin documentos. Ejecuta npm run lab:gov:fetch primero.");
	process.exit(1);
}

if (replace) await clearVectorStore();

const skipSources = append && !replace ? new Set(await listIndexedSources()) : new Set<string>();
if (skipSources.size) console.log(`Reanudando: ${skipSources.size} fuente(s) ya indexadas`);

console.log(
	`Indexando ${chunks} chunks (${pages} páginas) · lote=${batchOpts.batchSize} · pausa=${batchOpts.batchDelayMs}ms`,
);

const t0 = Date.now();
const result = await indexWebDocuments(documents, {
	skipSources,
	onBatch: ({ batch, batches, indexed, total }) => {
		const pct = total ? Math.round((indexed / total) * 100) : 0;
		console.log(`  lote ${batch}/${batches} · ${indexed}/${total} chunks (${pct}%)`);
	},
});
const sec = Math.round((Date.now() - t0) / 1000);

console.log(
	JSON.stringify(
		{
			ok: true,
			append,
			pages,
			chunks: result.chunks,
			segmentChunks: chunks,
			skippedEmpty,
			skippedIndexed: result.skipped ?? 0,
			files: result.files.length,
			seconds: sec,
		},
		null,
		2,
	),
);
