import type { Character } from "@/@types/character";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "../../@types/ordem-paranormal-sheet";
import { GetCharacterService } from "../character/get-character-by-id";

interface RequestData {
	id: string;
}

interface ResponseData {
	character: Character<OrdemParanormalSheet, OrdemParanormalInventory>;
}

export class GetSheetOrdemParanormalByIdService extends GetCharacterService<
	OrdemParanormalSheet,
	OrdemParanormalInventory
> {
	async execute({ id }: RequestData): Promise<ResponseData> {
		const character = await super.execute({
			id,
		});

		return character;
	}
}
