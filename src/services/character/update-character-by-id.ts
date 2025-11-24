import type { Character } from "@/@types/character";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ICharacterRepository } from "@/repository/character-repository";

interface RequestData {
	id: string;
	updateData: Partial<Character>;
}

interface ResponseData {
	character: Character;
}

export class UpdateCharacterByIdService {
	constructor(private characterRepository: ICharacterRepository) {}

	async execute({ id, updateData }: RequestData): Promise<ResponseData> {
		if (Object.entries(updateData).length === 0) {
			throw new ResourceNotFoundError();
		}

		const existCharacter = await this.characterRepository.getById(id);

		if (!existCharacter) throw new ResourceNotFoundError();

		const updatedCharacter = await this.characterRepository.updateById(
			existCharacter.id,
			updateData,
		);

		// biome-ignore lint/style/noNonNullAssertion: <Ele semprem vai retornar alugma coisa>
		return { character: updatedCharacter! };
	}
}
