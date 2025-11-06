import type { Character } from "@/repository/character-repository";
import { GetCharacterService } from "./get-character-by-id";
import type { OrdemParanormalSheetCreateInput } from "./types/ordem-paranomal-create-input";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "./types/ordem-paranormal-sheet";

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
