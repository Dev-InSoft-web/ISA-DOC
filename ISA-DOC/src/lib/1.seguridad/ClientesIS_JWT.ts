/**
 * Shim for ISW `$lib/1.seguridad/ClientesIS_JWT`.
 */
export interface TJWTAuth {
	usuario?: string;
	icontacto?: number;
	roles?: string[];
	[k: string]: unknown;
}
