import type { SheetOrdemParanormal } from "@/@types/sheet-ordem-paranormal";
import type { ISheetOrdemParanormalRepository } from "../sheet-ordem-paranormal-repository";

export class SheetOrdemParanormalImMemoryRepository
	implements ISheetOrdemParanormalRepository
{
	public items: SheetOrdemParanormal[] = [];

	async create(data: SheetOrdemParanormal) {
		const sheet: SheetOrdemParanormal = {
			id: data.id,
			characterId: data.characterId,
			updatedAt: data.updatedAt,
			identity: data.identity,
			attributes: data.attributes,
			conditions: data.conditions,
			expertise: data.expertise,
			ritual: data.ritual,
			skill: data.skill,
		};

		this.items.push(sheet);

		return sheet;
	}
}
