import z from "zod";

const RpgSystemSchema = ["Dungeon And Dragons", "Ordem Paranormal", "Tormenta"] as const;

const CharacterSchema = z.object({
	id: z.string(),
	userId: z.string(),
	name: z.string(),
	rpgSystem: z.enum(RpgSystemSchema),
	slug: z.string(),
	age: z.number(),
	description: z.string(),
	avatar: z.string().nullable(),
});

const CharacterCreateInputSchema = z.object({
	userId: z.string(),
	name: z.string(),
	rpgSystem: z.enum(RpgSystemSchema),
	age: z.number(),
	description: z.string(),
	avatar: z.string().nullable(),
});

export type CharacterCreateInput = z.infer<typeof CharacterCreateInputSchema>;
export type Character<
	TSheet extends Record<string, any> = Record<string, any>,
	TInventory extends Record<string, any> = Record<string, any>,
> = z.infer<typeof CharacterSchema> & {
	sheet: TSheet;
	inventory: TInventory;
};

export interface ICharacterRepository<TSheet extends Record<string, any>, TInventory extends Record<string, any>> {
	create(character: CharacterCreateInput, sheet: TSheet, inventory: TInventory): Promise<Character<TSheet, TInventory>>;
}
