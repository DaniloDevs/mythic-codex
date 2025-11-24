import z from "zod";

const InventoryOrdemParanormal = z.object({
	id: z.string(),
	characterId: z.string(),
	itemLimit: z.object({
		one: z.number().int().default(0),
		two: z.number().int().default(0),
		three: z.number().int().default(0),
		four: z.number().int().default(0),
	}),
	creditLimit: z.string(),
	maximumLoad: z.string(),
	items: z.array(
		z.object({
			name: z.string(),
			category: z.string().optional(),
			space: z.string(),
		}),
	),
});

const InventoryOrdemParanormalCreateInput = InventoryOrdemParanormal.omit({ id: true });

export type InventoryOrdemParanormal = z.infer<typeof InventoryOrdemParanormal>;
export type InventoryOrdemParanormalCreateInput = z.infer<
	typeof InventoryOrdemParanormalCreateInput
>;
