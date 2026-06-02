/**
 * Commits visibles en tablas de tickets: solo trabajo de Jeff-Aporta (jeff-aporta).
 * Los de otros devs se omiten aunque estén en el array del registro.
 */

/** Nombre canónico en git (`git log --format=%an`). */
export const TICKET_COMMIT_AUTHOR_JEFF = "Jeff-Aporta";

const JEFF_AUTOR_RE = /jeff[\s-]?aporta/i;

/** Autores explícitos que nunca deben aparecer en la tabla. */
const AUTORES_EXCLUIDOS = new Set([
	"pedro rendon",
	"pedro rendón",
]);

export function esCommitAutorJeff(autor?: string): boolean {
	const norm = (autor ?? "").trim().toLowerCase();
	if (!norm) return true;
	if (AUTORES_EXCLUIDOS.has(norm)) return false;
	return JEFF_AUTOR_RE.test(norm);
}

export function filtrarCommitsJeff(commits: { autor?: string }[]): typeof commits {
	return commits.filter((c) => esCommitAutorJeff(c.autor));
}
