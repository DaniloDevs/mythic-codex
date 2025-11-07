import type {
	Character,
	CharacterCreateInput,
	CharacterUpdateInput,
} from "@/@types/character";

export interface ICharacterRepository<TSheet extends Record<string, any>> {
	create(character: CharacterCreateInput, sheet: TSheet): Promise<Character<TSheet>>;

	getById(id: string): Promise<Character<TSheet> | null>;
	updateById(
		id: string,
		updateData: CharacterUpdateInput,
	): Promise<Character<TSheet> | null>;
}
