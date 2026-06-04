import { mkdir, readFile, rm, stat } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import type { CaptionSegment } from "../../../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";
import {
	loadMinimaxConfigFromEnv,
	minimaxKeyDisplay,
	type MinimaxConfig,
	type MinimaxSttMode,
} from "../../_shared/minimax-config.ts";
import { splitAudioIfNeeded } from "./groq.ts";
import {
	dedupeRollingCaptionSegments,
	TRANSCRIPT_DEDUPE_VERSION,
} from "../lib/dedupe-segments.ts";
import { buildTranscriptPlainText } from "../lib/rag.ts";
import type { VideoCorpusRecord } from "../lib/types.ts";

const CHUNK_SECONDS = 600;
const MAX_CHUNK_BYTES = 24 * 1024 * 1024;
const CHUNK_OVERLAP_SEC = 10;
const POLL_MS = 5_000;
const POLL_MAX_MS = 30 * 60_000;

type SttWord = { word?: string; text?: string; start?: number; end?: number };

function authHeaders(cfg: MinimaxConfig): Record<string, string> {
	return { Authorization: `Bearer ${cfg.apiKey}` };
}

function withGroupId(url: string, cfg: MinimaxConfig): string {
	if (!cfg.groupId) return url;
	const sep = url.includes("?") ? "&" : "?";
	return `${url}${sep}GroupId=${encodeURIComponent(cfg.groupId)}`;
}

function isSttPending(status: string | undefined): boolean {
	return (
		status === "waiting" ||
		status === "active" ||
		status === "queued" ||
		status === "generating"
	);
}

function isSttDone(status: string | undefined): boolean {
	return status === "succeeded" || status === "completed";
}

function wordsToSegments(words: SttWord[], offsetMs: number): CaptionSegment[] {
	const out: CaptionSegment[] = [];
	let buf = "";
	let startSec = 0;
	let endSec = 0;

	const flush = () => {
		const t = buf.replace(/\s+/g, " ").trim();
		if (!t) return;
		const durMs = Math.max(100, Math.round((endSec - startSec) * 1000));
		out.push({
			startMs: Math.round(offsetMs + startSec * 1000),
			durationMs: durMs,
			text: t,
		});
		buf = "";
	};

	for (const w of words) {
		const token = (w.word ?? w.text ?? "").trim();
		if (!token) continue;
		const s = w.start ?? endSec;
		const e = w.end ?? s + 0.3;
		if (!buf) startSec = s;
		endSec = e;
		buf += `${buf ? " " : ""}${token}`;
		if (/[.!?…]$/.test(token) || e - startSec >= 8) flush();
	}
	flush();
	return out;
}

function parseSttPayload(body: Record<string, unknown>): {
	words?: SttWord[];
	transcript?: string;
} {
	const result = body.result as Record<string, unknown> | undefined;
	const output = body.output as Record<string, unknown> | undefined;

	const fromResult = result?.results as Record<string, unknown> | undefined;
	const channels = fromResult?.channels as unknown;
	if (Array.isArray(channels) && channels[0]) {
		const alt = (channels[0] as Record<string, unknown>).alternatives as unknown;
		if (Array.isArray(alt) && alt[0]) {
			const a0 = alt[0] as Record<string, unknown>;
			if (Array.isArray(a0.words)) return { words: a0.words as SttWord[], transcript: String(a0.transcript ?? "") };
			if (a0.transcript) return { transcript: String(a0.transcript) };
		}
	}

	if (output && Array.isArray(output.words)) {
		return { words: output.words as SttWord[], transcript: String(output.text ?? "") };
	}
	if (typeof output?.text === "string") return { transcript: output.text };

	return {};
}

function plainTextToSingleSegment(text: string, offsetMs: number, durSec: number): CaptionSegment[] {
	const t = text.replace(/\s+/g, " ").trim();
	if (!t) return [];
	return [
		{
			startMs: offsetMs,
			durationMs: Math.max(1000, Math.round(durSec * 1000)),
			text: t,
		},
	];
}

