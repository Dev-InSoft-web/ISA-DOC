/** Estado compartido entre módulos de verify-api-patyia. */
export interface RunState {
	token: string;
	iconversacion: number | null;
	itiquete: number | null;
	ok: number;
	fail: number;
}

export const state: RunState = {
	token: "",
	iconversacion: null,
	itiquete: null,
	ok: 0,
	fail: 0,
};

export function setToken(t: string): void { state.token = t; }
export function getToken(): string { return state.token; }
