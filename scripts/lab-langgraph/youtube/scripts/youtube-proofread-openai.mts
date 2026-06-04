/**
 * @deprecated Usar lab-langgraph: POST /api/youtube/proofread (LangGraph: Groq → HF).
 * Prueba histórica OpenAI. Salida: videos/{videoId}-test.json y {videoId}-test.md
 *
 * Uso: npm run lab:yt:proofread -- <videoId>   (desde ISA-DOC, vía lab-langgraph)
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadDotenv } from "dotenv";
import { existsSync } from "node:fs";
import type { CaptionSegment } from "../../../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";
import { buildTranscriptPlainText } from "../lib/rag.ts";
import { segmentsToTimestampedLines, videoCorpusMarkdown } from "../lib/transcript-md.ts";
import type { VideoCorpusRecord } from "../lib/types.ts";

import { ISA_DOC_ROOT } from "../../_shared/isa-doc-root.ts";
import { contentRoot } from "../lib/corpus-paths.ts";

const VIDEOS_DIR = contentRoot("videos");

/** Modelo económico OpenAI para edición de texto (2025). */
const PROOFREAD_MODEL = process.env.OPENAI_PROOFREAD_MODEL?.trim() || "gpt-4o-mini";
const BATCH_SIZE = 35;

const SYSTEM_PROMPT = `Eres un editor de transcripciones automáticas (ASR) de videos en español sobre ContaPyme, software contable colombiano.

Recibirás un JSON con segmentos numerados (campo "i" y "text"). Debes devolver ÚNICAMENTE un JSON válido:
{"segments":[{"i":0,"text":"..."}, ...]}

Reglas estrictas:
- Misma cantidad de segmentos, mismos índices "i", mismo orden. No fusionar ni dividir.
- Corrige ortografía, tildes, puntuación y errores típicos de ASR (ej. contamina/contapine/contapimedia → ContaPyme).
- Restaura nombres propios: ContaPyme, AgroWin, INSOFT, etc.
- No inventes contenido ni resumas. Conserva el tono oral del presentador.
- Si un segmento ya está bien, déjalo igual o con correcciones mínimas.`;

function loadSecrets(): void {
	for (const rel of [".env", "secrets/api-keys.env"]) {
		const p = join(ISA_DOC_ROOT, rel);
		if (existsSync(p)) loadDotenv({ path: p, override: false });
	}
}

function getOpenAiKey(): string {
	const key = process.env.paty_openai_api_key?.trim() || process.env.OPENAI_API_KEY?.trim();
	if (!key) throw new Error("Falta paty_openai_api_key u OPENAI_API_KEY en ISA-DOC/.env");
	return key;
}

type BatchItem = { i: number; text: string };

async function proofreadBatch(
	apiKey: string,
	batch: BatchItem[],
): Promise<{ items: BatchItem[]; missing: number }> {
	const res = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: PROOFREAD_MODEL,
			temperature: 0.2,
			response_format: { type: "json_object" },
			messages: [
				{ role: "system", content: SYSTEM_PROMPT },
				{
					role: "user",
					content: JSON.stringify({ segments: batch }),
				},
			],
		}),
	});

	if (!res.ok) {
		const err = await res.text();
		throw new Error(`OpenAI ${res.status}: ${err.slice(0, 800)}`);
	}

	const data = (await res.json()) as {
		choices?: Array<{ message?: { content?: string } }>;
		usage?: { prompt_tokens?: number; completion_tokens?: number };
	};
	const raw = data.choices?.[0]?.message?.content?.trim();
	if (!raw) throw new Error("OpenAI devolvió contenido vacío");

	const parsed = JSON.parse(raw) as { segments?: BatchItem[] };
	if (!Array.isArray(parsed.segments)) throw new Error("JSON sin array segments");

	const byIndex = new Map<number, string>();
	for (const row of parsed.segments) {
		if (typeof row.i !== "number" || typeof row.text !== "string") continue;
		byIndex.set(row.i, row.text.trim());
	}

	const out: BatchItem[] = [];
	let missing = 0;
	for (const item of batch) {
		const text = byIndex.get(item.i);
		if (!text) {
			missing += 1;
			out.push({ i: item.i, text: item.text });
			continue;
		}
		out.push({ i: item.i, text });
	}
	if (missing > 0) console.warn(`  ⚠ ${missing} índice(s) sin respuesta, se conserva ASR`);

	if (data.usage) {
		console.log(
			`  tokens in=${data.usage.prompt_tokens ?? "?"} out=${data.usage.completion_tokens ?? "?"}`,
		);
	}

	return { items: out, missing };
}

