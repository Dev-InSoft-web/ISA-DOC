import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import type { ViteDevServer } from "vite";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function wsPlugin() {
	let started = false;
	return {
		name: "isa-ws-init",
		configureServer(server: ViteDevServer) {
			if (started) return;
			started = true;
			server.ssrLoadModule(path.join(ROOT, "src/socket-init.ts")).catch((e: unknown) => {
				console.error("[Socket.IO] init error:", e);
			});
		},
	};
}

const MIME: Record<string, string> = {
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".png": "image/png",
	".gif": "image/gif",
	".webp": "image/webp",
};

function inlineImagePlugin() {
	return {
		name: "isa-inline-image",
		enforce: "pre" as const,
		load(id: string) {
			const [filePath, query] = id.split("?");
			if (!query) return null;
			const params = new URLSearchParams(query);
			if (!params.has("inline")) return null;
			const ext = path.extname(filePath).toLowerCase();
			const mime = MIME[ext];
			if (!mime) return null;
			const buf = fs.readFileSync(filePath);
			const dataUri = `data:${mime};base64,${buf.toString("base64")}`;
			return `export default ${JSON.stringify(dataUri)};`;
		},
	};
}

export default defineConfig({
	root: ROOT,
	srcDir: path.join(ROOT, "src"),
	publicDir: path.join(ROOT, "public"),
	integrations: [
		svelte({
			configFile: path.join(ROOT, "config/svelte.config.ts"),
			extensions: [".svelte"],
			emitCss: true,
		}),
	],
	output: "server",
	adapter: node({ mode: "standalone" }),
	vite: {
		optimizeDeps: {
			include: [
				"@ingenieria_insoft/ispgen",
				"@codemirror/autocomplete",
				"@codemirror/commands",
				"@codemirror/lang-html",
				"@codemirror/lang-javascript",
				"@codemirror/lang-json",
				"@codemirror/lang-sql",
				"@codemirror/language",
				"@codemirror/state",
				"@codemirror/theme-one-dark",
				"@codemirror/view",
				"@lezer/highlight",
			],
		},
		plugins: [wsPlugin(), inlineImagePlugin()],
		server: {
			watch: {
				ignored: [
					"**/data/openai-storage/files/**",
					"**/data/openai-storage/backup-progress.json",
					"**/data/openai-storage/duplicates.json",
				],
			},
		},
		resolve: {
			alias: {
				$lib: path.join(ROOT, "src/lib"),
				$components: path.join(ROOT, "src/components"),
				$comps: path.join(ROOT, "isp-svelte/src/lib"),
			},
		},
	},
});
