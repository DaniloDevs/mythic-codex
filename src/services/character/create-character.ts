import type { Character, CharacterCreateInput } from "@/@types/character";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ICharacterRepository } from "@/repository/character-repository";
import type { IUserRepository } from "@/repository/user-repository";

interface RequestData<TSheet extends Record<string, any>> {
	characterData: CharacterCreateInput;
	sheet: TSheet;
}

interface ResponseData<TSheet extends Record<string, any>> {
	character: Character<TSheet>;
}

export class CreateCharacterService<
	TSheet extends Record<string, any>,
	TSheetInput extends Record<string, any> = TSheet,
> {
	constructor(
		private characterRepository: ICharacterRepository<TSheet>,
		private userRepository: IUserRepository,
	) {}

	protected transformSheet(sheet: TSheetInput): TSheet {
		return sheet as unknown as TSheet;
	}

	async execute({
		characterData,
		sheet,
	}: RequestData<TSheetInput>): Promise<ResponseData<TSheet>> {
		const alredyExistUser = await this.userRepository.getById(characterData.userId);

		if (!alredyExistUser) {
			throw new ResourceNotFoundError();
		}

		const transformedSheet = this.transformSheet(sheet);

		const character = await this.characterRepository.create(
			characterData,
			transformedSheet,
		);

		return { character };
	}
}
