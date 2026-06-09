/**
 * Descarga y convierte documentos de CAPAC_ATRIBUTOS_PLANES → MD + ImgBB (RAG).
 */
import { existsSync } from "node:fs";
import { config as loadDotenv } from "dotenv";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ISA_DOC_ROOT } from "../../_shared/isa-doc-root.ts";
import { loadLabEnv } from "../../_shared/load-lab-env.ts";
import {
	ATRIBUTOS_PLANES_SNAPSHOT_PATH,
	PLANES_BASE,
	PLANES_LINKS_DIR,
	PLANES_MANIFEST_PATH,
	PLANES_PAGES_DIR,
	PLANES_RAW_DIR,
} from "../lib/corpus-paths.ts";
import { convertDocFile } from "../lib/doc-convert.ts";
import { loadUniqueDocUrls } from "../lib/normalize-doc-url.ts";
import {
	docIdFromUrl,
	inferExt,
	resolvePlanesStorage,
	titleFromDocUrl,
} from "../lib/planes-paths.ts";
import type { PlanesDocRecord, PlanesLinkRecord, PlanesManifest } from "../lib/planes-types.ts";
import { PLANES_SCHEMA_VERSION } from "../lib/planes-types.ts";

for (const envPath of [join(ISA_DOC_ROOT, ".env"), join(ISA_DOC_ROOT, "secrets/patyia/lab-client.env")]) {
	if (existsSync(envPath)) loadDotenv({ path: envPath });
}
if (!process.env.IMGBB_API_KEY?.trim()) {
	process.env.IMGBB_API_KEY = "bd446e4f6fb2260ac3111574c4e7412e";
}
loadLabEnv();

const USER_AGENT =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36";

interface CliOptions {
	importPath: string;
	limit: number;
	delayMs: number;
	resume: boolean;
	dryRun: boolean;
	noUpload: boolean;
}

function parseCli(argv: string[]): CliOptions {
	const opts: CliOptions = {
		importPath: ATRIBUTOS_PLANES_SNAPSHOT_PATH,
		limit: 0,
		delayMs: 800,
		resume: true,
		dryRun: false,
		noUpload: false,
	};
	for (let i = 0; i < argv.length; i += 1) {
		const a = argv[i]!;
		if (a === "--import") opts.importPath = argv[++i] ?? opts.importPath;
		else if (a.startsWith("--import=")) opts.importPath = a.slice("--import=".length);
		else if (a === "--limit") opts.limit = Number(argv[++i] ?? 0);
		else if (a.startsWith("--limit=")) opts.limit = Number(a.slice("--limit=".length));
		else if (a === "--delay") opts.delayMs = Number(argv[++i] ?? opts.delayMs);
		else if (a.startsWith("--delay=")) opts.delayMs = Number(a.slice("--delay=".length));
		else if (a === "--no-resume") opts.resume = false;
		else if (a === "--dry-run") opts.dryRun = true;
		else if (a === "--no-upload") opts.noUpload = true;
	}
	return opts;
}

function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}

function linkPath(docId: string): string {
	return join(PLANES_LINKS_DIR, `${docId}.json`);
}

async function loadLink(docId: string): Promise<PlanesLinkRecord | null> {
	try {
		return JSON.parse(await readFile(linkPath(docId), "utf8")) as PlanesLinkRecord;
	} catch {
		return null;
	}
}

async function saveLink(link: PlanesLinkRecord): Promise<void> {
	await mkdir(PLANES_LINKS_DIR, { recursive: true });
	await writeFile(linkPath(link.docId), `${JSON.stringify(link, null, 2)}\n`, "utf8");
}

async function loadDoneIds(): Promise<Set<string>> {
	const done = new Set<string>();
	try {
		for (const f of await readdir(PLANES_LINKS_DIR)) {
			if (!f.endsWith(".json")) continue;
			const rec = JSON.parse(await readFile(join(PLANES_LINKS_DIR, f), "utf8")) as PlanesLinkRecord;
			if (rec.status === "fetched" || rec.status === "skipped" || rec.status === "unsupported") {
				done.add(rec.docId);
			}
		}
	} catch {
		/* */
	}
	return done;
}

