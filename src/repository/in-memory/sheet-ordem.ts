import type { SheetOrdemParanormal } from "@/@types/sheet-ordem-paranormal";
import type { ISheetOrdemParanormalRepository } from "../sheet-ordem-repository";

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

	async updateById(id: string, data: Partial<SheetOrdemParanormal>) {
		const index = this.items.findIndex((sheetordem) => sheetordem.id === id);

		const oldSheetOrdem = this.items[index];

		const updatedSheetOrdem = {
			...oldSheetOrdem,
			...data,
		};

		this.items[index] = updatedSheetOrdem;

		return updatedSheetOrdem;
	}

	async getById(id: string) {
		const sheet = this.items.find((char) => char.id === id);

		return sheet ?? null;
	}
}
