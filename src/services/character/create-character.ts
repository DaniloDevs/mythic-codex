import type { Character, CharacterCreateInput } from "@/@types/character";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ICharacterRepository } from "@/repository/character-repository";
import type { IUserRepository } from "@/repository/user-repository";

interface RequestData {
	characterData: CharacterCreateInput;
}

interface ResponseData {
	character: Character;
}

export class CreateCharacterService {
	constructor(
		private characterRepository: ICharacterRepository,
		private userRepository: IUserRepository,
	) {}

	async execute({ characterData }: RequestData): Promise<ResponseData> {
		const alredyExistUser = await this.userRepository.getById(characterData.userId);

		if (!alredyExistUser) {
			throw new ResourceNotFoundError();
		}

		const character = await this.characterRepository.create(characterData);

		return { character };
	}
}
