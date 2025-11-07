export class InvalidOperationsError extends Error {
	constructor(message?: string) {
		super(message ?? "The desired operation cannot be performed!");
	}
}
