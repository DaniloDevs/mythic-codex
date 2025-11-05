import dayjs from "dayjs";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ITokensRepository, Tokens } from "@/repository/tokens-repository";
import type { IUserRepository } from "@/repository/user-repository";

interface RequestRecoverPassword {
	type: "RECOVER_PASSWORD";
	userId: string;
}

interface ResponseRecoverPassword {
	token: Tokens;
}

export class RecoverPasswordService {
	constructor(
		private tokensRepository: ITokensRepository,
		private userRepository: IUserRepository,
	) {}

	async execute({
		type,
		userId,
	}: RequestRecoverPassword): Promise<ResponseRecoverPassword> {
		const existUser = await this.userRepository.getById(userId);

		if (!existUser) {
			throw new ResourceNotFoundError();
		}

		const tokensUser = await this.tokensRepository.getTokensByUserId(userId);
		const lastToken = tokensUser[0];

		if (lastToken) {
			const distanceInMinutesFromTokenCreation = dayjs().diff(
				lastToken.createdAt,
				"minutes",
			);

			if (distanceInMinutesFromTokenCreation < 30) {
				throw new Error();
			}
		}

		const token = await this.tokensRepository.createToken({
			type,
			userId,
		});

		return { token };
	}
}
