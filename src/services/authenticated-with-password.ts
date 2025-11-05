import bcrypt from "bcryptjs";
import { InvalidCredentialsError } from "@/_errors/invalid-credentials";
import type { IUserRepository, User } from "@/repository/user-repository";

interface RequestAuthenticatedWithPassword {
	email: string;
	password: string;
}

interface ResponseAuthenticatedWithPassword {
	user: User;
}

export class AuthenticatedWithPasswordService {
	constructor(private userRepository: IUserRepository) {}

	async execute({
		email,
		password,
	}: RequestAuthenticatedWithPassword): Promise<ResponseAuthenticatedWithPassword> {
		const alreadyExistUser = await this.userRepository.getByEmail(email);

		if (!alreadyExistUser) {
			throw new InvalidCredentialsError();
		}

		const passwordIsCorrect = await bcrypt.compare(
			password,
			alreadyExistUser.passwordHash,
		);
		if (!passwordIsCorrect) {
			throw new InvalidCredentialsError();
		}

		return { user: alreadyExistUser };
	}
}