async function createSttJob(filePath: string, cfg: MinimaxConfig): Promise<string> {
	const buf = await readFile(filePath);
	const form = new FormData();
	form.append("model", cfg.sttModel);
	form.append("language", "es");
	form.append("audio", new Blob([buf], { type: "audio/mpeg" }), basename(filePath));

	const url = withGroupId(`${cfg.sttApiBase}/v1/stt/create`, cfg);
	const res = await fetch(url, { method: "POST", headers: authHeaders(cfg), body: form });
	const text = await res.text();
	if (!res.ok) {
		if (res.status === 404) {
			throw new Error(
				`MiniMax STT no expuesto en ${cfg.sttApiBase} (HTTP 404). Los créditos de audio suelen ser TTS; use Groq o MINIMAX_STT_API_BASE con un gateway STT compatible.`,
			);
		}
		throw new Error(`MiniMax STT create ${res.status}: ${text.slice(0, 400)}`);
	}
	const json = JSON.parse(text) as { generation_id?: string; id?: string };
	const id = json.generation_id ?? json.id;
	if (!id) throw new Error(`MiniMax STT create sin generation_id: ${text.slice(0, 300)}`);
	return id;
}

async function pollSttJob(genId: string, cfg: MinimaxConfig): Promise<CaptionSegment[]> {
	const url = withGroupId(`${cfg.sttApiBase}/v1/stt/${encodeURIComponent(genId)}`, cfg);
	const t0 = Date.now();
	while (Date.now() - t0 < POLL_MAX_MS) {
		const res = await fetch(url, { headers: authHeaders(cfg) });
		const text = await res.text();
		if (!res.ok) throw new Error(`MiniMax STT poll ${res.status}: ${text.slice(0, 400)}`);
		const json = JSON.parse(text) as Record<string, unknown>;
		const status = String(json.status ?? "");
		if (isSttPending(status)) {
			await new Promise((r) => setTimeout(r, POLL_MS));
			continue;
		}
		if (!isSttDone(status)) {
			throw new Error(`MiniMax STT falló: status=${status} ${text.slice(0, 300)}`);
		}
		const parsed = parseSttPayload(json);
		if (parsed.words?.length) return wordsToSegments(parsed.words, 0);
		if (parsed.transcript) return plainTextToSingleSegment(parsed.transcript, 0, 60);
		throw new Error("MiniMax STT completó sin texto");
	}
	throw new Error("MiniMax STT timeout esperando resultado");
}

async function transcribeOpenAiStyle(filePath: string, cfg: MinimaxConfig): Promise<CaptionSegment[]> {
	const buf = await readFile(filePath);
	const form = new FormData();
	form.append("file", new Blob([buf], { type: "audio/mpeg" }), basename(filePath));
	form.append("model", cfg.sttModel);
	form.append("language", "es");
	form.append("response_format", "verbose_json");

	const url = withGroupId(`${cfg.sttApiBase}/v1/audio/transcriptions`, cfg);
	const res = await fetch(url, { method: "POST", headers: authHeaders(cfg), body: form });
	const text = await res.text();
	if (!res.ok) throw new Error(`MiniMax transcriptions ${res.status}: ${text.slice(0, 300)}`);
	const json = JSON.parse(text) as {
		segments?: Array<{ start?: number; end?: number; text?: string }>;
		text?: string;
	};
	const segs: CaptionSegment[] = [];
	for (const seg of json.segments ?? []) {
		const t = (seg.text ?? "").trim();
		if (!t) continue;
		const startSec = seg.start ?? 0;
		const endSec = seg.end ?? startSec + 1;
		segs.push({
			startMs: Math.round(startSec * 1000),
			durationMs: Math.max(100, Math.round((endSec - startSec) * 1000)),
			text: t,
		});
	}
	if (segs.length) return segs;
	if (json.text?.trim()) return plainTextToSingleSegment(json.text, 0, 60);
	throw new Error("MiniMax transcriptions sin segmentos");
}

