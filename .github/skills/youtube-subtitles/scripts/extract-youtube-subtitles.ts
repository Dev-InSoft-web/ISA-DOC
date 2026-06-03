import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

interface CliOptions {
	input: string;
	preferredLang: string;
	outFile?: string;
	json: boolean;
	raw: boolean;
	maxChars: number;
}

export interface CaptionSegment {
	startMs: number | null;
	durationMs: number | null;
	text: string;
}

interface TrackInfo {
	baseUrl?: string;
	languageCode?: string;
	kind?: string;
	nameText?: string;
	nameParam?: string;
	isTranslatable?: boolean;
	source: "player" | "timedtext-list" | "direct";
}

interface Json3Captions {
	events?: Array<{
		tStartMs?: number;
		dDurationMs?: number;
		segs?: Array<{ utf8?: string }>;
	}>;
}

interface PlayerResponse {
	videoDetails?: {
		title?: string;
		author?: string;
		lengthSeconds?: string;
		shortDescription?: string;
	};
	captions?: {
		playerCaptionsTracklistRenderer?: {
			captionTracks?: Array<{
				baseUrl?: string;
				languageCode?: string;
				kind?: string;
				name?: { simpleText?: string; runs?: Array<{ text?: string }> };
				isTranslatable?: boolean;
			}>;
		};
	};
}

interface OEmbedResponse {
	title?: string;
	author_name?: string;
	author_url?: string;
	provider_name?: string;
}

export interface ExtractionResult {
	videoId: string;
	videoUrl: string;
	metadata: {
		title?: string;
		author?: string;
		lengthSeconds?: string;
		shortDescription?: string;
		oEmbed?: OEmbedResponse;
	};
	tracks: TrackInfo[];
	selectedTrack?: TrackInfo;
	method?: string;
	transcriptChars: number;
	segments: CaptionSegment[];
	transcript: string;
	diagnostics: {
		watchStatus: number;
		watchHtmlChars: number;
		watchHasPlayerResponse: boolean;
		watchHasCaptionTracks: boolean;
		timedTextListStatus: number;
		timedTextListChars: number;
		playerResponseCount: number;
		playerResponseWithVideoDetailsCount: number;
		playerResponseWithCaptionsCount: number;
	};
}

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36";

function usage(): never {
	console.error("Uso: npx tsx .github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts <url-o-id> [lang] [--out archivo] [--json] [--raw] [--max-chars n]");
	process.exit(1);
}

function parseArgs(argv: string[]): CliOptions {
	let input = "";
	let preferredLang = "es";
	let outFile: string | undefined;
	let json = false;
	let raw = false;
	let maxChars = 16000;
	const positional: string[] = [];

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		if (arg === "--out") outFile = argv[++index];
		else if (arg === "--json") json = true;
		else if (arg === "--raw") raw = true;
		else if (arg === "--max-chars") maxChars = Number(argv[++index] ?? maxChars);
		else if (arg.startsWith("--out=")) outFile = arg.slice("--out=".length);
		else if (arg.startsWith("--max-chars=")) maxChars = Number(arg.slice("--max-chars=".length));
		else if (arg.startsWith("--")) throw new Error(`Opción no soportada: ${arg}`);
		else positional.push(arg);
	}

	input = positional[0] ?? "";
	preferredLang = positional[1] ?? preferredLang;
	if (!input) usage();
	if (!Number.isFinite(maxChars) || maxChars < 1) maxChars = 16000;

	return { input, preferredLang, outFile, json, raw, maxChars };
}

function extractVideoId(input: string): string {
	const trimmed = input.trim();
	if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

	const parsed = new URL(trimmed);
	const fromQuery = parsed.searchParams.get("v");
	if (fromQuery && /^[a-zA-Z0-9_-]{11}$/.test(fromQuery)) return fromQuery;

	const parts = parsed.pathname.split("/").filter(Boolean);
	if (parsed.hostname.includes("youtu.be") && parts[0] && /^[a-zA-Z0-9_-]{11}$/.test(parts[0])) return parts[0];

	const markerIndex = parts.findIndex((part) => ["shorts", "embed", "live"].includes(part));
	const candidate = markerIndex >= 0 ? parts[markerIndex + 1] : parts.at(-1);
	if (candidate && /^[a-zA-Z0-9_-]{11}$/.test(candidate)) return candidate;

	throw new Error(`No pude extraer un ID de YouTube válido desde: ${input}`);
}

async function fetchText(url: string): Promise<{ text: string; status: number; contentType: string | null }> {
	const response = await fetch(url, {
		headers: {
			"user-agent": USER_AGENT,
			"accept-language": "es-419,es;q=0.9,en;q=0.8",
		},
	});
	const text = await response.text();
	return { text, status: response.status, contentType: response.headers.get("content-type") };
}

