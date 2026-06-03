import type { CaptionSegment } from "../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";
import { TRANSCRIPT_DEDUPE_VERSION } from "./youtube-dedupe-segments.ts";
import { buildPlainTextWithDescription } from "./youtube-description.ts";
import { formatTimestamp } from "./youtube-transcript-md.ts";

/** Transcripción para plainText: un renglón por segmento (sin concatenar con espacio). */
export function segmentsToRagPlainText(segments: CaptionSegment[]): string {
	return segments
		.map((s) => s.text.replace(/\r/g, "").trim())
		.filter(Boolean)
		.join("\n");
}

export function buildTranscriptPlainText(
	description: string,
	segments: CaptionSegment[],
): string {
	return buildPlainTextWithDescription(description, segmentsToRagPlainText(segments));
}

/** Texto embebido en PGVector: título, contexto breve, marca de tiempo y enlace. */
export function buildYoutubeSegmentPageContent(opts: {
	title: string;
	description?: string;
	videoUrl: string;
	startMs: number;
	text: string;
	includeDescription?: boolean;
}): string {
	const ts = formatTimestamp(opts.startMs);
	const tSec = Math.max(0, Math.floor(opts.startMs / 1000));
	const deepLink = `${opts.videoUrl}${opts.videoUrl.includes("?") ? "&" : "?"}t=${tSec}s`;
	const parts = [`Video: ${opts.title}`, `[${ts}] ${opts.text}`, `Enlace: ${deepLink}`];
	if (opts.includeDescription && opts.description?.trim()) {
		parts.splice(1, 0, `Descripción: ${opts.description.trim().slice(0, 600)}`);
	}
	return parts.join("\n");
}

export function isRagReadyDedupe(dedupeVersion?: number): boolean {
	return dedupeVersion === TRANSCRIPT_DEDUPE_VERSION;
}

/** Re-export para indexación / tests. */
export { filterNonContentCaptionSegments, isNonContentCaptionText } from "./youtube-dedupe-segments.ts";
