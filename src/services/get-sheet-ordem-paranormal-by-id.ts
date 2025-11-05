import type { Character } from "@/repository/character-repository";
import { GetCharacterService } from "./get-character-by-id";
import type { OrdemParanormalSheetCreateInput } from "./types/ordem-paranomal-create-input";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "./types/ordem-paranormal-sheet";

interface ResquestGetSheetOrdemParanormalById {
	id: string;
}

interface ResponseGetSheetOrdemParanormalById {
	character: Character<OrdemParanormalSheet, OrdemParanormalInventory>;
}

export class GetSheetOrdemParanormalByIdService extends GetCharacterService<
	OrdemParanormalSheet,
	OrdemParanormalInventory,
	OrdemParanormalSheetCreateInput
> {
	async execute({ id }: ResquestGetSheetOrdemParanormalById): Promise<ResponseGetSheetOrdemParanormalById> {
		const character = await super.execute({
			id,
		});

		return character;
	}
}
