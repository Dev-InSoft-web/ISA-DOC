import { mount } from "svelte";
import App from "./App.svelte";

if ("THEME_PREFERENCE_KEY" in localStorage)
	localStorage.getItem("THEME_PREFERENCE_KEY") === "dark"
		? window.document.documentElement.classList.add("dark")
		: window.document.documentElement.classList.remove("dark");
else if (window.matchMedia("(prefers-color-scheme: dark)").matches) window.document.documentElement.classList.add("dark");

mount(App, {
	target: document.getElementById('app')!,
});
