import type { Character } from "@/repository/character-repository";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
	OrdemParanormalSheetCreateInput,
} from "./@types/ordem-paranormal-sheet";
import { GetCharacterService } from "./get-character-by-id";

interface RequestData {
	id: string;
}

interface ResponseData {
	character: Character<OrdemParanormalSheet, OrdemParanormalInventory>;
}

export class GetSheetOrdemParanormalByIdService extends GetCharacterService<
	OrdemParanormalSheet,
	OrdemParanormalInventory,
	OrdemParanormalSheetCreateInput
> {
	async execute({ id }: RequestData): Promise<ResponseData> {
		const character = await super.execute({
			id,
		});

		return character;
	}
}
