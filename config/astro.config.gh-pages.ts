import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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
	site: "https://dev-insoft-web.github.io",
	base: "/ISA-DOC",
	output: "static",
	outDir: path.join(ROOT, "dist-gh-pages"),
	integrations: [
		svelte({
			configFile: path.join(ROOT, "config/svelte.config.ts"),
			extensions: [".svelte"],
			emitCss: true,
		}),
	],
	vite: {
		plugins: [inlineImagePlugin()],
		resolve: {
			alias: {
				$lib: path.join(ROOT, "src/lib"),
				$components: path.join(ROOT, "src/components"),
			},
		},
	},
});