async function proofreadAllSegments(
	apiKey: string,
	segments: CaptionSegment[],
): Promise<CaptionSegment[]> {
	const corrected = segments.map((s) => ({ ...s }));
	const total = segments.length;

	for (let start = 0; start < total; start += BATCH_SIZE) {
		const end = Math.min(start + BATCH_SIZE, total);
		const batch: BatchItem[] = [];
		for (let i = start; i < end; i += 1) {
			batch.push({ i, text: segments[i].text });
		}
		console.log(`  Lote ${start + 1}-${end} / ${total}…`);
		let { items: fixed, missing: miss } = await proofreadBatch(apiKey, batch);
		if (miss > 0) {
			console.log("  Reintento del lote…");
			({ items: fixed } = await proofreadBatch(apiKey, batch));
		}
		for (const row of fixed) {
			corrected[row.i] = { ...corrected[row.i], text: row.text };
		}
	}

	return corrected;
}

async function main(): Promise<void> {
	const videoId = process.argv[2]?.trim();
	if (!videoId) {
		console.error("Uso: npm run lab:yt:proofread-test -- <videoId>");
		process.exit(1);
	}

	loadSecrets();
	const apiKey = getOpenAiKey();

	const srcPath = join(VIDEOS_DIR, `${videoId}.json`);
	const record = JSON.parse(await readFile(srcPath, "utf8")) as VideoCorpusRecord;
	const original = record.transcript.segments;

	console.log(`Proofread ${videoId} · ${original.length} segmentos · modelo ${PROOFREAD_MODEL}`);

	const segments = await proofreadAllSegments(apiKey, original);
	const plainText = buildTranscriptPlainText(record.ytdlp.description ?? "", segments);

	const testRecord: VideoCorpusRecord & {
		transcript: VideoCorpusRecord["transcript"] & {
			segmentsOriginal?: CaptionSegment[];
			proofreadModel?: string;
			proofreadAt?: string;
			sourceVideoId?: string;
		};
	} = {
		...record,
		extractedAt: new Date().toISOString(),
		transcript: {
			...record.transcript,
			method: "openai-proofread-test",
			proofreadModel: PROOFREAD_MODEL,
			proofreadAt: new Date().toISOString(),
			sourceVideoId: videoId,
			segmentsOriginal: original,
			segments,
			segmentCount: segments.length,
			plainText,
			transcriptChars: plainText.length,
		},
		files: {
			md: `videos/${videoId}-test.md`,
			json: `videos/${videoId}-test.json`,
			infoJson: record.files.infoJson,
		},
	};

	const jsonPath = join(VIDEOS_DIR, `${videoId}-test.json`);
	const mdPath = join(VIDEOS_DIR, `${videoId}-test.md`);

	await writeFile(jsonPath, `${JSON.stringify(testRecord, null, 2)}\n`, "utf8");
	await writeFile(mdPath, videoCorpusMarkdown(testRecord), "utf8");

	// Muestra comparación primeros segmentos del bloque problemático
	const sampleIdx = original.findIndex((s) => s.text.includes("contamina"));
	if (sampleIdx >= 0) {
		console.log("\nEjemplo índice", sampleIdx);
		console.log("  ASR:", original[sampleIdx].text);
		console.log("  Fix:", segments[sampleIdx].text);
	}

	let changed = 0;
	for (let i = 0; i < original.length; i += 1) {
		if (original[i].text !== segments[i].text) changed += 1;
	}
	console.log(`\nGuardado: ${jsonPath}`);
	console.log(`Guardado: ${mdPath}`);
	console.log(`Segmentos modificados: ${changed} / ${original.length}`);
}

main().catch((e) => {
	console.error(e instanceof Error ? e.message : e);
	process.exit(1);
});