async function transcribeChunkApi(filePath: string, cfg: MinimaxConfig): Promise<CaptionSegment[]> {
	try {
		return await transcribeOpenAiStyle(filePath, cfg);
	} catch (openAiErr) {
		const msg = openAiErr instanceof Error ? openAiErr.message : String(openAiErr);
		if (!/404|not found/i.test(msg)) throw openAiErr;
		console.warn("  MiniMax · /audio/transcriptions 404 → /stt/create");
	}
	const genId = await createSttJob(filePath, cfg);
	return pollSttJob(genId, cfg);
}

async function transcribeChunkOne(
	filePath: string,
	cfg: MinimaxConfig,
	offsetMs: number,
): Promise<CaptionSegment[]> {
	const modes: MinimaxSttMode[] =
		cfg.sttMode === "auto" ? ["api", "multimodal"] : [cfg.sttMode];
	let lastErr: Error | null = null;
	for (const mode of modes) {
		try {
			const raw =
				mode === "multimodal"
					? await transcribeChunkMultimodal(filePath, cfg, offsetMs)
					: await transcribeChunkApi(filePath, cfg);
			return raw.map((s) =>
				mode === "api" ? { ...s, startMs: s.startMs + offsetMs } : s,
			);
		} catch (e) {
			lastErr = e instanceof Error ? e : new Error(String(e));
			if (cfg.sttMode === "auto" && mode === "api") {
				console.warn(`  MiniMax STT api falló → multimodal: ${lastErr.message.slice(0, 90)}`);
				continue;
			}
			throw lastErr;
		}
	}
	throw lastErr ?? new Error("MiniMax STT falló");
}

function runFfmpegClip(audioPath: string, seconds: number, outMp4: string): void {
	const proc = spawnSync(
		"ffmpeg",
		[
			"-hide_banner",
			"-loglevel",
			"error",
			"-y",
			"-i",
			audioPath,
			"-t",
			String(seconds),
			"-f",
			"lavfi",
			"-i",
			`color=c=black:s=320x240:d=${seconds}`,
			"-shortest",
			"-c:v",
			"libx264",
			"-c:a",
			"aac",
			outMp4,
		],
		{ encoding: "utf8", timeout: 300_000 },
	);
	if (proc.status !== 0) {
		throw new Error(`ffmpeg minimax clip: ${(proc.stderr ?? "").slice(0, 400)}`);
	}
}

