import type { CaptionSegment } from "../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";
import type { VideoCorpusRecord, YtDlpComment } from "./youtube-types.ts";

export function formatTimestamp(ms: number | null): string {
	if (ms == null || !Number.isFinite(ms)) return "??:??:??.???";
	const h = Math.floor(ms / 3_600_000);
	const m = Math.floor((ms % 3_600_000) / 60_000);
	const s = Math.floor((ms % 60_000) / 1000);
	const frac = Math.floor(ms % 1000);
	return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(frac).padStart(3, "0")}`;
}

export function formatUploadDate(yyyymmdd?: string): string {
	if (!yyyymmdd || yyyymmdd.length !== 8) return yyyymmdd ?? "—";
	return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
}

function mdCell(value: string | number | boolean | undefined | null): string {
	if (value === undefined || value === null || value === "") return "—";
	return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function mdBlock(text: string | undefined): string {
	if (!text?.trim()) return "_Sin descripción._";
	return text.trim().replace(/\r\n/g, "\n");
}

function formatCommentTs(ts?: number): string {
	if (ts == null) return "—";
	try {
		return new Date(ts * 1000).toISOString();
	} catch {
		return String(ts);
	}
}

export function segmentsToTimestampedLines(segments: CaptionSegment[]): string {
	return segments
		.map((seg) => {
			const line = seg.text.replace(/\r/g, "").trim();
			if (!line) return "";
			return `[${formatTimestamp(seg.startMs)}] ${line}`;
		})
		.filter(Boolean)
		.join("\n");
}

function renderComments(comments: YtDlpComment[], maxInMd = 80): string {
	if (!comments.length) return "_No hay comentarios recuperados (o el video no tiene comentarios públicos)._";
	const lines = [
		`| # | Autor | Me gusta | Fecha (UTC) | Texto |`,
		`| ---: | --- | ---: | --- | --- |`,
	];
	const slice = comments.slice(0, maxInMd);
	for (let i = 0; i < slice.length; i += 1) {
		const c = slice[i];
		const text = mdCell(c.text).slice(0, 500);
		lines.push(
			`| ${i + 1} | ${mdCell(c.author)} | ${mdCell(c.like_count)} | ${formatCommentTs(c.timestamp)} | ${text} |`,
		);
	}
	if (comments.length > maxInMd) {
		lines.push("", `_… y ${comments.length - maxInMd} comentarios más en el JSON del video (\`.json\` / \`.info.json\`)._`);
	}
	return lines.join("\n");
}

