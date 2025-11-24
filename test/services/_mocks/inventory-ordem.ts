import type { InventoryOrdemParanormalCreateInput } from "@/@types/ordem-paranormal/inventory-ordem-paranormal";

export function createInventoryMock() {
	const inventoryDataMocks: InventoryOrdemParanormalCreateInput = {
		characterId: "",
		itemLimit: {
			one: 1,
			two: 1,
			three: 1,
			four: 1,
		},
		creditLimit: "string",
		maximumLoad: "string",
		items: [
			{
				name: "string",
				space: "string",
				category: "string",
			},
		],
	};

	return {
		inventoryDataMocks,
	};
}
