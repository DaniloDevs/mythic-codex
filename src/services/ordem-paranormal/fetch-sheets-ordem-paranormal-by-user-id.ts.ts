import type { Character } from "@/@types/character";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "@/@types/ordem-paranormal-sheet";
import { FetchCharacterByIdService } from "../character/fetch-character-by-id";

interface RequestData {
	userId: string;
}
interface ResponseData {
	characters: Character<OrdemParanormalSheet, OrdemParanormalInventory>[];
}

export class FetchSheetsOrdemParanormalByUserIdService extends FetchCharacterByIdService<
	OrdemParanormalSheet,
	OrdemParanormalInventory
> {
	async execute({ userId }: RequestData): Promise<ResponseData> {
		const { characters } = await super.execute({ userId });

		return { characters };
	}
}
