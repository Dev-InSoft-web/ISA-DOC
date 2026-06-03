import type { CaptionSegment } from "../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";

export const CORPUS_SCHEMA_VERSION = 2;

/** Subconjunto estable de campos yt-dlp (info.json). */
export interface YtDlpVideoInfo {
	id: string;
	title?: string;
	fulltitle?: string;
	description?: string;
	duration?: number;
	duration_string?: string;
	upload_date?: string;
	timestamp?: number;
	view_count?: number;
	like_count?: number;
	comment_count?: number;
	channel?: string;
	channel_id?: string;
	channel_url?: string;
	channel_follower_count?: number;
	uploader?: string;
	uploader_id?: string;
	uploader_url?: string;
	categories?: string[];
	tags?: string[];
	language?: string;
	age_limit?: number;
	live_status?: string;
	availability?: string;
	playable_in_embed?: boolean;
	thumbnail?: string;
	thumbnails?: Array<{ url?: string; width?: number; height?: number; preference?: number }>;
	webpage_url?: string;
	original_url?: string;
	is_live?: boolean;
	was_live?: boolean;
	chapters?: Array<{ start_time?: number; end_time?: number; title?: string }>;
	heatmap?: unknown;
	formats?: Array<Record<string, unknown>>;
	requested_formats?: Array<Record<string, unknown>>;
	comments?: YtDlpComment[];
	/** Resto del dump crudo (por si yt-dlp añade campos). */
	_raw?: Record<string, unknown>;
}

export interface YtDlpComment {
	id?: string;
	parent?: string;
	text?: string;
	author?: string;
	author_id?: string;
	author_thumbnail?: string;
	like_count?: number;
	timestamp?: number;
	time_text?: string;
	is_favorited?: boolean;
	is_pinned?: boolean;
}

export interface OEmbedInfo {
	title?: string;
	author_name?: string;
	author_url?: string;
	provider_name?: string;
	thumbnail_url?: string;
	html?: string;
}

export interface VideoTechnicalSummary {
	bestFormatId?: string;
	container?: string;
	resolution?: string;
	width?: number;
	height?: number;
	fps?: number;
	vcodec?: string;
	acodec?: string;
	abr?: number;
	vbr?: number;
	tbr?: number;
	asr?: number;
	filesizeApprox?: number;
	formatCount?: number;
}

export interface VideoCorpusRecord {
	schemaVersion: typeof CORPUS_SCHEMA_VERSION;
	extractedAt: string;
	videoId: string;
	videoUrl: string;
	channel: {
		title: string;
		id: string;
		url: string;
		listUrl: string;
	};
	ytdlp: YtDlpVideoInfo;
	oembed?: OEmbedInfo;
	transcript: {
		method: string;
		languageCode?: string;
		dedupeVersion?: number;
		accentuationPunctuationCorrected?: boolean;
		accentuationPunctuationCorrectedAt?: string;
		accentuationPunctuationVersion?: number;
		accentuationPunctuationApi?: string;
		accentuationPunctuationModel?: string;
		accentuationPunctuationVia?: string;
		proofreadVersion?: number;
		proofreadAt?: string;
		proofreadApi?: string;
		proofreadModel?: string;
		segmentCount: number;
		transcriptChars: number;
		segments: CaptionSegment[];
		plainText: string;
	};
	comments: {
		fetched: number;
		reportedCount?: number;
		items: YtDlpComment[];
	};
	technical: VideoTechnicalSummary;
	files: {
		md: string;
		json: string;
		infoJson: string;
	};
}
