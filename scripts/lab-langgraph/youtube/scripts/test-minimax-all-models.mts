/**
 * Prueba hola mundo por modelo MiniMax y guarda artefactos + reporte.
 * Uso: npm run lab:yt:test-minimax-all
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { labDataPath } from "../../_shared/isa-doc-root.ts";
import { loadLabEnv } from "../../_shared/load-lab-env.ts";
import {
	loadMinimaxConfigFromEnv,
	minimaxKeyDisplay,
	type MinimaxConfig,
} from "../../_shared/minimax-config.ts";

loadLabEnv();

const OUT_DIR = labDataPath("minimax-model-samples");
const PROMPT_CHAT = "Di solo la palabra OK.";
const PROMPT_TTS = "Hola mundo.";
const PROMPT_IMAGE = "A simple blue circle on white background, minimal.";
const PROMPT_VIDEO = "A calm blue sky with one white cloud, static shot.";
const PROMPT_MUSIC = "calm instrumental";
const LYRICS = "[verse]\nla la la";

const LLM_MODELS = [
	"MiniMax-M3",
	"MiniMax-M2.7",
	"MiniMax-M2.7-highspeed",
	"MiniMax-M2.5",
	"MiniMax-M2.5-highspeed",
	"MiniMax-M2.1",
	"MiniMax-M2.1-highspeed",
	"MiniMax-M2",
];

const SPEECH_MODELS = [
	"speech-2.8-hd",
	"speech-2.8-turbo",
	"speech-2.6-hd",
	"speech-2.6-turbo",
	"speech-02-hd",
	"speech-02-turbo",
];

const VIDEO_MODELS = ["MiniMax-Hailuo-2.3", "MiniMax-Hailuo-02"];
const MUSIC_MODELS = ["music-2.6", "music-2.5"];

type SampleResult = {
	modality: string;
	model: string;
	ok: boolean;
	httpStatus?: number;
	baseCode?: number;
	baseMsg?: string;
	artifact?: string;
	detail?: string;
	elapsedMs: number;
};

const cfg = loadMinimaxConfigFromEnv();
if (!cfg) {
	console.error("MINIMAX_API_KEY no cargada");
	process.exit(1);
}

function withGroupId(url: string): string {
	if (!cfg!.groupId) return url;
	const sep = url.includes("?") ? "&" : "?";
	return `${url}${sep}GroupId=${encodeURIComponent(cfg!.groupId)}`;
}

function authHeaders(json = true): Record<string, string> {
	const h: Record<string, string> = { Authorization: `Bearer ${cfg!.apiKey}` };
	if (json) h["Content-Type"] = "application/json";
	return h;
}

function safeName(model: string): string {
	return model.replace(/[^a-zA-Z0-9._-]+/g, "_");
}

async function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}

function parseJson(text: string): Record<string, unknown> {
	try {
		return JSON.parse(text) as Record<string, unknown>;
	} catch {
		return { _raw: text.slice(0, 500) };
	}
}

function baseResp(j: Record<string, unknown>): { code: number; msg: string } {
	const br = j.base_resp as { status_code?: number; status_msg?: string } | undefined;
	return { code: br?.status_code ?? -1, msg: br?.status_msg ?? "" };
}

async function saveHexAudio(hex: string, path: string): Promise<void> {
	const buf = Buffer.from(hex.replace(/\s/g, ""), "hex");
	await writeFile(path, buf);
}

async function testLlm(model: string): Promise<SampleResult> {
	const t0 = Date.now();
	const dir = join(OUT_DIR, "language");
	await mkdir(dir, { recursive: true });
	const url = withGroupId(`${cfg!.apiBase}/v1/text/chatcompletion_v2`);
	const res = await fetch(url, {
		method: "POST",
		headers: authHeaders(),
		body: JSON.stringify({
			model,
			messages: [{ role: "user", name: "user", content: PROMPT_CHAT }],
			temperature: 0,
		}),
	});
	const text = await res.text();
	const j = parseJson(text);
	const { code, msg } = baseResp(j);
	const reply =
		(
			(j.choices as Array<{ message?: { content?: string } }> | undefined)?.[0]?.message
				?.content as string | undefined
		) ?? "";
	const artifact = join(dir, `${safeName(model)}.txt`);
	const ok = res.ok && code === 0;
	await writeFile(
		artifact,
		[
			`model: ${model}`,
			`http: ${res.status}`,
			`base_resp: ${code} ${msg}`,
			`reply: ${reply}`,
		].join("\n"),
		"utf8",
	);
	return {
		modality: "language",
		model,
		ok,
		httpStatus: res.status,
		baseCode: code,
		baseMsg: msg,
		artifact: artifact.replace(OUT_DIR + "\\", "").replace(OUT_DIR + "/", ""),
		detail: reply.slice(0, 80),
		elapsedMs: Date.now() - t0,
	};
}

async function testTts(model: string): Promise<SampleResult> {
	const t0 = Date.now();
	const dir = join(OUT_DIR, "speech");
	await mkdir(dir, { recursive: true });
	const res = await fetch(withGroupId(`${cfg!.apiBase}/v1/t2a_v2`), {
		method: "POST",
		headers: authHeaders(),
		body: JSON.stringify({
			model,
			text: PROMPT_TTS,
			stream: false,
			voice_setting: { voice_id: "English_expressive_narrator", speed: 1 },
			audio_setting: { format: "mp3", sample_rate: 32000 },
		}),
	});
	const text = await res.text();
	const j = parseJson(text);
	const { code, msg } = baseResp(j);
	const data = j.data as { audio?: string } | undefined;
	const artifact = join(dir, `${safeName(model)}.mp3`);
	let ok = res.ok && code === 0 && !!data?.audio;
	if (ok && data?.audio) {
		await saveHexAudio(data.audio, artifact);
	} else {
		await writeFile(artifact.replace(".mp3", ".json"), text.slice(0, 2000), "utf8");
		ok = false;
	}
	return {
		modality: "speech",
		model,
		ok,
		httpStatus: res.status,
		baseCode: code,
		baseMsg: msg,
		artifact: `${safeName(model)}.mp3`,
		elapsedMs: Date.now() - t0,
	};
}

async function testImage(): Promise<SampleResult> {
	const model = "image-01";
	const t0 = Date.now();
	const dir = join(OUT_DIR, "image");
	await mkdir(dir, { recursive: true });
	const res = await fetch(withGroupId(`${cfg!.apiBase}/v1/image_generation`), {
		method: "POST",
		headers: authHeaders(),
		body: JSON.stringify({
			model,
			prompt: PROMPT_IMAGE,
			aspect_ratio: "1:1",
			n: 1,
		}),
	});
	const text = await res.text();
	const j = parseJson(text);
	const { code, msg } = baseResp(j);
	const data = j.data as { image_urls?: string[] } | undefined;
	const metaPath = join(dir, `${safeName(model)}.json`);
	await writeFile(metaPath, JSON.stringify(j, null, 2), "utf8");
	let ok = res.ok && code === 0;
	if (ok && data?.image_urls?.[0]) {
		try {
			const img = await fetch(data.image_urls[0]);
			if (img.ok) {
				await writeFile(join(dir, `${safeName(model)}.png`), Buffer.from(await img.arrayBuffer()));
			} else ok = false;
		} catch {
			ok = false;
		}
	}
	return {
		modality: "image",
		model,
		ok,
		httpStatus: res.status,
		baseCode: code,
		baseMsg: msg,
		artifact: `image/${safeName(model)}.png`,
		elapsedMs: Date.now() - t0,
	};
}

async function testMusic(model: string): Promise<SampleResult> {
	const t0 = Date.now();
	const dir = join(OUT_DIR, "music");
	await mkdir(dir, { recursive: true });
	const res = await fetch(withGroupId(`${cfg!.apiBase}/v1/music_generation`), {
		method: "POST",
		headers: authHeaders(),
		body: JSON.stringify({
			model,
			prompt: PROMPT_MUSIC,
			lyrics: LYRICS,
		}),
	});
	const text = await res.text();
	const j = parseJson(text);
	const { code, msg } = baseResp(j);
	const data = j.data as { audio?: string } | undefined;
	const artifact = join(dir, `${safeName(model)}.mp3`);
	let ok = res.ok && code === 0 && !!data?.audio;
	if (ok && data?.audio) {
		await saveHexAudio(data.audio, artifact);
	} else {
		await writeFile(join(dir, `${safeName(model)}.json`), text.slice(0, 2000), "utf8");
		ok = false;
	}
	return {
		modality: "music",
		model,
		ok,
		httpStatus: res.status,
		baseCode: code,
		baseMsg: msg,
		artifact: `music/${safeName(model)}.mp3`,
		elapsedMs: Date.now() - t0,
	};
}

async function pollVideoTask(taskId: string, maxMs = 300_000): Promise<Record<string, unknown>> {
	const start = Date.now();
	while (Date.now() - start < maxMs) {
		const res = await fetch(
			withGroupId(`${cfg!.apiBase}/v1/query/video_generation?task_id=${encodeURIComponent(taskId)}`),
			{ headers: authHeaders(false) },
		);
		const j = parseJson(await res.text());
		const status = (j.status as string | undefined) ?? "";
		if (status === "Success" || status === "success") return j;
		if (status === "Fail" || status === "failed") return j;
		await sleep(8000);
	}
	return { status: "timeout", task_id: taskId };
}

async function testVideo(model: string): Promise<SampleResult> {
	const t0 = Date.now();
	const dir = join(OUT_DIR, "video");
	await mkdir(dir, { recursive: true });
	const res = await fetch(withGroupId(`${cfg!.apiBase}/v1/video_generation`), {
		method: "POST",
		headers: authHeaders(),
		body: JSON.stringify({
			model,
			prompt: PROMPT_VIDEO,
			duration: 6,
			resolution: "768P",
			prompt_optimizer: false,
		}),
	});
	const createText = await res.text();
	const created = parseJson(createText);
	const { code, msg } = baseResp(created);
	const taskId = created.task_id as string | undefined;
	const metaPath = join(dir, `${safeName(model)}.json`);
	if (!res.ok || code !== 0 || !taskId) {
		await writeFile(metaPath, createText, "utf8");
		return {
			modality: "video",
			model,
			ok: false,
			httpStatus: res.status,
			baseCode: code,
			baseMsg: msg,
			artifact: `video/${safeName(model)}.json`,
			elapsedMs: Date.now() - t0,
		};
	}
	const polled = await pollVideoTask(taskId);
	await writeFile(metaPath, JSON.stringify({ create: created, polled }, null, 2), "utf8");
	const pCode = baseResp(polled).code;
	const status = String(polled.status ?? "");
	const fileId = polled.file_id as string | undefined;
	const ok =
		(status.toLowerCase() === "success" || pCode === 0) && !!fileId;
	return {
		modality: "video",
		model,
		ok,
		baseCode: pCode,
		baseMsg: String(polled.base_resp ? baseResp(polled).msg : status),
		artifact: `video/${safeName(model)}.json`,
		detail: fileId ? `file_id=${fileId}` : status,
		elapsedMs: Date.now() - t0,
	};
}

async function testStt(): Promise<SampleResult> {
	const model = cfg!.sttModel;
	const t0 = Date.now();
	const res = await fetch(withGroupId(`${cfg!.sttApiBase}/v1/stt/create`), {
		method: "POST",
		headers: { Authorization: `Bearer ${cfg!.apiKey}` },
		body: new FormData(),
	});
	const text = await res.text();
	const dir = join(OUT_DIR, "stt");
	await mkdir(dir, { recursive: true });
	await writeFile(join(dir, "probe.json"), text, "utf8");
	return {
		modality: "stt",
		model,
		ok: res.ok && res.status !== 404,
		httpStatus: res.status,
		detail: res.status === 404 ? "no en API oficial" : text.slice(0, 100),
		artifact: "stt/probe.json",
		elapsedMs: Date.now() - t0,
	};
}

async function fetchListedLlms(): Promise<string[]> {
	try {
		const res = await fetch(withGroupId(`${cfg!.apiBase}/v1/models`), {
			headers: authHeaders(false),
		});
		if (!res.ok) return LLM_MODELS;
		const j = parseJson(await res.text());
		const data = j.data as Array<{ id?: string }> | undefined;
		if (!Array.isArray(data) || !data.length) return LLM_MODELS;
		return data.map((m) => m.id!).filter(Boolean);
	} catch {
		return LLM_MODELS;
	}
}

function renderSummary(results: SampleResult[]): string {
	const lines = [
		"# MiniMax model samples",
		"",
		`| Modality | Model | OK | base | Detail |`,
		`|----------|-------|-----|------|--------|`,
	];
	for (const r of results) {
		lines.push(
			`| ${r.modality} | ${r.model} | ${r.ok ? "yes" : "no"} | ${r.baseCode ?? r.httpStatus ?? "—"} | ${(r.detail ?? r.baseMsg ?? "").replace(/\|/g, "/").slice(0, 60)} |`,
		);
	}
	const okN = results.filter((r) => r.ok).length;
	lines.push("", `**${okN}/${results.length} OK**`, "");
	return lines.join("\n");
}

console.log(`MiniMax all-models test → ${OUT_DIR}`);
console.log(`  ${minimaxKeyDisplay(cfg)}`);
await mkdir(OUT_DIR, { recursive: true });

const results: SampleResult[] = [];
const llms = await fetchListedLlms();
console.log(`\nLanguage (${llms.length})…`);
for (const model of llms) {
	const r = await testLlm(model);
	results.push(r);
	console.log(`  ${r.ok ? "OK" : "FAIL"} ${model} ${r.detail ?? r.baseMsg ?? ""}`);
	await sleep(1500);
}

console.log(`\nSpeech (${SPEECH_MODELS.length})…`);
for (const model of SPEECH_MODELS) {
	const r = await testTts(model);
	results.push(r);
	console.log(`  ${r.ok ? "OK" : "FAIL"} ${model}`);
	await sleep(1500);
}

console.log("\nImage…");
results.push(await testImage());
console.log(`  ${results.at(-1)?.ok ? "OK" : "FAIL"} image-01`);

console.log(`\nMusic (${MUSIC_MODELS.length})…`);
for (const model of MUSIC_MODELS) {
	const r = await testMusic(model);
	results.push(r);
	console.log(`  ${r.ok ? "OK" : "FAIL"} ${model}`);
	await sleep(2000);
}

console.log(`\nVideo (${VIDEO_MODELS.length}) — puede tardar varios min…`);
for (const model of VIDEO_MODELS) {
	const r = await testVideo(model);
	results.push(r);
	console.log(`  ${r.ok ? "OK" : "FAIL"} ${model} ${r.detail ?? r.baseMsg ?? ""}`);
}

console.log("\nSTT probe…");
results.push(await testStt());
console.log(`  ${results.at(-1)?.ok ? "OK" : "skip"} ${cfg.sttModel}`);

const report = {
	at: new Date().toISOString(),
	key: minimaxKeyDisplay(cfg),
	outDir: OUT_DIR,
	results,
};
await writeFile(join(OUT_DIR, "report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(join(OUT_DIR, "SUMMARY.md"), `${renderSummary(results)}\n`, "utf8");

const failed = results.filter((r) => !r.ok);
console.log(`\nListo: ${results.length - failed.length}/${results.length} OK`);
console.log(`Carpeta: ${OUT_DIR}`);
if (failed.length) {
	console.log("Fallos:", failed.map((f) => `${f.modality}/${f.model}`).join(", "));
	process.exitCode = 1;
}
