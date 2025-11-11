import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ICharacterRepository } from "@/repository/character-repository";
import type { IUserRepository } from "@/repository/user-repository";
import type { Character } from "./../../@types/character";

interface RequestData {
	userId: string;
}
interface ResponseData<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> {
	characters: Character<TSheet, TInventory>[];
}

export class FetchCharacterByIdService<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> {
	constructor(
		private characterRepository: ICharacterRepository<TSheet, TInventory>,
		private userRepository: IUserRepository,
	) {}

	async execute({ userId }: RequestData): Promise<ResponseData<TSheet, TInventory>> {
		const user = await this.userRepository.getById(userId);

		if (!user) {
			throw new ResourceNotFoundError("User not found!");
		}

		const characters = await this.characterRepository.fetchByUserId(userId);

		return { characters };
	}
}
