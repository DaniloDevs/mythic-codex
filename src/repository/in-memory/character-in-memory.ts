import { randomUUID } from "node:crypto";
import { createSlug } from "@/utils/create-slug";
import type {
	ICharacterRepository,
} from "../character-repository";
import { Character, CharacterCreateInput } from "@/@types/character";

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

	async getById(id: string): Promise<Character<TSheet, TInventory> | null> {
		const character = this.items.find((char) => char.id === id);

		return character ?? null;
	}


	async updateById(id: string, updateData: Partial<Character<TSheet, TInventory>>): Promise<void> {
		const characterIndex = this.items.findIndex((char) => char.id === id);

		if (characterIndex === -1) {
			return;
		}	

		const existingCharacter = this.items[characterIndex];

		const updatedCharacter = {
			...existingCharacter,
			...updateData,
			slug: updateData.name ? createSlug(updateData.name) : existingCharacter.slug,
		};

		this.items[characterIndex] = updatedCharacter;
	}
}
