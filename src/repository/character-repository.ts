import type { Character, CharacterCreateInput } from "@/@types/character";

export interface ICharacterRepository<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> {
	create(
		character: CharacterCreateInput,
		sheet: TSheet,
		inventory: TInventory,
	): Promise<Character<TSheet, TInventory>>;

	getById(id: string): Promise<Character<TSheet, TInventory> | null>;
	updateById(
		id: string,
		updateData: Partial<Character<TSheet, TInventory>>,
	): Promise<Character<TSheet, TInventory> | null>;
}
