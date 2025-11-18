import type { SheetOrdemParanormal } from "@/@types/sheet-ordem-paranormal";

export interface ISheetOrdemParanormalRepository {
	create(data: SheetOrdemParanormal): Promise<SheetOrdemParanormal>;
	updateById(id: string, data: Partial<SheetOrdemParanormal>): Promise<SheetOrdemParanormal | null>
}