async function fetchJson<T>(url: string): Promise<T | undefined> {
	try {
		const { text, status } = await fetchText(url);
		if (status < 200 || status >= 300 || !text.trim()) return undefined;
		return JSON.parse(text) as T;
	} catch {
		return undefined;
	}
}

function extractJsonAt(html: string, start: number): string {
	if (start < 0) throw new Error("No encontré inicio JSON");

	let depth = 0;
	let inString = false;
	let escaped = false;

	for (let index = start; index < html.length; index += 1) {
		const char = html[index];
		if (inString) {
			if (escaped) escaped = false;
			else if (char === "\\") escaped = true;
			else if (char === '"') inString = false;
			continue;
		}

		if (char === '"') inString = true;
		else if (char === "{") depth += 1;
		else if (char === "}") {
			depth -= 1;
			if (depth === 0) return html.slice(start, index + 1);
		}
	}

	throw new Error("No encontré cierre JSON");
}

function extractJsonAfterMarker(html: string, marker: string): string {
	const markerIndex = html.indexOf(marker);
	if (markerIndex < 0) throw new Error(`No encontré ${marker} en el HTML`);
	const start = html.indexOf("{", markerIndex);
	return extractJsonAt(html, start);
}

function extractJsonObjectsAfterMarker(html: string, marker: string): string[] {
	const objects: string[] = [];
	let cursor = 0;
	while (cursor < html.length) {
		const markerIndex = html.indexOf(marker, cursor);
		if (markerIndex < 0) break;
		const start = html.indexOf("{", markerIndex);
		try {
			objects.push(extractJsonAt(html, start));
		} catch {
		}
		cursor = markerIndex + marker.length;
	}
	return objects;
}

function extractPlayerResponses(html: string): PlayerResponse[] {
	return extractJsonObjectsAfterMarker(html, "ytInitialPlayerResponse")
		.map((json) => {
			try {
				return JSON.parse(json) as PlayerResponse;
			} catch {
				return undefined;
			}
		})
		.filter((player): player is PlayerResponse => Boolean(player));
}

