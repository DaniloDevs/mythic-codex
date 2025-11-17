export interface IInventoryRepository<TInventory extends Record<string, any>> {
	create(data: TInventory): Promise<TInventory>;
}
