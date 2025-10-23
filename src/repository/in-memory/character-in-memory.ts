import { randomUUID } from "node:crypto";
import { createSlug } from "@/utils/create-slug";
import type {
	Character,
	CharacterCreateInput,
	ICharacterRepository,
} from "../character-repository";

export class CharacterImMemoryRepository<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> implements ICharacterRepository<TSheet, TInventory>
{
	public items: Character<TSheet, TInventory>[] = [];

	async create(
		data: CharacterCreateInput,
		sheet: TSheet,
		inventory: TInventory,
	): Promise<Character<TSheet, TInventory>> {
		const character: Character<TSheet, TInventory> = {
			id: randomUUID(),
			userId: data.userId,
			name: data.name,
			rpgSystem: data.rpgSystem,
			slug: createSlug(data.name),
			age: data.age,
			avatar: data.avatar,
			description: data.description,
			sheet,
			inventory,
		};

		this.items.push(character);

		return character;
	}
}
