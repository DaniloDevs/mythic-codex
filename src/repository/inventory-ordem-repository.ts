import type {
	InventoryOrdemParanormal,
	InventoryOrdemParanormalCreateInput,
} from "@/@types/ordem-paranormal/inventory-ordem-paranormal";

export interface IInventoryOrdemRepository {
	create(data: InventoryOrdemParanormalCreateInput): Promise<InventoryOrdemParanormal>;
	updateById(
		id: string,
		data: Partial<InventoryOrdemParanormal>,
	): Promise<InventoryOrdemParanormal>;
}
