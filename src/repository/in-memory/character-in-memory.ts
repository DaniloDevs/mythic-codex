import { randomUUID } from "node:crypto";
import { createSlug } from "@/utils/create-slug";
import type {
	Character,
	CharacterCreateInput,
	ICharacterRepository,
} from "../character-repository";

export class CharacterImMemoryRepository implements ICharacterRepository {
	public items: Character[] = [];

	async create(data: CharacterCreateInput) {
		const character: Character = {
			id: randomUUID(),
			userId: data.userId,
			name: data.name,
			rpgSystem: data.rpgSystem,
			slug: createSlug(data.name),
			age: data.age,
			avatar: data.avatar,
			description: data.description,
			inventory: data.inventory,
			sheet: data.sheet,
		};

		this.items.push(character);

		return character;
	}
}
