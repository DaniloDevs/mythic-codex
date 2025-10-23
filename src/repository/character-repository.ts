import z from "zod";

const RpgSystemSchema = [
	"Dungeon And Dragons",
	"Ordem Paranormal",
	"Tormenta",
] as const;

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

export type Character = z.infer<typeof CharacterSchema>;
export type CharacterCreateInput = z.infer<typeof CharacterCreateInputSchema>;

export interface ICharacterRepository {
	create(data: CharacterCreateInput): Promise<Character>;
}
