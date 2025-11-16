import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ICharacterRepository } from "@/repository/character-repository";
import type { IUserRepository } from "@/repository/user-repository";
import type { Character } from "./../../@types/character";

interface RequestData {
	userId: string;
}
interface ResponseData {
	characters: Character[];
}

export class FetchCharacterByIdService {
	constructor(
		private characterRepository: ICharacterRepository,
		private userRepository: IUserRepository,
	) {}

	async execute({ userId }: RequestData): Promise<ResponseData> {
		const user = await this.userRepository.getById(userId);

		if (!user) {
			throw new ResourceNotFoundError("User not found!");
		}

		const characters = await this.characterRepository.fetchByUserId(userId);

		return { characters };
	}
}
