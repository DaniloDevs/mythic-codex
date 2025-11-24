import { randomUUID } from "node:crypto";
import type {
	InventoryOrdemParanormal,
	InventoryOrdemParanormalCreateInput,
} from "@/@types/ordem-paranormal/inventory-ordem-paranormal";
import type { IInventoryOrdemRepository } from "../inventory-ordem-repository";

export class InventoryImMemoryRepository implements IInventoryOrdemRepository {
	public items: InventoryOrdemParanormal[] = [];

	async create(data: InventoryOrdemParanormalCreateInput) {
		const tokens: InventoryOrdemParanormal = {
			id: randomUUID(),
			characterId: data.characterId,
			itemLimit: data.itemLimit,
			creditLimit: data.creditLimit,
			maximumLoad: data.maximumLoad,
			items: data.items,
		};

		this.items.push(tokens);

		return tokens;
	}

	async updateById(id: string, data: Partial<InventoryOrdemParanormal>) {
		const index = this.items.findIndex((user) => user.id === id);

		const oldUser = this.items[index];

		const updatedUser: InventoryOrdemParanormal = {
			...oldUser,
			...data,
		};

		this.items[index] = updatedUser;

		return updatedUser;
	}
}
