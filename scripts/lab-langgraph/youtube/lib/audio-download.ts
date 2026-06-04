import { spawnSync } from "node:child_process";
import { mkdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";

const YT_DLP_BASE = ["--no-update", "--js-runtimes", "node"] as const;

function runFfmpeg(args: string[], timeoutMs = 600_000): void {
	const proc = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], {
		encoding: "utf8",
		timeout: timeoutMs,
	});
	if (proc.status !== 0) {
		throw new Error(`ffmpeg: ${(proc.stderr ?? proc.stdout ?? "").slice(0, 500)}`);
	}
}

function cookieArgs(): string[] {
	const browser = process.env.YT_DLP_COOKIES_BROWSER?.trim();
	if (!browser) return [];
	return ["--cookies-from-browser", browser];
}

function runYtDlpDownload(videoId: string, outTpl: string, formatArgs: string[]): string {
	const url = `https://www.youtube.com/watch?v=${videoId}`;
	const args = [...YT_DLP_BASE, ...cookieArgs(), ...formatArgs, "-o", outTpl, "--no-playlist", url];
	const proc = spawnSync("python", ["-m", "yt_dlp", ...args], {
		encoding: "utf8",
		timeout: 900_000,
		maxBuffer: 8 * 1024 * 1024,
	});
	return `${proc.stderr ?? ""}${proc.stdout ?? ""}`.slice(0, 1200);
}

async function fileOk(path: string, minBytes = 10_000): Promise<number | null> {
	try {
		const st = await stat(path);
		return st.size >= minBytes ? st.size : null;
	} catch {
		return null;
	}
}

async function extractMp3FromMedia(srcPath: string, audioPath: string): Promise<number> {
	runFfmpeg(["-i", srcPath, "-vn", "-b:a", "48k", "-ar", "16000", "-ac", "1", audioPath]);
	const n = await fileOk(audioPath);
	if (!n) throw new Error(`ffmpeg no generó MP3 en ${audioPath}`);
	return n;
}

export async function downloadYoutubeAudioMp3(
	videoId: string,
	outDir: string,
	opts?: { force?: boolean },
): Promise<{ audioPath: string; bytes: number }> {
	await mkdir(outDir, { recursive: true });
	const audioPath = join(outDir, `${videoId}.mp3`);
	if (!opts?.force) {
		const cached = await fileOk(audioPath);
		if (cached) return { audioPath, bytes: cached };
	}

	const url = `https://www.youtube.com/watch?v=${videoId}`;
	const attempts: Array<{ label: string; run: () => Promise<number | null> }> = [
		{
			label: "audio-only",
			run: async () => {
				const tpl = join(outDir, `${videoId}.%(ext)s`);
				runYtDlpDownload(videoId, tpl, [
					"-f",
					"ba/worstaudio/bestaudio",
					"-x",
					"--audio-format",
					"mp3",
					"--audio-quality",
					"9",
					"--postprocessor-args",
					"ffmpeg:-b:a 48k -ac 1 -ar 16000",
				]);
				return fileOk(audioPath);
			},
		},
		{
			label: "mp4-18+ffmpeg",
			run: async () => {
				const tmpDir = join(outDir, `_tmp_${videoId}`);
				await rm(tmpDir, { recursive: true, force: true });
				await mkdir(tmpDir, { recursive: true });
				const mediaTpl = join(tmpDir, `${videoId}.%(ext)s`);
				runYtDlpDownload(videoId, mediaTpl, ["-f", "18/b[acodec!=none]/b", "--merge-output-format", "mp4"]);
				const mediaPath = join(tmpDir, `${videoId}.mp4`);
				const altPath = join(tmpDir, `${videoId}.webm`);
				let src = (await fileOk(mediaPath, 1000)) ? mediaPath : null;
				if (!src && (await fileOk(altPath, 1000))) src = altPath;
				if (!src) {
					await rm(tmpDir, { recursive: true, force: true });
					return null;
				}
				const bytes = await extractMp3FromMedia(src, audioPath);
				await rm(tmpDir, { recursive: true, force: true });
				return bytes;
			},
		},
		{
			label: "best-progressive+ffmpeg",
			run: async () => {
				const tmpDir = join(outDir, `_tmp_${videoId}`);
				await rm(tmpDir, { recursive: true, force: true });
				await mkdir(tmpDir, { recursive: true });
				const mediaTpl = join(tmpDir, `${videoId}.%(ext)s`);
				runYtDlpDownload(videoId, mediaTpl, [
					"-f",
					"b[acodec!=none]/b",
					"--merge-output-format",
					"mp4",
				]);
				for (const ext of ["mp4", "webm", "mkv"]) {
					const p = join(tmpDir, `${videoId}.${ext}`);
					if (await fileOk(p, 1000)) {
						const bytes = await extractMp3FromMedia(p, audioPath);
						await rm(tmpDir, { recursive: true, force: true });
						return bytes;
					}
				}
				await rm(tmpDir, { recursive: true, force: true });
				return null;
			},
		},
	];

	const errors: string[] = [];
	for (const att of attempts) {
		try {
			const bytes = await att.run();
			if (bytes) return { audioPath, bytes };
			errors.push(`${att.label}: sin archivo`);
		} catch (e) {
			errors.push(`${att.label}: ${e instanceof Error ? e.message : String(e)}`);
		}
	}

	throw new Error(`yt-dlp audio ${videoId}: ${errors.join(" | ")}`);
}
