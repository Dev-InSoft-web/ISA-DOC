/// <reference path="../.astro/types.d.ts" />

declare module "*.jpg?inline" {
	const dataUri: string;
	export default dataUri;
}
declare module "*.png?inline" {
	const dataUri: string;
	export default dataUri;
}
