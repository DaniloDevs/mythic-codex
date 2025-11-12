import type { Dice } from "@/@types/dice";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { IRollsRepository } from "@/repository/rolls-repository";
import type { IUserRepository } from "@/repository/user-repository";

interface RequestData {
	userId: string;
}

interface ResponseData {
	historyRolls: Dice[];
}

export class FetchHistoryRollsByUserIdService {
	constructor(
		private userRepository: IUserRepository,
		private rollsRepository: IRollsRepository,
	) {}

	async execute({ userId }: RequestData): Promise<ResponseData> {
		const user = await this.userRepository.getById(userId);

		if (!user) {
			throw new ResourceNotFoundError("User not found!");
		}

		const historyRolls = await this.rollsRepository.fetchHistoryByUserId(userId);

		return { historyRolls };
	}
}
