import { randomUUID } from "node:crypto";
import type { IInventoryRepository } from "../inventory-repository";

export class InventoryImMemoryRepository<TInventory extends Record<string, any>>
	implements IInventoryRepository<TInventory>
{
	public items: TInventory[] = [];

	async create(data: TInventory): Promise<TInventory> {
		const inventory = {
			id: randomUUID(),
			...data,
		};

		this.items.push(inventory);

		return inventory;
	}
}
