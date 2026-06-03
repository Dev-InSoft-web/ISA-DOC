import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

export type TokenKind = "patyia" | "clientesis" | "default";

const FILE_BY_KIND: Record<TokenKind, string> = {
	patyia: "token.patyia.json",
	clientesis: "token.clientesis.json",
	default: "token.json",
};

/** Rutas candidatas en orden de prioridad (primera existente gana). */
export function tokenFileCandidates(kind: TokenKind, root = process.cwd()): string[] {
	const fileName = FILE_BY_KIND[kind];
	const envFile =
		kind === "patyia"
			? process.env.PATYIA_TOKEN_FILE?.trim()
			: kind === "clientesis"
				? process.env.CLIENTESIS_TOKEN_FILE?.trim()
				: process.env.TOKEN_FILE?.trim();
	const out: string[] = [];
	if (envFile) out.push(resolve(envFile));
	out.push(join(root, "secrets", "tokens", fileName));
	out.push(join(root, fileName));
	return out;
}

export function findTokenFile(kind: TokenKind, root = process.cwd()): string | null {
	for (const p of tokenFileCandidates(kind, root)) {
		if (existsSync(p)) return p;
	}
	return null;
}
