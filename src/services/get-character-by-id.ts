import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { Character, ICharacterRepository } from "@/repository/character-repository";

interface RequestGetCharacter {
	id: string;
}

interface ResponseGetCharacter<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> {
	character: Character<TSheet, TInventory>;
}

export class GetCharacterService<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
	TSheetInput extends Record<string, any> = TSheet,
> {
	constructor(private characterRepository: ICharacterRepository<TSheet, TInventory>) {}

	protected transformSheet(sheet: TSheetInput): TSheet {
		return sheet as unknown as TSheet;
	}

	async execute({
		id,
	}: RequestGetCharacter): Promise<ResponseGetCharacter<TSheet, TInventory>> {
		const character = await this.characterRepository.getById(id);

		if (!character) {
			throw new ResourceNotFoundError();
		}

		return { character };
	}
}
