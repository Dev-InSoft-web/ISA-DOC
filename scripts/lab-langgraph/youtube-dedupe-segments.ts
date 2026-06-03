import type { CaptionSegment } from "../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";

/** Incrementar cuando cambie la lógica de dedupe (fuerza re-proceso en resume). */
export const TRANSCRIPT_DEDUPE_VERSION = 5;

const AUDIO_STAGE_PATTERNS = [
	/^m[uú]sica(\s+de\s+(fondo|intro|outro|entrada|salida|ambiente))?$/,
	/^music(\s+(playing|plays|in\s+background))?$/,
	/^aplausos?$/,
	/^applause$/,
	/^risas?$/,
	/^laughter$/,
	/^instrumental(es)?$/,
	/^instrumentos?$/,
	/^sonidos?(\s+de\s+\w+)?$/,
	/^sound\s+effects?$/,
	/^sfx$/,
	/^(intro|outro)$/,
	/^toques?\s+de\s+\w+$/,
	/^solo\s+de\s+\w+$/,
	/^♪+$/,
];

function norm(text: string): string {
	return text.replace(/\s+/g, " ").trim().toLowerCase();
}

/** Etiquetas de audio/escena que no aportan al RAG (ASR/VTT). */
const AUDIO_STAGE_EXACT = new Set(
	[
		"musica",
		"music",
		"aplausos",
		"aplauso",
		"applause",
		"risas",
		"risa",
		"laughter",
		"instrumental",
		"instrumentales",
		"instrumentos",
		"sonido",
		"sonidos",
		"sound effects",
		"sfx",
		"intro",
		"outro",
		"silencio",
		"silence",
		"pausa",
		"pause",
		"cough",
		"tos",
		"beeps",
		"beep",
		"campana",
		"campanas",
		"ring",
		"clap",
		"clapping",
	].map((s) => norm(s)),
);

function cleanText(text: string): string {
	return text.replace(/\s+/g, " ").trim();
}

function stripDecorativeSymbols(text: string): string {
	return text.replace(/[♪♫🎵🎶]+/g, " ").replace(/\s+/g, " ").trim();
}

/** Contenido entre corchetes o paréntesis si el cue es solo eso. */
function unwrapStageLabel(text: string): string {
	const t = text.trim();
	const m = t.match(/^[\[(]([^\])]+)[\])]$/);
	return m ? m[1].trim() : t;
}

function isAudioStageLabel(label: string): boolean {
	const n = norm(stripDecorativeSymbols(label));
	if (!n) return true;
	if (AUDIO_STAGE_EXACT.has(n)) return true;
	return AUDIO_STAGE_PATTERNS.some((re) => re.test(n));
}

/** Cues de música, aplausos, SFX, etc. — eliminar del corpus. */
export function isNonContentCaptionText(text: string): boolean {
	const raw = stripDecorativeSymbols(cleanText(text));
	if (!raw) return true;

	const inner = unwrapStageLabel(raw);
	const nInner = norm(inner);

	if (inner !== raw && isAudioStageLabel(nInner)) return true;
	if (/^[\[(][^\])]{1,60}[\])]$/.test(raw) && isAudioStageLabel(nInner)) return true;
	if (raw.length <= 40 && isAudioStageLabel(nInner)) return true;

	return false;
}

/** Quita prefijos/sufijos [Música], [Aplausos], etc. y deja solo habla útil. */
export function stripStageLabelsFromText(text: string): string {
	let t = stripDecorativeSymbols(cleanText(text));
	let changed = true;
	while (changed) {
		changed = false;
		const leading = t.replace(/^[\[(]([^\])]+)[\])]\s*/u, (full, inner: string) => {
			if (isAudioStageLabel(inner)) {
				changed = true;
				return "";
			}
			return full;
		});
		if (leading !== t) {
			t = leading.trim();
			continue;
		}
		const trailing = t.replace(/\s*[\[(]([^\])]+)[\])]$/u, (full, inner: string) => {
			if (isAudioStageLabel(inner)) {
				changed = true;
				return "";
			}
			return full;
		});
		if (trailing !== t) {
			t = trailing.trim();
			changed = true;
		}
	}
	return t;
}

export function sanitizeCaptionText(text: string): string | null {
	const t = stripStageLabelsFromText(text);
	if (!t || isNonContentCaptionText(t)) return null;
	return t;
}

export function filterNonContentCaptionSegments(segments: CaptionSegment[]): CaptionSegment[] {
	const out: CaptionSegment[] = [];
	for (const seg of segments) {
		const text = sanitizeCaptionText(seg.text);
		if (!text) continue;
		out.push({ ...seg, text });
	}
	return out;
}

/** Palabras al final de `a` que coinciden al inicio de `b` (solapamiento típico de VTT). */
function hasWordSuffixPrefixOverlap(a: string, b: string, minWords = 2): boolean {
	const aw = norm(a).split(" ").filter(Boolean);
	const bw = norm(b).split(" ").filter(Boolean);
	if (aw.length < minWords || bw.length < minWords) return false;
	const max = Math.min(aw.length, bw.length, 14);
	for (let n = max; n >= minWords; n -= 1) {
		if (aw.slice(-n).join(" ") === bw.slice(0, n).join(" ")) return true;
	}
	return false;
}

function segmentEndMs(seg: CaptionSegment): number | null {
	if (typeof seg.startMs !== "number" || typeof seg.durationMs !== "number") return null;
	return seg.startMs + seg.durationMs;
}

