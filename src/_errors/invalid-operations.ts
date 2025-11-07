export class InvalidOperationsError extends Error {
	constructor(message?: string) {
		super(message ?? "Invalid operation");
	}
}
