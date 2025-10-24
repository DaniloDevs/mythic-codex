import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type {
	Character,
	CharacterCreateInput,
	ICharacterRepository,
} from "@/repository/character-repository";
import type { IUserRepository } from "@/repository/user-repository";

interface CreateCharacterRequest<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> {
	characterData: CharacterCreateInput;
	sheet: TSheet;
	inventory: TInventory;
}

interface CreateCharacterResponse<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
> {
	character: Character<TSheet, TInventory>;
}

export class CreateCharacterService<
	TSheet extends Record<string, any>,
	TInventory extends Record<string, any>,
	TSheetInput extends Record<string, any> = TSheet,
> {
	constructor(
		private characterRepository: ICharacterRepository<TSheet, TInventory>,
		private userRepository: IUserRepository,
	) {}

	protected transformSheet(sheet: TSheetInput): TSheet {
		return sheet as unknown as TSheet;
	}

	async execute({
		characterData,
		sheet,
		inventory,
	}: CreateCharacterRequest<TSheetInput, TInventory>): Promise<
		CreateCharacterResponse<TSheet, TInventory>
	> {
		const existUser = await this.userRepository.getById(characterData.userId);

		if (!existUser) {
			throw new ResourceNotFoundError();
		}

		const transformedSheet = this.transformSheet(sheet);

		const character = await this.characterRepository.create(
			characterData,
			transformedSheet,
			inventory,
		);

		return { character };
	}
}
