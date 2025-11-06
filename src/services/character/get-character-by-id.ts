import type { Character } from "@/@types/character";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ICharacterRepository } from "@/repository/character-repository";

interface RequestData {
	id: string;
}

interface ResponseData<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> {
	character: Character<TSheet, TInventory>;
}

export class GetCharacterService<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> {
	constructor(private characterRepository: ICharacterRepository<TSheet, TInventory>) {}

	async execute({ id }: RequestData): Promise<ResponseData<TSheet, TInventory>> {
		const character = await this.characterRepository.getById(id);

		if (!character) {
			throw new ResourceNotFoundError();
		}

		return { character };
	}
}
