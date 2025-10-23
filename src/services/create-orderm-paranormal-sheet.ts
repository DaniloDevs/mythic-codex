import z from "zod";
import type { CharacterCreateInput } from "@/repository/character-repository";
import { CreateCharacterService } from "./create-character";

const OrdemParanormalSheetSchema = z.object({
	sanity: z.number().min(0).max(100),
	occult: z.number().min(0),
	stamina: z.number().min(0),
});

const OrdemParanormalInventorySchema = z.object({
	items: z.array(z.string()),
	money: z.number().min(0),
});

export type OrdemParanormalSheet = z.infer<typeof OrdemParanormalSheetSchema>;
export type OrdemParanormalInventory = z.infer<typeof OrdemParanormalInventorySchema>;

interface CreateOrdemParanormalSheetResquest {
	characterData: CharacterCreateInput;
	sheet: OrdemParanormalSheet;
	inventory: OrdemParanormalInventory;
}

export class CreateOrdemParanormalSheet extends CreateCharacterService<
	OrdemParanormalSheet,
	OrdemParanormalInventory
> {
	async execute({ characterData, sheet, inventory }: CreateOrdemParanormalSheetResquest) {
		const character = await super.execute({ characterData, sheet, inventory });

		return character;
	}
}