/** Markdown completo por video (un archivo = un video). */
export function videoCorpusMarkdown(record: VideoCorpusRecord): string {
	const y = record.ytdlp;
	const t = record.technical;
	const title = y.title ?? record.videoId;

	const tags = (y.tags ?? []).join(", ") || "—";
	const categories = (y.categories ?? []).join(", ") || "—";
	const thumb = y.thumbnail ?? record.oembed?.thumbnail_url ?? "—";

	const lines = [
		"---",
		`schemaVersion: ${record.schemaVersion}`,
		`videoId: ${record.videoId}`,
		`source: youtube:${record.videoId}`,
		`title: ${JSON.stringify(title)}`,
		`duration_seconds: ${y.duration ?? ""}`,
		`view_count: ${y.view_count ?? ""}`,
		`like_count: ${y.like_count ?? ""}`,
		`comment_count: ${y.comment_count ?? ""}`,
		`upload_date: ${y.upload_date ?? ""}`,
		`transcript_segments: ${record.transcript.segmentCount}`,
		`description_chars: ${(y.description ?? "").length}`,
		`extracted_at: ${record.extractedAt}`,
		"---",
		"",
		`# ${title}`,
		"",
		"## Identificación",
		"",
		"| Campo | Valor |",
		"| --- | --- |",
		`| **Video ID** | \`${record.videoId}\` |`,
		`| **URL** | ${record.videoUrl} |`,
		`| **Título (yt-dlp)** | ${mdCell(y.title)} |`,
		`| **Título (oEmbed)** | ${mdCell(record.oembed?.title)} |`,
		`| **Canal** | ${mdCell(y.channel)} |`,
		`| **Canal ID** | \`${mdCell(y.channel_id)}\` |`,
		`| **URL canal** | ${mdCell(y.channel_url)} |`,
		`| **Lista del canal** | ${record.channel.listUrl} |`,
		`| **Uploader** | ${mdCell(y.uploader)} (${mdCell(y.uploader_id)}) |`,
		`| **Idioma** | ${mdCell(y.language)} |`,
		`| **Estado live** | ${mdCell(y.live_status)} |`,
		`| **Disponibilidad** | ${mdCell(y.availability)} |`,
		"",
		"## Métricas",
		"",
		"| Métrica | Valor |",
		"| --- | ---: |",
		`| Vistas | ${mdCell(y.view_count)} |`,
		`| Me gusta | ${mdCell(y.like_count)} |`,
		`| Comentarios (reportados) | ${mdCell(y.comment_count)} |`,
		`| Comentarios (extraídos) | ${record.comments.fetched} |`,
		`| Duración | ${mdCell(y.duration_string)} (${mdCell(y.duration)} s) |`,
		`| Fecha publicación | ${formatUploadDate(y.upload_date)} |`,
		`| Segmentos transcripción | ${record.transcript.segmentCount} |`,
		`| Caracteres transcripción | ${record.transcript.transcriptChars} |`,
		"",
		"## Descripción",
		"",
		mdBlock(y.description),
		"",
		"## Clasificación",
		"",
		`| Categorías | ${mdCell(categories)} |`,
		`| Etiquetas | ${tags} |`,
		"",
		"## Información técnica (yt-dlp)",
		"",
		"| Campo | Valor |",
		"| --- | --- |",
		`| Mejor formato | ${mdCell(t.bestFormatId)} |`,
		`| Contenedor | ${mdCell(t.container)} |`,
		`| Resolución | ${mdCell(t.resolution)} |`,
		`| Dimensiones | ${t.width ?? "—"}×${t.height ?? "—"} |`,
		`| FPS | ${mdCell(t.fps)} |`,
		`| Video codec | ${mdCell(t.vcodec)} |`,
		`| Audio codec | ${mdCell(t.acodec)} |`,
		`| Tasa audio (abr) | ${mdCell(t.abr)} |`,
		`| Tasa video (vbr) | ${mdCell(t.vbr)} |`,
		`| Tasa total (tbr) | ${mdCell(t.tbr)} |`,
		`| Sample rate | ${mdCell(t.asr)} |`,
		`| Tamaño aprox. | ${t.filesizeApprox != null ? `${Math.round(t.filesizeApprox / 1024 / 1024)} MiB` : "—"} |`,
		`| Formatos listados | ${mdCell(t.formatCount)} |`,
		`| Embebible | ${mdCell(y.playable_in_embed)} |`,
		`| Límite edad | ${mdCell(y.age_limit)} |`,
		"",
		"### Miniatura principal",
		"",
		thumb !== "—" ? `![](${thumb})` : "_Sin miniatura._",
		"",
	];

	if (y.chapters?.length) {
		lines.push("## Capítulos", "", "| Inicio | Título |", "| --- | --- |");
		for (const ch of y.chapters) {
			const start = ch.start_time != null ? formatTimestamp(ch.start_time * 1000) : "—";
			lines.push(`| ${start} | ${mdCell(ch.title)} |`);
		}
		lines.push("");
	}

	lines.push(
		"## Comentarios (muestra)",
		"",
		"> Origen: yt-dlp `--write-comments`. Pueden faltar si YouTube limita la API o el video no tiene comentarios.",
		"",
		renderComments(record.comments.items),
		"",
		"## Transcripción (subtítulos / ASR)",
		"",
		`| Método | ${record.transcript.method} |`,
		`| Idioma track | ${mdCell(record.transcript.languageCode)} |`,
		"",
		"> Texto automático de YouTube; puede contener errores en nombres y siglas.",
		"",
		"### Con marcas de tiempo",
		"",
		segmentsToTimestampedLines(record.transcript.segments) || "_Sin segmentos._",
		"",
		"### Texto para referencia (RAG indexa `transcript.segments` del `.json`, uno por cue con `startMs`)",
		"",
		"```text",
		record.transcript.plainText.slice(0, 50_000) + (record.transcript.plainText.length > 50_000 ? "\n… [truncado]" : ""),
		"```",
		"",
		"## Extracción",
		"",
		`| Extraído (UTC) | ${record.extractedAt} |`,
		`| Schema | ${record.schemaVersion} |`,
		`| JSON | \`${record.files.json}\` |`,
		`| yt-dlp crudo | \`${record.files.infoJson}\` |`,
		"",
	);

	return lines.join("\n");
}

export function corpusHeader(opts: {
	channelTitle: string;
	channelUrl: string;
	videoCount: number;
	okCount: number;
	extractedAt: string;
}): string {
	return [
		"# Corpus YouTube (join) · ContaPyme Software Contable",
		"",
		"Archivo **concatenado** para embedding en FitDocs RAG. Cada video tiene su propio `.md` en `videos/` con metadatos completos.",
		"",
		"| Campo | Valor |",
		"| --- | --- |",
		`| **Canal** | [ContaPyme Software Contable](${opts.channelUrl}) |`,
		`| **Videos en manifest** | ${opts.videoCount} |`,
		`| **Con transcripción** | ${opts.okCount} |`,
		`| **Generado (UTC)** | ${opts.extractedAt} |`,
		"",
		"**RAG:** indexar `videos/{id}.json` → un embedding por `transcript.segments[]` con `startMs` → cita `watch?v={id}&t=Ns`.",
		"",
		"---",
		"",
	].join("\n");
}

/** Sección resumida en corpus.md (join para embedding). */
export function corpusVideoSection(record: VideoCorpusRecord): string {
	const y = record.ytdlp;
	const title = y.title ?? record.videoId;
	return [
		`## ${title}`,
		"",
		`<!-- videoId: ${record.videoId} -->`,
		"",
		`- **URL:** ${record.videoUrl}`,
		`- **Publicado:** ${formatUploadDate(y.upload_date)} · **Duración:** ${mdCell(y.duration_string)}`,
		`- **Vistas:** ${mdCell(y.view_count)} · **Likes:** ${mdCell(y.like_count)} · **Comentarios:** ${mdCell(y.comment_count)} (extraídos: ${record.comments.fetched})`,
		`- **Etiquetas:** ${(y.tags ?? []).slice(0, 12).join(", ") || "—"}`,
		"",
		"### Descripción",
		"",
		mdBlock(y.description),
		"",
		"### Transcripción",
		"",
		segmentsToTimestampedLines(record.transcript.segments) || "_Sin transcripción._",
		"",
		"---",
		"",
	].join("\n");
}
