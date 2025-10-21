import bcrypt from "bcryptjs";
import { InvalidCredentialsError } from "@/_errors/invalid-credentials";
import type { IUserRepository } from "@/repository/user-repository";

interface AuthenticatedWithPasswordResponse {
	email: string;
	password: string;
}

export class AuthenticatedWithPasswordService {
	constructor(private userRepository: IUserRepository) {}

	async execute(data: AuthenticatedWithPasswordResponse) {
		const userExist = await this.userRepository.getByEmail(data.email);

		if (!userExist) {
			throw new InvalidCredentialsError();
		}

		const passwordIsCorrect = await bcrypt.compare(
			data.password,
			userExist.passwordHash,
		);
		if (!passwordIsCorrect) {
			throw new InvalidCredentialsError();
		}

		return { user: userExist };
	}
}
