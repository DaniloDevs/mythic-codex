import z from "zod";

const RpgSystemEnum = z.enum(["Dungeon And Dragons", "Ordem Paranormal", "Tormenta"]);

const CharacterBaseSchema = z.object({
	userId: z.string(),
	name: z.string(),
	rpgSystem: RpgSystemEnum,
	age: z.number(),
	description: z.string(),
	avatar: z.string().nullable(),
});

const CharacterSchema = CharacterBaseSchema.extend({
	id: z.string(),
	slug: z.string(),
});

const CharacterCreateInputSchema = CharacterBaseSchema;

export type RpgSystem = z.infer<typeof RpgSystemEnum>;

export type CharacterCreateInput = z.infer<typeof CharacterCreateInputSchema>;

export type Character<
	TSheet extends Record<string, any> = Record<string, any>,
	TInventory extends Record<string, any> = Record<string, any>,
> = z.infer<typeof CharacterSchema> & {
	sheet: TSheet;
	inventory: TInventory;
};

export type CharacterBase = z.infer<typeof CharacterSchema>;

export { CharacterSchema, CharacterCreateInputSchema, RpgSystemEnum };