function normalizeText(text: string): string {
	return text.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function decodeXml(text: string): string {
	return text
		.replace(/&#(\d+);/g, (_, value: string) => String.fromCodePoint(Number(value)))
		.replace(/&#x([0-9a-f]+);/gi, (_, value: string) => String.fromCodePoint(parseInt(value, 16)))
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&amp;/g, "&");
}

function textFromTrackName(name: { simpleText?: string; runs?: Array<{ text?: string }> } | undefined): string | undefined {
	const text = name?.simpleText ?? name?.runs?.map((run) => run.text ?? "").join("");
	return text || undefined;
}

function playerTracks(player: PlayerResponse): TrackInfo[] {
	const tracks = player.captions?.playerCaptionsTracklistRenderer?.captionTracks ?? [];
	return tracks.map((track) => ({
		baseUrl: track.baseUrl,
		languageCode: track.languageCode,
		kind: track.kind,
		nameText: textFromTrackName(track.name),
		isTranslatable: track.isTranslatable,
		source: "player",
	}));
}

function parseAttributes(input: string): Record<string, string> {
	const attrs: Record<string, string> = {};
	for (const match of input.matchAll(/([a-zA-Z_:-]+)="([^"]*)"/g)) attrs[match[1]] = decodeXml(match[2]);
	return attrs;
}

function timedTextListTracks(xml: string): TrackInfo[] {
	return Array.from(xml.matchAll(/<track\b([^>]*)\/?\s*>/g)).map((match) => {
		const attrs = parseAttributes(match[1]);
		return {
			languageCode: attrs.lang_code,
			kind: attrs.kind,
			nameText: attrs.lang_translated || attrs.lang_original || attrs.name,
			nameParam: attrs.name,
			source: "timedtext-list",
		};
	});
}

function scoreTrack(track: TrackInfo, preferredLang: string): number {
	const lang = track.languageCode ?? "";
	let score = 0;
	if (lang === preferredLang) score += 100;
	else if (lang.startsWith(preferredLang)) score += 90;
	else if (lang.startsWith("es")) score += 70;
	else if (lang.startsWith("en")) score += 40;
	if (track.source === "player") score += 10;
	if (track.kind === "asr") score -= 5;
	return score;
}

function uniqueTracks(tracks: TrackInfo[]): TrackInfo[] {
	const seen = new Set<string>();
	const result: TrackInfo[] = [];
	for (const track of tracks) {
		const key = [track.source, track.baseUrl, track.languageCode, track.kind, track.nameParam].join("|");
		if (seen.has(key)) continue;
		seen.add(key);
		result.push(track);
	}
	return result;
}

function makeCaptionUrls(track: TrackInfo, videoId: string): string[] {
	const formats = ["json3", "srv3", "vtt", ""];
	const urls: string[] = [];

	if (track.baseUrl) {
		for (const format of formats) {
			const url = new URL(track.baseUrl);
			if (format) url.searchParams.set("fmt", format);
			urls.push(url.toString());
		}
	} else if (track.languageCode) {
		for (const format of formats) {
			const url = new URL("https://video.google.com/timedtext");
			url.searchParams.set("v", videoId);
			url.searchParams.set("lang", track.languageCode);
			if (format) url.searchParams.set("fmt", format);
			if (track.nameParam) url.searchParams.set("name", track.nameParam);
			if (track.kind) url.searchParams.set("kind", track.kind);
			urls.push(url.toString());
		}
	}

	return [...new Set(urls)];
}

function parseJson3(text: string): CaptionSegment[] {
	const data = JSON.parse(text) as Json3Captions;
	return (data.events ?? [])
		.map((event) => ({
			startMs: event.tStartMs ?? null,
			durationMs: event.dDurationMs ?? null,
			text: normalizeText((event.segs ?? []).map((segment) => segment.utf8 ?? "").join("")),
		}))
		.filter((segment) => segment.text.length > 0);
}

function parseXmlCaptions(text: string): CaptionSegment[] {
	const pSegments = Array.from(text.matchAll(/<p\b([^>]*)>([\s\S]*?)<\/p>/g)).map((match) => {
		const attrs = parseAttributes(match[1]);
		const body = decodeXml(match[2].replace(/<[^>]+>/g, ""));
		return {
			startMs: attrs.t ? Number(attrs.t) : null,
			durationMs: attrs.d ? Number(attrs.d) : null,
			text: normalizeText(body),
		};
	});
	if (pSegments.length) return pSegments.filter((segment) => segment.text.length > 0);

	return Array.from(text.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g))
		.map((match) => {
			const attrs = parseAttributes(match[1]);
			return {
				startMs: attrs.start ? Math.round(Number(attrs.start) * 1000) : null,
				durationMs: attrs.dur ? Math.round(Number(attrs.dur) * 1000) : null,
				text: normalizeText(decodeXml(match[2].replace(/<[^>]+>/g, ""))),
			};
		})
		.filter((segment) => segment.text.length > 0);
}

function parseVttTime(value: string): number | null {
	const normalized = value.replace(",", ".");
	const parts = normalized.split(":");
	if (parts.length < 2) return null;
	const seconds = Number(parts.at(-1));
	const minutes = Number(parts.at(-2));
	const hours = parts.length > 2 ? Number(parts.at(-3)) : 0;
	if (![seconds, minutes, hours].every(Number.isFinite)) return null;
	return Math.round(((hours * 60 + minutes) * 60 + seconds) * 1000);
}

function parseVtt(text: string): CaptionSegment[] {
	const blocks = text.replace(/\r/g, "").split(/\n{2,}/);
	const segments: CaptionSegment[] = [];

	for (const block of blocks) {
		const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
		const timeIndex = lines.findIndex((line) => line.includes("-->"));
		if (timeIndex < 0) continue;
		const [startRaw, endRaw] = lines[timeIndex].split("-->").map((part) => part.trim().split(/\s+/)[0]);
		const startMs = parseVttTime(startRaw);
		const endMs = parseVttTime(endRaw);
		const body = normalizeText(lines.slice(timeIndex + 1).join(" ").replace(/<[^>]+>/g, ""));
		if (!body) continue;
		segments.push({ startMs, durationMs: startMs !== null && endMs !== null ? endMs - startMs : null, text: decodeXml(body) });
	}

	return segments;
}

export function parseCaptionPayload(text: string): CaptionSegment[] {
	const trimmed = text.trim();
	if (!trimmed) return [];
	if (trimmed.startsWith("{")) return parseJson3(trimmed);
	if (trimmed.startsWith("WEBVTT") || trimmed.includes("-->")) return parseVtt(trimmed);
	if (trimmed.includes("<timedtext") || trimmed.includes("<transcript") || trimmed.includes("<text") || trimmed.includes("<p")) return parseXmlCaptions(trimmed);
	return [];
}

export function transcriptFromSegments(segments: CaptionSegment[]): string {
	return normalizeText(segments.map((segment) => segment.text).join(" "));
}

async function tryExtractFromTracks(tracks: TrackInfo[], videoId: string, preferredLang: string): Promise<{ track?: TrackInfo; method?: string; segments: CaptionSegment[] }> {
	const ordered = [...tracks].sort((a, b) => scoreTrack(b, preferredLang) - scoreTrack(a, preferredLang));
	for (const track of ordered) {
		for (const url of makeCaptionUrls(track, videoId)) {
			try {
				const { text, status } = await fetchText(url);
				if (status < 200 || status >= 300 || !text.trim()) continue;
				const segments = parseCaptionPayload(text);
				if (segments.length) return { track, method: url.includes("fmt=json3") ? "json3" : url.includes("fmt=srv3") ? "srv3" : url.includes("fmt=vtt") ? "vtt" : "xml/default", segments };
			} catch {
				continue;
			}
		}
	}
	return { segments: [] };
}

/** Extrae subtítulos/transcripción de un video (sin descargar el MP4). */
export async function extractYoutubeSubtitles(
	input: string,
	preferredLang = "es",
): Promise<ExtractionResult> {
	const videoId = extractVideoId(input);
	const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
	const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
	const watchUrl = `${videoUrl}&hl=es-419&persist_hl=1`;
	const timedTextListUrl = `https://video.google.com/timedtext?type=list&v=${videoId}`;

	const [oEmbed, watchResponse, listResponse] = await Promise.all([
		fetchJson<OEmbedResponse>(oEmbedUrl),
		fetchText(watchUrl),
		fetchText(timedTextListUrl).catch(() => ({ text: "", status: 0, contentType: null })),
	]);

	const playerResponses = extractPlayerResponses(watchResponse.text);
	const player = playerResponses.find((item) => item.captions) ?? playerResponses.find((item) => item.videoDetails) ?? playerResponses[0] ?? {};

	const directTracks: TrackInfo[] = [preferredLang, "es", "es-419", "en"].map((languageCode) => ({ languageCode, source: "direct" }));
	const tracks = uniqueTracks([...playerTracks(player), ...timedTextListTracks(listResponse.text), ...directTracks]);
	const extracted = await tryExtractFromTracks(tracks, videoId, preferredLang);
	const transcript = transcriptFromSegments(extracted.segments);

	return {
		videoId,
		videoUrl,
		metadata: {
			title: player.videoDetails?.title ?? oEmbed?.title,
			author: player.videoDetails?.author ?? oEmbed?.author_name,
			lengthSeconds: player.videoDetails?.lengthSeconds,
			shortDescription: player.videoDetails?.shortDescription,
			oEmbed,
		},
		tracks,
		selectedTrack: extracted.track,
		method: extracted.method,
		transcriptChars: transcript.length,
		segments: extracted.segments,
		transcript,
		diagnostics: {
			watchStatus: watchResponse.status,
			watchHtmlChars: watchResponse.text.length,
			watchHasPlayerResponse: watchResponse.text.includes("ytInitialPlayerResponse"),
			watchHasCaptionTracks: watchResponse.text.includes("captionTracks"),
			timedTextListStatus: listResponse.status,
			timedTextListChars: listResponse.text.length,
			playerResponseCount: playerResponses.length,
			playerResponseWithVideoDetailsCount: playerResponses.filter((item) => Boolean(item.videoDetails)).length,
			playerResponseWithCaptionsCount: playerResponses.filter((item) => Boolean(item.captions)).length,
		},
	};
}

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	const result = await extractYoutubeSubtitles(options.input, options.preferredLang);

	if (options.outFile) {
		await mkdir(dirname(options.outFile), { recursive: true });
		await writeFile(options.outFile, `${JSON.stringify(result, null, 2)}\n`, "utf8");
	}

	if (options.json) {
		console.log(JSON.stringify(result, null, 2));
		return;
	}

	console.log(JSON.stringify({ ...result.metadata, videoId, videoUrl, tracks: tracks.map((track) => ({ source: track.source, languageCode: track.languageCode, kind: track.kind, name: track.nameText, isTranslatable: track.isTranslatable })), selectedTrack: result.selectedTrack, method: result.method, transcriptChars: result.transcriptChars, diagnostics: result.diagnostics, outFile: options.outFile }, null, 2));
	if (!result.transcript) {
		console.error("No se pudo extraer transcript por endpoints. Si YouTube muestra 'Mostrar transcripción', usa el fallback Playwright de la skill.");
		process.exitCode = 2;
		return;
	}

	console.log("---TRANSCRIPT_START---");
	console.log(options.raw ? result.transcript : result.transcript.slice(0, options.maxChars));
	console.log("---TRANSCRIPT_END---");
}

const isDirectRun =
	process.argv[1]?.replace(/\\/g, "/").includes("extract-youtube-subtitles") ||
	fileURLToPath(import.meta.url).replace(/\\/g, "/") === process.argv[1]?.replace(/\\/g, "/");

if (isDirectRun) {
	main().catch((error: unknown) => {
		console.error(error instanceof Error ? error.message : String(error));
		process.exit(1);
	});
}