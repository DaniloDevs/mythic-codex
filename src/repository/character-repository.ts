import type { Character, CharacterCreateInput } from "@/@types/character";
import type { DeepPartial } from "@/utils/deep-partial";

export interface ICharacterRepository {
	create(character: CharacterCreateInput): Promise<Character>;
	getById(id: string): Promise<Character | null>;
	updateById(id: string, updateData: DeepPartial<Character>): Promise<Character | null>;
	fetchByUserId(userId: string): Promise<Character[] | []>;
}
