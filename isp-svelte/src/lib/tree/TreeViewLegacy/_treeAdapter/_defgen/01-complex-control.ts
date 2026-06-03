export class ComplexControl<TCtx extends {}> {
	protected readonly context: TCtx;
	constructor(defaults: TCtx) {
		this.context = defaults;
	}
	onstateupdate(ctx: TCtx): void {
		Object.defineProperties(this.context, Object.getOwnPropertyDescriptors(ctx));
	}
}
