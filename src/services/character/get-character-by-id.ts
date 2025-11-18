import type { Character } from "@/@types/character";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ICharacterRepository } from "@/repository/character-repository";

interface RequestData {
	id: string;
}

interface ResponseData {
	character: Character;
}

export class GetCharacterByIdService {
	constructor(private characterRepository: ICharacterRepository) {}

	async execute({ id }: RequestData): Promise<ResponseData> {
		const character = await this.characterRepository.getById(id);

		if (!character) {
			throw new ResourceNotFoundError();
		}

		return { character };
	}
}
