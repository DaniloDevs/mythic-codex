import type { SheetOrdemParanormal } from "@/@types/sheet-ordem-paranormal";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ISheetOrdemParanormalRepository } from "@/repository/sheet-ordem-paranormal-repository";

interface RequestData {
	sheetId: string;
}

interface ResponseData {
	sheetOrdem: SheetOrdemParanormal;
}

export class GetSheetOrdemParanormalById {
	constructor(private sheetOrdemRepository: ISheetOrdemParanormalRepository) {}
	async execute({ sheetId }: RequestData): Promise<ResponseData> {
		const sheetOrdem = await this.sheetOrdemRepository.getById(sheetId);

		if (!sheetOrdem) {
			throw new ResourceNotFoundError();
		}

		return { sheetOrdem };
	}
}
