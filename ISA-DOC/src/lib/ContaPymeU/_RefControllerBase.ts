/**
 * Shim for ISW `$lib/ContaPymeU/_RefControllerBase`.
 * Solo se necesita el tipo para satisfacer imports del TreeView copiado.
 */
import type { TObject } from "@ingenieria_insoft/ispgen";

export interface TCatalogoSecurityController<T extends TObject = TObject> {
	bindRecord?: (record: T) => unknown;
	[k: string]: unknown;
}
