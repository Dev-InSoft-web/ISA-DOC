import { writable } from "svelte/store";

export interface ToastMessage {
	type: "error" | "success" | "info" | "warning";
	text: string;
	timeout?: number;
}

export const toasts = writable<ToastMessage[]>([]);

function pushToast(t: ToastMessage): void {
	toasts.update((arr) => [...arr, t]);
	const ms = t.timeout ?? 4000;
	if (ms > 0) {
		setTimeout(() => toasts.update((arr) => arr.slice(1)), ms);
	}
}

export function toastError(text: string, timeout?: number): void {
	pushToast({ type: "error", text, timeout });
	if (typeof console !== "undefined") console.error("[ISA]", text);
}

export function toastSuccess(text: string, timeout?: number): void {
	pushToast({ type: "success", text, timeout });
}

export function toastInfo(text: string, timeout?: number): void {
	pushToast({ type: "info", text, timeout });
}

export function toastWarning(text: string, timeout?: number): void {
	pushToast({ type: "warning", text, timeout });
}
