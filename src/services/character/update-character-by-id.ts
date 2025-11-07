import th from "zod/v4/locales/th.js";
import type { Character } from "@/@types/character";
import { InvalidOperationsError } from "@/_errors/invalid-operations";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ICharacterRepository } from "@/repository/character-repository";

export interface RequestData<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> {
	characterId: string;
	updateData: Partial<Character<TSheet, TInventory>>;
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
		const character = await this.characterReposirtoy.getById(characterId);

		if (Object.keys(updateData).length === 0) {
			throw new InvalidOperationsError("No data provided for update");
		}

		if (!character) {
			throw new ResourceNotFoundError("Character not found");
		}

		await this.characterReposirtoy.updateById(characterId, updateData);

		return { character };
	}
}
