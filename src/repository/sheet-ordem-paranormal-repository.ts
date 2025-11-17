import type { SheetOrdemParanormal } from "@/@types/sheet-ordem-paranormal";

export interface ISheetOrdemParanormalRepository {
	create(data: SheetOrdemParanormal): Promise<SheetOrdemParanormal>;
}
