import { randomUUID } from "node:crypto";
import type {
	Character,
	CharacterCreateInput,
	CharacterUpdateInput,
} from "@/@types/character";
import { createSlug } from "@/utils/create-slug";
import type { ICharacterRepository } from "../character-repository";

export class CharacterImMemoryRepository<TSheet extends Record<string, any>>
	implements ICharacterRepository<TSheet>
{
	public items: Character<TSheet>[] = [];

	async create(data: CharacterCreateInput, sheet: TSheet): Promise<Character<TSheet>> {
		const character: Character<TSheet> = {
			id: randomUUID(),
			userId: data.userId,
			name: data.name,
			rpgSystem: data.rpgSystem,
			slug: createSlug(data.name),
			age: data.age,
			avatar: data.avatar,
			description: data.description,
			sheet,
		};

		this.items.push(character);

		return character;
	}

	async getById(id: string): Promise<Character<TSheet> | null> {
		const character = this.items.find((char) => char.id === id);

		return character ?? null;
	}

	async updateById(
		id: string,
		updateData: CharacterUpdateInput,
	): Promise<Character<TSheet> | null> {
		const characterIndex = this.items.findIndex((char) => char.id === id);

		if (characterIndex === -1) {
			return null;
		}

		const existingCharacter = this.items[characterIndex];
		const updatedCharacter = {
			...existingCharacter,
			...updateData,
		};

		this.items[characterIndex] = updatedCharacter;

		return updatedCharacter;
	}
}
