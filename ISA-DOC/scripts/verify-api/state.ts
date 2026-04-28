/** Estado compartido entre módulos de verify-api. */
export interface CreatedEntity {
	name: string;
	apiName: string;
	listName: string;
	idKey?: string;
	allTestIds?: Array<string | number>;
	idPath1?: string;
	extras?: Array<Record<string, unknown>>;
	composite?: boolean;
	pkKeys?: string[];
	allPks?: Array<Record<string, unknown>>;
	getIdStr?: (obj: Record<string, unknown>) => string;
	icon: string;
}

export const createdEntities: CreatedEntity[] = [];
export let token = "";
export function setToken(t: string): void {
	token = t;
}
export function getToken(): string {
	return token;
}
