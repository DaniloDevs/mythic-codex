import type { IInventoryRepository } from "@/repository/inventory-repository";

interface RequestData<TInventory extends Record<string, any>> {
	data: TInventory;
}

interface ResponseData<TInventory extends Record<string, any>> {
	inventory: TInventory;
}

export class CreateInventoryService<TInventory extends Record<string, any>> {
	constructor(private inventoryRepository: IInventoryRepository<TInventory>) {}

	async execute({ data }: RequestData<TInventory>): Promise<ResponseData<TInventory>> {
		const inventory = await this.inventoryRepository.create(data);

		return { inventory };
	}
}
