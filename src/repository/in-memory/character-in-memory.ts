import { randomUUID } from "node:crypto";
import type { Character, CharacterCreateInput } from "@/@types/character";
import { createSlug } from "@/utils/create-slug";
import type { ICharacterRepository } from "../character-repository";

export class CharacterImMemoryRepository implements ICharacterRepository {
	public items: Character[] = [];

	async create(data: CharacterCreateInput): Promise<Character> {
		const character: Character = {
			id: randomUUID(),
			userId: data.userId,
			sheetId: data.sheetId,
			name: data.name,
			rpgSystem: data.rpgSystem,
			slug: createSlug(data.name),
			age: data.age,
			avatar: data.avatar,
			description: data.description,
			createdAt: new Date(),
		};

		this.items.push(character);

		return character;
	}

	async getById(id: string): Promise<Character | null> {
		const character = this.items.find((char) => char.id === id);

		return character ?? null;
	}

	async updateById(
		id: string,
		updateData: Partial<Character>,
	): Promise<Character | null> {
		const characterIndex = this.items.findIndex((char) => char.id === id);

		if (characterIndex < 0) return null;

		const existingCharacter = this.items[characterIndex];

		this.items[characterIndex] = {
			...existingCharacter,
			slug: updateData.name ? createSlug(updateData.name) : existingCharacter.slug,
			...updateData,
		};

		const character = this.items[characterIndex];

		return character;
	}

	async fetchByUserId(userId: string) {
		const characters = this.items.filter((character) => character.userId === userId);

		return characters;
	}
}
