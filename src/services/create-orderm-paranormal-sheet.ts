import type { CharacterCreateInput } from "@/repository/character-repository";
import { CreateCharacterService } from "./create-character";
import type { OrdemParanormalInventory, OrdemParanormalSheet } from "./types/ordem-paranormal";

interface CreateOrdemParanormalSheetResquest {
	characterData: CharacterCreateInput;
	sheet: OrdemParanormalSheet;
	inventory: OrdemParanormalInventory;
}

export class CreateOrdemParanormalSheet extends CreateCharacterService<OrdemParanormalSheet, OrdemParanormalInventory> {
	async execute({ characterData, sheet, inventory }: CreateOrdemParanormalSheetResquest) {
		const character = await super.execute({ characterData, sheet, inventory });

		return character;
	}
}