async function transcribeChunkMultimodal(
	filePath: string,
	cfg: MinimaxConfig,
	offsetMs: number,
): Promise<CaptionSegment[]> {
	const st = await stat(filePath);
	const clipSec = Math.min(120, Math.max(15, Math.ceil(st.size / (256 * 1024))));
	const workDir = join(dirname(filePath), ".minimax-vlm");
	await mkdir(workDir, { recursive: true });
	const mp4 = join(workDir, `${basename(filePath, ".mp3")}-clip.mp4`);
	runFfmpegClip(filePath, clipSec, mp4);

	const buf = await readFile(mp4);
	const form = new FormData();
	form.append("purpose", "video_understanding");
	form.append("file", new Blob([buf], { type: "video/mp4" }), basename(mp4));
	const up = await fetch(withGroupId(`${cfg.apiBase}/v1/files/upload`, cfg), {
		method: "POST",
		headers: authHeaders(cfg),
		body: form,
	});
	const upText = await up.text();
	if (!up.ok) throw new Error(`MiniMax upload ${up.status}: ${upText.slice(0, 400)}`);
	const upJson = JSON.parse(upText) as {
		file?: { file_id?: number };
		base_resp?: { status_code?: number; status_msg?: string };
	};
	if (upJson.base_resp?.status_code === 1008) {
		throw new Error(
			"MiniMax multimodal: saldo de tokens insuficiente (1008). Los créditos de suscripción audio son para TTS, no para M2.5.",
		);
	}
	const fileId = upJson.file?.file_id;
	if (!fileId) throw new Error(`MiniMax upload sin file_id: ${upText.slice(0, 300)}`);

	const chatUrl = withGroupId(`${cfg.apiBase}/v1/text/chatcompletion_v2`, cfg);
	const videoRef = `mm_file://${fileId}`;
	const isM3 = cfg.chatModel.startsWith("MiniMax-M3");
	const videoPart = isM3
		? { type: "video_url", video_url: { url: videoRef } }
		: { type: "input_video", video_url: videoRef };
	const payload = {
		model: cfg.chatModel,
		messages: [
			{
				role: "user",
				name: "user",
				content: [
					videoPart,
					{
						type: "text",
						text: "Transcribe el audio en español. Devuelve solo líneas [HH:MM:SS.mmm] texto, una frase por línea.",
					},
				],
			},
		],
	};
	const chat = await fetch(chatUrl, {
		method: "POST",
		headers: { ...authHeaders(cfg), "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	const chatText = await chat.text();
	if (!chat.ok) throw new Error(`MiniMax chat ${chat.status}: ${chatText.slice(0, 400)}`);
	const chatJson = JSON.parse(chatText) as {
		base_resp?: { status_code?: number; status_msg?: string };
		choices?: Array<{ message?: { content?: string } }>;
	};
	if (chatJson.base_resp?.status_code === 1008) {
		throw new Error("MiniMax multimodal: saldo de tokens insuficiente (1008)");
	}
	const content =
		chatJson.choices?.[0]?.message?.content ??
		(typeof chatJson === "object" && "reply" in chatJson ? String((chatJson as { reply?: string }).reply) : "");
	const lines = String(content)
		.split(/\n+/)
		.map((l) => l.trim())
		.filter(Boolean);
	const segs: CaptionSegment[] = [];
	for (const line of lines) {
		const m = line.match(/^\[(\d{2}):(\d{2}):(\d{2})\.(\d{3})\]\s*(.+)$/);
		if (!m) continue;
		const startMs =
			offsetMs +
			(Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3])) * 1000 +
			Number(m[4]);
		segs.push({ startMs, durationMs: 2500, text: m[5]!.trim() });
	}
	if (!segs.length && content.trim()) {
		return plainTextToSingleSegment(content, offsetMs, clipSec);
	}
	return segs;
}

export async function transcribeAudioWithMinimax(
	audioPath: string,
	cacheRoot: string,
	videoId: string,
	opts?: { cfg?: MinimaxConfig },
): Promise<CaptionSegment[]> {
	const cfg = opts?.cfg ?? loadMinimaxConfigFromEnv();
	if (!cfg) throw new Error("Falta MINIMAX_API_KEY en secrets/patyia/lab-langgraph.env");

	const chunkDir = join(cacheRoot, "minimax-chunks", videoId);
	await rm(chunkDir, { recursive: true, force: true });
	const parts = await splitAudioIfNeeded(audioPath, chunkDir, MAX_CHUNK_BYTES, CHUNK_SECONDS);

	console.log(
		`  MiniMax · ${minimaxKeyDisplay(cfg)} · modo ${cfg.sttMode} · ${parts.length} parte(s)`,
	);

	const merged: CaptionSegment[] = [];
	for (let i = 0; i < parts.length; i += 1) {
		const offsetMs = Math.max(0, i * (CHUNK_SECONDS - CHUNK_OVERLAP_SEC) * 1000);
		console.log(`  → MiniMax parte ${i + 1}/${parts.length}: ${basename(parts[i]!)}`);
		merged.push(...(await transcribeChunkOne(parts[i]!, cfg, offsetMs)));
		if (i < parts.length - 1) await new Promise((r) => setTimeout(r, 800));
	}

	await rm(chunkDir, { recursive: true, force: true });
	return dedupeRollingCaptionSegments(merged);
}

export function applyMinimaxTranscriptToRecord(
	record: VideoCorpusRecord,
	segments: CaptionSegment[],
	model: string,
): VideoCorpusRecord {
	const description = record.ytdlp.description ?? "";
	const plainText = buildTranscriptPlainText(description, segments);
	return {
		...record,
		extractedAt: new Date().toISOString(),
		transcript: {
			...record.transcript,
			method: `minimax-${model}`,
			languageCode: "es",
			dedupeVersion: TRANSCRIPT_DEDUPE_VERSION,
			segmentCount: segments.length,
			transcriptChars: plainText.length,
			segments,
			plainText,
			whisperModel: model,
			whisperAt: new Date().toISOString(),
		},
	};
}
