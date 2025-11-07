import type { Character } from "@/@types/character";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ICharacterRepository } from "@/repository/character-repository";

export interface RequestData<TSheet extends Record<string, any>> {
	characterId: string;
	updateData: Partial<Character<TSheet>>;
}

export interface ResponseData<TSheet extends Record<string, any>> {
	character: Character<TSheet>;
}

export class UpdateCharacterByIdService<TSheet extends Record<string, any>> {
	constructor(private characterReposirtoy: ICharacterRepository<TSheet>) {}

	async execute({
		characterId,
		updateData,
	}: RequestData<TSheet>): Promise<ResponseData<TSheet>> {
		const character = await this.characterReposirtoy.getById(characterId);

		if (!character) {
			throw new ResourceNotFoundError("Character not found");
		}

		await this.characterReposirtoy.updateById(characterId, updateData);

		return { character };
	}
}
