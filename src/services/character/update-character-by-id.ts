import type { Character } from "@/@types/character";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ICharacterRepository } from "@/repository/character-repository";
import type { DeepPartial } from "@/utils/deep-partial";

export interface RequestData<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> {
	characterId: string;
	updateData: DeepPartial<Character<TSheet, TInventory>>;
}

export interface ResponseData<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> {
	character: Character<TSheet, TInventory>;
}

export class UpdateCharacterByIdService<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> {
	constructor(private characterReposirtoy: ICharacterRepository<TSheet, TInventory>) {}

	async execute({
		characterId,
		updateData,
	}: RequestData<TSheet, TInventory>): Promise<ResponseData<TSheet, TInventory>> {
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
