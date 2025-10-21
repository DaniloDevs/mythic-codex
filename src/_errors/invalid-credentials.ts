export class InvalidCredentialsError extends Error {
	constructor() {
		super("Your credentials are wrong!");
	}
}
