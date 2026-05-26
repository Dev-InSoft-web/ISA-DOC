import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";

export default defineConfig({
	plugins: [svelte()],
	publicDir: "static",
	base: "/ISP-SvelteComponents/",
	resolve: {
		alias: {
			$lib: path.resolve(__dirname, "../../ISP-SvelteComponents/src/lib"),
			$mylib: path.resolve(__dirname, "./src/lib"),
		},
	},
	build: {
		outDir: "dist-gh-pages",
		emptyOutDir: true,
		sourcemap: false,
	},
});
