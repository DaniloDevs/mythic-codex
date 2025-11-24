import { beforeEach, describe, it } from "vitest";
import { InventoryImMemoryRepository } from "@/repository/in-memory/inventory-in-memory";
import type { IInventoryRepository } from "@/repository/inventory-repository";
import { CreateInventoryService } from "@/services/inventory/create-inventory";

describe("Create Inventory - Service", () => {
	type GenericInventory = { item: string[] };

	let inventoryRepository: IInventoryRepository<GenericInventory>;
	let _sut: CreateInventoryService<GenericInventory>;

	beforeEach(() => {
		inventoryRepository = new InventoryImMemoryRepository();
		_sut = new CreateInventoryService(inventoryRepository);
	});

	it("deve ser possivel criar um inventario", () => {});
});
