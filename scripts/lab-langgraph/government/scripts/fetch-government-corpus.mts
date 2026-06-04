/**
 * Crawl de portales gubernamentales (DIAN, MinHacienda, Supersociedades, SUIN).
 * Guarda cada página en pages/{pageId}.json + .md listos para vectorizar.
 *
 * Uso:
 *   npm run lab:gov:fetch
 *   npm run lab:gov:fetch -- --limit 50
 *   npm run lab:gov:fetch -- --resume
 *   npm run lab:gov:fetch -- --no-resume
 */
import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import {
	GOV_BASE,
	GOV_MANIFEST,
	isAllowedUrl,
	isRelevantForAccountants,
	loadManifest,
	loadSeeds,
	normalizeUrl,
	processPage,
	saveManifest,
	savePage,
	sleep,
	type GovManifest,
} from "../lib/crawl.ts";

function parseArgs(argv: string[]): {
	limit: number | null;
	resume: boolean;
	delayMs: number | null;
} {
	let limit: number | null = null;
	let resume = true;
	let delayMs: number | null = null;
	for (let i = 0; i < argv.length; i += 1) {
		const a = argv[i];
		if (a === "--no-resume") resume = false;
		else if (a === "--resume") resume = true;
		else if (a === "--limit" && argv[i + 1]) limit = Number(argv[++i]);
		else if (a === "--delay" && argv[i + 1]) delayMs = Number(argv[++i]);
	}
	return { limit, resume, delayMs };
}

const opts = parseArgs(process.argv.slice(2));
const config = await loadSeeds();
const delay = opts.delayMs ?? config.delayMs;
const logPath = join(GOV_BASE, "crawl.log");

let manifest: GovManifest = await loadManifest();

if (!opts.resume || manifest.queue.length === 0) {
	manifest = {
		startedAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		visited: opts.resume ? manifest.visited : {},
		queue: config.seeds.map((s) => ({
			url: normalizeUrl(s.url, s.url)!,
			depth: 0,
			corpus: s.corpus,
		})),
		stats: opts.resume
			? manifest.stats
			: { ok: 0, pdf: 0, empty: 0, error: 0, skipped: 0 },
	};
}

const maxPages = opts.limit ?? config.maxPages;
let processed = 0;

console.log(`Corpus: ${GOV_BASE}`);
console.log(`Cola inicial: ${manifest.queue.length} · maxPages=${maxPages} · delay=${delay}ms`);

await mkdir(GOV_BASE, { recursive: true });
await appendFile(
	logPath,
	`\n--- crawl ${new Date().toISOString()} limit=${maxPages} resume=${opts.resume} ---\n`,
);

while (manifest.queue.length > 0 && processed < maxPages) {
	const item = manifest.queue.shift()!;
	const url = item.url;
	if (manifest.visited[url]) continue;
	if (!isAllowedUrl(url, config.allowDomains)) {
		manifest.stats.skipped += 1;
		continue;
	}
	if (item.depth > config.maxDepth) {
		manifest.stats.skipped += 1;
		continue;
	}

	try {
		const { record, links } = await processPage(url, item.corpus, config);
		if (!record) {
			manifest.stats.empty += 1;
			manifest.visited[url] = { status: "empty", at: new Date().toISOString() };
			console.log(`  empty ${url}`);
			await appendFile(logPath, `EMPTY ${url}\n`);
		} else {
			await savePage(record);
			manifest.stats.ok += 1;
			if (record.tipo === "normativa" && record.content.plainText.length > 5000) {
				manifest.stats.pdf += 1;
			}
			manifest.visited[url] = {
				status: "ok",
				at: new Date().toISOString(),
				title: record.title,
			};
			console.log(`  ok    ${record.pageId} · ${record.tipo} · ${record.title.slice(0, 60)}`);
			await appendFile(logPath, `OK ${url} ${record.pageId}\n`);

			const keywords = config.pathKeywords ?? [];
			for (const link of links) {
				if (manifest.visited[link]) continue;
				if (manifest.queue.some((q) => q.url === link)) continue;
				const nextDepth = item.depth + 1;
				if (!isRelevantForAccountants(link, nextDepth, keywords)) {
					manifest.stats.skipped += 1;
					continue;
				}
				manifest.queue.push({
					url: link,
					depth: nextDepth,
					corpus: item.corpus ?? record.corpus,
				});
			}
		}
	} catch (e) {
		manifest.stats.error += 1;
		const msg = e instanceof Error ? e.message : String(e);
		manifest.visited[url] = { status: `error: ${msg}`, at: new Date().toISOString() };
		console.error(`  FAIL  ${url}: ${msg}`);
		await appendFile(logPath, `FAIL ${url} ${msg}\n`);
	}

	processed += 1;
	if (processed % 10 === 0) await saveManifest(manifest);
	if (delay > 0) await sleep(delay);
}

await saveManifest(manifest);

console.log(
	`\nListo · procesados=${processed} · ok=${manifest.stats.ok} pdf=${manifest.stats.pdf} empty=${manifest.stats.empty} error=${manifest.stats.error} · cola=${manifest.queue.length}`,
);
console.log(`Manifest: ${GOV_MANIFEST}`);
console.log(`Log: ${logPath}`);
