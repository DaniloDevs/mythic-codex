import bcrypt from "bcryptjs";
import { InvalidTokenError } from "@/_errors/invalid-credentials copy";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ITokensRepository } from "@/repository/tokens-repository";
import type { IUserRepository } from "@/repository/user-repository";

interface RequestResetPassword {
	code: string;
	newPassword: string;
}

interface ResponseResetPassword {
	userId: string;
}

export class ResetPasswordService {
	constructor(
		private tokensRepository: ITokensRepository,
		private userRepository: IUserRepository,
	) {}

	async execute({
		code,
		newPassword,
	}: RequestResetPassword): Promise<ResponseResetPassword> {
		const existToken = await this.tokensRepository.getTokenByCode(code);

		if (!existToken) {
			throw new InvalidTokenError("Recover Token is invalid");
		}

		const user = await this.userRepository.getById(existToken.userId);

		if (!user) {
			throw new ResourceNotFoundError();
		}

		const newPasswordHash = await bcrypt.hash(newPassword, 6);

		await this.userRepository.update({
			userId: user.id,
			data: {
				password: newPasswordHash,
			},
		});

		return { userId: user.id };
	}
}