/** Al fusionar repeticiones: start mínimo, duration = máximo fin − start mínimo. */
function mergeSegmentTiming(absorbed: CaptionSegment, keeper: CaptionSegment): CaptionSegment {
	const starts = [absorbed.startMs, keeper.startMs].filter(
		(v): v is number => typeof v === "number",
	);
	const ends = [segmentEndMs(absorbed), segmentEndMs(keeper)].filter(
		(v): v is number => typeof v === "number",
	);
	const startMs = starts.length ? Math.min(...starts) : keeper.startMs;
	let durationMs = keeper.durationMs;
	if (starts.length && ends.length) {
		durationMs = Math.max(...ends) - Math.min(...starts);
	} else {
		const durations = [absorbed.durationMs, keeper.durationMs].filter(
			(v): v is number => typeof v === "number",
		);
		if (durations.length) durationMs = Math.max(...durations);
	}
	return { text: keeper.text, startMs, durationMs };
}

function isSupersededByLater(
	seg: CaptionSegment,
	later: CaptionSegment,
): boolean {
	const n = norm(seg.text);
	const nLater = norm(later.text);
	if (!n || !nLater || nLater.length <= n.length + 2) return false;
	if (nLater.startsWith(n)) return true;
	if (hasWordSuffixPrefixOverlap(seg.text, later.text) && nLater.length > n.length + 5) return true;
	return false;
}

/** Pase 1: cues consecutivos (rollo inmediato). */
function dedupeConsecutive(segments: CaptionSegment[]): CaptionSegment[] {
	const work = segments.map((s) => ({ ...s }));
	const out: CaptionSegment[] = [];

	for (let i = 0; i < work.length; i += 1) {
		const seg = work[i];
		const n = norm(seg.text);
		const next = work[i + 1];
		const nNext = next ? norm(next.text) : "";

		if (next && n === nNext) {
			work[i + 1] = mergeSegmentTiming(seg, next);
			continue;
		}

		if (
			next &&
			seg.durationMs != null &&
			seg.durationMs < 120 &&
			nNext &&
			(nNext.startsWith(n) || hasWordSuffixPrefixOverlap(seg.text, next.text))
		) {
			work[i + 1] = mergeSegmentTiming(seg, next);
			continue;
		}

		if (nNext && nNext.startsWith(n) && nNext.length > n.length + 2) {
			work[i + 1] = mergeSegmentTiming(seg, next);
			continue;
		}

		if (next && hasWordSuffixPrefixOverlap(seg.text, next.text) && nNext.length > n.length + 8) {
			work[i + 1] = mergeSegmentTiming(seg, next);
			continue;
		}

		const prev = out[out.length - 1];
		if (prev) {
			const nPrev = norm(prev.text);
			if (n === nPrev) {
				out[out.length - 1] = mergeSegmentTiming(seg, prev);
				continue;
			}
			if (n.startsWith(nPrev) && n.length > nPrev.length) {
				out[out.length - 1] = mergeSegmentTiming(prev, seg);
				continue;
			}
			if (nPrev.startsWith(n)) {
				out[out.length - 1] = mergeSegmentTiming(seg, prev);
				continue;
			}
			if (hasWordSuffixPrefixOverlap(prev.text, seg.text)) {
				if (nNext && (nNext.startsWith(n) || hasWordSuffixPrefixOverlap(seg.text, next.text))) {
					work[i + 1] = mergeSegmentTiming(seg, next);
					continue;
				}
				if (n.length <= nPrev.length + 12) {
					out[out.length - 1] = mergeSegmentTiming(seg, prev);
					continue;
				}
			}
		}

		out.push(seg);
	}

	return out;
}

/**
 * Pase 2: prefijo repetido con pausa en el VTT; absorbe timing en el cue que conserva el texto.
 */
function mergePrefixSupersededLater(
	segments: CaptionSegment[],
	maxGapMs = 120_000,
): CaptionSegment[] {
	const work = segments.map((s) => ({ ...s }));
	const removed = new Set<number>();

	for (let i = 0; i < work.length; i += 1) {
		if (removed.has(i)) continue;
		const seg = work[i];
		let target = -1;

		for (let j = i + 1; j < work.length; j += 1) {
			if (removed.has(j)) continue;
			const later = work[j];
			if (
				seg.startMs != null &&
				later.startMs != null &&
				later.startMs - seg.startMs > maxGapMs
			) {
				break;
			}
			if (!isSupersededByLater(seg, later)) continue;
			if (
				target < 0 ||
				norm(later.text).length > norm(work[target].text).length
			) {
				target = j;
			}
		}

		if (target >= 0) {
			work[target] = mergeSegmentTiming(seg, work[target]);
			removed.add(i);
		}
	}

	return work.filter((_, idx) => !removed.has(idx));
}

/**
 * Simplifica subtítulos YouTube ASR: quita repeticiones en rollo (consecutivas y con pausa).
 */
export function dedupeRollingCaptionSegments(segments: CaptionSegment[]): CaptionSegment[] {
	const cleaned = filterNonContentCaptionSegments(
		segments.map((seg) => ({ ...seg, text: cleanText(seg.text) })).filter((seg) => seg.text.length > 0),
	);
	if (cleaned.length <= 1) return cleaned;

	return mergePrefixSupersededLater(dedupeConsecutive(cleaned));
}
