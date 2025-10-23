import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type {
	Character,
	CharacterCreateInput,
	ICharacterRepository,
} from "@/repository/character-repository";
import type { IUserRepository } from "@/repository/user-repository";

interface RegisterCharacterResponse {
	character: Character<any, any>;
}

export class CreateCharacterService<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> {
	constructor(
		private characterRepository: ICharacterRepository<TSheet, TInventory>,
		private userRepository: IUserRepository,
	) {}

	async execute(
		characterData: CharacterCreateInput,
		sheet: TSheet,
		inventory: TInventory,
	): Promise<RegisterCharacterResponse> {
		const existUser = await this.userRepository.getById(characterData.userId);

		if (!existUser) {
			throw new ResourceNotFoundError();
		}

		const character = await this.characterRepository.create(
			characterData,
			sheet,
			inventory,
		);

		return { character };
	}
}