async function fetchDoc(url: string): Promise<{ body: Buffer; contentType: string }> {
	const ext = inferExt(url);
	const timeoutMs = ["zip", "rar"].includes(ext) ? 600_000 : 240_000;
	const res = await fetch(url, {
		headers: { "User-Agent": USER_AGENT, Accept: "*/*" },
		redirect: "follow",
		signal: AbortSignal.timeout(timeoutMs),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const contentType = res.headers.get("content-type") ?? "";
	return { body: Buffer.from(await res.arrayBuffer()), contentType };
}

async function processUrl(
	url: string,
	opts: CliOptions,
	stats: PlanesManifest["stats"],
): Promise<void> {
	const docId = docIdFromUrl(url);
	const storage = resolvePlanesStorage(url, docId);
	const prev = await loadLink(docId);

	if (opts.resume && prev && (prev.status === "fetched" || prev.status === "skipped" || prev.status === "unsupported")) {
		stats.skipped += 1;
		console.log(`[planes] ${docId} SKIP (${prev.status})`);
		return;
	}

	if (opts.dryRun) {
		console.log(`[planes] ${docId} DRY-RUN ${url.slice(0, 90)}`);
		return;
	}

	try {
		const { body, contentType } = await fetchDoc(url);
		const ext = inferExt(url, contentType);
		const paths = resolvePlanesStorage(url, docId, ext);
		await mkdir(paths.rawDir, { recursive: true });
		await mkdir(paths.pageDir, { recursive: true });
		await writeFile(paths.rawPath, body);

		const converted = await convertDocFile(paths.rawPath, {
			url,
			docId,
			uploadImages: !opts.noUpload,
		});
		if (!converted) throw new Error("Conversión vacía o formato no soportado");

		const record: PlanesDocRecord = {
			schemaVersion: PLANES_SCHEMA_VERSION,
			docId,
			url,
			title: converted.title || titleFromDocUrl(url),
			ext,
			year: storage.year,
			source: "CAPAC_ATRIBUTOS_PLANES",
			fetchedAt: new Date().toISOString(),
			content: { markdown: converted.markdown, plainText: converted.plainText },
			sections: converted.sections,
			rawPath: paths.rawPath.replace(/\\/g, "/"),
			images: converted.images,
		};

		await writeFile(paths.jsonPath, `${JSON.stringify(record, null, 2)}\n`, "utf8");
		await writeFile(paths.mdPath, `${record.content.markdown}\n`, "utf8");

		await saveLink({
			schemaVersion: PLANES_SCHEMA_VERSION,
			docId,
			url,
			status: "fetched",
			ext,
			updatedAt: new Date().toISOString(),
		});

		stats.fetched += 1;
		const imgN = converted.images?.length ?? 0;
		console.log(`[planes] ${docId} OK (${ext}) · ${record.title.slice(0, 60)} · img=${imgN}`);
	} catch (e) {
		const msg = e instanceof Error ? e.message : String(e);
		stats.errors += 1;
		await saveLink({
			schemaVersion: PLANES_SCHEMA_VERSION,
			docId,
			url,
			status: "error",
			updatedAt: new Date().toISOString(),
			error: msg.slice(0, 500),
		});
		console.error(`[planes] ${docId} ERROR — ${msg.slice(0, 120)}`);
	}
}

async function main(): Promise<void> {
	const opts = parseCli(process.argv.slice(2));
	const raw = await readFile(opts.importPath, "utf8");
	const snapshot = JSON.parse(raw) as { table?: string; rows?: Array<{ valor?: string }> };
	const { urls, skipped } = loadUniqueDocUrls(snapshot.rows ?? []);

	console.log("=== Capacitación — CAPAC_ATRIBUTOS_PLANES ===");
	console.log(`Snapshot: ${opts.importPath}`);
	console.log(`Corpus: ${PLANES_BASE}`);
	console.log(`URLs únicas: ${urls.length} (filas: ${snapshot.rows?.length ?? 0})`);
	console.log(
		`Omitidas en snapshot: invalid=${skipped.invalid_valor} unsupported_host=${skipped.unsupported_host} not_file=${skipped.not_file_url}`,
	);

	const done = opts.resume ? await loadDoneIds() : new Set<string>();
	const pending = urls.filter((u) => !done.has(docIdFromUrl(u)));
	if (opts.limit > 0) pending.splice(opts.limit);

	console.log(`Pendientes: ${pending.length} (ya hechos: ${done.size})`);

	await mkdir(PLANES_BASE, { recursive: true });
	await mkdir(PLANES_RAW_DIR, { recursive: true });
	await mkdir(PLANES_PAGES_DIR, { recursive: true });
	await mkdir(PLANES_LINKS_DIR, { recursive: true });

	const manifest: PlanesManifest = {
		schemaVersion: PLANES_SCHEMA_VERSION,
		startedAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		stats: {
			total: pending.length,
			fetched: 0,
			skipped: urls.length - pending.length,
			errors: 0,
			unsupported: skipped.unsupported_host + skipped.invalid_valor + skipped.not_file_url,
		},
	};

	for (let i = 0; i < pending.length; i += 1) {
		if (i === 0 || (i + 1) % 3 === 0) console.log(`--- progreso ${i + 1}/${pending.length} ---`);
		await processUrl(pending[i]!, opts, manifest.stats);
		if (opts.delayMs > 0 && i < pending.length - 1) await sleep(opts.delayMs);
	}

	manifest.updatedAt = new Date().toISOString();
	await writeFile(PLANES_MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
	console.log("\n=== Resumen ===");
	console.log(JSON.stringify(manifest.stats, null, 2));
}

main().catch((e: unknown) => {
	console.error(e instanceof Error ? e.stack ?? e.message : String(e));
	process.exit(1);
});
