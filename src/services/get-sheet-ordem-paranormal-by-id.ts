import { GetCharacterService } from "./get-character-by-id";
import type { OrdemParanormalSheetCreateInput } from "./types/ordem-paranomal-create-input";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "./types/ordem-paranormal-sheet";

interface GetSheetOrdemParanormalByIdResquest {
	id: string;
}

export class GetSheetOrdemParanormalById extends GetCharacterService<
	OrdemParanormalSheet,
	OrdemParanormalInventory,
	OrdemParanormalSheetCreateInput
> {
	async execute({ id }: GetSheetOrdemParanormalByIdResquest) {
		const character = await super.execute({
			id,
		});

		return character;
	}
}
