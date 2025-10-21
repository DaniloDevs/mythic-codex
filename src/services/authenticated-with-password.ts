import bcrypt from "bcryptjs";
import { InvalidCredentialsError } from "@/_errors/invalid-credentials";
import type { IUserRepository, User } from "@/repository/user-repository";

interface AuthenticatedWithPasswordRequest {
	email: string;
	password: string;
}

interface AuthenticatedWithPasswordResponse {
	user: User;
}

export class AuthenticatedWithPasswordService {
	constructor(private userRepository: IUserRepository) {}

	async execute(
		data: AuthenticatedWithPasswordRequest,
	): Promise<AuthenticatedWithPasswordResponse> {
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
