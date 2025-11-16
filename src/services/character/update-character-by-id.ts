import type { Character } from "@/@types/character";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ICharacterRepository } from "@/repository/character-repository";
import type { DeepPartial } from "@/utils/deep-partial";

export interface RequestData {
	characterId: string;
	updateData: DeepPartial<Character>;
}

export interface ResponseData {
	character: Character;
}

export class UpdateCharacterByIdService {
	constructor(private characterReposirtoy: ICharacterRepository) {}

	async execute({ characterId, updateData }: RequestData): Promise<ResponseData> {
		if (Object.keys(updateData).length === 0) {
			throw new ResourceNotFoundError("No data provided to update the character");
		}

		const character = await this.characterReposirtoy.updateById(characterId, updateData);

		if (!character) {
			throw new ResourceNotFoundError("Character not found");
		}

		return { character };
	}
}
