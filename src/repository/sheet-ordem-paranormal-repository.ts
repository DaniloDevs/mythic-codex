import type { OrdemParanormalSheet } from "@/@types/sheet-ordem-paranormal";

export interface ISheetOrdemParanormalRepository {
	create(data: OrdemParanormalSheet): Promise<OrdemParanormalSheet>;
}
