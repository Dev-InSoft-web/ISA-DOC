/**
 * Indexa segmentos YouTube ContaPyme en PGVector.
 * Uso: npm run lab:yt:index-rag [-- --append] [-- --replace] [-- --limit=1]
 */
import { LAB_REPO_ROOT } from "../_shared/isa-doc-root.ts";

process.env.LAB_LANGGRAPH_ROOT ??= LAB_REPO_ROOT;

import { importLab } from "../_shared/ensure-lab-build.mts";

function parseLimit(argv: string[]): number | null {
	const eq = argv.find((a) => a.startsWith("--limit="));
	if (eq) {
		const n = Number(eq.slice("--limit=".length));
		return Number.isFinite(n) && n > 0 ? n : null;
	}
	const i = argv.indexOf("--limit");
	if (i >= 0 && argv[i + 1]) {
		const n = Number(argv[i + 1]);
		return Number.isFinite(n) && n > 0 ? n : null;
	}
	return null;
}

function limitDocumentsBySource<T extends { metadata?: Record<string, unknown> }>(
	docs: T[],
	maxSources: number,
): T[] {
	const allowed = new Set<string>();
	const out: T[] = [];
	for (const doc of docs) {
		const src = String(doc.metadata?.source ?? doc.metadata?.videoId ?? "");
		if (!allowed.has(src)) {
			if (allowed.size >= maxSources) continue;
			allowed.add(src);
		}
		out.push(doc);
	}
	return out;
}

const argv = process.argv.slice(2);
const limit = parseLimit(argv);
const replace = argv.includes("--replace");
const append = argv.includes("--append") || (!replace && !limit);

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
const { loadYoutubeCorpusDocuments } = await importLab<{
	loadYoutubeCorpusDocuments: (dir: string) => Promise<{
		documents: unknown[];
		videos: number;
		segments: number;
		skippedNoSegments: number;
	}>;
}>("src/lib/rag/youtubeChunks.js");
const { clearVectorStore, indexYoutubeDocuments, listIndexedSources } = await importLab<{
	clearVectorStore: () => Promise<void>;
	indexYoutubeDocuments: (
		docs: unknown[],
		opts?: { skipSources?: Set<string>; onBatch?: (info: unknown) => void },
	) => Promise<{ chunks: number; files: unknown[]; skipped?: number }>;
	listIndexedSources: () => Promise<string[]>;
}>("src/lib/rag/vectorstore.js");

preloadIsaDocSecrets();
const batchOpts = readIndexBatchOptionsFromEnv();

const loaded = await loadYoutubeCorpusDocuments();
let { documents, videos, segments, skippedNoSegments } = loaded;
if (!documents.length) throw new Error("Sin segmentos. Genera corpus con lab:yt:transcripts.");

if (limit) {
	documents = limitDocumentsBySource(documents, limit);
	const sources = new Set(documents.map((d) => String((d as { metadata?: { source?: string } }).metadata?.source ?? "")));
	videos = sources.size;
	segments = documents.length;
	console.log(`Modo prueba: limit=${limit} fuente(s) · ${segments} segmentos`);
}

if (replace) await clearVectorStore();

const skipSources = append && !replace ? new Set(await listIndexedSources()) : new Set<string>();
if (skipSources.size) {
	console.log(`Reanudando: ${skipSources.size} fuente(s) ya indexadas (omitidas)`);
}

console.log(
	`Indexando ${segments} segmentos (${videos} videos) · lote=${batchOpts.batchSize} · pausa=${batchOpts.batchDelayMs}ms · merge=${batchOpts.mergeYoutubeSegments}`,
);
if (skippedNoSegments) console.log(`Omitidos sin segmentos: ${skippedNoSegments}`);

const t0 = Date.now();
const result = await indexYoutubeDocuments(documents, {
	skipSources,
	onBatch: ({ batch, batches, indexed, total }) => {
		const pct = total ? Math.round((indexed / total) * 100) : 0;
		console.log(`  lote ${batch}/${batches} · ${indexed}/${total} chunks (${pct}%)`);
	},
});
const sec = Math.round((Date.now() - t0) / 1000);
console.log(
	`OK: ${result.chunks} chunks en PGVector (${result.files.length} fuentes) · omitidos=${result.skipped ?? 0} · ${sec}s`,
);
