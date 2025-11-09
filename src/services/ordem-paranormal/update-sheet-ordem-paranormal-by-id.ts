import type { Character } from "@/@types/character";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "@/@types/ordem-paranormal-sheet";
import { InvalidOperationsError } from "@/_errors/invalid-operations";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { DeepPartial } from "@/utils/deep-partial";
import { UpdateCharacterByIdService } from "../character/update-character-by-id";

interface RequestData {
	characterId: string;
	updateData: DeepPartial<Character<OrdemParanormalSheet, OrdemParanormalInventory>>;
}

interface ResponseData {
	character: Character<OrdemParanormalSheet, OrdemParanormalInventory>;
}

export class UpdateSheetOrdemParanormalByIdService extends UpdateCharacterByIdService<
	OrdemParanormalSheet,
	OrdemParanormalInventory
> {
	async execute({ characterId, updateData }: RequestData): Promise<ResponseData> {
		if (!updateData || Object.keys(updateData).length === 0) {
			throw new ResourceNotFoundError("No update data provided.");
		}

		if (updateData.sheet?.identity) {
			if (updateData.sheet.identity.class || updateData.sheet.identity.origin) {
				throw new InvalidOperationsError("Updating identity is not allowed.");
			}
		}

		const character = await super.execute({
			characterId,
			updateData,
		});

		return character;
	}
}
