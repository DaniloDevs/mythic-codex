export interface IInventoryRepository<TInventory extends Record<string, any>> {
	create(data: TInventory): Promise<TInventory>;
	updateById(id: string, data: Partial<TInventory>): Promise<TInventory>;
}
