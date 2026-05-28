/** Estado compartido entre módulos de verify-api-patyia. */
export interface RunState {
	token: string;
	iconversacion: number | null;
	/** true = la creó el script (es seguro borrarla en cleanup); false = prestada de la lista. */
	iconversacionOwned: boolean;
	itiquete: number | null;
	itiqueteOwned: boolean;
	ok: number;
	fail: number;
}

export const state: RunState = {
	token: "",
	iconversacion: null,
	iconversacionOwned: false,
	itiquete: null,
	itiqueteOwned: false,
	ok: 0,
	fail: 0,
};

export function setToken(t: string): void { state.token = t; }
export function getToken(): string { return state.token; }
